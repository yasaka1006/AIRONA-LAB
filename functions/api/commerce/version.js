import {
  PRODUCT_ID_DEMO,
  PRODUCT_ID_FULL,
  commerceDb,
  error,
  getLatestRelease,
  json,
  methodNotAllowed,
} from "../../_lib/commerce.js";

const PRODUCT_BY_CHANNEL = {
  full_win: PRODUCT_ID_FULL,
  demo_win: PRODUCT_ID_DEMO,
};

/** デスクトップアプリ（tauri://localhost 等）から読むので CORS は全許可。返すのは版番号だけ */
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Cache-Control": "public, max-age=300",
};

/**
 * GET /api/commerce/version?channel=full_win
 * Public: latest version number only (no download URL).
 */
export async function onRequestGet(context) {
  const { request, env } = context;
  const channel =
    new URL(request.url).searchParams.get("channel") || "full_win";
  const productId = PRODUCT_BY_CHANNEL[channel];
  if (!productId) {
    return error(400, "invalid_channel", "Supported channel: full_win, demo_win");
  }
  const db = commerceDb(env);
  if (!db) {
    return error(503, "unavailable", "COMMERCE_DB is not bound");
  }
  const release = await getLatestRelease(db, productId, channel);
  return json(
    { channel, version: release?.version ?? null },
    { headers: CORS_HEADERS },
  );
}

export async function onRequest(context) {
  const method = context.request.method;
  if (method === "GET") return onRequestGet(context);
  if (method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  return methodNotAllowed(["GET"]);
}
