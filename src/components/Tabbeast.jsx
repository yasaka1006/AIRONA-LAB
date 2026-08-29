import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSiteLocale } from '../i18n/siteLocale';
import { createCheckout, fetchDemoLinks, fetchMe, requestDownload } from '../lib/commerceApi';
import { TermsContent } from './legal/LegalPages';

const importFormats = ['MusicXML', '.tg', '.gp'];
const exportFormats = ['MusicXML', '.tg', '.gp', 'MIDI', 'PDF', 'MP4'];

/** Windows EXE ボタン用ダウンロードアイコン（矢印 + 受け皿） */
const DownloadIcon = ({ className = 'h-4 w-4' }) => (
  <svg
    className={`${className} shrink-0 block`}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    {/* 下向き矢印 */}
    <path d="M19 9h-4V3H9v6H5l7 7 7-7z" />
    {/* 受け皿 */}
    <path d="M5 18h14v2H5v-2z" />
  </svg>
);

const FileDocShell = ({ children, banner, bannerText, bannerFill = '#0f766e' }) => (
  <>
    <path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      fill="#f8fafc"
      stroke="#94a3b8"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path d="M14 2v6h6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.2" strokeLinejoin="round" />
    {children}
    {banner ? (
      <g>
        <rect x="4" y="16.2" width="16" height="5.8" rx="0.4" fill={bannerFill} />
        <text
          x="12"
          y="20.2"
          textAnchor="middle"
          fill="#fff"
          fontSize="3.4"
          fontWeight="700"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          {bannerText}
        </text>
      </g>
    ) : null}
  </>
);

const formatIconSvgs = {
  MusicXML: (
    <FileDocShell>
      <g fill="none" stroke="#0f766e" strokeWidth="1.1" strokeLinecap="round">
        <path d="M7.2 10h9.6M7.2 11.4h9.6M7.2 12.8h9.6M7.2 14.2h9.6M7.2 15.6h9.6" />
      </g>
      <path
        d="M12.8 9.6v5.2a1.35 1.35 0 1 1-1.1-1.32V11l3.4-1.1v1.15l-2.3.75z"
        fill="#0f766e"
      />
      <text
        x="12"
        y="20.4"
        textAnchor="middle"
        fill="#0f766e"
        fontSize="3.6"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        XML
      </text>
    </FileDocShell>
  ),
  '.tg': (
    <FileDocShell>
      <path
        d="M12 8.4c2.1 0 3.5 1.55 3.5 3.05 0 2.2-2.2 4.1-3.5 5.05-1.3-.95-3.5-2.85-3.5-5.05C8.5 9.95 9.9 8.4 12 8.4z"
        fill="#0f766e"
      />
      <g stroke="#fff" strokeWidth="0.7" strokeLinecap="round">
        <path d="M9.6 10.3h4.8M9.6 11.3h4.8M9.6 12.3h4.8M9.6 13.3h4.8" />
      </g>
      <text
        x="12"
        y="20.4"
        textAnchor="middle"
        fill="#0f766e"
        fontSize="3.8"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        TG
      </text>
    </FileDocShell>
  ),
  '.gp': (
    <FileDocShell>
      <g fill="none" stroke="#0f766e" strokeWidth="1" strokeLinecap="round">
        <path d="M7.5 9.2h9M7.5 10.8h9M7.5 12.4h9M7.5 14h9" />
        <path d="M9.2 9.2v4.8M12 9.2v4.8M14.8 9.2v4.8" />
      </g>
      <circle cx="9.2" cy="10.8" r="0.85" fill="#0f766e" />
      <circle cx="12" cy="12.4" r="0.85" fill="#0f766e" />
      <circle cx="14.8" cy="10.8" r="0.85" fill="#0f766e" />
      <text
        x="12"
        y="20.4"
        textAnchor="middle"
        fill="#0f766e"
        fontSize="3.8"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        GP
      </text>
    </FileDocShell>
  ),
  MIDI: (
    <FileDocShell banner bannerText="MIDI">
      <rect x="7" y="9" width="10" height="5.8" rx="0.7" fill="#0f766e" />
      <g fill="#f8fafc">
        <rect x="7.7" y="9.35" width="1.35" height="5.1" rx="0.2" />
        <rect x="9.4" y="9.35" width="1.35" height="5.1" rx="0.2" />
        <rect x="11.1" y="9.35" width="1.35" height="5.1" rx="0.2" />
        <rect x="12.8" y="9.35" width="1.35" height="5.1" rx="0.2" />
        <rect x="14.5" y="9.35" width="1.35" height="5.1" rx="0.2" />
      </g>
      <g fill="#0f172a">
        <rect x="8.7" y="9.35" width="0.85" height="3.1" rx="0.15" />
        <rect x="10.4" y="9.35" width="0.85" height="3.1" rx="0.15" />
        <rect x="13.55" y="9.35" width="0.85" height="3.1" rx="0.15" />
      </g>
    </FileDocShell>
  ),
  PDF: (
    <FileDocShell>
      <g stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round">
        <path d="M7.2 10.2h7.2" />
        <path d="M7.2 12.2h9.2" />
        <path d="M7.2 14.2h5.6" />
      </g>
      <text
        x="12"
        y="20.4"
        textAnchor="middle"
        fill="#dc2626"
        fontSize="3.6"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        PDF
      </text>
    </FileDocShell>
  ),
  MP4: (
    <FileDocShell banner bannerText="MP4">
      <g fill="#cbd5e1">
        <rect x="6.2" y="9.2" width="1.1" height="1.1" rx="0.2" />
        <rect x="6.2" y="11" width="1.1" height="1.1" rx="0.2" />
        <rect x="6.2" y="12.8" width="1.1" height="1.1" rx="0.2" />
        <rect x="16.7" y="9.2" width="1.1" height="1.1" rx="0.2" />
        <rect x="16.7" y="11" width="1.1" height="1.1" rx="0.2" />
        <rect x="16.7" y="12.8" width="1.1" height="1.1" rx="0.2" />
      </g>
      <path d="M10.2 9.4l5.2 3.1-5.2 3.1V9.4z" fill="#0f766e" />
    </FileDocShell>
  ),
};

