import { sameSitePost } from "../_lib/commerce.js";
import { consumeRateLimit, rateLimitedResponse } from "../_lib/security.js";

const GAME_ID = /^[a-z0-9_-]{1,40}$/i;
const TOP_N = 100;
const CACHE_SECONDS = 60;
const PRUNE_FLAG_URL = "https://ranking.airona.internal/prune-top100-v1";

const TOP_PER_GAME =
  "SELECT id, gameid, user, cleartime, data FROM ranking WHERE gameid = ? ORDER BY cleartime ASC, id ASC LIMIT 100";
const USER_ROW =
  "SELECT id, cleartime FROM ranking WHERE gameid = ? AND user = ? ORDER BY cleartime ASC, id ASC";
const CUTOFF =
  `SELECT cleartime FROM ranking WHERE gameid = ? ORDER BY cleartime ASC, id ASC LIMIT 1 OFFSET ${TOP_N - 1}`;
const PRUNE_GAME =
  `DELETE FROM ranking WHERE gameid = ? AND id IN (
     SELECT id FROM (
       SELECT id FROM ranking
       WHERE gameid = ?
       ORDER BY cleartime ASC, id ASC
       LIMIT -1 OFFSET ${TOP_N}
     )
   )`;
const DEDUPE =
  `DELETE FROM ranking WHERE id IN (
     SELECT id FROM (
       SELECT id,
              ROW_NUMBER() OVER (
                PARTITION BY gameid, user
                ORDER BY cleartime ASC, id ASC
              ) AS rn
       FROM ranking
     ) WHERE rn > 1
   )`;
const PRUNE_ALL =
  `DELETE FROM ranking WHERE id IN (
     SELECT id FROM (
       SELECT id,
              ROW_NUMBER() OVER (
                PARTITION BY gameid
                ORDER BY cleartime ASC, id ASC
              ) AS rn
       FROM ranking
     ) WHERE rn > ${TOP_N}
   )`;

let maintenance = null;

function jsonNoStore(body, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "private, no-store" },
  });
}

function textResponse(message, status = 200) {
  return new Response(message, {
    status,
    headers: { "Cache-Control": "no-store", "Content-Type": "text/plain; charset=utf-8" },
  });
}

function rankingCacheRequest(request, gameid) {
  const url = new URL(request.url);
  url.hash = "";
  url.search = "";
  if (gameid) url.searchParams.set("gameid", gameid);
  return new Request(url.toString(), { method: "GET" });
}

