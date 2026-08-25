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

function hexToBytes(hex) {
  if (!hex || hex.length % 2 !== 0) return null;
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i += 1) {
    const n = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    if (!Number.isFinite(n)) return null;
    bytes[i] = n;
  }
  return bytes;
}

/**
 * @returns {{ ok: true } | { ok: false, reason: string }}
 */
export async function verifyStripeSignature(rawBody, header, secret) {
  const cleaned = String(secret || "")
    .trim()
    .replace(/^["']|["']$/g, "");
  if (!header || !cleaned || cleaned.includes("xxx")) {
    return { ok: false, reason: "missing_secret_or_header" };
  }
  const items = header.split(",").map((part) => part.trim());
  const timestamp = items.find((p) => p.startsWith("t="))?.slice(2);
  const signatures = items
    .filter((p) => p.startsWith("v1="))
    .map((p) => p.slice(3));
  if (!timestamp || signatures.length === 0) {
    return { ok: false, reason: "bad_header" };
  }

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  // Stripe の「再送信」は元イベントの t= を使う。古い失敗イベントの再送はここで落ちる
  if (!Number.isFinite(age) || age > 300) {
    return { ok: false, reason: "timestamp_too_old" };
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(cleaned),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  const signedPayload = new TextEncoder().encode(`${timestamp}.${rawBody}`);

  for (const signature of signatures) {
    const sigBytes = hexToBytes(signature);
    if (!sigBytes) continue;
    const ok = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      signedPayload,
    );
    if (ok) return { ok: true };
  }
  return { ok: false, reason: "bad_signature" };
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
