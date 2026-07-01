import { useState, useEffect } from 'react';
import { fetchNews } from '../../services/api';
import SmallCard from '../NewsCard/SmallCard';

const Sidebar = () => {
  const [trendingNews, setTrendingNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews();
        // Just slice some for demo
        setTrendingNews(data.slice(0, 4));
      } catch (error) {
        console.error("Failed to load trending news", error);
      }
    };
    loadNews();
  }, []);

  return (
    <div className="w-full space-y-8">
      {/* Social Follow */}
      <div className="bg-white p-4 shadow-sm rounded">
        <h3 className="font-bold text-lg mb-4 border-l-4 border-brand-red pl-2">Follow Us</h3>
        <div className="grid grid-cols-2 gap-2">
          <a href="#" className="flex items-center justify-center space-x-2 bg-[#3b5998] text-white py-2 rounded text-sm hover:opacity-90 transition-opacity">
            <span>Facebook</span>
          </a>
          <a href="#" className="flex items-center justify-center space-x-2 bg-[#1da1f2] text-white py-2 rounded text-sm hover:opacity-90 transition-opacity">
            <span>Twitter</span>
          </a>
          <a href="#" className="flex items-center justify-center space-x-2 bg-[#c32aa3] text-white py-2 rounded text-sm hover:opacity-90 transition-opacity">
            <span>Instagram</span>
          </a>
          <a href="#" className="flex items-center justify-center space-x-2 bg-[#ff0000] text-white py-2 rounded text-sm hover:opacity-90 transition-opacity">
            <span>YouTube</span>
          </a>
        </div>
      </div>

      {/* Ad Widget */}
      <div className="bg-gray-200 w-full h-[250px] flex items-center justify-center text-gray-400 border border-gray-300">
        Advertisement (300x250)
      </div>

      {/* Trending News */}
      <div className="bg-white p-4 shadow-sm rounded">
        <h3 className="font-bold text-lg mb-4 border-l-4 border-brand-red pl-2">Trending Now</h3>
        <div className="space-y-4">
          {trendingNews.map(article => (
            <SmallCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
