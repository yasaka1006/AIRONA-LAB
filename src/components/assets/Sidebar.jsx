import { Link } from 'react-router-dom';

const isJapanese = (navigator.languages?.[0] ?? navigator.language ?? '')
  .toLowerCase()
  .startsWith('ja');

const labels = isJapanese
  ? {
      home: 'ホーム',
      games: 'ゲーム',
      ranking: 'ランキング',
      equipments: '使用機材リスト',
      mcp: 'Minecraft Portfolio',
      links: 'リンク',
      close: 'メニューを閉じる',
    }
  : {
      home: 'Home',
      games: 'Games',
      ranking: 'Ranking',
      equipments: 'Equipment',
      mcp: 'Minecraft Portfolio',
      links: 'Links',
      close: 'Close menu',
    };

const menuItemClass =
  'block font-bold text-gray-600 hover:text-gray-800 hover:bg-slate-300 rounded-md px-4 py-3 transition-colors duration-100';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[49] xl:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <nav
        className={`
          fixed top-12 left-0 h-[calc(100vh-3rem)] w-56 bg-slate-200 text-slate-800 py-4 z-50
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          xl:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-hidden={!isOpen}
      >
        <div className="space-y-1 px-2">
          <Link to="/" className={menuItemClass} onClick={onClose}>
            {labels.home}
          </Link>
          <Link to="/minigames" className={menuItemClass} onClick={onClose}>
            {labels.games}
          </Link>
          <Link to="/ranking" className={menuItemClass} onClick={onClose}>
            {labels.ranking}
          </Link>
          <div className="h-[2px] bg-slate-300 my-3 mx-2" />
          <Link to="/equipments" className={menuItemClass} onClick={onClose}>
            {labels.equipments}
          </Link>
          <Link to="/mcp" className={menuItemClass} onClick={onClose}>
            {labels.mcp}
          </Link>
          <Link to="/links" className={menuItemClass} onClick={onClose}>
            {labels.links}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
