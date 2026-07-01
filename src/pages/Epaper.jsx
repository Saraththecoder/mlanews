import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaDownload, FaWhatsapp, FaCalendarAlt, FaSearch } from 'react-icons/fa';

const Epaper = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data for past editions
  const pastEditions = [
    { date: '2026-06-30', image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&q=80', label: 'June 30, 2026' },
    { date: '2026-06-29', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&q=80', label: 'June 29, 2026' },
    { date: '2026-06-28', image: 'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?w=500&q=80', label: 'June 28, 2026' },
    { date: '2026-06-27', image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&q=80', label: 'June 27, 2026' },
  ];

  return (
    <>
      <Helmet>
        <title>E-Paper Archive - Balagam TV</title>
      </Helmet>

      <div className="w-full px-4 lg:px-8 xl:px-12 pt-8 pb-16 bg-gray-50 min-h-screen">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#1a237e] flex items-center">
              <span className="w-1.5 h-8 bg-brand-red mr-3 inline-block"></span>
              ఈ-పేపర్ ఆర్కైవ్
            </h1>
            <p className="text-gray-500 mt-2 ml-4">Daily Digital Print Edition</p>
          </div>
          
          {/* Calendar Picker */}
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-3 w-full md:w-auto">
            <FaCalendarAlt className="text-brand-red" size={20} />
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 font-bold uppercase tracking-wide">Select Date</label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="font-bold text-gray-800 outline-none cursor-pointer bg-transparent"
              />
            </div>
            <button className="ml-auto md:ml-4 bg-brand-red text-white p-2 rounded hover:bg-red-700 transition-colors">
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Today's Edition - Main Display */}
          <div className="lg:col-span-8">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-100 relative group">
              <div className="absolute top-8 -left-2 bg-brand-red text-white font-bold px-4 py-1.5 rounded-r shadow-lg z-10 text-sm tracking-wide">
                TODAY'S EDITION
              </div>
              
              <div className="aspect-[3/4] w-full bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-100 mb-6 relative">
                {/* Placeholder E-Paper Image */}
                <img 
                  src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000" 
                  alt="Today's E-Paper" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
                />
                
                {/* Hover overlay to read */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-[2px]">
                  <button className="bg-white text-brand-red font-bold py-3 px-8 rounded-full shadow-2xl transform hover:scale-105 transition-transform text-lg">
                    చదవండి (Read Now)
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-100 pt-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Balagam TV Daily</h3>
                  <p className="text-gray-500 font-semibold">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2.5 px-5 rounded-lg transition-colors">
                    <FaDownload className="mr-2" /> Download PDF
                  </button>
                  <button className="flex-1 sm:flex-none flex items-center justify-center bg-[#25D366] hover:bg-[#1da851] text-white font-bold py-2.5 px-5 rounded-lg transition-colors shadow-sm">
                    <FaWhatsapp className="mr-2" size={18} /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Past Editions Grid */}
          <div className="lg:col-span-4">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-1.5 h-6 bg-[#1a237e] mr-2 inline-block"></span>
              గత సంచికలు (Past Editions)
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {pastEditions.map((edition, idx) => (
                <div key={idx} className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 group cursor-pointer hover:border-brand-red transition-colors">
                  <div className="aspect-[3/4] w-full bg-gray-100 rounded overflow-hidden mb-2 relative">
                    <img 
                      src={edition.image} 
                      alt={edition.label} 
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <p className="text-center text-xs font-bold text-gray-700 group-hover:text-brand-red">{edition.label}</p>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 bg-white border-2 border-[#1a237e] text-[#1a237e] font-bold py-3 rounded-lg hover:bg-[#1a237e] hover:text-white transition-colors">
              అన్ని సంచికలు చూడండి (View All)
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Epaper;