const FileFormatItem = ({ label }) => (
  <div className="flex flex-col items-center gap-1.5 w-[4.5rem] sm:w-16 md:w-20 select-none">
    <div className="flex h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center pointer-events-none">
      <svg viewBox="0 0 24 24" className="h-full w-full select-none" aria-hidden>
        {formatIconSvgs[label]}
      </svg>
    </div>
    <span className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-600 text-center leading-tight">
      {label}
    </span>
  </div>
);

const FormatGroup = ({ title, formats, prefix }) => (
  <div className="flex flex-col gap-4 w-full sm:w-auto">
    <h3 className="text-sm font-bold text-slate-500">{title}</h3>
    <div
      className={
        formats.length > 3
          ? 'grid grid-cols-3 gap-x-1 gap-y-3 justify-items-center mx-auto w-full max-w-[18rem] sm:max-w-none sm:flex sm:flex-wrap sm:justify-center md:gap-2'
          : 'flex flex-wrap justify-center gap-x-1 gap-y-3 md:gap-2'
      }
    >
      {formats.map((format) => (
        <FileFormatItem key={`${prefix}-${format}`} label={format} />
      ))}
    </div>
  </div>
);

const SystemRequirements = () => {
  const { t } = useSiteLocale();
  return (
  <div className="max-w-2xl mx-auto text-left text-sm text-slate-600 leading-relaxed space-y-6">
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-slate-700">
            <th className="py-2 pr-4 text-left font-extrabold" scope="col" />
            <th className="py-2 px-3 text-center font-extrabold" scope="col">{t('pages.tabbeast.sysReqWindows')}</th>
            <th className="py-2 pl-3 text-center font-extrabold" scope="col">{t('pages.tabbeast.sysReqMac')}</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100">
            <th className="py-2.5 pr-4 text-left font-bold text-slate-700" scope="row">
              {t('pages.tabbeast.sysReqExeRow')}
            </th>
            <td className="py-2.5 px-3 text-center">○</td>
            <td className="py-2.5 pl-3 text-center text-slate-400">—</td>
          </tr>
          <tr>
            <th className="py-2.5 pr-4 text-left font-bold text-slate-700" scope="row">
              {t('pages.tabbeast.sysReqBrowserRow')}
            </th>
            <td className="py-2.5 px-3 text-center">○</td>
            <td className="py-2.5 pl-3 text-center">○</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="space-y-4">
      <div>
        <p className="font-extrabold text-slate-800 mb-1">{t('pages.tabbeast.sysReqExeWinTitle')}</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t('pages.tabbeast.sysReqExeWin1')}</li>
          <li>{t('pages.tabbeast.sysReqExeWin2')}</li>
        </ul>
      </div>

      <div>
        <p className="font-extrabold text-slate-800 mb-1">{t('pages.tabbeast.sysReqBrowserTitle')}</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t('pages.tabbeast.sysReqBrowser1')}</li>
          <li>{t('pages.tabbeast.sysReqBrowser2')}</li>
          <li>{t('pages.tabbeast.sysReqBrowser3')}</li>
        </ul>
      </div>

      <div>
        <p className="font-extrabold text-slate-800 mb-1">{t('pages.tabbeast.sysReqCommonTitle')}</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t('pages.tabbeast.sysReqCommon1')}</li>
          <li>{t('pages.tabbeast.sysReqCommon2')}</li>
          <li>{t('pages.tabbeast.sysReqCommon3')}</li>
        </ul>
      </div>

      <p className="font-extrabold text-slate-800">{t('pages.tabbeast.supportedLanguages')}</p>
    </div>
  </div>
  );
};

