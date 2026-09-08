/**
 * Better Auth catch-all: /api/auth/*
 */
import { createAuth } from "../../_lib/auth.js";
import { error } from "../../_lib/commerce.js";
import {
  consumeRateLimit,
  isMagicLinkAuthPath,
  rateLimitedResponse,
} from "../../_lib/security.js";

export async function onRequest(context) {
  const { request, env } = context;
  if (!env.COMMERCE_DB) {
    return error(503, "unavailable", "COMMERCE_DB is not bound");
  }

  const path = new URL(request.url).pathname;
  if (request.method !== "GET" && request.method !== "HEAD") {
    if (isMagicLinkAuthPath(path)) {
      const limited = await consumeRateLimit(request, {
        bucket: "magic-link",
        limit: 5,
        windowSec: 900,
      });
      if (!limited.ok) return rateLimitedResponse(limited.retryAfter);
    } else {
      const limited = await consumeRateLimit(request, {
        bucket: "auth-write",
        limit: 30,
        windowSec: 60,
      });
      if (!limited.ok) return rateLimitedResponse(limited.retryAfter);
    }
  }

  try {
    const auth = createAuth(env, request);
    return await auth.handler(request);
  } catch (err) {
    console.error("auth_handler_failed", String(err));
    return error(500, "auth_error", "Authentication handler failed");
  }
}
