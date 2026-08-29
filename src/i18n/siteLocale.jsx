import { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { syncLocaleCookie } from './localePreference';
import { en } from './messages/en';
import { ja } from './messages/ja';

/** @typedef {'ja' | 'en'} SiteLocale */

const MESSAGES = { ja, en };

/** @type {import('react').Context<SiteLocaleContextValue | null>} */
const SiteLocaleContext = createContext(null);

/**
 * @param {string} pathname
 * @returns {SiteLocale}
 */
function localeFromPathname(pathname) {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ja';
}

/**
 * @param {string} pathname
 * @returns {string}
 */
function stripLocalePrefix(pathname) {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3) || '/';
  return pathname;
}

/**
 * @param {string} pathname
 * @param {SiteLocale} locale
 * @returns {string}
 */
function withLocalePrefix(pathname, locale) {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (locale === 'en') {
    if (normalized === '/') return '/en';
    return `/en${normalized}`;
  }
  return normalized;
}

/**
 * @param {Record<string, unknown> | undefined} table
 * @param {string} key
 * @returns {string}
 */
function translate(table, key) {
  const parts = key.split('.');
  let node = table;
  for (const part of parts) {
    if (node == null || typeof node !== 'object' || !(part in node)) {
      return key;
    }
    node = /** @type {Record<string, unknown>} */ (node)[part];
  }
  return typeof node === 'string' ? node : key;
}

/**
 * @typedef {object} SiteLocaleContextValue
 * @property {SiteLocale} locale
 * @property {(key: string) => string} t
 * @property {(pathname: string) => string} path
 * @property {SiteLocale} alternateLocale
 * @property {string} alternatePath
 */

/**
 * @param {{ children: import('react').ReactNode }} props
 */
export function LocaleProvider({ children }) {
  const { pathname } = useLocation();
  const locale = localeFromPathname(pathname);

  useEffect(() => {
    syncLocaleCookie(locale);
  }, [locale]);

  const value = useMemo(() => {
    const messages = MESSAGES[locale];
    const basePath = stripLocalePrefix(pathname);
    const alternateLocale = locale === 'ja' ? 'en' : 'ja';

    /** @type {SiteLocaleContextValue} */
    const ctx = {
      locale,
      t: (key) => translate(messages, key),
      path: (targetPath) => withLocalePrefix(targetPath, locale),
      alternateLocale,
      alternatePath: withLocalePrefix(basePath, alternateLocale),
    };
    return ctx;
  }, [locale, pathname]);

  return (
    <SiteLocaleContext.Provider value={value}>
      {children}
    </SiteLocaleContext.Provider>
  );
}

/** @returns {SiteLocaleContextValue} */
// eslint-disable-next-line react-refresh/only-export-components -- context hook lives with provider
export function useSiteLocale() {
  const ctx = useContext(SiteLocaleContext);
  if (!ctx) {
    throw new Error('useSiteLocale must be used within LocaleProvider');
  }
  return ctx;
}
