/** Commerce API shared helpers (Pages Functions). */

export const PRODUCT_ID_FULL = "tabbeast_full";
export const PRODUCT_ID_DEMO = "tabbeast_demo";
export const SESSION_COOKIE = "tb_session";
export const SESSION_TTL_SEC = 60 * 60 * 24 * 30;
/** short-lived ticket for /app/* static assets after HTML entitlement check */
export const APP_TICKET_COOKIE = "tb_app";
export const APP_TICKET_TTL_SEC = 60 * 60 * 2;

export function json(data, init = {}) {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(data), { ...init, headers });
}

export function error(status, code, message) {
  return json({ error: code, message }, { status });
}

export function notImplemented(feature) {
  return error(
    501,
    "not_implemented",
    `${feature} is scaffolded. Implementation comes in a later phase.`,
  );
}

export function methodNotAllowed(allowed) {
  return error(405, "method_not_allowed", `Allowed: ${allowed.join(", ")}`);
}

export function commerceDb(env) {
  return env.COMMERCE_DB ?? null;
}

export function appBaseUrl(env, request) {
  const configured = env.APP_BASE_URL?.replace(/\/$/, "");
  if (configured) return configured;
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

export function magicLinkTtlSec(env) {
  const n = Number(env.MAGIC_LINK_TTL_SEC ?? 900);
  return Number.isFinite(n) && n > 0 ? n : 900;
}

export function isDevFlag(env, name) {
  const v = env[name];
  return v === "1" || v === "true" || v === "TRUE";
}

export function sameSitePost(request, env) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  try {
    const originHost = new URL(origin).origin;
    const requestHost = new URL(request.url).origin;
    const configured = new URL(appBaseUrl(env, request)).origin;
    return originHost === requestHost || originHost === configured;
  } catch {
    return false;
  }
}

export function normalizeEmail(raw) {
  if (typeof raw !== "string") return "";
  return raw.trim().toLowerCase();
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function bindingStatus(env) {
  return {
    COMMERCE_DB: Boolean(env.COMMERCE_DB),
    PRODUCTS: Boolean(env.PRODUCTS),
    DB: Boolean(env.DB),
    STRIPE_SECRET_KEY: Boolean(env.STRIPE_SECRET_KEY),
    STRIPE_WEBHOOK_SECRET: Boolean(env.STRIPE_WEBHOOK_SECRET),
    STRIPE_PRICE_ID: Boolean(env.STRIPE_PRICE_ID),
    RESEND_API_KEY: Boolean(env.RESEND_API_KEY),
    MAIL_FROM: Boolean(env.MAIL_FROM),
    APP_BASE_URL: Boolean(env.APP_BASE_URL),
    SESSION_SECRET: Boolean(env.SESSION_SECRET),
    BETTER_AUTH_SECRET: Boolean(env.BETTER_AUTH_SECRET || env.SESSION_SECRET),
    GOOGLE_CLIENT_ID: Boolean(env.GOOGLE_CLIENT_ID),
    GOOGLE_CLIENT_SECRET: Boolean(env.GOOGLE_CLIENT_SECRET),
    DOWNLOAD_URL_TTL_SEC: env.DOWNLOAD_URL_TTL_SEC ?? "900",
    MAGIC_LINK_TTL_SEC: env.MAGIC_LINK_TTL_SEC ?? "900",
    DEMO_WEB_URL: env.DEMO_WEB_URL ?? null,
    DEMO_WIN_URL: env.DEMO_WIN_URL ?? null,
  };
}

export function randomHex(bytes = 32) {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return [...buf].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function bytesToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function downloadTtlSec(env) {
  const n = Number(env.DOWNLOAD_URL_TTL_SEC ?? 900);
  return Number.isFinite(n) && n > 0 ? n : 3600;
}

export async function hmacSha256Hex(secret, message) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret || "dev-session-secret"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signed = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message),
  );
  return bytesToHex(signed);
}

