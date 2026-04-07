import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { Car, LogOut, ChevronDown, Globe } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const { user, logout } = useAuthStore();
  const { language, setLanguage, t } = useLanguageStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const languages = [
    { code: 'uz', label: 'O\'zbekcha' },
    { code: 'ru', label: 'Русский' },
    { code: 'en', label: 'English' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass h-16 flex items-center shadow-sm">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg group-hover:scale-105 transition-transform duration-300">
            <Car size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">Drive.net</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors text-sm font-medium focus:outline-none"
            >
              <Globe size={18} className="text-gray-500" />
              <span className="uppercase text-gray-700">{language}</span>
              <ChevronDown size={14} className={`text-gray-400 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 bg-white border border-border rounded-2xl shadow-xl py-2 z-20 overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          language === lang.code ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

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
                  <>
                     <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white border border-border rounded-2xl shadow-xl py-2 z-20 overflow-hidden"
                    >
                      <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{user.role}</p>
                      </div>
                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                          {t('adminDashboard')}
                        </Link>
                      )}
                      <button 
                        onClick={() => { handleLogout(); setDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut size={16} /> {t('logout')}
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex gap-2 sm:gap-4">
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">{t('login')}</Link>
              <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-xl hover:bg-indigo-700 transition-all-smooth hover:shadow-lg shadow-indigo-200">{t('register')}</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
