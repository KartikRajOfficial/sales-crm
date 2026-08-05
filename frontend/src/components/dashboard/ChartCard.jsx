import React from 'react';
import Card from '../ui/Card';

/**
 * ChartCard — consistent framing for every dashboard chart:
 * a fixed-height glass card with a title, optional subtitle, and an
 * optional right-aligned action/legend slot. Children are the chart body.
 */
const ChartCard = ({ title, subtitle, action, children, className = '' }) => {
  return (
    <Card className={`p-6 h-[400px] flex flex-col ${className}`} hover>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-white font-display">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </Card>
  );
};

export default ChartCard;
