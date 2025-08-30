//yuri
//Header.tsx
'use client'
import React from 'react';
import { BarChart3, Users, LogOut, User } from 'lucide-react';
import { Button } from '../ui/ButtonConponent';
import { useAuth } from '../../hooks/useAuth';
import { mockUsers } from '../../data/mockData';

interface HeaderProps {
  activeTab: 'dashboard' | 'team';
  onTabChange: (tab: 'dashboard' | 'team') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const { currentUser, login, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">成績分析ダッシュボード</h1>
            </div>
            
            <nav className="flex gap-1">
              <Button
                variant={activeTab === 'dashboard' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onTabChange('dashboard')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                個人成績
              </Button>
              <Button
                variant={activeTab === 'team' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onTabChange('team')}
              >
                <Users className="w-4 h-4 mr-2" />
                チーム成績
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {currentUser && (
              <>
                <select
                  value={currentUser.id}
                  onChange={(e) => login(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {mockUsers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {currentUser.name}
                  </span>
                </div>
                
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};