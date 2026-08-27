import {
  PRODUCT_ID_DEMO,
  commerceDb,
  error,
  filenameFromR2Key,
  getLatestRelease,
  methodNotAllowed,
} from "../../_lib/commerce.js";

/**
 * GET /api/commerce/demo-win
 * Public download of latest DEMO Windows zip from private R2 (no auth).
 */
export async function onRequestGet(context) {
  const { env } = context;
  const db = commerceDb(env);
  if (!db) {
    return error(503, "unavailable", "COMMERCE_DB is not bound");
  }
  if (!env.PRODUCTS) {
    return error(503, "unavailable", "PRODUCTS R2 is not bound");
  }

  const release = await getLatestRelease(db, PRODUCT_ID_DEMO, "demo_win");
  if (!release?.r2_key) {
    return error(404, "not_found", "No latest DEMO Windows release");
  }

  const object = await env.PRODUCTS.get(release.r2_key);
  if (!object) {
    return error(404, "missing_object", "DEMO Windows package is not uploaded yet");
  }

  const filename = filenameFromR2Key(
    release.r2_key,
    `TABbeast_Demo_${release.version || "0.1.0"}_x64.zip`,
  );

  const headers = {
    "Content-Type": object.httpMetadata?.contentType || "application/zip",
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Cache-Control": "public, max-age=3600",
    "X-Content-Type-Options": "nosniff",
  };
  if (object.size != null) {
    headers["Content-Length"] = String(object.size);
  }

  return new Response(object.body, { status: 200, headers });
}

export async function onRequest(context) {
  if (context.request.method === "GET" || context.request.method === "HEAD") {
    const res = await onRequestGet(context);
    if (context.request.method === "HEAD") {
      return new Response(null, { status: res.status, headers: res.headers });
    }
    return res;
  }
  return methodNotAllowed(["GET", "HEAD"]);
}
