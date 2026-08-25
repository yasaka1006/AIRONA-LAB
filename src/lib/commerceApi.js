const API_UNAVAILABLE = "API_UNAVAILABLE";

async function readApiJson(res) {
  const type = res.headers.get("content-type") || "";
  const text = await res.text();
  if (!type.includes("application/json")) {
    throw new Error(API_UNAVAILABLE);
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(API_UNAVAILABLE);
  }
}

export async function fetchMe() {
  try {
    const res = await fetch("/api/commerce/me", { credentials: "include" });
    if (res.status === 401) return null;
    const body = await readApiJson(res);
    if (!res.ok) {
      throw new Error(body.message || "Failed to load account");
    }
    return body;
  } catch (err) {
    if (err.message === API_UNAVAILABLE) return null;
    throw err;
  }
}

export async function requestMagicLink(email) {
  try {
    const res = await fetch("/api/commerce/auth/magic-link", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const body = await readApiJson(res);
    if (!res.ok) {
      throw new Error(body.message || "Failed to request login link");
    }
    return body;
  } catch (err) {
    if (err.message === API_UNAVAILABLE) {
      throw new Error(
        "ログインAPIに接続できません。AIRONA-LAB で npm run pages:dev を起動してください。",
      );
    }
    throw err;
  }
}

export async function logout() {
  const res = await fetch("/api/commerce/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to logout");
  }
}

export async function requestDownload(channel = "full_win") {
  try {
    const res = await fetch(
      `/api/commerce/download?channel=${encodeURIComponent(channel)}`,
      { credentials: "include" },
    );
    const body = await readApiJson(res);
    if (!res.ok) {
      throw new Error(body.message || "Failed to create download link");
    }
    return body;
  } catch (err) {
    if (err.message === API_UNAVAILABLE) {
      throw new Error(
        "ダウンロードAPIに接続できません。AIRONA-LAB で npm run pages:dev を起動してください。",
      );
    }
    throw err;
  }
}

export async function createCheckout({ agreeToTerms, email } = {}) {
  try {
    const res = await fetch("/api/commerce/checkout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agreeToTerms, email }),
    });
    const body = await readApiJson(res);
    if (!res.ok) {
      throw new Error(body.message || "Failed to start checkout");
    }
    return body;
  } catch (err) {
    if (err.message === API_UNAVAILABLE) {
      throw new Error(
        "購入APIに接続できません。AIRONA-LAB で npm run pages:dev を起動してください。",
      );
    }
    throw err;
  }
}

export async function fetchDemoLinks() {
  try {
    const res = await fetch("/api/commerce/demo", { credentials: "include" });
    const body = await readApiJson(res);
    if (!res.ok) {
      throw new Error(body.message || "Failed to load demo links");
    }
    return body;
  } catch (err) {
    if (err.message === API_UNAVAILABLE) {
      return { demoWeb: null, demoWin: null, version: null };
    }
    throw err;
  }
}
