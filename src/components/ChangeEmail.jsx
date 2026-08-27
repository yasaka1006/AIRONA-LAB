import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { authClient } from "../lib/authClient";
import { fetchMe } from "../lib/commerceApi";

const ChangeEmail = () => {
  const [me, setMe] = useState(undefined);
  const [newEmail, setNewEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMe()
      .then((data) => setMe(data))
      .catch((err) => {
        setError(err.message);
        setMe(null);
      });
  }, []);

  const onSubmit = async (event) => {
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

  if (me === undefined) {
    return (
      <main className="my-8 mx-1">
        <p className="text-slate-500 font-bold">読み込み中...</p>
      </main>
    );
  }

  if (me === null) {
    return <Navigate to="/mypage" replace />;
  }

  return (
    <main className="my-8 mx-1">
      <section className="w-full bg-white border border-slate-200 rounded-xl p-6 md:px-8 md:py-8 shadow-sm">
        <p className="mb-4">
          <Link to="/mypage" className="text-sm text-slate-500 underline">
            ← マイページに戻る
          </Link>
        </p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
          メールアドレス変更
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          現在: <span className="font-bold text-slate-700">{me.email}</span>
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

        <form onSubmit={onSubmit} className="flex flex-col gap-3 max-w-md">
          <label className="text-sm font-bold text-slate-700">
            新しいメールアドレス
            <input
              type="email"
              required
              value={newEmail}
              onChange={(event) => setNewEmail(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal text-slate-800"
              placeholder="new@example.com"
              autoComplete="email"
            />
          </label>
          <p className="text-xs text-slate-500 leading-relaxed">
            確認用のメールが届きます。リンクを開くと変更が完了します。
          </p>
          <button
            type="submit"
            disabled={busy}
            className="self-start bg-slate-800 text-white px-5 py-2 rounded-full text-sm cursor-pointer hover:bg-slate-700 disabled:opacity-60"
          >
            {busy ? "送信中..." : "確認メールを送る"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default ChangeEmail;
