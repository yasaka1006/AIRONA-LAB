import { LOCALIZED_PATHS } from './routes';

export const LOCALE_STORAGE_KEY = 'airona-lab-locale';
export const LOCALE_COOKIE = LOCALE_STORAGE_KEY;

/** @param {'ja' | 'en'} locale */
export function syncLocaleCookie(locale) {
  if (typeof document === 'undefined') return;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

/** @returns {boolean} */
export function browserPrefersJapanese() {
  const langs = navigator.languages?.length
    ? navigator.languages
    : [navigator.language].filter(Boolean);
  return langs.some((lang) => String(lang).toLowerCase().startsWith('ja'));
}

/** @returns {'ja' | 'en' | null} */
export function getStoredLocale() {
  try {
    const value = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (value === 'ja' || value === 'en') return value;
  } catch {
    // ignore
  }
  return null;
}

/** @param {'ja' | 'en'} locale */
export function setStoredLocale(locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // ignore
  }
  syncLocaleCookie(locale);
}

/** @returns {'ja' | 'en'} */
export function getPreferredLocale() {
  const stored = getStoredLocale();
  if (stored) return stored;
  return browserPrefersJapanese() ? 'ja' : 'en';
}

/**
 * @param {string} pathname
 * @returns {string}
 */
export function stripLocalePrefix(pathname) {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3) || '/';
  return pathname;
}

/** @param {string} pathname */
export function isLocalizedPath(pathname) {
  return LOCALIZED_PATHS.includes(stripLocalePrefix(pathname));
}

/**
 * Redirect non-/en localized paths when the preferred locale is English.
 * Explicit /en/… URLs are kept as-is (shared links stay English).
 *
 * @param {string} pathname
 * @param {string} [search]
 * @param {string} [hash]
 * @returns {string | null}
 */
export function getLocaleRedirectTarget(pathname, search = '', hash = '') {
  const isEnPath = pathname === '/en' || pathname.startsWith('/en/');
  if (isEnPath) return null;

  const base = stripLocalePrefix(pathname);
  if (!LOCALIZED_PATHS.includes(base)) return null;

  if (getPreferredLocale() !== 'en') return null;

  const enPath = base === '/' ? '/en' : `/en${base}`;
  return `${enPath}${search}${hash}`;
}
