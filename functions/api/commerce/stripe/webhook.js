import {
  commerceDb,
  error,
  grantFullEntitlement,
  json,
  methodNotAllowed,
  normalizeEmail,
  revokeByStripe,
  sendPurchaseEmail,
} from "../../../_lib/commerce.js";
import {
  paymentIntentId,
  stripeConfigured,
  stripeGet,
  verifyStripeSignature,
} from "../../../_lib/stripe.js";

function eventEmail(session) {
  return normalizeEmail(
    session?.customer_details?.email || session?.customer_email || "",
  );
}

/**
 * POST /api/commerce/stripe/webhook
 */
export async function onRequestPost(context) {
  const { request, env } = context;
  const db = commerceDb(env);
  if (!db) {
    return error(503, "unavailable", "COMMERCE_DB is not bound");
  }

  const raw = await request.text();
  const signature = request.headers.get("Stripe-Signature") || "";
  const valid = await verifyStripeSignature(
    raw,
    signature,
    env.STRIPE_WEBHOOK_SECRET,
  );
  if (!valid.ok) {
    return error(400, valid.reason, `Invalid Stripe signature (${valid.reason})`);
  }

  let event;
  try {
    event = JSON.parse(raw);
  } catch {
    return error(400, "invalid_payload", "Invalid JSON");
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data?.object || {};
      const email = eventEmail(session);
      if (email) {
        const result = await grantFullEntitlement(db, {
          email,
          stripeCustomerId:
            typeof session.customer === "string" ? session.customer : null,
          checkoutSessionId: session.id,
          paymentIntentId: paymentIntentId(session.payment_intent),
        });
        if (result.granted) {
          await sendPurchaseEmail(env, request, email);
        }
      }
    } else if (event.type === "charge.refunded") {
      const charge = event.data?.object || {};
      await revokeByStripe(db, {
        paymentIntentId: paymentIntentId(charge.payment_intent),
      });
    } else if (event.type === "charge.dispute.created") {
      const dispute = event.data?.object || {};
      let pi = paymentIntentId(dispute.payment_intent);
      if (!pi && dispute.charge && stripeConfigured(env)) {
        const charge = await stripeGet(env, `charges/${dispute.charge}`);
        pi = paymentIntentId(charge.payment_intent);
      }
      await revokeByStripe(db, { paymentIntentId: pi });
    }
  } catch {
    return error(500, "webhook_failed", "Failed to process webhook");
  }

  return json({ received: true });
}

export async function onRequest(context) {
  if (context.request.method === "POST") {
    return onRequestPost(context);
  }
  return methodNotAllowed(["POST"]);
}
