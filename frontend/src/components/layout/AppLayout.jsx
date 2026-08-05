import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AppLayout — the shell for every authenticated page.
 *
 * Owns two pieces of layout state so the sidebar and main content stay in sync:
 *  - isMobileSidebarOpen: drawer visibility on small screens
 *  - isCollapsed:         desktop rail (icon-only) vs full sidebar
 *
 * The main column's left padding tracks isCollapsed so content never leaves a
 * gap or hides beneath the sidebar. Page changes animate via a route-keyed
 * AnimatePresence.
 */
const AppLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="relative flex h-screen overflow-hidden text-gray-100 font-sans selection:bg-violet-500/30 aurora-bg">
      {/* Ambient grid texture above the aurora, below content */}
      <div className="pointer-events-none fixed inset-0 grid-texture opacity-[0.5] z-0" />

      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((v) => !v)}
      />

      <div
        className={`relative z-10 flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-[264px]'
        }`}
      >
        <TopNavbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full max-w-7xl mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
