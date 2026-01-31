import { Link } from 'react-router-dom';

const GameSection = ({ title, games }) => {
  return (
    <>
      <h3 className="text-2xl my-4 font-bold text-slate-800 bg-gradient-to-r from-green-300 to-cyan-100 rounded-full py-2 px-10 shadow-sm">
        {title}
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 md:gap-8 p-4">
        {games.map((game) => (
          <Link
            key={game.link}
            to={game.link}
            className="group blockshadow-md overflow-hidden hover:scale-110 transition-all duration-100 bg-white"
          >
            <div className="bg-slate-100 rounded-full overflow-hidden shadow-md">
              <img src="/thumbnail/nihonchizu.png" alt={game.title} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-md font-bold text-slate-800 text-center group-hover:text-blue-600 transition-all duration-100">{game.title}</h3>
            <p className="text-sm text-slate-600 text-center">{game.description}</p>
          </Link>
        ))}
      </div>
    </>
  )
}

const Minigames = () => {

  const worldGames = [
    {
      title: '日本47都道府県',
      link: '/japan',
      description: '47 地区',
    },
  ]

  const kantoGames = [
    {
      title: '東京都',
      link: '/tokyo',
      description: '62 地区',
    },
    {
      title: '埼玉県',
      link: '/saitama',
      description: '63 地区',
    },
    {
      title: '神奈川県',
      link: '/kanagawa',
      description: '33 地区',
    },
    {
      title: '千葉県',
      link: '/chiba',
      description: '54 地区',
    },
    {
      title: '群馬県',
      link: '/gunma',
      description: '35 地区',
    },
    {
      title: '栃木県',
      link: '/tochigi',
      description: '25 地区',
    },
    {
      title: '茨城県',
      link: '/ibaraki',
      description: '44 地区',
    },
  ]

  const chubuGames = [
    {
      title: '山梨県',
      link: '/yamanashi',
      description: '27 地区',
    },
    {
      title: '静岡県',
      link: '/shizuoka',
      description: '35 地区',
    },
  ]

  const gameSections = [
    { id: 'world', title: '国 / 世界', games: worldGames },
    { id: 'kanto', title: '関東地方 / 日本', games: kantoGames },
    { id: 'chubu', title: '中部地方 / 日本', games: chubuGames },
  ]


  return (
    <>
      <h1 className="text-3xl font-extrabold text-slate-800 text-center my-4">
        クイズ&ゲーム
      </h1>
      
      <Link to="/monhan" className="group">
        <section className="shadow-lg mx-2 my-4 mb-8 rounded-xl">
          <div className="flex flex-col md:flex-row overflow-hidden bg-gradient-to-br from-slate-50 to-white rounded-xl">
            <img
              src="/thumbnail/monhan.png"
              alt="モンハン 歴代モンスター144種言えるかな？"
              className="w-full md:w-[42%] aspect-[16/10] object-cover"
            />
            <div className="flex flex-col justify-center gap-2 p-5 md:p-7">
              <p className="w-fit rounded-full bg-slate-900 text-white text-xs font-bold tracking-wider px-3 py-1">
                MONHAN TYPING
              </p>
              <h3 className="text-xl md:text-2xl font-extrabold text-blue-500 leading-snug group-hover:text-blue-600 group-hover:scale-103 transition-all duration-100 bg-slate-100 p-3">
                ▶モンハン 歴代モンスター144種言えるかな？
              </h3>
              <p className="text-xs md:text-base text-slate-600 leading-relaxed">
                モンハンの歴代大型モンスターを答えるクイズゲーム。<br />正解するたびにモンスターが出現します。原種のみ。
              </p>
            </div>
          </div>
        </section>
      </Link>

      <Link to="/element" className="group">
        <section className="shadow-lg mx-2 my-4 mb-8 rounded-xl">
          <div className="flex flex-col md:flex-row overflow-hidden bg-gradient-to-br from-slate-50 to-white rounded-xl">
            <img
              src="/thumbnail/element.png"
              alt="周期表タイピング"
              className="w-full md:w-[42%] aspect-[16/10] object-cover"
            />
            <div className="flex flex-col justify-center gap-2 p-5 md:p-7">
              <p className="w-fit rounded-full bg-slate-900 text-white text-xs font-bold tracking-wider px-3 py-1">
                ELEMENTS TYPING
              </p>
              <h3 className="text-xl md:text-2xl font-extrabold text-blue-500 leading-snug group-hover:text-blue-600 group-hover:scale-103 transition-all duration-100 bg-slate-100 p-3">
                ▶周期表の元素全部言えるかな？
              </h3>
              <p className="text-xs md:text-base text-slate-600 leading-relaxed">
                周期表の元素を答えるクイズゲーム。<br />正解するたびに元素が出現します。
              </p>
            </div>
          </div>
        </section>
      </Link>

      <section className="bg-white px-4 md:px-8 shadow-lg mx-2 my-4 border-2 border-slate-200 pb-4">
        <div className="flex flex-col md:flex-row overflow-hidden py-4">
          <img src="/thumbnail/japan2.png" alt="日本の47都道府県全部言えるかな？" className="w-[42%] aspect-[16/10] object-cover shadow-lg rounded-xl hidden lg:block" />
          <div className="flex flex-col justify-center gap-2 p-5 md:p-7">
            <p className="w-fit rounded-full bg-slate-900 text-white text-xs font-bold tracking-wider px-3 py-1">
              MAP TYPING
            </p>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-snug">
              地区名をタイピングして、白地図を完成させよう
            </h3>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              言えるかな？系の地図版ゲーム。<br />正解するたびに地図が埋まっていく、暗記タイピングゲーム。
            </p>
          </div>
        </div>

        {gameSections.map((section) => (
          <GameSection key={section.id} title={section.title} games={section.games} />
        ))}
      </section>
    </>
  )
}

export default Minigames