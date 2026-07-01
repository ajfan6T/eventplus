/**
 * Production seed — structural data only (event categories). No demo vendors,
 * users, leads or testimonials. Idempotent (upsert), so it is safe to re-run
 * and will never wipe real data.
 */
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { eventCategories } from "../src/lib/data/categories";

const adapter = new PrismaLibSql(
  process.env.DATABASE_AUTH_TOKEN
    ? { url: process.env.DATABASE_URL!, authToken: process.env.DATABASE_AUTH_TOKEN }
    : { url: process.env.DATABASE_URL ?? "file:./dev.db" }
);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(`Seeding ${eventCategories.length} event categories (production)…`);
  for (const [i, c] of eventCategories.entries()) {
    const data = {
      name: c.name,
      tagline: c.tagline,
      description: c.description,
      gradient: c.gradient,
      icon: c.icon,
      popularBudget: c.popularBudget,
      avgGuests: c.avgGuests,
      vendorTypes: c.vendorTypes,
      order: i,
    };
    await prisma.eventCategory.upsert({
      where: { slug: c.slug },
      update: data,
      create: { slug: c.slug, ...data },
    });
  }
  console.log("✅ Categories ready. No demo vendors, accounts or testimonials seeded.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
