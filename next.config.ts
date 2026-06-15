import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray package-lock.json in the home dir was
  // causing Next.js to infer the wrong root.
  turbopack: {
    root: "/Users/majfan/eventplus",
  },
};

export default nextConfig;
