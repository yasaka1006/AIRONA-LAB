import { sameSitePost } from "../_lib/commerce.js";
import { consumeRateLimit, rateLimitedResponse } from "../_lib/security.js";

const GAME_ID = /^[a-z0-9_-]{1,40}$/i;

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const gameid = url.searchParams.get("gameid");

  let query = "SELECT id, gameid, user, cleartime, data FROM ranking";
  let params = [];

  if (gameid) {
    if (!GAME_ID.test(gameid)) {
      return Response.json([], { status: 200 });
    }
    query += " WHERE gameid = ?";
    params.push(gameid);
  }

  query += " ORDER BY cleartime ASC LIMIT 100";

  const statement = params.length > 0
    ? context.env.DB.prepare(query).bind(...params)
    : context.env.DB.prepare(query);

  const { results } = await statement.all();

  return Response.json(results);
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!sameSitePost(request, env)) {
    return new Response("Forbidden", { status: 403 });
  }

  const limited = await consumeRateLimit(request, {
    bucket: "ranking-write",
    limit: 20,
    windowSec: 3600,
  });
  if (!limited.ok) return rateLimitedResponse(limited.retryAfter);

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const gameid = typeof body?.gameid === "string" ? body.gameid.trim() : "";
  const user = typeof body?.user === "string" ? body.user.trim().slice(0, 20) : "";
  const cleartime = Number(body?.cleartime);

  if (!GAME_ID.test(gameid) || !user || !Number.isFinite(cleartime) || cleartime < 0 || cleartime > 86400) {
    return new Response("Invalid payload", { status: 400 });
  }

  const existing = await env.DB.prepare(
    "SELECT * FROM ranking WHERE gameid = ? AND user = ?",
  ).bind(gameid, user).first();

  if (existing) {
    if (cleartime < existing.cleartime) {
      await env.DB.prepare(
        "UPDATE ranking SET cleartime = ?, data = DATETIME('now', 'localtime') WHERE gameid = ? AND user = ?",
      ).bind(cleartime, gameid, user).run();
      return new Response("OK", { status: 201 });
    }
    return new Response("既存のタイムより遅いため、更新されませんでした", { status: 200 });
  }

  await env.DB.prepare(
    "INSERT INTO ranking (gameid, user, cleartime) VALUES (?, ?, ?)",
  ).bind(gameid, user, cleartime).run();
  return new Response("OK", { status: 201 });
}