const FeatureSection = ({ title, description, imageSrc, reverse = false }) => (
  <div
    className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 max-w-5xl mx-auto`}
  >
    <div className="flex-1 w-full flex flex-col gap-4 text-left">
      <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-snug">
        {title}
      </h3>
      <p className="text-sm md:text-base text-slate-500 leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </div>
    <div className="flex-1 w-full">
      <img
        src={imageSrc}
        alt=""
        className="w-full h-auto rounded-lg border border-slate-300 shadow-lg"
      />
    </div>
  </div>
);

const PurchaseBar = () => {
  const { t, path, locale } = useSiteLocale();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [agree, setAgree] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogClosing, setDialogClosing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [owned, setOwned] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [demoWeb, setDemoWeb] = useState('');
  const [demoWin, setDemoWin] = useState('');

  useEffect(() => {
    fetchMe().then((me) => {
      setLoggedIn(Boolean(me));
      const hasFull = me?.entitlements?.some(
        (item) => item.productId === 'tabbeast_full' && item.status === 'active',
      );
      setOwned(Boolean(hasFull));
    }).catch(() => {});

    fetchDemoLinks().then((demo) => {
      setDemoWeb(demo.demoWeb || '');
      setDemoWin(demo.demoWin || '');
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (searchParams.get('checkout') === 'cancel') {
      setBusy(false);
      setNotice(t('pages.tabbeast.purchaseCancelNotice'));
      const next = new URLSearchParams(searchParams);
      next.delete('checkout');
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams, t]);

  // Stripe から「戻る」すると bfcache で busy=true が残ることがある
  useEffect(() => {
    const unlock = () => setBusy(false);
    const onVisible = () => {
      if (document.visibilityState === 'visible') unlock();
    };
    window.addEventListener('pageshow', unlock);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener('pageshow', unlock);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  useEffect(() => {
    if (!showDialog) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showDialog]);

  useEffect(() => {
    if (!showDialog || dialogClosing) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') closeDialog();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showDialog, dialogClosing]);

  const closeDialog = () => {
    if (busy || dialogClosing) return;
    setDialogClosing(true);
  };

  const onDialogAnimationEnd = (event) => {
    if (event.target !== event.currentTarget) return;
    if (!dialogClosing) return;
    setShowDialog(false);
    setDialogClosing(false);
    setAgree(false);
    setError('');
  };

  const openPurchaseDialog = () => {
    if (!loggedIn) {
      navigate(`${path('/mypage')}?next=${encodeURIComponent(path('/tabbeast'))}`);
      return;
    }
    setError('');
    setAgree(false);
    setDialogClosing(false);
    setShowDialog(true);
  };

  const onCheckout = async () => {
    if (!agree) {
      setError(t('pages.tabbeast.purchaseAgreeError'));
      return;
    }
    setBusy(true);
    setError('');
    try {
      const { url } = await createCheckout({ agreeToTerms: true, locale });
      if (!url) {
        throw new Error('Checkout URL was empty');
      }
      const target = new URL(url, window.location.origin).href;
      // 遷移前に解除（戻ってきたときのスナップショット対策）
      setBusy(false);
      window.location.assign(target);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  const onFullWinDownload = async () => {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const result = await requestDownload('full_win');
      window.location.assign(result.url);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <div className="mt-12 bg-slate-100 py-6 px-4">
      {notice ? (
        <p className="text-center text-sm text-slate-600 mb-3">{notice}</p>
      ) : null}
      {error && !showDialog ? (
        <p className="text-center text-sm text-red-600 mb-3">{error}</p>
      ) : null}
      {owned ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm md:text-base font-extrabold text-slate-700">
            {t('pages.tabbeast.purchaseOwned')}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5">
            <button
              type="button"
              onClick={onFullWinDownload}
              disabled={busy}
              className="inline-flex h-11 items-center justify-center gap-2 text-white text-sm font-bold px-6 rounded-full cursor-pointer disabled:opacity-60 shadow-md leading-none bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-400 hover:to-teal-600"
            >
              <span className="leading-none">
                {busy ? t('common.preparing') : t('pages.tabbeast.purchaseWinDownload')}
              </span>
              {!busy ? <DownloadIcon className="h-4 w-4" /> : null}
            </button>
            <a
              href="/app/"
              className="inline-flex h-11 items-center justify-center text-white text-sm font-bold px-6 rounded-full bg-slate-700 hover:bg-slate-600 shadow-md leading-none"
            >
              {t('pages.tabbeast.purchaseBrowser')}
            </a>
          </div>
          <Link to={path('/mypage')} className="text-sm text-slate-500 underline hover:text-slate-700">
            {t('common.toMypage')}
          </Link>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              to={path('/tabbeast/guide')}
              className="text-sm text-slate-500 underline hover:text-slate-700"
            >
              {t('common.guide')}
            </Link>
            <Link
              to={path('/tabbeast/manual')}
              className="text-sm text-slate-500 underline hover:text-slate-700"
            >
              {t('common.manual')}
            </Link>
            <Link
              to={path('/tabbeast/contact')}
              className="text-sm text-slate-500 underline hover:text-slate-700"
            >
              {t('common.contact')}
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center gap-6">
            <div className="mt-3 flex flex-wrap justify-center items-center gap-4 md:gap-10">
              {demoWeb ? (
                <a
                  href={demoWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center bg-slate-600 text-white text-sm font-bold px-6 rounded-full hover:bg-slate-500 shadow-md leading-none"
                >
                  {t('pages.tabbeast.purchaseDemoWeb')}
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex h-11 items-center justify-center bg-slate-400 text-white text-sm font-bold px-6 rounded-full cursor-not-allowed shadow-md leading-none"
                  title={t('pages.tabbeast.purchaseDemoWebTitle')}
                >
                  {t('pages.tabbeast.purchaseDemoWebDisabled')}
                </button>
              )}
              {demoWin ? (
                <a
                  href={demoWin}
                  className="inline-flex h-11 items-center justify-center gap-2 bg-slate-600 text-white text-sm font-bold px-6 rounded-full hover:bg-slate-500 shadow-md leading-none"
                >
                  <span className="leading-none">{t('pages.tabbeast.purchaseDemoWin')}</span>
                  <DownloadIcon className="h-4 w-4" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex h-11 items-center justify-center gap-2 bg-slate-400 text-white text-sm font-bold px-6 rounded-full cursor-not-allowed shadow-md leading-none"
                  title={t('pages.tabbeast.purchaseDemoWinTitle')}
                >
                  <span className="leading-none">{t('pages.tabbeast.purchaseDemoWin')}</span>
                  <DownloadIcon className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex flex-col items-center gap-2.5">
              <button
                type="button"
                onClick={openPurchaseDialog}
                disabled={busy}
                className="mb-5 text-white text-lg md:text-xl font-extrabold px-10 md:px-14 py-3.5 md:py-4 rounded-full cursor-pointer disabled:opacity-60 shadow-lg bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-400 hover:to-teal-600"
              >
                {t('pages.tabbeast.purchaseBuy')}
              </button>
              <p className="flex flex-col sm:flex-row sm:items-center justify-center gap-0.5 sm:gap-0 text-center text-xs md:text-sm text-slate-500 leading-relaxed">
                <span>
                  <span className="font-bold text-slate-600">{t('pages.tabbeast.purchasePlatformWin')}</span>
                  {' '}{t('pages.tabbeast.purchasePlatformWinDetail')}
                </span>
                <span className="hidden sm:inline mx-2.5 text-slate-300" aria-hidden>
                  ｜
                </span>
                <span>
                  <span className="font-bold text-slate-600">{t('pages.tabbeast.purchasePlatformMac')}</span>
                  {' '}{t('pages.tabbeast.purchasePlatformMacDetail')}
                </span>
              </p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <Link
                  to={path('/tabbeast/guide')}
                  className="text-sm text-slate-500 underline hover:text-slate-700"
                >
                  {t('common.guide')}
                </Link>
                <Link
                  to={path('/tabbeast/manual')}
                  className="text-sm text-slate-500 underline hover:text-slate-700"
                >
                  {t('common.manual')}
                </Link>
                <Link
                  to={path('/tabbeast/contact')}
                  className="text-sm text-slate-500 underline hover:text-slate-700"
                >
                  {t('common.contact')}
                </Link>
              </div>
            </div>
          </div>

          {showDialog ? (
            <div
              className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 ${
                dialogClosing ? 'animate-dialog-backdrop-out' : 'animate-dialog-backdrop'
              }`}
              onClick={closeDialog}
              onAnimationEnd={onDialogAnimationEnd}
              role="presentation"
            >
              <div
                className={`flex w-full max-w-lg max-h-[90vh] flex-col rounded-xl bg-white p-6 shadow-xl ${
                  dialogClosing ? 'animate-dialog-panel-out' : 'animate-dialog-panel'
                }`}
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="purchase-dialog-title"
              >
                <h2 id="purchase-dialog-title" className="text-xl font-extrabold text-slate-800 mb-1 shrink-0">
                  {t('pages.tabbeast.purchaseDialogTitle')}
                </h2>
                <p className="text-sm text-slate-500 mb-3 shrink-0">
                  {t('pages.tabbeast.purchaseDialogDesc')}
                </p>
                <p className="text-xs font-bold text-slate-500 mb-1.5 shrink-0">
                  {t('pages.tabbeast.purchaseDialogTermsLabel')}
                </p>
                <div className="mb-4 min-h-0 flex-1 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 leading-relaxed space-y-3 max-h-56 md:max-h-72">
                  <TermsContent />
                </div>
                <label className="flex items-start gap-2 text-sm text-slate-700 mb-4 shrink-0">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(event) => {
                      setAgree(event.target.checked);
                      setError('');
                    }}
                    className="mt-1"
                  />
                  <span>
                    {t('pages.tabbeast.purchaseDialogAgreePrefix')}
                    <Link
                      to={path('/legal/tokushoho')}
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('common.tokushoho')}
                    </Link>
                    {t('pages.tabbeast.purchaseDialogAgreeSuffix')}
                  </span>
                </label>
                {error ? (
                  <p className="text-sm text-red-600 mb-3 shrink-0">{error}</p>
                ) : null}
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end shrink-0">
                  <button
                    type="button"
                    onClick={closeDialog}
                    disabled={busy}
                    className="px-5 py-2.5 rounded-full text-slate-700 bg-slate-100 hover:bg-slate-200 font-bold disabled:opacity-60"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    type="button"
                    onClick={onCheckout}
                    disabled={!agree || busy}
                    className="px-5 py-2.5 rounded-full text-white font-bold bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-400 hover:to-teal-600 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {busy ? t('common.preparing') : t('pages.tabbeast.purchaseCheckout')}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

