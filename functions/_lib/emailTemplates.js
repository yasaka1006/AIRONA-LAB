/** @typedef {'ja' | 'en'} SiteLocale */

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** @param {SiteLocale} locale @param {string} verifyUrl */
export function magicLinkEmail(locale, verifyUrl) {
  const url = escapeHtml(verifyUrl);
  if (locale === "en") {
    return {
      subject: "TABbeast login link",
      html: `<p>Open the link below to log in to TABbeast.</p>
<p><a href="${url}">${url}</a></p>
<p>This link is valid for a short time and can only be used once.</p>
<p>If you did not request this email, you can ignore it.</p>`,
    };
  }
  return {
    subject: "TABbeast ログインリンク",
    html: `<p>TABbeast にログインするには、次のリンクを開いてください。</p>
<p><a href="${url}">${url}</a></p>
<p>このリンクは短時間のみ有効で、1回のみ使用できます。</p>
<p>心当たりがない場合はこのメールを無視してください。</p>`,
  };
}

/** @param {SiteLocale} locale @param {string} mypageUrl */
export function purchaseEmail(locale, mypageUrl) {
  const url = escapeHtml(mypageUrl);
  if (locale === "en") {
    return {
      subject: "Thank you for purchasing TABbeast",
      html: `<p>Thank you for purchasing TABbeast (¥2,980 incl. tax).</p>
<p>Your license has been added to your account. Open My page to use the browser edition or download the Windows edition.</p>
<p><a href="${url}">${url}</a></p>
<p>On another device or browser, log in with the same Google account or the magic link sent to your email.</p>`,
    };
  }
  return {
    subject: "TABbeast のご購入ありがとうございます",
    html: `<p>TABbeast のご購入ありがとうございました（税込 ¥2,980）。</p>
<p>ご購入アカウントに権利が付与されています。マイページからブラウザ版の利用、および Windows 版のダウンロードができます。</p>
<p><a href="${url}">${url}</a></p>
<p>別の端末やブラウザから開く場合は、同じアカウントで Google ログイン、またはメールのマジックリンクでログインしてください。</p>`,
  };
}

/** @param {SiteLocale} locale @param {string} url */
export function verifyEmail(locale, url) {
  const link = escapeHtml(url);
  if (locale === "en") {
    return {
      subject: "Confirm your TABbeast email address",
      html: `<p>Please open the link below to confirm your email address.</p>
<p><a href="${link}">${link}</a></p>
<p>If you did not request this email, you can ignore it.</p>`,
    };
  }
  return {
    subject: "TABbeast メールアドレスの確認",
    html: `<p>メールアドレスを確認するには、次のリンクを開いてください。</p>
<p><a href="${link}">${link}</a></p>
<p>心当たりがない場合はこのメールを無視してください。</p>`,
  };
}

/** @param {SiteLocale} locale @param {string} newEmail @param {string} url */
export function changeEmailConfirmation(locale, newEmail, url) {
  const email = escapeHtml(newEmail);
  const link = escapeHtml(url);
  if (locale === "en") {
    return {
      subject: "Confirm your TABbeast email change",
      html: `<p>A request was made to change your email address to <strong>${email}</strong>.</p>
<p>Open the link below to approve the change.</p>
<p><a href="${link}">${link}</a></p>
<p>If you did not request this email, you can ignore it.</p>`,
    };
  }
  return {
    subject: "TABbeast メールアドレス変更の確認",
    html: `<p>メールアドレスを <strong>${email}</strong> に変更するリクエストがありました。</p>
<p>変更を承認するには次のリンクを開いてください。</p>
<p><a href="${link}">${link}</a></p>
<p>心当たりがない場合はこのメールを無視してください。</p>`,
  };
}

const CONTACT_CATEGORY_LABELS = {
  ja: {
    purchase_download: "購入・ダウンロード",
    browser: "ブラウザ版",
    payment: "決済トラブル",
    bug: "不具合・要望",
    other: "その他",
  },
  en: {
    purchase_download: "Purchase / download",
    browser: "Browser edition",
    payment: "Payment issue",
    bug: "Bug / feature request",
    other: "Other",
  },
};

/** @param {SiteLocale} locale @param {string} category */
export function contactCategoryLabel(locale, category) {
  return CONTACT_CATEGORY_LABELS[locale]?.[category] || category;
}

/** @param {SiteLocale} locale */
export function contactAdminEmailIntro(locale) {
  return locale === "en"
    ? "TABbeast contact form submission received."
    : "TABbeast お問い合わせを受信しました。";
}

/** @param {SiteLocale} locale @param {string} key */
export function contactFieldLabel(locale, key) {
  const labels = {
    ja: {
      category: "種別",
      replyTo: "返信先",
      subject: "件名",
      login: "ログイン",
      owned: "購入権",
      locale: "ユーザー言語",
      yes: "あり",
      no: "なし",
      none: "（件名なし）",
    },
    en: {
      category: "Category",
      replyTo: "Reply to",
      subject: "Subject",
      login: "Logged in",
      owned: "License",
      locale: "User locale",
      yes: "Yes",
      no: "No",
      none: "(No subject)",
    },
  };
  return labels[locale]?.[key] || key;
}

export { escapeHtml };