function toBase64Url(text) {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(text) {
  const padded = text.replace(/-/g, "+").replace(/_/g, "/");
  const pad = "=".repeat((4 - (padded.length % 4)) % 4);
  const bin = atob(padded + pad);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export async function createDownloadToken(env, payload) {
  const exp = Math.floor(Date.now() / 1000) + downloadTtlSec(env);
  const body = [
    payload.customerId,
    payload.channel,
    payload.r2Key,
    payload.filename,
    payload.version,
    exp,
  ].join("|");
  const sig = await hmacSha256Hex(env.SESSION_SECRET, body);
  return toBase64Url(`${body}|${sig}`);
}

export async function parseDownloadToken(env, token) {
  if (!token) return null;
  let decoded;
  try {
    decoded = fromBase64Url(token);
  } catch {
    return null;
  }
  const parts = decoded.split("|");
  if (parts.length !== 7) return null;
  const [customerId, channel, r2Key, filename, version, expRaw, sig] = parts;
  const body = [customerId, channel, r2Key, filename, version, expRaw].join("|");
  const expected = await hmacSha256Hex(env.SESSION_SECRET, body);
  if (sig !== expected) return null;
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;
  return {
    customerId: Number(customerId),
    channel,
    r2Key,
    filename,
    version,
    exp,
  };
}

export async function getLatestRelease(db, productId, channel) {
  return db
    .prepare(
      `SELECT product_id, channel, version, r2_key, public_url
       FROM releases
       WHERE product_id = ? AND channel = ? AND is_latest = 1
       LIMIT 1`,
    )
    .bind(productId, channel)
    .first();
}

export function filenameFromR2Key(r2Key, fallback = "download.zip") {
  if (!r2Key) return fallback;
  const parts = r2Key.split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  return last && last.includes(".") ? last : fallback;
}

/** Tiny placeholder zip when R2 object is missing (local only). */
export function placeholderZipBytes(version) {
  const name = "README.txt";
  const content = `TABbeast placeholder package (${version})\nReplace this with a real build in R2.\n`;
  const data = new TextEncoder().encode(content);
  const nameBytes = new TextEncoder().encode(name);

  const localHeader = new Uint8Array(30 + nameBytes.length);
  const view = new DataView(localHeader.buffer);
  view.setUint32(0, 0x04034b50, true);
  view.setUint16(8, 0, true); // store
  view.setUint32(18, data.length, true);
  view.setUint32(22, data.length, true);
  view.setUint16(26, nameBytes.length, true);
  localHeader.set(nameBytes, 30);

  const central = new Uint8Array(46 + nameBytes.length);
  const cview = new DataView(central.buffer);
  cview.setUint32(0, 0x02014b50, true);
  cview.setUint32(16, data.length, true);
  cview.setUint32(20, data.length, true);
  cview.setUint16(28, nameBytes.length, true);
  central.set(nameBytes, 46);

  const end = new Uint8Array(22);
  const eview = new DataView(end.buffer);
  eview.setUint32(0, 0x06054b50, true);
  eview.setUint16(8, 1, true);
  eview.setUint16(10, 1, true);
  eview.setUint32(12, central.length, true);
  eview.setUint32(16, localHeader.length + data.length, true);

  const out = new Uint8Array(
    localHeader.length + data.length + central.length + end.length,
  );
  out.set(localHeader, 0);
  out.set(data, localHeader.length);
  out.set(central, localHeader.length + data.length);
  out.set(end, localHeader.length + data.length + central.length);
  return out;
}

export async function hashToken(token, env) {
  const secret = env.SESSION_SECRET || "";
  const payload = secret ? `${secret}:${token}` : token;
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(payload),
  );
  return bytesToHex(digest);
}

export function parseCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  const parts = header.split(";");
  for (const part of parts) {
    const trimmed = part.trim();
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    if (trimmed.slice(0, eq) === name) {
      return decodeURIComponent(trimmed.slice(eq + 1));
    }
  }
  return "";
}

function cookieSecure(request) {
  return new URL(request.url).protocol === "https:";
}

