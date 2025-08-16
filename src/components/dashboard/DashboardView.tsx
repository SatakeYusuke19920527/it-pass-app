//yuri
//DashboardView.tsx
'use client'
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/CardComponent';
import { CategoryChart } from '../charts/CategoryChart';
import { CategoryStatsCard } from '../performance/CategoryStatsCard';
import { useUserPerformance } from '../../hooks/usePerformanceData';
import { useAuth } from '../../hooks/useAuth';
import { TrendingUp, Target, Award } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { currentUser } = useAuth();
  const { userPerformance, isLoading } = useUserPerformance(currentUser?.id || null);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!userPerformance) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-500">
          データを読み込めませんでした。
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {userPerformance.user.name} さんの成績分析
        </h2>
        <p className="text-gray-600">
          総回答数: {userPerformance.totalAnswers}問
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium mb-1">総合正答率</p>
                <p className="text-3xl font-bold text-blue-700">
                  {userPerformance.overallAccuracy}%
                </p>
              </div>
              <div className="p-3 bg-blue-200 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium mb-1">総回答数</p>
                <p className="text-3xl font-bold text-green-700">
                  {userPerformance.totalAnswers}
                </p>
              </div>
              <div className="p-3 bg-green-200 rounded-full">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium mb-1">最高カテゴリ</p>
                <p className="text-lg font-bold text-purple-700">
                  {userPerformance.categoryStats
                    .sort((a, b) => b.accuracy - a.accuracy)[0]?.category}
                </p>
                <p className="text-2xl font-bold text-purple-700">
                  {userPerformance.categoryStats
                    .sort((a, b) => b.accuracy - a.accuracy)[0]?.accuracy}%
                </p>
              </div>
              <div className="p-3 bg-purple-200 rounded-full">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {userPerformance.categoryStats.map(stats => (
          <CategoryStatsCard key={stats.category} stats={stats} />
        ))}
      </div>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle>カテゴリ別正答率グラフ</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryChart data={userPerformance.categoryStats} />
        </CardContent>
      </Card>
    </div>
  );
};