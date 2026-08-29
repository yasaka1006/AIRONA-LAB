import { useSiteLocale } from '../i18n/siteLocale';

const PrivacyPolicy = () => {
  const { t, path } = useSiteLocale();

  return (
    <main className="my-4 space-y-4 md:mx-30 lg:mx-48">
      <div className="bg-white py-8 px-4 md:px-25 rounded-xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-8">
          {t('pages.privacy.tabbeastTitle')}
        </h2>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed space-y-2">
          {t('pages.privacy.tabbeastBody')}
          <a href={path('/legal/terms')} className="text-blue-600 hover:text-blue-800 underline mx-1">
            {t('pages.privacy.termsLink')}
          </a>
          {t('pages.privacy.and')}
          <a href={path('/legal/tokushoho')} className="text-blue-600 hover:text-blue-800 underline mx-1">
            {t('pages.privacy.tokushohoLink')}
          </a>
          {t('pages.privacy.referSuffix')}
        </p>
      </div>

      <div className="bg-white py-8 px-4 md:px-25 rounded-xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-8">
          {t('pages.privacy.policyTitle')}
        </h2>
        <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">
          {t('pages.privacy.affiliateTitle')}
        </h3>
        <p className="text-slate-600 text-sm md:text-base">
          {t('pages.privacy.affiliateBody1')}
          <br />
          {t('pages.privacy.affiliateBody2')}
          <br />
          {t('pages.privacy.affiliateBody3')}
          <br />
          {t('pages.privacy.affiliateBody4Prefix')}
          <a
            href="https://myadcenter.google.com/home?sasb=true&ref=ad-settings"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            {t('pages.privacy.affiliateBody4Link')}
          </a>
          {t('pages.privacy.affiliateBody4Suffix')}
        </p>
      </div>

      <div className="bg-white py-8 px-4 md:px-25 rounded-xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-8">
          {t('pages.privacy.disclaimerTitle')}
        </h2>
        <p className="text-slate-600 text-sm md:text-base">
          {t('pages.privacy.disclaimerBody1')}
          <br />
          {t('pages.privacy.disclaimerBody2')}
          <br />
          {t('pages.privacy.disclaimerBody3')}
          <br />
          {t('pages.privacy.disclaimerBody4')}
          <br />
          {t('pages.privacy.disclaimerBody5')}
          <br />
          {t('pages.privacy.disclaimerBody6')}
        </p>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
