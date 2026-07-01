import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Inbox,
  TrendingUp,
  CalendarCheck,
  MapPin,
  ArrowRight,
  Sparkles,
  Star,
  Quote,
  UserRoundCheck,
  Camera,
  FileText,
  CircleCheck,
  Clock,
  ShieldCheck,
  Store,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkle, Mandala } from "@/components/decor/motifs";
import { LeadsBoard } from "@/components/vendor/leads-board";
import { CalendarList } from "@/components/vendor/calendar-list";
import { EarningsChart } from "@/components/vendor/earnings-chart";
import { auth } from "@/auth";
import { getLeadsForUser, getCalendarBookings, getVendorForUser } from "@/lib/queries";
import { cn } from "@/lib/utils";
import type { Vendor } from "@/lib/types";

export const metadata: Metadata = {
  title: "Vendor dashboard",
  description:
    "Your Eventplus vendor workspace — track leads, bookings, earnings and reviews in one warm, calm place.",
};

const anchorOffset = "scroll-mt-24";

const toneStyles: Record<string, { icon: string; value: string }> = {
  maroon: { icon: "bg-maroon-100 text-maroon-700", value: "text-maroon-700" },
  green: { icon: "bg-green-100 text-green-700", value: "text-green-700" },
  gold: { icon: "bg-gold-100 text-gold-700", value: "text-gold-700" },
};

