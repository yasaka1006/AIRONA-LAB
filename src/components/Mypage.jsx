import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchMe, logout, requestDownload, requestMagicLink } from "../lib/commerceApi";

const Mypage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [me, setMe] = useState(undefined);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [devVerifyUrl, setDevVerifyUrl] = useState("");
  const [error, setError] = useState("");

  const loadMe = async () => {
    try {
      const data = await fetchMe();
      setMe(data);
    } catch (err) {
      setError(err.message);
      setMe(null);
    }
  };

  useEffect(() => {
    loadMe();
  }, []);

  useEffect(() => {
    const auth = searchParams.get("auth");
    const checkout = searchParams.get("checkout");
    if (auth === "invalid") {
      setError("ログインリンクが無効か、期限切れです。もう一度送信してください。");
    }
    if (checkout === "success") {
      setNotice("購入手続きが完了しました。ログインするとダウンロードできます。");
    }
    if (auth || checkout) {
      const next = new URLSearchParams(searchParams);
      next.delete("auth");
      next.delete("checkout");
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    setDevVerifyUrl("");
    try {
      const result = await requestMagicLink(email);
      if (result.devHint === "no_entitlement_email_not_sent") {
        setNotice(
          "このメールには購入権がないため、メールは送っていません（画面上は常に成功表示）。",
        );
        setError(
          "開発メモ: Stripe で購入したメールを使うか、stripe listen で Webhook が入っているか確認してください。",
        );
        setDevVerifyUrl("");
      } else if (result.devVerifyUrl) {
        const mailOk = result.devMail?.sent;
        setNotice(
          mailOk
            ? "メール送信を試みました。受信箱を確認するか、下の開発用リンクでもログインできます。"
            : `メール送信に失敗しました（${result.devMail?.reason || "unknown"}）。下の開発用リンクでログインできます。ターミナルに resend_failed が出ていないか確認してください。`,
        );
        setDevVerifyUrl(result.devVerifyUrl);
      } else {
        setNotice(
          "入力されたアドレスにログイン用リンクを送りました。届かない場合は、購入に使ったメールか迷惑メールフォルダを確認してください。",
        );
        setDevVerifyUrl("");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const onLogout = async () => {
    setBusy(true);
    try {
      await logout();
      setMe(null);
      setNotice("ログアウトしました。");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const onDownload = async () => {
    setBusy(true);
    setError("");
    try {
      const result = await requestDownload("full_win");
      window.location.assign(result.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const hasFull =
    Array.isArray(me?.entitlements) &&
    me.entitlements.some(
      (item) => item.productId === "tabbeast_full" && item.status === "active",
    );
  const winVersion = me?.latest?.full_win?.version;
  const webVersion = me?.latest?.full_web?.version;

  return (
    <main className="my-8 mx-1">
      <section className="max-w-xl mx-auto bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
          マイページ
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          TABbeast のダウンロードとブラウザ版は、購入後にここから利用できます。
        </p>

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

        {me === undefined ? (
          <p className="text-slate-500 font-bold">読み込み中...</p>
        ) : me === null ? (
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <label className="text-sm font-bold text-slate-600">
              購入時のメールアドレス
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-base font-normal text-slate-800"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="bg-slate-800 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-slate-700 disabled:opacity-60"
            >
              {busy ? "送信中..." : "ログインリンクを送る"}
            </button>
            {devVerifyUrl ? (
              <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
                開発用リンク（ローカル確認用）:{" "}
                <a className="underline break-all" href={devVerifyUrl}>
                  {devVerifyUrl}
                </a>
              </p>
            ) : null}
          </form>
        ) : (
          <div className="flex flex-col gap-5">
            <p className="text-sm text-slate-600">
              ログイン中: <span className="font-bold">{me.email}</span>
            </p>
            {hasFull ? (
              <>
                <p className="text-sm font-bold text-emerald-700">
                  TABbeast フル版の利用権があります。
                </p>
                {(winVersion || webVersion) && (
                  <p className="text-sm text-slate-500">
                    {winVersion ? `Windows ${winVersion}` : null}
                    {winVersion && webVersion ? " / " : null}
                    {webVersion ? `Web ${webVersion}` : null}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={onDownload}
                    disabled={busy}
                    className="bg-slate-800 text-white px-5 py-2 rounded-full cursor-pointer hover:bg-slate-700 disabled:opacity-60"
                  >
                    {busy ? "準備中..." : "Windows版をダウンロード"}
                  </button>
                  <a
                    href="/app/"
                    className="inline-flex justify-center bg-slate-800 text-white px-5 py-2 rounded-full hover:bg-slate-700"
                  >
                    ブラウザ版を開く
                  </a>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Windows で「Windows によって PC が保護されました」と出る場合は、
                  「詳細情報」→「実行」で続行できることがあります（コード署名導入前）。
                </p>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-sm text-slate-600">
                  このアカウントにはまだ購入権がありません。
                </p>
                <Link
                  to="/tabbeast"
                  className="inline-flex justify-center bg-slate-800 text-white px-6 py-2 rounded-full hover:bg-slate-700"
                >
                  購入ページへ
                </Link>
              </div>
            )}
            <button
              type="button"
              onClick={onLogout}
              disabled={busy}
              className="self-start text-sm text-slate-500 underline cursor-pointer disabled:opacity-60"
            >
              ログアウト
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Mypage;
