import {
  APP_TICKET_COOKIE,
  PRODUCT_ID_FULL,
  appBaseUrl,
  appTicketCookieHeader,
  commerceDb,
  createAppTicket,
  error,
  getLatestRelease,
  getSession,
  hasActiveFullEntitlement,
  isDevFlag,
  parseAppTicket,
  parseCookie,
} from "../_lib/commerce.js";

function contentTypeFor(path) {
  const lower = path.toLowerCase();
  if (lower.endsWith(".html")) return "text/html; charset=utf-8";
  if (lower.endsWith(".js") || lower.endsWith(".mjs")) {
    return "text/javascript; charset=utf-8";
  }
  if (lower.endsWith(".css")) return "text/css; charset=utf-8";
  if (lower.endsWith(".json")) return "application/json; charset=utf-8";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".mp3")) return "audio/mpeg";
  if (lower.endsWith(".wav")) return "audio/wav";
  if (lower.endsWith(".woff2")) return "font/woff2";
  if (lower.endsWith(".woff")) return "font/woff";
  if (lower.endsWith(".map")) return "application/json";
  if (lower.endsWith(".wasm")) return "application/wasm";
  if (lower.endsWith(".sf2")) return "application/octet-stream";
  return "application/octet-stream";
}

function normalizeAppPath(pathname) {
  let path = pathname.replace(/^\/app\/?/, "");
  try {
    path = decodeURIComponent(path);
  } catch {
    return null;
  }
  if (!path || path.endsWith("/")) {
    path = `${path}index.html`;
  }
  if (path.includes("..") || path.startsWith("/") || path.includes("\\")) {
    return null;
  }
  return path;
}

function isHtmlPath(relPath) {
  return relPath === "index.html" || relPath.endsWith(".html");
}

function cacheControlFor(relPath) {
  if (isHtmlPath(relPath)) return "no-store";
  if (relPath.startsWith("assets/") || /\.[a-f0-9]{8,}\./i.test(relPath)) {
    return "private, max-age=86400, immutable";
  }
  return "private, max-age=3600";
}

