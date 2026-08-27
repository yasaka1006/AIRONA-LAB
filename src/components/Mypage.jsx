import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authClient } from "../lib/authClient";
import { fetchMe, logout, requestDownload } from "../lib/commerceApi";

/**
 * 販売カタログ（今後の製品はここに追加）
 * entitlement.productId と id を対応させる
 */
const PRODUCT_CATALOG = [
  {
    id: "tabbeast_full",
    name: "TABbeast",
    description: "ギターTAB編集ソフト（Windows / ブラウザ）",
    storePath: "/tabbeast",
    actions: [
      {
        kind: "download",
        label: "Download",
        channel: "full_win",
        versionKey: "full_win",
      },
      {
        kind: "link",
        label: "ブラウザ版",
        href: "/app/",
        versionKey: "full_web",
      },
    ],
  },
];

function ownedProducts(me) {
  const activeIds = new Set(
    (me?.entitlements || [])
      .filter((item) => item.status === "active")
      .map((item) => item.productId),
  );
  return PRODUCT_CATALOG.filter((product) => activeIds.has(product.id));
}

/** Open redirect 防止: 同一オリジンの相対パスのみ許可 */
function safeNextPath(raw) {
  if (!raw || typeof raw !== "string") return "/mypage";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/mypage";
  return raw;
}

function GoogleMark({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

const Mypage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [me, setMe] = useState(undefined);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [busyAction, setBusyAction] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [googleAvailable, setGoogleAvailable] = useState(false);
  const afterLoginPath = safeNextPath(searchParams.get("next"));

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
      setNotice(
        "購入手続きが完了しました。権利が反映されない場合は再読み込みしてください。",
      );
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
        callbackURL: afterLoginPath,
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
        callbackURL: afterLoginPath,
        newUserCallbackURL: afterLoginPath,
        errorCallbackURL: `/mypage?auth=invalid&next=${encodeURIComponent(afterLoginPath)}`,
      });
      if (authError) {
        throw new Error(authError.message || "Failed to send magic link");
      }
      setNotice(
        "入力されたアドレスにログイン用リンクを送りました。届かない場合は迷惑メールフォルダも確認してください。",
      );
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

  const onDownload = async (channel, actionKey) => {
    setBusy(true);
    setBusyAction(actionKey);
    setError("");
    try {
      const result = await requestDownload(channel);
      window.location.assign(result.url);
    } catch (err) {
      setError(err.message);
      setBusy(false);
      setBusyAction("");
    }
  };

  const products = me ? ownedProducts(me) : [];

  return (
    <main className="my-8 mx-1">
      <section
        className={`bg-white border border-slate-200 rounded-xl p-6 md:px-8 md:py-8 shadow-sm ${
          me ? "w-full" : "max-w-md mx-auto w-full"
        }`}
      >
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
          {me ? (
            <>
              マイページ
              <span className="ml-2 text-sm md:text-base font-normal text-slate-500">
                - {me.email}
              </span>
            </>
          ) : (
            "ログイン・アカウント作成"
          )}
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          {me
            ? "購入済み製品のダウンロード"
            : "Google またはメールでログイン／アカウント作成できます。"}
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
                className="w-full inline-flex items-center justify-center gap-3 bg-slate-800 text-white px-6 py-3 rounded-full cursor-pointer hover:bg-slate-700 disabled:opacity-60 font-bold"
              >
                {busy ? (
                  "移動中..."
                ) : (
                  <>
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white">
                      <GoogleMark className="h-4 w-4" />
                    </span>
                    Google で続行
                  </>
                )}
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
                  placeholder="user@example.com"
                  autoComplete="email"
                />
              </label>
              <p className="text-xs text-slate-500 leading-relaxed">
                ログインリンク送信後、届いたメールのリンクをクリックしてください。届かない場合は迷惑メールフォルダも確認してください。
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
          <div className="flex flex-col gap-8">
            <section className="flex flex-col gap-4">
              <h2 className="text-lg font-extrabold text-slate-800">
                購入済み製品
              </h2>

              {products.length === 0 ? (
                <div className="flex flex-col gap-3 rounded-lg border border-dashed border-slate-200 px-4 py-5">
                  <p className="text-sm text-slate-600">
                    まだ購入済みの製品はありません。
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {products.map((product) => (
                    <li
                      key={product.id}
                      className="rounded-lg border border-slate-200 px-4 py-4"
                    >
                      <div className="flex flex-col gap-3">
                        <div>
                          <p className="text-base font-extrabold text-slate-800">
                            {product.name}
                          </p>
                          {product.description ? (
                            <p className="text-xs text-slate-500 mt-1">
                              {product.description}
                            </p>
                          ) : null}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          {product.actions.map((action) => {
                            const version =
                              action.versionKey && me.latest?.[action.versionKey]
                                ? me.latest[action.versionKey].version
                                : null;
                            const actionKey = `${product.id}:${action.label}`;
                            if (action.kind === "download") {
                              return (
                                <button
                                  key={actionKey}
                                  type="button"
                                  onClick={() =>
                                    onDownload(action.channel, actionKey)
                                  }
                                  disabled={busy}
                                  className="bg-slate-800 text-white px-5 py-2 rounded-full cursor-pointer hover:bg-slate-700 disabled:opacity-60 text-sm"
                                >
                                  {busyAction === actionKey
                                    ? "準備中..."
                                    : version
                                      ? `${action.label} (${version})`
                                      : action.label}
                                </button>
                              );
                            }
                            return (
                              <a
                                key={actionKey}
                                href={action.href}
                                className="inline-flex justify-center bg-slate-800 text-white px-5 py-2 rounded-full hover:bg-slate-700 text-sm"
                              >
                                {version
                                  ? `${action.label} (${version})`
                                  : action.label}
                              </a>
                            );
                          })}
                        </div>
                        {product.id === "tabbeast_full" ? (
                          <>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              Windows で「Windows によって PC が保護されました」と出る場合は、
                              「詳細情報」→「実行」で続行できることがあります（コード署名導入前）。
                            </p>
                            <p>
                              <Link
                                to="/tabbeast/contact"
                                className="text-sm text-slate-700 underline"
                              >
                                お問い合わせ
                              </Link>
                            </p>
                          </>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="border-t border-slate-100 pt-6 flex flex-col gap-3">
              <h2 className="text-lg font-extrabold text-slate-800">設定</h2>
              <Link
                to="/mypage/email"
                className="self-start text-sm text-slate-700 underline"
              >
                メールアドレス変更
              </Link>
            </section>

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
