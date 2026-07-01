import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchNews } from '../services/api';
import { Link } from 'react-router-dom';
import CategoryBlock from '../components/NewsCard/CategoryBlock';
import { FaPlay, FaWhatsapp } from 'react-icons/fa';

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNews();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-500">లోడ్ అవుతోంది...</div>;
  }

  const extendedNews = [...news, ...news, ...news, ...news];
  
  const heroNews = extendedNews[0];
  const subHeroNews = extendedNews.slice(1, 3);

  const block1 = extendedNews.slice(2, 7);
  const block2 = extendedNews.slice(4, 9);
  
  const videoNews = extendedNews.slice(0, 2);

  const block3 = extendedNews.slice(1, 6);
  const block4 = extendedNews.slice(3, 8);
  const block5 = extendedNews.slice(5, 10);
  
  const block6 = extendedNews.slice(0, 5);
  const block7 = extendedNews.slice(2, 7);
  const block8 = extendedNews.slice(4, 9);

  return (
    <>
      <Helmet>
        <title>Balagam TV - Telugu News Portal</title>
      </Helmet>
      
      <div className="w-full px-4 lg:px-8 xl:px-12 pt-6 bg-brand-gray min-h-screen">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          
          {/* Left Large Hero */}
          <div className="lg:col-span-8 relative group overflow-hidden rounded-2xl cursor-pointer premium-shadow min-h-[300px] sm:min-h-[400px] lg:h-[450px]">
            <Link to={`/article/${heroNews.slug}`} className="block w-full h-full">
              <img 
                src={heroNews.image} 
                alt={heroNews.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-block bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-sm shadow">
                  తెలంగాణ
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full z-10">
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-2 group-hover:text-gray-200 transition-colors">
                  పోలీస్ శాఖలో సుదీర్ఘ సేవలు అందించి ఉద్యోగ విరమణ పొందిన పలుగురు అధికారులకు ఘన సన్మానించిన పోలీస్ అధికారులు..
                </h1>
                <div className="text-gray-300 text-sm mt-3 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-brand-red mr-2"></span>
                  అడ్మిన్
                </div>
              </div>
            </Link>
          </div>

          {/* Right Hero Sub Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {subHeroNews.map((article, idx) => (
              <div key={idx} className="group cursor-pointer bg-white rounded-2xl premium-shadow overflow-hidden flex flex-col flex-1 h-auto sm:h-[213px] min-h-[200px] hover:-translate-y-1 transition-transform duration-300">
                <Link to={`/article/${article.slug}`} className="h-full flex flex-col">
                  <div className="relative h-[130px] sm:h-[120px] lg:h-[130px] overflow-hidden shrink-0">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex-grow flex items-center">
                    <h2 className="text-gray-800 text-[15px] font-bold leading-snug group-hover:text-brand-red transition-colors line-clamp-2">
                      {idx === 0 ? "ప్రజా సమస్యల పరిష్కారం, సంక్షేమ ఫలాలు అదుపు.. కలెక్టరేట్ కార్యాలయం..." : "జాతీయ స్థాయిలో ఎన్టీఆర్ ఆత్మగౌరవం.. రాజ్యాంగ రూపశిల్పి డాక్టర్ బి.ఆర్..."}
                    </h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>

        </div>

        {/* 3 COLUMNS: BLOCK 1 | BLOCK 2 | TRENDING */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-4">
            <CategoryBlock 
              title="తాజా వార్తలు" 
              titleColor="text-brand-red" 
              borderColor="border-brand-red" 
              articles={block1} 
            />
          </div>
          <div className="lg:col-span-4">
            <CategoryBlock 
              title="తెలంగాణ" 
              titleColor="text-[#1a237e]" 
              borderColor="border-[#1a237e]" 
              articles={block2} 
            />
          </div>
          <div className="lg:col-span-4 md:col-span-2 lg:col-span-4">
            {/* Trending / Highlight sidebar */}
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm h-full flex flex-col">
              <h3 className="text-lg font-bold text-brand-red border-b border-gray-200 pb-2 mb-4 flex items-center shrink-0">
                <span className="w-1 h-5 bg-brand-red mr-2 inline-block"></span>
                హైలైట్స్
              </h3>
              <div className="space-y-4 flex-grow">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="flex items-start">
                    <span className="text-4xl font-bold text-gray-200 mr-4 leading-none shrink-0">{num}</span>
                    <p className="text-[15px] font-semibold text-gray-800 line-clamp-2 hover:text-brand-red cursor-pointer mt-1">
                      {num === 1 ? 'మెరుగైన వైద్యం కోసం ప్రభుత్వ ఆసుపత్రికి.. నిరుపేదలకు అండగా ప్రభుత్వ..' : 'రాష్ట్రంలో ఉష్ణోగ్రతలు పెరుగుదల.. ప్రజలు అప్రమత్తంగా ఉండాలి.'}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* WhatsApp Banner */}
              <div className="mt-8 bg-[#1e293b] rounded-2xl p-6 text-center text-white flex flex-col items-center shadow-lg shrink-0">
                <p className="text-[14px] font-bold mb-2 tracking-wide">బలగం టీవీ</p>
                <p className="text-[12px] text-gray-300 mb-5 leading-relaxed px-2">
                  తాజా వార్తలు, ఎప్పటికప్పుడు బ్రేకింగ్ న్యూస్ కోసం మా వాట్సాప్ గ్రూప్ లో జాయిన్ అవ్వండి.
                </p>
                <button className="bg-white text-[#1e293b] text-sm font-bold py-2.5 px-6 rounded-full w-full flex justify-center items-center hover:bg-gray-100 transition-colors shadow-sm">
                  <FaWhatsapp className="text-[#25D366] mr-2" size={20} /> వాట్సాప్ గ్రూప్‌లో చేరండి
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* VIDEO GALLERY SECTION */}
        <div className="bg-[#0b1221] rounded-2xl p-6 md:p-8 mb-12 text-white relative overflow-hidden shadow-xl">
          <div className="flex justify-between items-center mb-6 relative z-10 border-b border-gray-700 pb-3">
            <h2 className="text-2xl font-bold flex items-center text-white">
              <span className="w-1 h-6 bg-brand-red mr-3 inline-block"></span>
              వీడియో గ్యాలరీ
            </h2>
            <Link to="/videos" className="text-sm font-semibold hover:text-brand-red text-gray-300 transition-colors">మరిన్ని &gt;</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
            {videoNews.map((vid, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden aspect-[16/9] mb-4 shadow-lg">
                  <img src={vid.image} alt={vid.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm group-hover:bg-brand-red group-hover:border-brand-red transition-all shadow-lg">
                      <FaPlay className="text-white ml-1" size={20} />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-lg leading-snug group-hover:text-brand-red transition-colors">
                  "రాష్ట్ర స్థాయి ఛాంపియన్ షిప్ లో విజేతగా నిలిచిన క్రీడాకారులు... సాధించిన ఘన విజయం"
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* 3 COLUMNS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          <CategoryBlock title="జాతీయం" titleColor="text-yellow-500" borderColor="border-yellow-500" articles={block3} />
          <CategoryBlock title="అంతర్జాతీయం" titleColor="text-[#1a237e]" borderColor="border-[#1a237e]" articles={block4} />
          <CategoryBlock title="ఆంధ్రప్రదేశ్" titleColor="text-blue-800" borderColor="border-blue-800" articles={block5} />
        </div>

        {/* ANOTHER 3 COLUMNS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          <CategoryBlock title="రాజకీయం" titleColor="text-brand-red" borderColor="border-brand-red" articles={block6} />
          <CategoryBlock title="వినోదం" titleColor="text-blue-500" borderColor="border-blue-500" articles={block7} />
          <CategoryBlock title="క్రీడలు" titleColor="text-green-600" borderColor="border-green-600" articles={block8} />
        </div>

        {/* EDITORIAL BANNER */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 md:p-6 mb-12 shadow-sm">
          <div className="flex items-center mb-6 border-b border-gray-200 pb-2">
            <span className="w-1 h-6 bg-[#1a237e] mr-3 inline-block"></span>
            <h2 className="text-xl font-bold text-[#1a237e]">సంపాదకీయం</h2>
            <Link to="/editorial" className="ml-auto text-sm text-[#1a237e] font-semibold hover:underline">మరిన్ని &gt;</Link>
          </div>
          <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-stretch bg-black text-white rounded-xl overflow-hidden p-0 relative shadow-md">
            <div className="w-full md:w-[40%] h-[250px] md:h-auto">
              <img src="https://images.unsplash.com/photo-1544252890-50893043831b?q=80&w=800" alt="Editorial" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-[60%] p-6 md:p-8 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 hover:text-gray-300 cursor-pointer transition-colors leading-tight">
                ప్రజా శ్రేయస్సే ధ్యేయంగా సాగాలి
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm">
                రాజకీయాల్లో నాయకులు ప్రజల పట్ల మరింత బాధ్యతాయుతంగా వ్యవహరించాలి. నేటి పరిస్థితుల్లో స్వార్థ ప్రయోజనాలు పక్కన పెట్టి, సమిష్టి కృషితో ముందుకెళ్లాల్సిన అవసరం ఎంతైనా ఉంది. ప్రజా సమస్యలపై పోరాడే వారు మాత్రమే చరిత్రలో నిలిచిపోతారు...
              </p>
              <Link to="/article/editorial" className="text-white font-bold text-sm hover:underline flex items-center mt-auto w-max">
                మరింత చదవండి <span className="ml-2 text-xl">&raquo;</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-10 border-t border-brand-red pt-8">
          <CategoryBlock title="క్రైమ్" titleColor="text-brand-red" borderColor="border-brand-red" articles={block1} />
        </div>

      </div>
    </>
  );
};

export default Home;
