import {
  appBaseUrl,
  commerceDb,
  error,
  getSession,
  grantFullEntitlement,
  isDevFlag,
  json,
  methodNotAllowed,
  randomHex,
  readJson,
  sameSitePost,
} from "../../_lib/commerce.js";
import {
  createStripeCheckoutSession,
  stripeConfigured,
} from "../../_lib/stripe.js";

/**
 * POST /api/commerce/checkout — login required
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
  if (body?.agreeToTerms !== true) {
    return error(400, "terms_required", "agreeToTerms must be true");
  }

  const session = await getSession(env, request);
  if (!session) {
    return error(401, "unauthorized", "Login required before checkout");
  }

  if (isDevFlag(env, "COMMERCE_DEV_FAKE_CHECKOUT") && !stripeConfigured(env)) {
    await grantFullEntitlement(db, {
      email: session.email,
      authUserId: session.authUserId,
      checkoutSessionId: `cs_dev_${randomHex(12)}`,
    });
    return json({ url: `${appBaseUrl(env, request)}/mypage?checkout=success` });
  }

  if (!stripeConfigured(env)) {
    return error(503, "stripe_not_configured", "Stripe is not configured");
  }

  try {
    const checkout = await createStripeCheckoutSession(env, request, {
      customerEmail: session.email,
      authUserId: session.authUserId,
    });
    return json({ url: checkout.url });
  } catch (err) {
    return error(err.status || 502, "stripe_error", err.message);
  }
}

export async function onRequest(context) {
  if (context.request.method === "POST") {
    return onRequestPost(context);
  }
  return methodNotAllowed(["POST"]);
}
