function timingSafeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) {
    return false;
  }
  let out = 0;
  for (let i = 0; i < a.length; i += 1) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

function bytesToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function stripeConfigured(env) {
  const key = env.STRIPE_SECRET_KEY || "";
  const price = env.STRIPE_PRICE_ID || "";
  return (
    key.startsWith("sk_") &&
    !key.includes("xxx") &&
    price.startsWith("price_") &&
    !price.includes("xxx")
  );
}

export async function verifyStripeSignature(rawBody, header, secret) {
  if (!header || !secret || secret.includes("xxx")) return false;
  const items = header.split(",").map((part) => part.trim());
  const timestamp = items.find((p) => p.startsWith("t="))?.slice(2);
  const signatures = items
    .filter((p) => p.startsWith("v1="))
    .map((p) => p.slice(3));
  if (!timestamp || signatures.length === 0) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signed = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${timestamp}.${rawBody}`),
  );
  const expected = bytesToHex(signed);
  return signatures.some((sig) => timingSafeEqual(sig, expected));
}

function formEncode(fields) {
  return Object.entries(fields)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join("&");
}

export async function createStripeCheckoutSession(env, request, { customerEmail }) {
  const base = (env.APP_BASE_URL || new URL(request.url).origin).replace(
    /\/$/,
    "",
  );
  const fields = {
    mode: "payment",
    "line_items[0][price]": env.STRIPE_PRICE_ID,
    "line_items[0][quantity]": "1",
    success_url: `${base}/mypage?checkout=success`,
    cancel_url: `${base}/tabbeast?checkout=cancel`,
    "metadata[product_id]": "tabbeast_full",
  };
  if (customerEmail) {
    fields.customer_email = customerEmail;
  }

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formEncode(fields),
  });
  const data = await res.json();
  if (!res.ok || !data.url) {
    const message = data?.error?.message || "Stripe checkout failed";
    const err = new Error(message);
    err.status = 502;
    throw err;
  }
  return data;
}

export async function stripeGet(env, path) {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` },
  });
  return res.json();
}

export function paymentIntentId(value) {
  if (!value) return null;
  if (typeof value === "string") return value;
  return value.id || null;
}
