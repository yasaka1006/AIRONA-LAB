import { Link } from 'react-router-dom';

const Step = ({ n, title, children }) => (
  <li className="flex gap-4">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-extrabold text-white">
      {n}
    </span>
    <div className="min-w-0 flex-1 space-y-2">
      <h2 className="text-base font-extrabold text-slate-800">{title}</h2>
      <div className="text-sm text-slate-600 leading-relaxed space-y-2">{children}</div>
    </div>
  </li>
);

const TabbeastGuide = () => (
  <main className="my-8 mx-1">
    <section className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
      <p className="mb-4">
        <Link to="/tabbeast" className="text-sm text-slate-500 underline">
          ← TABbeast に戻る
        </Link>
      </p>
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
        TABbeast ご利用の流れ
      </h1>
      <p className="text-sm text-slate-500 leading-relaxed mb-8">
        ログインから購入、製品版のダウンロード・ブラウザ版の利用までの手順です。
      </p>

      <ol className="flex flex-col space-y-10">
        <Step n="0" title="おためし版で試す">
          <p>
            購入前に機能を確認できます。
            <Link to="/tabbeast" className="underline mx-0.5">
              製品ページ
            </Link>
            から「おためし版（ブラウザ）」または「おためし版（Windows EXE）」を選んでください。DEMO は機能制限付きです。
          </p>
        </Step>

        <Step n="1" title="ログイン（アカウント作成）">
          <p>
            購入にはログインが必要です。
            <Link to="/mypage" className="underline mx-0.5">
              マイページ
            </Link>
            を開き、次のいずれかでログインしてください。
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Google で続行</strong> — いちばん簡単です</li>
            <li><strong>メールでログイン</strong> — 届いたメールのリンクをクリック</li>
          </ul>
          <p className="text-xs text-slate-500">
            購入権はこのアカウント（メールアドレス）に紐づきます。別の端末でも同じ方法でログインすれば利用できます。
          </p>
        </Step>

        <Step n="2" title="製品版を購入">
          <p>
            <Link to="/tabbeast" className="underline mx-0.5">
              製品ページ
            </Link>
            の「製品版を入手 ￥2,980」をクリックします。
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>未ログインの場合は、先にマイページへ誘導されます</li>
            <li>利用規約と特商法表記に同意</li>
            <li>Stripe の決済画面でカード情報を入力して支払い</li>
          </ul>
          <p className="text-xs text-slate-500">
            決済完了後、通常はすぐに購入権が付与されます。反映されない場合はマイページを再読み込みしてください。
          </p>
        </Step>

        <Step n="3" title="購入済み製品を確認">
          <p>
            <Link to="/mypage" className="underline mx-0.5">
              マイページ
            </Link>
            に「購入済み製品」として TABbeast が表示されます。
            製品ページ上部にも「購入済み」とダウンロードボタンが出ます。
          </p>
        </Step>

        <Step n="4" title="製品版を使う">
          <p className="font-bold text-slate-700">Windows の場合</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              マイページまたは製品ページの <strong>Windows EXE Download</strong> から zip をダウンロード
            </li>
            <li>zip を解凍して EXE を実行</li>
          </ul>
          <p className="text-xs text-slate-500">
            「Windows によって PC が保護されました」と出る場合は、「詳細情報」→「実行」で続行できることがあります（コード署名導入前）。
          </p>

          <p className="font-bold text-slate-700 pt-2">ブラウザ版（Windows / Mac）</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              マイページまたは製品ページの <strong>ブラウザ版</strong> をクリック（
              <Link to="/app/" className="underline">
                /app/
              </Link>
              ）
            </li>
            <li>ログイン済みかつ購入権がある場合のみ開けます</li>
          </ul>
          <p className="text-xs text-slate-500">
            Mac ではブラウザ版のみ利用可能です（EXE 版は Windows 専用）。
          </p>
        </Step>
      </ol>

      <div className="mt-10 rounded-lg bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600 leading-relaxed space-y-3">
        <p className="font-extrabold text-slate-800">よくあること</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>別の PC やブラウザで使いたい</strong> — 同じ Google アカウント、または同じメールでマジックリンクログイン
          </li>
          <li>
            <strong>メールアドレスを変えたい</strong> —{' '}
            <Link to="/mypage/email" className="underline">
              メールアドレス変更
            </Link>
            （購入権はアカウントに紐づいたまま）
          </li>
          <li>
            <strong>返金について</strong> — デジタル商品のため原則不可（
            <Link to="/legal/tokushoho" className="underline">
              特定商取引法に基づく表記
            </Link>
            ）
          </li>
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link to="/tabbeast" className="text-slate-700 underline">
          製品ページへ
        </Link>
        <Link to="/mypage" className="text-slate-700 underline">
          マイページへ
        </Link>
        <Link to="/tabbeast/contact" className="text-slate-700 underline">
          お問い合わせ
        </Link>
      </div>
    </section>
  </main>
);

export default TabbeastGuide;
