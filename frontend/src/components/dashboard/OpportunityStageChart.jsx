import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ChartCard from './ChartCard';
import { OPPORTUNITY_STAGE_COLORS } from '../../utils/constants';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#13131f]/95 backdrop-blur border border-white/[0.10] p-3 rounded-xl shadow-xl">
        <p className="text-gray-300 text-sm font-medium mb-2">{data.stage}</p>
        <div className="space-y-1">
          <p className="text-white text-sm">Deals: <span className="font-semibold tabular-nums">{data.count}</span></p>
          <p className="text-white text-sm">Value: <span className="font-semibold tabular-nums">${data.value?.toLocaleString()}</span></p>
        </div>
      </div>
    );
  }
  return null;
};

const OpportunityStageChart = ({ data = [] }) => {
  const hasData = data && data.some((d) => (d.count || 0) > 0);
  return (
    <ChartCard title="Pipeline Stages" subtitle="Deals grouped by current stage">
      {!hasData ? (
        <div className="h-full flex items-center justify-center text-sm text-gray-500">No opportunities to chart yet</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ffffff0a" />
            <XAxis type="number" dataKey="count" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
            <YAxis type="category" dataKey="stage" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} width={100} />
            <Tooltip cursor={{ fill: '#ffffff0a' }} content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={22}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={OPPORTUNITY_STAGE_COLORS[entry.stage]?.fill || '#8b5cf6'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

export default OpportunityStageChart;
