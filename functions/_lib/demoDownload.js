import {
  PRODUCT_ID_DEMO,
  commerceDb,
  error,
  filenameFromR2Key,
  getLatestRelease,
  methodNotAllowed,
} from "./commerce.js";

/**
 * 最新の DEMO パッケージを Private R2 からそのまま返す（認証なし）。
 * @param {{ channel: string, label: string, fallbackFilename: (version: string) => string, contentType: string }} spec
 */
async function serveLatestDemo(context, spec) {
  const { env } = context;
  const db = commerceDb(env);
  if (!db) {
    return error(503, "unavailable", "COMMERCE_DB is not bound");
  }
  if (!env.PRODUCTS) {
    return error(503, "unavailable", "PRODUCTS R2 is not bound");
  }

  const release = await getLatestRelease(db, PRODUCT_ID_DEMO, spec.channel);
  if (!release?.r2_key) {
    return error(404, "not_found", `No latest DEMO ${spec.label} release`);
  }

  const object = await env.PRODUCTS.get(release.r2_key);
  if (!object) {
    return error(404, "missing_object", `DEMO ${spec.label} package is not uploaded yet`);
  }

  const filename = filenameFromR2Key(
    release.r2_key,
    spec.fallbackFilename(release.version || "0.1.0"),
  );

  const headers = {
    "Content-Type": object.httpMetadata?.contentType || spec.contentType,
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Cache-Control": "public, max-age=3600",
    "X-Content-Type-Options": "nosniff",
  };
  if (object.size != null) {
    headers["Content-Length"] = String(object.size);
  }

  return new Response(object.body, { status: 200, headers });
}

export async function handleDemoDownload(context, spec) {
  const method = context.request.method;
  if (method === "GET" || method === "HEAD") {
    const res = await serveLatestDemo(context, spec);
    if (method === "HEAD") {
      return new Response(null, { status: res.status, headers: res.headers });
    }
    return res;
  }
  return methodNotAllowed(["GET", "HEAD"]);
}
