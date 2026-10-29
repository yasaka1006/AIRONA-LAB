import { useRef, useState } from 'react';

function GearSlider({ items, variant = "product" }) {
  const [selected, setSelected] = useState(0);
  const scrollerRef = useRef(null);
  const item = items[selected] ?? items[0];
  const photo = variant === "photo";

  const slide = (direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const cards = [...scroller.querySelectorAll(":scope > button")];
    if (cards.length === 0) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const arrow = scroller.parentElement?.querySelector("button");
    const arrowWidth = arrow?.offsetWidth ?? 0;
    const padLeft = parseFloat(getComputedStyle(scroller).paddingLeft) || 0;
    const visibleLeft = scrollerRect.left + arrowWidth;
    const visibleRight = scrollerRect.right - arrowWidth;
    const contentLeft = (card) => card.getBoundingClientRect().left - scrollerRect.left + scroller.scrollLeft;
    const alignTo = (card) => {
      scroller.scrollTo({ left: Math.max(0, contentLeft(card) - padLeft), behavior: "smooth" });
    };

    if (direction > 0) {
      const target = cards.find((card) => card.getBoundingClientRect().right > visibleRight + 1);
      if (target) alignTo(target);
      return;
    }

    const currentStart = cards.find((card) => card.getBoundingClientRect().left >= visibleLeft - 1) ?? cards[0];
    const pageSpan = scrollerRect.width - padLeft - arrowWidth;
    const desired = contentLeft(currentStart) - pageSpan;
    let target = cards[0];
    for (const card of cards) {
      if (card === currentStart) break;
      if (contentLeft(card) <= desired + 1) target = card;
    }
    alignTo(target);
  };

  return (
    <div>
      <div className="relative">
        <button
          type="button"
          onClick={() => slide(-1)}
          aria-label="前の商品"
          className="absolute top-1/2 left-0 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow ring-1 ring-slate-200 hover:text-cyan-700"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14.75 7 L9.25 12 L14.75 17" />
          </svg>
        </button>
        <div
          ref={scrollerRef}
          className="flex gap-3 overflow-x-auto scroll-smooth px-11 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((gear, index) => (
            <button
              key={`${gear.name}-${index}`}
              type="button"
              aria-pressed={index === selected}
              onClick={() => setSelected(index)}
              className={`w-28 shrink-0 overflow-hidden rounded-xl bg-white ring-2 transition md:w-36 ${index === selected ? "ring-cyan-500" : "ring-slate-200 hover:ring-slate-300"}`}
            >
              <img
                src={gear.image}
                alt=""
                className={`w-full ${photo ? "aspect-[16/10] object-cover" : "aspect-square object-contain p-2"}`}
              />
            </button>
          ))}
          <div aria-hidden="true" className="w-[calc(100%-7rem-0.75rem)] shrink-0 md:w-[calc(100%-9rem-0.75rem)]" />
        </div>
        <button
          type="button"
          onClick={() => slide(1)}
          aria-label="次の商品"
          className="absolute top-1/2 right-0 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow ring-1 ring-slate-200 hover:text-cyan-700"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9.25 7 L14.75 12 L9.25 17" />
          </svg>
        </button>
      </div>

      <div className="mt-5 border-l-2 border-slate-200 px-4">
        {item.category && <p className="text-xs font-semibold tracking-wide text-cyan-700">{item.category}</p>}
        <h3 className="mt-1 text-xl font-bold text-slate-800 sm:text-2xl">{item.name}</h3>
        <p
          className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base"
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-400 hover:text-cyan-700"
          >
            <img src="/equipments/external-link.svg" alt="" className="h-4 w-4" />
            商品ページ{item.page || ""}
          </a>
          {item.link2 && (
            <a
              href={item.link2}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-400 hover:text-cyan-700"
            >
              <img src="/equipments/external-link.svg" alt="" className="h-4 w-4" />
              代替品
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ en, ja, tone }) {
  return (
    <>
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone}`} />
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
          {en}
          <br />
          <span className="text-xl font-medium text-slate-500">{ja}</span>
        </h2>
        <div className="mx-auto mt-4 h-px w-16 bg-slate-300" />
      </div>
    </>
  );
}

const sectionClass = "relative scroll-mt-20 overflow-hidden rounded-xl bg-white px-4 py-8 shadow-lg md:px-8";

const Equipments = () => {

  const guitars = [
    {
      name: 'Fender American Performer Stratocaster HSS',
      image: '/equipments/guitarStrat.webp',
      description: 'Color: Satin Surf Green<br />2022年に購入<br />一番出演回数が多いメインギターです<br />とにかく見た目が好きで買いました<br />HSSピックアップと、艶無し塗装が気に入っています<br />今はあまり流通してないみたい<br />使用ジャンル: 全部',
      link: 'https://amzn.to/4puvWLP',
      link2: 'https://amzn.to/4sAbqfp'
    },
    {
      name: 'Fujigen NTL10MAH',
      image: '/equipments/guitarTele.webp',
      description: 'Neo Classic SERIES<br />Color: Off White Blonde<br />2017年に購入<br />自分の貯金で初めて買ったテレキャスです<br />現在は型番が変わっています<br />使用ジャンル: J-POP, ボカロなど',
      link: 'https://fujigen.shop/products/list.php?category_id=42',
      link2: 'https://amzn.to/49NpRFw'
    },
    {
      name: 'Gibson Lespaul Standard',
      image: '/equipments/guitarGibson.webp',
      description: 'Color: Unburst(淡色)<br />2023年に購入<br />ギタリストの王道<br />この絶妙な色味がいいんですよね<br />使用ジャンル: ロック, パンクなど',
      link: 'https://store.ishibashi.co.jp/search?q=Gibson+Les+Paul+Standard+Unburst',
    },
    {
      name: 'Ibanez RG450DXB',
      image: '/equipments/guitarIbanez.webp',
      description: 'Color: White<br />2013年に購入<br />初心者の頃から使ってます<br />このギターのパワーコードの音がめちゃくちゃ好き<br />使用ジャンル: ロック, ゲーム曲など',
      link: 'https://store.ishibashi.co.jp/search?q=RG450DXB-WH+',
    },
    {
      name: 'Epiphone Lespaul Standard',
      image: '/equipments/guitarEpi.webp',
      description: 'Color: Trans Blue<br />2014年に購入<br />某弾いてみた投稿者に憧れてBUMP専用機として使用しています<br />ピックアップはSEYMOUR DUNCAN製に載せ替えています<br />使用ジャンル: BUMP',
      link: 'https://www.google.com/search?q=Epiphone+Lespaul+Standard+Trans+Blue&sca_esv=75d7ba9b8a0ac0c1&udm=28&biw=1920&bih=911&sxsrf=AE3TifNLiTC1qnHwG61rGLD1zx2TER0ZQA%3A1767574573309&ei=LQxbaYzUEtSi1e8P_rqp4Ac&ved=0ahUKEwjMnrm0mPORAxVUUfUHHX5dCnwQ4dUDCBE&oq=Epiphone+Lespaul+Standard+Trans+Blue&gs_lp=Ehlnd3Mtd2l6LW1vZGVsZXNzLXNob3BwaW5nIiRFcGlwaG9uZSBMZXNwYXVsIFN0YW5kYXJkIFRyYW5zIEJsdWUyBxAjGLQEGCdI9whQywFYywFwAXgBkAEAmAFYoAFYqgEBMbgBDMgBAPgBAZgCAqACXcICChAAGLADGNYEGEeYAwCIBgGQBgSSBwEyoAecArIHATG4B1vCBwMwLjLIBwOACAA&sclient=gws-wiz-modeless-shopping',
    },
    {
      name: 'Gibson Lespaul Special',
      image: '/equipments/guitarGibSpe.webp',
      description: 'Color: TV Yellow<br />2026年に購入<br />昔から欲しくてやっと購入できました BUMPのイメージが強いですね<br />使用ジャンル: 洋楽など',
      link: 'https://www.digimart.net/search?keywordAnd=GIBSON+LES+PAUL+SPECIAL',
    },
    {
      name: 'YAMAHA STORIA I',
      image: '/equipments/guitarAco.webp',
      description: '2026年に購入<br />前のアコギのブリッジが折れたので買いました<br />使用ジャンル: J-POPなど',
      link: 'https://amzn.to/47S93vk',
    },
    {
      name: 'Bacchus WL4-AGED/RSM',
      image: '/equipments/bass.webp',
      description: 'Color: 3TS-AGED<br />2024年に購入<br />ベースよくわからないのでとりあえずBacchus製をチョイス<br />動画でたまに出演します<br />使用ジャンル: J-POPなど',
      link: 'https://www.deviser.co.jp/products/wl4-aged-rsm',
    },
  ]

  const effectors = [
    {
      category: 'アンプシミュレーター',
      name: 'Positive Grid BIAS FX 2',
      image: '/equipments/biasfx2.webp',
      description: 'ギタートーンはほぼ、このソフトで作っています<br />後継機(BIAS X)が出たみたいで、もう買えないみたいです。。。<br />いずれ後継機に移行したい',
      link: 'https://jp.positivegrid.com/pages/shop',
      page: '(公式サイト)'
    },
    {
      category: 'ミニアンプ',
      name: 'Positive Grid Spark GO',
      image: '/equipments/sparkgo.webp',
      description: 'サブアンプ<br />手軽に使えて便利です',
      link: 'https://amzn.to/4bitSTw',
      page: '(Amazon)'
    },
    {
      category: 'チューナーペダル',
      name: 'tc electronic POLYTUNE 3 NOIR',
      image: '/equipments/tuner.webp',
      description: '必須級<br />もうクリップチューナーには戻れません<br />精度がめちゃいいです',
      link: 'https://amzn.to/4q8jjqR',
      page: '(Amazon)'
    },
    {
      category: 'ワウペダル',
      name: 'Xotic Wah XW-1',
      image: '/equipments/xw1.webp',
      description: '使ってる有名人が多いので買いました',
      link: 'https://amzn.to/3Z12TV2',
      page: '(Amazon)'
    },
    {
      category: 'MIDIペダル',
      name: 'M-WAVE MIDIフットコントローラー',
      image: '/equipments/midi.webp',
      description: 'DAWの操作等に使っています<br />初期設定にクセあり',
      link: 'https://amzn.to/49o04m4',
      page: '(Amazon)'
    },
    {
      category: 'コンプレッサー',
      name: 'MXR M291 Dyna Comp Mini ',
      image: '/equipments/dynacomp.webp',
      description: 'BIAS FX2でよく使ってたので買いました<br />やはり実機は全然違うです',
      link: 'https://amzn.to/496BVRX',
      page: '(Amazon)'
    },
    {
      category: 'オーバードライブ',
      name: 'BOSS BD-2 Blues Driver',
      image: '/equipments/BD2.webp',
      description: '王道中の王道です',
      link: 'https://amzn.to/49FUmgw',
      page: '(Amazon)'
    },
    {
      category: 'ディストーション',
      name: 'Limetone Audio JACKAL',
      image: '/equipments/jackal.webp',
      description: '島村楽器限定カラーのオレンジ版を入手しました<br />白いバージョンもほしい',
      link: 'https://amzn.to/3LuLGQQ',
      page: '(Amazon)'
    },
    {
      category: 'パワーサプライ',
      name: 'VITAL AUDIO POWER CARRIER VA-08 Mk-II',
      image: '/equipments/supply.webp',
      description: '定番です',
      link: 'https://amzn.to/4solbxd',
      page: '(Amazon)'
    },
  ];

  const guitarGears = [
    {
      category: 'ピック',
      name: 'Jim Dunrop JazzⅢ ULTEX',
      image: '/equipments/pick.webp',
      description: 'このタイプならこいつで間違いないです！',
      link: 'https://amzn.to/4z8pRtn',
      page: '(Amazon)'
    },
    {
      category: '弦',
      name: 'Elixor エリクサー OPTIWEB Light .010-.046',
      image: '/equipments/string.webp',
      description: 'ズボラなのでこれで1年は持たせます(本当は3ヶ月に1回変えたい)',
      link: 'https://amzn.to/3WC1h6h',
      page: '(Amazon)'
    },
    {
      category: 'シールドケーブル',
      name: 'SOMMER CABLE The Spirit XXL Instrument',
      image: '/equipments/cable.webp',
      description: 'ドイツメーカーで径と音が太いです',
      link: 'https://www.soundhouse.co.jp/products/detail/item/291553/',
      page: '(サウンドハウス)'
    },
    {
      category: 'ストラップ',
      name: 'Ibanez(アイバニーズ) DCS50-BK',
      image: '/equipments/strap.webp',
      description: '素材いいし長さ調整しやすいのでオススメ',
      link: 'https://amzn.to/49IghCt',
      page: '(Amazon)'
    },
    {
      category: 'カポタスト',
      name: 'SHUBB エレキ/アコギ兼用 C-3 Nickel',
      image: '/equipments/capo.webp',
      description: 'シンプルでかっこいいし使いやすい！',
      link: 'https://amzn.to/49CI9ZT',
      page: '(Amazon)'
    },
    {
      category: '弦潤滑剤',
      name: 'MUSIC NOMAD STRING FUEL MN109',
      image: '/equipments/stringfuel.webp',
      description: '押し付けて使うタイプの潤滑剤<br />塗りやすいのでおすすめ',
      link: 'https://amzn.to/4qFALml',
      page: '(Amazon)'
    },
    {
      category: 'ギタースタンド',
      name: 'Leo Jaymz ギタースタンド 自動ロック式',
      image: '/equipments/stand.webp',
      description: '吊るして使うタイプのスタンド<br />自動ロック式なので安心',
      link: 'https://amzn.to/45x0AwD',
      page: '(Amazon)'
    },
  ];

  const deskGears = [
    {
      category: 'マウス',
      name: 'Razer Cobra Pro',
      image: '/equipments/mouse.webp',
      description: '左に2ボタン、ホイール手前に2ボタンあります<br />このボタン数の無線マウスあんまない',
      link: 'https://amzn.to/4q9C6SC',
      page: '(Amazon)'
    },
    {
      category: 'キーボード',
      name: 'ARCHISS Maestro2S JIS配列 静音赤軸 AS-KBM02/SRGBA',
      image: '/equipments/keyboard.webp',
      description: 'サイズ感が本当にちょうどいい。<br />テンキー付きで、フルサイズに比べてマウスを内側に持てるので姿勢が楽になります。',
      link: 'https://amzn.to/3NsYcRn',
      page: '(Amazon)'
    },
    {
      category: 'デスクチェア',
      name: 'FLEXISPOT HC4',
      image: '/equipments/chair.webp',
      description: '座面広くて気に入っています。ギター弾きやすいです',
      link: 'https://amzn.to/4zcoH0B',
      page: '(Amazon)'
    },
    {
      category: 'メインモニター',
      name: 'Acer VG272Xbmiipx 27型 IPS 240hz',
      image: '/equipments/monitor.webp',
      description: '144hzと240hzで迷いましたが、ブラウザとかでスクロールしたときヌルヌル感が違いすぎてこっちにしました',
      link: 'https://amzn.to/3LjJXxC',
      page: '(Amazon)'
    },
    {
      category: 'モニターライト',
      name: 'Quntis デスクライト ClassicPro',
      image: '/equipments/lightbar.webp',
      description: '今のデスク3年目にしてようやく買いましたが、バータイプに限らずライトは必須ですね。。。',
      link: 'https://amzn.to/44VHRuE',
      page: '(Amazon)'
    },
    {
      category: 'ヘッドフォン',
      name: 'beyerdynamic DT 700 PRO X',
      image: '/equipments/headphone.webp',
      description: '秋葉原のeイヤホンで試聴して買いました',
      link: 'https://amzn.to/49DKJil',
      page: '(Amazon)'
    },
    {
      category: 'モニタースピーカー',
      name: 'Edifier R1280DB',
      image: '/equipments/speaker.webp',
      description: 'カーテンレールにぶら下げてます。<br />ぶら下げて使うのはよくないのでやめましょう',
      link: 'https://amzn.to/3LvbcFB',
      page: '(Amazon)'
    },
    {
      category: 'マイク',
      name: 'Sennheiser e935',
      image: '/equipments/mic.webp',
      description: 'あんまないけど歌撮るとき用',
      link: 'https://amzn.to/3YqrEtL',
      page: '(Amazon)'
    },
    {
      category: 'オーディオインターフェイス',
      name: 'MOTU M4 4in 4out',
      image: '/equipments/audiointerface.webp',
      description: 'デザインが好き 3-4に外部音取り込んでます',
      link: 'https://amzn.to/4e1gBzw',
      page: '(Amazon)'
    },
    {
      category: 'オーディオミキサー',
      name: 'Behringer XENYX 502',
      image: '/equipments/mixer.webp',
      description: 'PC,Switch,Alexaの音をこれでミックスしてオーディオインターフェイスに送っています',
      link: 'https://amzn.to/4suNslS',
      page: '(Amazon)'
    },
    {
      category: 'スマートスピーカー',
      name: 'Echo Dot 第3世代 チャコール',
      image: '/equipments/alexa.webp',
      description: 'SwitchBotと連携用に使ってます。<br />最近こいつの耳が悪くなってる',
      link: 'https://amzn.to/49kO9W5',
      page: '(Amazon)'
    },
    {
      category: 'スマートリモコン',
      name: 'SwitchBot Hub Mini',
      image: '/equipments/switchbot.webp',
      description: '必須レベル 生活からリモコンがなくせます<br />外出先からエアコンを制御したり、PC起動ができるようになります',
      link: 'https://amzn.to/4eY4CCY',
      page: '(Amazon)'
    },
  ];

  const softs = [
    {
      category: 'TAB譜製作ソフト',
      name: 'TABbeast',
      image: '/equipments/tabbeast.webp',
      description: '私がつくったTAB制作ソフトです。操作感はTuxベースで、やりたかった操作全部つめました。',
      link: 'https://airona-lab.com/tabbeast',
    },
    {
      category: 'DAW',
      name: 'Cakewalk Sonar',
      image: '/equipments/cakewalk.webp',
      description: '無料です<br />以前のBandlab版を使ってました<br />セッティングがこれに慣れちゃって他に移行できない',
      link: 'https://www.cakewalk.com/sonar',
      page: '(公式サイト)'
    },
    {
      category: '動画編集ソフト',
      name: 'Wondershare Filmora',
      image: '/equipments/filmora.webp',
      description: '買い切り版を使ってます<br />そのへんのフリーソフトよりは使いやすい<br />サブスク入らないとAI機能がほぼ使えないので注意',
      link: 'https://filmora.wondershare.co.jp/ad/brand.html?fm_channel=cpc_google&gad_source=1&gad_campaignid=10254472540&gbraid=0AAAAADd-4IpIDgpdqZCceZ6tNTnq4Uutp&gclid=Cj0KCQiAvOjKBhC9ARIsAFvz5lhM-howNwwbuz0FdUtOmkLVrEMNaEZs8hURusS0y1EvDy5ByvSyv0YaAod0EALw_wcB',
      page: '(公式サイト)'
    },
    {
      category: 'アンプシミュレーター',
      name: 'Positive Grid BIAS FX 2',
      image: '/equipments/biasfx2.webp',
      description: 'ギタートーンはほぼ、このソフトで作っています<br />後継機(BIAS X)が出たみたいで、もう買えないみたいです。。。<br />いずれ後継機に移行したい',
      link: 'https://jp.positivegrid.com/pages/shop',
      page: '(公式サイト)'
    },
  ];

  const cameraGears = [
    {
      category: 'メインカメラ',
      name: 'SONY ミラーレス一眼カメラ ZV-E10',
      image: '/equipments/maincamera.webp',
      description: 'Sonyのエントリーモデルです<br />いずれはフルサイズに変えたい',
      link: 'https://amzn.to/4suJWIc',
      page: '(Amazon)'
    },
    {
      category: 'レンズ',
      name: 'SIGMA 18-50mm F2.8 DC DN Sony Eマウント APS-C',
      image: '/equipments/lens.webp',
      description: '特にこだわりはないけどこれ使ってます',
      link: 'https://amzn.to/49nqbcy',
      page: '(Amazon)'
    },
    {
      category: '三脚',
      name: 'K&F Concept 三脚 一眼レフ 4段 160cm 360度回転',
      image: '/equipments/tripod.webp',
      description: '三脚は安いの使うとすぐ壊れるので<br />こういうのがいいです',
      link: 'https://amzn.to/44S0GPl',
      page: '(Amazon)'
    },
    {
      category: 'アクションカメラ',
      name: 'Insta360 Ace Pro',
      image: '/equipments/actioncamera.webp',
      description: 'これでShortの主観動画を撮ってます<br />帽子マウントが必要です',
      link: ' https://amzn.to/49kO9W5',
      page: '(Amazon)'
    },
  ];

  return (
    <main id="top" className="mt-4 space-y-7 mx-2 scroll-mt-20">

      {/* タイトル・目次セクション */}
      <section className="bg-white py-6 px-3 md:px-8 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-8">
          使用機材リスト
        </h1>

        <div className="text-xl bg-slate-100 rounded-lg p-6 px-10 md:px-15 w-fit mx-auto text-cyan-700 lg:font-bold space-y-4 flex flex-col">
          <h2 className="text-xl md:text-2xl font-bold text-center text-slate-800 mb-5">
            目次
          </h2>
          <a href="#guitars">
            <h3><span className="underline">ギター本体</span></h3>
          </a>
          <a href="#guitarGears">
            <h3><span className="underline">ギター周辺機器</span></h3>
          </a>
          <a href="#effectors">
            <h3><span className="underline">アンプ・エフェクター</span></h3>
          </a>
          <a href="#deskAudioGears">
            <h3><span className="underline">デスク周辺機器</span></h3>
          </a>
          <a href="#pcSpecs">
            <h3><span className="underline">PCスペック</span></h3>
          </a>
          <a href="#softs">
            <h3><span className="underline">ソフトウェア</span></h3>
          </a>
          <a href="#cameraGears">
            <h3><span className="underline">カメラ周辺機器</span></h3>
          </a>
        </div>

        <p className="text-center text-slate-500 text-xs md:text-sm mt-8 text-right">※本ページはAmazonアソシエイトを含む広告が含まれます</p>


      </section>

      {/* Youtubeチャンネルセクション */}
      <section className="bg-white py-6 px-5 md:px-30 rounded-xl shadow-lg ">
        <a
          href="https://www.youtube.com/@AironA"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center group hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-center">
            <div className="relative mb-3 mr-5 w-[25%]">
              <div className="w-16 h-16 md:w-32 md:h-32 w-full h-full rounded-full overflow-hidden shadow-lg ring-2 ring-slate-200 group-hover:ring-blue-500 transition-all duration-300">
                <img
                  src="/thumbnail/youtube.webp"
                  alt="AironA ギターチャンネル"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* YouTubeアイコンと矢印 */}
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg flex items-center gap-1">
                <img src="/thumbnail/youtube.svg" alt="YouTube" className="w-4 h-4 text-red-600" />
                <img src="/thumbnail/external-link.svg" alt="外部リンク" className="w-3 h-3 text-slate-600" />
              </div>
            </div>

            <div className="md:ml-10 border-l-2 border-slate-200 pl-4 md:pl-8 w-[75%]">
              <p className="font-bold text-slate-700 text-xl md:text-2xl">
                あいろな ギターCh
              </p>
              <p className="text-slate-500 text-sm md:text-base mt-2">当チャンネルでの使用機材を掲載しています</p>
            </div>
          </div>
        </a>

      </section>

      {/* ギターセクション */}
      <section id="guitars" className={sectionClass}>
        <SectionTitle en="Guitars" ja="ギター本体" tone="from-cyan-500 to-cyan-200" />

        <div className="space-y-8 md:space-y-10">
          {guitars.map((guitar, index) => (
            <article key={guitar.name}>
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-8">
                <div className="relative w-full overflow-hidden rounded-2xl bg-slate-900 shadow-md ring-1 ring-slate-200 xl:w-[48%]">
                  <img
                    src={guitar.image}
                    alt={guitar.name}
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold tracking-[0.22em] text-white backdrop-blur-sm">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="w-full border-l-2 border-slate-200 px-4 xl:w-[52%] xl:py-2">
                  <h3 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">{guitar.name}</h3>
                  <p
                    className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base"
                    dangerouslySetInnerHTML={{ __html: guitar.description }}
                  />
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <a
                      href={guitar.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-400 hover:text-cyan-700"
                    >
                      <img src="/equipments/external-link.svg" alt="" className="h-4 w-4" />
                      商品ページ
                    </a>
                    {guitar.link2 && (
                      <a
                        href={guitar.link2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-400 hover:text-cyan-700"
                      >
                        <img src="/equipments/external-link.svg" alt="" className="h-4 w-4" />
                        代替品
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ギター アクセサリーセクション */}
      <section id="guitarGears" className={sectionClass}>
        <SectionTitle en="Guitar Accessories" ja="ギター周辺機器" tone="from-orange-500 to-orange-200" />
        <GearSlider items={guitarGears} />
      </section>

      {/* エフェクター セクション */}
      <section id="effectors" className={sectionClass}>
        <SectionTitle en="Effectors" ja="アンプ・エフェクター" tone="from-emerald-600 to-emerald-200" />
        <img src="/equipments/effector.jpg" alt="エフェクターボード" className="mx-auto mb-8 rounded-xl shadow-lg xl:w-[70%]" />
        <GearSlider items={effectors} />
      </section>



      {/* デスク アクセサリーセクション */}
      <section id="deskAudioGears" className={sectionClass}>
        <SectionTitle en="Desk Gears" ja="デスク周辺機器" tone="from-violet-600 to-violet-200" />
        <img src="/equipments/deskBanner.jpg" alt="デスク" className="mx-auto mb-8 rounded-xl shadow-lg xl:w-[70%]" />
        <GearSlider items={deskGears} />
      </section>

      {/* PCパーツ セクション */}
      <section id="pcSpecs" className={sectionClass}>
        <SectionTitle en="PC Specs" ja="PCスペック" tone="from-rose-500 to-rose-200" />
        <img src="/equipments/PCBanner.jpg" alt="PC" className="xl:w-[50%] mx-auto rounded-xl mb-6" />

        <div className="mx-auto xl:w-[55%]">

          <div className="p-1 lg:px-6">
            <h3 className="font-bold text-slate-800 mb-3 md:mb-4 bg-slate-100 p-2 rounded-md mb-4 text-center">PC スペック <span className="text-sm text-slate-500">(2019年自作)</span></h3>
            <div className="border-2 border-slate-200 rounded-md p-2 lg:px-20">
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4"><span className="text-cyan-700 w-18 inline-block">CPU</span>AMD Ryzen 7 3700X</h3>
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4"><span className="text-cyan-700 w-18 inline-block">GPU</span>NVIDIA GeForce RTX 2070</h3>
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4"><span className="text-cyan-700 w-18 inline-block">MB</span>ASRock B450M Steel Legend</h3>
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4"><span className="text-cyan-700 w-18 inline-block">RAM</span>Corsair 16GB DDR4</h3>
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4"><span className="text-cyan-700 w-18 inline-block">Storage</span>SSD 2TB, HDD 8TB</h3>
              <h3 className="font-bold text-slate-800 px-4"><span className="text-cyan-700 w-18 inline-block">Case</span>Corsair Crystal 280X RGB</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ソフトウェアセクション */}
      <section id="softs" className={sectionClass}>
        <SectionTitle en="Softwares" ja="ソフトウェア" tone="from-blue-600 to-blue-200" />
        <GearSlider items={softs} />
      </section>

      {/* カメラ アクセサリーセクション */}
      <section id="cameraGears" className={sectionClass}>
        <SectionTitle en="Camera Gears" ja="カメラ周辺機器" tone="from-fuchsia-500 to-fuchsia-200" />
        <GearSlider items={cameraGears} />
      </section>

      <div className="h-10"></div>
    </main>
  );
};

export default Equipments;