import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ChartCard from './ChartCard';
import { LEAD_STATUS_COLORS } from '../../utils/constants';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#13131f]/95 backdrop-blur border border-white/[0.10] p-3 rounded-xl shadow-xl">
        <p className="text-gray-300 text-sm font-medium mb-0.5">{payload[0].name}</p>
        <p className="text-white text-lg font-bold tabular-nums">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const LeadsByStatusChart = ({ data = [] }) => {
  const total = data.reduce((acc, curr) => acc + curr.count, 0);
  const hasData = total > 0;

  return (
    <ChartCard title="Leads by Status" subtitle="Distribution across the lead lifecycle">
      {!hasData ? (
        <div className="h-full flex items-center justify-center text-sm text-gray-500">No leads to chart yet</div>
      ) : (
        <div className="relative h-full">
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10" style={{ paddingBottom: '36px' }}>
            <span className="text-3xl font-bold text-white font-display tabular-nums">{total}</span>
            <span className="text-xs text-gray-500 font-medium">Total Leads</span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={62} outerRadius={92} paddingAngle={4} dataKey="count" nameKey="status" stroke="none">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={LEAD_STATUS_COLORS[entry.status]?.fill || '#8b5cf6'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartCard>
  );
};

export default LeadsByStatusChart;
