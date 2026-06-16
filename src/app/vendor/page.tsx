import type { Metadata } from "next";
import Link from "next/link";
import {
  Inbox,
  TrendingUp,
  CalendarCheck,
  Eye,
  MapPin,
  ArrowRight,
  Sparkles,
  Star,
  Quote,
  UserRoundCheck,
  Camera,
  FileText,
  CircleCheck,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkle } from "@/components/decor/motifs";
import { LeadsBoard } from "@/components/vendor/leads-board";
import { CalendarList } from "@/components/vendor/calendar-list";
import { EarningsChart } from "@/components/vendor/earnings-chart";
import { vendorProfile, vendorStats } from "@/lib/data/vendor-dashboard";
import { getLeads, getCalendarBookings } from "@/lib/queries";
import { getVendor } from "@/lib/data/vendors";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Vendor dashboard",
  description:
    "Your Eventplus vendor workspace — track leads, bookings, earnings and reviews in one warm, calm place.",
};

const statIcons: Record<string, LucideIcon> = {
  Inbox,
  TrendingUp,
  CalendarCheck,
  Eye,
};

const toneStyles: Record<string, { icon: string; ring: string; value: string }> = {
  maroon: {
    icon: "bg-maroon-100 text-maroon-700",
    ring: "hover:border-maroon-300",
    value: "text-maroon-700",
  },
  green: {
    icon: "bg-green-100 text-green-700",
    ring: "hover:border-green-300",
    value: "text-green-700",
  },
  gold: {
    icon: "bg-gold-100 text-gold-700",
    ring: "hover:border-gold-300",
    value: "text-gold-700",
  },
};

/** A scroll-margin offset so anchor jumps clear the sticky top bar. */
const anchorOffset = "scroll-mt-24";

export default async function VendorDashboardPage() {
  const [leads, calendarBookings] = await Promise.all([
    getLeads(),
    getCalendarBookings(),
  ]);
  const newLeadCount = leads.filter((l) => l.status === "new").length;
  const publicVendor = getVendor("marigold-decor-studio");
  const reviews = publicVendor?.reviews.slice(0, 2) ?? [];

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
                    Namaskaram, {vendorProfile.name.split(" ")[0]}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-cream-100/80">
                    <span>{vendorProfile.category}</span>
                    <span className="size-1 rounded-full bg-cream-200/50" />
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5" /> {vendorProfile.city}
                    </span>
                    <span className="size-1 rounded-full bg-cream-200/50" />
                    <span>Member since {vendorProfile.memberSince}</span>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 rounded-2xl bg-cream-50/10 px-4 py-3 backdrop-blur sm:items-end">
                  <span className="inline-flex items-center gap-1.5 text-gold-200">
                    <Star className="size-4 fill-gold-300 text-gold-300" />
                    <span className="font-serif text-2xl font-semibold text-cream-50">
                      {vendorProfile.rating.toFixed(1)}
                    </span>
                  </span>
                  <span className="text-xs text-cream-100/70">
                    {vendorProfile.reviewCount} reviews · {vendorProfile.responseRate}% reply rate
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Stat cards */}
          <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {vendorStats.map((stat) => {
              const StatIcon = statIcons[stat.icon] ?? Inbox;
              const tone = toneStyles[stat.tone] ?? toneStyles.maroon;
              return (
                <RevealItem
                  key={stat.label}
                  className={cn(
                    "flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-card transition-colors",
                    tone.ring,
                  )}
                >
                  <span className={cn("grid size-11 place-items-center rounded-xl", tone.icon)}>
                    <StatIcon className="size-5" />
                  </span>
                  <div>
                    <p className={cn("font-serif text-3xl font-semibold", tone.value)}>
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-soft">{stat.label}</p>
                  </div>
                  <p className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                    <TrendingUp className="size-3.5 text-green-600" /> {stat.change}
                  </p>
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
            <LeadsBoard leads={leads} />
          </Reveal>
        </section>

        {/* ----------------------------------------- Calendar + Earnings */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Calendar */}
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

          {/* Earnings */}
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
          {/* Profile completeness */}
          <section id="profile" className={cn(anchorOffset, "lg:col-span-2")}>
            <Reveal className="h-full">
              <ProfileCompletenessCard />
            </Reveal>
          </section>

          {/* Reviews snippet */}
          <section id="reviews" className={cn(anchorOffset, "lg:col-span-3")}>
            <Reveal delay={0.05} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-card sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
                      <Star className="size-3.5" /> Recent reviews
                    </p>
                    <h2 className="mt-1.5 font-serif text-2xl font-semibold text-ink">
                      What couples are saying
                    </h2>
                  </div>
                  <Rating value={vendorProfile.rating} count={vendorProfile.reviewCount} size="md" />
                </div>

                <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
                  {reviews.map((review) => (
                    <figure
                      key={review.author}
                      className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-cream-50 p-5"
                    >
                      <Quote className="size-6 text-gold-400" />
                      <blockquote className="line-clamp-4 text-sm leading-relaxed text-ink-soft">
                        “{review.body}”
                      </blockquote>
                      <figcaption className="mt-auto flex items-center gap-3 border-t border-border/50 pt-3">
                        <span className="grid size-9 place-items-center rounded-full bg-maroon-100 text-sm font-semibold text-maroon-700">
                          {review.author.slice(0, 1)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-ink">
                            {review.author}
                          </p>
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
                  <Link href="/vendors/marigold-decor-studio">
                    See all {vendorProfile.reviewCount} reviews <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const completenessItems = [
  { label: "Business details", done: true, icon: UserRoundCheck },
  { label: "Service packages", done: true, icon: FileText },
  { label: "Photo gallery (8+)", done: true, icon: Camera },
  { label: "Verified ID badge", done: true, icon: CircleCheck },
  { label: "Add a portfolio video", done: false, icon: Camera },
];

function ProfileCompletenessCard() {
  const completed = completenessItems.filter((i) => i.done).length;
  const pct = Math.round((completed / completenessItems.length) * 100);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-card sm:p-7">
      <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
        <UserRoundCheck className="size-3.5" /> Profile strength
      </p>
      <div className="mt-3 flex items-end justify-between">
        <p className="font-serif text-2xl font-semibold text-ink">Almost there</p>
        <span className="font-serif text-3xl font-semibold text-maroon-700">{pct}%</span>
      </div>
      <Progress value={pct} className="mt-3 h-2.5" indicatorClassName="bg-gradient-to-r from-gold-400 to-gold-600" />
      <p className="mt-2 text-sm text-muted-foreground">
        Complete profiles get up to <span className="font-semibold text-ink">2.4× more leads</span>.
      </p>

      <ul className="mt-5 flex flex-1 flex-col gap-2.5">
        {completenessItems.map((item) => {
          const ItemIcon = item.icon;
          return (
            <li
              key={item.label}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm",
                item.done
                  ? "border-border/50 bg-cream-50 text-ink-soft"
                  : "border-gold-300 bg-gold-50 text-gold-800",
              )}
            >
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full",
                  item.done ? "bg-green-100 text-green-700" : "bg-gold-200 text-gold-800",
                )}
              >
                {item.done ? <CircleCheck className="size-4" /> : <ItemIcon className="size-4" />}
              </span>
              <span className={cn("flex-1", item.done && "line-through decoration-cream-400")}>
                {item.label}
              </span>
              {!item.done && (
                <ArrowRight className="size-4 text-gold-600" />
              )}
            </li>
          );
        })}
      </ul>

      <Button variant="gold" className="mt-5 w-full">
        <Camera className="size-4" /> Finish your profile
      </Button>
    </div>
  );
}
