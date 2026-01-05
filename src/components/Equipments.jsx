const Equipments = () => {

  const guitars = [
    {
      name: 'Fender American Performer Stratocaster HSS',
      image: '/equipments/guitarStrat.png',
      description: 'Color: Satin Surf Green<br />2022年に購入<br />一番出演回数が多いメインギターです<br />とにかく見た目が好きで買いました<br />HSSピックアップと、艶無し塗装が気に入っています<br />今はあまり流通してないみたい<br />使用ジャンル: 全部',
      link: 'https://www.soundhouse.co.jp/en/products/detail/item/260620/?srsltid=AfmBOoqoOJlArQTCa9c9Q3_CIXmVj8Gz-DgEzY_40G0N5MqgdgsMvm6v=dQw4w9WgXcQ',
    },
    {
      name: 'Fujigen NTL10MAH',
      image: '/equipments/guitarTele.png',
      description: 'Neo Classic SERIES<br />Color: Off White Blonde<br />2017年に購入<br />自分の貯金で初めて買ったテレキャスです<br />日本製でしっかりしてて安心感があります<br />使用ジャンル: J-POP, ボカロなど',
      link: 'https://fujigen.shop/products/list.php?category_id=42',
    },
    {
      name: 'Gibson Lespaul Standard',
      image: '/equipments/guitarGibson.png',
      description: 'Color: Unburst(淡色)<br />2023年に購入<br />ギタリストの王道<br />この絶妙な色味がいいんですよね<br />使用ジャンル: ロック, パンクなど',
      link: 'https://store.ishibashi.co.jp/search?q=Gibson+Les+Paul+Standard+Unburst',
    },
    {
      name: 'Ibanez RG450DXB',
      image: '/equipments/guitarIbanez.png',
      description: 'Color: White<br />2013年に購入<br />初心者の頃から使ってます<br />このギターのパワーコードの音がめちゃくちゃ好き<br />使用ジャンル: ロック, ゲーム曲など',
      link: 'https://store.ishibashi.co.jp/search?q=RG450DXB-WH+',
    },
    {
      name: 'Epiphone Lespaul Standard',
      image: '/equipments/guitarEpi.png',
      description: 'Color: Trans Blue<br />2014年に購入<br />某弾いてみた投稿者に憧れてBUMP専用機として使用しています<br />ピックアップはSEYMOUR DUNCAN製に載せ替えています<br />使用ジャンル: BUMP',
      link: 'https://www.google.com/search?q=Epiphone+Lespaul+Standard+Trans+Blue&sca_esv=75d7ba9b8a0ac0c1&udm=28&biw=1920&bih=911&sxsrf=AE3TifNLiTC1qnHwG61rGLD1zx2TER0ZQA%3A1767574573309&ei=LQxbaYzUEtSi1e8P_rqp4Ac&ved=0ahUKEwjMnrm0mPORAxVUUfUHHX5dCnwQ4dUDCBE&oq=Epiphone+Lespaul+Standard+Trans+Blue&gs_lp=Ehlnd3Mtd2l6LW1vZGVsZXNzLXNob3BwaW5nIiRFcGlwaG9uZSBMZXNwYXVsIFN0YW5kYXJkIFRyYW5zIEJsdWUyBxAjGLQEGCdI9whQywFYywFwAXgBkAEAmAFYoAFYqgEBMbgBDMgBAPgBAZgCAqACXcICChAAGLADGNYEGEeYAwCIBgGQBgSSBwEyoAecArIHATG4B1vCBwMwLjLIBwOACAA&sclient=gws-wiz-modeless-shopping',
    },
    {
      name: 'Ibanez PF12MHCE',
      image: '/equipments/guitarAco.png',
      description: 'Color: Open Pore Natural<br />2020年に購入<br />やすい。色おしゃれ。<br />使用ジャンル: J-POPなど',
      link: 'https://store.ishibashi.co.jp/ec/product/4515276967439',
    },
    {
      name: 'Bacchus WL4-AGED/RSM',
      image: '/equipments/bass.png',
      description: 'Color: 3TS-AGED<br />2024年に購入<br />ベースよくわからないのでとりあえずBacchus製をチョイス<br />動画でたまに出演します<br />使用ジャンル: J-POPなど',
      link: 'https://www.deviser.co.jp/products/wl4-aged-rsm',
    },
  ]

  const effectors = [
    {
      category: 'アンプシミュレーター',
      name: 'Positive Grid BIAS FX 2',
      image: '/equipments/biasfx2.png',
      description: 'ギタートーンはほぼ、このソフトで作っています<br />後継機(BIAS X)が出たみたいで、もう買えないみたいです。。。<br />いずれ後継機に移行したい',
      link: 'https://jp.positivegrid.com/pages/shop',
      page: '(公式サイト)'
    },
    {
      category: 'ミニアンプ',
      name: 'Positive Grid Spark GO',
      image: '/equipments/sparkgo.png',
      description: 'サブアンプ<br />手軽に使えて便利です',
      link: 'https://amzn.to/4bitSTw',
      page: '(Amazon)'
    },
    {
      category: 'チューナーペダル',
      name: 'tc electronic POLYTUNE 3 NOIR',
      image: '/equipments/tuner.png',
      description: '必須級<br />もうクリップチューナーには戻れません<br />精度がめちゃいいです',
      link: 'https://amzn.to/4q8jjqR',
      page: '(Amazon)'
    },
    {
      category: 'ワウペダル',
      name: 'Xotic Wah XW-1',
      image: '/equipments/xw1.png',
      description: '使ってる有名人が多いので買いました',
      link: 'https://amzn.to/3Z12TV2',
      page: '(Amazon)'
    },
    {
      category: 'MIDIペダル',
      name: 'M-WAVE MIDIフットコントローラー',
      image: '/equipments/midi.png',
      description: 'DAWの操作等に使っています<br />初期設定にクセあり',
      link: 'https://amzn.to/49o04m4',
      page: '(Amazon)'
    },
    {
      category: 'コンプレッサー',
      name: '<MXR M291 Dyna Comp Mini ',
      image: '/equipments/dynacomp.png',
      description: 'BIAS FX2でよく使ってたので買いました<br />やはり実機は全然違うです',
      link: 'https://amzn.to/496BVRX',
      page: '(Amazon)'
    },
    {
      category: 'オーバードライブ',
      name: 'BOSS BD-2 Blues Driver',
      image: '/equipments/BD2.png',
      description: '王道中の王道です',
      link: 'https://amzn.to/49FUmgw',
      page: '(Amazon)'
    },
    {
      category: 'ディストーション',
      name: 'Limetone Audio JACKAL',
      image: '/equipments/jackal.png',
      description: '島村楽器限定カラーのオレンジ版を入手しました<br />白いバージョンもほしい',
      link: 'https://amzn.to/3LuLGQQ',
      page: '(Amazon)'
    },
    {
      category: 'パワーサプライ',
      name: 'VITAL AUDIO POWER CARRIER VA-08 Mk-II',
      image: '/equipments/supply.png',
      description: '定番です',
      link: 'https://amzn.to/4solbxd',
      page: '(Amazon)'
    },
  ];

  const guitarGears = [
    {
      category: 'ピック',
      name: 'Jim Dunrop JazzⅢ ULTEX',
      image: '/equipments/pick.png',
      description: 'このタイプならこいつで間違いないです！',
      link: 'https://amzn.to/45Eji5B',
      page: '(Amazon)'
    },
    {
      category: '弦',
      name: 'Elixor エリクサー OPTIWEB Light .010-.046',
      image: '/equipments/string.png',
      description: 'ズボラなのでこれで1年は持たせます(本当は3ヶ月に1回変えたい)',
      link: 'https://amzn.to/4aF9AU0',
      page: '(Amazon)'
    },
    {
      category: 'シールドケーブル',
      name: 'SOMMER CABLE The Spirit XXL Instrument',
      image: '/equipments/cable.png',
      description: 'ドイツメーカーで径と音が太いです',
      link: 'https://www.soundhouse.co.jp/products/detail/item/291553/',
      page: '(サウンドハウス)'
    },
    {
      category: 'カポタスト',
      name: 'SHUBB エレキ/アコギ兼用 C-3 Nickel',
      image: '/equipments/capo.png',
      description: 'シンプルでかっこいいし使いやすい！',
      link: 'https://amzn.to/49CI9ZT',
      page: '(Amazon)'
    },
    {
      category: '弦潤滑剤',
      name: 'MUSIC NOMAD STRING FUEL MN109',
      image: '/equipments/stringfuel.png',
      description: '押し付けて使うタイプの潤滑剤<br />塗りやすいのでおすすめ',
      link: 'https://amzn.to/4qFALml',
      page: '(Amazon)'
    },
    {
      category: 'ギタースタンド',
      name: 'Leo Jaymz ギタースタンド 自動ロック式',
      image: '/equipments/stand.png',
      description: '吊るして使うタイプのスタンド<br />自動ロック式なので安心',
      link: 'https://amzn.to/45x0AwD',
      page: '(Amazon)'
    },
  ];

  const deskGears = [
    {
      category: 'マウス',
      name: 'Razer Cobra Pro',
      image: '/equipments/mouse.png',
      description: '左に2ボタン、ホイール手前に2ボタンあります<br />このボタン数の無線マウスあんまない',
      link: 'https://amzn.to/4q9C6SC',
      page: '(Amazon)'
    },
    {
      category: 'キーボード',
      name: 'ARCHISS Maestro2S JIS配列 静音赤軸 AS-KBM02/SRGBA',
      image: '/equipments/keyboard.png',
      description: 'サイズ感が本当にちょうどいい。<br />テンキー付きで、フルサイズに比べてマウスを内側に持てるので姿勢が楽になります。',
      link: 'https://amzn.to/3NsYcRn',
      page: '(Amazon)'
    },
    {
      category: 'メインモニター',
      name: 'Acer VG272Xbmiipx 27型 IPS 240hz',
      image: '/equipments/monitor.png',
      description: '必須レベル 生活からリモコンがなくせます<br />外出先からエアコンを制御したり、PC起動ができるようになります',
      link: 'https://amzn.to/3LjJXxC',
      page: '(Amazon)'
    },
    {
      category: 'モニターライト',
      name: 'Quntis デスクライト ClassicPro',
      image: '/equipments/lightbar.png',
      description: '今のデスク3年目にしてようやく買いましたが、バータイプに限らずライトは必須ですね。。。',
      link: 'https://amzn.to/44VHRuE',
      page: '(Amazon)'
    },
    {
      category: 'ヘッドフォン',
      name: 'beyerdynamic DT 700 PRO X',
      image: '/equipments/headphone.png',
      description: '秋葉原のeイヤホンで試聴して買いました',
      link: 'https://amzn.to/49DKJil',
      page: '(Amazon)'
    },
    {
      category: 'モニタースピーカー',
      name: 'Edifier R1280DB',
      image: '/equipments/speaker.png',
      description: 'カーテンレールにぶら下げてます。<br />ぶら下げて使うのはよくないのでやめましょう',
      link: 'https://amzn.to/3LvbcFB',
      page: '(Amazon)'
    },
    {
      category: 'マイク',
      name: 'Sennheiser e935',
      image: '/equipments/mic.png',
      description: 'あんまないけど歌撮るとき用',
      link: 'https://amzn.to/3YqrEtL',
      page: '(Amazon)'
    },
    {
      category: 'オーディオインターフェイス',
      name: 'Focusrite Scarlett Solo',
      image: '/equipments/audiointerface.png',
      description: 'これの2世代目を使ってます<br />だいぶ価格が高騰してるので、別のを選んでもいいかも',
      link: 'https://amzn.to/49CNvEt',
      page: '(Amazon)'
    },
    {
      category: 'オーディオミキサー',
      name: 'Behringer XENYX 502',
      image: '/equipments/mixer.png',
      description: 'PC,Switch,Alexaの音をこれでミックスしてスピーカーに出力しています',
      link: 'https://amzn.to/4suNslS',
      page: '(Amazon)'
    },
    {
      category: 'スマートスピーカー',
      name: 'Echo Dot 第3世代 チャコール',
      image: '/equipments/alexa.png',
      description: 'SwitchBotと連携用に使ってます。<br />最近こいつの耳が悪くなってる',
      link: 'https://amzn.to/49kO9W5',
      page: '(Amazon)'
    },
    {
      category: 'スマートリモコン',
      name: 'SwitchBot Hub Mini',
      image: '/equipments/switchbot.png',
      description: '必須レベル 生活からリモコンがなくせます<br />外出先からエアコンを制御したり、PC起動ができるようになります',
      link: 'https://amzn.to/49C1dYi',
      page: '(Amazon)'
    },
  ];

  const softs = [
    {
      category: 'DAW',
      name: 'Cakewalk Sonar',
      image: '/equipments/cakewalk.png',
      description: '無料です<br />以前のBandlab版を使ってました<br />セッティングがこれに慣れちゃって他に移行できない',
      link: 'https://www.cakewalk.com/sonar',
      page: '(公式サイト)'
    },
    {
      category: '動画編集ソフト',
      name: 'Wondershare Filmora',
      image: '/equipments/filmora.png',
      description: '買い切り版を使ってます<br />そのへんのフリーソフトよりは使いやすい<br />サブスク入らないとAI機能がほぼ使えないので注意',
      link: 'https://filmora.wondershare.co.jp/ad/brand.html?fm_channel=cpc_google&gad_source=1&gad_campaignid=10254472540&gbraid=0AAAAADd-4IpIDgpdqZCceZ6tNTnq4Uutp&gclid=Cj0KCQiAvOjKBhC9ARIsAFvz5lhM-howNwwbuz0FdUtOmkLVrEMNaEZs8hURusS0y1EvDy5ByvSyv0YaAod0EALw_wcB',
      page: '(公式サイト)'
    },
    {
      category: 'TAB譜製作ソフト',
      name: 'TuxGuitar',
      image: '/equipments/tuxguitar.png',
      description: '無料です<br />初心者のときからUltimateGuitarsでTABダウンロードして使ってました<br />アプデが入って格段に作りやすくなった',
      link: 'https://www.tuxguitar.app/#download',
      page: '(DLサイト)'
    },
    {
      category: 'アンプシミュレーター',
      name: 'Positive GridBIAS FX 2',
      image: '/equipments/biasfx2.png',
      description: 'ギタートーンはほぼ、このソフトで作っています<br />後継機(BIAS X)が出たみたいで、もう買えないみたいです。。。<br />いずれ後継機に移行したい',
      link: 'https://jp.positivegrid.com/pages/shop',
      page: '(公式サイト)'
    },
  ];

  const cameraGears = [
    {
      category: 'メインカメラ',
      name: 'SONY ミラーレス一眼カメラ ZV-E10',
      image: '/equipments/maincamera.png',
      description: 'Sonyのエントリーモデルです<br />いずれはフルサイズに変えたい',
      link: 'https://amzn.to/4suJWIc',
      page: '(Amazon)'
    },
    {
      category: 'レンズ',
      name: 'SIGMA 18-50mm F2.8 DC DN Sony Eマウント APS-C',
      image: '/equipments/lens.png',
      description: '特にこだわりはないけどこれ使ってます',
      link: 'https://amzn.to/49nqbcy',
      page: '(Amazon)'
    },
    {
      category: '三脚',
      name: 'K&F Concept 三脚 一眼レフ 4段 160cm 360度回転',
      image: '/equipments/tripod.png',
      description: '三脚は安いの使うとすぐ壊れるので<br />こういうのがいいです',
      link: 'https://amzn.to/44S0GPl',
      page: '(Amazon)'
    },
    {
      category: 'アクションカメラ',
      name: 'Insta360 Ace Pro',
      image: '/equipments/actioncamera.png',
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

        <div className="text-xl bg-slate-100 rounded-lg p-6 px-15 w-fit mx-auto text-slate-600 font-mono lg:font-bold space-y-4 flex flex-col">
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
      <section id="guitars" className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg scroll-mt-20 relative">
        <div>
          <a href="#top" className="text-xs md:text-base text-blue-800 absolute top-19 right-3 md:right-16 hover:text-blue-700 transition-colors underline">{"<目次に戻る>"}</a>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-6">
            Guitars

            <br />
            <span className="text-xl text-slate-500">ギター本体</span>
          </h2>
        </div>

        {guitars.map((guitar, index) => (
          <div key={index}>
            {index > 0 && <div className="block h-px bg-slate-200 my-6 lg:my-10"></div>}
            <div className={`xl:flex items-center gap-4 md:gap-6 xl:gap-8 mb-6 xl:mb-10`}>
              <div className="w-full md:w-[70%] mx-auto xl:w-[45%] aspect-[5/3] xl:aspect-[5/3] bg-slate-200 overflow-hidden rounded-xl shadow-md">
                <img src={guitar.image} alt={guitar.name} className="w-full h-full object-cover" />
              </div>
              <div className="w-full xl:w-[55%]">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-3 md:mb-4 bg-slate-100 p-2 rounded-md px-3">{guitar.name}</h3>
                <div className="px-4">
                  <p className="text-sm sm:text-base md:text-md text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: guitar.description }}></p>
                  <a href={guitar.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors font-bold mt-4">
                    <img src="/equipments/external-link.svg" alt="" className="w-4 h-4" />
                    商品ページ
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ギター アクセサリーセクション */}
      <section id="guitarGears" className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg scroll-mt-20 relative">
        <a href="#top" className="text-xs md:text-base text-blue-800 absolute top-19 right-3 md:right-16 hover:text-blue-700 transition-colors underline">{"<目次に戻る>"}</a>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-6">
          Guitar Accessories
          <br />
          <span className="text-xl text-slate-500">ギター周辺機器</span>
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-2">
          {guitarGears.map((gear, index) => (
            <div key={index} className="p-1 lg:px-6">
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 bg-slate-100 p-2 rounded-md mb-4">・{gear.category}</h3>
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4">{gear.name}</h3>
              <div className="flex items-center">
                <a href={gear.link} target="_blank" rel="noopener noreferrer" className="w-24 h-24 lg:w-32 lg:h-32 mr-4 lg:mr-8 flex-shrink-0 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src={gear.image} alt={gear.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
                </a>
                <div>
                  <p className="text-md text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: gear.description }}></p>
                  <br /><a href={gear.link} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors">
                    <img src="/equipments/external-link.svg" alt="" className="w-4 h-4" />
                    商品ページ{gear.page}
                  </a>
                </div>
              </div>
              <span className="block h-px bg-slate-200 my-8"></span>
            </div>
          ))}
        </div>
      </section>

      {/* エフェクター セクション */}
      <section id="effectors" className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg scroll-mt-20 relative">
        <a href="#top" className="text-xs md:text-base text-blue-800 absolute top-19 right-3 md:right-16 hover:text-blue-700 transition-colors underline">{"<目次に戻る>"}</a>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-6">
          Effectors
          <br />
          <span className="text-xl text-slate-500">アンプ・エフェクター</span>
        </h2>
        <img src="/equipments/effector.jpg" alt="デスク" className="xl:w-[70%] mx-auto rounded-xl mb-8 shadow-lg" />

        <div className="grid grid-cols-1 xl:grid-cols-2">
          {effectors.map((gear, index) => (
            <div key={index} className="p-1 lg:px-6">
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 bg-slate-100 p-2 rounded-md mb-4">・{gear.category}</h3>
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4">{gear.name}</h3>
              <div className="flex items-center">
                <a href={gear.link} target="_blank" rel="noopener noreferrer" className="w-24 h-24 lg:w-32 lg:h-32 mr-4 lg:mr-8 flex-shrink-0 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src={gear.image} alt={gear.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
                </a>
                <div>
                  <p className="text-md text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: gear.description }}></p>
                  <br /><a href={gear.link} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors">
                    <img src="/equipments/external-link.svg" alt="" className="w-4 h-4" />
                    商品ページ{gear.page}
                  </a>
                </div>
              </div>
              <span className="block h-px bg-slate-200 my-8"></span>
            </div>
          ))}
        </div>
      </section>



      {/* デスク アクセサリーセクション */}
      <section id="deskAudioGears" className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg scroll-mt-20 relative">
        <a href="#top" className="text-xs md:text-base text-blue-800 absolute top-19 right-3 md:right-16 hover:text-blue-700 transition-colors underline">{"<目次に戻る>"}</a>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-6">
          Desk Gears
          <br />
          <span className="text-xl text-slate-500">デスク周辺機器</span>
        </h2>
        <img src="/equipments/deskBanner.jpg" alt="デスク" className="xl:w-[70%] mx-auto rounded-xl mb-8 shadow-lg" />

        <div className="grid grid-cols-1 xl:grid-cols-2">
          {deskGears.map((gear, index) => (
            <div key={index} className="p-1 lg:px-6">
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 bg-slate-100 p-2 rounded-md mb-4">・{gear.category}</h3>
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4">{gear.name}</h3>
              <div className="flex items-center">
                <a href={gear.link} target="_blank" rel="noopener noreferrer" className="w-24 h-24 lg:w-32 lg:h-32 mr-4 lg:mr-8 flex-shrink-0 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src={gear.image} alt={gear.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
                </a>
                <div>
                  <p className="text-md text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: gear.description }}></p>
                  <br /><a href={gear.link} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors">
                    <img src="/equipments/external-link.svg" alt="" className="w-4 h-4" />
                    商品ページ{gear.page}
                  </a>
                </div>
              </div>
              <span className="block h-px bg-slate-200 my-8"></span>
            </div>
          ))}
        </div>
      </section>

      {/* PCパーツ セクション */}
      <section id="pcSpecs" className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg scroll-mt-20 relative">
        <a href="#top" className="text-xs md:text-base text-blue-800 absolute top-19 right-3 md:right-16 hover:text-blue-700 transition-colors underline">{"<目次に戻る>"}</a>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-6">
          PC Specs
          <br />
          <span className="text-xl text-slate-500">PCスペック</span>
        </h2>
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
      <section id="softs" className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg scroll-mt-20 relative">
        <a href="#top" className="text-xs md:text-base text-blue-800 absolute top-19 right-3 md:right-16 hover:text-blue-700 transition-colors underline">{"<目次に戻る>"}</a>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-6">
          Softwares
          <br />
          <span className="text-xl text-slate-500">ソフトウェア</span>
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-2">
          {softs.map((gear, index) => (
            <div key={index} className="p-1 lg:px-6">
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 bg-slate-100 p-2 rounded-md mb-4">・{gear.category}</h3>
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4">{gear.name}</h3>
              <div className="flex items-center">
                <a href={gear.link} target="_blank" rel="noopener noreferrer" className="w-24 h-24 lg:w-32 lg:h-32 mr-4 lg:mr-8 flex-shrink-0 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src={gear.image} alt={gear.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
                </a>
                <div>
                  <p className="text-md text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: gear.description }}></p>
                  <br /><a href={gear.link} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors">
                    <img src="/equipments/external-link.svg" alt="" className="w-4 h-4" />
                    商品ページ{gear.page}
                  </a>
                </div>
              </div>
              <span className="block h-px bg-slate-200 my-8"></span>
            </div>
          ))}
        </div>
      </section>

      {/* カメラ アクセサリーセクション */}
      <section id="cameraGears" className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg scroll-mt-20 relative">
        <a href="#top" className="text-xs md:text-base text-blue-800 absolute top-19 right-3 md:right-16 hover:text-blue-700 transition-colors underline">{"<目次に戻る>"}</a>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-6">
          Camera Gears
          <br />
          <span className="text-xl text-slate-500">カメラ周辺機器</span>
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-2">
          {cameraGears.map((gear, index) => (
            <div key={index} className="p-1 lg:px-6">
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 bg-slate-100 p-2 rounded-md mb-4">・{gear.category}</h3>
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4">{gear.name}</h3>
              <div className="flex items-center">
                <a href={gear.link} target="_blank" rel="noopener noreferrer" className="w-24 h-24 lg:w-32 lg:h-32 mr-4 lg:mr-8 flex-shrink-0 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src={gear.image} alt={gear.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
                </a>
                <div>
                  <p className="text-md text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: gear.description }}></p>
                  <br /><a href={gear.link} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors">
                    <img src="/equipments/external-link.svg" alt="" className="w-4 h-4" />
                    商品ページ{gear.page}
                  </a>
                </div>
              </div>
              <span className="block h-px bg-slate-200 my-8"></span>
            </div>
          ))}
        </div>
      </section>

      <div className="h-10"></div>
    </main>
  );
};

export default Equipments;