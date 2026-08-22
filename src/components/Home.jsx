import { Link } from 'react-router-dom';

const cardClass =
  'block rounded-xl overflow-hidden bg-white shadow-[6px_6px_0_0_#94a3b8] hover:shadow-[8px_8px_0_0_#64748b] transition-all duration-100';
const sectionClass = 'py-6 px-4 md:px-8 rounded-xl';
const gridClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
const headingClass = 'text-2xl md:text-3xl font-extrabold text-center text-slate-800';

const gameCards = [
  {
    to: '/japan',
    src: '/thumbnail/japan.png',
    title: '日本の47都道府県全部言えるかな？',
    description: '日本の全47都道府県を全て言えるか挑戦しよう！',
  },
  {
    to: '/tokyo',
    src: '/thumbnail/tokyo.webp',
    title: '東京都の市区町村全部言えるかな？',
    description: '東京都の全62市区町村を全て言えるか挑戦しよう！',
  },
  {
    to: '/monhan',
    src: '/thumbnail/monhan.png',
    title: 'モンハン歴代モンスター144種言えるかな？',
    description: 'モンハン歴代モンスター144種を全て言えるか挑戦しよう！',
  },
  {
    to: '/element',
    src: '/thumbnail/element.png',
    title: '周期表の元素全部言えるかな？',
    description: '周期表の全118元素を全て言えるか挑戦しよう！',
  },
];

const otherCards = [
  {
    to: '/equipments',
    src: '/thumbnail/equipments.webp',
    title: '使用機材リスト',
    description: 'ギターYoutubeの使用機材一覧です',
  },
  {
    to: '/mcp',
    src: '/thumbnail/mcp.webp',
    title: 'Minecraft Portfolio',
    description: 'Minecraft作品集 自分で眺める用',
  },
  {
    to: '/links',
    src: '/thumbnail/links.png',
    title: 'リンク',
    description: 'SNS等リンク集',
  },
];

const HomeCard = ({ to, src, title, description }) => (
  <Link to={to} className={cardClass}>
    <div className="w-full h-48 bg-slate-200 overflow-hidden">
      <img src={src} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  </Link>
);

const Home = () => {
  return (
    <main className="my-4 space-y-4 mx-1">
      {/* ウェルカムセクション */}
      <section className="bg-white py-8 px-4 md:px-8 rounded-xl shadow-lg" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 30px)'
      }}>
        <div className="bg-white py-8 px-4 md:px-8 rounded-xl shadow-lg">
          <img src="/Title.svg" alt="AIRONA-LAB" className="mx-auto mb-3 h-auto w-auto max-h-10 max-w-full" />
          <p className="text-center text-slate-400 text-xs md:text-sm mb-6">
            アイロナ ラボ
          </p>
          <p className="text-center text-slate-600 text-sm md:text-lg">
            ようこそ！自分用のソフトやゲームを作ってます。みなさんも使ってみてください！
          </p>
        </div>
      </section>

      {/* ゲーム一覧 */}
      <section className={sectionClass}>
        <div className="flex justify-between items-center mb-6">
          <Link to="/minigames" className={headingClass}>
            ゲーム
          </Link>
          <Link
            to="/minigames"
            className="text-xs md:text-lg text-zinc-800 bg-slate-100 rounded-full px-2 md:px-4 py-1 hover:bg-slate-200 transition-all duration-100"
          >
            すべて見る
          </Link>
        </div>

        <div className={gridClass}>
          {gameCards.map((card) => (
            <HomeCard key={card.to} {...card} />
          ))}
        </div>

      </section>

      <section className={sectionClass}>
        <div className="flex mb-6">
          <p className={headingClass}>
            その他
          </p>
        </div>
        <div className={gridClass}>
          {otherCards.map((card) => (
            <HomeCard key={card.to} {...card} />
          ))}
        </div>
      </section>

    </main>

  );
};

export default Home;
