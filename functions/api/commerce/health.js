import { bindingStatus, json, methodNotAllowed } from "../../_lib/commerce.js";
import { isLocalApp } from "../../_lib/security.js";

/**
 * GET /api/commerce/health
 */
export async function onRequestGet(context) {
  const { env } = context;
  if (!isLocalApp(env)) {
    return json({ ok: true, service: "commerce" });
  }
  const status = bindingStatus(env);
  return json({
    ok: true,
    phase: "P5",
    service: "commerce",
    commerceDbBound: Boolean(status.COMMERCE_DB),
    bindings: status,
  });
}

export async function onRequest(context) {
  if (context.request.method === "GET") {
    return onRequestGet(context);
  }
  return methodNotAllowed(["GET"]);
}
