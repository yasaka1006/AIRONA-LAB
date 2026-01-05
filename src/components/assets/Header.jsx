import { useState, useEffect } from 'react';

const Header = ({ onMenuClick }) => {
  const [isLineVisible, setIsLineVisible] = useState(false);

  useEffect(() => {
    // ページ読み込み時にアンダーラインを表示
    setIsLineVisible(true);
  }, []);

  return (
    <header className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white py-3 px-4 md:px-8 shadow-lg border-b border-slate-600/50 fixed top-0 left-0 right-0 z-50 w-full h-16 backdrop-blur-sm">
      <div className="flex items-center justify-between lg:justify-start h-full max-w-7xl mx-auto lg:max-w-none lg:mx-0 lg:px-8">
        {/* ハンバーガーメニューボタン（モバイル・タブレット用） */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-slate-600/50 rounded-lg transition-all duration-200 active:scale-95 group"
          aria-label="メニューを開く"
        >
          <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <a href="/" className="flex items-center group">
          <div className="relative">
            <h1 className="text-2xl md:text-3xl font-bold italic bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent drop-shadow-lg transition-all duration-300 pr-2">
              AIRONA-LAB
            </h1>
            <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-200 to-orange-300 transition-all duration-300 ${isLineVisible ? 'w-full' : 'w-0'}`}></div>
          </div>
        </a>
        {/* 右側のスペーサー（モバイルでハンバーガーボタンとタイトルのバランスを取る） */}
        <div className="lg:hidden w-10"></div>
      </div>
    </header>
  );
};

export default Header;