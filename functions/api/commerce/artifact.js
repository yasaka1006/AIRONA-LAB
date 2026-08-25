import {
  error,
  isDevFlag,
  methodNotAllowed,
  parseDownloadToken,
  placeholderZipBytes,
} from "../../_lib/commerce.js";

/**
 * GET /api/commerce/artifact?token=
 * Streams a private R2 object after verifying a short-lived HMAC token.
 */
export async function onRequestGet(context) {
  const { request, env } = context;
  const token = new URL(request.url).searchParams.get("token") || "";
  const payload = await parseDownloadToken(env, token);
  if (!payload) {
    return error(403, "invalid_token", "Download link is invalid or expired");
  }

  const headers = {
    "Content-Type": "application/zip",
    "Content-Disposition": `attachment; filename="${payload.filename}"`,
    "Cache-Control": "no-store",
  };

  if (env.PRODUCTS) {
    const object = await env.PRODUCTS.get(payload.r2Key);
    if (object) {
      return new Response(object.body, {
        headers: {
          ...headers,
          ...(object.httpMetadata?.contentType
            ? { "Content-Type": object.httpMetadata.contentType }
            : {}),
          ...(object.size != null ? { "Content-Length": String(object.size) } : {}),
        },
      });
    }
  }

  if (isDevFlag(env, "COMMERCE_DEV_FAKE_DOWNLOAD")) {
    const bytes = placeholderZipBytes(payload.version);
    return new Response(bytes, {
      headers: {
        ...headers,
        "Content-Length": String(bytes.length),
        "X-Commerce-Placeholder": "1",
      },
    });
  }

  return error(404, "missing_object", "Release file is not uploaded yet");
}

export async function onRequest(context) {
  if (context.request.method === "GET") {
    return onRequestGet(context);
  }
  return methodNotAllowed(["GET"]);
}
