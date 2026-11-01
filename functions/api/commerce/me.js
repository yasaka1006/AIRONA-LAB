import {
  commerceDb,
  error,
  json,
  latestFullReleases,
  listEntitlements,
  listFullDesktopReleases,
  methodNotAllowed,
  requireSession,
} from "../../_lib/commerce.js";

/**
 * GET /api/commerce/me
 */
export async function onRequestGet(context) {
  const { request, env } = context;
  const db = commerceDb(env);
  if (!db) {
    return error(503, "unavailable", "COMMERCE_DB is not bound");
  }

  const { session, response } = await requireSession(env, request);
  if (response) return response;

  const [entitlements, latest, windowsReleases, macReleases] = await Promise.all([
    listEntitlements(db, session.customerId),
    latestFullReleases(db),
    listFullDesktopReleases(db, "full_win"),
    listFullDesktopReleases(db, "full_mac"),
  ]);

  return json({
    email: session.email,
    authUserId: session.authUserId,
    entitlements,
    latest,
    windowsReleases,
    macReleases,
  });
}

export async function onRequest(context) {
  if (context.request.method === "GET") {
    return onRequestGet(context);
  }
  return methodNotAllowed(["GET"]);
}
