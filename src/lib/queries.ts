/**
 * Server-only data-access layer. Replaces direct reads of src/lib/data/* for
 * the entities now persisted in the database. Maps Prisma rows back to the
 * existing domain types so UI components remain unchanged.
 *
 * Do NOT import this from Client Components — it uses the Prisma client.
 */
import { prisma } from "@/lib/db";
import type {
  BudgetLine,
  CalendarBooking,
  ChecklistTask,
  EventCategory,
  EventCategorySlug,
  Lead,
  Testimonial,
  Vendor,
  VendorCategorySlug,
  VendorPackage,
  VendorReview,
} from "@/lib/types";

/* ----------------------------------------------------------------- mappers */

type Row = Record<string, unknown>;

function toCategory(c: Row): EventCategory {
  return {
    slug: c.slug as EventCategorySlug,
    name: c.name as string,
    tagline: c.tagline as string,
    description: c.description as string,
    gradient: c.gradient as [string, string, string],
    icon: c.icon as string,
    popularBudget: c.popularBudget as string,
    avgGuests: c.avgGuests as string,
    vendorTypes: c.vendorTypes as VendorCategorySlug[],
  };
}

function toPackage(p: Row): VendorPackage {
  return {
    name: p.name as string,
    price: p.price as number,
    unit: (p.unit as string) ?? undefined,
    popular: (p.popular as boolean) || undefined,
    features: p.features as string[],
  };
}

function toReview(r: Row): VendorReview {
  return {
    author: r.author as string,
    location: r.location as string,
    rating: r.rating as number,
    event: r.event as string,
    date: r.date as string,
    body: r.body as string,
  };
}

function toVendor(v: Row): Vendor {
  return {
    slug: v.slug as string,
    name: v.name as string,
    category: v.category as VendorCategorySlug,
    categoryLabel: v.categoryLabel as string,
    tagline: v.tagline as string,
    about: v.about as string,
    city: v.city as string,
    district: v.district as string,
    rating: v.rating as number,
    reviewCount: v.reviewCount as number,
    startingPrice: v.startingPrice as number,
    priceUnit: v.priceUnit as string,
    verified: v.verified as boolean,
    responseTime: v.responseTime as string,
    bookings: v.bookings as number,
    yearsActive: v.yearsActive as number,
    gradient: v.gradient as [string, string, string],
    services: v.services as string[],
    highlights: v.highlights as string[],
    serviceAreas: v.serviceAreas as string[],
    packages: ((v.packages as Row[]) ?? []).map(toPackage),
    reviews: ((v.reviews as Row[]) ?? []).map(toReview),
    gallerySeeds: v.gallerySeeds as number[],
    eventTypes: v.eventTypes as EventCategorySlug[],
  };
}

const vendorInclude = {
  packages: { orderBy: { order: "asc" } as const },
  reviews: { orderBy: { order: "asc" } as const },
};

/* --------------------------------------------------------------- categories */

export async function getEventCategories(): Promise<EventCategory[]> {
  const rows = await prisma.eventCategory.findMany({ orderBy: { order: "asc" } });
  return rows.map(toCategory);
}

export async function getEventCategory(slug: string): Promise<EventCategory | undefined> {
  const row = await prisma.eventCategory.findUnique({ where: { slug } });
  return row ? toCategory(row) : undefined;
}

/* ------------------------------------------------------------------ vendors */

export async function getVendors(): Promise<Vendor[]> {
  const rows = await prisma.vendor.findMany({
    include: vendorInclude,
    orderBy: { order: "asc" },
  });
  return rows.map(toVendor);
}

export async function getVendor(slug: string): Promise<Vendor | undefined> {
  const row = await prisma.vendor.findUnique({ where: { slug }, include: vendorInclude });
  return row ? toVendor(row) : undefined;
}

export async function getVendorSlugs(): Promise<string[]> {
  const rows = await prisma.vendor.findMany({ select: { slug: true } });
  return rows.map((r) => r.slug);
}

export async function getVendorsByEventType(eventType: string): Promise<Vendor[]> {
  // eventTypes is a Json array; filter in app code (SQLite has no array ops).
  const all = await getVendors();
  return all.filter((v) => v.eventTypes.includes(eventType as EventCategorySlug));
}

export async function getFeaturedVendors(count = 6): Promise<Vendor[]> {
  const rows = await prisma.vendor.findMany({
    include: vendorInclude,
    orderBy: [{ rating: "desc" }, { reviewCount: "desc" }],
    take: count,
  });
  return rows.map(toVendor);
}

