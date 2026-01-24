import { useState } from 'react'
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

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

const Element = lazy(() => import('./components/minigames/Element'));

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <div className="flex pt-12 flex-1">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          <div className="w-full flex-1 xl:ml-48 xl:mr-48">
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