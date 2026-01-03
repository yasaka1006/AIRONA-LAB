import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="mt-4 space-y-6 mx-2">
      {/* ウェルカムセクション */}
      <div className="bg-white py-8 px-4 md:px-8 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-3">
          ようこそAIRONA-LABへ
        </h1>
        <p className="text-center text-slate-600 text-sm md:text-lg">
          自分用ミニゲームを作ってます。みなさんもぜひ遊んでみてください！
        </p>
      </div>

      {/* ゲーム一覧 */}
      <div className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg">

        <div className="flex justify-center">
          <Link to="/minigames">
            <p className="text-2xl md:text-3xl font-bold text-center mb-6 text-slate-800">
              ミニゲーム
              <span className="text-blue-600 text-sm md:text-base">  一覧へ</span>
            </p>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 東京ゲーム */}
          <Link to="/tokyo" className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white">
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img src="/thumbnail/tokyo.webp" alt="東京都の市区町村全部言えるかな？" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-800 mb-2">東京都の市区町村全部言えるかな？</h3>
              <p className="text-sm text-slate-600">東京都の全62市区町村を全て言えるか挑戦しよう！</p>
            </div>
          </Link>

          {/* 埼玉ゲーム */}
          <Link to="/saitama" className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white">
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img src="/thumbnail/saitama.webp" alt="埼玉県の市区町村全部言えるかな？" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-800 mb-2">埼玉県の市区町村全部言えるかな？</h3>
              <p className="text-sm text-slate-600">埼玉県の全63市区町村を全て言えるか挑戦しよう！</p>
            </div>
          </Link>

          {/* 千葉ゲーム */}
          <Link to="/chiba" className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white">
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img src="/thumbnail/chiba.webp" alt="千葉県の市区町村全部言えるかな？" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-800 mb-2">千葉県の市区町村全部言えるかな？</h3>
              <p className="text-sm text-slate-600">千葉県の全54市区町村を全て言えるか挑戦しよう！</p>
            </div>
          </Link>

          {/* 都道府県ゲーム（準備中） */}
          <div className="rounded-xl shadow-md overflow-hidden opacity-60 bg-gray-100 p-4">
            <h3 className="text-lg font-bold text-slate-600 mb-2">47都道府県全部言えるかな？</h3>
            <p className="text-sm text-slate-500">日本の全47都道府県を全て言えるか挑戦しよう！</p>
            <div className="mt-3">
              <span className="inline-block bg-gray-300 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">準備中</span>
            </div>
          </div>

          {/* 世界の国名ゲーム（準備中） */}
          <div className="rounded-xl shadow-md overflow-hidden opacity-60 bg-gray-100 p-4">
            <h3 className="text-lg font-bold text-slate-600 mb-2">世界の国名全部言えるかな？</h3>
            <p className="text-sm text-slate-500">世界の国名を全て言えるか挑戦しよう！</p>
            <div className="mt-3">
              <span className="inline-block bg-gray-300 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">準備中</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile */}
      <div className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg mb-4">
        <h2 className='text-2xl md:text-3xl font-bold text-center mb-4 text-slate-800'>Profile</h2>
        <div className='text-center text-slate-600 mb-8'>
          <p>あいろなです。このサイトはほぼCursorに書かせました。趣味:🍔🎸🎮️⛺️🏂️</p>
        </div>
        <div className='border-2 border-slate-200 rounded-xl p-4'>

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-800">
            Links
          </h2>
          <div className="grid grid-cols-3 gap-5 md:gap-10">
            {/* ギターチャンネル */}
            <a
              href="https://www.youtube.com/@AironA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-3">
                <div className="w-full h-full rounded-full overflow-hidden shadow-lg ring-2 ring-slate-200 group-hover:ring-blue-500 transition-all duration-300">
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
              <p className="text-sm md:text-base font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                あいろな Youtube
              </p>
              <p className="text-slate-500 hidden md:block text-[13px]">TAB付きでギター弾いてる人気チャンネル</p>
            </a>


            {/* X (Twitter) */}
            <a
              href="https://x.com/airona_guitar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-3">
                <div className="w-full h-full rounded-full overflow-hidden shadow-lg ring-2 ring-slate-200 group-hover:ring-blue-500 transition-all duration-300">
                  <img
                    src="/thumbnail/x.jpg"
                    alt="AironA X"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Xアイコンと矢印 */}
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg flex items-center gap-1">
                  <img src="/thumbnail/x.svg" alt="X" className="w-4 h-4 text-black" />
                  <img src="/thumbnail/external-link.svg" alt="外部リンク" className="w-3 h-3 text-slate-600" />
                </div>
              </div>
              <p className="text-sm md:text-base font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                あいろな X
              </p>
              <p className="text-slate-500 hidden md:block text-[13px]">飯やギター</p>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/aironauau"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-3">
                <div className="w-full h-full rounded-full overflow-hidden shadow-lg ring-2 ring-slate-200 group-hover:ring-blue-500 transition-all duration-300">
                  <img
                    src="/thumbnail/instagram.jpg"
                    alt="AironA Instagram"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Instagramアイコンと矢印 */}
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg flex items-center gap-1">
                  <img src="/thumbnail/instagram.svg" alt="Instagram" className="w-4 h-4 text-pink-600" />
                  <img src="/thumbnail/external-link.svg" alt="外部リンク" className="w-3 h-3 text-slate-600" />
                </div>
              </div>
              <p className="text-sm md:text-base font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                あいろな Instagram
              </p>
              <p className="text-slate-500 hidden md:block text-[13px]">キャンプやギター</p>
            </a>

            {/* MCチャンネル */}
            <a
              href="https://www.youtube.com/@AironA_mc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-3">
                <div className="w-full h-full rounded-full overflow-hidden shadow-lg ring-2 ring-slate-200 group-hover:ring-blue-500 transition-all duration-300">
                  <img
                    src="/thumbnail/anya.jpg"
                    alt="AironA MCチャンネル"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* YouTubeアイコンと矢印 */}
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg flex items-center gap-1">
                  <img src="/thumbnail/youtube.svg" alt="YouTube" className="w-4 h-4 text-red-600" />
                  <img src="/thumbnail/external-link.svg" alt="外部リンク" className="w-3 h-3 text-slate-600" />
                </div>
              </div>
              <p className="text-sm md:text-base font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                AironA MC
              </p>
              <p className="text-slate-500 hidden md:block text-[13px]">主にマイクラ</p>

            </a>

            {/* ライフチャンネル */}
            <a
              href="https://www.youtube.com/@AironA_wint"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-3">
                <div className="w-full h-full rounded-full overflow-hidden shadow-lg ring-2 ring-slate-200 group-hover:ring-blue-500 transition-all duration-300">
                  <img
                    src="/thumbnail/life.jpg"
                    alt="AironA ライフチャンネル"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* YouTubeアイコンと矢印 */}
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg flex items-center gap-1">
                  <img src="/thumbnail/youtube.svg" alt="YouTube" className="w-4 h-4 text-red-600" />
                  <img src="/thumbnail/external-link.svg" alt="外部リンク" className="w-3 h-3 text-slate-600" />
                </div>
              </div>
              <p className="text-sm md:text-base font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                あいろなLIFE
              </p>
              <p className="text-slate-500 hidden md:block text-[13px]">キャンプ・車中泊</p>
            </a>

          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-7">
          <a href="https://www.mymusicfive.com/AironA" className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white">
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img src="/thumbnail/music5.webp" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-800 mb-2">mymusic5</h3>
              <p className="text-sm text-slate-600">ギターChで作った楽譜を販売してます（外部ページ）</p>
            </div>
          </a>
          <a href="/mcp" className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white">
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img src="/thumbnail/mcp.webp" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-800 mb-2">Minecraft Portfolio</h3>
              <p className="text-sm text-slate-600">マイクラ作品集 自分で眺める用</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;