import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

// Prisma 7 uses driver adapters. libSQL reads the local SQLite file and ships
// ABI-stable N-API prebuilds (works on bleeding-edge Node). Swap the adapter
// (or use a Postgres adapter) for production.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrisma() {
  const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
