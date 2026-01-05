import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/assets/Header';
import Sidebar from './components/assets/Sidebar';
import ScrollToTop from './components/assets/ScrollToTop';
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
      <div className="bg-slate-100 min-h-screen text-slate-800">
        <Header onMenuClick={toggleSidebar} />
        <div className="flex pt-14">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          <div className="w-full flex-1 lg:mr-48">
            <div className="w-full max-w-6xl mx-auto md:main-content-centered">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/minigames" element={<Minigames />} />
                <Route path="/mcp" element={<Mcp />} />
                <Route path="/equipments" element={<Equipments />} />
                <Route path="/saitama" element={<Saitama />} />
                <Route path="/chiba" element={<Chiba />} />
                <Route path="/tochigi" element={<Tochigi />} />
                <Route path="/kanagawa" element={<Kanagawa />} />
                <Route path="/yamanashi" element={<Yamanashi />} />
                <Route path="/gunma" element={<Gunma />} />
                <Route path="/shizuoka" element={<Shizuoka />} />
                <Route path="/ibaraki" element={<Ibaraki />} />
                <Route path="/tokyo" element={<Tokyo />} />
              </Routes>
            </div>
          </div>
        </div>
        <ScrollToTop />
      </div>
    </>
  )
}

export default App