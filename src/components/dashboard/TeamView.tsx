//yuri
//TeamView.tsx
'use client'
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/CardComponent';
import { TeamComparisonChart } from '../charts/TeamComparisonChart';
import { UserPerformanceCard } from '../performance/UserPerformanceCard';
import { useTeamPerformance } from '../../hooks/usePerformanceData';
import { Users, Trophy, BarChart3 } from 'lucide-react';

export const TeamView: React.FC = () => {
  const { teamPerformance, isLoading } = useTeamPerformance();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const totalMembers = teamPerformance.length;
  const avgAccuracy = Math.round(
    teamPerformance.reduce((sum, p) => sum + p.overallAccuracy, 0) / totalMembers
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">チーム成績一覧</h2>
        <p className="text-gray-600">
          全メンバーの成績を比較・分析できます
        </p>
      </div>

      {/* Team Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium mb-1">チーム平均正答率</p>
                <p className="text-3xl font-bold text-blue-700">{avgAccuracy}%</p>
              </div>
              <div className="p-3 bg-blue-200 rounded-full">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium mb-1">メンバー数</p>
                <p className="text-3xl font-bold text-green-700">{totalMembers}</p>
              </div>
              <div className="p-3 bg-green-200 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium mb-1">トップ成績</p>
                <p className="text-lg font-bold text-yellow-700">
                  {teamPerformance[0]?.user.name}
                </p>
                <p className="text-2xl font-bold text-yellow-700">
                  {teamPerformance[0]?.overallAccuracy}%
                </p>
              </div>
              <div className="p-3 bg-yellow-200 rounded-full">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Comparison Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>チーム成績比較グラフ</CardTitle>
        </CardHeader>
        <CardContent>
          <TeamComparisonChart data={teamPerformance} />
        </CardContent>
      </Card>

      {/* Individual Performance Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">メンバー別詳細成績</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {teamPerformance.map((performance, index) => (
            <UserPerformanceCard
              key={performance.user.id}
              performance={performance}
              rank={index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};