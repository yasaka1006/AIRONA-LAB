import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { createCheckout, fetchDemoLinks, fetchMe } from '../lib/commerceApi';

const importFormats = ['MusicXML', '.TG', '.GP'];
const exportFormats = ['MusicXML', '.TG', '.GP', 'MIDI', 'PDF', 'MP4'];

const FileFormatItem = ({ label }) => (
  <div className="flex flex-col items-center gap-1 shrink-0 w-16 md:w-20">
    <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-md border border-slate-300 bg-white">
      {/* アイコンは後で差し替え */}
    </div>
    <span className="text-xs md:text-sm font-bold text-slate-600 text-center leading-tight">
      {label}
    </span>
  </div>
);

const FormatGroup = ({ title, formats, prefix }) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-sm font-bold text-slate-500">{title}</h3>
    <div className="flex flex-nowrap justify-center gap-1 md:gap-2">
      {formats.map((format) => (
        <FileFormatItem key={`${prefix}-${format}`} label={format} />
      ))}
    </div>
  </div>
);

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [agree, setAgree] = useState(false);
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
      setNotice('購入をキャンセルしました。');
      const next = new URLSearchParams(searchParams);
      next.delete('checkout');
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const onBuy = async () => {
    if (!agree) {
      setError('利用規約と特商法表記への同意が必要です。');
      return;
    }
    if (!loggedIn) {
      setError('購入にはログインが必要です。マイページでアカウント作成／ログインしてください。');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const { url } = await createCheckout({ agreeToTerms: true });
      window.location.assign(url);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <div className="mt-18 bg-slate-100 py-6 px-4">
      {notice ? (
        <p className="text-center text-sm text-slate-600 mb-3">{notice}</p>
      ) : null}
      {error ? (
        <p className="text-center text-sm text-red-600 mb-3">{error}</p>
      ) : null}
      {owned ? (
        <p className="text-center mb-4">
          <Link to="/mypage" className="bg-slate-800 text-white px-6 py-2 rounded-full inline-block hover:bg-slate-700">
            購入済み — マイページへ
          </Link>
        </p>
      ) : (
        <>
          {!loggedIn ? (
            <p className="text-center text-sm text-slate-600 mb-4">
              購入の前に
              <Link to="/mypage" className="underline mx-1">マイページ</Link>
              でログインしてください（Google またはメール）。
            </p>
          ) : null}
          <label className="flex justify-center items-start gap-2 text-sm text-slate-600 mb-4 max-w-xl mx-auto text-left">
            <input
              type="checkbox"
              checked={agree}
              onChange={(event) => setAgree(event.target.checked)}
              className="mt-1"
            />
            <span>
              <Link to="/legal/terms" className="underline">利用規約</Link>
              および
              <Link to="/legal/tokushoho" className="underline">特定商取引法に基づく表記</Link>
              に同意します（原則返金不可）
            </span>
          </label>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-10">
            <button
              type="button"
              onClick={onBuy}
              disabled={busy || !loggedIn}
              className="bg-slate-800 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-slate-700 disabled:opacity-60 shadow-md"
            >
              {busy ? '移動中...' : '購入￥2,920 ▶'}
            </button>
            {demoWin ? (
              <a
                href={demoWin}
                className="bg-slate-800 text-white px-6 py-2 rounded-full hover:bg-slate-700 shadow-md"
              >
                DEMO（Windows） ▶
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="bg-slate-400 text-white px-6 py-2 rounded-full cursor-not-allowed shadow-md"
                title="DEMO Windows の公開 URL 準備中"
              >
                DEMO（Windows）準備中
              </button>
            )}
            {demoWeb ? (
              <a
                href={demoWeb}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 text-white px-6 py-2 rounded-full hover:bg-slate-700 shadow-md"
              >
                DEMO（ブラウザ版） ▶
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="bg-slate-400 text-white px-6 py-2 rounded-full cursor-not-allowed shadow-md"
                title="DEMO Web URL 未設定"
              >
                DEMO（ブラウザ版）準備中
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const Tabbeast = () => {
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
            弾いてみた動画のTAB譜を、より手軽に。
          </p>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed">
            直感的な操作で、ギターTABをもっと速く、もっと自由に。
          </p>
        </div>

        <PurchaseBar />
        <p className="text-center mt-4 flex flex-wrap justify-center gap-4 text-sm text-slate-500">
          <Link to="/mypage" className="underline">
            購入済みの方はマイページへ
          </Link>
          <Link to="/legal/terms" className="underline">
            利用規約
          </Link>
          <Link to="/legal/tokushoho" className="underline">
            特定商取引法に基づく表記
          </Link>
          <Link to="/privacy-policy" className="underline">
            プライバシーポリシー
          </Link>
        </p>

        <div className="relative  mx-auto">
          <img src="/tabbeast/haikei.jpg" alt="" className="w-full opacity-50 " />
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
            対応形式
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-start gap-10 sm:gap-24">
            <FormatGroup title="インポート" formats={importFormats} prefix="import" />
            <FormatGroup title="エクスポート" formats={exportFormats} prefix="export" />
          </div>
        </div>

        <div className="mt-15 px-4 md:px-10 py-10 bg-slate-100 rounded-md">
          <FeatureSection
            title="効率重視のTAB編集ソフト"
            description={(<>製作に便利な機能を多数搭載<br />・ドラッグ範囲に一括付与<br />・コードショートカット<br />・リズムパターンを貼り付け</>)}
            imageSrc="/tabbeast/feature.png"
          />
        </div>
        <div className="mt-15 px-4 md:px-10 py-10 bg-slate-100 rounded-md">
          <FeatureSection
            title="直接MP4を出力可能"
            description={(<>作成した譜面をMP4形式で出力できるので、そのまま演奏動画に貼り付けて使うことができます</>)}
            imageSrc="/tabbeast/feature.png"
          />
        </div>
        <div className="mt-15 px-4 md:px-10 py-10 bg-slate-100 rounded-md">
          <FeatureSection
            title="音声ファイルと同時に再生可能"
            description={(<>MP3/wavファイルを読み込ませて同期させることが可能で、練習やタイミング合わせに便利です</>)}
            imageSrc="/tabbeast/feature.png"
          />
        </div>
      </section>
    </main>
  );
};

export default Tabbeast;
