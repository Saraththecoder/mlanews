import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchNews } from '../services/api';
import { FaShareAlt, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CategoryGridCard = ({ article }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
      <Link to={`/article/${article.slug}`} className="relative h-[220px] overflow-hidden block m-2 rounded-t-xl">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-[16px] leading-snug group-hover:text-[#cc0000] transition-colors line-clamp-2 mb-6 mt-1">
          <Link to={`/article/${article.slug}`}>{article.title}</Link>
        </h3>
        
        <div className="mt-auto">
          <div className="w-full h-[1px] bg-gray-200 mb-3"></div>
          <div className="flex justify-end items-center text-gray-500 text-sm font-semibold">
            <button className="flex items-center hover:text-[#cc0000] transition-colors">
              <FaShareAlt className="mr-1.5" size={12} />
              షేర్
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Category = () => {
  const { categoryName, subCategory } = useParams();
  const location = useLocation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  let displayCategory = '';
  if (subCategory) {
    displayCategory = decodeURIComponent(subCategory);
  } else if (categoryName) {
    const map = {
      telangana: 'తెలంగాణ',
      andhra: 'ఆంధ్రప్రదేశ్',
      national: 'జాతీయం',
      politics: 'రాజకీయాలు',
      crime: 'క్రైమ్',
      cinema: 'సినిమా',
      sports: 'క్రీడలు',
      health: 'ఆరోగ్యం',
      latest: 'తాజా వార్తలు',
      stories: 'స్టోరీలు',
      state: 'రాష్ట్రీయం',
      international: 'అంతర్జాతీయం'
    };
    displayCategory = map[categoryName.toLowerCase()] || categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  }

  useEffect(() => {
    const getCategoryNews = async () => {
      setLoading(true);
      try {
        const data = await fetchNews();
        const expandedData = [...data, ...data, ...data].map((item, idx) => ({...item, id: `${item.id}-${idx}`}));
        setNews(expandedData);
      } catch (error) {
        console.error("Error fetching category news:", error);
      } finally {
        setLoading(false);
      }
    };
    getCategoryNews();
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{displayCategory} News - Balagam TV</title>
      </Helmet>

      <div className="bg-white min-h-screen pb-12 relative">
        <div className="w-full px-4 lg:px-8 xl:px-12 pt-8">
          
          {/* Category Header */}
          <div className="mb-8 border-b-2 border-[#cc0000]">
            <h1 className="text-3xl font-bold text-[#cc0000] inline-block mb-2">{displayCategory}</h1>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20 text-gray-500">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article) => (
                <CategoryGridCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>

        {/* Back to Top Button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#cc0000] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-800 transition-colors z-50"
        >
          <FaArrowUp />
        </button>
      </div>
    </>
  );
};

export default Category;
