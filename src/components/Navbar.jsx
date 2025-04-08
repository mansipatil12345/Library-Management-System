import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiMenu, 
  FiX, 
  FiBell, 
  FiUser, 
  FiSearch, 
  FiBook, 
  FiFileText, 
  FiClock,
  FiLogOut,
  FiSettings,
  FiHome
} from 'react-icons/fi';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasNotifications, setHasNotifications] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const navItems = [
    { path: '/home', label: 'Home', icon: <FiHome /> },
    { path: '/books', label: 'Books', icon: <FiBook /> },
    { path: '/research-papers', label: 'Research Papers', icon: <FiFileText /> },
    { path: '/question-papers', label: 'Question Papers', icon: <FiFileText /> },
    { path: '/my-library', label: 'My Library', icon: <FiClock /> },
  ];

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem('authToken');
    navigate('/');
    setProfileOpen(false);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/home" className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">DigitalLib</span>
              <span className="hidden md:inline text-sm text-blue-100">University Library</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search books, papers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-blue-400 bg-blue-500/20 text-white placeholder-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              />
              <FiSearch className="absolute left-3 top-3 text-blue-200" />
            </form>
            
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors ${
                    isActive(item.path)
                      ? 'text-white bg-blue-700/30'
                      : 'text-blue-100 hover:text-white hover:bg-blue-700/20'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-3 ml-2">
              <Link 
                to="/notifications" 
                className="relative p-2 text-blue-100 hover:text-white rounded-full hover:bg-blue-700/20 transition-colors"
              >
                <FiBell size={20} />
                {hasNotifications && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></span>
                )}
              </Link>
              
              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="p-2 text-blue-100 hover:text-white rounded-full hover:bg-blue-700/20 transition-colors focus:outline-none"
                >
                  <FiUser size={20} />
                </button>
                
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
                      onClick={() => setProfileOpen(false)}
                    >
                      <FiUser size={16} />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
                      onClick={() => setProfileOpen(false)}
                    >
                      <FiSettings size={16} />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
                    >
                      <FiLogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <Link 
              to="/notifications" 
              className="relative p-2 text-blue-100 hover:text-white rounded-full hover:bg-blue-700/20"
            >
              <FiBell size={20} />
              {hasNotifications && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></span>
              )}
            </Link>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-blue-100 hover:text-white rounded-full hover:bg-blue-700/20"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-blue-700/90 backdrop-blur-sm border-t border-blue-600">
            <div className="px-4 pt-3 pb-4 space-y-2">
              <form onSubmit={handleSearch} className="relative mb-2">
                <input
                  type="text"
                  placeholder="Search books, papers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-full border border-blue-400 bg-blue-500/20 text-white placeholder-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
                <FiSearch className="absolute left-3 top-3.5 text-blue-200" />
              </form>
              
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium ${
                    isActive(item.path)
                      ? 'text-white bg-blue-700/30'
                      : 'text-blue-100 hover:text-white hover:bg-blue-700/20'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <div className="pt-2 border-t border-blue-600">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-blue-100 hover:text-white hover:bg-blue-700/20"
                >
                  <FiUser size={20} />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-blue-100 hover:text-white hover:bg-blue-700/20 text-left"
                >
                  <FiLogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;