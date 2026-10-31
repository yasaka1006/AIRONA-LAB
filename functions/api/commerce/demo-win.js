import { handleDemoDownload } from "../../_lib/demoDownload.js";

/**
 * GET /api/commerce/demo-win
 * Public download of latest DEMO Windows zip from private R2 (no auth).
 */
export async function onRequest(context) {
  return handleDemoDownload(context, {
    channel: "demo_win",
    label: "Windows",
    fallbackFilename: (version) => `TABbeast_Demo_${version}_x64.zip`,
    contentType: "application/zip",
  });
}