export async function getRelatedVendors(slug: string, count = 3): Promise<Vendor[]> {
  const current = await getVendor(slug);
  if (!current) return [];
  const all = await getVendors();
  return all
    .filter((v) => v.slug !== slug && v.eventTypes.some((e) => current.eventTypes.includes(e)))
    .slice(0, count);
}

/* ------------------------------------------------------------- testimonials */

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  return rows.map((t) => ({
    name: t.name,
    role: t.role,
    location: t.location,
    rating: t.rating,
    quote: t.quote,
    event: t.event,
    initials: t.initials,
  }));
}

/* ------------------------------------------------------- planning (demo) */

export interface DemoEvent {
  type: string;
  coupleNames: string;
  date: string;
  dateLabel: string;
  daysAway: number;
  location: string;
  guests: number;
  totalBudget: number;
  spent: number;
  booked: number;
  shortlisted: number;
}

export interface EventBundle {
  event: DemoEvent;
  tasks: ChecklistTask[];
  budgetLines: BudgetLine[];
}

const eventInclude = {
  tasks: { orderBy: { order: "asc" } as const },
  budgetLines: { orderBy: { order: "asc" } as const },
};

function mapEventBundle(row: Row & { tasks: Row[]; budgetLines: Row[] }): EventBundle {
  const event: DemoEvent = {
    type: row.type as string,
    coupleNames: row.coupleNames as string,
    date: row.date as string,
    dateLabel: row.dateLabel as string,
    daysAway: row.daysAway as number,
    location: row.location as string,
    guests: row.guests as number,
    totalBudget: row.totalBudget as number,
    spent: row.spent as number,
    booked: row.booked as number,
    shortlisted: row.shortlisted as number,
  };
  const tasks: ChecklistTask[] = row.tasks.map((t) => ({
    id: t.taskKey as string,
    title: t.title as string,
    phase: t.phase as string,
    done: t.done as boolean,
    dueLabel: t.dueLabel as string,
    category: t.category as ChecklistTask["category"],
    aiSuggested: (t.aiSuggested as boolean) || undefined,
  }));
  const budgetLines: BudgetLine[] = row.budgetLines.map((b) => ({
    category: b.category as string,
    icon: b.icon as string,
    allocated: b.allocated as number,
    spent: b.spent as number,
    status: b.status as BudgetLine["status"],
  }));
  return { event, tasks, budgetLines };
}

export async function getDemoEvent(): Promise<EventBundle | null> {
  const row = await prisma.event.findFirst({ where: { isDemo: true }, include: eventInclude });
  return row ? mapEventBundle(row) : null;
}

/** The signed-in family user's event, or null if they don't have one yet. */
export async function getEventForUser(userId: string): Promise<EventBundle | null> {
  const row = await prisma.event.findFirst({
    where: { userId },
    include: eventInclude,
    orderBy: { id: "asc" },
  });
  return row ? mapEventBundle(row) : null;
}

/** The user's event, falling back to the demo event so the dashboard is never empty. */
export async function getActiveEvent(userId: string): Promise<EventBundle | null> {
  return (await getEventForUser(userId)) ?? (await getDemoEvent());
}

/* ------------------------------------------------------- vendor CRM (demo) */

function mapLead(l: Row): Lead {
  return {
    id: l.leadKey as string,
    customer: l.customer as string,
    event: l.event as string,
    date: l.date as string,
    location: l.location as string,
    budget: l.budget as number,
    status: l.status as Lead["status"],
    message: l.message as string,
    receivedAt: l.receivedAt as string,
  };
}

export async function getLeads(): Promise<Lead[]> {
  const rows = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map(mapLead);
}

/** Leads for the vendor owned by this user, or null if the user has no vendor. */
export async function getLeadsForUser(userId: string): Promise<Lead[] | null> {
  const vendor = await prisma.vendor.findFirst({
    where: { userId },
    select: { id: true },
  });
  if (!vendor) return null;
  const rows = await prisma.lead.findMany({
    where: { vendorId: vendor.id },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(mapLead);
}

export async function getCalendarBookings(): Promise<CalendarBooking[]> {
  const rows = await prisma.calendarBooking.findMany({ orderBy: { date: "asc" } });
  return rows.map((b) => ({
    id: b.bookingKey,
    title: b.title,
    date: b.date,
    type: b.type as CalendarBooking["type"],
    value: b.value,
  }));
}
