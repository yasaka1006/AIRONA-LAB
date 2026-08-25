import {
  PRODUCT_ID_DEMO,
  commerceDb,
  json,
  methodNotAllowed,
} from "../../_lib/commerce.js";

/**
 * GET /api/commerce/demo
 * Public: DEMO Web / DEMO Win URLs (no auth).
 */
export async function onRequestGet(context) {
  const { env } = context;
  const db = commerceDb(env);

  let demoWeb = env.DEMO_WEB_URL || null;
  let demoWin = env.DEMO_WIN_URL || null;
  let version = null;

  if (db) {
    const { results } = await db
      .prepare(
        `SELECT channel, version, public_url AS publicUrl
         FROM releases
         WHERE product_id = ? AND is_latest = 1
           AND channel IN ('demo_web', 'demo_win')`,
      )
      .bind(PRODUCT_ID_DEMO)
      .all();

    for (const row of results ?? []) {
      version = row.version || version;
      if (row.channel === "demo_web" && row.publicUrl) {
        demoWeb = row.publicUrl;
      }
      if (row.channel === "demo_win" && row.publicUrl) {
        demoWin = row.publicUrl;
      }
    }
  }

  return json({
    demoWeb,
    demoWin,
    version,
  });
}

export async function onRequest(context) {
  if (context.request.method === "GET") {
    return onRequestGet(context);
  }
  return methodNotAllowed(["GET"]);
}
