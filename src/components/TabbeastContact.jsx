import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMe, submitContact } from '../lib/commerceApi';

const CATEGORIES = [
  { value: 'purchase_download', label: '購入・ダウンロード' },
  { value: 'browser', label: 'ブラウザ版' },
  { value: 'payment', label: '決済トラブル' },
  { value: 'bug', label: '不具合・要望' },
  { value: 'other', label: 'その他' },
];

const TabbeastContact = () => {
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('purchase_download');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
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
    setNotice('');
    try {
      await submitContact({ email, category, subject, message });
      setNotice('送信しました。内容を確認のうえ、必要に応じてご返信します。');
      setSubject('');
      setMessage('');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="my-8 mx-1">
      <section className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
        <p className="mb-4">
          <Link to="/tabbeast" className="text-sm text-slate-500 underline">
            ← TABbeast に戻る
          </Link>
        </p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
          TABbeast お問い合わせ
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          製品に関するご質問・不具合・決済トラブルなどはこちらからご連絡ください。
          内容を確認のうえ、数営業日以内をめどにご返信します。
        </p>

        <ul className="mb-6 text-xs text-slate-500 leading-relaxed list-disc pl-5 space-y-1">
          <li>
            デジタルコンテンツのため、購入後の返金は原則としてお受けできません（
            <Link to="/legal/tokushoho" className="underline">
              特定商取引法に基づく表記
            </Link>
            ）。
          </li>
          <li>
            ダウンロードやブラウザ版はまず
            <Link to="/mypage" className="underline mx-0.5">
              マイページ
            </Link>
            をご確認ください。
          </li>
        </ul>

        {error ? (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {error}
          </p>
        ) : null}
        {notice ? (
          <p className="mb-4 text-sm text-slate-700 bg-slate-100 rounded-md px-3 py-2">
            {notice}
          </p>
        ) : null}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className="text-sm font-bold text-slate-700">
            種別
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal text-slate-800 bg-white"
            >
              {CATEGORIES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-bold text-slate-700">
            メールアドレス
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
              ログイン中のアドレスを使用します。変更する場合は先に
              <Link to="/mypage/email" className="underline mx-0.5">
                メールアドレス変更
              </Link>
              へ。
            </p>
          ) : null}

          <label className="text-sm font-bold text-slate-700">
            件名（任意）
            <input
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              maxLength={120}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal text-slate-800"
              placeholder="例: Windows 版が起動しない"
            />
          </label>

          <label className="text-sm font-bold text-slate-700">
            内容
            <textarea
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              minLength={10}
              maxLength={4000}
              rows={8}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal text-slate-800 resize-y"
              placeholder="発生した症状、OS、ブラウザ、購入日時などが分かると対応しやすいです。"
            />
          </label>

          <button
            type="submit"
            disabled={busy}
            className="self-start px-6 py-2.5 rounded-full text-white font-bold bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-400 hover:to-teal-600 disabled:opacity-60 cursor-pointer"
          >
            {busy ? '送信中…' : '送信する'}
          </button>
        </form>

        <p className="mt-6 text-xs text-slate-400 leading-relaxed">
          予備連絡先:{' '}
          <a href="mailto:airona.lab@gmail.com" className="underline">
            airona.lab@gmail.com
          </a>
        </p>
      </section>
    </main>
  );
};

export default TabbeastContact;
