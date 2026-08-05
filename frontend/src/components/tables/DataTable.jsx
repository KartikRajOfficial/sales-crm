import React from 'react';
import { Inbox, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import EmptyState from '../ui/EmptyState';

/**
 * DataTable — presentational table.
 * Column render receives (cellValue, fullRow) so columns can use either.
 * Supports optional sortable headers, loading skeleton, and empty states.
 */
const DataTable = ({ columns, data, loading, emptyMessage, emptyDescription, emptyIcon, sortKey, sortOrder, onSortChange }) => {
  const renderHeader = (col) => {
    if (!col.sortable || !onSortChange) {
      return col.label;
    }

    const isActive = sortKey === col.key;
    const iconClass = 'w-3.5 h-3.5';

    return (
      <button
        type="button"
        onClick={() => onSortChange(col.key)}
        className="inline-flex items-center gap-1 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider transition-colors hover:text-white"
      >
        <span>{col.label}</span>
        <span className="flex items-center">
          {isActive ? (
            sortOrder === 'asc' ? (
              <ArrowUp className={iconClass} />
            ) : (
              <ArrowDown className={iconClass} />
            )
          ) : (
            <ArrowUpDown className={iconClass} />
          )}
        </span>
      </button>
    );
  };

  if (loading) {
    return (
      <div className="w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#12121c]/60">
        <table className="w-full min-w-[700px] border-collapse table-auto">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/[0.07]">
              {columns.map((col, i) => (
                <th
                  key={col.key || i}
                  className="sticky top-0 z-10 px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap bg-[#12121c]/95"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(6)].map((_, i) => (
              <tr key={i} className="border-b border-white/[0.04] last:border-0">
                {columns.map((col, j) => (
                  <td key={j} className="px-5 py-4">
                    <div className="h-4 rounded-md skeleton" style={{ width: `${55 + ((i * 7 + j * 13) % 40)}%` }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.07] bg-[#12121c]/60">
        <EmptyState
          icon={emptyIcon || Inbox}
          title={emptyMessage || 'No records found'}
          description={emptyDescription || 'Try adjusting your search or filters, or create a new record to get started.'}
        />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#12121c]/60">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse table-auto">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/[0.07]">
              {columns.map((col, i) => (
                <th
                  key={col.key || i}
                  className="sticky top-0 z-10 px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap bg-[#12121c]/95"
                >
                  {renderHeader(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row._id || row.id || i} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.025] transition-colors">
                {columns.map((col, j) => (
                  <td key={col.key || j} className="px-5 py-3.5 text-sm text-gray-300 whitespace-nowrap align-top">
                    {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
