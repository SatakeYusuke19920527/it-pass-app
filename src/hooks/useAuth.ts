//yuri
//useAuth.ts
'use client'
import { useState, useEffect } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const userId = localStorage.getItem('currentUserId') || '1';
    const user = mockUsers.find(u => u.id === userId) || mockUsers[0];
    setCurrentUser(user);
    setIsLoading(false);
  }, []);

  const login = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUserId', userId);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUserId');
  };

  return {
    currentUser,
    isLoading,
    login,
    logout,
    isAuthenticated: !!currentUser
  };
};