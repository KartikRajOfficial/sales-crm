import React from 'react';
import ChartCard from './ChartCard';
import { motion } from 'framer-motion';

/**
 * SalesFunnelChart — horizontal funnel bars in pipeline order.
 * Expects [{ stage, count, value }]. Widths are relative to the largest
 * stage so the funnel shape reads even with small numbers.
 */
const BAR_COLORS = [
  'from-violet-500 to-violet-400',
  'from-indigo-500 to-indigo-400',
  'from-blue-500 to-blue-400',
  'from-sky-500 to-sky-400',
  'from-cyan-500 to-cyan-400',
];

const SalesFunnelChart = ({ data = [] }) => {
  const maxCount = Math.max(1, ...data.map((d) => d.count || 0));
  const hasData = data.some((d) => (d.count || 0) > 0);

  return (
    <ChartCard title="Sales Funnel" subtitle="Progression from prospect to won">
      {!hasData ? (
        <div className="h-full flex items-center justify-center text-sm text-gray-500">No opportunity data yet</div>
      ) : (
        <div className="h-full flex flex-col justify-center space-y-3">
          {data.map((stage, index) => {
            const widthPercent = Math.max((stage.count / maxCount) * 100, 6);
            return (
              <div key={stage.stage} className="w-full flex items-center group">
                <div className="w-28 text-right pr-4 shrink-0">
                  <span className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">
                    {stage.stage}
                  </span>
                </div>
                <div className="flex-1 flex items-center">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPercent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
                    className={`h-9 rounded-lg bg-gradient-to-r ${BAR_COLORS[Math.min(index, BAR_COLORS.length - 1)]} flex items-center px-3 relative overflow-hidden shadow-lg`}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-white font-bold text-sm relative z-10 drop-shadow tabular-nums">{stage.count}</span>
                  </motion.div>
                  {stage.value > 0 && (
                    <span className="ml-3 text-xs text-gray-500 font-medium tabular-nums whitespace-nowrap">
                      ${stage.value.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ChartCard>
  );
};

export default SalesFunnelChart;
