//yuri
//mockData.ts
'use client'
import { User, Answer } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: '田中 太郎',
    email: 'tanaka@company.co.jp'
  },
  {
    id: '2',
    name: '佐藤 花子',
    email: 'sato@company.co.jp'
  },
  {
    id: '3',
    name: '鈴木 一郎',
    email: 'suzuki@company.co.jp'
  },
  {
    id: '4',
    name: '高橋 美咲',
    email: 'takahashi@company.co.jp'
  }
];

// Generate mock answer data
const generateMockAnswers = (): Answer[] => {
  const answers: Answer[] = [];
  const categories: Array<'ストラテジ' | 'マネジメント' | 'テクノロジ'> = [
    'ストラテジ', 'マネジメント', 'テクノロジ'
  ];

  mockUsers.forEach(user => {
    // Generate 30-50 answers per user
    const answerCount = Math.floor(Math.random() * 21) + 30;
    
    for (let i = 0; i < answerCount; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      
      // Different accuracy rates per category to make data more interesting
      let correctProbability = 0.7; // Default 70%
      if (category === 'ストラテジ') correctProbability = 0.65;
      if (category === 'マネジメント') correctProbability = 0.75;
      if (category === 'テクノロジ') correctProbability = 0.68;
      
      // Adjust probability based on user (simulate different skill levels)
      if (user.id === '2') correctProbability += 0.1; // Sato performs better
      if (user.id === '4') correctProbability += 0.05; // Takahashi performs slightly better
      
      answers.push({
        id: `${user.id}-${i}`,
        userId: user.id,
        category,
        isCorrect: Math.random() < correctProbability,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
        questionId: `q-${Math.floor(Math.random() * 1000)}`
      });
    }
  });

  return answers;
};

export const fetchUserAnswers = async (userId: string): Promise<Answer[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockAnswers.filter(answer => answer.userId === userId);
};

export const fetchAllUsers = async (): Promise<User[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockUsers;
};
export const mockAnswers = generateMockAnswers();
/*
//ここにAPIをぶち込むんだ🚀
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchUserAnswers = async (userId: string): Promise<Answer[]> => {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined');
  }
  const res = await fetch(`${API_BASE_URL}/answers?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch user answers');
  const data: Answer[] = await res.json();
  return data;
};

export const fetchAllUsers = async (): Promise<User[]> => {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined');
  }
  const res = await fetch(`${API_BASE_URL}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  const data: User[] = await res.json();
  return data;
};
*/