import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  LayoutDashboard,
  Users,
  Building2,
  TrendingUp,
  HelpCircle,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

// Primary workspace navigation.
const navLinks = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/leads', label: 'Leads', icon: Users },
  { path: '/customers', label: 'Customers', icon: Building2 },
  { path: '/opportunities', label: 'Opportunities', icon: TrendingUp },
  { path: '/settings', label: 'Settings', icon: Settings },
];

// Secondary links (support / reference).
const secondaryLinks = [
  { path: '/help', label: 'Help & Guide', icon: HelpCircle },
];

/**
 * Sidebar — primary navigation.
 *
 * Collapse state is owned by AppLayout (isCollapsed + onToggleCollapse) so the
 * main content padding stays in sync. On mobile it behaves as a slide-in
 * drawer controlled by isOpen / onClose.
 */
const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const { user, logout } = useAuth();

  const renderLink = (link) => {
    const Icon = link.icon;
    return (
      <NavLink
        key={link.path}
        to={link.path}
        onClick={onClose}
        title={isCollapsed ? link.label : undefined}
        className={({ isActive }) =>
          `relative flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group ${
            isActive
              ? 'bg-gradient-to-r from-violet-500/[0.18] to-transparent text-white'
              : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
          }`
        }
      >
        {({ isActive }) => (
          <>
            {isActive && (
              <motion.span
                layoutId="nav-active"
                className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-gradient-to-b from-violet-400 to-cyan-400"
              />
            )}
            <Icon className="shrink-0" size={20} />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="ml-3 whitespace-nowrap text-sm font-medium"
                >
                  {link.label}
                </motion.span>
              )}
            </AnimatePresence>
          </>
        )}
      </NavLink>
    );
  };

  const sidebarContent = (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 264 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#0a0a12]/95 backdrop-blur-xl border-r border-white/[0.06] transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand */}
      <div className="flex items-center h-16 px-5 border-b border-white/[0.06]">
        <div className="relative flex items-center justify-center shrink-0">
          <div className="absolute inset-0 blur-md bg-violet-500/40 rounded-lg" />
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
            <Zap className="text-white" size={18} fill="currentColor" />
          </div>
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-3 overflow-hidden"
            >
              <span className="block text-lg font-bold text-white font-display leading-none whitespace-nowrap">
                Sales<span className="gradient-text">CRM</span>
              </span>
              <span className="block text-[10px] text-gray-500 font-medium tracking-wide mt-1 whitespace-nowrap uppercase">
                Smart Sales Platform
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
        {!isCollapsed && (
          <p className="px-3 pb-2 text-[10px] font-semibold text-gray-600 uppercase tracking-wider">Menu</p>
        )}
        {navLinks.map(renderLink)}

        <div className="pt-4 mt-2">
          {!isCollapsed && (
            <p className="px-3 pb-2 text-[10px] font-semibold text-gray-600 uppercase tracking-wider">Support</p>
          )}
          {secondaryLinks.map(renderLink)}
        </div>
      </nav>

      {/* Footer: collapse toggle (desktop), user chip, logout */}
      <div className="p-3 border-t border-white/[0.06] space-y-2">
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex items-center justify-center w-full p-2 text-gray-500 rounded-lg hover:text-white hover:bg-white/[0.05] transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </button>

        <div className={`flex items-center rounded-xl bg-white/[0.03] border border-white/[0.06] ${isCollapsed ? 'justify-center p-2' : 'px-2.5 py-2'}`}>
          <div className="relative shrink-0">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-violet-500/30 to-indigo-500/20 text-violet-200 font-bold uppercase text-sm">
              {user?.name?.[0] || 'U'}
            </div>
            {user?.role === 'admin' && (
              <span className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#0a0a12]">
                <ShieldCheck size={12} className="text-emerald-400" />
              </span>
            )}
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-2.5 overflow-hidden flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 truncate capitalize">{user?.role || 'sales'}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={logout}
          title={isCollapsed ? 'Sign out' : undefined}
          className={`flex items-center w-full px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="shrink-0" size={18} />
          {!isCollapsed && <span className="ml-3 text-sm font-medium">Sign out</span>}
        </button>
      </div>
    </motion.aside>
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}
      {sidebarContent}
    </>
  );
};

export default Sidebar;
