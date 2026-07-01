/**
 * Bootstrap or promote an admin account. Sign-up only creates `family` users,
 * so use this once (against prod) to create the first admin.
 *
 *   npm run make-admin -- founder@eventplus.in "a-strong-password"   # create
 *   npm run make-admin -- founder@eventplus.in                        # promote existing
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql(
  process.env.DATABASE_AUTH_TOKEN
    ? { url: process.env.DATABASE_URL!, authToken: process.env.DATABASE_AUTH_TOKEN }
    : { url: process.env.DATABASE_URL ?? "file:./dev.db" }
);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.argv[2]?.toLowerCase().trim();
  const password = process.argv[3];
  if (!email) {
    console.error('Usage: npm run make-admin -- <email> [password]');
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    await prisma.user.update({ where: { email }, data: { role: "admin" } });
    console.log(`✅ Promoted ${email} to admin.`);
  } else {
    if (!password || password.length < 8) {
      console.error("New admin needs a password of at least 8 characters as the 2nd argument.");
      process.exit(1);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, name: "Admin", passwordHash, role: "admin" },
    });
    console.log(`✅ Created admin ${email}.`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
