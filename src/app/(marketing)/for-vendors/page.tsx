import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Check,
  Inbox,
  LayoutDashboard,
  CalendarDays,
  Wallet,
  BadgeCheck,
  Banknote,
  UserPlus,
  MessageSquare,
  IndianRupee,
  TrendingUp,
  Quote,
  Star,
  ShieldCheck,
  Store,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { KasavuDivider, Mandala, Sparkle } from "@/components/decor/motifs";
import { GradientVisual } from "@/components/visual/gradient-visual";
import { leads, earningsByMonth, leadStatusMeta } from "@/lib/data/vendor-dashboard";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "For vendors — Grow your event business | Eventplus",
  description:
    "List free on Eventplus and reach Kerala families planning weddings, housewarmings, birthdays and corporate events. Qualified leads, a CRM-style dashboard, a booking calendar and earnings tracking — pay only when you win work.",
};

const benefits = [
  {
    icon: Inbox,
    title: "Qualified leads, not cold calls",
    description:
      "Couples and families come to you with the event type, date, location and budget already filled in. Every enquiry is ready to quote.",
  },
  {
    icon: LayoutDashboard,
    title: "A CRM-style dashboard",
    description:
      "Track every lead from new to booked in one calm view. Notes, statuses and chat live together — no more lost WhatsApp threads.",
  },
  {
    icon: CalendarDays,
    title: "Calendar & availability",
    description:
      "Block dates, hold tentative bookings and avoid double-bookings. Your live calendar keeps the festive-season rush organised.",
  },
  {
    icon: Wallet,
    title: "Earnings tracking",
    description:
      "See bookings, advances and monthly revenue at a glance. Know exactly how much each season earned — and what's coming up.",
  },
  {
    icon: BadgeCheck,
    title: "Verified badge & trust",
    description:
      "Pass our quick vetting and wear the green verified badge. Reviews from real Kerala families help you stand out and win more.",
  },
  {
    icon: Banknote,
    title: "Free to list, pay per booking",
    description:
      "Creating your profile and receiving leads is free. A small success fee applies only when a booking is confirmed — never before.",
  },
];

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create your profile",
    description:
      "Add your services, photos, packages and the districts you cover. Get the verified badge in 48 hours.",
  },
  {
    step: "02",
    icon: Inbox,
    title: "Get matched leads",
    description:
      "We send enquiries that fit your category, dates, location and budget — straight to your dashboard.",
  },
  {
    step: "03",
    icon: MessageSquare,
    title: "Quote & chat",
    description:
      "Reply with a tailored quote, chat to lock the brief, and hold the date while it's being confirmed.",
  },
  {
    step: "04",
    icon: IndianRupee,
    title: "Get booked & paid",
    description:
      "Confirm the booking, collect the advance and track payouts. Earn a glowing review when the day goes perfectly.",
  },
];

const stats = [
  { value: "1,200+", label: "Vendors growing with us" },
  { value: "30,000+", label: "Leads delivered in 2025" },
  { value: "₹4.2L", label: "Avg. annual vendor earnings" },
  { value: "< 6 hrs", label: "Median first-response time" },
];

const faqs = [
  {
    q: "What does it cost to join?",
    a: "Listing is completely free. You can build a full profile, appear in search and receive matched leads at no charge. We charge a small success fee only when a booking is confirmed through Eventplus — typically 8–12% depending on your category. There are no monthly subscriptions, setup charges or lead-purchase fees.",
  },
  {
    q: "How does vetting and the verified badge work?",
    a: "Every vendor goes through a quick review: we confirm your business details, check a sample of past work and look for genuine customer references. Most profiles are verified within 48 hours. Once approved you receive the green verified badge that Kerala families look for, plus priority placement in matched results.",
  },
  {
    q: "When and how do payouts happen?",
    a: "You collect advances directly from the customer and the final balance on or before the event, just as you do today. For bookings paid through Eventplus, payouts are settled to your registered bank account within 3 working days of the event, with the success fee deducted transparently. Every transaction shows up in your earnings dashboard.",
  },
  {
    q: "Which areas and event types can I serve?",
    a: "We cover all 14 districts of Kerala — from Thiruvananthapuram and Kochi to Kozhikode and Kannur. You choose the districts you travel to during onboarding. Eventplus handles weddings, housewarmings, birthdays, baby showers, inaugurations and corporate events, so caterers, decorators, photographers, venues, mehendi artists and more all have a place here.",
  },
  {
    q: "How many leads will I receive?",
    a: "It depends on your category, coverage area, ratings and how quickly you respond — vendors who reply within a few hours and keep an updated calendar see noticeably more bookings. New profiles usually start receiving matched enquiries within the first week of being verified.",
  },
  {
    q: "Can I manage my team and multiple cities?",
    a: "Yes. You can add team members to share lead responses, set per-district pricing and block dates across your calendar. Larger studios use the dashboard to coordinate multiple crews during peak wedding season without double-booking.",
  },
];

