'use client';

import { useState, useEffect, useRef } from "react";
import { callDifyAPI } from "@/lib/dify";

export default function ItPassportPage() {
  // 問題の型定義
  interface QuizQuestion {
    question: string;
    choice1: string;
    choice2: string;
    choice3: string;
    choice4: string;
    answer: number;
  }

  // 問題の配列と現在の問題番号
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);

  // 現在の問題の状態
  const [question, setQuestion] = useState("情報セキュリティの三大要素はどれか。");
  const [choice1, setChoice1] = useState("機密性・完全性・可用性");
  const [choice2, setChoice2] = useState("信頼性・効率性・安全性");
  const [choice3, setChoice3] = useState("正確性・迅速性・柔軟性");
  const [choice4, setChoice4] = useState("透明性・公平性・独立性");
  const [answer, setAnswer] = useState(1); // 正解は1番目（1始まり）

  // 選択状態と判定結果
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ai, setAi] = useState('');

  // スコア管理
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [questionResults, setQuestionResults] = useState<Map<number, boolean>>(new Map()); // 正解・不正解の記録

  // API呼び出しの重複を防ぐためのref
  const hasInitialized = useRef(false);

  // サイト訪問時に一度実行されるuseEffect
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      generateAllQuestions();
    }
  }, []);

  // 10問の問題を生成する関数
  const generateAllQuestions = async () => {
    setIsLoading(true);
    try {
      console.log('10問の問題を生成しています...');
      const newQuestions: QuizQuestion[] = [];
      
      // 10問の問題を順番に生成
      for (let i = 0; i < totalQuestions; i++) {
        console.log(`${i + 1}問目を生成中...`);
        const data = await callDifyAPI();
        
        newQuestions.push({
          question: data.question,
          choice1: data.choice1,
          choice2: data.choice2,
          choice3: data.choice3,
          choice4: data.choice4,
          answer: parseInt(data.ans) || 1
        });
        
        // APIの負荷を軽減するため少し待機
        if (i < totalQuestions - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      setQuestions(newQuestions);
      // 最初の問題を表示
      if (newQuestions.length > 0) {
        const firstQuestion = newQuestions[0];
        setQuestion(firstQuestion.question);
        setChoice1(firstQuestion.choice1);
        setChoice2(firstQuestion.choice2);
        setChoice3(firstQuestion.choice3);
        setChoice4(firstQuestion.choice4);
        setAnswer(firstQuestion.answer);
      }
      
      console.log('10問の問題を正常に生成しました');
    } catch (error) {
      console.error('Error:', error);
      setAi('問題の生成中にエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  // 回答ボタン押下時の処理
  const handleAnswer = () => {
    if (selected === null) return;
    
    // 既に回答済みの問題の場合は処理しない
    if (answeredQuestions.has(currentQuestionIndex)) {
      setResult("この問題は既に回答済みです");
      return;
    }
    
    const isCorrect = selected === answer;
    if (isCorrect) {
      setResult("正解！");
      setScore(prev => prev + 1);
    } else {
      setResult("不正解");
    }
    
    // 回答済みの問題として記録
    setAnsweredQuestions(prev => new Set(prev).add(currentQuestionIndex));
    // 正解・不正解の結果を記録
    setQuestionResults(prev => new Map(prev).set(currentQuestionIndex, isCorrect));
  };

  // 選択肢の色を決定する関数
  const getChoiceColor = (choiceNumber: number) => {
    if (!answeredQuestions.has(currentQuestionIndex)) {
      // 未回答の場合
      return selected === choiceNumber ? 'bg-blue-200' : 'bg-white';
    }
    
    // 回答済みの場合
    if (choiceNumber === answer) {
      // 正解の選択肢は常に緑
      return 'bg-green-200 text-green-800';
    } else if (selected === choiceNumber && selected !== answer) {
      // 選択した選択肢が不正解の場合は赤
      return 'bg-red-200 text-red-800';
    } else {
      // その他の選択肢はグレー
      return 'bg-gray-100 text-gray-600';
    }
  };

  // 次の問題に進む関数
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      const nextQuestion = questions[nextIndex];
      
      setCurrentQuestionIndex(nextIndex);
      setQuestion(nextQuestion.question);
      setChoice1(nextQuestion.choice1);
      setChoice2(nextQuestion.choice2);
      setChoice3(nextQuestion.choice3);
      setChoice4(nextQuestion.choice4);
      setAnswer(nextQuestion.answer);
      
      // 状態をリセット
      setSelected(null);
      setResult(null);
    }
  };

  // 前の問題に戻る関数
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      const prevQuestion = questions[prevIndex];
      
      setCurrentQuestionIndex(prevIndex);
      setQuestion(prevQuestion.question);
      setChoice1(prevQuestion.choice1);
      setChoice2(prevQuestion.choice2);
      setChoice3(prevQuestion.choice3);
      setChoice4(prevQuestion.choice4);
      setAnswer(prevQuestion.answer);
      
      // 状態をリセット
      setSelected(null);
      setResult(null);
    }
  };

  // 特定の問題に移動する関数
  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      const targetQuestion = questions[index];
      
      setCurrentQuestionIndex(index);
      setQuestion(targetQuestion.question);
      setChoice1(targetQuestion.choice1);
      setChoice2(targetQuestion.choice2);
      setChoice3(targetQuestion.choice3);
      setChoice4(targetQuestion.choice4);
      setAnswer(targetQuestion.answer);
      
      // 状態をリセット
      setSelected(null);
      setResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <span>takumi 担当</span>
          <div className="text-right">
            <div className="text-lg font-bold">問題 {currentQuestionIndex + 1} / {totalQuestions}</div>
            <div className="text-sm text-gray-600">正解数: {score} / {answeredQuestions.size}</div>
          </div>
        </div>

                 {/* 問題ナビゲーション */}
         {questions.length > 0 && (
           <div className="flex flex-wrap gap-2 justify-center">
             {questions.map((_, index) => (
               <button
                 key={index}
                 className={`w-10 h-10 rounded-full text-sm font-bold transition-colors ${
                   index === currentQuestionIndex
                     ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                     : answeredQuestions.has(index)
                     ? questionResults.get(index)
                       ? 'bg-green-200 text-green-800 hover:bg-green-300' // 正解
                       : 'bg-red-200 text-red-800 hover:bg-red-300' // 不正解
                     : 'bg-gray-200 text-gray-600 hover:bg-gray-300' // 未回答
                 }`}
                 onClick={() => goToQuestion(index)}
                 title={
                   answeredQuestions.has(index) 
                     ? `問題${index + 1} - ${questionResults.get(index) ? '正解' : '不正解'} (正解: 選択肢${questions[index]?.answer || '?'})` 
                     : `問題${index + 1} - 未回答 (正解: 選択肢${questions[index]?.answer || '?'})`
                 }
               >
                 {index + 1}
               </button>
             ))}
           </div>
         )}

        {/* 問題文の表示 */}
        {questions.length > 0 ? (
          <>
            <div className="text-xl font-bold">{question}</div>
            {/* 選択肢ボタン */}
            <div className="flex flex-col space-y-2">
              <button
                className={`border rounded p-2 text-left ${
                  selected === 1 ? 'bg-blue-200' : 'bg-white'
                } ${answeredQuestions.has(currentQuestionIndex) ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !answeredQuestions.has(currentQuestionIndex) && setSelected(1)}
                disabled={answeredQuestions.has(currentQuestionIndex)}
              >
                1: {choice1}
              </button>
              <button
                className={`border rounded p-2 text-left ${
                  selected === 2 ? 'bg-blue-200' : 'bg-white'
                } ${answeredQuestions.has(currentQuestionIndex) ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !answeredQuestions.has(currentQuestionIndex) && setSelected(2)}
                disabled={answeredQuestions.has(currentQuestionIndex)}
              >
                2: {choice2}
              </button>
              <button
                className={`border rounded p-2 text-left ${
                  selected === 3 ? 'bg-blue-200' : 'bg-white'
                } ${answeredQuestions.has(currentQuestionIndex) ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !answeredQuestions.has(currentQuestionIndex) && setSelected(3)}
                disabled={answeredQuestions.has(currentQuestionIndex)}
              >
                3: {choice3}
              </button>
              <button
                className={`border rounded p-2 text-left ${
                  selected === 4 ? 'bg-blue-200' : 'bg-white'
                } ${answeredQuestions.has(currentQuestionIndex) ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !answeredQuestions.has(currentQuestionIndex) && setSelected(4)}
                disabled={answeredQuestions.has(currentQuestionIndex)}
              >
                4: {choice4}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-xl text-gray-600 mb-4">
              {isLoading ? '問題を生成中です...' : '問題がまだ生成されていません'}
            </div>
            {!isLoading && (
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={generateAllQuestions}
              >
                問題を生成する
              </button>
            )}
          </div>
        )}

        {/* 問題が生成されている場合のみ表示 */}
        {questions.length > 0 && (
          <>
                         {/* 回答ボタン */}
             <button
               className="mt-4 px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
               onClick={handleAnswer}
               disabled={selected === null || answeredQuestions.has(currentQuestionIndex)}
             >
               {answeredQuestions.has(currentQuestionIndex) ? '回答済み' : '回答'}
             </button>

            {/* 前の問題・次の問題ボタン */}
            <div className="flex gap-4 justify-center mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                前の問題
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
                onClick={goToNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                次の問題
              </button>
            </div>

            {/* 判定結果の表示 */}
            {result && (
              <div className="mt-4 text-lg font-bold">
                {result}（正解: 選択肢{answer}）
              </div>
            )}
            
            {/* 回答済み問題の場合は正解をハイライト表示 */}
            {answeredQuestions.has(currentQuestionIndex) && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                <div className="text-lg font-bold text-green-800 mb-2">答え</div>
                <div className="text-green-700">
                  選択肢{answer}: {answer === 1 ? choice1 : answer === 2 ? choice2 : answer === 3 ? choice3 : choice4}
                </div>
              </div>
            )}
          </>
        )}

        {/* 新しい問題を取得するボタン */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => {
            setSelected(null);
            setResult(null);
            generateAllQuestions();
          }}
          disabled={isLoading}
        >
          {isLoading ? '生成中...' : '新しい10問'}
        </button>
        
        
      </div>
    </div>
  );
}
