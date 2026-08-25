import {
  commerceDb,
  error,
  hashToken,
  isDevFlag,
  isValidEmail,
  json,
  magicLinkTtlSec,
  methodNotAllowed,
  normalizeEmail,
  randomHex,
  readJson,
  sameSitePost,
  sendMagicLinkEmail,
  appBaseUrl,
  ensureDevPurchaser,
  findCustomerByEmail,
  hasActiveFullEntitlement,
} from "../../../_lib/commerce.js";

/**
 * POST /api/commerce/auth/magic-link
 * Always { ok: true }. Mail is sent only when an active entitlement exists.
 */
export async function onRequestPost(context) {
  const { request, env } = context;
  if (!sameSitePost(request, env)) {
    return error(403, "forbidden", "Invalid origin");
  }

  const db = commerceDb(env);
  if (!db) {
    return error(503, "unavailable", "COMMERCE_DB is not bound");
  }

  const body = await readJson(request);
  const email = normalizeEmail(body?.email);
  if (!isValidEmail(email)) {
    return error(400, "invalid_email", "A valid email is required");
  }

  const okBody = { ok: true };

  if (isDevFlag(env, "COMMERCE_DEV_ALLOW_ANY_EMAIL")) {
    await ensureDevPurchaser(db, email);
  }

  const customer = await findCustomerByEmail(db, email);
  const entitled =
    customer && (await hasActiveFullEntitlement(db, customer.id));

  if (!entitled) {
    // 列挙防止: 未購入でも ok。メールは送らない。
    if (isDevFlag(env, "COMMERCE_DEV_RETURN_LINK")) {
      okBody.devHint = "no_entitlement_email_not_sent";
    }
    return json(okBody);
  }

  const token = randomHex(32);
  const tokenHash = await hashToken(token, env);
  const ttl = magicLinkTtlSec(env);

  await db
    .prepare(
      `INSERT INTO auth_tokens (email, token_hash, expires_at)
       VALUES (?, ?, datetime('now', ?))`,
    )
    .bind(email, tokenHash, `+${ttl} seconds`)
    .run();

  const verifyUrl = `${appBaseUrl(env, request)}/api/commerce/auth/verify?token=${token}`;
  const mail = await sendMagicLinkEmail(env, { to: email, verifyUrl });

  if (isDevFlag(env, "COMMERCE_DEV_RETURN_LINK")) {
    okBody.devVerifyUrl = verifyUrl;
    okBody.devMail = mail;
  }

  return json(okBody);
}

export async function onRequest(context) {
  if (context.request.method === "POST") {
    return onRequestPost(context);
  }
  return methodNotAllowed(["POST"]);
}
