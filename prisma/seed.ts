import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { eventCategories } from "../src/lib/data/categories";
import { vendors } from "../src/lib/data/vendors";
import { testimonials } from "../src/lib/data/testimonials";
import { sampleEvent, checklistTasks, budgetLines } from "../src/lib/data/planner";
import { leads, calendarBookings } from "../src/lib/data/vendor-dashboard";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Clearing existing data…");
  await prisma.checklistTask.deleteMany();
  await prisma.budgetLine.deleteMany();
  await prisma.event.deleteMany();
  await prisma.vendorPackage.deleteMany();
  await prisma.vendorReview.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.calendarBooking.deleteMany();
  await prisma.vendor.deleteMany();
  await prisma.eventCategory.deleteMany();
  await prisma.testimonial.deleteMany();

  console.log(`Seeding ${eventCategories.length} event categories…`);
  for (const [i, c] of eventCategories.entries()) {
    await prisma.eventCategory.create({
      data: {
        slug: c.slug,
        name: c.name,
        tagline: c.tagline,
        description: c.description,
        gradient: c.gradient,
        icon: c.icon,
        popularBudget: c.popularBudget,
        avgGuests: c.avgGuests,
        vendorTypes: c.vendorTypes,
        order: i,
      },
    });
  }

  console.log(`Seeding ${vendors.length} vendors (with packages & reviews)…`);
  for (const [i, v] of vendors.entries()) {
    await prisma.vendor.create({
      data: {
        slug: v.slug,
        name: v.name,
        category: v.category,
        categoryLabel: v.categoryLabel,
        tagline: v.tagline,
        about: v.about,
        city: v.city,
        district: v.district,
        rating: v.rating,
        reviewCount: v.reviewCount,
        startingPrice: v.startingPrice,
        priceUnit: v.priceUnit,
        verified: v.verified,
        responseTime: v.responseTime,
        bookings: v.bookings,
        yearsActive: v.yearsActive,
        gradient: v.gradient,
        services: v.services,
        highlights: v.highlights,
        serviceAreas: v.serviceAreas,
        gallerySeeds: v.gallerySeeds,
        eventTypes: v.eventTypes,
        order: i,
        packages: {
          create: v.packages.map((p, j) => ({
            name: p.name,
            price: p.price,
            unit: p.unit ?? null,
            popular: Boolean(p.popular),
            features: p.features,
            order: j,
          })),
        },
        reviews: {
          create: v.reviews.map((r, j) => ({
            author: r.author,
            location: r.location,
            rating: r.rating,
            event: r.event,
            date: r.date,
            body: r.body,
            order: j,
          })),
        },
      },
    });
  }

  console.log(`Seeding ${testimonials.length} testimonials…`);
  for (const [i, t] of testimonials.entries()) {
    await prisma.testimonial.create({
      data: {
        name: t.name,
        role: t.role,
        location: t.location,
        rating: t.rating,
        quote: t.quote,
        event: t.event,
        initials: t.initials,
        order: i,
      },
    });
  }

  console.log("Seeding demo planning event (checklist + budget)…");
  await prisma.event.create({
    data: {
      type: sampleEvent.type,
      coupleNames: sampleEvent.coupleNames,
      date: sampleEvent.date,
      dateLabel: sampleEvent.dateLabel,
      daysAway: sampleEvent.daysAway,
      location: sampleEvent.location,
      guests: sampleEvent.guests,
      totalBudget: sampleEvent.totalBudget,
      spent: sampleEvent.spent,
      booked: sampleEvent.booked,
      shortlisted: sampleEvent.shortlisted,
      isDemo: true,
      tasks: {
        create: checklistTasks.map((t, j) => ({
          taskKey: t.id,
          title: t.title,
          phase: t.phase,
          done: t.done,
          dueLabel: t.dueLabel,
          category: t.category,
          aiSuggested: Boolean(t.aiSuggested),
          order: j,
        })),
      },
      budgetLines: {
        create: budgetLines.map((b, j) => ({
          category: b.category,
          icon: b.icon,
          allocated: b.allocated,
          spent: b.spent,
          status: b.status,
          order: j,
        })),
      },
    },
  });

  // Link the demo CRM leads to the real Marigold Decor Studio vendor.
  const marigold = await prisma.vendor.findUnique({
    where: { slug: "marigold-decor-studio" },
    select: { id: true },
  });

  console.log(`Seeding ${leads.length} vendor leads…`);
  for (const l of leads) {
    await prisma.lead.create({
      data: {
        leadKey: l.id,
        vendorId: marigold?.id ?? null,
        customer: l.customer,
        event: l.event,
        date: l.date,
        location: l.location,
        budget: l.budget,
        status: l.status,
        message: l.message,
        receivedAt: l.receivedAt,
      },
    });
  }

  console.log(`Seeding ${calendarBookings.length} calendar bookings…`);
  for (const b of calendarBookings) {
    await prisma.calendarBooking.create({
      data: {
        bookingKey: b.id,
        title: b.title,
        date: b.date,
        type: b.type,
        value: b.value,
      },
    });
  }

  console.log("✅ Seed complete.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