// Lead rows for the dashboard preview — kept tight and realistic.
const previewLeads = leads.slice(0, 4);
const maxEarning = Math.max(...earningsByMonth.map((m) => m.value));

export default function ForVendorsPage() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-festive">
        <Mandala className="pointer-events-none absolute -right-24 -top-20 size-[28rem] text-gold-500/15 animate-spin-slow" />
        <Mandala className="pointer-events-none absolute -left-32 bottom-0 size-96 text-maroon-600/10" />
        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="flex flex-col items-start gap-6">
            <Reveal>
              <Badge variant="gold" className="gap-1.5 px-3.5 py-1.5 text-sm">
                <Store className="size-3.5" /> For Kerala event vendors
              </Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
                Grow your event business with{" "}
                <span className="relative whitespace-nowrap text-maroon-700">
                  Eventplus
                  <Sparkle className="absolute -right-6 -top-3 size-5 text-gold-500" />
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                Reach families planning weddings, housewarmings and birthdays across all 14
                districts — with qualified leads delivered to a CRM-style dashboard built for
                busy vendors. Quote, chat, get booked and track every rupee in one place.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="gold">
                <Link href="/signup?role=vendor">
                  <Sparkles className="size-4" /> Join as a vendor
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/vendor">
                  See the vendor dashboard <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-green-600" /> Free to list
                </span>
                <span className="size-1 rounded-full bg-cream-400" />
                <span className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-green-600" /> Pay only per booking
                </span>
                <span className="size-1 rounded-full bg-cream-400" />
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-green-600" /> Verified in 48 hrs
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.25} className="mt-2 grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-cream-50 px-4 py-4 text-center">
                  <p className="font-serif text-2xl font-semibold text-maroon-700">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Hero dashboard glimpse */}
          <Reveal delay={0.15} className="relative hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-gold-200/60 to-maroon-100/40 blur-xl" />
              <div className="rounded-3xl border border-border bg-card p-5 shadow-lift">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gold-700">
                      Your dashboard
                    </p>
                    <p className="font-serif text-xl font-semibold text-ink">
                      Marigold Decor Studio
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                    <BadgeCheck className="size-3.5" /> Verified
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-maroon-50/70 p-4">
                    <span className="grid size-9 place-items-center rounded-xl bg-maroon-600 text-cream-50">
                      <Inbox className="size-5" />
                    </span>
                    <p className="mt-3 font-serif text-2xl font-semibold text-maroon-700">7</p>
                    <p className="text-xs text-muted-foreground">New leads this week</p>
                  </div>
                  <div className="rounded-2xl bg-green-50 p-4">
                    <span className="grid size-9 place-items-center rounded-xl bg-green-600 text-cream-50">
                      <TrendingUp className="size-5" />
                    </span>
                    <p className="mt-3 font-serif text-2xl font-semibold text-green-700">₹3.4L</p>
                    <p className="text-xs text-muted-foreground">Earned this month</p>
                  </div>
                </div>

                <div className="mt-3 rounded-2xl bg-cream-100 p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-ink">Recent leads</span>
                    <span className="text-muted-foreground">Today</span>
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    {previewLeads.slice(0, 3).map((lead) => {
                      const meta = leadStatusMeta[lead.status];
                      return (
                        <div
                          key={lead.id}
                          className="flex items-center gap-3 rounded-xl border border-border/60 bg-cream-50 px-3 py-2.5"
                        >
                          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-maroon-100 text-xs font-semibold text-maroon-700">
                            {lead.customer.slice(0, 1)}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-ink">
                              {lead.customer}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {lead.event} · {lead.location}
                            </p>
                          </div>
                          <Badge variant={meta.badge} className="shrink-0 px-2 py-0.5 text-[10px]">
                            {meta.label}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* floating earnings chip */}
              <div
                className="glass absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-cream-50/50 p-3 shadow-lift"
                style={{ animation: "var(--animate-float)", animationDelay: "0.4s" }}
              >
                <span className="grid size-10 place-items-center rounded-xl bg-gold-100 text-gold-700">
                  <Wallet className="size-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Payout cleared</p>
                  <p className="font-serif text-base font-semibold text-ink">₹1.85L</p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------ Benefits */}
      <Section className="bg-cream-100">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Why list with us"
              title="Everything you need to win more bookings"
              description="Eventplus brings the customers and the tools. You bring the craft — we'll handle the busywork so you can focus on the celebration."
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <RevealItem
                key={benefit.title}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-maroon-900 shadow-soft transition-transform group-hover:scale-105">
                  <benefit.icon className="size-6" />
                </span>
                <h3 className="font-serif text-xl font-semibold text-ink">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ------------------------------------------------- How it works */}
      <Section className="relative overflow-hidden bg-cream-50 bg-dots">
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="How it works for vendors"
              title="From profile to payout, in four steps"
              description="No cold outreach, no chasing — just a steady flow of matched enquiries and a place to turn them into bookings."
            />
          </Reveal>
          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <RevealItem key={step.step} className="relative">
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-maroon-900 shadow-soft">
                      <step.icon className="size-6" />
                    </span>
                    <span className="font-serif text-4xl font-semibold text-cream-300">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-ink">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="absolute -right-5 top-1/2 hidden size-6 -translate-y-1/2 text-gold-400 lg:block" />
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ------------------------------------------ Dashboard preview */}
      <Section className="bg-cream-100">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-6">
              <Badge variant="maroon" className="w-fit gap-1.5">
                <LayoutDashboard className="size-3.5" /> Your command centre
              </Badge>
              <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                One dashboard to manage{" "}
                <span className="text-maroon-700">leads, dates & earnings</span>
              </h2>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                Stop juggling spreadsheets, WhatsApp and call logs. See every enquiry, its
                status and value at a glance — then move it to booked with a tap and watch your
                monthly earnings build.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Lead pipeline from new to booked, with statuses",
                  "Live calendar that prevents double-bookings",
                  "Earnings and payout history, month by month",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-green-100 text-green-700">
                      <Check className="size-3.5 stroke-[3]" />
                    </span>
                    <span className="text-ink-soft">{line}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" variant="primary" className="w-fit">
                <Link href="/vendor">
                  Explore the dashboard <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          {/* Mock dashboard */}
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-gold-200/60 to-maroon-100/40 blur-xl" />
              <div className="rounded-3xl border border-border bg-card p-5 shadow-lift sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GradientVisual
                      seed={4}
                      className="size-11 rounded-xl"
                      withMandala={false}
                    />
                    <div>
                      <p className="font-serif text-base font-semibold text-ink">
                        Marigold Decor Studio
                      </p>
                      <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="size-3 fill-gold-400 text-gold-400" /> 4.7 · Thrissur
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                    <BadgeCheck className="size-3.5" /> Verified
                  </span>
                </div>

                {/* Earnings mini bar chart */}
                <div className="mt-5 rounded-2xl bg-cream-100 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">Earnings — last 6 months</span>
                    <span className="font-semibold text-green-700">
                      {formatINR(
                        earningsByMonth.reduce((sum, m) => sum + m.value, 0),
                        { compact: true }
                      )}
                    </span>
                  </div>
                  <div className="mt-4 flex h-28 items-end justify-between gap-2">
                    {earningsByMonth.map((m, i) => {
                      const pct = Math.round((m.value / maxEarning) * 100);
                      const isLatest = i === earningsByMonth.length - 1;
                      return (
                        <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                          <div className="flex h-full w-full items-end justify-center">
                            <div
                              className={`w-full max-w-9 rounded-t-md transition-all ${
                                isLatest
                                  ? "bg-gradient-to-t from-maroon-600 to-maroon-400"
                                  : "bg-gradient-to-t from-gold-500 to-gold-300"
                              }`}
                              style={{ height: `${pct}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-medium text-muted-foreground">
                            {m.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Lead rows */}
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between px-1 text-xs">
                    <span className="font-medium text-ink">Lead pipeline</span>
                    <span className="text-muted-foreground">{leads.length} active</span>
                  </div>
                  {previewLeads.map((lead) => {
                    const meta = leadStatusMeta[lead.status];
                    return (
                      <div
                        key={lead.id}
                        className="flex items-center gap-3 rounded-xl border border-border/60 bg-cream-50 px-3.5 py-2.5"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-maroon-100 text-xs font-semibold text-maroon-700">
                          {lead.customer.slice(0, 1)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-ink">
                            {lead.customer}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {lead.event} · {lead.date}
                          </p>
                        </div>
                        <div className="hidden shrink-0 text-right sm:block">
                          <p className="text-sm font-semibold text-maroon-700">
                            {formatINR(lead.budget, { compact: true })}
                          </p>
                          <p className="text-[10px] text-muted-foreground">{lead.location}</p>
                        </div>
                        <Badge variant={meta.badge} className="shrink-0 px-2 py-0.5 text-[10px]">
                          {meta.label}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------ Social proof band */}
      <Section className="bg-maroon-900 text-cream-100">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Trusted by Kerala's best"
              title={<span className="text-cream-50">Vendors are growing faster with Eventplus</span>}
              description={
                <span className="text-cream-200/70">
                  From single-person studios to full-service teams, vendors across the state are
                  filling their calendars with the right kind of work.
                </span>
              }
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <RevealItem
                key={stat.label}
                className="flex flex-col gap-2 rounded-2xl border border-cream-200/10 bg-maroon-800/50 p-6 text-center backdrop-blur transition-colors hover:border-gold-400/40"
              >
                <p className="font-serif text-4xl font-semibold text-gold-300">{stat.value}</p>
                <p className="text-sm text-cream-200/70">{stat.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ------------------------------------------------------ Vendor testimonial */}
      <Section className="bg-cream-50">
        <Container>
          <Reveal>
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card sm:p-12">
              <Mandala className="pointer-events-none absolute -right-16 -top-16 size-64 text-gold-500/10" />
              <div className="relative flex flex-col items-start gap-6">
                <Quote className="size-10 text-gold-400" />
                <p className="text-balance font-serif text-2xl font-medium leading-snug text-ink sm:text-3xl">
                  “Before Eventplus I was chasing leads on five different WhatsApp groups. Now the
                  right enquiries land in one dashboard with the date, budget and theme already
                  there. We booked{" "}
                  <span className="text-maroon-700">eleven weddings last season</span> — and I
                  finally know what each month earns.”
                </p>
                <div className="flex items-center gap-4 border-t border-border/60 pt-6">
                  <GradientVisual
                    seed={9}
                    className="size-14 rounded-full"
                    withMandala={false}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-ink">Reshma Nair</p>
                    <p className="text-sm text-muted-foreground">
                      Founder, Marigold Decor Studio · Thrissur
                    </p>
                  </div>
                  <div className="hidden items-center gap-1 sm:flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------ FAQ */}
      <Section className="bg-cream-100">
        <Container className="max-w-3xl">
          <Reveal>
            <SectionHeading
              eyebrow="Vendor FAQ"
              title="Questions, answered"
              description="Everything you'd ask before signing up — fees, vetting, payouts and coverage."
            />
          </Reveal>
          <KasavuDivider className="mx-auto mt-6" />
          <Reveal delay={0.05}>
            <div className="mt-8 rounded-2xl border border-border/70 bg-card px-6 shadow-card sm:px-8">
              <Accordion type="single" collapsible>
                {faqs.map((faq, i) => (
                  <AccordionItem key={faq.q} value={`faq-${i}`}>
                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Still have a question?{" "}
              <Link
                href="/corporate#inquiry"
                className="font-semibold text-maroon-600 underline-offset-4 hover:underline"
              >
                Talk to our vendor team
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------ Final CTA */}
      <section className="relative overflow-hidden bg-maroon-900 py-20">
        <Mandala className="pointer-events-none absolute -left-20 -top-20 size-96 text-gold-500/10 animate-spin-slow" />
        <Mandala className="pointer-events-none absolute -right-24 -bottom-24 size-[26rem] text-gold-500/10" />
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <Sparkle className="size-8 text-gold-400" />
          <h2 className="max-w-3xl text-balance font-serif text-4xl font-semibold leading-tight text-cream-50 sm:text-5xl">
            Ready to fill your calendar? List free today
          </h2>
          <p className="max-w-xl text-pretty text-lg text-cream-200/70">
            Build your profile in minutes, get verified within 48 hours and start receiving
            matched leads. No subscription, no upfront cost — you only pay when you get booked.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="gold">
              <Link href="/signup?role=vendor">
                <Sparkles className="size-4" /> Join as a vendor
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-cream-200/30 text-cream-100 hover:bg-cream-50/10 hover:text-cream-50"
            >
              <Link href="/vendor">See the vendor dashboard</Link>
            </Button>
          </div>
          <p className="mt-2 text-xs text-cream-200/50">
            Free to list · Verified in 48 hours · Pay only per booking
          </p>
        </Container>
      </section>
    </>
  );
}