export function sessionCookieHeader(request, rawId, { clear = false } = {}) {
  const secure = cookieSecure(request) ? "; Secure" : "";
  if (clear) {
    return `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${secure}`;
  }
  return `${SESSION_COOKIE}=${encodeURIComponent(rawId)}; Path=/; Max-Age=${SESSION_TTL_SEC}; HttpOnly; SameSite=Lax${secure}`;
}

function appTicketSecret(env) {
  return env.BETTER_AUTH_SECRET || env.SESSION_SECRET || "dev-session-secret";
}

/**
 * HMAC ticket for /app assets: customerId|exp|version|r2Prefix
 */
export async function createAppTicket(env, { customerId, version, r2Prefix }) {
  const exp = Math.floor(Date.now() / 1000) + APP_TICKET_TTL_SEC;
  const prefix = String(r2Prefix || "").replace(/\/?$/, "/");
  const body = [customerId, String(exp), version, prefix].join("|");
  const sig = await hmacSha256Hex(appTicketSecret(env), body);
  return toBase64Url(`${body}|${sig}`);
}

export async function parseAppTicket(env, token) {
  if (!token) return null;
  let decoded;
  try {
    decoded = fromBase64Url(token);
  } catch {
    return null;
  }
  const parts = decoded.split("|");
  if (parts.length !== 5) return null;
  const [customerId, expRaw, version, r2Prefix, sig] = parts;
  if (!customerId || !version || !r2Prefix) return null;
  const body = [customerId, expRaw, version, r2Prefix].join("|");
  const expected = await hmacSha256Hex(appTicketSecret(env), body);
  if (sig !== expected) return null;
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;
  return {
    customerId,
    version,
    r2Prefix: r2Prefix.replace(/\/?$/, "/"),
    exp,
  };
}

export function appTicketCookieHeader(request, token, { clear = false } = {}) {
  const secure = cookieSecure(request) ? "; Secure" : "";
  if (clear) {
    return `${APP_TICKET_COOKIE}=; Path=/app; Max-Age=0; HttpOnly; SameSite=Lax${secure}`;
  }
  return `${APP_TICKET_COOKIE}=${encodeURIComponent(token)}; Path=/app; Max-Age=${APP_TICKET_TTL_SEC}; HttpOnly; SameSite=Lax${secure}`;
}

export async function getSession(env, request) {
  const db = commerceDb(env);
  if (!db) return null;

  const { getBetterAuthSession } = await import("./auth.js");
  const ba = await getBetterAuthSession(env, request);
  if (!ba?.user?.id) return null;

  const email = normalizeEmail(ba.user.email || "");
  if (!isValidEmail(email)) return null;

  const customer = await ensureCustomerForAuthUser(db, {
    authUserId: ba.user.id,
    email,
  });
  if (!customer) return null;

  return {
    authUserId: ba.user.id,
    customerId: customer.id,
    email: customer.email,
    name: ba.user.name || null,
  };
}

export async function requireSession(env, request) {
  const session = await getSession(env, request);
  if (!session) {
    return { session: null, response: error(401, "unauthorized", "Login required") };
  }
  return { session, response: null };
}

export async function hasActiveFullEntitlement(db, customerId) {
  const row = await db
    .prepare(
      `SELECT id FROM entitlements
       WHERE customer_id = ? AND product_id = ? AND status = 'active'
       LIMIT 1`,
    )
    .bind(customerId, PRODUCT_ID_FULL)
    .first();
  return Boolean(row);
}

export async function findCustomerByEmail(db, email) {
  return db
    .prepare("SELECT id, email, auth_user_id FROM customers WHERE email = ?")
    .bind(email)
    .first();
}

export async function findCustomerByAuthUserId(db, authUserId) {
  if (!authUserId) return null;
  return db
    .prepare(
      "SELECT id, email, auth_user_id FROM customers WHERE auth_user_id = ?",
    )
    .bind(authUserId)
    .first();
}

/**
 * Link or create commerce customer for a Better Auth user.
 * Prefer auth_user_id; fall back to same-email row (test purchase migration).
 */
