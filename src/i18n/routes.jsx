/** @param {string} pathname */
export function localeFromPathname(pathname) {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ja';
}

/** @param {string} pathname @param {'ja'|'en'} locale */
export function pageTitle(pathname, locale) {
  const base = pathname === '/en' ? '/' : pathname.replace(/^\/en/, '') || '/';
  const titles = locale === 'en' ? PAGE_TITLES_EN : PAGE_TITLES_JA;
  return titles[base] ?? (locale === 'en' ? 'AIRONA-LAB' : 'AIRONA-LAB');
}

const PAGE_TITLES_JA = {
  '/': 'AIRONA-LAB',
  '/privacy-policy': 'プライバシーポリシー - AIRONA-LAB',
  '/tabbeast': 'TABbeast - AIRONA-LAB',
  '/tabbeast/contact': 'お問い合わせ - TABbeast',
  '/tabbeast/guide': 'ご利用の流れ - TABbeast',
  '/tabbeast/manual': 'マニュアル - TABbeast',
  '/mypage': 'マイページ - AIRONA-LAB',
  '/mypage/email': 'メールアドレス変更 - AIRONA-LAB',
  '/legal/terms': '利用規約 - AIRONA-LAB',
  '/legal/tokushoho': '特定商取引法に基づく表記 - AIRONA-LAB',
};

const PAGE_TITLES_EN = {
  '/': 'AIRONA-LAB',
  '/privacy-policy': 'Privacy Policy - AIRONA-LAB',
  '/tabbeast': 'TABbeast - AIRONA-LAB',
  '/tabbeast/contact': 'Contact - TABbeast',
  '/tabbeast/guide': 'Getting Started - TABbeast',
  '/tabbeast/manual': 'Manual - TABbeast',
  '/mypage': 'My Page - AIRONA-LAB',
  '/mypage/email': 'Change Email - AIRONA-LAB',
  '/legal/terms': 'Terms of Service - AIRONA-LAB',
  '/legal/tokushoho': 'Legal Notice - AIRONA-LAB',
};

/** Duplicate route paths with /en prefix for localized pages */
export const LOCALIZED_PATHS = [
  '/tabbeast',
  '/tabbeast/contact',
  '/tabbeast/guide',
  '/tabbeast/manual',
  '/tabbeast/mypage',
  '/mypage',
  '/mypage/email',
  '/privacy-policy',
  '/legal/terms',
  '/legal/tokushoho',
];
