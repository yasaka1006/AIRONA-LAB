import { Link } from 'react-router-dom';

const Minigames = () => {

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



  return (
    <>
      <section className="bg-white py-6 px-4 md:px-8 rounded-xl shadow-lg mx-2 my-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-slate-800">
          地図穴埋めゲーム
        </h2>

        {/* 関東 */}
        <h3 className="text-2xl mt-4 mb-2 font-bold text-slate-800 bg-gradient-to-r from-green-300 to-cyan-100 rounded-full py-2 mx-auto w-fit px-10">関東地方</h3>
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-8 border-2 border-slate-200 rounded-3xl p-4">
          {kantoGames.map((game) => (
            <Link to={game.link} className="group blockshadow-md overflow-hidden hover:scale-110 transition-all duration-100 bg-white">
              <div className="bg-slate-100 rounded-full overflow-hidden">
                <img src="/thumbnail/nihonchizu.png" alt={game.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-md font-bold text-slate-800 text-center group-hover:text-blue-600 transition-all duration-100">{game.title}</h3>
              <p className="text-sm text-slate-600 text-center">{game.description}</p>
            </Link>
          ))}
        </div>

        {/* 中部 */}
        <h3 className="text-2xl mt-4 mb-2 font-bold text-slate-800 bg-gradient-to-r from-green-300 to-cyan-100 rounded-full py-2 mx-auto w-fit px-10">中部地方</h3>
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-8 border-2 border-slate-200 rounded-3xl p-4">
          {chubuGames.map((game) => (
            <Link to={game.link} className="group blockshadow-md overflow-hidden hover:scale-110 transition-all duration-100 bg-white">
              <div className="bg-slate-100 rounded-full overflow-hidden">
                <img src="/thumbnail/nihonchizu.png" alt={game.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-md font-bold text-slate-800 text-center group-hover:text-blue-600 transition-all duration-100">{game.title}</h3>
              <p className="text-sm text-slate-600 text-center">{game.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default Minigames