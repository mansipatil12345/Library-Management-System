import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiBook, FiUsers, FiSettings, FiLogOut, FiHome, FiBarChart2, FiUser } from 'react-icons/fi';

export default function AdminNavbar() {
  const { logout, userData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">Library Admin</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/admin/dashboard" icon={<FiHome size={18} />} label="Dashboard" />
            <NavLink to="/admin/books" icon={<FiBook size={18} />} label="Books" />
            <NavLink to="/admin/users" icon={<FiUsers size={18} />} label="Users" />
            <NavLink to="/admin/reports" icon={<FiBarChart2 size={18} />} label="Reports" />
            <NavLink to="/admin/settings" icon={<FiSettings size={18} />} label="Settings" />
            
            <div className="relative group ml-2">
              <button className="flex items-center gap-2 px-3 py-2 text-white hover:bg-blue-700/30 rounded-md">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <FiUser className="text-white" />
                </div>
                <span className="text-sm font-medium">{userData?.email || 'Admin'}</span>
              </button>
              
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 invisible group-hover:visible">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
                >
                  <FiLogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700/30 rounded-md transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}