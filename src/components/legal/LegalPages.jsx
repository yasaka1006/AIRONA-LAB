const LegalPage = ({ title, children }) => (
  <main className="my-8 mx-1">
    <section className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
      <h1 className="text-2xl font-extrabold text-slate-800 mb-2">{title}</h1>
      <p className="text-xs text-slate-400 mb-6">最終更新: 2026-08-25</p>
      <div className="text-sm text-slate-600 leading-relaxed space-y-4">{children}</div>
    </section>
  </main>
);

const H = ({ children }) => (
  <h2 className="text-base font-extrabold text-slate-800 pt-2">{children}</h2>
);

export const Terms = () => (
  <LegalPage title="TABbeast 利用規約">
    <p>
      本規約は、個人事業主（以下「当方」）が提供するソフトウェア「TABbeast」（以下「本ソフトウェア」）および関連する Web サービス（マイページ、購入者向けブラウザ版等）の利用条件を定めるものです。購入または利用開始をもって、本規約に同意したものとみなします。
    </p>

    <H>1. 許諾</H>
    <p>
      当方は、購入者に対し、本ソフトウェアの非独占的・譲渡不可の使用権を許諾します。ライセンスは購入時に指定されたメールアドレスに紐づきます。同時利用端末数の制限を将来設ける場合があります。
    </p>

    <H>2. 禁止事項</H>
    <ul className="list-disc pl-5 space-y-1">
      <li>本ソフトウェアの転売、再配布、貸与、共有アカウントでの不特定多数への提供</li>
      <li>リバースエンジニアリング、逆コンパイル、改変（法令で認められる範囲を除く）</li>
      <li>本ソフトウェアを用いた違法コンテンツの作成・配布</li>
      <li>認証・配信機構の回避、または不正利用</li>
    </ul>

    <H>3. 対応環境</H>
    <p>
      製品版の主な対象は Windows（64bit）および、購入者向けブラウザ版です。無料 DEMO（ブラウザ／ダウンロード）は機能制限付きです。動作環境の詳細は販売ページの記載に従います。
    </p>

    <H>4. 知的財産</H>
    <p>
      本ソフトウェアおよび関連コンテンツに関する著作権その他の権利は当方または正当な権利者に帰属します。本規約は権利の譲渡を意味しません。
    </p>

    <H>5. 免責</H>
    <p>
      本ソフトウェアは現状有姿で提供されます。当方は、特定目的適合性、継続的な可用性、第三者サービスとの完全な互換性について保証しません。法令で認められる範囲で、間接損害・逸失利益について責任を負いません。
    </p>

    <H>6. 返金</H>
    <p>
      デジタルコンテンツの性質上、原則として購入後の返金には応じられません。詳細は「特定商取引法に基づく表記」を参照してください。
    </p>

    <H>7. 変更</H>
    <p>
      当方は必要に応じて本規約を改定できます。重要な変更がある場合はサイト上で告知します。改定後に本ソフトウェアを利用した場合、改定に同意したものとみなします。
    </p>

    <H>8. 準拠法</H>
    <p>本規約は日本法に準拠し、紛争が生じた場合は当方所在地を管轄する裁判所を第一審の専属的合意管轄とします。</p>
  </LegalPage>
);

export const Tokushoho = () => (
  <LegalPage title="特定商取引法に基づく表記">
    <dl className="space-y-4">
      <div>
        <dt className="font-bold text-slate-800">販売業者</dt>
        <dd>AIRONA-LAB（田島 汰一）</dd>
      </div>
      <div>
        <dt className="font-bold text-slate-800">運営統括責任者</dt>
        <dd>田島 汰一</dd>
      </div>
      <div>
        <dt className="font-bold text-slate-800">所在地</dt>
        <dd>
          請求があった場合には遅滞なく開示します。
        </dd>
      </div>
      <div>
        <dt className="font-bold text-slate-800">電話番号</dt>
        <dd>請求があった場合には遅滞なく開示します。</dd>
      </div>
      <div>
        <dt className="font-bold text-slate-800">メールアドレス</dt>
        <dd>airona.lab@gmail.com</dd>
      </div>
      <div>
        <dt className="font-bold text-slate-800">販売価格</dt>
        <dd>TABbeast 製品版 税込 ¥2,920（表示価格）</dd>
      </div>
      <div>
        <dt className="font-bold text-slate-800">商品以外の必要料金</dt>
        <dd>
          インターネット接続料金・端末・OS 等はお客様負担です。決済手数料は当方が負担する範囲で Stripe の条件に従います。
        </dd>
      </div>
      <div>
        <dt className="font-bold text-slate-800">支払方法</dt>
        <dd>クレジットカード等（Stripe Checkout 経由）</dd>
      </div>
      <div>
        <dt className="font-bold text-slate-800">支払時期</dt>
        <dd>注文確定時（Checkout 完了時）</dd>
      </div>
      <div>
        <dt className="font-bold text-slate-800">役務・商品の引渡時期</dt>
        <dd>
          決済完了後、マイページから Windows 版（zip）のダウンロードおよび購入者向けブラウザ版の利用が可能になります（通常は即時）。
        </dd>
      </div>
      <div>
        <dt className="font-bold text-slate-800">返品・キャンセル・返金</dt>
        <dd>
          デジタルコンテンツの性質上、購入後の返品・キャンセル・返金には原則として応じられません。決済エラー等により権利が付与されなかった場合は、個別に対応します。
        </dd>
      </div>
      <div>
        <dt className="font-bold text-slate-800">動作環境</dt>
        <dd>Windows 64bit、および対応ブラウザ上の購入者向け Web 版。無料 DEMO は機能制限付きです。</dd>
      </div>
      <div>
        <dt className="font-bold text-slate-800">表現・商品に関する注意</dt>
        <dd>
          画面・機能はバージョンにより変更される場合があります。最新情報は販売ページおよびマイページの表示をご確認ください。
        </dd>
      </div>
    </dl>
  </LegalPage>
);
