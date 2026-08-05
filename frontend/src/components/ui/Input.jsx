import React, { forwardRef } from 'react';

/**
 * Input — labelled text field with optional leading icon.
 * `icon` is a rendered element (e.g. <Mail size={18} />), not a component.
 */
const Input = forwardRef(({ label, error, icon, hint, type = 'text', className = '', ...rest }, ref) => {
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label className="text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 transition-colors group-focus-within:text-violet-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`w-full bg-white/[0.04] border border-white/10 rounded-xl py-2.5 text-white placeholder:text-gray-500 focus:bg-white/[0.06] focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all duration-200 ${
            icon ? 'pl-11 pr-4' : 'px-4'
          } ${error ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20' : ''} ${className}`}
          {...rest}
        />
      </div>
      {error ? (
        <span className="text-xs text-red-400 mt-1.5">{error}</span>
      ) : hint ? (
        <span className="text-xs text-gray-500 mt-1.5">{hint}</span>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