export async function ensureCustomerForAuthUser(db, { authUserId, email }) {
  if (!authUserId || !email) return null;

  let customer = await findCustomerByAuthUserId(db, authUserId);
  if (customer) {
    if (normalizeEmail(customer.email) !== email) {
      const clash = await findCustomerByEmail(db, email);
      if (clash && clash.id !== customer.id) {
        // Keep auth_user_id binding; do not steal another customer's email.
        return customer;
      }
      await db
        .prepare(
          `UPDATE customers
           SET email = ?, updated_at = datetime('now')
           WHERE id = ?`,
        )
        .bind(email, customer.id)
        .run();
      customer = await findCustomerByAuthUserId(db, authUserId);
    }
    return customer;
  }

  customer = await findCustomerByEmail(db, email);
  if (customer) {
    if (customer.auth_user_id && customer.auth_user_id !== authUserId) {
      // Email already linked to another auth user — create nothing; fail closed.
      return null;
    }
    await db
      .prepare(
        `UPDATE customers
         SET auth_user_id = ?, updated_at = datetime('now')
         WHERE id = ?`,
      )
      .bind(authUserId, customer.id)
      .run();
    return findCustomerByAuthUserId(db, authUserId);
  }

  await db
    .prepare("INSERT INTO customers (email, auth_user_id) VALUES (?, ?)")
    .bind(email, authUserId)
    .run();
  return findCustomerByAuthUserId(db, authUserId);
}

export async function ensureDevPurchaser(db, email) {
  let customer = await findCustomerByEmail(db, email);
  if (!customer) {
    await db
      .prepare("INSERT INTO customers (email) VALUES (?)")
      .bind(email)
      .run();
    customer = await findCustomerByEmail(db, email);
  }
  if (!customer) return null;
  const entitled = await hasActiveFullEntitlement(db, customer.id);
  if (!entitled) {
    await db
      .prepare(
        `INSERT INTO entitlements (customer_id, product_id, status)
         VALUES (?, ?, 'active')`,
      )
      .bind(customer.id, PRODUCT_ID_FULL)
      .run();
  }
  return customer;
}

export async function sendResendEmail(env, { to, subject, html, replyTo }) {
  const apiKey = env.RESEND_API_KEY;
  const from = env.MAIL_FROM;
  if (!apiKey || !from || apiKey.startsWith("re_xxx")) {
    return { sent: false, reason: "not_configured" };
  }
  const payload = { from, to, subject, html };
  if (replyTo && isValidEmail(normalizeEmail(replyTo))) {
    payload.reply_to = normalizeEmail(replyTo);
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("resend_failed", res.status, detail.slice(0, 500));
    return { sent: false, status: res.status, reason: "resend_error" };
  }
  return { sent: true, status: res.status };
}

export async function sendMagicLinkEmail(env, { to, verifyUrl }) {
  return sendResendEmail(env, {
    to,
    subject: "TABbeast ログインリンク",
    html: `<p>TABbeast のマイページにログインするには、次のリンクを開いてください。</p>
<p><a href="${verifyUrl}">${verifyUrl}</a></p>
<p>このリンクは15分間有効で、1回のみ使用できます。</p>
<p>心当たりがない場合はこのメールを無視してください。</p>`,
  });
}

export async function sendPurchaseEmail(env, request, email) {
  const mypage = `${appBaseUrl(env, request)}/mypage`;
  return sendResendEmail(env, {
    to: email,
    subject: "TABbeast のご購入ありがとうございます",
    html: `<p>TABbeast のご購入ありがとうございました（税込 ¥2,920）。</p>
<p>ご購入アカウントに権利が付与されています。マイページからブラウザ版の利用、および Windows 版のダウンロードができます。</p>
<p><a href="${mypage}">${mypage}</a></p>
<p>別の端末やブラウザから開く場合は、同じアカウントで Google ログイン、またはメールのマジックリンクでログインしてください。</p>
`,
  });
}

