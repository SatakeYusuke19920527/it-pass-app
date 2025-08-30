// 'use client';
// import { useState, useEffect } from "react";
// import { UserButton, useUser } from "@clerk/nextjs";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// export default function UsersPage() {
//   const { isLoaded, isSignedIn, user } = useUser();
//   const [goalDate, setGoalDate] = useState("");
//   const [learningRecords, setLearningRecords] = useState<{date: string, hours: number}[]>([]);

//   useEffect(() => {
//     // 目標日を取得
//     fetch("/api/user/goal")
//       .then(res => res.json())
//       .then(data => setGoalDate(data.goalDate || ""));

//     // 学習記録を取得
//     fetch("/api/user/learning-records")
//       .then(res => res.json())
//       .then(data => setLearningRecords(data.records));
//   }, []);

//   const saveGoal = async () => {
//     await fetch("/api/user/goal", {
//       method: "POST",
//       body: JSON.stringify({ goalDate }),
//       headers: { "Content-Type": "application/json" }
//     });
//     alert("保存しました！");
//   };

//   if (!isLoaded) return <div>読み込み中...</div>;
//   if (!isSignedIn) return <div>ログインが必要です</div>;

//   // 日付ごとの学習時間をマップに変換
//   const dateToHours = new Map(
//     learningRecords.map(r => [new Date(r.date).toDateString(), r.hours])
//   );

//   // 色を濃くする関数（例: 0h=白, 最大3h=濃い青）
//   const getTileColor = (hours: number) => {
//     if (!hours) return "";
//     const maxHours = 3; // 目安の最大学習時間
//     const intensity = Math.min(hours / maxHours, 1);
//     const blueValue = 200 + Math.floor(55 * intensity); // Tailwind bg-blue-200~bg-blue-255的なイメージ
//     return `bg-blue-${Math.floor(200 + 55 * intensity)}`;
//   };

//   return (
//     <div className="p-8">
//       <UserButton />
//       <p>こんにちは、{user?.firstName} さん！</p>
//       <p>Email: {user.emailAddresses[0].emailAddress}</p>

//       {/* 目標日設定 */}
//       <div className="mt-6">
//         <p className="font-semibold">
//           目標日: {goalDate ? new Date(goalDate).toLocaleDateString() : "未設定"}
//         </p>

//         <label className="block mt-2">目標日を変更:</label>
//         <input
//           type="date"
//           value={goalDate}
//           onChange={e => setGoalDate(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button
//           onClick={saveGoal}
//           className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           保存
//         </button>
//       </div>

//       {/* ヒートマップカレンダー */}
//       <div className="mt-10">
//         <h2 className="text-lg font-bold mb-2">学習記録カレンダー</h2>
//         <Calendar
//           tileClassName={({ date, view }) => {
//             const hours = dateToHours.get(date.toDateString());
//             if (hours) {
//               // Tailwindのbg-blue-200~bg-blue-500に対応
//               if (hours >= 2.5) return "bg-blue-500 text-white rounded";
//               if (hours >= 1.5) return "bg-blue-400 text-white rounded";
//               if (hours >= 0.5) return "bg-blue-300 rounded";
//               return "bg-blue-200 rounded";
//             }
//           }}
//         />
//       </div>
//     </div>
//   );
// }




// 'use client';
// import { useState, useEffect } from "react";
// import { UserButton, useUser } from "@clerk/nextjs";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// export default function UsersPage() {
//   const { isLoaded, isSignedIn, user } = useUser();
//   const [goalDate, setGoalDate] = useState("");
//   const [learningRecords, setLearningRecords] = useState<{date: string, hours: number}[]>([]);

//   useEffect(() => {
//     fetch("/api/user/goal")
//       .then(res => res.json())
//       .then(data => setGoalDate(data.goalDate || ""));

//     fetch("/api/user/learning-records")
//       .then(res => res.json())
//       .then(data => setLearningRecords(data.records));
//   }, []);

//   const saveGoal = async () => {
//     await fetch("/api/user/goal", {
//       method: "POST",
//       body: JSON.stringify({ goalDate }),
//       headers: { "Content-Type": "application/json" }
//     });
//     alert("保存しました！");
//   };

