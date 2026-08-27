import {
  commerceDb,
  error,
  getSession,
  isValidEmail,
  json,
  listEntitlements,
  methodNotAllowed,
  normalizeEmail,
  readJson,
  sameSitePost,
  sendResendEmail,
} from "../../_lib/commerce.js";

const CATEGORIES = {
  purchase_download: "購入・ダウンロード",
  browser: "ブラウザ版",
  payment: "決済トラブル",
  bug: "不具合・要望",
  other: "その他",
};

const MAX_SUBJECT = 120;
const MAX_BODY = 4000;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function contactTo(env) {
  const raw = normalizeEmail(env.CONTACT_TO || "airona.lab@gmail.com");
  return isValidEmail(raw) ? raw : "airona.lab@gmail.com";
}

/**
 * POST /api/commerce/contact — TABbeast お問い合わせ（ログイン任意）
 */
export async function onRequestPost(context) {
  const { request, env } = context;
  if (!sameSitePost(request, env)) {
    return error(403, "forbidden", "Invalid origin");
  }

  const body = await readJson(request);
  if (!body || typeof body !== "object") {
    return error(400, "invalid_json", "Invalid JSON body");
  }

  const category = typeof body.category === "string" ? body.category : "";
  const categoryLabel = CATEGORIES[category];
  if (!categoryLabel) {
    return error(400, "invalid_category", "種別を選択してください");
  }

  const email = normalizeEmail(body.email);
  if (!isValidEmail(email)) {
    return error(400, "invalid_email", "有効なメールアドレスを入力してください");
  }

  const subjectRaw =
    typeof body.subject === "string" ? body.subject.trim() : "";
  const subject =
    subjectRaw.slice(0, MAX_SUBJECT) || `（件名なし）`;

  const messageRaw = typeof body.message === "string" ? body.message.trim() : "";
  if (messageRaw.length < 10) {
    return error(400, "message_too_short", "内容は10文字以上で入力してください");
  }
  if (messageRaw.length > MAX_BODY) {
    return error(400, "message_too_long", "内容が長すぎます");
  }

  const session = await getSession(env, request);
  let owned = false;
  let authUserId = null;
  if (session) {
    authUserId = session.authUserId;
    const db = commerceDb(env);
    if (db) {
      const entitlements = await listEntitlements(db, session.customerId);
      owned = entitlements.some(
        (item) => item.productId === "tabbeast_full" && item.status === "active",
      );
    }
  }

  const mailSubject = `[TABbeast 問い合わせ][${categoryLabel}] ${subject}`;
  const html = `
<p>TABbeast お問い合わせを受信しました。</p>
<table style="border-collapse:collapse;font-size:14px;line-height:1.6">
  <tr><td style="padding:4px 12px 4px 0;color:#64748b">種別</td><td>${escapeHtml(categoryLabel)}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#64748b">返信先</td><td>${escapeHtml(email)}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#64748b">件名</td><td>${escapeHtml(subject)}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#64748b">ログイン</td><td>${session ? "あり" : "なし"}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#64748b">購入権</td><td>${owned ? "tabbeast_full active" : "なし / 不明"}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#64748b">authUserId</td><td>${authUserId ? escapeHtml(authUserId) : "—"}</td></tr>
</table>
<p style="white-space:pre-wrap;margin-top:16px;padding:12px;background:#f8fafc;border-radius:8px">${escapeHtml(messageRaw)}</p>
`.trim();

  const result = await sendResendEmail(env, {
    to: contactTo(env),
    subject: mailSubject,
    html,
    replyTo: email,
  });

  if (!result.sent) {
    if (result.reason === "not_configured") {
      return error(503, "mail_not_configured", "メール送信が設定されていません");
    }
    return error(502, "mail_failed", "送信に失敗しました。しばらくしてから再度お試しください");
  }

  return json({ ok: true });
}

export async function onRequest(context) {
  if (context.request.method === "POST") {
    return onRequestPost(context);
  }
  return methodNotAllowed(["POST"]);
}
