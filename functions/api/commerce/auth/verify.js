import {
  appBaseUrl,
  commerceDb,
  findCustomerByEmail,
  hashToken,
  methodNotAllowed,
  randomHex,
  sessionCookieHeader,
} from "../../../_lib/commerce.js";

function redirectToMypage(env, request, { auth, cookie } = {}) {
  const url = new URL("/mypage", `${appBaseUrl(env, request)}/`);
  if (auth) url.searchParams.set("auth", auth);
  const headers = { Location: url.toString() };
  if (cookie) headers["Set-Cookie"] = cookie;
  return new Response(null, { status: 302, headers });
}

/**
 * GET /api/commerce/auth/verify?token=
 */
export async function onRequestGet(context) {
  const { request, env } = context;
  const db = commerceDb(env);
  const token = new URL(request.url).searchParams.get("token") || "";
  if (!db || !token) {
    return redirectToMypage(env, request, { auth: "invalid" });
  }

  const tokenHash = await hashToken(token, env);
  const row = await db
    .prepare(
      `SELECT id, email FROM auth_tokens
       WHERE token_hash = ?
         AND used_at IS NULL
         AND datetime(expires_at) > datetime('now')`,
    )
    .bind(tokenHash)
    .first();

  if (!row) {
    return redirectToMypage(env, request, { auth: "invalid" });
  }

  await db
    .prepare("UPDATE auth_tokens SET used_at = datetime('now') WHERE id = ?")
    .bind(row.id)
    .run();

  const customer = await findCustomerByEmail(db, row.email);
  if (!customer) {
    return redirectToMypage(env, request, { auth: "invalid" });
  }

  const sessionId = randomHex(32);
  const sessionHash = await hashToken(sessionId, env);
  await db
    .prepare(
      `INSERT INTO sessions (customer_id, session_hash, expires_at)
       VALUES (?, ?, datetime('now', '+30 days'))`,
    )
    .bind(customer.id, sessionHash)
    .run();

  return redirectToMypage(env, request, {
    cookie: sessionCookieHeader(request, sessionId),
  });
}

export async function onRequest(context) {
  if (context.request.method === "GET") {
    return onRequestGet(context);
  }
  return methodNotAllowed(["GET"]);
}
