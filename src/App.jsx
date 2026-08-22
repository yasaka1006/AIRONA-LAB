import { useState, useEffect } from 'react'
import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/assets/Header';
import Sidebar from './components/assets/Sidebar';
import ScrollToTop from './components/assets/ScrollToTop';
import Footer from './components/assets/Footer';
import Mcp from './components/Mcp';
import Equipments from './components/Equipments';
import Links2 from './components/Links';
import ViewTop from './components/assets/ViewTop';
import PrivacyPolicy from './components/PrivacyPolicy';
import Minigames from './components/Minigames';
import Ranking from './components/Ranking';

const Tokyo = lazy(() => import('./components/minigames/Tokyo'));
const Saitama = lazy(() => import('./components/minigames/Saitama'));
const Chiba = lazy(() => import('./components/minigames/Chiba'));
const Tochigi = lazy(() => import('./components/minigames/Tochigi'));
const Yamanashi = lazy(() => import('./components/minigames/Yamanashi'));
const Gunma = lazy(() => import('./components/minigames/Gunma'));
const Shizuoka = lazy(() => import('./components/minigames/Shizuoka'));
const Kanagawa = lazy(() => import('./components/minigames/Kanagawa'));
const Ibaraki = lazy(() => import('./components/minigames/Ibaraki'));
const Japan = lazy(() => import('./components/minigames/Japan'));

const Element = lazy(() => import('./components/minigames/Element'));
const Monhan = lazy(() => import('./components/minigames/Monhan'));

const PAGE_TITLES = {
  '/': 'AIRONA-LAB',
  '/equipments': '使用機材リスト - AIRONA-LAB',
  '/ranking': 'ランキング - AIRONA-LAB',
  '/tokyo': '東京都の市区町村全部言えるかな？ - AIRONA-LAB',
  '/saitama': '埼玉クイズ - AIRONA-LAB',
  '/chiba': '千葉県の市町村全部言えるかな？ - AIRONA-LAB',
  '/tochigi': '栃木県の市町村全部言えるかな？ - AIRONA-LAB',
  '/kanagawa': '神奈川県の市町村全部言えるかな？ - AIRONA-LAB',
  '/yamanashi': '山梨県の市町村全部言えるかな？ - AIRONA-LAB',
  '/gunma': '群馬県の市町村全部言えるかな？ - AIRONA-LAB',
  '/shizuoka': '静岡県の市町村全部言えるかな？ - AIRONA-LAB',
  '/ibaraki': '茨城県の市町村全部言えるかな？ - AIRONA-LAB',
  '/element': '周期表の元素全部言えるかな？ - AIRONA-LAB',
  '/monhan': 'モンハン歴代モンスター144種言えるかな？ - AIRONA-LAB',
};

function App() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const title = PAGE_TITLES[location.pathname] ?? 'AIRONA-LAB';
    document.title = title;
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <ViewTop />
      <div className="bg-slate-50 min-h-screen text-slate-800 flex flex-col font-mplus1">
        <Header onMenuClick={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <div className="flex pt-12 flex-1">
          <div className="w-full flex-1">
            <div className="w-full max-w-6xl mx-auto md:main-content-centered px-2">
              <Suspense fallback={<div className="flex justify-center items-center min-h-screen font-bold">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/links" element={<Links2 />} />
                  <Route path="/minigames" element={<Minigames />} />
                  <Route path="/equipments" element={<Equipments />} />
                  <Route path="/mcp" element={<Mcp />} />
                  <Route path="/tokyo" element={<Tokyo />} />
                  <Route path="/saitama" element={<Saitama />} />
                  <Route path="/chiba" element={<Chiba />} />
                  <Route path="/tochigi" element={<Tochigi />} />
                  <Route path="/kanagawa" element={<Kanagawa />} />
                  <Route path="/yamanashi" element={<Yamanashi />} />
                  <Route path="/gunma" element={<Gunma />} />
                  <Route path="/shizuoka" element={<Shizuoka />} />
                  <Route path="/ibaraki" element={<Ibaraki />} />
                  <Route path="/element" element={<Element />} />
                  <Route path="/ranking" element={<Ranking />} />
                  <Route path="/japan" element={<Japan />} />
                </Routes>
              </Suspense>
            </div>
            <div className="w-full max-w-full lg:max-w-[93%] mx-auto px-2 sm:px-4 min-w-0 overflow-x-clip">
              <Suspense fallback={<div className="flex justify-center items-center min-h-screen font-bold">Loading...</div>}>
                <Routes>
                  <Route path="/monhan" element={<Monhan />} />
                </Routes>
              </Suspense>
            </div>
          </div>
        </div>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}

export default App