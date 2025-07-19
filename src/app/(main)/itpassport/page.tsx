'use client';

import { useState } from "react";

export default function ItPassportPage() {
  // 問題文、選択肢、正解のuseStateを追加
  const [question] = useState("情報セキュリティの三大要素はどれか。");
  const [choice1] = useState("機密性・完全性・可用性");
  const [choice2] = useState("信頼性・効率性・安全性");
  const [choice3] = useState("正確性・迅速性・柔軟性");
  const [choice4] = useState("透明性・公平性・独立性");
  const [answer] = useState(1); // 正解は1番目（1始まり）

  // 選択状態と判定結果
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ai, setAi] = useState('');

  // 回答ボタン押下時の処理
  const handleAnswer = () => {
    if (selected === null) return;
    if (selected === answer) {
      setResult("正解！");
    } else {
      setResult("不正解");
    }
  };

  // const answerSubmit = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await fetch('/api/chat', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ message: "回答" }),
  //     });

  //     if (!res.ok) {
  //       throw new Error('API request failed');
  //     }

  //     const data = await res.json();
  //     setAi(data.answer);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setAi('エラーが発生しました');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">takumi 担当</div>
        {/* 問題文の表示 */}
        <div className="text-xl font-bold">{question}</div>
        {/* 選択肢ボタン */}
        <div className="flex flex-col space-y-2">
          <button
            className={`border rounded p-2 text-left ${selected === 1 ? 'bg-blue-200' : 'bg-white'}`}
            onClick={() => setSelected(1)}
          >
            1: {choice1}
          </button>
          <button
            className={`border rounded p-2 text-left ${selected === 2 ? 'bg-blue-200' : 'bg-white'}`}
            onClick={() => setSelected(2)}
          >
            2: {choice2}
          </button>
          <button
            className={`border rounded p-2 text-left ${selected === 3 ? 'bg-blue-200' : 'bg-white'}`}
            onClick={() => setSelected(3)}
          >
            3: {choice3}
          </button>
          <button
            className={`border rounded p-2 text-left ${selected === 4 ? 'bg-blue-200' : 'bg-white'}`}
            onClick={() => setSelected(4)}
          >
            4: {choice4}
          </button>
        </div>
        {/* 回答ボタン */}
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          onClick={handleAnswer}
          disabled={selected === null}
        >
          回答
        </button>
        {/* 判定結果の表示 */}
        {result && (
          <div className="mt-4 text-lg font-bold">
            {result}（正解: 選択肢{answer}
          </div>
        )}
      </div>
    </div>
  );
}
