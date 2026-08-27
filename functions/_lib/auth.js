/** Better Auth factory (per-request; D1 binding is request-scoped). */

import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import {
  appBaseUrl,
  magicLinkTtlSec,
  sendResendEmail,
} from "./commerce.js";

/**
 * @param {any} env
 * @param {Request} request
 */
export function createAuth(env, request) {
  const db = env.COMMERCE_DB;
  if (!db) {
    throw new Error("COMMERCE_DB is not bound");
  }

  const baseURL = appBaseUrl(env, request);
  const secret =
    env.BETTER_AUTH_SECRET ||
    env.SESSION_SECRET ||
    "dev-better-auth-secret-change-me";

  /** @type {Record<string, unknown>} */
  const socialProviders = {};
  if (
    env.GOOGLE_CLIENT_ID &&
    env.GOOGLE_CLIENT_SECRET &&
    !String(env.GOOGLE_CLIENT_ID).includes("xxx")
  ) {
    socialProviders.google = {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      prompt: "select_account",
    };
  }

  return betterAuth({
    database: db,
    baseURL,
    secret,
    emailAndPassword: {
      enabled: false,
    },
    socialProviders,
    session: {
      expiresIn: 60 * 60 * 24 * 30,
      updateAge: 60 * 60 * 24,
    },
    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ["google"],
      },
    },
    user: {
      changeEmail: {
        enabled: true,
        sendChangeEmailConfirmation: async ({ user, newEmail, url }) => {
          void sendResendEmail(env, {
            to: user.email,
            subject: "TABbeast メールアドレス変更の確認",
            html: `<p>メールアドレスを <strong>${newEmail}</strong> に変更するリクエストがありました。</p>
<p>変更を承認するには次のリンクを開いてください。</p>
<p><a href="${url}">${url}</a></p>
<p>心当たりがない場合はこのメールを無視してください。</p>`,
          });
        },
      },
    },
    emailVerification: {
      sendVerificationEmail: async ({ user, url }) => {
        void sendResendEmail(env, {
          to: user.email,
          subject: "TABbeast メールアドレスの確認",
          html: `<p>メールアドレスを確認するには、次のリンクを開いてください。</p>
<p><a href="${url}">${url}</a></p>
<p>心当たりがない場合はこのメールを無視してください。</p>`,
        });
      },
    },
    plugins: [
      magicLink({
        expiresIn: magicLinkTtlSec(env),
        sendMagicLink: async ({ email, url }) => {
          const result = await sendResendEmail(env, {
            to: email,
            subject: "TABbeast ログインリンク",
            html: `<p>TABbeast にログインするには、次のリンクを開いてください。</p>
<p><a href="${url}">${url}</a></p>
<p>このリンクは短時間のみ有効で、1回のみ使用できます。</p>
`,
          });
          if (!result.sent) {
            console.error("magic_link_send_failed", result.reason || result.status);
          }
        },
      }),
    ],
  });
}

/**
 * @param {any} env
 * @param {Request} request
 */
export async function getBetterAuthSession(env, request) {
  if (!env.COMMERCE_DB) return null;
  try {
    const auth = createAuth(env, request);
    return await auth.api.getSession({ headers: request.headers });
  } catch (err) {
    console.error("getBetterAuthSession_failed", String(err));
    return null;
  }
}
