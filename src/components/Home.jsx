import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="my-4 space-y-4 mx-1">
      {/* ウェルカムセクション */}
      <section className="bg-white py-8 px-4 md:px-8 rounded-xl shadow-lg" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 30px)'
      }}>
        <div className="bg-white py-8 px-4 md:px-8 rounded-xl shadow-lg">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-slate-800 mb-3">
            ようこそ！<span className="text-cyan-600 hover:text-cyan-700 transition-all duration-300">A</span>IRON<span className="text-orange-400 hover:text-orange-500 transition-all duration-300">A</span>-LABへ
          </h1>
          <p className="text-center text-slate-600 text-sm md:text-lg">
            自分用ゲームとか作ってます。みなさんもぜひ遊んでみてください！
          </p>
        </div>
      </section>

      {/* ゲーム一覧 */}
      <section className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg">
        <div className="flex justify-center">
          <Link to="/minigames">
            <p className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-slate-800">
              クイズ&ゲーム
            </p>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 都道府県ゲーム */}
          <Link
            to="/japan"
            className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-100 bg-white"
          >
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img
                src="/thumbnail/japan.png"
                alt="東京都の市区町村全部言えるかな？"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                日本の47都道府県全部言えるかな？
              </h3>
              <p className="text-sm text-slate-600">
                日本の全47都道府県を全て言えるか挑戦しよう！
              </p>
            </div>
          </Link>

          {/* 東京ゲーム */}
          <Link
            to="/tokyo"
            className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-100 bg-white"
          >
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img
                src="/thumbnail/tokyo.webp"
                alt="東京都の市区町村全部言えるかな？"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                東京都の市区町村全部言えるかな？
              </h3>
              <p className="text-sm text-slate-600">
                東京都の全62市区町村を全て言えるか挑戦しよう！
              </p>
            </div>
          </Link>

          {/* モンハンゲーム */}
          <Link
            to="/monhan"
            className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-100 bg-white"
          >
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img
                src="/thumbnail/monhan.png"
                alt="周期表の元素全部言えるかな？"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                モンハン歴代モンスター144種言えるかな？
              </h3>
              <p className="text-sm text-slate-600">
                モンハン歴代モンスター144種を全て言えるか挑戦しよう！
              </p>
            </div>
          </Link>

          {/* 周期表ゲーム */}
          <Link
            to="/element"
            className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-100 bg-white"
          >
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img
                src="/thumbnail/element.png"
                alt="周期表の元素全部言えるかな？"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                周期表の元素全部言えるかな？
              </h3>
              <p className="text-sm text-slate-600">
                周期表の全118元素を全て言えるか挑戦しよう！
              </p>
            </div>
          </Link>

        </div>
        <div className="flex justify-end mt-4">
          <a href="/minigames" className="text-md text-blue-600 hover:text-blue-800">すべてみる</a>
        </div>
      </section>

      <section className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg">
        <div className="flex justify-center">

          <p className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-slate-800">
            その他
          </p>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <Link
            to="/equipments"
            className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-100 bg-white"
          >
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img
                src="/thumbnail/equipments.webp"
                alt="使用機材リスト"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                使用機材リスト
              </h3>
              <p className="text-sm text-slate-600">
                ギターYoutubeの使用機材一覧です
              </p>
            </div>
          </Link>
          <Link to="/mcp"
            className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-100 bg-white"
          >
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img
                src="/thumbnail/mcp.webp"
                alt="Minecraft Portfolio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Minecraft Portfolio
              </h3>
              <p className="text-sm text-slate-600">
                Minecraft作品集 自分で眺める用
              </p>
            </div>
          </Link>
          <Link
            to="/links"
            className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-100 bg-white"
          >
            <div className="w-full h-48 bg-slate-200 overflow-hidden">
              <img
                src="/thumbnail/links.png"
                alt="Links"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                リンク
              </h3>
              <p className="text-sm text-slate-600">
                SNS等リンク集
              </p>
            </div>
          </Link>

        </div>
      </section>

    </main>

  );
};

export default Home;