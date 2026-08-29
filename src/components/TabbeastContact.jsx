import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageChrome } from '../i18n/PageChrome';
import { useSiteLocale } from '../i18n/siteLocale';
import { fetchMe, submitContact } from '../lib/commerceApi';

const CATEGORY_KEYS = [
  { value: 'purchase_download', key: 'pages.contact.categoryPurchase' },
  { value: 'browser', key: 'pages.contact.categoryBrowser' },
  { value: 'payment', key: 'pages.contact.categoryPayment' },
  { value: 'bug', key: 'pages.contact.categoryBug' },
  { value: 'other', key: 'pages.contact.categoryOther' },
];

const TabbeastContact = () => {
  const { t, path, locale } = useSiteLocale();
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('purchase_download');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetchMe()
      .then((me) => {
        if (me?.email) {
          setEmail(me.email);
          setLoggedIn(true);
        }
      })
      .catch(() => {});
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await submitContact({ email, category, subject, message, locale });
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="my-8 mx-1">
      <section className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
        {sent ? (
          <div className="flex flex-col items-center text-center py-6 md:py-10">
            <p className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-3">
              {t('pages.contact.sentTitle')}
            </p>
            <p className="text-sm text-slate-500 leading-relaxed mb-8 max-w-md">
              {t('pages.contact.sentBody')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={path('/tabbeast')}
                className="px-6 py-2.5 rounded-full text-white font-bold bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-400 hover:to-teal-600"
              >
                {t('common.toTabbeast')}
              </Link>
              <Link
                to={path('/mypage')}
                className="px-6 py-2.5 rounded-full font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                {t('common.toMypage')}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <PageChrome backTo="/tabbeast" backLabel={t('common.backToTabbeast')} />
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
              {t('pages.contact.title')}
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              {t('pages.contact.intro')}
            </p>

            <ul className="mb-6 text-xs text-slate-500 leading-relaxed list-disc pl-5 space-y-1">
              <li>
                {t('pages.contact.note1Prefix')}
                <Link to={path('/legal/tokushoho')} className="underline">
                  {t('common.tokushoho')}
                </Link>
                {t('pages.contact.note1Suffix')}
              </li>
              <li>
                {t('pages.contact.note2Prefix')}
                <Link to={path('/mypage')} className="underline mx-0.5">
                  {t('nav.mypage')}
                </Link>
                {t('pages.contact.note2Suffix')}
              </li>
            </ul>

            {error ? (
              <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                {error}
              </p>
            ) : null}

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <label className="text-sm font-bold text-slate-700">
                {t('pages.contact.categoryLabel')}
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal text-slate-800 bg-white"
                >
                  {CATEGORY_KEYS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {t(item.key)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm font-bold text-slate-700">
                {t('pages.contact.emailLabel')}
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  readOnly={loggedIn}
                  className={`mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal text-slate-800 ${
                    loggedIn ? 'bg-slate-50 text-slate-600' : ''
                  }`}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </label>
              {loggedIn ? (
                <p className="-mt-2 text-xs text-slate-500">
                  {t('pages.contact.emailLoggedInNotePrefix')}
                  <Link to={path('/mypage/email')} className="underline mx-0.5">
                    {t('nav.changeEmail')}
                  </Link>
                  {t('pages.contact.emailLoggedInNoteSuffix')}
                </p>
              ) : null}

              <label className="text-sm font-bold text-slate-700">
                {t('pages.contact.subjectLabel')}
                <input
                  type="text"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  maxLength={120}
                  className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal text-slate-800"
                  placeholder={t('pages.contact.subjectPlaceholder')}
                />
              </label>

              <label className="text-sm font-bold text-slate-700">
                {t('pages.contact.messageLabel')}
                <textarea
                  required
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  minLength={10}
                  maxLength={4000}
                  rows={8}
                  className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal text-slate-800 resize-y"
                  placeholder={t('pages.contact.messagePlaceholder')}
                />
              </label>

              <button
                type="submit"
                disabled={busy}
                className="self-start px-6 py-2.5 rounded-full text-white font-bold bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-400 hover:to-teal-600 disabled:opacity-60 cursor-pointer"
              >
                {busy ? t('common.sending') : t('pages.contact.submit')}
              </button>
            </form>

            <p className="mt-6 text-xs text-slate-400 leading-relaxed">
              {t('pages.contact.fallbackContact')}{' '}
              <a href="mailto:airona.lab@gmail.com" className="underline">
                airona.lab@gmail.com
              </a>
            </p>
          </>
        )}
      </section>
    </main>
  );
};

export default TabbeastContact;
