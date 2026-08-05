import React from 'react';
import { Loader2 } from 'lucide-react';

const sizeMap = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' };

export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClass = sizeMap[size] || sizeMap.md;
  return <Loader2 className={`animate-spin text-violet-500 ${sizeClass} ${className}`} />;
};

export const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#07070d] z-50">
      <div className="relative">
        <div className="absolute inset-0 blur-xl bg-violet-500/30 rounded-full" />
        <LoadingSpinner size="lg" className="relative" />
      </div>
      <span className="mt-4 text-sm font-medium text-gray-400">Loading SalesCRM…</span>
    </div>
  );
};
