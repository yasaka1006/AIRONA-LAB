import { useSiteLocale } from '../../i18n/siteLocale';

const LegalPage = ({ title, children }) => {
  const { t } = useSiteLocale();
  return (
    <main className="my-8 mx-1">
      <section className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">{title}</h1>
        <p className="text-xs text-slate-400 mb-6">{t('pages.legal.lastUpdated')}</p>
        <div className="text-sm text-slate-600 leading-relaxed space-y-4">{children}</div>
      </section>
    </main>
  );
};

const H = ({ children }) => (
  <h2 className="text-base font-extrabold text-slate-800 pt-2">{children}</h2>
);

export const TermsContent = () => {
  const { t } = useSiteLocale();
  return (
    <>
      <p>{t('pages.legal.terms.intro')}</p>

      <H>{t('pages.legal.terms.section1Title')}</H>
      <p>{t('pages.legal.terms.section1')}</p>

      <H>{t('pages.legal.terms.section2Title')}</H>
      <ul className="list-disc pl-5 space-y-1">
        <li>{t('pages.legal.terms.section2Li1')}</li>
        <li>{t('pages.legal.terms.section2Li2')}</li>
        <li>{t('pages.legal.terms.section2Li3')}</li>
        <li>{t('pages.legal.terms.section2Li4')}</li>
      </ul>

      <H>{t('pages.legal.terms.section3Title')}</H>
      <p>{t('pages.legal.terms.section3')}</p>

      <H>{t('pages.legal.terms.section4Title')}</H>
      <p>{t('pages.legal.terms.section4')}</p>

      <H>{t('pages.legal.terms.section5Title')}</H>
      <p>{t('pages.legal.terms.section5')}</p>

      <H>{t('pages.legal.terms.section6Title')}</H>
      <p>{t('pages.legal.terms.section6')}</p>

      <H>{t('pages.legal.terms.section7Title')}</H>
      <p>{t('pages.legal.terms.section7')}</p>

      <H>{t('pages.legal.terms.section8Title')}</H>
      <p>{t('pages.legal.terms.section8')}</p>
    </>
  );
};

export const Terms = () => {
  const { t } = useSiteLocale();
  return (
    <LegalPage title={t('pages.legal.terms.title')}>
      <TermsContent />
    </LegalPage>
  );
};

export const Tokushoho = () => {
  const { t } = useSiteLocale();
  return (
    <LegalPage title={t('pages.legal.tokushoho.title')}>
      <dl className="space-y-4">
        <div>
          <dt className="font-bold text-slate-800">{t('pages.legal.tokushoho.sellerLabel')}</dt>
          <dd>{t('pages.legal.tokushoho.seller')}</dd>
        </div>
        <div>
          <dt className="font-bold text-slate-800">{t('pages.legal.tokushoho.operatorLabel')}</dt>
          <dd>{t('pages.legal.tokushoho.operator')}</dd>
        </div>
        <div>
          <dt className="font-bold text-slate-800">{t('pages.legal.tokushoho.addressLabel')}</dt>
          <dd>{t('pages.legal.tokushoho.address')}</dd>
        </div>
        <div>
          <dt className="font-bold text-slate-800">{t('pages.legal.tokushoho.phoneLabel')}</dt>
          <dd>{t('pages.legal.tokushoho.phone')}</dd>
        </div>
        <div>
          <dt className="font-bold text-slate-800">{t('pages.legal.tokushoho.emailLabel')}</dt>
          <dd>{t('pages.legal.tokushoho.email')}</dd>
        </div>
        <div>
          <dt className="font-bold text-slate-800">{t('pages.legal.tokushoho.priceLabel')}</dt>
          <dd>{t('pages.legal.tokushoho.price')}</dd>
        </div>
        <div>
          <dt className="font-bold text-slate-800">{t('pages.legal.tokushoho.extraFeesLabel')}</dt>
          <dd>{t('pages.legal.tokushoho.extraFees')}</dd>
        </div>
        <div>
          <dt className="font-bold text-slate-800">{t('pages.legal.tokushoho.paymentMethodLabel')}</dt>
          <dd>{t('pages.legal.tokushoho.paymentMethod')}</dd>
        </div>
        <div>
          <dt className="font-bold text-slate-800">{t('pages.legal.tokushoho.paymentTimingLabel')}</dt>
          <dd>{t('pages.legal.tokushoho.paymentTiming')}</dd>
        </div>
        <div>
          <dt className="font-bold text-slate-800">{t('pages.legal.tokushoho.deliveryLabel')}</dt>
          <dd>{t('pages.legal.tokushoho.delivery')}</dd>
        </div>
        <div>
          <dt className="font-bold text-slate-800">{t('pages.legal.tokushoho.refundLabel')}</dt>
          <dd>{t('pages.legal.tokushoho.refund')}</dd>
        </div>
        <div>
          <dt className="font-bold text-slate-800">{t('pages.legal.tokushoho.environmentLabel')}</dt>
          <dd>{t('pages.legal.tokushoho.environment')}</dd>
        </div>
        <div>
          <dt className="font-bold text-slate-800">{t('pages.legal.tokushoho.notesLabel')}</dt>
          <dd>{t('pages.legal.tokushoho.notes')}</dd>
        </div>
      </dl>
    </LegalPage>
  );
};