function placeholderHtml(version) {
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>TABbeast Web ${version}</title>
  <style>
    body { margin: 0; font-family: "Segoe UI", sans-serif; background: #0f172a; color: #e2e8f0; min-height: 100vh; display: grid; place-items: center; }
    main { max-width: 36rem; padding: 2rem; text-align: center; }
    h1 { font-size: 1.75rem; margin: 0 0 0.75rem; }
    p { line-height: 1.6; color: #94a3b8; }
    a { color: #93c5fd; }
    .badge { display: inline-block; margin-bottom: 1rem; padding: 0.25rem 0.75rem; border-radius: 999px; background: #334155; font-size: 0.75rem; }
  </style>
</head>
<body>
  <main>
    <div class="badge">full_web placeholder · ${version}</div>
    <h1>TABbeast ブラウザ版</h1>
    <p>ゲートと権利チェックは通っています。ここに本番の Vite ビルド（base: /app/）を R2 へ置けば、本体 UI が表示されます。</p>
    <p><a href="/mypage">マイページへ戻る</a></p>
  </main>
</body>
</html>`;
}

async function getProductResponse(env, key, { waitUntil, cacheControl, useEdgeCache }) {
  const cacheKeyUrl = `https://tabbeast-app-assets.internal/${encodeURIComponent(key)}`;
  const cacheKey = new Request(cacheKeyUrl);

  if (useEdgeCache && typeof caches !== "undefined" && caches.default) {
    const hit = await caches.default.match(cacheKey);
    if (hit) {
      const headers = new Headers(hit.headers);
      headers.set("Cache-Control", cacheControl);
      headers.set("X-App-Cache", "HIT");
      return new Response(hit.body, { status: hit.status, headers });
    }
  }

  if (!env.PRODUCTS) return null;
  const object = await env.PRODUCTS.get(key);
  if (!object) return null;

  const headers = {
    "Content-Type": object.httpMetadata?.contentType || contentTypeFor(key),
    "Cache-Control": cacheControl,
    "X-Content-Type-Options": "nosniff",
    "X-App-Cache": "MISS",
  };
  if (object.size != null) {
    headers["Content-Length"] = String(object.size);
  }

  const response = new Response(object.body, { status: 200, headers });
  if (
    useEdgeCache &&
    typeof caches !== "undefined" &&
    caches.default &&
    typeof waitUntil === "function"
  ) {
    waitUntil(caches.default.put(cacheKey, response.clone()));
  }
  return response;
}

/**
 * GET /app および /app/*
 * HTML: ログイン + active entitlement → tb_app ticket
 * assets: tb_app ticket only → R2 (+ edge cache)
 */
export async function onRequestGet(context) {
  const { request, env, waitUntil } = context;
  const base = appBaseUrl(env, request);
  const url = new URL(request.url);

  if (url.pathname === "/app") {
    return Response.redirect(`${base}/app/`, 302);
  }

  const relPath = normalizeAppPath(url.pathname);
  if (!relPath) {
    return error(400, "bad_path", "Invalid path");
  }

  const db = commerceDb(env);
  const servingHtml = isHtmlPath(relPath);
  let version = "0.1.0";
  let prefix = `tabbeast/full/web/${version}/`;
  let ticketCookie = null;

  if (servingHtml) {
    const session = await getSession(env, request);
    if (!session || !db) {
      return Response.redirect(`${base}/mypage`, 302);
    }

    const entitled = await hasActiveFullEntitlement(db, session.customerId);
    if (!entitled) {
      return Response.redirect(`${base}/mypage`, 302);
    }

    const release = await getLatestRelease(db, PRODUCT_ID_FULL, "full_web");
    version = release?.version || "0.1.0";
    prefix = (release?.r2_key || `tabbeast/full/web/${version}/`).replace(
      /\/?$/,
      "/",
    );

    const ticket = await createAppTicket(env, {
      customerId: session.customerId,
      version,
      r2Prefix: prefix,
    });
    ticketCookie = appTicketCookieHeader(request, ticket);
  } else {
    const raw = parseCookie(request, APP_TICKET_COOKIE);
    const ticket = await parseAppTicket(env, raw);
    if (!ticket) {
      return Response.redirect(`${base}/mypage`, 302);
    }
    version = ticket.version;
    prefix = ticket.r2Prefix;
  }

  const cacheControl = cacheControlFor(relPath);
  const useEdgeCache = !servingHtml;
  const candidates = [prefix + relPath];
  if (servingHtml && relPath !== "index.html") {
    candidates.push(`${prefix}index.html`);
  }

  for (const key of candidates) {
    const response = await getProductResponse(env, key, {
      waitUntil,
      cacheControl,
      useEdgeCache,
    });
    if (response) {
      if (ticketCookie) {
        const headers = new Headers(response.headers);
        headers.append("Set-Cookie", ticketCookie);
        return new Response(response.body, {
          status: response.status,
          headers,
        });
      }
      return response;
    }
  }

  if (servingHtml && isDevFlag(env, "COMMERCE_DEV_FAKE_APP")) {
    const headers = {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Commerce-Placeholder": "1",
    };
    if (ticketCookie) {
      return new Response(placeholderHtml(version), {
        status: 200,
        headers: { ...headers, "Set-Cookie": ticketCookie },
      });
    }
    return new Response(placeholderHtml(version), { status: 200, headers });
  }

  return error(404, "missing_build", "full_web build is not uploaded yet");
}

export async function onRequest(context) {
  const method = context.request.method;
  if (method === "GET" || method === "HEAD") {
    const res = await onRequestGet(context);
    if (method === "HEAD") {
      return new Response(null, { status: res.status, headers: res.headers });
    }
    return res;
  }
  return error(405, "method_not_allowed", "Allowed: GET, HEAD");
}
