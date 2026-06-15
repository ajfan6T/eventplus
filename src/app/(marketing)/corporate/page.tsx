import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  Quote,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/icon";
import { Mandala, Sparkle, KasavuDivider } from "@/components/decor/motifs";
import { GradientVisual } from "@/components/visual/gradient-visual";
import { InquiryForm } from "@/components/corporate/inquiry-form";
import { site } from "@/lib/data/site";
import {
  itParks,
  corporateServices,
  corporateStats,
  corporateProcess,
} from "@/lib/data/corporate";

export const metadata: Metadata = {
  title: "Corporate events for Kerala's IT parks | Eventplus",
  description:
    "Premium, founder-led offsites, town halls, product launches and annual days for companies at Infopark, Technopark and Cyberpark. Request a curated proposal within 72 hours.",
};

export default function CorporatePage() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-900 to-maroon-900 text-cream-100">
        <Mandala className="pointer-events-none absolute -right-28 -top-24 size-[30rem] text-gold-400/15 animate-spin-slow" />
        <Mandala className="pointer-events-none absolute -left-32 bottom-0 size-96 text-cream-50/5" />
        <Container className="relative grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div className="flex flex-col items-start gap-6">
            <Reveal>
              <Badge
                variant="gold"
                className="gap-1.5 px-3.5 py-1.5 text-sm"
              >
                <Building2 className="size-3.5" /> For Kerala&apos;s IT parks
              </Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance font-serif text-4xl font-semibold leading-[1.05] text-cream-50 sm:text-5xl lg:text-6xl">
                Corporate events,{" "}
                <span className="relative whitespace-nowrap text-gold-foil">
                  elevated
                  <Sparkle className="absolute -right-6 -top-3 size-5 text-gold-400" />
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-xl text-pretty text-lg leading-relaxed text-cream-200/80">
                Premium offsites, town halls, product launches and annual days —
                produced end to end for the teams building from Infopark, Technopark
                and Cyberpark. One founder-led point of contact, no fuss, no surprises.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="gold">
                <Link href="#inquiry">
                  <Sparkles className="size-4" /> Request a proposal
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-cream-200/30 text-cream-100 hover:bg-cream-50/10 hover:text-cream-50 hover:border-cream-200/50"
              >
                <Link href="#services">See what we produce</Link>
              </Button>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-cream-200/70">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-gold-300" /> Founder-led delivery
                </span>
                <span className="size-1 rounded-full bg-cream-200/40" />
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4 text-gold-300" /> 72-hour proposal turnaround
                </span>
              </div>
            </Reveal>
          </div>

          {/* Hero collage */}
          <Reveal delay={0.15} className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-lg">
              <div
                className="absolute left-0 top-6 w-3/5"
                style={{ animation: "var(--animate-float)" }}
              >
                <GradientVisual
                  seed={1}
                  className="aspect-[3/4] rounded-3xl shadow-lift ring-1 ring-cream-50/20"
                >
                  <div className="flex h-full items-end p-5">
                    <div className="text-cream-50">
                      <p className="text-xs uppercase tracking-widest text-gold-200">
                        Town halls
                      </p>
                      <p className="font-serif text-xl font-semibold">
                        All-hands, on stage
                      </p>
                    </div>
                  </div>
                </GradientVisual>
              </div>
              <div
                className="absolute right-0 top-0 w-2/5"
                style={{ animation: "var(--animate-float)", animationDelay: "1.5s" }}
              >
                <GradientVisual
                  seed={3}
                  className="aspect-square rounded-2xl shadow-lift ring-1 ring-cream-50/20"
                >
                  <div className="flex h-full items-end p-4">
                    <p className="font-serif text-base font-semibold text-cream-50">
                      Launches
                    </p>
                  </div>
                </GradientVisual>
              </div>
              <div
                className="absolute bottom-0 right-2 w-1/2"
                style={{ animation: "var(--animate-float)", animationDelay: "0.8s" }}
              >
                <GradientVisual
                  seed={7}
                  className="aspect-[4/3] rounded-2xl shadow-lift ring-1 ring-cream-50/20"
                >
                  <div className="flex h-full items-end p-4">
                    <p className="font-serif text-base font-semibold text-cream-50">
                      Backwater offsites
                    </p>
                  </div>
                </GradientVisual>
              </div>
              {/* floating proposal chip */}
              <div
                className="glass absolute bottom-12 left-0 flex items-center gap-3 rounded-2xl border border-cream-50/50 p-3 shadow-lift"
                style={{ animation: "var(--animate-float)", animationDelay: "0.4s" }}
              >
                <span className="grid size-10 place-items-center rounded-xl bg-green-100 text-green-700">
                  <Clock className="size-5" />
                </span>
                <div>
                  <p className="text-xs text-ink-soft/70">Proposal sent in</p>
                  <p className="font-serif text-base font-semibold text-ink">
                    Under 72 hours
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>

        {/* Trust strip */}
        <div className="relative border-t border-cream-200/10 bg-maroon-900/40 py-5">
          <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cream-200/50">
              Trusted by teams across Kerala&apos;s tech corridor
            </span>
            {itParks.map((park) => (
              <span
                key={park.name}
                className="text-sm font-medium text-cream-100/70"
              >
                {park.name}
              </span>
            ))}
          </Container>
        </div>
      </section>

      {/* ------------------------------------------------------- IT parks */}
      <Section className="bg-cream-100">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Where we work"
              title="Built around Kerala's IT parks"
              description="We know the venues, the logistics and the timelines of every hub — so your team gets a proposal grounded in what actually works on the ground."
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {itParks.map((park, i) => (
              <RevealItem key={park.name}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <GradientVisual seed={i * 2 + 1} className="aspect-[16/9] w-full">
                    <div className="flex h-full items-end justify-between p-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-50/90 px-3 py-1 text-xs font-semibold text-green-700 shadow-sm backdrop-blur">
                        <Building2 className="size-3.5" /> {park.companies}
                      </span>
                    </div>
                  </GradientVisual>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-ink">
                        {park.name}
                      </h3>
                      <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="size-3.5" /> {park.city}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {park.blurb}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ------------------------------------------------------- Services */}
      <Section
        id="services"
        className="relative overflow-hidden bg-cream-50 bg-dots"
      >
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="What we produce"
              title={
                <>
                  Every format your team needs,{" "}
                  <span className="text-maroon-700">fully managed</span>
                </>
              }
              description="From an intimate leadership retreat to a 600-strong annual day — one team handles venue, production and hospitality so your people simply show up."
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {corporateServices.map((service) => (
              <RevealItem
                key={service.title}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-green-600 to-green-800 text-cream-50 shadow-soft transition-transform group-hover:scale-105">
                  <Icon name={service.icon} className="size-6" />
                </span>
                <h3 className="font-serif text-xl font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------------------------------------------- Stats band */}
      <section className="relative overflow-hidden bg-gradient-to-br from-maroon-700 to-maroon-900 py-16 text-cream-100">
        <Mandala className="pointer-events-none absolute -left-20 -bottom-24 size-96 text-gold-400/10" />
        <Container className="relative">
          <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream-200/15 bg-cream-200/10 lg:grid-cols-4">
            {corporateStats.map((stat) => (
              <RevealItem
                key={stat.label}
                className="bg-maroon-800/40 px-5 py-8 text-center backdrop-blur"
              >
                <p className="font-serif text-3xl font-semibold text-gold-300 sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-sm text-cream-200/70">{stat.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* -------------------------------------------------------- Process */}
      <Section className="bg-cream-100">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="From brief to brilliant — in three steps"
              description="No drawn-out pitches. Share your brief and our founder-led team returns a curated, costed proposal within 72 hours."
            />
          </Reveal>
          <KasavuDivider className="mx-auto mt-6" />
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {corporateProcess.map((step, i) => (
              <RevealItem key={step.step} className="relative">
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card p-7 shadow-card">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-5xl font-semibold text-cream-300">
                      {step.step}
                    </span>
                    {step.step === "02" && (
                      <Badge variant="green" className="gap-1.5">
                        <Clock className="size-3.5" /> 72h
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {i < corporateProcess.length - 1 && (
                  <ArrowRight className="absolute -right-5 top-1/2 hidden size-6 -translate-y-1/2 text-gold-400 md:block" />
                )}
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Founder promise */}
          <Reveal delay={0.1} className="mt-10">
            <div className="flex flex-col items-start gap-5 overflow-hidden rounded-3xl border border-green-200 bg-gradient-to-br from-green-700 to-green-900 p-8 text-cream-50 shadow-card sm:flex-row sm:items-center sm:gap-7 sm:p-10">
              <Quote className="size-9 shrink-0 text-gold-300" />
              <p className="text-pretty font-serif text-xl font-medium leading-snug text-cream-50 sm:text-2xl">
                &ldquo;Send us your brief and you&apos;ll have a costed, curated proposal
                in your inbox within 72 hours — guaranteed.&rdquo;
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* -------------------------------------------------------- Inquiry */}
      <Section id="inquiry" className="relative overflow-hidden bg-cream-50 bg-mandala">
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal>
              <div className="flex flex-col gap-6 lg:sticky lg:top-28">
                <Badge variant="maroon" className="w-fit gap-1.5">
                  <Sparkles className="size-3.5" /> Request a proposal
                </Badge>
                <h2 className="text-balance font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                  Tell us about your event,{" "}
                  <span className="text-maroon-700">we&apos;ll do the rest</span>
                </h2>
                <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                  Share a few details and your brief routes straight to our founder. You&apos;ll
                  get a tailored, costed proposal — venue and production options included —
                  within 72 hours.
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    "A single founder-led point of contact",
                    "Curated venue & production options, costed",
                    "No booking commitment — proposal first",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-green-100 text-green-700">
                        <ShieldCheck className="size-3.5" />
                      </span>
                      <span className="text-ink-soft">{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
                  <p className="text-xs uppercase tracking-widest text-gold-700">
                    Briefs route to
                  </p>
                  <p className="mt-1 font-serif text-lg font-semibold text-ink">
                    {site.founderEmail}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Or call us directly on {site.phone}.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <InquiryForm />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
