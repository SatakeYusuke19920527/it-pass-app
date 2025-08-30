//yuri
//usePerformanceData.ts
'use client'
import { useState, useEffect } from 'react';
import { Answer, CategoryStats, UserPerformance } from '../types';
import { fetchUserAnswers, fetchAllUsers } from '../data/mockData';

const CATEGORY_COLORS = {
  'ストラテジ': '#3B82F6',
  'マネジメント': '#10B981',
  'テクノロジ': '#8B5CF6'
};

const calculateCategoryStats = (answers: Answer[]): CategoryStats[] => {
  const categories: Array<'ストラテジ' | 'マネジメント' | 'テクノロジ'> = [
    'ストラテジ', 'マネジメント', 'テクノロジ'
  ];

  return categories.map(category => {
    const categoryAnswers = answers.filter(answer => answer.category === category);
    const correctAnswers = categoryAnswers.filter(answer => answer.isCorrect).length;
    const totalAnswers = categoryAnswers.length;
    const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

    return {
      category,
      totalAnswers,
      correctAnswers,
      accuracy,
      color: CATEGORY_COLORS[category]
    };
  });
};

export const useUserPerformance = (userId: string | null) => {
  const [userPerformance, setUserPerformance] = useState<UserPerformance | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const loadUserPerformance = async () => {
      setIsLoading(true);
      try {
        const [answers, users] = await Promise.all([
          fetchUserAnswers(userId),
          fetchAllUsers()
        ]);

        const user = users.find(u => u.id === userId);
        if (!user) return;

        const categoryStats = calculateCategoryStats(answers);
        const totalAnswers = answers.length;
        const correctAnswers = answers.filter(a => a.isCorrect).length;
        const overallAccuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

        setUserPerformance({
          user,
          categoryStats,
          overallAccuracy,
          totalAnswers
        });
      } catch (error) {
        console.error('Error loading user performance:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserPerformance();
  }, [userId]);

  return { userPerformance, isLoading };
};

export const useTeamPerformance = () => {
  const [teamPerformance, setTeamPerformance] = useState<UserPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadTeamPerformance = async () => {
    setIsLoading(true);
    try {
      const users = await fetchAllUsers();
      const performances: UserPerformance[] = [];

      for (const user of users) {
        const answers = await fetchUserAnswers(user.id);
        const categoryStats = calculateCategoryStats(answers);
        const totalAnswers = answers.length;
        const correctAnswers = answers.filter(a => a.isCorrect).length;
        const overallAccuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

        performances.push({
          user,
          categoryStats,
          overallAccuracy,
          totalAnswers
        });
      }

      // Sort by overall accuracy
      performances.sort((a, b) => b.overallAccuracy - a.overallAccuracy);
      setTeamPerformance(performances);
    } catch (error) {
      console.error('Error loading team performance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTeamPerformance();
  }, []);

  return { teamPerformance, isLoading, refetch: loadTeamPerformance };
};