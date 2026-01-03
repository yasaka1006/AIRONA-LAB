import { Link } from 'react-router-dom';

const Minigames = () => {
  return (
    <>
      <div className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg mx-2 my-2">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-slate-800">
          ミニゲーム一覧
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 東京ゲーム */}
          <Link to="/tokyo" className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white">
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img src="/thumbnail/tokyo.png" alt="東京都の市区町村全部言えるかな？" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-800 mb-2">東京都の市区町村全部言えるかな？</h3>
              <p className="text-sm text-slate-600">東京都の全62市区町村を全て言えるか挑戦しよう！</p>
            </div>
          </Link>

            {/* 埼玉ゲーム */}
            <Link to="/saitama" className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white">
              <div className="w-full h-48 bg-slate-200 overflow-hidden">
                <img src="/thumbnail/saitama.png" alt="埼玉県の市区町村全部言えるかな？" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-slate-800 mb-2">埼玉県の市区町村全部言えるかな？</h3>
                <p className="text-sm text-slate-600">埼玉県の全63市区町村を全て言えるか挑戦しよう！</p>
              </div>
            </Link>

          {/* 千葉ゲーム */}
          <Link to="/chiba" className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white">
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img src="/thumbnail/chiba.png" alt="千葉県の市区町村全部言えるかな？" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-slate-800 mb-2">千葉県の市区町村全部言えるかな？</h3>
                <p className="text-sm text-slate-600">千葉県の全54市区町村を全て言えるか挑戦しよう！</p>
              </div>
          </Link>

          <Link to="/gunma" className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white">
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img src="/thumbnail/gunma.png" alt="群馬県の市区町村全部言えるかな？" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-slate-800 mb-2">群馬県の市区町村全部言えるかな？</h3>
                <p className="text-sm text-slate-600">群馬県の全35市区町村を全て言えるか挑戦しよう！</p>
              </div>
          </Link>

          <Link to="/tochigi" className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white">
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img src="/thumbnail/tochigi.png" alt="栃木県の市区町村全部言えるかな？" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-slate-800 mb-2">栃木県の市区町村全部言えるかな？</h3>
                <p className="text-sm text-slate-600">栃木県の全25市区町村を全て言えるか挑戦しよう！</p>
              </div>
          </Link>

          <Link to="/kanagawa" className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white">
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img src="/thumbnail/kanagawa.png" alt="神奈川県の市区町村全部言えるかな？" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-slate-800 mb-2">神奈川県の市区町村全部言えるかな？</h3>
                <p className="text-sm text-slate-600">神奈川県の全33市区町村を全て言えるか挑戦しよう！</p>
              </div>
          </Link>

          <Link to="/ibaraki" className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white">
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img src="/thumbnail/ibaraki.png" alt="茨城県の市区町村全部言えるかな？" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-slate-800 mb-2">茨城県の市区町村全部言えるかな？</h3>
                <p className="text-sm text-slate-600">茨城県の全44市区町村を全て言えるか挑戦しよう！</p>
              </div>
          </Link>

          <Link to="/yamanashi" className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white">
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img src="/thumbnail/yamanashi.png" alt="山梨県の市区町村全部言えるかな？" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-slate-800 mb-2">山梨県の市区町村全部言えるかな？</h3>
                <p className="text-sm text-slate-600">山梨県の全22市区町村を全て言えるか挑戦しよう！</p>
              </div>
          </Link>
          
          <Link to="/shizuoka" className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white">
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img src="/thumbnail/shizuoka.png" alt="静岡県の市区町村全部言えるかな？" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-slate-800 mb-2">静岡県の市区町村全部言えるかな？</h3>
                <p className="text-sm text-slate-600">静岡県の全53市区町村を全て言えるか挑戦しよう！</p>
              </div>
          </Link>

          {/* 都道府県ゲーム（準備中）
          <div className="rounded-xl shadow-md overflow-hidden opacity-60 bg-gray-100 p-4">
            <h3 className="text-lg font-bold text-slate-600 mb-2">47都道府県全部言えるかな？</h3>
            <p className="text-sm text-slate-500">日本の全47都道府県を全て言えるか挑戦しよう！</p>
            <div className="mt-3">
              <span className="inline-block bg-gray-300 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">準備中</span>

            </div>
          </div> */}

        </div>
      </div>
    </>
  )
}

export default Minigames