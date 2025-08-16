
'use client';
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { TeamView } from '@/components/dashboard/TeamView';
import { useAuth } from '@/hooks/useAuth';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'team'>('dashboard');
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">システムを読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">認証に失敗しました。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {activeTab === 'dashboard' ? <DashboardView /> : <TeamView />}
      </main>
    </div>
  );
}

export default App;
//mockData.tsにAPIをぶち込むんだ🚀