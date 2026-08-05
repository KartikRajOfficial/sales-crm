import React from 'react';

/**
 * Card — the elevated glass surface used for panels, stats and charts.
 * `hover` keeps its original opt-in behaviour; `as` lets callers render
 * a different element (e.g. a link) without changing styling.
 */
const Card = ({ children, className = '', hover = false, as: Tag = 'div', ...rest }) => {
  const base =
    'bg-[#12121c]/80 backdrop-blur-xl border border-white/[0.07] rounded-2xl shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]';
  const hoverClasses = hover
    ? 'transition-all duration-300 hover:border-white/[0.14] hover:shadow-xl hover:shadow-violet-500/[0.07]'
    : '';

  return (
    <Tag className={`${base} ${hoverClasses} ${className}`} {...rest}>
      {children}
    </Tag>
  );
};

export default Card;
