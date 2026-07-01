import Link from "next/link";
import {
  Wallet,
  ListChecks,
  Store,
  CalendarClock,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Users,
  CalendarCheck,
  MessageCircle,
  Settings,
  Bell,
  CreditCard,
  ShieldCheck,
  Clock,
  Check,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checklist } from "@/components/dashboard/checklist";
import { BudgetTracker } from "@/components/dashboard/budget-tracker";
import { PaymentDialog } from "@/components/payment/payment-dialog";
import { VendorCard } from "@/components/vendors/vendor-card";
import { KasavuDivider, Sparkle } from "@/components/decor/motifs";
import { auth } from "@/auth";
import { getActiveEvent, getDemoEvent, getFeaturedVendors } from "@/lib/queries";
import { formatINR, cn } from "@/lib/utils";

const bookings = [
  {
    title: "Backwater Heritage Convention Centre",
    type: "Venue",
    date: "6 Dec 2026 · Full day",
    amount: 320000,
    status: "Confirmed",
  },
  {
    title: "Sadhya & Co. — Premium catering",
    type: "Catering",
    date: "6 Dec 2026 · 450 guests",
    amount: 495000,
    status: "Advance paid",
  },
  {
    title: "Frames of Kerala — Photo & cine",
    type: "Photography",
    date: "5–6 Dec 2026 · 2 days",
    amount: 165000,
    status: "Confirmed",
  },
  {
    title: "Tharavadu Decor — Mandapam & florals",
    type: "Decor",
    date: "6 Dec 2026 · On-site setup",
    amount: 240000,
    status: "Balance due",
  },
];

const messages = [
  {
    from: "Frames of Kerala",
    initials: "FK",
    preview: "Confirmed the candid + traditional combo. Sharing the shot list by Friday.",
    time: "2h ago",
    unread: true,
  },
  {
    from: "Sadhya & Co.",
    initials: "SC",
    preview: "Tasting slot booked for next Saturday, 11 AM. Shall we add the payasam upgrade?",
    time: "1d ago",
    unread: true,
  },
  {
    from: "Tharavadu Decor",
    initials: "TD",
    preview: "Mandapam mood board attached — let us know on the marigold vs. jasmine theme.",
    time: "3d ago",
    unread: false,
  },
];

