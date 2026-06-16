import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray package-lock.json in the home dir was
  // causing Next.js to infer the wrong root.
  turbopack: {
    root: "/Users/majfan/eventplus",
  },
  // Keep Prisma + the libSQL native driver out of the bundler; require them at
  // runtime from node_modules (native addons can't be bundled).
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/adapter-libsql",
    "@libsql/client",
    "libsql",
  ],
};

export default nextConfig;
