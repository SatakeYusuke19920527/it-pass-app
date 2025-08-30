// import { auth } from "@clerk/nextjs/server";
// import { container } from "@/lib/cosmos";

// export async function POST(req: Request) {
//   const { userId } = await auth(); // ← await を追加
//   if (!userId) return new Response("Unauthorized", { status: 401 });

//   const { goalDate } = await req.json();

//   await container.items.upsert({
//     id: userId,
//     goalDate,
//   });

//   return new Response(JSON.stringify({ success: true }), {
//     headers: { "Content-Type": "application/json" },
//   });
// }

// export async function GET() {
//   const { userId: getUserId } = await auth(); // ← 名前を変えて衝突回避
//   if (!getUserId) return new Response("Unauthorized", { status: 401 });

//   const { resource } = await container.item(getUserId, getUserId).read();
//   return new Response(JSON.stringify(resource || {}), {
//     headers: { "Content-Type": "application/json" },
//   });
// }



// import { auth } from "@clerk/nextjs/server";
// import { container } from "@/lib/cosmos";

// export async function POST(req: Request) {
//   const { userId } = await auth();
//   if (!userId) return new Response("Unauthorized", { status: 401 });

//   const { goalDate } = await req.json();

//   // Cosmos DB に保存
//   await container.items.upsert({
//     id: userId,       // ドキュメントID
//     userId,           // パーティションキー
//     goalDate,
//   });

// // container.item(userId, userId).read()

//   return new Response(JSON.stringify({ success: true }), {
//     headers: { "Content-Type": "application/json" },
//   });
// }

// export async function GET() {
//   const { userId } = await auth();
//   if (!userId) return new Response("Unauthorized", { status: 401 });

//   const query = {
//     query: "SELECT * FROM c WHERE c.id = @userId",
//     parameters: [{ name: "@userId", value: userId }],
//   };

//   const { resources } = await container.items.query(query).fetchAll();

//   return new Response(JSON.stringify(resources[0] || {}), {
//     headers: { "Content-Type": "application/json" },
//   });
// }

import { auth } from "@clerk/nextjs/server";
import { container } from "@/lib/cosmos";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });

  try {
    const { goalDate } = await req.json();
    await container.items.upsert({ id: userId, userId, goalDate });
    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "DB Error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });

  try {
    const query = {
      query: "SELECT * FROM c WHERE c.id = @userId",
      parameters: [{ name: "@userId", value: userId }],
    };
    const { resources } = await container.items.query(query).fetchAll();
    return new Response(JSON.stringify(resources[0] || {}), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "DB Error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