//   if (!isLoaded) return <div>読み込み中...</div>;
//   if (!isSignedIn) return <div>ログインが必要です</div>;

//   const dateToHours = new Map(
//     learningRecords.map(r => [new Date(r.date).toDateString(), r.hours])
//   );

//   return (
//     <div className="p-8 min-h-screen flex-col items-center">
//       {/* ヘッダー */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">学習ダッシュボード</h1>
//           <p className="text-gray-600 mt-1">こんにちは、{user?.firstName} さん！</p>
//            <p>Email: {user.emailAddresses[0].emailAddress}</p>
//         </div>
//         <UserButton />
//       </div>

//       {/* 目標日カード */}
//       <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-xl font-semibold text-gray-700 mb-3">目標日</h2>
//           <p className="text-4xl font-bold text-gray-800 mb-4">
//           {goalDate ? new Date(goalDate).toLocaleDateString() : "未設定"}
//         </p>
//         <div className="flex items-center gap-3">
//           <input
//             type="date"
//             value={goalDate}
//             onChange={e => setGoalDate(e.target.value)}
//             className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             onClick={saveGoal}
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
//           >
//             保存
//           </button>
//         </div>
//       </div>

//       {/* ヒートマップカレンダーカード */}
//       <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">学習記録カレンダー</h2>
//         <Calendar
//           className="border rounded-lg overflow-hidden"
//           tileClassName={({ date, view }) => {
//             const hours = dateToHours.get(date.toDateString());
//             if (hours) {
//               if (hours >= 2.5) return "bg-blue-600 text-white font-bold rounded-full";
//               if (hours >= 1.5) return "bg-blue-500 text-white font-semibold rounded-full";
//               if (hours >= 0.5) return "bg-blue-300 rounded-full";
//               return "bg-blue-200 rounded-full";
//             }
//           }}
//         />
//       </div>
//     </div>
//   );
// }





// 'use client';
// import { useState, useEffect } from "react";
// import { UserButton, useUser } from "@clerk/nextjs";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// export default function UsersPage() {
//   const { isLoaded, isSignedIn, user } = useUser();
//   const [goalDate, setGoalDate] = useState("");
//   const [learningRecords, setLearningRecords] = useState<{date: string, hours: number}[]>([]);

//   useEffect(() => {
//     fetch("/api/user/goal")
//       .then(res => res.json())
//       .then(data => setGoalDate(data.goalDate || ""));

//     fetch("/api/user/learning-records")
//       .then(res => res.json())
//       .then(data => setLearningRecords(data.records));
//   }, []);

//   const saveGoal = async () => {
//     await fetch("/api/user/goal", {
//       method: "POST",
//       body: JSON.stringify({ goalDate }),
//       headers: { "Content-Type": "application/json" }
//     });
//     alert("保存しました！");
//   };

//   if (!isLoaded) return <div>読み込み中...</div>;
//   if (!isSignedIn) return <div>ログインが必要です</div>;

//   const dateToHours = new Map(
//     learningRecords.map(r => [new Date(r.date).toDateString(), r.hours])
//   );

//   return (
//     <div className="min-h-screen flex flex-col items-center p-8">
//       {/* ヘッダー */}
//       <div className="flex items-center justify-between w-full max-w-2xl mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">学習ダッシュボード</h1>
//           <p className="text-gray-600 mt-1">こんにちは、{user?.firstName} さん！</p>
//           <p className="text-gray-600">Email: {user.emailAddresses[0].emailAddress}</p>
//         </div>
//         {/* <UserButton /> */}
//       </div>

//       {/* 目標日カード */}
//       <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mb-8 text-center">
//         <h2 className="text-xl font-semibold text-gray-700 mb-3">目標日</h2>
//         <p className="text-5xl font-bold text-black-700 mb-4">
//           {goalDate ? new Date(goalDate).toLocaleDateString() : "未設定"}
//         </p>
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
//           <input
//             type="date"
//             value={goalDate}
//             onChange={e => setGoalDate(e.target.value)}
//             className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             onClick={saveGoal}
//             className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
//           >
//             保存
//           </button>
//         </div>
//       </div>

