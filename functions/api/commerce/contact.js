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
import {
  contactAdminEmailIntro,
  contactCategoryLabel,
  contactFieldLabel,
  escapeHtml,
} from "../../_lib/emailTemplates.js";
import { normalizeLocale, parseLocaleFromRequest } from "../../_lib/locale.js";

const CATEGORIES = new Set([
  "purchase_download",
  "browser",
  "payment",
  "bug",
  "other",
]);

const MAX_SUBJECT = 120;
const MAX_BODY = 4000;

const CONTACT_ERRORS = {
  ja: {
    invalid_category: "種別を選択してください",
    invalid_email: "有効なメールアドレスを入力してください",
    message_too_short: "内容は10文字以上で入力してください",
    message_too_long: "内容が長すぎます",
    mail_not_configured: "メール送信が設定されていません",
    mail_failed: "送信に失敗しました。しばらくしてから再度お試しください",
  },
  en: {
    invalid_category: "Please select a category",
    invalid_email: "Please enter a valid email address",
    message_too_short: "Message must be at least 10 characters",
    message_too_long: "Message is too long",
    mail_not_configured: "Email is not configured",
    mail_failed: "Failed to send. Please try again later",
  },
};

function contactError(status, code, locale) {
  const loc = normalizeLocale(locale);
  const message = CONTACT_ERRORS[loc][code] || CONTACT_ERRORS.ja[code] || code;
  return error(status, code, message);
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

  const locale = parseLocaleFromRequest(request, body.locale);

  const category = typeof body.category === "string" ? body.category : "";
  if (!CATEGORIES.has(category)) {
    return contactError(400, "invalid_category", locale);
  }
  const categoryLabel = contactCategoryLabel(locale, category);

  const email = normalizeEmail(body.email);
  if (!isValidEmail(email)) {
    return contactError(400, "invalid_email", locale);
  }

  const subjectRaw =
    typeof body.subject === "string" ? body.subject.trim() : "";
  const subject =
    subjectRaw.slice(0, MAX_SUBJECT) || contactFieldLabel(locale, "none");

  const messageRaw = typeof body.message === "string" ? body.message.trim() : "";
  if (messageRaw.length < 10) {
    return contactError(400, "message_too_short", locale);
  }
  if (messageRaw.length > MAX_BODY) {
    return contactError(400, "message_too_long", locale);
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

  const mailSubject =
    locale === "en"
      ? `[TABbeast contact][${categoryLabel}] ${subject}`
      : `[TABbeast 問い合わせ][${categoryLabel}] ${subject}`;
  const html = `
<p>${contactAdminEmailIntro(locale)}</p>
<table style="border-collapse:collapse;font-size:14px;line-height:1.6">
  <tr><td style="padding:4px 12px 4px 0;color:#64748b">${contactFieldLabel(locale, "category")}</td><td>${escapeHtml(categoryLabel)}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#64748b">${contactFieldLabel(locale, "replyTo")}</td><td>${escapeHtml(email)}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#64748b">${contactFieldLabel(locale, "subject")}</td><td>${escapeHtml(subject)}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#64748b">${contactFieldLabel(locale, "login")}</td><td>${session ? contactFieldLabel(locale, "yes") : contactFieldLabel(locale, "no")}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#64748b">${contactFieldLabel(locale, "owned")}</td><td>${owned ? "tabbeast_full active" : contactFieldLabel(locale, "no")}</td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#64748b">${contactFieldLabel(locale, "locale")}</td><td>${locale}</td></tr>
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
      return contactError(503, "mail_not_configured", locale);
    }
    return contactError(502, "mail_failed", locale);
  }

  return json({ ok: true });
}

export async function onRequest(context) {
  if (context.request.method === "POST") {
    return onRequestPost(context);
  }
  return methodNotAllowed(["POST"]);
}
