import { useState, useEffect } from 'react';

const Header = ({ onMenuClick }) => {
  const [isLineVisible, setIsLineVisible] = useState(false);

  useEffect(() => {
    // ページ読み込み時にアンダーラインを表示
    setIsLineVisible(true);
  }, []);

  return (
    <header className="bg-cyan-900 text-slate-100 px-2 shadow-xs fixed top-0 left-0 right-0 z-50 w-full h-12 border-b-5 border-orange-300">
      <div className="flex items-center justify-between xl:justify-start h-full max-w-7xl mx-auto xl:max-w-none lg:px-2">
        {/* ハンバーガーメニューボタン（モバイル・タブレット用） */}
        <button
          onClick={onMenuClick}
          className="xl:hidden p-2 hover:bg-cyan-800 rounded-xl transition-all duration-200 active:scale-95 group"
          aria-label="メニューを開く"
        >
          <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentcolor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <a href="/" className="flex items-center group mr-3">
          <div className="relative">
            <h1 className="text-xl md:text-2xl font-bold italic drop-shadow-xl">
              AIRONA-LAB
            </h1>
            {/* <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-200 to-orange-300 transition-all duration-300 ${isLineVisible ? 'w-full' : 'w-0'}`}></div> */}
          </div>
        </a>
        <a href="https://www.youtube.com/@AironA" className="xl:hidden p-[3px] bg-slate-100 rounded-lg" >
          <img src="/thumbnail/youtube.svg" alt="YouTube" className="w-6 h-6" />
        </a>
      </div>
    </header>
  );
};

export default Header;