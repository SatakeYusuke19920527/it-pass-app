// import { NextResponse } from "next/server";
// import { container } from "../../../lib/cosmos.ts";

// export async function GET() {
//   try {
//     const { resource } = await container.read();
//     return NextResponse.json({ partitionKey: resource?.partitionKey });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
