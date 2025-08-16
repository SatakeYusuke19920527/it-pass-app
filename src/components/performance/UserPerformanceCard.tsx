//yuri
//UserPerformanceCard.tsx
'use client'
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/CardComponent';
import { UserPerformance } from '../../types';
import { Trophy, User } from 'lucide-react';

interface UserPerformanceCardProps {
  performance: UserPerformance;
  rank?: number;
}

export const UserPerformanceCard: React.FC<UserPerformanceCardProps> = ({ 
  performance, 
  rank 
}) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {rank && (
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-600">#{rank}</span>
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span>{performance.user.name}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {performance.overallAccuracy}%
            </div>
            <div className="text-xs text-gray-500">
              {performance.totalAnswers}問回答
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {performance.categoryStats.map(stat => (
            <div key={stat.category} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stat.color }}
                />
                <span className="text-sm font-medium">{stat.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${stat.accuracy}%`,
                      backgroundColor: stat.color 
                    }}
                  />
                </div>
                <span className="text-sm font-semibold w-10 text-right">
                  {stat.accuracy}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};