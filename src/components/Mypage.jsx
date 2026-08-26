import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authClient } from "../lib/authClient";
import { fetchMe, logout, requestDownload } from "../lib/commerceApi";

const Mypage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [me, setMe] = useState(undefined);
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [googleAvailable, setGoogleAvailable] = useState(false);

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
    fetch("/api/commerce/auth/providers", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.google) setGoogleAvailable(true);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const auth = searchParams.get("auth");
    const checkout = searchParams.get("checkout");
    if (auth === "invalid" || searchParams.get("error")) {
      setError("ログインに失敗しました。もう一度お試しください。");
    }
    if (checkout === "success") {
      setNotice("購入手続きが完了しました。権利が反映されない場合は再読み込みしてください。");
      loadMe();
    }
    if (auth || checkout || searchParams.get("error")) {
      const next = new URLSearchParams(searchParams);
      next.delete("auth");
      next.delete("checkout");
      next.delete("error");
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const onGoogle = async () => {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/mypage",
      });
    } catch (err) {
      setError(err?.message || "Google ログインを開始できませんでした。");
      setBusy(false);
    }
  };

  const onMagicLink = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const { error: authError } = await authClient.signIn.magicLink({
        email,
        callbackURL: "/mypage",
        newUserCallbackURL: "/mypage",
        errorCallbackURL: "/mypage?auth=invalid",
      });
      if (authError) {
        throw new Error(authError.message || "Failed to send magic link");
      }
      setNotice(
        "入力されたアドレスにログイン用リンクを送りました。届かない場合は迷惑メールフォルダを確認してください。",
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const onChangeEmail = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const { error: authError } = await authClient.changeEmail({
        newEmail,
        callbackURL: "/mypage",
      });
      if (authError) {
        throw new Error(authError.message || "Failed to change email");
      }
      setNotice(
        "確認メールを送りました。現在のメール（または新メール）の案内に従って変更を完了してください。",
      );
      setNewEmail("");
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
          アカウント作成・ログインのあと、購入・ダウンロード・ブラウザ版を利用できます。
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
          <div className="flex flex-col gap-5">
            {googleAvailable ? (
              <button
                type="button"
                onClick={onGoogle}
                disabled={busy}
                className="w-full bg-slate-800 text-white px-6 py-3 rounded-full cursor-pointer hover:bg-slate-700 disabled:opacity-60 font-bold"
              >
                {busy ? "移動中..." : "Google で続行"}
              </button>
            ) : null}
            <div className="relative text-center text-xs text-slate-400">
              <span className="bg-white px-2 relative z-10">または</span>
              <span className="absolute left-0 right-0 top-1/2 border-t border-slate-200 -z-0" />
            </div>
            <form onSubmit={onMagicLink} className="flex flex-col gap-3">
              <label className="text-sm font-bold text-slate-600">
                メールでログイン
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
              <p className="text-xs text-slate-500 leading-relaxed">
                パスワードは不要です。受信箱のリンクでログインします。
              </p>
              <button
                type="submit"
                disabled={busy}
                className="border border-slate-300 text-slate-800 px-6 py-2 rounded-full cursor-pointer hover:bg-slate-50 disabled:opacity-60"
              >
                {busy ? "送信中..." : "ログインリンクを送る"}
              </button>
            </form>
          </div>
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
                  このアカウントにはまだ購入権がありません。ログイン済みなので購入できます。
                </p>
                <Link
                  to="/tabbeast"
                  className="inline-flex justify-center bg-slate-800 text-white px-6 py-2 rounded-full hover:bg-slate-700"
                >
                  購入ページへ
                </Link>
              </div>
            )}

            <form
              onSubmit={onChangeEmail}
              className="border-t border-slate-100 pt-4 flex flex-col gap-3"
            >
              <p className="text-sm font-bold text-slate-700">メールアドレス変更</p>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800"
                placeholder="新しいメールアドレス"
                autoComplete="email"
              />
              <button
                type="submit"
                disabled={busy}
                className="self-start border border-slate-300 text-slate-700 px-4 py-1.5 rounded-full text-sm cursor-pointer hover:bg-slate-50 disabled:opacity-60"
              >
                確認メールを送る
              </button>
            </form>

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
