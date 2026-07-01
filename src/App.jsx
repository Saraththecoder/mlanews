import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MobileBottomNav from './components/MobileBottomNav';

// Pages
import Home from './pages/Home';
import Category from './pages/Category';
import SingleArticle from './pages/SingleArticle';
import Search from './pages/Search';
import Epaper from './pages/Epaper';
import Shorts from './pages/Shorts';
import { About, Contact, Privacy } from './pages/StaticPages';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full relative">
      <Header />
      <main className="flex-grow pb-[70px] md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="category/:categoryName" element={<Category />} />
        <Route path="category/:categoryName/:subCategory" element={<Category />} />
        <Route path="article/:slug" element={<SingleArticle />} />
        <Route path="search" element={<Search />} />
        <Route path="epaper" element={<Epaper />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        {/* Handle unknown routes */}
        <Route path="*" element={<div className="flex justify-center items-center h-screen text-2xl font-bold">404 - Page Not Found</div>} />
      </Route>
      {/* Full screen routes without header/footer */}
      <Route path="/shorts" element={<Shorts />} />
    </Routes>
  );
}

export default App;
