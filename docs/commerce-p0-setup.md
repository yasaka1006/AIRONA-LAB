# Commerce (TABbeast 販売) — P0 セットアップ

技術設計: HexaTAB `docs/web-sales-technical-design.md`

## P0 で入ったもの

- `migrations/commerce/001_init.sql` — D1 スキーマ
- `functions/api/commerce/*` — API スケルトン（未実装は 501）
- `functions/app/[[path]].js` — 製品 Web ゲート枠
- `functions/_lib/commerce.js` — 共有ヘルパー
- `wrangler.toml` — Bindings テンプレート
- `.dev.vars.example` — ローカル Secrets 例

## 動作確認（health）

```bash
npm run build
npx wrangler pages dev dist --d1=COMMERCE_DB=airona-commerce --d1=DB=airona-lab-db
```

または Bindings を `wrangler.toml` に正しく書いたうえで:

```bash
npm run pages:dev
```

ブラウザまたは curl:

```bash
curl http://127.0.0.1:8788/api/commerce/health
```

期待: `{ "ok": true, "phase": "P1", ... }`

## Cloudflare 側でやること（初回）

1. D1 データベース `airona-commerce` を作成
2. R2 バケット `tabbeast-products` を作成（Private）
3. `wrangler.toml` の `database_id` を実 ID に置換（既存ランキング DB も含む）
4. スキーマ適用:

```bash
npx wrangler d1 execute airona-commerce --remote --file=./migrations/commerce/001_init.sql
npx wrangler d1 execute airona-commerce --local --file=./migrations/commerce/001_init.sql
```

5. Pages プロジェクトに Bindings を設定（Dashboard または wrangler）
   - `COMMERCE_DB` → airona-commerce
   - `PRODUCTS` → tabbeast-products
   - `DB` → 既存ランキング（維持）
6. Secrets: Stripe / Resend / SESSION_SECRET / APP_BASE_URL 等

## P1（マジックリンク）

`.dev.vars` に少なくとも次を入れる（ローカル）:

```
SESSION_SECRET=change-me-to-a-long-random-string
COMMERCE_DEV_ALLOW_ANY_EMAIL=1
COMMERCE_DEV_RETURN_LINK=1
APP_BASE_URL=http://127.0.0.1:8788
```

`npm run pages:dev` のあと `/mypage` でメールを送り、表示された開発用リンクを開くとログインできる。

本番では `COMMERCE_DEV_*` を付けず、Resend（`RESEND_API_KEY` / `MAIL_FROM`）を設定する。未購入アドレスにはメールを送らない。

## メール（Resend）

1. [resend.com](https://resend.com) で API キー作成
2. ドメインを検証（本番）。テストのみなら `MAIL_FROM=onboarding@resend.dev`
3. `.dev.vars` / Pages Secrets: `RESEND_API_KEY=re_...` と `MAIL_FROM=...`
4. Cloudflare Email Sending / Workers Paid は不要

## P2（Stripe）

- `POST /api/commerce/checkout` … `agreeToTerms: true` で Checkout URL
- `POST /api/commerce/stripe/webhook` … 署名検証、権利付与、返金で revoke
- ローカルで Stripe 未設定なら `.dev.vars` に `COMMERCE_DEV_FAKE_CHECKOUT=1`。同意＋メールで権利を付けて `/mypage` へ
- 本番: Stripe の Price（¥2,920）と Webhook エンドポイント `/api/commerce/stripe/webhook`（`checkout.session.completed`, `charge.refunded`, `charge.dispute.created`）
- 特商法・規約の正式文言は P5。今はプレースホルダ

## P3（ダウンロード）

- `GET /api/commerce/download?channel=full_win` … 要ログイン + active → 短命 URL
- `GET /api/commerce/artifact?token=` … R2 から zip を返す
- seed: `npm run db:commerce:seed:local`（remote も同様）
- プレースホルダ: `npm run r2:placeholder:local`
- R2 未配置でも `.dev.vars` の `COMMERCE_DEV_FAKE_DOWNLOAD=1` なら小さな zip を返す

## P4（ブラウザ版ゲート）

- `GET /app` / `/app/*` … 要ログイン + active → R2 `tabbeast/full/web/{version}/`
- 未認証・未購入 → `/mypage` へ 302
- HexaTAB: `npm run build:web:full`（`base: /app/`）→ dist を R2 に配置
- ローカル: `COMMERCE_DEV_FAKE_APP=1` または `npm run r2:web:placeholder:local`

## P5（導線・法務）

- `/legal/terms` / `/legal/tokushoho` … 本文骨組み（販売者氏名等は本番前に記入）
- `/tabbeast` … DEMO Web（`DEMO_WEB_URL` / releases）、DEMO Win（`DEMO_WIN_URL`）
- `GET /api/commerce/demo` … 公開の DEMO URL
- Footer から規約・特商法・PP へ辿れる

## P6（リリース半自動）

HexaTAB:

```bash
npm run release:plan
npm run release:web:local
npm run release -- --channels=full_win
```

設定: `HexaTAB/scripts/release/release.config.json`

フェーズ1の実装はここまで。本番前チェックは技術設計 §14。

## 本番 Secrets（Pages）

プロジェクト名: `aironalab`（ドメイン: `airona-lab.com`）

### 1. Bindings（Dashboard）

Cloudflare Dashboard → Workers & Pages → **aironalab** → Settings → Bindings:

| Binding | Type | リソース |
|---|---|---|
| `COMMERCE_DB` | D1 | `airona-commerce` |
| `PRODUCTS` | R2 | `tabbeast-products` |
| `DB` | D1 | `ranking`（既存） |

### 2. Stripe Webhook（本番 URL）

Stripe Dashboard（Test mode）→ Developers → Webhooks → Add endpoint:

- URL: `https://airona-lab.com/api/commerce/stripe/webhook`
- イベント: `checkout.session.completed`, `charge.refunded`, `charge.dispute.created`
- 表示された **Signing secret**（`whsec_...`）を使う  
  ※ `stripe listen` の `whsec` とは別物

### 3. Secrets を投入

`.prod.vars.example` を `.prod.vars` にコピーして値を埋め、次を実行:

```bash
npx wrangler pages secret bulk .prod.vars --project-name aironalab
```

必須キー: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID`, `RESEND_API_KEY`, `MAIL_FROM`, `APP_BASE_URL`, `SESSION_SECRET`, `DOWNLOAD_URL_TTL_SEC`, `MAGIC_LINK_TTL_SEC`（任意: `DEMO_WEB_URL`, `DEMO_WIN_URL`）

**本番に `COMMERCE_DEV_*` を付けない。**

### 4. デプロイ後

Git 連携なら push、または手動デプロイ後に `/api/commerce/health` で Bindings を確認。

## 完了

P0〜P6 の骨格は揃っています。
