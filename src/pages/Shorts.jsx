import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import { fetchNews } from '../services/api';
import { FaHeart, FaShare, FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MobileBottomNav from '../components/MobileBottomNav';

const Shorts = ({ type = 'news' }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define titles based on route type
  const headerTitle = type === 'trending' ? 'TRENDING NEWS' : 'LATEST NEWS';

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
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        Loading Shorts...
      </div>
    );
  }

  // Random dummy data to demonstrate flipping functionality with diverse content
  const dummyShorts = [
    {
      title: "చంద్రయాన్-3 విజయం: చంద్రుడి దక్షిణ ధృవంపై సగర్వంగా అడుగుపెట్టిన భారత్",
      category: "సైన్స్",
      content: "భారత అంతరిక్ష పరిశోధనా సంస్థ (ఇస్రో) చేపట్టిన చంద్రయాన్-3 ప్రయోగం విజయవంతమైంది. చంద్రుడి దక్షిణ ధృవంపై ల్యాండర్ సురక్షితంగా దిగింది.",
      image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80"
    },
    {
      title: "టెక్నాలజీ రంగంలో పెను మార్పులు: కొత్త ఏఐ మోడల్ ఆవిష్కరణ",
      category: "టెక్నాలజీ",
      content: "ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ రంగంలో మరో విప్లవం. సరికొత్త ఏఐ మోడల్ ను శాస్త్రవేత్తలు ఆవిష్కరించారు. దీని ద్వారా పనులను మరింత వేగంగా పూర్తి చేయవచ్చు.",
      image: "https://images.unsplash.com/photo-1504608524841-42ce6c20b091?w=800&q=80"
    },
    {
      title: "Stock Market: లాభాలతో ముగిసిన స్టాక్ మార్కెట్లు",
      category: "బిజినెస్",
      content: "వరుస నష్టాల తర్వాత దేశీయ స్టాక్ మార్కెట్లు లాభాల బాట పట్టాయి. సెన్సెక్స్ 500 పాయింట్లకు పైగా లాభపడగా, నిఫ్టీ 150 పాయింట్లు పెరిగింది.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"
    },
    {
      title: "అరుదైన సీతాకోకచిలుకలు గుర్తింపు: పర్యావరణ వేత్తల హర్షం",
      category: "పర్యావరణం",
      content: "అమెజాన్ అడవుల్లో అత్యంత అరుదైన సీతాకోకచిలుక జాతులను పరిశోధకులు గుర్తించారు. ఇవి రాత్రి పూట ప్రకాశించే లక్షణాలను కలిగి ఉన్నాయి.",
      image: "https://images.unsplash.com/photo-1550186178-5e44c45b7f1e?w=800&q=80"
    },
    {
      title: "కొత్త ఎలక్ట్రిక్ కారు విడుదల: ఒకే ఛార్జింగ్‌తో 500 కి.మీ ప్రయాణం",
      category: "ఆటోమొబైల్",
      content: "ప్రముఖ ఆటోమొబైల్ సంస్థ సరికొత్త ఎలక్ట్రిక్ కారును మార్కెట్లోకి విడుదల చేసింది. కేవలం ఒక్కసారి ఛార్జింగ్ చేస్తే 500 కిలోమీటర్ల మైలేజ్ ఇస్తుందని కంపెనీ ప్రకటించింది.",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80"
    }
  ];

  // Combine fetched news with dummy data to provide enough unique slides for flipping
  const displayNews = [...news, ...dummyShorts];

  return (
    <div className="bg-black h-[100dvh] w-full overflow-hidden relative">
      <Helmet>
        <title>Shorts - Balagam TV</title>
      </Helmet>
      
      {/* Top Header for Shorts */}
      <div className="absolute top-0 left-0 w-full z-50 flex justify-between items-center p-4 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
        <Link to="/" className="text-white pointer-events-auto">
          <FaArrowLeft size={20} />
        </Link>
        <span className="text-white font-bold tracking-widest text-sm pointer-events-auto uppercase">{headerTitle}</span>
        <div className="w-5"></div> {/* Spacer for center alignment */}
      </div>

      <Swiper
        direction={'vertical'}
        className="w-full h-full"
        loop={true}
        modules={[Mousewheel, Keyboard]}
        mousewheel={true}
        keyboard={{ enabled: true }}
      >
        {displayNews.map((article, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full flex flex-col bg-white">
              {/* Top Image Half */}
              <div className="h-[40%] sm:h-[45%] w-full shrink-0 relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Content Half */}
              <div className="flex-1 p-5 pb-20 flex flex-col justify-between relative z-10">
                <div>
                  <div className="mb-3">
                    <span className="inline-block bg-brand-red text-white text-[11px] font-bold px-2.5 py-1 rounded-sm shadow-sm">
                      {article.category || 'న్యూస్'}
                    </span>
                  </div>
                  <h2 className="text-gray-900 text-xl sm:text-2xl font-bold leading-snug mb-3">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {article.content || 'వివరాలు త్వరలో... ఈ వార్తకు సంబంధించిన మరింత సమాచారం మా వెబ్సైట్ లో చూడగలరు.'}
                  </p>
                </div>
                
                {/* Interaction Actions */}
                <div className="flex items-center justify-around mt-4 pt-4 border-t border-gray-100 pb-4">
                  <button className="flex flex-col items-center gap-1.5 group">
                    <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-colors text-gray-500">
                      <FaHeart size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 group-hover:text-brand-red">లైక్</span>
                  </button>
                  <button className="flex flex-col items-center gap-1.5 group">
                    <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20b858] transition-colors shadow-md shadow-green-200">
                      <FaWhatsapp size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-[#25D366]">వాట్సాప్</span>
                  </button>
                  <button className="flex flex-col items-center gap-1.5 group">
                    <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors text-gray-500">
                      <FaShare size={20} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 group-hover:text-blue-500">షేర్</span>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Mobile Bottom Nav will overlay on bottom */}
      <MobileBottomNav />
    </div>
  );
};

export default Shorts;
