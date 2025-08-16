'use client';
/*
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const ProgressChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // データ取得
    fetch('/api/progress') // APIからデータを取得
      .then(response => response.json())
      .then(data => {
        setChartData({
          labels: data.questions, // 問題名
          datasets: [
            {
              label: '正解率 (%)',
              data: data.correctRates, // 正解率
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });
      });
  }, []);

  return (
    <div>
      <h1>進捗状況</h1>
      {chartData ? <Bar data={chartData} /> : <p>データを取得中...</p>}
    </div>
  );
};

export default ProgressChart;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, LineElement, PointElement,} from 'chart.js';
import { Line } from 'react-chartjs-2';
//import { useUser } from '@clerk/clerk-react';

// 登録する要素一覧（PointElement を忘れずに！）
Chart.register(LineElement, PointElement, CategoryScale, LinearScale);

  // APIからデータを取得
  useEffect(() => {
    fetch('/api/user-test-results')  // ← ここはAPIのURLに合わせて変更
      .then(res => res.json())
      .then(data => setTestData(data));
  }, []);

  const totalAnswers = testData.reduce((sum, test) => sum + test.correct + test.incorrect, 0);
  const totalCorrect = testData.reduce((sum, test) => sum + test.correct, 0);
  const accuracy = totalAnswers ? ((totalCorrect / totalAnswers) * 100).toFixed(1) : 0;
  

  //dummyDataを差し替えてねちゃんと覚えててね↓
const dummyData = [
  { testId: 'Test001', correct: 7,},
  { testId: 'Test002', correct: 3, },
  { testId: 'Test003', correct: 6, },
];

const totalAnswers = dummyData.reduce((sum, test) => sum + test.correct,  0);
const totalCorrect = dummyData.reduce((sum, test) => sum + test.correct, 0);
const accuracy = ((totalCorrect / totalAnswers) * 100).toFixed(1);


const lineData = {
  labels: dummyData.map(test => test.testId),
  datasets: [
    {
      label: '正解数の推移',
      data: dummyData.map(test => test.correct),
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      fill: true,
      tension: 0, // 曲線のなめらかさ
    },
  ],
};

//_<h2>{userName}</h2>を入れろ
const ScoreDashboard = () => {
 // const { user } = useUser();
//const userName = user?.firstName || "ゲスト";
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>???san</h2>
      <p>正答率：{accuracy}%</p>
      <p>総回答数：{totalAnswers}問</p>

     <h3>🗓 正答数の推移グラフ</h3>
<Line data={lineData} options={{
  scales: {
    y: {
      max: 10,
      min: 0,
      ticks: {
        stepSize: 1,
      },
    },
  },
}}
 />

    </div>
  );
};

export default ScoreDashboard;*/
//App.tsx
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