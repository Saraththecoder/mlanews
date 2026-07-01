import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchNews } from '../services/api';
import Sidebar from '../components/Sidebar/Sidebar';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLink, FaFont, FaPlus, FaMinus } from 'react-icons/fa';

const SingleArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [textSize, setTextSize] = useState(18); // default 18px text size

  useEffect(() => {
    const getArticle = async () => {
      try {
        const data = await fetchNews();
        const found = data.find(n => n.slug === slug);
        setArticle(found || data[0]); // fallback to first if not found
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };
    getArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!article) return <div className="flex justify-center items-center h-screen">Article not found.</div>;

  return (
    <>
      <Helmet>
        <title>{article.title} - Balagam TV</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <div className="w-full px-4 lg:px-8 xl:px-12 pt-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
          <Link to="/" className="hover:text-brand-red">Home</Link>
          <span>/</span>
          <Link to={`/category/${article.category.toLowerCase()}`} className="hover:text-brand-red">{article.category}</Link>
          <span>/</span>
          <span className="text-gray-800 line-clamp-1">{article.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article Content */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded shadow-sm">
            <span className="bg-brand-red text-white text-xs font-bold px-2 py-1 uppercase rounded mb-4 inline-block">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">{article.title}</h1>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between border-y border-gray-100 py-4 mb-6 gap-4">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="font-semibold text-brand-dark">By {article.author}</span>
                  <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' })}</span>
                </div>
                <div className="text-xs text-gray-400 font-medium">
                  {Math.ceil((article.content?.length || 1000) / 1000)} Min Read
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                {/* A11y Text Size */}
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
                  <FaFont className="text-gray-400" size={12} />
                  <button onClick={() => setTextSize(s => Math.max(14, s - 2))} className="text-gray-600 hover:text-black p-1" aria-label="Decrease text size"><FaMinus size={10} /></button>
                  <span className="text-xs font-bold w-4 text-center">{textSize}</span>
                  <button onClick={() => setTextSize(s => Math.min(26, s + 2))} className="text-gray-600 hover:text-black p-1" aria-label="Increase text size"><FaPlus size={10} /></button>
                </div>

                {/* Social Share */}
              <div className="flex space-x-3">
                <button className="w-8 h-8 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-80">
                  <FaFacebookF size={14} />
                </button>
                <button className="w-8 h-8 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:opacity-80">
                  <FaTwitter size={14} />
                </button>
                <button className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-80">
                  <FaWhatsapp size={14} />
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center hover:opacity-80">
                  <FaLink size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8">
              <img src={article.image} alt={article.title} className="w-full rounded object-cover max-h-[500px]" />
            </div>

            <div 
              className="prose max-w-none text-gray-700 leading-relaxed mb-8 transition-all"
              style={{ fontSize: `${textSize}px` }}
            >
              <p>{article.content}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            
            {/* Author Bio Box */}
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-6 mb-8 flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
                {article.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{article.author}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Senior Correspondent at Balagam TV. Covering local and regional news, politics, and social issues with a focus on ground-level realities.
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center space-x-2 mt-8 pt-6 border-t border-gray-100">
              <span className="font-bold text-sm">Tags:</span>
              <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded cursor-pointer hover:bg-gray-200">{article.category}</span>
              <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded cursor-pointer hover:bg-gray-200">Telugu News</span>
            </div>
            
            {/* Comments Placeholder */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-6 border-b-2 border-brand-red inline-block pb-1">Comments</h3>
              <div className="bg-gray-50 p-6 rounded text-center text-gray-500">
                Comments section will be loaded here.
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleArticle;
