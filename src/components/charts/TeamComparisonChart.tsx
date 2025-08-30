//yuri
//TeamComparisonChart.tsx
'use client'
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { UserPerformance } from '../../types';

interface TeamComparisonChartProps {
  data: UserPerformance[];
}

export const TeamComparisonChart: React.FC<TeamComparisonChartProps> = ({ data }) => {
  const chartData = data.map(performance => ({
    name: performance.user.name,
    ストラテジ: performance.categoryStats.find(s => s.category === 'ストラテジ')?.accuracy || 0,
    マネジメント: performance.categoryStats.find(s => s.category === 'マネジメント')?.accuracy || 0,
    テクノロジ: performance.categoryStats.find(s => s.category === 'テクノロジ')?.accuracy || 0,
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            label={{ value: '正答率 (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
          />
          <Legend />
          <Bar dataKey="ストラテジ" fill="#3B82F6" radius={[2, 2, 0, 0]} />
          <Bar dataKey="マネジメント" fill="#10B981" radius={[2, 2, 0, 0]} />
          <Bar dataKey="テクノロジ" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};