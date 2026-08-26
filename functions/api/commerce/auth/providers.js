import { json, methodNotAllowed } from "../../../_lib/commerce.js";

/**
 * GET /api/commerce/auth/providers
 */
export async function onRequest(context) {
  if (context.request.method !== "GET") {
    return methodNotAllowed(["GET"]);
  }
  const { env } = context;
  const google =
    Boolean(env.GOOGLE_CLIENT_ID) &&
    Boolean(env.GOOGLE_CLIENT_SECRET) &&
    !String(env.GOOGLE_CLIENT_ID).includes("xxx");
  return json({
    google,
    magicLink: true,
    bindings: {
      BETTER_AUTH_SECRET: Boolean(env.BETTER_AUTH_SECRET || env.SESSION_SECRET),
      RESEND: Boolean(env.RESEND_API_KEY && env.MAIL_FROM),
    },
  });
}
