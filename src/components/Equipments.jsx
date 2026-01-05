const Equipments = () => {

  const guitars = [
    {
      name: 'Fender American Performer Stratocaster HSS',
      image: '/equipments/guitarStrat.png',
      description: 'Color: Satin Surf Green<br />2022年に購入<br />一番出演回数が多いメインギターです<br />とにかく見た目が好きで買いました<br />HSSピックアップと、艶無し塗装が気に入っています',
      link: 'https://www.soundhouse.co.jp/en/products/detail/item/260620/?srsltid=AfmBOoqoOJlArQTCa9c9Q3_CIXmVj8Gz-DgEzY_40G0N5MqgdgsMvm6v=dQw4w9WgXcQ',
    },
    {
      name: 'Fujigen NTL10MAH',
      image: '/equipments/guitarTele.png',
      description: 'Neo Classic SERIES<br />Color: Off White Blonde<br />2017年に購入<br />自分の貯金で初めて買ったテレキャスです<br />日本製でしっかりしてて安心感があります',
      link: 'https://fujigen.shop/products/list.php?category_id=42',
    },
    {
      name: 'Gibson Lespaul Standard',
      image: '/equipments/guitarGibson.png',
      description: 'Color: Unburst(淡色)<br />2023年に購入<br />ギタリストの王道<br />この絶妙な色味がいいんですよね',
      link: 'https://store.ishibashi.co.jp/search?q=Gibson+Les+Paul+Standard+Unburst',
    },
    {
      name: 'Ibanez RG450DXB',
      image: '/equipments/guitarIbanez.png',
      description: 'Color: White<br />2013年に購入<br />初心者の時から使ってます<br />このギターのパワーコードの音が一番好き',
      link: 'https://store.ishibashi.co.jp/search?q=RG450DXB-WH+',
    },
    {
      name: 'Epiphone Lespaul Standard',
      image: '/equipments/guitarEpi.png',
      description: 'Color: Trans Blue<br />2014年に購入<br />BUMP専用機として活躍してます<br />某弾いてみた投稿者に似せてます',
      link: 'https://www.google.com/search?q=Epiphone+Lespaul+Standard+Trans+Blue&sca_esv=75d7ba9b8a0ac0c1&udm=28&biw=1920&bih=911&sxsrf=AE3TifNLiTC1qnHwG61rGLD1zx2TER0ZQA%3A1767574573309&ei=LQxbaYzUEtSi1e8P_rqp4Ac&ved=0ahUKEwjMnrm0mPORAxVUUfUHHX5dCnwQ4dUDCBE&oq=Epiphone+Lespaul+Standard+Trans+Blue&gs_lp=Ehlnd3Mtd2l6LW1vZGVsZXNzLXNob3BwaW5nIiRFcGlwaG9uZSBMZXNwYXVsIFN0YW5kYXJkIFRyYW5zIEJsdWUyBxAjGLQEGCdI9whQywFYywFwAXgBkAEAmAFYoAFYqgEBMbgBDMgBAPgBAZgCAqACXcICChAAGLADGNYEGEeYAwCIBgGQBgSSBwEyoAecArIHATG4B1vCBwMwLjLIBwOACAA&sclient=gws-wiz-modeless-shopping',
    },
    {
      name: 'Ibanez PF12MHCE',
      image: '/equipments/guitarAco.png',
      description: 'Color: Open Pore Natural<br />2020年に購入<br />やすい。色おしゃれ。',
      link: 'https://store.ishibashi.co.jp/ec/product/4515276967439',
    },
  ]

  const guitarGears = [
    {
      category: 'ピック',
      name: 'Jim Dunrop JazzⅢ ULTEX',
      image: '/equipments/pick.png',
      description: 'このタイプならこいつで間違いないです！',
      link: 'https://amzn.to/45Eji5B',
    },
    {
      category: '弦',
      name: 'Elixor エリクサー OPTIWEB Light .010-.046',
      image: '/equipments/string.png',
      description: 'ズボラなのでこれで1年は持たせます(本当は3ヶ月に1回変えたい)',
      link: 'https://amzn.to/4aF9AU0',
    },
    {
      category: 'シールドケーブル',
      name: 'SOMMER CABLE The Spirit XXL Instrument',
      image: '/equipments/cable.png',
      description: 'ドイツメーカーで径と音が太いです',
      link: 'https://www.soundhouse.co.jp/products/detail/item/291553/',
    },
    {
      category: 'カポタスト',
      name: 'SHUBB エレキ/アコギ兼用 C-3 Nickel',
      image: '/equipments/capo.png',
      description: 'シンプルでかっこいいし使いやすい！',
      link: 'https://amzn.to/49CI9ZT',
    },
    {
      category: '弦潤滑剤',
      name: 'MUSIC NOMAD STRING FUEL MN109',
      image: '/equipments/stringfuel.png',
      description: '押し付けて使うタイプの潤滑剤<br />塗りやすいのでおすすめ',
      link: 'https://amzn.to/4qFALml',
    },
    {
      category: 'ギタースタンド',
      name: 'Leo Jaymz ギタースタンド 自動ロック式',
      image: '/equipments/stand.png',
      description: '吊るして使うタイプのスタンド<br />自動ロック式なので安心',
      link: 'https://amzn.to/45x0AwD',
    },
  ];

  const deskGears = [
    {
      category: 'マウス',
      name: 'Razer Cobra Pro',
      image: '/equipments/mouse.png',
      description: '左に2ボタン、ホイール手前に2ボタンあります<br />このボタン数の無線マウスあんまない',
      link: 'https://amzn.to/4q9C6SC',
    },
    {
      category: 'キーボード',
      name: 'ARCHISS Maestro2S JIS配列 静音赤軸 AS-KBM02/SRGBA',
      image: '/equipments/keyboard.png',
      description: 'サイズ感が本当にちょうどいい。<br />テンキー付きで、フルサイズに比べてマウスを内側に持てるので姿勢が楽になります。',
      link: 'https://amzn.to/3NsYcRn',
    },
    {
      category: 'メインモニター',
      name: 'Acer VG272Xbmiipx 27型 IPS 240hz',
      image: '/equipments/monitor.png',
      description: '必須レベル 生活からリモコンがなくせます<br />外出先からエアコンを制御したり、PC起動ができるようになります',
      link: 'https://amzn.to/3LjJXxC',
    },
    {
      category: 'モニターライト',
      name: 'Quntis デスクライト ClassicPro',
      image: '/equipments/lightbar.png',
      description: '今のデスク3年目にしてようやく買いましたが、バータイプに限らずライトは必須ですね。。。',
      link: 'https://amzn.to/44VHRuE',
    },
    {
      category: 'ヘッドフォン',
      name: 'beyerdynamic DT 700 PRO X',
      image: '/equipments/headphone.png',
      description: '秋葉原のeイヤホンで試聴して買いました',
      link: 'https://amzn.to/49DKJil',
    },
    {
      category: 'モニタースピーカー',
      name: 'Edifier R1280DB',
      image: '/equipments/speaker.png',
      description: 'カーテンレールにぶら下げてます。<br />ぶら下げて使うのはよくないのでやめましょう',
      link: 'https://amzn.to/3LvbcFB',
    },
    {
      category: 'マイク',
      name: 'Sennheiser e935',
      image: '/equipments/mic.png',
      description: 'あんまないけど歌撮るとき用',
      link: 'https://amzn.to/3YqrEtL',
    },
    {
      category: 'オーディオインターフェイス',
      name: 'Focusrite Scarlett Solo',
      image: '/equipments/audiointerface.png',
      description: 'これの2世代目を使ってます<br />だいぶ価格が高騰してるので、別のを選んでもいいかも',
      link: 'https://amzn.to/49CNvEt',
    },
    {
      category: 'オーディオミキサー',
      name: 'Behringer XENYX 502',
      image: '/equipments/mixer.png',
      description: 'PC,Switch,Alexaの音をこれでミックスしてスピーカーに出力しています',
      link: 'https://amzn.to/4suNslS',
    },
    {
      category: 'スマートスピーカー',
      name: 'Echo Dot 第3世代 チャコール',
      image: '/equipments/alexa.png',
      description: 'SwitchBotと連携用に使ってます。<br />最近こいつの耳が悪くなってる',
      link: 'https://amzn.to/49kO9W5',
    },
    {
      category: 'スマートリモコン',
      name: 'SwitchBot Hub Mini',
      image: '/equipments/switchbot.png',
      description: '必須レベル 生活からリモコンがなくせます<br />外出先からエアコンを制御したり、PC起動ができるようになります',
      link: 'https://amzn.to/49C1dYi',
    },
  ];

  const cameraGears = [
    {
      category: 'メインカメラ',
      name: 'SONY ミラーレス一眼カメラ ZV-E10',
      image: '/equipments/maincamera.png',
      description: 'Sonyのエントリーモデルです<br />いずれはフルサイズに変えたい',
      link: 'https://amzn.to/4suJWIc',
    },
    {
      category: 'レンズ',
      name: 'SIGMA 18-50mm F2.8 DC DN Sony Eマウント APS-C',
      image: '/equipments/lens.png',
      description: '特にこだわりはないけどこれ使ってます',
      link: 'https://amzn.to/49nqbcy',
    },
    {
      category: '三脚',
      name: 'K&F Concept 三脚 一眼レフ 4段 160cm 360度回転',
      image: '/equipments/tripod.png',
      description: '三脚は安いの使うとすぐ壊れるので<br />こういうのがいいです',
      link: 'https://amzn.to/44S0GPl',
    },
    {
      category: 'アクションカメラ',
      name: 'Insta360 Ace Pro',
      image: '/equipments/actioncamera.png',
      description: 'これでショート動画の主観動画を撮ってます<br />帽子マウントが必要です',
      link: ' https://amzn.to/49kO9W5',
    },
  ];

  return (
    <main className="mt-4 space-y-6 mx-2">
      {/* タイトルセクション */}
      <section className="bg-white py-4 px-4 md:px-8 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-800">
          使用機材一覧
        </h1>
      </section>

      {/* 目次セクション */}
      <section className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-6">
          目次
        </h2>
        <div className="grid grid-cols-1 xl:grid-cols-1 px-[10%] xl:px-[30%] text-center text-lg">
          <a href="#guitars" className="p-1 lg:px-6">
            <h3 className="font-bold text-blue-700 bg-slate-100 px-4 py-2 rounded-md mb-2">・ギター</h3>
          </a>
          <a href="#guitarGears" className="p-1 lg:px-6">
            <h3 className="font-bold text-blue-700 bg-slate-100 px-4 py-2 rounded-md mb-2">・ギター消耗品・小物</h3>
          </a>
          <a href="#deskAudioGears" className="p-1 lg:px-6">
            <h3 className="font-bold text-blue-700 bg-slate-100 px-4 py-2 rounded-md mb-2">・デスク・オーディオ周り</h3>
          </a>
          <a href="#pcSpecs" className="p-1 lg:px-6">
            <h3 className="font-bold text-blue-700 bg-slate-100 px-4 py-2 rounded-md mb-2">・PC スペック</h3>
          </a>
          <a href="#cameraGears" className="p-1 lg:px-6">
            <h3 className="font-bold text-blue-700 bg-slate-100 px-4 py-2 rounded-md mb-2">・カメラ機材</h3>
          </a>
        </div>
      </section>

      {/* ギターセクション */}
      <section id="guitars" className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg scroll-mt-20">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-6">
            Guitars
            <br />
            <span className="text-xl text-slate-500">ギター</span>
          </h2>
        </div>

        {guitars.map((guitar, index) => (
          <div key={index}>
            {index > 0 && <div className="block h-px bg-slate-200 my-6 lg:my-10"></div>}
            <div className={`xl:flex ${index % 2 === 0 ? '' : 'xl:flex-row-reverse'} items-center gap-4 md:gap-6 xl:gap-8 mb-6 xl:mb-10`}>
              <div className="w-full md:w-[70%] mx-auto xl:w-[52%] aspect-[5/3] xl:aspect-[5/3] bg-slate-200 overflow-hidden rounded-xl shadow-md">
                <img src={guitar.image} alt={guitar.name} className="w-full h-full object-cover" />
              </div>
              <div className="w-full xl:w-[48%]">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-3 md:mb-4 bg-slate-100 p-2 rounded-md mt-4 px-3">{guitar.name}</h3>
                <div className="px-4">
                  <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: guitar.description }}></p>
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
      <section id="guitarGears" className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg scroll-mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-6">
          Guitar Gears
          <br />
          <span className="text-xl text-slate-500">ギター消耗品・小物</span>
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-2">
          {guitarGears.map((gear, index) => (
            <div key={index} className="p-1 lg:px-6">
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 bg-slate-100 p-2 rounded-md mb-4">・{gear.category}</h3>
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4">{gear.name}</h3>
              <div className="flex items-center">
                <a href={gear.link} target="_blank" rel="noopener noreferrer" className="w-24 h-24 lg:w-32 lg:h-32 mr-4 lg:mr-8 flex-shrink-0 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src={gear.image} alt={gear.name} className="w-full h-full object-contain" />
                </a>
                <div>
                  <p className="text-md text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: gear.description }}></p>
                  <br /><a href={gear.link} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors">
                    <img src="/equipments/external-link.svg" alt="" className="w-4 h-4" />
                    商品ページ(Amazon)
                  </a>
                </div>
              </div>
              <span className="block h-px bg-slate-200 my-8"></span>
            </div>
          ))}
        </div>
      </section>

      {/* デスク アクセサリーセクション */}
      <section id="deskAudioGears" className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg scroll-mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-6">
          Desk & Audio Gears
          <br />
          <span className="text-xl text-slate-500">デスク・オーディオ周り</span>
        </h2>
        <img src="/equipments/deskBanner.jpg" alt="デスク" className="xl:w-[70%] mx-auto rounded-xl mb-6" />

        <div className="grid grid-cols-1 xl:grid-cols-2">
          {deskGears.map((gear, index) => (
            <div key={index} className="p-1 lg:px-6">
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 bg-slate-100 p-2 rounded-md mb-4">・{gear.category}</h3>
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4">{gear.name}</h3>
              <div className="flex items-center">
                <a href={gear.link} target="_blank" rel="noopener noreferrer" className="w-24 h-24 lg:w-32 lg:h-32 mr-4 lg:mr-8 flex-shrink-0 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src={gear.image} alt={gear.name} className="w-full h-full object-contain" />
                </a>
                <div>
                  <p className="text-md text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: gear.description }}></p>
                  <br /><a href={gear.link} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors">
                    <img src="/equipments/external-link.svg" alt="" className="w-4 h-4" />
                    商品ページ(Amazon)
                  </a>
                </div>
              </div>
              <span className="block h-px bg-slate-200 my-8"></span>
            </div>
          ))}
        </div>
      </section>

      {/* PCパーツ セクション */}
      <section id="pcSpecs" className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg scroll-mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-6">
          PC Specs
        </h2>
        <img src="/equipments/PCBanner.jpg" alt="PC" className="xl:w-[50%] mx-auto rounded-xl mb-6" />

        <div className="mx-auto xl:w-[55%]">

          <div className="p-1 lg:px-6">
            <h3 className="font-bold text-slate-800 mb-3 md:mb-4 bg-slate-100 p-2 rounded-md mb-4 text-center">PC スペック <span className="text-sm text-slate-500">(2019年製自作PC)</span></h3>
            <div className="border-2 border-slate-200 rounded-md p-2 lg:px-20">
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4"><span className="text-cyan-700 w-18 inline-block">CPU</span>Ryzen 7 3700X</h3>
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4"><span className="text-cyan-700 w-18 inline-block">GPU</span>NVIDIA GeForce RTX 2070</h3>
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4"><span className="text-cyan-700 w-18 inline-block">MB</span>ASRock B450M Steel Legend</h3>
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4"><span className="text-cyan-700 w-18 inline-block">RAM</span>Corsair 16GB DDR4</h3>
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4"><span className="text-cyan-700 w-18 inline-block">Storage</span>SSD 2TB, HDD 8TB</h3>
              <h3 className="font-bold text-slate-800 px-4"><span className="text-cyan-700 w-18 inline-block">Case</span>Corsair Crystal 280X RGB</h3>
            </div>
          </div>
        </div>
      </section>

      {/* カメラ アクセサリーセクション */}
      <section id="cameraGears" className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg scroll-mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-6">
          Camera Gears
          <br />
          <span className="text-xl text-slate-500">カメラ機材</span>
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-2">
          {cameraGears.map((gear, index) => (
            <div key={index} className="p-1 lg:px-6">
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 bg-slate-100 p-2 rounded-md mb-4">・{gear.category}</h3>
              <h3 className="font-bold text-slate-800 mb-3 md:mb-4 px-4">{gear.name}</h3>
              <div className="flex items-center">
                <a href={gear.link} target="_blank" rel="noopener noreferrer" className="w-24 h-24 lg:w-32 lg:h-32 mr-4 lg:mr-8 flex-shrink-0 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src={gear.image} alt={gear.name} className="w-full h-full object-contain" />
                </a>
                <div>
                  <p className="text-md text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: gear.description }}></p>
                  <br /><a href={gear.link} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors">
                    <img src="/equipments/external-link.svg" alt="" className="w-4 h-4" />
                    商品ページ(Amazon)
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