//       {/* ヒートマップカレンダーカード */}
//       <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">学習記録カレンダー</h2>
//         <Calendar
//           className="border rounded-lg overflow-hidden mx-auto"
//           tileClassName={({ date, view }) => {
//             const hours = dateToHours.get(date.toDateString());
//             if (hours) {
//               if (hours >= 2.5) return "bg-blue-600 text-white font-bold rounded-full";
//               if (hours >= 1.5) return "bg-blue-500 text-white font-semibold rounded-full";
//               if (hours >= 0.5) return "bg-blue-300 rounded-full";
//               return "bg-blue-200 rounded-full";
//             }
//           }}
//         />
//       </div>
//     </div>
//   );
// }








'use client';
import { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [goalDate, setGoalDate] = useState("");
  const [learningRecords, setLearningRecords] = useState<{date: string, hours: number}[]>([]);

  useEffect(() => {
    fetch("/api/user/goal")
      .then(res => res.json())
      .then(data => {
        if (data.goalDate) {
          // input type="date" に合わせる YYYY-MM-DD
          const d = new Date(data.goalDate);
          const formatted = d.toISOString().split('T')[0]; // 例: 2025-08-16
          setGoalDate(formatted);
        } else {
          setGoalDate("");
        }
      });

    fetch("/api/user/learning-records")
      .then(res => res.json())
      .then(data => setLearningRecords(data.records));
  }, []);

  const saveGoal = async () => {
    await fetch("/api/user/goal", {
      method: "POST",
      body: JSON.stringify({ goalDate }),
      headers: { "Content-Type": "application/json" }
    });
    alert("保存しました！");
  };

  if (!isLoaded) return <div>読み込み中...</div>;
  if (!isSignedIn) return <div>ログインが必要です</div>;

  // 累計学習時間
  const totalHours = learningRecords.reduce((sum, r) => sum + r.hours, 0);

  // 直近7日間データ
  const today = new Date();
  const past7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    const record = learningRecords.find(r => new Date(r.date).toDateString() === d.toDateString());
    return { date: d.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' }), hours: record?.hours || 0 };
  });

  // 日付ごとの学習時間マップ（カレンダー用）
  const dateToHours = new Map(
    learningRecords.map(r => [new Date(r.date).toDateString(), r.hours])
  );

  return (
    <div className="min-h-screen p-8 flex flex-col items-center space-y-8">
      
      {/* ヘッダー */}
      <div className="flex items-center justify-between w-full max-w-3xl mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">学習ダッシュボード</h1>
          <p className="text-gray-600 mt-1">こんにちは、{user?.firstName} さん！</p>
          <p className="text-gray-600">{user.emailAddresses[0].emailAddress}</p>
        </div>
        {/* <UserButton /> */}
      </div>

      {/* 目標日カード */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">目標日</h2>
        <p className="text-4xl font-bold text-gray-900 mb-4">
          {goalDate ? new Date(goalDate).toLocaleDateString() : "未設定"}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            type="date"
            value={goalDate}
            onChange={e => setGoalDate(e.target.value)}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={saveGoal}
            className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            保存
          </button>
        </div>
      </div>

      {/* 累計学習時間カード */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">累計学習時間</h2>
        <p className="text-4xl font-bold text-gray-900">{totalHours} 時間</p>
      </div>

      {/* 直近7日間学習グラフカード */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">直近7日間の学習時間</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={past7Days} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 学習記録カレンダー */}
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">学習記録カレンダー</h2>
        <Calendar
          className="border rounded-lg overflow-hidden mx-auto"
          tileClassName={({ date, view }) => {
            const hours = dateToHours.get(date.toDateString());
            if (hours) {
              if (hours >= 2.5) return "bg-blue-600 text-white font-bold rounded-full";
              if (hours >= 1.5) return "bg-blue-500 text-white font-semibold rounded-full";
              if (hours >= 0.5) return "bg-blue-300 rounded-full";
              return "bg-blue-200 rounded-full";
            }
          }}
        />
      </div>

    </div>
  );
}
