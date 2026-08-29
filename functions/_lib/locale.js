/** @typedef {'ja' | 'en'} SiteLocale */

export const LOCALE_COOKIE = "airona-lab-locale";

/** @param {unknown} value @returns {SiteLocale} */
export function normalizeLocale(value) {
  return value === "en" ? "en" : "ja";
}

/**
 * @param {Request} request
 * @param {unknown} [bodyLocale]
 * @returns {SiteLocale}
 */
export function parseLocaleFromRequest(request, bodyLocale) {
  if (bodyLocale === "en" || bodyLocale === "ja") {
    return bodyLocale;
  }

  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(
    new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=(ja|en)(?:;|$)`),
  );
  if (match) return /** @type {SiteLocale} */ (match[1]);

  const accept = request.headers.get("Accept-Language") || "";
  const primary = accept.split(",")[0]?.trim().toLowerCase() || "";
  if (primary && !primary.startsWith("ja")) return "en";
  return "ja";
}

/**
 * @param {SiteLocale} locale
 * @param {string} pathname
 * @returns {string}
 */
export function localizedPath(locale, pathname) {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (locale === "en") {
    if (normalized === "/") return "/en";
    return `/en${normalized}`;
  }
  return normalized;
}
