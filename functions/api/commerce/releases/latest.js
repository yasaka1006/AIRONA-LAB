import {
  PRODUCT_ID_FULL,
  commerceDb,
  error,
  json,
  methodNotAllowed,
  requireSession,
} from "../../../_lib/commerce.js";

/**
 * GET /api/commerce/releases/latest
 * Logged-in users get full_win / full_web latest metadata.
 */
export async function onRequestGet(context) {
  const { request, env } = context;
  const db = commerceDb(env);
  if (!db) {
    return error(503, "unavailable", "COMMERCE_DB is not bound");
  }

  const { response } = await requireSession(env, request);
  if (response) return response;

  const { results } = await db
    .prepare(
      `SELECT channel, version, r2_key AS r2Key, public_url AS publicUrl
       FROM releases
       WHERE product_id = ? AND is_latest = 1
         AND channel IN ('full_win', 'full_web')`,
    )
    .bind(PRODUCT_ID_FULL)
    .all();

  const latest = {};
  for (const row of results ?? []) {
    latest[row.channel] = {
      version: row.version,
      r2Key: row.r2Key,
      publicUrl: row.publicUrl,
    };
  }

  return json({ latest });
}

export async function onRequest(context) {
  if (context.request.method === "GET") {
    return onRequestGet(context);
  }
  return methodNotAllowed(["GET"]);
}
