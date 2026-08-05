import React from 'react';

/**
 * EmptyState — shown when a collection is empty or a search returns nothing.
 * The icon sits in a soft gradient medallion so empty screens still feel designed.
 */
const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-4 text-center">
      {Icon && (
        <div className="relative mb-5">
          <div className="absolute inset-0 blur-2xl bg-violet-500/20 rounded-full" />
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10">
            <Icon className="w-7 h-7 text-violet-300" />
          </div>
        </div>
      )}
      <h3 className="text-base font-semibold text-gray-200">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 mt-1.5 max-w-sm mx-auto leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default EmptyState;
