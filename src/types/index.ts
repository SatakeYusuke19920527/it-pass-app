//yuri
//index.ts
'use client'
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Answer {
  id: string;
  userId: string;
  category: 'ストラテジ' | 'マネジメント' | 'テクノロジ';
  isCorrect: boolean;
  timestamp: Date;
  questionId: string;
}

export interface CategoryStats {
  category: 'ストラテジ' | 'マネジメント' | 'テクノロジ';
  totalAnswers: number;
  correctAnswers: number;
  accuracy: number;
  color: string;
}

export interface UserPerformance {
  user: User;
  categoryStats: CategoryStats[];
  overallAccuracy: number;
  totalAnswers: number;
}