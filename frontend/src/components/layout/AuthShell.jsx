import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Users, Building2, ShieldCheck } from 'lucide-react';

const highlights = [
  { icon: TrendingUp, title: 'Pipeline at a glance', desc: 'Live stats, funnel and trends on one dashboard.' },
  { icon: Users, title: 'Lead to close', desc: 'Track leads, convert accounts, win opportunities.' },
  { icon: ShieldCheck, title: 'Role-based access', desc: 'Admin and sales roles with the right permissions.' },
];

/**
 * AuthShell — the split-screen frame shared by Login and Register.
 * Left: branded aurora panel with product highlights (hidden on mobile).
 * Right: the form, passed in as children.
 */
const AuthShell = ({ heading, subheading, children }) => {
  return (
    <div className="min-h-screen flex aurora-bg">
      <div className="pointer-events-none fixed inset-0 grid-texture opacity-[0.5]" />

      {/* Brand panel */}
      <div className="relative z-10 hidden lg:flex lg:w-1/2 xl:w-[55%] flex-col justify-between p-12 xl:p-16 border-r border-white/[0.06]">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 blur-md bg-violet-500/40 rounded-lg" />
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600">
              <Zap className="text-white" size={20} fill="currentColor" />
            </div>
          </div>
          <span className="text-xl font-bold text-white font-display">
            Nexus<span className="gradient-text">CRM</span>
          </span>
        </motion.div>

        <div className="max-w-lg">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl xl:text-5xl font-bold text-white font-display leading-[1.1] tracking-tight"
          >
            The sales workspace your <span className="gradient-text">pipeline</span> deserves.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-5 text-gray-400 text-lg leading-relaxed"
          >
            Capture leads, nurture accounts and close opportunities — all in one fast, focused place.
          </motion.p>

          <div className="mt-10 space-y-4">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 text-violet-300 shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{h.title}</p>
                    <p className="text-sm text-gray-500">{h.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-gray-600">© {new Date().getFullYear()} NexusCRM. Crafted for modern sales teams.</p>
      </div>

      {/* Form panel */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Compact brand for mobile (panel is hidden there) */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8 justify-center">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
              <Zap className="text-white" size={18} fill="currentColor" />
            </div>
            <span className="text-lg font-bold text-white font-display">
              Nexus<span className="gradient-text">CRM</span>
            </span>
          </div>

          <div className="bg-[#12121c]/80 backdrop-blur-xl border border-white/[0.07] rounded-2xl p-8 shadow-2xl">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-white font-display">{heading}</h1>
              {subheading && <p className="text-gray-400 mt-1.5 text-sm">{subheading}</p>}
            </div>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthShell;
