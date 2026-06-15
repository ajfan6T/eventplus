import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Check,
  ShieldCheck,
  Quote,
  Building2,
  Store,
  CircleCheck,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/icon";
import { Rating } from "@/components/ui/rating";
import { KasavuDivider, Mandala, Sparkle } from "@/components/decor/motifs";
import { GradientVisual } from "@/components/visual/gradient-visual";
import { CategoryCard } from "@/components/categories/category-card";
import { VendorCard } from "@/components/vendors/vendor-card";
import { eventCategories } from "@/lib/data/categories";
import {
  heroStats,
  howItWorks,
  valueProps,
  trustLogos,
} from "@/lib/data/site";
import { testimonials } from "@/lib/data/testimonials";
import { getFeaturedVendors } from "@/lib/data/vendors";
import { budgetLines, checklistTasks, sampleEvent } from "@/lib/data/planner";
import { formatINR } from "@/lib/utils";

export default function HomePage() {
  const featured = getFeaturedVendors(6);
  const previewTasks = checklistTasks.slice(5, 9);
  const previewBudget = budgetLines.slice(0, 4);

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
                <Sparkles className="size-3.5" /> Kerala's AI-powered event planner
              </Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
                Plan unforgettable{" "}
                <span className="relative whitespace-nowrap text-maroon-700">
                  celebrations
                  <Sparkle className="absolute -right-6 -top-3 size-5 text-gold-500" />
                </span>
                <br />
                the joyful way.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                From kalyanam to gruhapravesam, Eventplus pairs you with verified Kerala
                vendors and an AI co-planner — smart checklists, live budgets and one-place
                booking. So you celebrate, stress-free.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="gold">
                <Link href="/plan">
                  <Sparkles className="size-4" /> Start planning free
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/vendors">
                  Browse vendors <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-green-600" /> Verified vendors
                </span>
                <span className="size-1 rounded-full bg-cream-400" />
                <span className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-green-600" /> No planning fee
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.25} className="mt-2 grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label} className="bg-cream-50 px-4 py-4 text-center">
                  <p className="font-serif text-2xl font-semibold text-maroon-700">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Hero collage */}
          <Reveal delay={0.15} className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-lg">
              <div className="absolute left-0 top-6 w-3/5 [animation-delay:0s]" style={{ animation: "var(--animate-float)" }}>
                <GradientVisual seed={1} className="aspect-[3/4] rounded-3xl shadow-lift ring-1 ring-cream-50/40">
                  <div className="flex h-full items-end p-5">
                    <div className="text-cream-50">
                      <p className="text-xs uppercase tracking-widest text-gold-200">Weddings</p>
                      <p className="font-serif text-xl font-semibold">Kalyanam, sorted</p>
                    </div>
                  </div>
                </GradientVisual>
              </div>
              <div className="absolute right-0 top-0 w-2/5" style={{ animation: "var(--animate-float)", animationDelay: "1.5s" }}>
                <GradientVisual seed={7} className="aspect-square rounded-2xl shadow-lift ring-1 ring-cream-50/40">
                  <div className="flex h-full items-end p-4">
                    <p className="font-serif text-base font-semibold text-cream-50">Decor</p>
                  </div>
                </GradientVisual>
              </div>
              <div className="absolute bottom-0 right-2 w-1/2" style={{ animation: "var(--animate-float)", animationDelay: "0.8s" }}>
                <GradientVisual seed={3} className="aspect-[4/3] rounded-2xl shadow-lift ring-1 ring-cream-50/40">
                  <div className="flex h-full items-end p-4">
                    <p className="font-serif text-base font-semibold text-cream-50">Sadhya & catering</p>
                  </div>
                </GradientVisual>
              </div>
              {/* floating budget chip */}
              <div className="glass absolute bottom-10 left-0 flex items-center gap-3 rounded-2xl border border-cream-50/50 p-3 shadow-lift" style={{ animation: "var(--animate-float)", animationDelay: "0.4s" }}>
                <span className="grid size-10 place-items-center rounded-xl bg-green-100 text-green-700">
                  <CircleCheck className="size-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Budget on track</p>
                  <p className="font-serif text-base font-semibold text-ink">₹2.1L saved</p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>

        {/* Trust strip */}
        <div className="border-y border-border/70 bg-cream-50/60 py-5">
          <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Trusted across Kerala
            </span>
            {trustLogos.map((logo) => (
              <span key={logo} className="text-sm font-medium text-ink-soft/70">
                {logo}
              </span>
            ))}
          </Container>
        </div>
      </section>

      {/* ------------------------------------------------- Event categories */}
      <Section className="bg-cream-100">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Every occasion"
              title="One platform for all your celebrations"
              description="Whatever you're marking, we've curated the vendors and built the playbook — tuned to Kerala's customs and your budget."
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {eventCategories.map((category) => (
              <RevealItem key={category.slug}>
                <CategoryCard category={category} />
              </RevealItem>
            ))}
            <RevealItem>
              <Link
                href="/vendors"
                className="group flex h-full min-h-[18rem] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-maroon-300 bg-maroon-50/50 p-8 text-center transition-colors hover:bg-maroon-50"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-maroon-600 text-cream-50 shadow-soft transition-transform group-hover:scale-105">
                  <ArrowRight className="size-6" />
                </span>
                <p className="font-serif text-xl font-semibold text-maroon-700">
                  Explore all 1,200+ vendors
                </p>
                <p className="text-sm text-muted-foreground">
                  Venues, caterers, photographers, decor & more
                </p>
              </Link>
            </RevealItem>
          </RevealGroup>
        </Container>
      </Section>

      {/* ------------------------------------------------------ How it works */}
      <Section className="relative overflow-hidden bg-cream-50 bg-dots">
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="From overwhelmed to organised in minutes"
              description="Eventplus does the heavy lifting so you can focus on the moments that matter."
            />
          </Reveal>
          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, i) => (
              <RevealItem key={step.step} className="relative">
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-maroon-900 shadow-soft">
                      <Icon name={step.icon} className="size-6" />
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
                {i < howItWorks.length - 1 && (
                  <ArrowRight className="absolute -right-5 top-1/2 hidden size-6 -translate-y-1/2 text-gold-400 lg:block" />
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ------------------------------------------ AI planner showcase */}
      <Section className="bg-cream-100">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-6">
              <Badge variant="maroon" className="w-fit gap-1.5">
                <Sparkles className="size-3.5" /> Your AI co-planner
              </Badge>
              <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                A living checklist and budget that{" "}
                <span className="text-maroon-700">think ahead for you</span>
              </h2>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                Tell us your occasion and budget. Eventplus generates a deadline-aware
                checklist, tracks every rupee in real time, and nudges you before anything
                slips — with vendor suggestions matched to your plan.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Auto-built task timeline for your event type",
                  "Live budget tracker with overspend alerts",
                  "Curated vendor picks inside every task",
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
                <Link href="/plan">
                  Try the planner <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          {/* Planner mock */}
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-gold-200/60 to-maroon-100/40 blur-xl" />
              <div className="rounded-3xl border border-border bg-card p-5 shadow-lift sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gold-700">
                      {sampleEvent.type} · {sampleEvent.location}
                    </p>
                    <p className="font-serif text-xl font-semibold text-ink">
                      {sampleEvent.coupleNames}
                    </p>
                  </div>
                  <span className="rounded-full bg-maroon-50 px-3 py-1 text-xs font-semibold text-maroon-700">
                    {sampleEvent.daysAway} days to go
                  </span>
                </div>

                <div className="mt-5 rounded-2xl bg-cream-100 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">Budget used</span>
                    <span className="font-semibold text-maroon-700">
                      {formatINR(sampleEvent.spent, { compact: true })} of{" "}
                      {formatINR(sampleEvent.totalBudget, { compact: true })}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-col gap-3">
                    {previewBudget.map((line) => {
                      const pct = Math.min(100, Math.round((line.spent / line.allocated) * 100));
                      return (
                        <div key={line.category}>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-ink-soft">{line.category}</span>
                            <span className={line.status === "over" ? "font-semibold text-destructive" : "text-muted-foreground"}>
                              {pct}%
                            </span>
                          </div>
                          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-cream-300">
                            <div
                              className={`h-full rounded-full ${line.status === "over" ? "bg-destructive" : "bg-gradient-to-r from-gold-400 to-gold-600"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  {previewTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 rounded-xl border border-border/60 bg-cream-50 px-3.5 py-2.5"
                    >
                      <span
                        className={`grid size-5 shrink-0 place-items-center rounded-md border-2 ${task.done ? "border-green-600 bg-green-600 text-cream-50" : "border-cream-400"}`}
                      >
                        {task.done && <Check className="size-3 stroke-[3]" />}
                      </span>
                      <span className={`flex-1 text-sm ${task.done ? "text-muted-foreground line-through" : "text-ink"}`}>
                        {task.title}
                      </span>
                      {task.aiSuggested && (
                        <Badge variant="gold" className="gap-1 px-2 py-0.5 text-[10px]">
                          <Sparkles className="size-2.5" /> AI
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* --------------------------------------------------- Featured vendors */}
      <Section className="bg-cream-50">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                align="left"
                eyebrow="Top rated"
                title="Verified vendors, loved by Kerala families"
                description="Hand-picked, background-checked and reviewed by real customers — no surprises."
                className="max-w-2xl"
              />
              <Button asChild variant="outline" className="shrink-0">
                <Link href="/vendors">
                  See all vendors <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((vendor) => (
              <RevealItem key={vendor.slug}>
                <VendorCard vendor={vendor} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ------------------------------------------------------ Value props */}
      <Section className="bg-maroon-900 text-cream-100">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Why Eventplus"
              title={<span className="text-cream-50">Built to take the stress off your shoulders</span>}
              description={
                <span className="text-cream-200/70">
                  Everything you need to plan with confidence — in one warm, calm place.
                </span>
              }
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop) => (
              <RevealItem
                key={prop.title}
                className="flex flex-col gap-4 rounded-2xl border border-cream-200/10 bg-maroon-800/50 p-6 backdrop-blur transition-colors hover:border-gold-400/40"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-gold-500/15 text-gold-300">
                  <Icon name={prop.icon} className="size-6" />
                </span>
                <h3 className="font-serif text-xl font-semibold text-cream-50">{prop.title}</h3>
                <p className="text-sm leading-relaxed text-cream-200/70">{prop.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ------------------------------------------------------ Testimonials */}
      <Section className="bg-cream-100">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Loved by families"
              title="9,500+ celebrations, and counting"
            />
          </Reveal>
          <KasavuDivider className="mx-auto mt-6" />
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <RevealItem
                key={t.name}
                className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card"
              >
                <Quote className="size-7 text-gold-400" />
                <p className="text-pretty leading-relaxed text-ink-soft">“{t.quote}”</p>
                <div className="mt-auto flex items-center gap-3 border-t border-border/60 pt-4">
                  <span className="grid size-11 place-items-center rounded-full bg-maroon-100 font-semibold text-maroon-700">
                    {t.initials}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.event} · {t.location}
                    </p>
                  </div>
                  <Rating value={t.rating} />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ------------------------------------------- Two-sided CTA band */}
      <Section className="bg-cream-50">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-green-700 to-green-900 p-8 text-cream-50 shadow-card">
              <span className="grid size-12 place-items-center rounded-xl bg-cream-50/15">
                <Building2 className="size-6 text-gold-300" />
              </span>
              <h3 className="font-serif text-2xl font-semibold">Planning a corporate event?</h3>
              <p className="text-cream-100/80">
                Premium offsites, town halls, product launches and annual days for Infopark,
                Technopark and Cyberpark companies — founder-led, fully managed.
              </p>
              <Button asChild variant="gold" className="mt-auto w-fit">
                <Link href="/corporate">
                  Explore corporate <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <div className="flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-maroon-600 to-maroon-800 p-8 text-cream-50 shadow-card">
              <span className="grid size-12 place-items-center rounded-xl bg-cream-50/15">
                <Store className="size-6 text-gold-300" />
              </span>
              <h3 className="font-serif text-2xl font-semibold">Are you an event vendor?</h3>
              <p className="text-cream-100/80">
                Get qualified leads, a CRM-style dashboard, a calendar and earnings tracking —
                and grow your business across Kerala.
              </p>
              <Button asChild variant="gold" className="mt-auto w-fit">
                <Link href="/for-vendors">
                  Join as a vendor <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
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
            Your celebration deserves to be joyful — start planning today
          </h2>
          <p className="max-w-xl text-pretty text-lg text-cream-200/70">
            It's free to start. Build your plan, explore vendors and see your budget come to
            life in minutes.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="gold">
              <Link href="/plan">
                <Sparkles className="size-4" /> Start planning free
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-cream-200/30 text-cream-100 hover:bg-cream-50/10 hover:text-cream-50">
              <Link href="/how-it-works">See how it works</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