async function readCachedRankings(request, gameid) {
  try {
    if (typeof caches === "undefined" || !caches.default) return null;
    const hit = await caches.default.match(rankingCacheRequest(request, gameid));
    if (!hit) return null;
    const data = await hit.json();
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

async function storeCachedRankings(request, gameid, rows) {
  try {
    if (typeof caches === "undefined" || !caches.default) return;
    const response = Response.json(rows, {
      headers: { "Cache-Control": `public, max-age=${CACHE_SECONDS}` },
    });
    await caches.default.put(rankingCacheRequest(request, gameid), response);
  } catch {
    // キャッシュできないときは D1 の結果をそのまま返す
  }
}

async function invalidateRankingCache(request, gameid) {
  try {
    if (typeof caches === "undefined" || !caches.default) return;
    await caches.default.delete(rankingCacheRequest(request, gameid));
    await caches.default.delete(rankingCacheRequest(request, null));
  } catch {
    // 失効に失敗しても次の TTL で揃う
  }
}

async function pruneFlagSet() {
  try {
    if (typeof caches === "undefined" || !caches.default) return false;
    const hit = await caches.default.match(new Request(PRUNE_FLAG_URL));
    return Boolean(hit);
  } catch {
    return false;
  }
}

async function setPruneFlag() {
  try {
    if (typeof caches === "undefined" || !caches.default) return;
    await caches.default.put(
      new Request(PRUNE_FLAG_URL),
      new Response("1", { headers: { "Cache-Control": "public, max-age=86400" } }),
    );
  } catch {
    // フラグがなくてもこのアイソレートでは maintenance を繰り返さない
  }
}

async function maintainRanking(db) {
  if (await pruneFlagSet()) return;
  await db.prepare(
    "CREATE INDEX IF NOT EXISTS idx_ranking_game_time ON ranking(gameid, cleartime, id)",
  ).run();
  await db.prepare(
    "CREATE INDEX IF NOT EXISTS idx_ranking_game_user ON ranking(gameid, user)",
  ).run();
  await db.prepare(
    "CREATE INDEX IF NOT EXISTS idx_ranking_time ON ranking(cleartime, id)",
  ).run();
  await db.prepare(DEDUPE).run();
  await db.prepare(PRUNE_ALL).run();
  await setPruneFlag();
}

function prepareRanking(db) {
  if (!maintenance) {
    maintenance = maintainRanking(db).catch((error) => {
      maintenance = null;
      console.error("ranking maintenance failed", error);
    });
  }
  return maintenance;
}

async function loadRankings(db, gameid) {
  if (gameid) {
    const { results } = await db.prepare(TOP_PER_GAME).bind(gameid).all();
    return results ?? [];
  }

  const { results: games } = await db.prepare("SELECT DISTINCT gameid FROM ranking").all();
  const ids = (games ?? [])
    .map((row) => row.gameid)
    .filter((id) => typeof id === "string" && GAME_ID.test(id))
    .slice(0, 40);
  if (ids.length === 0) return [];

  const batched = await db.batch(ids.map((id) => db.prepare(TOP_PER_GAME).bind(id)));
  const rows = [];
  for (const result of batched) {
    if (Array.isArray(result.results)) rows.push(...result.results);
  }
  return rows;
}

function cachedDecision(rows, user, cleartime) {
  if (!Array.isArray(rows) || rows.length < TOP_N) return null;
  const mine = rows.find((row) => row.user === user);
  if (mine) {
    if (cleartime >= Number(mine.cleartime)) {
      return "既存のタイムより遅いため、更新されませんでした";
    }
    return null;
  }
  const worst = Number(rows[rows.length - 1]?.cleartime);
  if (Number.isFinite(worst) && cleartime >= worst) {
    return "100位以内のタイムではないため、登録されませんでした";
  }
  return null;
}

export async function onRequestGet(context) {
  const gameid = new URL(context.request.url).searchParams.get("gameid");
  if (gameid && !GAME_ID.test(gameid)) return jsonNoStore([]);

  const cached = await readCachedRankings(context.request, gameid);
  if (cached) return jsonNoStore(cached);

  await prepareRanking(context.env.DB);
  const results = await loadRankings(context.env.DB, gameid);
  await storeCachedRankings(context.request, gameid, results);
  return jsonNoStore(results);
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

  const cached = await readCachedRankings(request, gameid);
  const skipped = cachedDecision(cached, user, cleartime);
  if (skipped) return textResponse(skipped);

  const db = env.DB;
  await prepareRanking(db);

  const existing = await db.prepare(USER_ROW).bind(gameid, user).first();
  if (existing) {
    if (cleartime < Number(existing.cleartime)) {
      await db.prepare(
        "UPDATE ranking SET cleartime = ?, data = DATETIME('now', 'localtime') WHERE gameid = ? AND user = ?",
      ).bind(cleartime, gameid, user).run();
      await invalidateRankingCache(request, gameid);
      return textResponse("OK", 201);
    }
    return textResponse("既存のタイムより遅いため、更新されませんでした");
  }

  const cutoff = await db.prepare(CUTOFF).bind(gameid).first();
  if (cutoff && cleartime >= Number(cutoff.cleartime)) {
    return textResponse("100位以内のタイムではないため、登録されませんでした");
  }

  await db.prepare(
    "INSERT INTO ranking (gameid, user, cleartime) VALUES (?, ?, ?)",
  ).bind(gameid, user, cleartime).run();
  if (cutoff) await db.prepare(PRUNE_GAME).bind(gameid, gameid).run();
  await invalidateRankingCache(request, gameid);
  return textResponse("OK", 201);
}
