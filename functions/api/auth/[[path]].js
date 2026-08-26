/**
 * Better Auth catch-all: /api/auth/*
 */
import { createAuth } from "../../_lib/auth.js";
import { error } from "../../_lib/commerce.js";

export async function onRequest(context) {
  const { request, env } = context;
  if (!env.COMMERCE_DB) {
    return error(503, "unavailable", "COMMERCE_DB is not bound");
  }
  try {
    const auth = createAuth(env, request);
    return await auth.handler(request);
  } catch (err) {
    console.error("auth_handler_failed", String(err));
    return error(500, "auth_error", "Authentication handler failed");
  }
}
