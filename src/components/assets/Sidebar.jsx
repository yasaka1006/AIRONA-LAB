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
        fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-gray-200 text-slate-800 py-4 z-50
        transform transition-transform duration-300 ease-in-out
        w-48 overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:z-40 shadow-xl
      `}
        style={{ marginTop: 0 }}
      >
        <nav>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="block hover:text-blue-700 transition cursor-pointer font-bold hover:bg-slate-300 px-4 py-2" onClick={onClose}>Home</Link>
            </li>
            <div className="block h-[2px] bg-slate-300 my-3 mx-4"></div>
            <li>
              <Link to="/minigames" className="block hover:text-blue-700 transition cursor-pointer font-bold hover:bg-slate-300 px-4 py-2" onClick={onClose}>ゲームリスト</Link>
            </li>
            <li>
              <Link to="/equipments" className="block hover:text-blue-700 transition cursor-pointer font-bold hover:bg-slate-300 px-4 py-2" onClick={onClose}>使用機材リスト</Link>
            </li>
            <li>
              <Link to="/mcp" className="block hover:text-blue-700 transition cursor-pointer font-bold hover:bg-slate-300 px-4 py-2" onClick={onClose}>Minecraft Portfolio</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;