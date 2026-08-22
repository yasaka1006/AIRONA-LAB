import { Link } from 'react-router-dom';

const isJapanese = (navigator.languages?.[0] ?? navigator.language ?? '')
  .toLowerCase()
  .startsWith('ja');

const menuLabels = isJapanese
  ? { home: 'ホーム', games: 'ゲーム', openMenu: 'メニューを開く' }
  : { home: 'Home', games: 'Games', openMenu: 'Open menu' };

const menuItems =
  'font-bold text-md text-gray-500 hover:text-gray-700 transition-colors duration-100 hover:bg-slate-300 rounded-full py-2 px-4';

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-slate-200 text-slate-100 px-2 shadow-xs fixed top-0 left-0 right-0 z-50 w-full h-12">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto xl:max-w-none lg:px-2 xl:px-100">
        <button
          onClick={onMenuClick}
          className="xl:hidden p-2 hover:bg-slate-300 rounded-xl transition-all duration-200 active:scale-95 group text-slate-700"
          aria-label={menuLabels.openMenu}
        >
          <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-6 xl:gap-10">
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <h1 className="sr-only">AIRONA-LAB</h1>
              <img src="/Title.svg?v=2" alt="AIRONA-LAB" className="h-4 w-auto drop-shadow-md" />
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-6">
            <Link to="/" className={menuItems}>
              {menuLabels.home}
            </Link>
            <Link to="/minigames" className={menuItems}>
              {menuLabels.games}
            </Link>
          </div>
        </div>

        {/* モバイル時のレイアウトバランス用 */}
        <div className="w-10 xl:hidden" aria-hidden="true" />
      </div>
    </header>
  );
};

export default Header;
