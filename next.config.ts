import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactStrictMode: true,
  transpilePackages: ["@clerk/nextjs"],
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],  // 追加
};

export default nextConfig;