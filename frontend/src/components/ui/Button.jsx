import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Button — the single button primitive used across the app.
 *
 * Contract is unchanged: variant | size | loading | fullWidth | icon (component)
 * are all still supported, so every existing call site keeps working.
 */
const variants = {
  primary:
    'relative overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30',
  secondary: 'bg-white/[0.06] border border-white/10 text-gray-200 hover:bg-white/[0.10]',
  outline: 'bg-transparent border border-white/10 text-gray-300 hover:bg-white/[0.05] hover:border-white/20',
  danger: 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20',
  ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-white/[0.06]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
};

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon: Icon,
  type = 'button',
  onClick,
  ...rest
}) => {
  const base =
    'group/btn inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a12] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;
  const widthClasses = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      className={`${base} ${variantClasses} ${sizeClasses} ${widthClasses} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {/* Sheen sweep for the primary variant only */}
      {variant === 'primary' && !disabled && !loading && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
          <span className="absolute top-0 left-0 h-full w-1/3 -skew-x-12 bg-white/15 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-sheen" />
        </span>
      )}
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && Icon && <Icon className="w-4 h-4" />}
      {children && <span className="relative">{children}</span>}
    </button>
  );
};

export default Button;
