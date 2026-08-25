import {
  error,
  handleLogout,
  methodNotAllowed,
  sameSitePost,
} from "../../../_lib/commerce.js";

/**
 * POST /api/commerce/auth/logout
 */
export async function onRequestPost(context) {
  const { request, env } = context;
  if (!sameSitePost(request, env)) {
    return error(403, "forbidden", "Invalid origin");
  }
  return handleLogout(env, request);
}

export async function onRequest(context) {
  if (context.request.method === "POST") {
    return onRequestPost(context);
  }
  return methodNotAllowed(["POST"]);
}
