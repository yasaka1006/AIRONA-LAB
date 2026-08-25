import { bindingStatus, json, methodNotAllowed } from "../../_lib/commerce.js";

/**
 * GET /api/commerce/health
 * P0: binding / secret の有無を返す（値は出さない）
 */
export async function onRequestGet(context) {
  const status = bindingStatus(context.env);
  const readyDb = status.COMMERCE_DB;
  return json({
    ok: true,
    phase: "P5",
    service: "commerce",
    commerceDbBound: readyDb,
    bindings: status,
  });
}

export async function onRequest(context) {
  if (context.request.method === "GET") {
    return onRequestGet(context);
  }
  return methodNotAllowed(["GET"]);
}
