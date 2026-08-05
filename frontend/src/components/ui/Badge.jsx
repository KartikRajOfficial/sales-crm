import React from 'react';

/**
 * Badge — status pill. `variant` accepts either a color-name string
 * ("violet") or a { bg, text } object straight from our color maps.
 * A small dot echoes the text color for quick visual scanning.
 */
const Badge = ({ children, variant = { bg: 'bg-violet-500/10', text: 'text-violet-400' }, dot = true, className = '' }) => {
  const bgClass = typeof variant === 'string' ? `bg-${variant}-500/10` : variant.bg;
  const textClass = typeof variant === 'string' ? `text-${variant}-400` : variant.text;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ring-white/[0.06] ${bgClass} ${textClass} ${className}`}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />}
      {children}
    </span>
  );
};

export default Badge;
