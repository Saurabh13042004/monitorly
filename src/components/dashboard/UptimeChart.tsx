import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UptimeDataPoint {
  time: string;
  uptime: number;
  incidents: number;
}

interface UptimeChartProps {
  data: UptimeDataPoint[];
  timeRange: '24h' | '7d' | '30d' | '90d';
}

export default function UptimeChart({ data, timeRange }: UptimeChartProps) {
  const formatTooltip = (value: any, name: string) => {
    if (name === 'uptime') {
      return [`${value}%`, 'Uptime'];
    }
    return [value, name];
  };

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    switch (timeRange) {
      case '24h':
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      case '7d':
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      case '30d':
      case '90d':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      default:
        return tickItem;
    }
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="uptimeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#6B7280"
            tickFormatter={formatXAxis}
          />
          <YAxis 
            stroke="#6B7280"
            domain={[95, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #374151',
              borderRadius: '12px',
              color: '#fff'
            }}
            formatter={formatTooltip}
          />
          <Area 
            type="monotone" 
            dataKey="uptime" 
            stroke="#10B981" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#uptimeGradient)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}