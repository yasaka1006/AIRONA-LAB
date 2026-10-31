import { handleDemoDownload } from "../../_lib/demoDownload.js";

/**
 * GET /api/commerce/demo-mac
 * Public download of latest DEMO Mac dmg from private R2 (no auth).
 */
export async function onRequest(context) {
  return handleDemoDownload(context, {
    channel: "demo_mac",
    label: "Mac",
    fallbackFilename: (version) => `TABbeast_Demo_${version}.dmg`,
    contentType: "application/x-apple-diskimage",
  });
}
