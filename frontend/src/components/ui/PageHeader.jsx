import React from 'react';
import { motion } from 'framer-motion';

/**
 * PageHeader — consistent page title block used by every module page.
 * Optional `icon` (lucide component), `title`, `subtitle`, and `action`
 * (usually the primary "Add …" button). Kept presentational and generic.
 */
const PageHeader = ({ icon: Icon, title, subtitle, action }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {Icon && (
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/10 border border-white/10 text-violet-300 shrink-0">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white font-display tracking-tight"
            >
              {title}
            </motion.h1>
            {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="h-px w-full accent-hairline mt-5 opacity-60" />
    </div>
  );
};

export default PageHeader;