export default async function DashboardOverviewPage() {
  const session = await auth();
  const [demo, recommended] = await Promise.all([
    session?.user?.id ? getActiveEvent(session.user.id) : getDemoEvent(),
    getFeaturedVendors(3),
  ]);

  const sampleEvent = demo?.event;
  const checklistTasks = demo?.tasks ?? [];
  const budgetLines = demo?.budgetLines ?? [];

  const displayName =
    session?.user?.role === "admin"
      ? "Admin"
      : session?.user?.name?.trim().split(/\s+/)[0] ||
        session?.user?.email?.split("@")[0] ||
        "there";

  const tasksDone = checklistTasks.filter((t) => t.done).length;
  const tasksTotal = checklistTasks.length;
  const tasksPct = tasksTotal > 0 ? Math.round((tasksDone / tasksTotal) * 100) : 0;
  const budgetPct = sampleEvent
    ? Math.round((sampleEvent.spent / sampleEvent.totalBudget) * 100)
    : 0;
  const totalAllocated = budgetLines.reduce((s, l) => s + l.allocated, 0);

  const stats = sampleEvent
    ? [
        {
          label: "Budget used",
          icon: Wallet,
          value: `${formatINR(sampleEvent.spent, { compact: true })}`,
          sub: `of ${formatINR(sampleEvent.totalBudget, { compact: true })}`,
          pct: budgetPct,
          barClass: "bg-gradient-to-r from-gold-400 to-gold-600",
          accent: "from-gold-300 to-gold-500 text-maroon-900",
        },
        {
          label: "Tasks done",
          icon: ListChecks,
          value: `${tasksDone}`,
          sub: `of ${tasksTotal} tasks`,
          pct: tasksPct,
          barClass: "bg-gradient-to-r from-green-400 to-green-600",
          accent: "from-green-400 to-green-600 text-cream-50",
        },
        {
          label: "Vendors booked",
          icon: Store,
          value: `${sampleEvent.booked}`,
          sub: `${sampleEvent.shortlisted} shortlisted`,
          pct: Math.round((sampleEvent.booked / sampleEvent.shortlisted) * 100),
          barClass: "bg-gradient-to-r from-maroon-400 to-maroon-600",
          accent: "from-maroon-500 to-maroon-700 text-cream-50",
        },
        {
          label: "Days to go",
          icon: CalendarClock,
          value: `${sampleEvent.daysAway}`,
          sub: sampleEvent.dateLabel,
          pct: Math.round(((365 - sampleEvent.daysAway) / 365) * 100),
          barClass: "bg-gradient-to-r from-gold-400 to-gold-600",
          accent: "from-cream-300 to-cream-400 text-maroon-800",
        },
      ]
    : [];

  const upcoming = checklistTasks
    .filter((t) => !t.done)
    .slice(0, 4)
    .map((t) => ({ title: t.title, due: t.dueLabel, ai: t.aiSuggested }));

  return (
    <div className="flex flex-col gap-12 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* ============================================ Overview */}
      <section id="overview" className="scroll-mt-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-maroon-600 to-maroon-800 p-6 text-cream-50 shadow-card sm:p-8">
            <Sparkle className="pointer-events-none absolute right-8 top-6 size-6 text-gold-300/60" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Badge variant="gold" className="gap-1.5">
                  <Sparkles className="size-3.5" />{" "}
                  {sampleEvent ? "Your active event" : "Let's get started"}
                </Badge>
                <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                  Namaskaram, {displayName} 🌸
                </h1>
                <p className="mt-1.5 max-w-xl text-cream-100/85">
                  {sampleEvent ? (
                    <>
                      Your {sampleEvent.type.toLowerCase()} is{" "}
                      <span className="font-semibold text-gold-200">
                        {sampleEvent.daysAway} days away
                      </span>{" "}
                      and you&apos;re {tasksPct}% of the way there. Here&apos;s where everything
                      stands.
                    </>
                  ) : (
                    <>
                      You don&apos;t have an event yet — build a checklist, set a budget and start
                      matching with vendors in minutes.
                    </>
                  )}
                </p>
                {sampleEvent && (
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-cream-100/80">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-4 text-gold-300" /> {sampleEvent.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="size-4 text-gold-300" /> {sampleEvent.guests} guests
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarCheck className="size-4 text-gold-300" /> {sampleEvent.dateLabel}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                <Button asChild variant="gold">
                  {sampleEvent ? (
                    <Link href="/vendors">
                      Find vendors <ArrowRight className="size-4" />
                    </Link>
                  ) : (
                    <Link href="/plan">
                      Start planning <ArrowRight className="size-4" />
                    </Link>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Stat cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                  <span
                    className={cn(
                      "grid size-10 place-items-center rounded-xl bg-gradient-to-br shadow-soft",
                      stat.accent
                    )}
                  >
                    <StatIcon className="size-5" />
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl font-semibold text-ink">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.sub}</span>
                </div>
                <Progress value={stat.pct} className="h-1.5" indicatorClassName={stat.barClass} />
              </div>
            );
          })}
        </div>

        {/* Next actions */}
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarClock className="size-5 text-maroon-600" />
                <h2 className="font-serif text-lg font-semibold text-ink">Up next</h2>
              </div>
              <Button asChild variant="link" size="sm" className="h-auto">
                <Link href="/dashboard#checklist">
                  View checklist <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
            <ul className="mt-3 flex flex-col gap-2">
              {upcoming.map((item) => (
                <li
                  key={item.title}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-cream-50 px-4 py-3"
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-md border-2 border-cream-400" />
                  <span className="flex-1 text-sm text-ink">{item.title}</span>
                  {item.ai && (
                    <Badge variant="gold" className="hidden gap-1 px-2 py-0.5 text-[10px] sm:inline-flex">
                      <Sparkles className="size-2.5" /> AI
                    </Badge>
                  )}
                  <span className="shrink-0 text-xs font-medium text-muted-foreground">
                    {item.due}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI nudge */}
          <div className="relative overflow-hidden rounded-2xl border border-gold-300 bg-gradient-to-br from-gold-50 to-cream-100 p-5 shadow-card sm:p-6">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-maroon-900 shadow-soft">
                <Sparkles className="size-4.5" />
              </span>
              <h2 className="font-serif text-lg font-semibold text-ink">From your AI co-planner</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Decor is trending{" "}
              <span className="font-semibold text-destructive">
                {formatINR((budgetLines[3]?.spent ?? 0) - (budgetLines[3]?.allocated ?? 0))} over
              </span>{" "}
              budget. Your <span className="font-semibold">{formatINR(100000, { compact: true })}</span> buffer can
              absorb it — or trim the floral mandapam package to stay on plan.
            </p>
            <Button asChild variant="primary" size="sm" className="mt-4">
              <Link href="/dashboard#budget">
                Review budget <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================ Checklist */}
      <section id="checklist" className="scroll-mt-24">
        <SectionLabel
          icon={ListChecks}
          eyebrow="Stay on track"
          title="Checklist"
          description="Every ritual and task, grouped by how far out it is. Tap a row to mark it done."
        />
        <div className="mt-5">
          <Checklist tasks={checklistTasks} />
        </div>
      </section>

      {/* ============================================ Budget */}
      <section id="budget" className="scroll-mt-24">
        <SectionLabel
          icon={Wallet}
          eyebrow="Every rupee"
          title="Budget"
          description={`Allocated ${formatINR(totalAllocated, {
            compact: true,
          })} across ${budgetLines.length} categories — tracked live with overspend alerts.`}
        />
        <div className="mt-5">
          <BudgetTracker totalBudget={sampleEvent?.totalBudget ?? 0} budgetLines={budgetLines} />
        </div>
      </section>

      {/* ============================================ Vendors */}
      <section id="vendors" className="scroll-mt-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionLabel
            icon={Store}
            eyebrow="Your shortlist"
            title="Recommended vendors"
            description="Hand-picked for your budget, dates and style — verified and ready to chat."
          />
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/vendors">
              Browse all vendors <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {recommended.map((vendor) => (
            <VendorCard key={vendor.slug} vendor={vendor} />
          ))}
        </div>
      </section>

      {/* ============================================ Bookings */}
      <section id="bookings" className="scroll-mt-24">
        <SectionLabel
          icon={CalendarCheck}
          eyebrow="Locked in"
          title="Bookings & payments"
          description={`${sampleEvent?.booked ?? 0} vendors confirmed for ${sampleEvent?.dateLabel ?? ""}.`}
        />
        <div className="mt-5 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card">
          <ul className="flex flex-col">
            {bookings.map((b, i) => {
              const balanceDue = b.status === "Balance due";
              return (
                <li
                  key={b.title}
                  className={cn(
                    "flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between",
                    i !== 0 && "border-t border-border/50"
                  )}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-green-100 text-green-600">
                      <Check className="size-5 stroke-[2.5]" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">{b.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {b.type} · {b.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold",
                        balanceDue
                          ? "bg-gold-100 text-gold-800"
                          : "bg-green-100 text-green-700"
                      )}
                    >
                      {balanceDue ? <Clock className="size-3" /> : <ShieldCheck className="size-3" />}
                      {b.status}
                    </span>
                    <span className="font-serif text-base font-semibold text-maroon-700">
                      {formatINR(b.amount)}
                    </span>
                    {balanceDue && (
                      <PaymentDialog
                        amount={b.amount}
                        title={b.type}
                        payee={b.title}
                        triggerLabel="Pay balance"
                      />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between gap-3 border-t border-border/60 bg-cream-50 px-5 py-4">
            <span className="inline-flex items-center gap-2 text-sm text-ink-soft">
              <CreditCard className="size-4 text-maroon-600" />
              Total confirmed spend
            </span>
            <span className="font-serif text-lg font-semibold text-ink">
              {formatINR(bookings.reduce((s, b) => s + b.amount, 0))}
            </span>
          </div>
        </div>
      </section>

      {/* ============================================ Messages */}
      <section id="messages" className="scroll-mt-24">
        <SectionLabel
          icon={MessageCircle}
          eyebrow="Stay in touch"
          title="Messages"
          description="One inbox for every vendor — no scattered WhatsApp threads."
        />
        <div className="mt-5 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card">
          <ul className="flex flex-col">
            {messages.map((m, i) => (
              <li
                key={m.from}
                className={cn(
                  "flex items-center gap-3 p-4 transition-colors hover:bg-cream-50 sm:p-5",
                  i !== 0 && "border-t border-border/50"
                )}
              >
                <Avatar className="size-11 border-maroon-200">
                  <AvatarFallback className="bg-maroon-100 text-maroon-700">
                    {m.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-ink">{m.from}</p>
                    {m.unread && <span className="size-2 shrink-0 rounded-full bg-maroon-600" />}
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{m.preview}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{m.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================ Settings */}
      <section id="settings" className="scroll-mt-24">
        <SectionLabel
          icon={Settings}
          eyebrow="Make it yours"
          title="Settings & preferences"
          description="Manage your event details, notifications and account."
        />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: CalendarCheck,
              title: "Event details",
              desc: `${sampleEvent?.coupleNames ?? ""} · ${sampleEvent?.dateLabel ?? ""}`,
            },
            {
              icon: Bell,
              title: "Notifications",
              desc: "Email & SMS reminders before every deadline",
            },
            {
              icon: ShieldCheck,
              title: "Account & privacy",
              desc: "Family plan · 2 members · Kochi",
            },
          ].map((card) => {
            const CardIcon = card.icon;
            return (
              <button
                key={card.title}
                type="button"
                className="group flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-5 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cream-100 text-maroon-600">
                  <CardIcon className="size-5" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink">{card.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{card.desc}</p>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </button>
            );
          })}
        </div>

        <KasavuDivider className="mx-auto mt-10" />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Planning made joyful, the Kerala way.{" "}
          <Link href="/how-it-works" className="font-medium text-maroon-600 hover:underline">
            See how Eventplus works
          </Link>
        </p>
      </section>
    </div>
  );
}

function SectionLabel({
  icon: SectionIcon,
  eyebrow,
  title,
  description,
}: {
  icon: typeof Wallet;
  eyebrow: string;
  title: string;
  description: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
        <SectionIcon className="size-3.5" /> {eyebrow}
      </span>
      <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
      <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{description}</p>
    </div>
  );
}
