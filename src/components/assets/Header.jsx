const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-slate-700 text-white py-2 px-2 md:px-8 shadow-md fixed top-0 left-0 right-0 z-51 w-full h-14">
      <div className="flex items-center gap-4 h-full">
        {/* ハンバーガーメニューボタン（モバイル・タブレット用） */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1 hover:bg-slate-600 rounded transition"
          aria-label="メニューを開く"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <a href="/">
          <h1 className="text-2xl font-bold italic drop-shadow-xl">AIRONA-LAB</h1>
        </a>
      </div>
    </header>
  );
};
export default Header;