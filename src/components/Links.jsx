const Links = () => {

  const links = [
    {
      title: 'YouTube Guitar ch',
      description: 'ギターを弾く人気チャンネル',
      url: 'https://www.youtube.com/@AironA',
      image: '/thumbnail/youtube.webp',
      icon: 'youtube.svg'
    },
    {
      title: 'YouTube Game ch',
      description: '主にマイクラなチャンネル',
      url: 'https://www.youtube.com/@AironA_mc',
      image: '/thumbnail/anya.jpg',
      icon: 'youtube.svg'
    },
    {
      title: 'YouTube Life ch',
      description: '車中泊など他の趣味チャンネル',
      url: 'https://www.youtube.com/@AironA_wint',
      image: '/thumbnail/life.jpg',
      icon: 'youtube.svg'
    },
    {
      title: 'X',
      description: '飯やギターをのせる',
      url: 'https://x.com/airona_guitar',
      image: '/thumbnail/x.jpg',
      icon: 'x.svg'
    },
    {
      title: 'Instagram',
      description: '飯やギターをのせる',
      url: 'https://www.instagram.com/aironauau/',
      image: '/thumbnail/instagram.jpg',
      icon: 'instagram.svg'
    },
    {
      title: 'mymusic5',
      description: 'ギターChの楽譜を販売してます',
      url: 'https://www.mymusicfive.com/AironA',
      image: '/thumbnail/mymusic52.png',
    },
    {
      title: 'AIRONA-LAB',
      description: 'ポータルサイト兼、クイズゲームWebアプリ',
      url: 'https://airona-lab.com/',
      image: '/thumbnail/lab.png',
    },
  ]

  const videoData = [
    {
      id: 1,
      title: "【TAB譜】シルエット KANA-BOON ギター 弾いてみた",
      url: "https://www.youtube.com/embed/Dc8bAgo4j70",
    },
    {
      id: 2,
      title: "【TAB譜】アイドル YOASOBI ギター 弾いてみた",
      url: "https://www.youtube.com/embed/FrqWEu2NVlw",
    },
    {
      id: 3,
      title: "【TAB譜】KICK BACK 米津玄師 ギター 弾いてみた",
      url: "https://www.youtube.com/embed/ov-6V7roDzg",
    },
  ];

  return (
    <>
      <main className="my-4 space-y-7 mx-2">
        {/* タイトルセクション */}
        <section className="bg-white w-90% sm:w-[500px] mx-auto rounded-xl shadow-lg pb-3">
          <div style={{ backgroundImage: "url('/equipments/deskBanner.jpg')" }} className="bg-cover bg-center bg-no-repeat rounded-xl">
            <p className="text-sm text-slate-300 text-center italic my-2 font-mono">Links</p>
            <img src="/thumbnail/youtube.webp" alt="あいろな" className="sm:w-30 sm:h-30 w-20 h-20 rounded-full object-cover mx-auto" />
            <h1 className="sm:text-2xl text-xl font-bold text-center text-slate-200 font-mono bg-black/50 py-2 my-2">
              AironA
            </h1>
          </div>

          {/* SNSセクション */}
          {links.map(link => (
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center group bg-gray-100 rounded-md my-4 px-2 py-1 relative mx-2">
              <img src={link.image} alt={link.title} className="border-2 border-slate-200 w-20 h-20 rounded-full object-cover group-hover:border-blue-400 group-hover:scale-108 transition-all duration-100" />
              <div className="ml-3 sm:ml-6">
                <h2 className="text-xl font-bold mb-2 text-slate-700 group-hover:text-blue-600 transition-all duration-100">
                  {link.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  {link.description}
                </p>
              </div>
              <div className="absolute bottom-1 right-1 bg-white rounded-full p-1.5 shadow-lg flex items-center gap-1 group-hover:bg-gray-200 transition-all duration-100">
                {link.icon && <img src={`/thumbnail/${link.icon}`} alt={link.icon} className="w-4 h-4 text-slate-600" />}
                <img src="/thumbnail/external-link.svg" alt="外部リンク" className="w-4 h-4 text-slate-600" />
              </div>
            </a>
          ))}

          <div className="my-8 border-t border-slate-200"></div>

          {/* 動画セクション */}
          {videoData.map(video => (
            <div className="w-full max-w-3xl mx-auto my-10 px-2">
              <h2 className="text-md font-bold mb-2 text-slate-700">
                {video.title}
              </h2>
              <div className="relative w-full aspect-video">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-md"
                  src={video.url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}

        </section>
      </main>
    </>
  );
};


export default Links;