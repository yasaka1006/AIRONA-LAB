import {
  PRODUCT_ID_FULL,
  appBaseUrl,
  commerceDb,
  createDownloadToken,
  downloadTtlSec,
  error,
  filenameFromR2Key,
  getLatestRelease,
  hasActiveFullEntitlement,
  json,
  methodNotAllowed,
  requireSession,
} from "../../_lib/commerce.js";

const ALLOWED_CHANNELS = new Set(["full_win"]);

/**
 * GET /api/commerce/download?channel=full_win
 * Returns a short-lived same-origin download URL (HMAC token → /api/commerce/artifact).
 */
export async function onRequestGet(context) {
  const { request, env } = context;
  const db = commerceDb(env);
  if (!db) {
    return error(503, "unavailable", "COMMERCE_DB is not bound");
  }

  const { session, response } = await requireSession(env, request);
  if (response) return response;

  const channel = new URL(request.url).searchParams.get("channel") || "full_win";
  if (!ALLOWED_CHANNELS.has(channel)) {
    return error(400, "invalid_channel", "Supported channel: full_win");
  }

  const entitled = await hasActiveFullEntitlement(db, session.customerId);
  if (!entitled) {
    return error(403, "forbidden", "Active entitlement required");
  }

  const release = await getLatestRelease(db, PRODUCT_ID_FULL, channel);
  if (!release?.r2_key) {
    return error(404, "not_found", "No latest release for this channel");
  }

  const filename = filenameFromR2Key(
    release.r2_key,
    `TABbeast_${release.version}_x64.zip`,
  );
  const token = await createDownloadToken(env, {
    customerId: session.customerId,
    channel,
    r2Key: release.r2_key,
    filename,
    version: release.version,
  });
  const expiresIn = downloadTtlSec(env);
  const url = `${appBaseUrl(env, request)}/api/commerce/artifact?token=${encodeURIComponent(token)}`;

  return json({
    url,
    expiresIn,
    version: release.version,
    filename,
  });
}

export async function onRequest(context) {
  if (context.request.method === "GET") {
    return onRequestGet(context);
  }
  return methodNotAllowed(["GET"]);
}
