//yuri
//CategoryStatsCard.tsx
'use clients'
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/CardComponent';
import { CategoryStats } from '../../types';

interface CategoryStatsCardProps {
  stats: CategoryStats;
}

export const CategoryStatsCard: React.FC<CategoryStatsCardProps> = ({ stats }) => {
  return (
    <Card className="hover:scale-105 transition-transform duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="text-base">{stats.category}</span>
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: stats.color }}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-2">
          <div className="text-3xl font-bold" style={{ color: stats.color }}>
            {stats.accuracy}%
          </div>
          <div className="text-sm text-gray-600">
            正解: {stats.correctAnswers} / {stats.totalAnswers}問
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${stats.accuracy}%`,
                backgroundColor: stats.color 
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};