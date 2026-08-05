import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

/**
 * Pagination — page controls with an optional results summary.
 * `total`, `pageSize` and `currentPage` (when provided) render a
 * "Showing X–Y of Z" line; the control itself is unchanged.
 */
const Pagination = ({ currentPage, totalPages, onPageChange, total, pageSize = 10 }) => {
  if (totalPages <= 1) return null;

  const generatePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

  const pages = generatePages();
  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, total ?? currentPage * pageSize);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      {typeof total === 'number' ? (
        <p className="text-sm text-gray-500 order-2 sm:order-1">
          Showing <span className="text-gray-300 font-medium tabular-nums">{from}</span>–
          <span className="text-gray-300 font-medium tabular-nums">{to}</span> of{' '}
          <span className="text-gray-300 font-medium tabular-nums">{total}</span>
        </p>
      ) : <span className="order-2 sm:order-1" />}

      <div className="flex items-center space-x-1.5 order-1 sm:order-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5 text-gray-300" />
        </button>

        {pages.map((page, index) =>
          page === '...' ? (
            <div key={`ellipsis-${index}`} className="px-2 py-2 text-gray-600 flex items-center justify-center">
              <MoreHorizontal className="w-4 h-4" />
            </div>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[2.25rem] px-3 py-2 rounded-lg text-sm font-medium border transition-all tabular-nums ${
                currentPage === page
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-violet-500/50 shadow-lg shadow-violet-900/30'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-gray-300'
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
