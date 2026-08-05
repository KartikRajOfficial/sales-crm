import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ChartCard from './ChartCard';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#13131f]/95 backdrop-blur border border-white/[0.10] p-3.5 rounded-xl shadow-xl min-w-[150px]">
        <p className="text-gray-300 text-sm font-medium mb-2.5 border-b border-white/[0.06] pb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex justify-between items-center gap-6 mb-1 last:mb-0">
            <span className="text-sm flex items-center" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
              {entry.name}
            </span>
            <span className="text-white font-semibold tabular-nums">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const MonthlyTrendChart = ({ data = [] }) => {
  const hasData = data && data.length > 0;
  return (
    <ChartCard title="Monthly Overview" subtitle="New leads and customers over time">
      {!hasData ? (
        <div className="h-full flex items-center justify-center text-sm text-gray-500">No activity to chart yet</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff0f" />
            <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#374151', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }} />
            <Area type="monotone" dataKey="leads" name="Leads" stroke="#8b5cf6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorLeads)" activeDot={{ r: 6, strokeWidth: 0, fill: '#8b5cf6' }} />
            <Area type="monotone" dataKey="customers" name="Customers" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCustomers)" activeDot={{ r: 6, strokeWidth: 0, fill: '#06b6d4' }} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

export default MonthlyTrendChart;
