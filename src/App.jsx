import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/assets/Header';
import Sidebar from './components/assets/Sidebar';
import ScrollToTop from './components/assets/ScrollToTop';
import Footer from './components/assets/Footer';
import Mcp from './components/Mcp';
import Saitama from './components/minigames/Saitama';
import Chiba from './components/minigames/Chiba';
import Tochigi from './components/minigames/Tochigi';
import Yamanashi from './components/minigames/Yamanashi';
import Gunma from './components/minigames/Gunma';
import Shizuoka from './components/minigames/Shizuoka';
import Minigames from './components/Minigames';
import Kanagawa from './components/minigames/Kanagawa';
import Ibaraki from './components/minigames/Ibaraki';
import Tokyo from './components/minigames/Tokyo';
import Equipments from './components/Equipments';
import Links2 from './components/Links';
import ViewTop from './components/assets/ViewTop';
import PrivacyPolicy from './components/minigames/PrivacyPolicy';
import Element from './components/minigames/Element';

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
              </Routes>
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