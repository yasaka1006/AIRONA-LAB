/** Request hardening helpers for Pages Functions. */

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

export function hostnameFromUrl(value) {
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return "";
  }
}

/** True only when APP_BASE_URL points at a local dev server. */
export function isLocalApp(env) {
  const host = hostnameFromUrl(env.APP_BASE_URL || "");
  return LOCAL_HOSTS.has(host);
}

export function isLocalRequest(request) {
  const host = hostnameFromUrl(request.url);
  return LOCAL_HOSTS.has(host);
}

function isPlaceholderSecret(value) {
  const secret = String(value || "");
  if (secret.length < 16) return true;
  if (secret.includes("xxx")) return true;
  if (secret === "dev-session-secret") return true;
  if (secret === "dev-better-auth-secret-change-me") return true;
  if (secret === "generate-a-long-random-hex") return true;
  return false;
}

/**
 * HMAC / Better Auth secret. Local APP_BASE_URL may fall back; production must be set.
 * @param {any} env
 * @param {string} [localFallback]
 */
export function requireAppSecret(env, localFallback) {
  const secret = env.BETTER_AUTH_SECRET || env.SESSION_SECRET || "";
  if (!isPlaceholderSecret(secret)) return secret;
  if (isLocalApp(env) && localFallback) return localFallback;
  throw new Error("BETTER_AUTH_SECRET or SESSION_SECRET is not configured");
}

export function clientIp(request) {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export function timingSafeEqualHex(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) {
    return false;
  }
  let out = 0;
  for (let i = 0; i < a.length; i += 1) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

export function rateLimitedResponse(retryAfterSec = 60) {
  return new Response(JSON.stringify({ error: "rate_limited", message: "Too many requests" }), {
    status: 429,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Retry-After": String(Math.max(1, retryAfterSec)),
      "Cache-Control": "no-store",
    },
  });
}

/**
 * Best-effort sliding window via Cache API (per colo).
 * @returns {Promise<{ ok: true } | { ok: false, retryAfter: number }>}
 */
export async function consumeRateLimit(request, { bucket, limit, windowSec }) {
  const ip = clientIp(request);
  const keyUrl = `https://ratelimit.airona.internal/${encodeURIComponent(bucket)}/${encodeURIComponent(ip)}`;
  const cacheKey = new Request(keyUrl, { method: "GET" });
  const now = Date.now();
  let count = 0;
  let exp = now + windowSec * 1000;

  try {
    if (typeof caches !== "undefined" && caches.default) {
      const hit = await caches.default.match(cacheKey);
      if (hit) {
        const data = await hit.json().catch(() => null);
        if (data && typeof data.count === "number" && typeof data.exp === "number") {
          if (now <= data.exp) {
            count = data.count;
            exp = data.exp;
          }
        }
      }
    }
  } catch {
    // fail open on cache errors
  }

  count += 1;
  const retryAfter = Math.max(1, Math.ceil((exp - now) / 1000));
  if (count > limit) {
    return { ok: false, retryAfter };
  }

  try {
    if (typeof caches !== "undefined" && caches.default) {
      await caches.default.put(
        cacheKey,
        new Response(JSON.stringify({ count, exp }), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": `max-age=${retryAfter}`,
          },
        }),
      );
    }
  } catch {
    // ignore
  }

  return { ok: true };
}

export function isMagicLinkAuthPath(pathname) {
  const path = pathname.toLowerCase();
  return path.includes("magic-link") || path.includes("magic_link");
}

export function sanitizeDownloadFilename(name, fallback = "download.zip") {
  const base = String(name || "")
    .replace(/[\r\n"]/g, "")
    .replace(/^.*[\\/]/, "")
    .slice(0, 180);
  return base && /\.[A-Za-z0-9]+$/.test(base) ? base : fallback;
}
