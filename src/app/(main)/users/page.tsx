'use client';
import { UserButton, useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default function UsersPage() {
    const { isLoaded, isSignedIn, user } = useUser();
        // const user = await currentUser();
  if (!isLoaded) return <div>読み込み中...</div>;
  if (!user) {
    return <div>ログインが必要です</div>;
  }



  /* --------------------------- 画面 --------------------------- */
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">sawa 担当</div>
    <div>
      {isSignedIn ? (
        <>
          <p>こんにちは、{user?.firstName} さん！</p>
          <UserButton />
        </>
      ) : (
        <p>ログインしていません</p>
      )}
    </div>
        <div style={{ padding: "2rem" }}>
      <h1>ユーザーページ</h1>
      <p>ようこそ、{user.firstName} さん！</p>
      <p>Email: {user.emailAddresses[0].emailAddress}</p>
    </div>
      </div>
    </div>
  );
}
