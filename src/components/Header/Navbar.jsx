import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaAngleDown, FaSearch } from 'react-icons/fa';
import { cn } from '../../utils/cn';

// Sub-categories data
const telanganaDistricts = ['ఆదిలాబాద్', 'కరీంనగర్', 'రాజన్న సిరిసిల్ల', 'కామారెడ్డి', 'కుమురం భీమ్ ఆసిఫాబాద్', 'ఖమ్మం', 'జగిత్యాల', 'జనగామ', 'జయశంకర్ భూపాలపల్లి', 'జోగులాంబ గద్వాల', 'నల్గొండ', 'నాగర్ కర్నూల్', 'నారాయణ్ పేట్', 'నిజామాబాద్', 'నిర్మల్', 'పెద్దపల్లి', 'భద్రాద్రి కొత్తగూడెం', 'మంచిర్యాల', 'మహబూబాబాద్', 'మహబూబ్ నగర్', 'ములుగు', 'మెదక్', 'మేడ్చల్ మల్కాజ్ గిరి', 'యాదాద్రి భువనగిరి', 'రంగారెడ్డి', 'వనపర్తి', 'వరంగల్', 'వికారాబాద్', 'సంగారెడ్డి', 'సిద్దిపేట', 'సూర్యాపేట'];

const andhraDistricts = ['శ్రీకాకుళం', 'విజయనగరం', 'విశాఖపట్నం', 'తూర్పు గోదావరి', 'పశ్చిమ గోదావరి', 'కృష్ణా', 'గుంటూరు', 'ప్రకాశం', 'నెల్లూరు', 'కర్నూలు', 'అనంతపురం', 'కడప', 'చిత్తూరు'];
const politicsSubs = ['జాతీయ', 'రాష్ట్ర', 'స్థానిక', 'ఎన్నికలు'];

const mapSub = (basePath, arr) => arr.map(item => ({ name: item, path: `${basePath}/${item}` }));

const categories = [
  { name: 'తెలంగాణ', path: '/category/telangana', subItems: mapSub('/category/telangana', telanganaDistricts) },
  { name: 'ఆంధ్రప్రదేశ్', path: '/category/andhra', subItems: mapSub('/category/andhra', andhraDistricts) },
  { name: 'రాజకీయాలు', path: '/category/politics', subItems: mapSub('/category/politics', politicsSubs) },
  { name: 'బ్రేకింగ్ న్యూస్', path: '/category/breaking' },
  { name: 'క్రైమ్', path: '/category/crime' },
  { name: 'క్రీడలు', path: '/category/sports' },
  { name: 'ఆరోగ్యం', path: '/category/health' },
  { name: 'తాజా వార్తలు', path: '/category/latest' },
  { name: 'స్టోరీలు', path: '/category/stories' },
  { name: 'రాష్ట్రీయం', path: '/category/state' },
  { name: 'జాతీయం', path: '/category/national' },
  { name: 'అంతర్జాతీయం', path: '/category/international' },
  { name: 'ఈ-పేపర్', path: '/epaper' },
];

const Navbar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setIsMobileMenuOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <div
        className={cn(
          'w-full bg-[#20297b] text-white shadow-md z-40 transition-all duration-300',
          isSticky ? 'fixed top-0 left-0 animate-slideDown' : 'relative'
        )}
      >
        <div className="w-full px-4 lg:px-8 xl:px-12">
          <div className="flex justify-between items-center min-h-[52px] py-2 lg:py-0">
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center justify-center lg:justify-between h-full w-full flex-wrap lg:flex-nowrap gap-y-2">
              {categories.map((cat, idx) => (
                <div 
                  key={idx} 
                  className="h-full relative group shrink-0 flex items-center"
                  onMouseEnter={() => cat.subItems && setDropdownOpen(idx)}
                  onMouseLeave={() => cat.subItems && setDropdownOpen(null)}
                >
                  <Link
                    to={cat.path}
                    className={cn(
                      'flex items-center px-2 lg:px-[10px] py-1.5 lg:py-4 h-full font-bold text-[13.5px] hover:bg-white hover:text-[#20297b] transition-colors whitespace-nowrap rounded-sm lg:rounded-none',
                      (cat.exact ? location.pathname === cat.path : location.pathname.includes(cat.path)) ? 'bg-white text-[#20297b]' : ''
                    )}
                  >
                    {cat.name} {cat.subItems && <FaAngleDown className="ml-1 opacity-80" size={12} />}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {cat.subItems && dropdownOpen === idx && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-0 bg-white shadow-xl border border-gray-100 py-3 w-[max-content] min-w-[200px] max-w-[90vw] lg:max-w-[800px] z-50 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2 px-6 rounded-b-md text-left">
                      {cat.subItems.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          to={sub.path}
                          className="text-gray-800 hover:text-[#20297b] hover:bg-indigo-50 px-3 py-1.5 text-[13px] font-semibold rounded transition-colors whitespace-nowrap"
                          onClick={() => setDropdownOpen(null)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60" onClick={toggleMenu}>
          <div 
            className="w-[85vw] max-w-[320px] h-full bg-white text-black shadow-2xl flex flex-col transform transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex justify-between items-center bg-[#20297b] text-white shadow-md shrink-0">
              <img src="/balagam_logo_final.png" alt="Balagam TV" className="h-10 bg-white p-1 rounded object-contain" />
              <button onClick={toggleMenu} className="p-2 hover:bg-white/20 rounded"><FaTimes size={24} /></button>
            </div>
            
            {/* Mobile Search Bar & Report Issue */}
            <div className="p-4 border-b border-gray-100 shrink-0 flex flex-col gap-3">
              <div className="relative w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaSearch size={14} />
                </div>
                <input 
                  type="text" 
                  placeholder="వెతకండి..." 
                  className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-10 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </div>
              <button className="w-full bg-brand-red text-white text-sm font-bold py-2.5 rounded uppercase tracking-wider hover:bg-red-700 transition-colors shadow-sm">
                Report an Issue
              </button>
            </div>

            <nav className="flex flex-col overflow-y-auto pb-4 pt-2">
              {categories.map((cat, idx) => (
                <div key={idx} className="flex flex-col border-b border-gray-100 last:border-0">
                  <div className="flex justify-between items-center px-4 py-3 hover:bg-indigo-50 transition-colors">
                    <Link
                      to={cat.path}
                      onClick={toggleMenu}
                      className="font-bold text-[15px] text-gray-800 hover:text-[#20297b] flex-grow"
                    >
                      {cat.name}
                    </Link>
                    {cat.subItems && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setDropdownOpen(dropdownOpen === idx ? null : idx);
                        }}
                        className="p-3 -m-3 text-gray-500 hover:text-[#20297b]"
                      >
                        <FaAngleDown className={cn("transition-transform duration-200", dropdownOpen === idx ? 'rotate-180' : '')} />
                      </button>
                    )}
                  </div>
                  {cat.subItems && dropdownOpen === idx && (
                    <div className="bg-gray-50 px-4 py-2 flex flex-col max-h-[40vh] overflow-y-auto border-t border-gray-100">
                      {cat.subItems.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          to={sub.path}
                          onClick={toggleMenu}
                          className="text-gray-600 hover:text-[#20297b] text-sm py-2.5 font-semibold border-b border-gray-200 last:border-0 pl-2"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
