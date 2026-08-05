import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, HelpCircle, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const PAGE_META = {
  '/dashboard': { title: 'Dashboard', sub: 'Your pipeline at a glance' },
  '/leads': { title: 'Leads', sub: 'Track and qualify new prospects' },
  '/customers': { title: 'Customers', sub: 'Your active accounts' },
  '/opportunities': { title: 'Opportunities', sub: 'Deals in your pipeline' },
  '/settings': { title: 'Settings', sub: 'Manage account and preferences' },
  '/help': { title: 'Help & Guide', sub: 'Learn how to use SalesCRM' },
};

const getMeta = (pathname) => {
  const key = Object.keys(PAGE_META).find((k) => pathname.startsWith(k));
  return key ? PAGE_META[key] : { title: 'SalesCRM', sub: '' };
};

const TopNavbar = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef(null);

  const { title, sub } = getMeta(location.pathname);

  // Close the profile menu on outside click.
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowDropdown(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-[#0a0a12]/70 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="flex items-center min-w-0">
        <button
          onClick={onMenuClick}
          className="p-2 mr-2 text-gray-400 rounded-lg hover:text-white hover:bg-white/[0.06] lg:hidden focus:outline-none"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="min-w-0">
          <h1 className="text-lg font-semibold text-white font-display leading-tight truncate">{title}</h1>
          {sub && <p className="text-xs text-gray-500 truncate hidden sm:block">{sub}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live status pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-ring" />
          <span className="text-xs font-medium text-gray-400">Connected</span>
        </div>

        {/* Help shortcut */}
        <Link
          to="/help"
          className="p-2 text-gray-400 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors"
          aria-label="Help and guide"
          title="Help & Guide"
        >
          <HelpCircle className="w-5 h-5" />
        </Link>

        {/* Profile */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowDropdown((v) => !v)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/30 to-indigo-500/20 text-violet-200 font-bold text-sm uppercase">
              {user?.name?.[0] || 'U'}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform hidden sm:block ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-56 py-1.5 bg-[#13131f] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-white/[0.06]">
                  <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                  <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-violet-500/15 text-violet-300 capitalize">
                    {user?.role || 'sales'}
                  </span>
                </div>
                <button
                  onClick={() => { setShowDropdown(false); navigate('/help'); }}
                  className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/[0.05] transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-gray-500" /> Help &amp; Guide
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
