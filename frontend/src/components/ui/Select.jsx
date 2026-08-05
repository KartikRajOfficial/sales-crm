import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Select — labelled native select styled for the dark theme.
 * Placeholder is opt-in so filter/forms that already supply an
 * "All"/"Select…" option don't get a duplicate empty row.
 */
const Select = forwardRef(({ label, error, options = [], placeholder, className = '', ...rest }, ref) => {
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label className="text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      )}
      <div className="relative group">
        <select
          ref={ref}
          className={`w-full appearance-none bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-white focus:bg-white/[0.06] focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all duration-200 ${
            error ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20' : ''
          } ${className}`}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled className="bg-[#12121c] text-gray-500">{placeholder}</option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#12121c] text-white">
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 transition-colors group-focus-within:text-violet-400">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
      {error && <span className="text-xs text-red-400 mt-1.5">{error}</span>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
