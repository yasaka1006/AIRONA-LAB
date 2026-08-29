import { Link } from 'react-router-dom';
import { setStoredLocale } from './localePreference';
import { useSiteLocale } from './siteLocale';

/** JA / EN toggle in the site footer. */export default function LanguageSwitch({ className = '' }) {
  const { locale, alternateLocale, alternatePath, t } = useSiteLocale();

  return (
    <Link
      to={alternatePath}
      onClick={() => setStoredLocale(alternateLocale)}
      className={`inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-800 transition-colors ${className}`.trim()}
      hrefLang={locale === 'ja' ? 'en' : 'ja'}
      lang={locale === 'ja' ? 'en' : 'ja'}
      aria-label={t('language.label')}
    >
      <span className={locale === 'ja' ? 'text-slate-800' : 'text-slate-400'}>JA</span>
      <span aria-hidden className="text-slate-400">/</span>
      <span className={locale === 'en' ? 'text-slate-800' : 'text-slate-400'}>EN</span>
    </Link>
  );
}