export async function upsertCustomer(
  db,
  email,
  stripeCustomerId = null,
  authUserId = null,
) {
  let existing = null;
  if (authUserId) {
    existing = await findCustomerByAuthUserId(db, authUserId);
  }
  if (!existing) {
    existing = await findCustomerByEmail(db, email);
  }
  if (existing) {
    await db
      .prepare(
        `UPDATE customers
         SET email = COALESCE(?, email),
             stripe_customer_id = COALESCE(stripe_customer_id, ?),
             auth_user_id = COALESCE(auth_user_id, ?),
             updated_at = datetime('now')
         WHERE id = ?`,
      )
      .bind(email || null, stripeCustomerId, authUserId, existing.id)
      .run();
    if (authUserId) {
      return findCustomerByAuthUserId(db, authUserId);
    }
    return findCustomerByEmail(db, email);
  }
  await db
    .prepare(
      "INSERT INTO customers (email, stripe_customer_id, auth_user_id) VALUES (?, ?, ?)",
    )
    .bind(email, stripeCustomerId, authUserId)
    .run();
  if (authUserId) return findCustomerByAuthUserId(db, authUserId);
  return findCustomerByEmail(db, email);
}

export async function grantFullEntitlement(db, {
  email,
  authUserId = null,
  stripeCustomerId = null,
  checkoutSessionId,
  paymentIntentId = null,
}) {
  if (!email) return { granted: false };
  if (checkoutSessionId) {
    const dup = await db
      .prepare(
        "SELECT id FROM entitlements WHERE stripe_checkout_session_id = ?",
      )
      .bind(checkoutSessionId)
      .first();
    if (dup) return { granted: false, duplicate: true };
  }
  const customer = await upsertCustomer(
    db,
    email,
    stripeCustomerId,
    authUserId,
  );
  if (!customer) return { granted: false };
  await db
    .prepare(
      `INSERT INTO entitlements
        (customer_id, product_id, status, stripe_checkout_session_id, stripe_payment_intent_id)
       VALUES (?, ?, 'active', ?, ?)`,
    )
    .bind(
      customer.id,
      PRODUCT_ID_FULL,
      checkoutSessionId || null,
      paymentIntentId,
    )
    .run();
  return { granted: true, customer };
}

export async function revokeByStripe(db, { paymentIntentId, checkoutSessionId }) {
  if (paymentIntentId) {
    await db
      .prepare(
        `UPDATE entitlements
         SET status = 'revoked', revoked_at = datetime('now')
         WHERE stripe_payment_intent_id = ? AND status = 'active'`,
      )
      .bind(paymentIntentId)
      .run();
  }
  if (checkoutSessionId) {
    await db
      .prepare(
        `UPDATE entitlements
         SET status = 'revoked', revoked_at = datetime('now')
         WHERE stripe_checkout_session_id = ? AND status = 'active'`,
      )
      .bind(checkoutSessionId)
      .run();
  }
}

export async function listEntitlements(db, customerId) {
  const { results } = await db
    .prepare(
      `SELECT product_id AS productId, status
       FROM entitlements
       WHERE customer_id = ?
       ORDER BY id DESC`,
    )
    .bind(customerId)
    .all();
  return results ?? [];
}

export async function latestFullReleases(db) {
  const { results } = await db
    .prepare(
      `SELECT channel, version
       FROM releases
       WHERE product_id = ? AND is_latest = 1
         AND channel IN ('full_win', 'full_web')`,
    )
    .bind(PRODUCT_ID_FULL)
    .all();
  const latest = {};
  for (const row of results ?? []) {
    latest[row.channel] = { version: row.version };
  }
  return latest;
}

export async function handleLogout(env, request) {
  try {
    const { createAuth } = await import("./auth.js");
    if (env.COMMERCE_DB) {
      const auth = createAuth(env, request);
      const res = await auth.api.signOut({
        headers: request.headers,
        asResponse: true,
      });
      if (res instanceof Response) {
        // Also clear legacy tb_session
        const headers = new Headers(res.headers);
        headers.append(
          "Set-Cookie",
          sessionCookieHeader(request, "", { clear: true }),
        );
        return new Response(res.body, { status: res.status, headers });
      }
    }
  } catch (err) {
    console.error("handleLogout_failed", String(err));
  }
  return json(
    { ok: true },
    { headers: { "Set-Cookie": sessionCookieHeader(request, "", { clear: true }) } },
  );
}
