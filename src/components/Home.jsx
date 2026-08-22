import { useRef } from 'react';
import { Link } from 'react-router-dom';

const cardClass =
  'block rounded-xl overflow-hidden bg-white shadow-[6px_6px_0_0_#94a3b8] hover:shadow-[8px_8px_0_0_#64748b] transition-all duration-100';
const sectionClass = 'py-6 px-4 md:px-8 rounded-xl';
const gridClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
const carouselItemClass =
  'flex-shrink-0 w-[44%] md:w-[31%] snap-start';
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
  <Link to={to} className={`${cardClass} h-full`}>
    <div className="w-full h-40 md:h-48 bg-slate-200 overflow-hidden">
      <img src={src} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-3 md:p-4">
      <h3 className="text-sm md:text-lg font-bold text-slate-800 mb-1 md:mb-2 line-clamp-2">{title}</h3>
      <p className="text-xs md:text-sm text-slate-600 line-clamp-2">{description}</p>
    </div>
  </Link>
);

const carouselArrowClass =
  'absolute top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 md:h-11 md:w-11 items-center justify-center rounded-full bg-white text-slate-800 border border-slate-800 shadow-[3px_3px_0_0_#94a3b8] md:shadow-[4px_4px_0_0_#94a3b8] hover:bg-slate-50 hover:shadow-[4px_4px_0_0_#64748b] md:hover:shadow-[5px_5px_0_0_#64748b] active:shadow-[2px_2px_0_0_#94a3b8] md:active:shadow-[3px_3px_0_0_#94a3b8] transition-all duration-100';
const carouselArrowIconClass = 'w-4 h-4 md:w-5 md:h-5';

const HorizontalCardRow = ({ cards }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scroll(-1)}
        className={`${carouselArrowClass} -left-5 md:-left-10`}
        aria-label="前へ"
      >
        <svg className={carouselArrowIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        className={`${carouselArrowClass} -right-5 md:-right-10`}
        aria-label="次へ"
      >
        <svg className={carouselArrowIconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 md:-mx-8 md:px-8 scroll-ps-4 scroll-pe-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card) => (
          <div key={card.to} className={carouselItemClass}>
            <HomeCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <main className="my-4 space-y-4 mx-1">
      {/* ウェルカムセクション */}
      <section className="bg-white py-8 px-4 md:px-8 rounded-xl shadow-lg" style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent 0px,
          transparent 10px,
          rgba(148, 163, 184, 0.18) 10px,
          rgba(148, 163, 184, 0.18) 30px,
          transparent 30px,
          transparent 40px,
          rgba(251, 146, 60, 0.18) 40px,
          rgba(251, 146, 60, 0.18) 60px,
          transparent 60px,
          transparent 70px,
          rgba(34, 211, 238, 0.18) 70px,
          rgba(34, 211, 238, 0.18) 90px
        )`,
      }}>
        <div className="bg-zinc-50 py-8 px-4 md:px-8 rounded-xl shadow-lg">
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

        <HorizontalCardRow cards={gameCards} />

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