const Tabbeast = () => {
  const { t } = useSiteLocale();

  return (
    <main className="my-4 mx-1">
      <section className="py-12 rounded-xl ">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="flex items-center justify-center gap-3 md:gap-4 text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight mb-10">
            <img
              src="/tabbeast/appIcon.SVG"
              alt=""
              className="h-16 w-16 md:h-20 md:w-20 shrink-0"
            />
            TABbeast
          </h1>
          <p className="text-xl md:text-3xl font-extrabold text-slate-700 leading-snug mb-4">
            {t('pages.tabbeast.heroLine1')}
          </p>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed">
            {t('pages.tabbeast.heroLine2')}
          </p>
        </div>

        <PurchaseBar />


        <div className="relative  mx-auto">
          <img src="/tabbeast/haikei.jpg" alt="" className="w-full opacity-40 " />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%]"
          >
            <img
              src="/tabbeast/soft.png"
              alt="Tabbeast"
              className="w-full h-auto rounded-md border border-slate-700 shadow-lg"
            />
          </div>
        </div>

        <div className="mt-10 px-4 md:px-10">
          <h2 className="text-2xl font-extrabold text-slate-600 text-center mb-10">
            {t('pages.tabbeast.formatsTitle')}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-start gap-10 sm:gap-24">
            <FormatGroup title={t('pages.tabbeast.importTitle')} formats={importFormats} prefix="import" />
            <FormatGroup title={t('pages.tabbeast.exportTitle')} formats={exportFormats} prefix="export" />
          </div>
        </div>

        <div className="mt-15 px-4 md:px-10 py-10 bg-slate-100 rounded-md">
          <FeatureSection
            title={t('pages.tabbeast.feature1Title')}
            description={t('pages.tabbeast.feature1Desc')}
            imageSrc="/tabbeast/feature.png"
          />
        </div>
        <div className="mt-15 px-4 md:px-10 py-10 bg-slate-100 rounded-md">
          <FeatureSection
            title={t('pages.tabbeast.feature2Title')}
            description={t('pages.tabbeast.feature2Desc')}
            imageSrc="/tabbeast/feature.png"
          />
        </div>
        <div className="mt-15 px-4 md:px-10 py-10 bg-slate-100 rounded-md">
          <FeatureSection
            title={t('pages.tabbeast.feature3Title')}
            description={t('pages.tabbeast.feature3Desc')}
            imageSrc="/tabbeast/feature.png"
          />
        </div>

        <div className="mt-15 px-4 md:px-10 py-10">
          <h2 className="text-2xl font-extrabold text-slate-600 text-center mb-10">
            {t('pages.tabbeast.videoTitle')}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-start gap-10 sm:gap-24">
            <iframe src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>

        <div className="mt-15 px-4 md:px-10 py-10">
          <h2 className="text-2xl font-extrabold text-slate-600 text-center mb-10">
            {t('pages.tabbeast.requirementsTitle')}
          </h2>
          <SystemRequirements />
        </div>

      </section>
    </main>
  );
};

export default Tabbeast;
