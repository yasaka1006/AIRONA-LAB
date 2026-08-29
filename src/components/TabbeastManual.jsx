import { Link } from 'react-router-dom';

const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="text-lg font-extrabold text-slate-800 mb-3 pb-2 border-b border-slate-200">
      {title}
    </h2>
    <div className="text-sm text-slate-600 leading-relaxed space-y-3">{children}</div>
  </section>
);

const Kbd = ({ children }) => (
  <kbd className="inline-block rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-slate-700">
    {children}
  </kbd>
);

const toc = [
  { id: 'overview', label: 'はじめに' },
  { id: 'ui', label: '画面構成' },
  { id: 'basic', label: '基本操作' },
  { id: 'edit', label: '編集' },
  { id: 'playback', label: '再生' },
  { id: 'backing', label: 'バッキング同時再生' },
  { id: 'mp4', label: 'MP4 エクスポート' },
  { id: 'io', label: 'インポート / エクスポート' },
  { id: 'shortcuts', label: 'ショートカット' },
];

const TabbeastManual = () => (
  <main className="my-8 mx-1">
    <article className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
      <p className="mb-4">
        <Link to="/tabbeast" className="text-sm text-slate-500 underline">
          ← TABbeast に戻る
        </Link>
      </p>
      <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
        TABbeast マニュアル
      </h1>
      <p className="text-sm text-slate-500 leading-relaxed mb-2">
        TABbeast の基本的な使い方をまとめたページです。
      </p>
      <p className="text-xs text-slate-400 mb-8">
        製品版の起動方法は
        <Link to="/tabbeast/guide" className="underline mx-0.5">
          ご利用の流れ
        </Link>
        を参照してください。
      </p>

      <nav
        aria-label="目次"
        className="mb-10 rounded-lg bg-slate-50 border border-slate-200 p-4"
      >
        <p className="text-sm font-extrabold text-slate-800 mb-2">目次</p>
        <ul className="text-sm text-slate-600 columns-1 sm:columns-2 gap-x-6 space-y-1">
          {toc.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className="underline hover:text-slate-800">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-10">
        <Section id="overview" title="はじめに">
          <p>
            TABbeast はギター TAB 譜を編集・再生・書き出しできるソフトです。
            Windows では EXE 版、Windows / Mac ではブラウザ版が利用できます。
          </p>
          <p>
            プロジェクトの保存形式は <strong>.tabb</strong> です。
            Guitar Pro（.gp 系）、TuxGuitar（.tg）、MusicXML なども読み込めます。
          </p>
        </Section>

        <Section id="ui" title="画面構成">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>タイトルバー</strong> — メニュー（ファイル / 編集 / 表示 / 設定）と
              「コマンドを検索…」
            </li>
            <li>
              <strong>トランスポートバー</strong> — 保存・Undo/Redo・ズーム・再生コントロール・
              MP3/WAV 読み込み・書き出し
            </li>
            <li>
              <strong>トラックビュー</strong> — トラックの追加・MUTE/SOLO・音量・音色
            </li>
            <li>
              <strong>編集バー</strong> — 小節 / 音符 / テクニカル / モード の各ツール
            </li>
            <li>
              <strong>譜面エリア</strong> — TAB 譜の表示・編集本体
            </li>
            <li>
              <strong>コードショートカット</strong> — 登録済みコード形状を選択範囲へ一括適用
            </li>
            <li>
              <strong>タイムライン</strong> — MP3/WAV バッキングトラックの読み込みと同期
            </li>
          </ul>
        </Section>

        <Section id="basic" title="基本操作">
          <p className="font-bold text-slate-700">フレット入力</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <Kbd>0</Kbd>〜<Kbd>9</Kbd> でフレット番号を入力（複数桁可）
            </li>
            <li>入力後、矢印キーで移動しながら連続入力（ドラッグペイント）が可能</li>
            <li>
              <Kbd>Backspace</Kbd> — 数字バッファが空なら削除、そうでなければ数字を編集
            </li>
          </ul>

          <p className="font-bold text-slate-700 pt-2">譜面のドラッグ選択</p>
          <p>
            譜面をドラッグすると範囲選択できます。始点と終点によって、
            <strong>単体（1 弦）</strong>・<strong>ビート（全弦の 1 列）</strong>・
            <strong>小節</strong>のいずれかが選ばれます。
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>通常のドラッグ</strong> — TAB 数字のある領域内をドラッグすると、
              始点〜終点の矩形範囲（弦ごと）を選択
            </li>
            <li>
              <strong>音符バーまでドラッグ</strong> — ドラッグ先が TAB 下の
              <strong>音符バー</strong>（音価表示エリア）に入ると、
              そのビート列の<strong>全弦</strong>が選択されます（↑↓ のヒントが表示）。
              横方向へドラッグを続けると、ビート単位で範囲を広げられます
            </li>
            <li>
              <strong>ダブルクリック</strong> — 同じ小節内を素早く 2 回クリックすると、
              その<strong>小節全体</strong>を選択
            </li>
            <li>
              <strong>ダブルクリックからのドラッグ</strong> — 同じ小節を 2 回目クリックしたまま
              ドラッグすると、<strong>ビートごと（列）選択</strong>モードで範囲を広げられます
            </li>
            <li>
              <Kbd>Shift</Kbd> + クリック / ドラッグ — いまの選択始点を保ったまま範囲を拡張
            </li>
            <li>
              ドラッグ中、譜面の端まで行くと<strong>自動スクロール</strong>します
            </li>
          </ul>
          <p className="text-xs text-slate-500">
            編集バー「モード」の <strong>ビート選択</strong> / <strong>小節選択</strong> を ON にすると、
            ドラッグの挙動がそのモードに固定されます（下記参照）。
          </p>

          <p className="font-bold text-slate-700 pt-2">選択モード（編集バー「モード」）</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>単体選択</strong> — 1 弦・1 ビート単位（上記の通常ドラッグ）</li>
            <li><strong>ビート選択</strong> — ドラッグで常に列（全弦）を選択</li>
            <li><strong>小節選択</strong> — ドラッグで小節範囲を選択</li>
            <li>
              <Kbd>Shift</Kbd> + クリック/ドラッグで範囲を拡張
            </li>
          </ul>

          <p className="font-bold text-slate-700 pt-2">ファイル</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <Kbd>Ctrl</Kbd>+<Kbd>N</Kbd> 新規作成 /
              <Kbd>Ctrl</Kbd>+<Kbd>O</Kbd> 開く /
              <Kbd>Ctrl</Kbd>+<Kbd>S</Kbd> 上書き保存
            </li>
            <li>複数プロジェクトはタブで切り替え（未保存は <code>*</code> 表示）</li>
          </ul>
        </Section>

        <Section id="edit" title="編集">
          <p className="font-bold text-slate-700">小節</p>
          <p>
            編集バー「小節」から、拍子変更・テンポ変更・チューニング/カポ・小節の追加/削除、
            リピート記号（<code>\|:</code> / <code>:|</code>）、1番/2番カッコなどを操作できます。
          </p>

          <p className="font-bold text-slate-700 pt-2">音符・リズム</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>音符統合</strong> / <strong>音符分割</strong> — 音価の長さを変更</li>
            <li><strong>休符挿入</strong>、<strong>タイ</strong>、<strong>付点</strong>、<strong>3連符</strong></li>
            <li>
              <strong>休符自動調整</strong> — 音価変更時に休符を自動整列
            </li>
          </ul>

          <p className="font-bold text-slate-700 pt-2">テクニカル</p>
          <p>
            編集バー「テクニカル」から、ブラッシング、ハンマリング/プリング、スライド、
            チョーキング、ビブラート、ハーモニクス、タッピングなどを付与できます。
            1 文字キー（<Kbd>X</Kbd> <Kbd>H</Kbd> <Kbd>S</Kbd> など）でも操作可能です。
          </p>

          <p className="font-bold text-slate-700 pt-2">効率化機能</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>コードショートカット</strong> — ルート音を基準にコード形状を一括展開
              （単音選択時のみ）
            </li>
            <li>
              <strong>リズムを貼り付け</strong>（<Kbd>Ctrl</Kbd>+<Kbd>Alt</Kbd>+<Kbd>V</Kbd>）
              — 音価・装飾だけをコピーし、フレット数字は維持
            </li>
            <li>
              <strong>選択ビートを右へコピー</strong>（<Kbd>Ctrl</Kbd>+<Kbd>D</Kbd>）
            </li>
            <li>右クリックメニューからコピー / 貼り付け / 小節操作</li>
          </ul>
        </Section>

        <Section id="playback" title="再生">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <Kbd>Space</Kbd> で再生 / 停止。トランスポートバーから小節移動・一時停止も可能
            </li>
            <li>
              <strong>トレーニング・スピード</strong> — 0.05〜2.00 倍速で練習
            </li>
            <li><strong>メトロノーム</strong> / <strong>カウントイン</strong></li>
            <li>トラックごとに MUTE / SOLO / 音量を調整</li>
            <li>
              MP3 / WAV バッキングとの同時再生は
              <a href="#backing" className="underline mx-0.5">
                バッキング同時再生
              </a>
              を参照
            </li>
            <li>
              表示メニューから <strong>再生位置バー</strong>、<strong>小節ハイライト</strong> を ON/OFF
            </li>
          </ul>
        </Section>

        <Section id="backing" title="バッキング同時再生">
          <p>
            画面下部の <strong>タイムライン</strong> パネルで、MP3 / WAV バッキングトラックを
            譜面と一緒に再生・同期できます。練習やタイミング合わせ、MP4 書き出しに便利です。
          </p>

          <p className="font-bold text-slate-700 pt-1">音声の読み込み</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              トランスポートバーの <strong>MP3 / WAV を読み込む</strong>
            </li>
            <li>ファイル → インポート → <strong>MP3(バッキング同時再生)</strong></li>
            <li>
              タイムラインパネルに MP3 / WAV を<strong>ドラッグ＆ドロップ</strong>
              （空のときは「MP3 または WAV を読み込むか、ここにドロップ…」と表示）
            </li>
          </ul>
          <p className="text-xs text-slate-500">
            読み込んだ音声はプロジェクト（.tabb）に保存され、次回開いたときも利用できます。
          </p>

          <p className="font-bold text-slate-700 pt-2">パネルの見方</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              上段 <strong>譜面</strong> — 譜面の長さ（灰色）。小節の区切りが縦線で表示されます
            </li>
            <li>
              下段 <strong>音声</strong> — オレンジ色の波形クリップ。ファイル名が左端に表示されます
            </li>
            <li>
              上部ルーラー — 時刻表示。<strong>再生位置（小節頭）</strong> のシーク用
            </li>
            <li>
              縦の赤線 — 現在の再生位置
            </li>
          </ul>

          <p className="font-bold text-slate-700 pt-2">同期の合わせ方</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              オレンジ色の音声クリップを<strong>左右にドラッグ</strong>して、
              譜面の 1 小節目と音源の開始位置が揃うように調整します
            </li>
            <li>
              ヘッダーの <strong>開始</strong> に現在のオフセット（例: <code>0:02.50</code>）が表示されます
            </li>
            <li>
              <Kbd>Space</Kbd> で再生し、TAB と音源のタイミングを確認します
            </li>
          </ol>
          <p className="text-xs text-slate-500">
            オフセットは小節頭へスナップするため、細かい位置合わせがしやすくなっています。
          </p>

          <p className="font-bold text-slate-700 pt-2">再生位置の移動</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              タイムライン上部のルーラー、または <strong>譜面</strong> レーンを
              クリック / ドラッグ — 最寄りの<strong>小節頭</strong>へジャンプ
            </li>
            <li>譜面エリアをクリックして再生中にシークすることも可能</li>
          </ul>

          <p className="font-bold text-slate-700 pt-2">その他の操作</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>置き換え</strong> — 別の MP3 / WAV に差し替え
            </li>
            <li>
              <strong>解除</strong> — バッキングトラックを削除
            </li>
            <li>
              <strong>タイムラインの拡大</strong> — ヘッダーのスライダー、または
              <Kbd>Ctrl</Kbd> + マウスホイール
            </li>
            <li>
              パネル上端のグリップをドラッグ — タイムラインの<strong>高さ</strong>を変更
            </li>
          </ul>

          <p className="font-bold text-slate-700 pt-2">MP4 書き出しとの関係</p>
          <p>
            MP4 を書き出すとき、音声を <strong>あり</strong> にすると譜面の演奏音とバッキングトラックが
            ミックスされます（開始オフセットも反映）。手順の詳細は
            <a href="#mp4" className="underline mx-0.5">
              MP4 エクスポート
            </a>
            を参照してください。
          </p>
        </Section>

        <Section id="mp4" title="MP4 エクスポート">
          <p>
            譜面を動画（MP4）として書き出し、演奏動画に重ねて使えます。
            再生バー付きの TAB 映像を生成します。
          </p>

          <p className="font-bold text-slate-700 pt-1">手順</p>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              書き出したい譜面を開きます。バッキング音声を含める場合は、あらかじめ
              <a href="#backing" className="underline mx-0.5">
                バッキング同時再生
              </a>
              で同期を合わせておきます。
            </li>
            <li>
              次のいずれかから MP4 書き出しを開始します。
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>トランスポートバーの <strong>MP4 に書き出し</strong></li>
                <li>ファイル → エクスポート → <strong>MP4</strong></li>
                <li>タイトルバーの「コマンドを検索…」で <strong>MP4</strong> を検索</li>
              </ul>
            </li>
            <li>
              <strong>MP4 に書き出し</strong> ダイアログでオプションを設定します。
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>
                  <strong>幅 / 高さ（px）</strong> — 動画サイズ（初期値: 1920 × 250）。
                  高さは譜面の拡大率にも連動します
                </li>
                <li>
                  <strong>フレームレート（fps）</strong> — 15〜60（初期値: 30）
                </li>
                <li>
                  <strong>音声</strong> — <strong>あり</strong> で TAB 演奏音を収録。
                  バッキングトラック読み込み済みならミックスされます。
                  映像だけ欲しい場合は <strong>なし</strong>
                </li>
                <li>
                  <strong>出力する小節</strong> —「すべての小節」「小節範囲選択」
                  「現在選択している小節」から選択
                </li>
                <li>
                  <strong>スクロール</strong> —「横スクロール」（小節が変わるたび左端へスナップ）か
                  「横スクロール　再生バーを常に追従」
                </li>
              </ul>
            </li>
            <li>
              <strong>書き出しへ</strong> をクリックします。
            </li>
            <li>
              保存ダイアログでファイル名と保存先を指定します。
            </li>
            <li>
              書き出しが完了するまで待ちます（譜面の長さや fps によって時間がかかります）。
            </li>
          </ol>
          <p className="text-xs text-slate-500">
            前回使った設定は次回も引き継がれます。
          </p>

          <p className="font-bold text-slate-700 pt-2">使い分けのヒント</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              演奏動画に TAB 映像だけ重ねる — 音声 <strong>なし</strong>、幅 1920 前後
            </li>
            <li>
              TAB 音 + バッキング込みの完成動画 — 音声 <strong>あり</strong> +
              バッキング同時再生を設定済み
            </li>
            <li>
              一部だけ書き出す — 小節選択モードで範囲を指定してから MP4 書き出し
            </li>
          </ul>

          <p className="text-xs text-slate-500">
            おためし版（DEMO）でも MP4 書き出しは利用できます（映像にデモ版の透かしが入ります）。
          </p>
        </Section>

        <Section id="io" title="インポート / エクスポート">
          <p className="font-bold text-slate-700">インポート</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>MusicXML</strong>（.musicxml / .xml / .mxl）</li>
            <li><strong>TuxGuitar</strong>（.tg）</li>
            <li><strong>Guitar Pro</strong>（.gp / .gpx / .gp5 / .gp4 / .gp3）</li>
            <li><strong>MP3 / WAV</strong> — バッキングトラックとして追加</li>
          </ul>

          <p className="font-bold text-slate-700 pt-2">エクスポート</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>PDF</strong> — 印刷用譜面</li>
            <li>
              <strong>MP4</strong> — 演奏動画用（
              <a href="#mp4" className="underline">
                手順はこちら
              </a>
              ）
            </li>
            <li><strong>MusicXML</strong> / <strong>TuxGuitar</strong> / <strong>Guitar Pro</strong> / <strong>MIDI</strong></li>
          </ul>
          <p className="text-xs text-slate-500">
            トランスポートバーから PDF / MusicXML / MP4 を直接書き出せます。
            「前回の条件で同じフォルダに書き出し」で一括エクスポートも可能です。
          </p>
          <p className="text-xs text-slate-500">
            おためし版（DEMO）では .tabb 保存と PDF / MP4 以外の書き出しはできません。
          </p>
        </Section>

        <Section id="shortcuts" title="ショートカット">
          <p>
            設定 → <strong>ショートカットキー</strong> からカスタマイズできます。
            以下は主なデフォルト割り当てです。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="py-2 pr-4 font-extrabold text-slate-700">操作</th>
                  <th className="py-2 font-extrabold text-slate-700">キー</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {[
                  ['再生 / 停止', 'Space'],
                  ['元に戻す / やり直し', 'Ctrl+Z / Ctrl+Y'],
                  ['コピー / 切り取り / 貼り付け', 'Ctrl+C / Ctrl+X / Ctrl+V'],
                  ['リズムを貼り付け', 'Ctrl+Alt+V'],
                  ['全選択', 'Ctrl+A'],
                  ['小節を追加 / 削除', 'Ctrl+T / Ctrl+Delete'],
                  ['音符分割 / 統合', '+ / -'],
                  ['休符挿入 / タイ', 'R / L'],
                  ['フレット ±1', 'Alt+← / Alt+→'],
                  ['前 / 次の小節', 'Ctrl+← / Ctrl+→'],
                ].map(([action, key]) => (
                  <tr key={action} className="border-b border-slate-100">
                    <td className="py-2 pr-4">{action}</td>
                    <td className="py-2 font-mono text-xs">{key}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            テクニカルは <Kbd>X</Kbd> <Kbd>H</Kbd> <Kbd>S</Kbd> <Kbd>B</Kbd> など 1 文字キーが多いです。
            タイトルバーの「コマンドを検索…」から機能名で検索して実行することもできます。
          </p>
        </Section>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link to="/tabbeast" className="text-slate-700 underline">
          製品ページへ
        </Link>
        <Link to="/tabbeast/guide" className="text-slate-700 underline">
          ご利用の流れ
        </Link>
        <Link to="/tabbeast/contact" className="text-slate-700 underline">
          お問い合わせ
        </Link>
      </div>
    </article>
  </main>
);

export default TabbeastManual;
