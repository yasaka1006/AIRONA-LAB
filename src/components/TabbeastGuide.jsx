import { Link } from 'react-router-dom';
import { PageChrome } from '../i18n/PageChrome';
import { useSiteLocale } from '../i18n/siteLocale';

const Step = ({ n, title, children }) => (
  <li className="flex gap-4">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-extrabold text-white">
      {n}
    </span>
    <div className="min-w-0 flex-1 space-y-2">
      <h2 className="text-base font-extrabold text-slate-800">{title}</h2>
      <div className="text-sm text-slate-600 leading-relaxed space-y-2">{children}</div>
    </div>
  </li>
);

const TabbeastGuide = () => {
  const { t, path } = useSiteLocale();

  return (
    <main className="my-8 mx-1">
      <section className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
        <PageChrome backTo="/tabbeast" backLabel={t('common.backToTabbeast')} />
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
          {t('pages.guide.title')}
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          {t('pages.guide.intro')}
        </p>

        <ol className="flex flex-col space-y-10">
          <Step n="0" title={t('pages.guide.step0Title')}>
            <p>
              {t('pages.guide.step0P1')}
              <Link to={path('/tabbeast')} className="underline mx-0.5">
                {t('pages.tabbeast.purchaseProductPage')}
              </Link>
              {t('pages.guide.step0P2')}
            </p>
          </Step>

          <Step n="1" title={t('pages.guide.step1Title')}>
            <p>
              {t('pages.guide.step1P1')}
              <Link to={path('/mypage')} className="underline mx-0.5">
                {t('nav.mypage')}
              </Link>
              {t('pages.guide.step1P2')}
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('pages.guide.step1Li1')}</li>
              <li>{t('pages.guide.step1Li2')}</li>
            </ul>
            <p className="text-xs text-slate-500">{t('pages.guide.step1Note')}</p>
          </Step>

          <Step n="2" title={t('pages.guide.step2Title')}>
            <p>
              <Link to={path('/tabbeast')} className="underline mx-0.5">
                {t('pages.tabbeast.purchaseProductPage')}
              </Link>
              {t('pages.guide.step2P1')}
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('pages.guide.step2Li1')}</li>
              <li>{t('pages.guide.step2Li2')}</li>
              <li>{t('pages.guide.step2Li3')}</li>
            </ul>
            <p className="text-xs text-slate-500">{t('pages.guide.step2Note')}</p>
          </Step>

          <Step n="3" title={t('pages.guide.step3Title')}>
            <p>
              <Link to={path('/mypage')} className="underline mx-0.5">
                {t('nav.mypage')}
              </Link>
              {t('pages.guide.step3P1')}
            </p>
          </Step>

          <Step n="4" title={t('pages.guide.step4Title')}>
            <p className="font-bold text-slate-700">{t('pages.guide.step4WinTitle')}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('pages.guide.step4WinLi1')}</li>
              <li>{t('pages.guide.step4WinLi2')}</li>
            </ul>
            <p className="text-xs text-slate-500">{t('pages.guide.step4WinNote')}</p>

            <p className="font-bold text-slate-700 pt-2">{t('pages.guide.step4BrowserTitle')}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                {t('pages.guide.step4BrowserLi1')}
                <Link to="/app/" className="underline">
                  /app/
                </Link>
                {t('pages.guide.step4BrowserCloseParen')}
              </li>
              <li>{t('pages.guide.step4BrowserLi2')}</li>
            </ul>
            <p className="text-xs text-slate-500">{t('pages.guide.step4BrowserNote')}</p>
          </Step>
        </ol>

        <div className="mt-10 rounded-lg bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600 leading-relaxed space-y-3">
          <p className="font-extrabold text-slate-800">{t('pages.guide.faqTitle')}</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>{t('pages.guide.faqLi1')}</li>
            <li>
              {t('pages.guide.faqLi2Prefix')}
              <Link to={path('/mypage/email')} className="underline">
                {t('nav.changeEmail')}
              </Link>
              {t('pages.guide.faqLi2Suffix')}
            </li>
            <li>
              {t('pages.guide.faqLi3Prefix')}
              <Link to={path('/legal/tokushoho')} className="underline">
                {t('common.tokushoho')}
              </Link>
              {t('pages.guide.faqLi3Suffix')}
            </li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link to={path('/tabbeast')} className="text-slate-700 underline">
            {t('common.productPage')}
          </Link>
          <Link to={path('/mypage')} className="text-slate-700 underline">
            {t('common.toMypage')}
          </Link>
          <Link to={path('/tabbeast/contact')} className="text-slate-700 underline">
            {t('common.contact')}
          </Link>
        </div>
      </section>
    </main>
  );
};

export default TabbeastGuide;
