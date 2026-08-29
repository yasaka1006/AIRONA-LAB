import { Link, useLocation } from 'react-router-dom';
import LanguageSwitch from '../../i18n/LanguageSwitch';
import { isLocalizedPath } from '../../i18n/localePreference';
import { useSiteLocale } from '../../i18n/siteLocale';

const Footer = () => {
  const { pathname } = useLocation();
  const { t, path } = useSiteLocale();
  const showLanguageSwitch = isLocalizedPath(pathname);

  return (
    <footer className="bg-slate-200 border-t border-slate-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div
          className={
            showLanguageSwitch
              ? 'flex flex-col items-center gap-3 sm:grid sm:grid-cols-3 sm:items-center'
              : 'flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between'
          }
        >
          <p className="text-xs text-slate-600 text-center sm:text-left">
            {t('footer.copyright')}
          </p>
          {showLanguageSwitch ? (
            <div className="flex justify-center">
              <LanguageSwitch />
            </div>
          ) : null}
          <div className="flex flex-wrap justify-center gap-3 sm:justify-end text-xs text-slate-600">
            <Link to={path('/legal/terms')} className="underline">
              {t('footer.terms')}
            </Link>
            <Link to={path('/legal/tokushoho')} className="underline">
              {t('footer.tokushoho')}
            </Link>
            <Link to={path('/privacy-policy')} className="underline">
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
