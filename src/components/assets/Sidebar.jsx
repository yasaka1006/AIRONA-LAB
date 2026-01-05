import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* オーバーレイ（モバイル・タブレット用） */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[50] lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* サイドバー */}
      <div className={`
        fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-gray-200 text-slate-800 p-5 z-50
        transform transition-transform duration-300 ease-in-out
        w-48 overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:z-40 shadow-xl
      `}
      style={{ marginTop: 0 }}
      >
        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/" className="block hover:text-blue-700 transition cursor-pointer font-bold" onClick={onClose}>ホーム</Link>
            </li>
            <span className="block h-px bg-slate-300 my-4"></span>
            <li>
              <Link to="/minigames" className="block hover:text-blue-700 transition cursor-pointer font-bold" onClick={onClose}>ミニゲーム一覧</Link>
            </li>
            <li>
              <Link to="/tokyo" className="block hover:text-blue-700 transition cursor-pointer font-bold" onClick={onClose}>東京都の市区町村全部言えるかな？</Link>
            </li>
            <li>
              <Link to="/saitama" className="block hover:text-blue-700 transition cursor-pointer font-bold" onClick={onClose}>埼玉県の市区町村全部言えるかな？</Link>
            </li>
            <li>
              <Link to="/chiba" className="block hover:text-blue-700 transition cursor-pointer font-bold" onClick={onClose}>千葉県の市区町村全部言えるかな？</Link>
            </li>
            <li>
              <Link to="/gunma" className="block hover:text-blue-700 transition cursor-pointer font-bold" onClick={onClose}>群馬県の市区町村全部言えるかな？</Link>
            </li>
            <li>
              <Link to="/tochigi" className="block hover:text-blue-700 transition cursor-pointer font-bold" onClick={onClose}>栃木県の市区町村全部言えるかな？</Link>
            </li>
            <li>
              <Link to="/kanagawa" className="block hover:text-blue-700 transition cursor-pointer font-bold" onClick={onClose}>神奈川県の市区町村全部言えるかな？</Link>
            </li>
            <li>
              <Link to="/ibaraki" className="block hover:text-blue-700 transition cursor-pointer font-bold" onClick={onClose}>茨城県の市区町村全部言えるかな？</Link>
            </li>
            <li>
              <Link to="/yamanashi" className="block hover:text-blue-700 transition cursor-pointer font-bold" onClick={onClose}>山梨県の市区町村全部言えるかな？</Link>
            </li>
            <li>
              <Link to="/shizuoka" className="block hover:text-blue-700 transition cursor-pointer font-bold" onClick={onClose}>静岡県の市区町村全部言えるかな？</Link>
            </li>
            <span className="block h-px bg-slate-300 my-4"></span>
            <li>
              <Link to="/equipments" className="block hover:text-blue-700 transition cursor-pointer font-bold" onClick={onClose}>使用機材リスト</Link>
            </li>
            <li>
              <Link to="/mcp" className="block hover:text-blue-700 transition cursor-pointer font-bold" onClick={onClose}>Minecraft Portfolio</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;