export default async function VendorDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/vendor");

  const listing = await getVendorForUser(session.user.id);

  // No listing yet → onboarding CTA (rather than an empty dashboard).
  if (!listing) return <NoListing name={session.user.name} />;

  const leads = (await getLeadsForUser(session.user.id)) ?? [];
  const calendarBookings = await getCalendarBookings();
  const newLeadCount = leads.filter((l) => l.status === "new").length;
  const reviews = listing.reviews.slice(0, 2);

  const stats: { label: string; value: string; icon: LucideIcon; tone: string; change: string }[] = [
    { label: "New leads", value: String(newLeadCount), icon: Inbox, tone: "maroon", change: `${leads.length} total` },
    { label: "Booked", value: String(leads.filter((l) => l.status === "booked").length), icon: CalendarCheck, tone: "green", change: "confirmed" },
    { label: "Quoted", value: String(leads.filter((l) => l.status === "quoted").length), icon: FileText, tone: "gold", change: "awaiting reply" },
    { label: "Rating", value: listing.reviewCount > 0 ? listing.rating.toFixed(1) : "New", icon: Star, tone: "maroon", change: `${listing.reviewCount} reviews` },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:gap-16">
        {/* ---------------------------------------------------- Dashboard */}
        <section id="dashboard" className={anchorOffset}>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-maroon-700 to-maroon-900 p-6 text-cream-50 shadow-card sm:p-8">
              <Sparkle className="pointer-events-none absolute right-6 top-6 size-6 text-gold-400/60" />
              <div className="relative flex flex-wrap items-end justify-between gap-5">
                <div className="flex flex-col gap-3">
                  <Badge variant="gold" className="w-fit gap-1.5">
                    <Sparkles className="size-3.5" /> Vendor workspace
                  </Badge>
                  <h1 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                    Namaskaram, {listing.name.split(" ")[0]}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-cream-100/80">
                    <span>{listing.categoryLabel}</span>
                    <span className="size-1 rounded-full bg-cream-200/50" />
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5" /> {listing.city}
                    </span>
                  </div>
                </div>
                {/* Listing status */}
                <div className="flex flex-col items-start gap-2 rounded-2xl bg-cream-50/10 px-4 py-3 backdrop-blur sm:items-end">
                  {listing.verified ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-2.5 py-1 text-xs font-semibold text-green-200">
                      <ShieldCheck className="size-3.5" /> Approved & live
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/20 px-2.5 py-1 text-xs font-semibold text-gold-100">
                      <Clock className="size-3.5" /> Pending review
                    </span>
                  )}
                  <Link
                    href={`/vendors/${listing.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-cream-100/80 hover:text-cream-50"
                  >
                    <ExternalLink className="size-3.5" /> View public listing
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Stat cards (leads are real; see EarningsChart for illustrative analytics) */}
          <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const tone = toneStyles[stat.tone] ?? toneStyles.maroon;
              const StatIcon = stat.icon;
              return (
                <RevealItem
                  key={stat.label}
                  className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-card"
                >
                  <span className={cn("grid size-11 place-items-center rounded-xl", tone.icon)}>
                    <StatIcon className="size-5" />
                  </span>
                  <div>
                    <p className={cn("font-serif text-3xl font-semibold", tone.value)}>{stat.value}</p>
                    <p className="mt-0.5 text-sm text-ink-soft">{stat.label}</p>
                  </div>
                  <p className="mt-auto text-xs font-medium text-muted-foreground">{stat.change}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </section>

        {/* ---------------------------------------------------- Leads */}
        <section id="leads" className={anchorOffset}>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
                  <Inbox className="size-3.5" /> Lead inbox
                </p>
                <h2 className="mt-1.5 font-serif text-2xl font-semibold text-ink sm:text-3xl">
                  Enquiries that need you
                </h2>
              </div>
              {newLeadCount > 0 && (
                <Badge variant="maroon" className="gap-1.5 px-3 py-1.5 text-sm">
                  <span className="size-2 animate-pulse rounded-full bg-maroon-500" />
                  {newLeadCount} new today
                </Badge>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.05} className="mt-6">
            {leads.length > 0 ? (
              <LeadsBoard leads={leads} />
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-cream-50 p-10 text-center">
                <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-cream-200 text-maroon-600">
                  <Inbox className="size-6" />
                </span>
                <p className="mt-4 font-serif text-lg font-semibold text-ink">No leads yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {listing.verified
                    ? "Enquiries from families will land here as they find your listing."
                    : "Once your listing is approved, enquiries will appear here."}
                </p>
              </div>
            )}
          </Reveal>
        </section>

        {/* ----------------------------------------- Calendar + Earnings */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <section id="calendar" className={cn(anchorOffset, "flex flex-col")}>
            <Reveal>
              <div className="mb-6">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
                  <CalendarCheck className="size-3.5" /> Your calendar
                </p>
                <h2 className="mt-1.5 font-serif text-2xl font-semibold text-ink sm:text-3xl">
                  What&apos;s coming up
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <CalendarList calendarBookings={calendarBookings} />
            </Reveal>
          </section>

          <section id="earnings" className={cn(anchorOffset, "flex flex-col")}>
            <Reveal>
              <div className="mb-6">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
                  <TrendingUp className="size-3.5" /> Earnings
                </p>
                <h2 className="mt-1.5 font-serif text-2xl font-semibold text-ink sm:text-3xl">
                  How your year is going
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <EarningsChart />
            </Reveal>
          </section>
        </div>

        {/* ---------------------------------- Profile completeness + Reviews */}
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-8">
          <section id="profile" className={cn(anchorOffset, "lg:col-span-2")}>
            <Reveal className="h-full">
              <ProfileCompletenessCard listing={listing} />
            </Reveal>
          </section>

          {reviews.length > 0 && (
            <section id="reviews" className={cn(anchorOffset, "lg:col-span-3")}>
              <Reveal delay={0.05} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-card sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
                        <Star className="size-3.5" /> Recent reviews
                      </p>
                      <h2 className="mt-1.5 font-serif text-2xl font-semibold text-ink">
                        What customers are saying
                      </h2>
                    </div>
                    <Rating value={listing.rating} count={listing.reviewCount} size="md" />
                  </div>
                  <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
                    {reviews.map((review) => (
                      <figure key={review.author} className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-cream-50 p-5">
                        <Quote className="size-6 text-gold-400" />
                        <blockquote className="line-clamp-4 text-sm leading-relaxed text-ink-soft">
                          “{review.body}”
                        </blockquote>
                        <figcaption className="mt-auto flex items-center gap-3 border-t border-border/50 pt-3">
                          <span className="grid size-9 place-items-center rounded-full bg-maroon-100 text-sm font-semibold text-maroon-700">
                            {review.author.slice(0, 1)}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-ink">{review.author}</p>
                            <p className="truncate text-xs text-muted-foreground">
                              {review.event} · {review.location}
                            </p>
                          </div>
                          <Rating value={review.rating} />
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="mt-5 w-fit">
                    <Link href={`/vendors/${listing.slug}`}>
                      View public listing <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </Reveal>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function NoListing({ name }: { name?: string | null }) {
  return (
    <div className="px-4 py-16 sm:px-6 lg:py-24">
      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-border/70 bg-card p-8 text-center shadow-card sm:p-12">
        <Mandala className="pointer-events-none absolute -right-16 -top-16 size-64 text-gold-500/10" />
        <div className="relative">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-maroon-600 to-maroon-800 text-gold-300 shadow-soft">
            <Store className="size-8" />
          </span>
          <h1 className="mt-6 font-serif text-3xl font-semibold text-ink">
            {name ? `Welcome, ${name.split(" ")[0]}!` : "Welcome!"}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
            You don&rsquo;t have a listing yet. Create one to appear in the marketplace and start
            receiving leads from Kerala families — it&rsquo;s free to list.
          </p>
          <Button asChild variant="gold" size="lg" className="mt-7">
            <Link href="/vendor-onboarding">
              <Sparkles className="size-4" /> Create your listing
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

const staticCompletenessItems = [
  { label: "Photo gallery (8+)", done: false, icon: Camera },
  { label: "Add a portfolio video", done: false, icon: Camera },
];

function ProfileCompletenessCard({ listing }: { listing: Vendor & { verified?: boolean } }) {
  // Reflects real listing fields; a couple of items are illustrative nudges.
  const items = [
    { label: "Business details", done: Boolean(listing.about), icon: UserRoundCheck },
    { label: "Service packages", done: listing.packages.length > 0, icon: FileText },
    { label: "Approved & verified", done: Boolean(listing.verified), icon: CircleCheck },
    ...staticCompletenessItems,
  ];
  const completed = items.filter((i) => i.done).length;
  const pct = Math.round((completed / items.length) * 100);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-card sm:p-7">
      <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
        <UserRoundCheck className="size-3.5" /> Profile strength
      </p>
      <div className="mt-3 flex items-end justify-between">
        <p className="font-serif text-2xl font-semibold text-ink">Keep building</p>
        <span className="font-serif text-3xl font-semibold text-maroon-700">{pct}%</span>
      </div>
      <Progress value={pct} className="mt-3 h-2.5" indicatorClassName="bg-gradient-to-r from-gold-400 to-gold-600" />
      <p className="mt-2 text-sm text-muted-foreground">
        Complete profiles get up to <span className="font-semibold text-ink">2.4× more leads</span>.
      </p>
      <ul className="mt-5 flex flex-1 flex-col gap-2.5">
        {items.map((item) => {
          const ItemIcon = item.icon;
          return (
            <li
              key={item.label}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm",
                item.done ? "border-border/50 bg-cream-50 text-ink-soft" : "border-gold-300 bg-gold-50 text-gold-800"
              )}
            >
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full",
                  item.done ? "bg-green-100 text-green-700" : "bg-gold-200 text-gold-800"
                )}
              >
                {item.done ? <CircleCheck className="size-4" /> : <ItemIcon className="size-4" />}
              </span>
              <span className={cn("flex-1", item.done && "line-through decoration-cream-400")}>
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
