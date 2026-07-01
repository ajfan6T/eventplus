import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to the project dir (portable across machines & CI).
  // Avoids Next.js inferring the wrong root when a stray lockfile sits above us.
  turbopack: {
    root: process.cwd(),
  },
  // Vendor onboarding accepts an optional cover photo (sent as a data URL through
  // the createVendorListing Server Action), so raise the default 1MB body limit.
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
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
