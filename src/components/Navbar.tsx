import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Car, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass h-16 flex items-center shadow-sm">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg group-hover:scale-105 transition-transform duration-300">
            <Car size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">Drive.net</span>
        </Link>

        {user ? (
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 focus:outline-none hover:bg-gray-100 p-2 rounded-full sm:rounded-xl transition-colors"
            >
              <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full border border-border" />
              <div className="hidden sm:flex flex-col items-start pr-2">
                <span className="text-sm font-semibold leading-tight">{user.name}</span>
                <span className="text-xs text-gray-500 capitalize leading-tight">{user.role}</span>
              </div>
              <ChevronDown size={16} className={`text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-xl shadow-lg py-1 overflow-hidden"
                >
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">Login</Link>
            <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-gray-800 transition-all-smooth hover:shadow-md">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
