import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Heart,
  IndianRupee,
  Users,
  Store,
  Smile,
  MapPin,
  Quote,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { KasavuDivider, Mandala, Sparkle, Diya } from "@/components/decor/motifs";
import { GradientVisual } from "@/components/visual/gradient-visual";
import { heroStats } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Eventplus is built in Kerala, for Kerala — pairing verified local vendors with an AI co-planner so families can celebrate kalyanam, gruhapravesam and every milestone without the stress. Meet the team and the mission behind it.",
};

/* --------------------------------------------------- our values */
const values = [
  {
    icon: ShieldCheck,
    title: "Trust & verification",
    description:
      "Every vendor is background-checked, reviewed and rated by real Kerala families. If we wouldn't book them for our own kalyanam, they aren't on Eventplus.",
  },
  {
    icon: Heart,
    title: "Celebrate culture",
    description:
      "From the nilavilakku to the sadhya, our plans honour the rituals that make a Malayali celebration ours — never a generic checklist copied from elsewhere.",
  },
  {
    icon: IndianRupee,
    title: "Transparent pricing",
    description:
      "Clear starting prices, no hidden planning fee, and a live budget that tracks every rupee. You always know what you're paying and why.",
  },
  {
    icon: Users,
    title: "Family-first",
    description:
      "Planning a Kerala event is a family affair. We build for the amma coordinating from the kitchen and the cousin in the Gulf joining the group chat.",
  },
  {
    icon: Store,
    title: "Vendor success",
    description:
      "Great celebrations need thriving vendors. We send qualified leads, fair tools and steady work to caterers, decorators and photographers across the state.",
  },
  {
    icon: Smile,
    title: "Joy over stress",
    description:
      "The whole point is the moment — the muhurtham, the first slice of cake. We carry the logistics so you can simply be present and enjoy it.",
  },
];

/* --------------------------------------------------- why kerala first */
const focusCities = [
  {
    city: "Kochi",
    district: "Ernakulam",
    note: "Grand convention-centre kalyanams and waterfront receptions.",
    gradient: ["#7b1e3b", "#9a2f50", "#c9a227"] as [string, string, string],
  },
  {
    city: "Thiruvananthapuram",
    district: "The capital",
    note: "Temple weddings, heritage halls and classic sadhya catering.",
    gradient: ["#1f4d3a", "#2c6044", "#d4b246"] as [string, string, string],
  },
  {
    city: "Kozhikode",
    district: "Malabar",
    note: "Malabar feasts, biryani spreads and seaside celebrations.",
    gradient: ["#b8476a", "#d97c92", "#74ab8a"] as [string, string, string],
  },
  {
    city: "Thrissur",
    district: "Cultural capital",
    note: "Pooram-scale energy — decor, melam and grand processions.",
    gradient: ["#a9851c", "#c9a227", "#1f4d3a"] as [string, string, string],
  },
];

/* --------------------------------------------------- team */
const team = [
  {
    name: "Arjun Menon",
    role: "Founder & CEO",
    initials: "AM",
    seed: 5,
    bio: "Built Eventplus after planning his sister's kalyanam across 30 messy WhatsApp chats. Ex-product at a Kochi startup.",
  },
  {
    name: "Divya Nair",
    role: "Head of Vendor Trust",
    initials: "DN",
    seed: 1,
    bio: "Personally vets vendors across all 14 districts. Believes a verified badge should mean something to every family.",
  },
  {
    name: "Rahul Pillai",
    role: "Head of AI & Product",
    initials: "RP",
    seed: 7,
    bio: "Teaches the co-planner the rhythm of a Kerala celebration — which ritual comes when, and what it costs.",
  },
  {
    name: "Sneha Thomas",
    role: "Head of Family Experience",
    initials: "ST",
    seed: 3,
    bio: "Makes sure every family — from the amma to the NRI cousin — feels held from first plan to final toast.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-festive">
        <Mandala className="pointer-events-none absolute -right-28 -top-24 size-[30rem] text-gold-500/15 animate-spin-slow" />
        <Mandala className="pointer-events-none absolute -left-32 bottom-0 size-96 text-maroon-600/10" />
        <Container className="relative flex flex-col items-center gap-6 py-16 text-center lg:py-24">
          <Reveal>
            <Badge variant="gold" className="gap-1.5 px-3.5 py-1.5 text-sm">
              <Sparkles className="size-3.5" /> Our story
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-4xl text-balance font-serif text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              Built in Kerala,{" "}
              <span className="relative whitespace-nowrap text-maroon-700">
                for Kerala
                <Sparkle className="absolute -right-6 -top-3 size-5 text-gold-500" />
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Eventplus exists to give every Malayali family the celebration they
              dream of — without the chaos. We pair verified local vendors with an
              AI co-planner, so the joy of a kalyanam or gruhapravesam never gets
              lost in the logistics.
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
                Meet our vendors <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={0.2}>
            <KasavuDivider className="mt-2" />
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------- Mission band */}
      <section className="relative overflow-hidden bg-maroon-900 py-20 text-cream-100 sm:py-28">
        <Mandala className="pointer-events-none absolute -left-24 -top-24 size-[26rem] text-gold-500/10 animate-spin-slow" />
        <Mandala className="pointer-events-none absolute -right-28 -bottom-28 size-[28rem] text-gold-500/10" />
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <Reveal>
            <span className="grid size-14 place-items-center rounded-2xl bg-cream-50/10 text-gold-300">
              <Diya className="size-8 text-gold-400" />
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
              Our mission
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-4xl text-balance font-serif text-3xl font-medium leading-[1.18] text-cream-50 sm:text-4xl lg:text-5xl">
              To make every Kerala celebration{" "}
              <span className="text-gold-foil">joyful, trusted and within reach</span>{" "}
              — so families remember the moments, not the stress.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-cream-200/70 sm:text-lg">
              We believe a wedding, a housewarming or a first birthday should feel
              like a blessing, not a project. That belief shapes every vendor we
              verify and every line of the planner we build.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------- Our story */}
      <Section className="bg-cream-100">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="flex flex-col gap-6">
              <SectionHeading
                align="left"
                eyebrow="Why we exist"
                title={
                  <>
                    A celebration should never feel like{" "}
                    <span className="text-maroon-700">a second job</span>
                  </>
                }
                className="max-w-xl"
              />
              <div className="flex flex-col gap-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>
                  Anyone who has planned a Kerala celebration knows the chaos. Thirty
                  WhatsApp groups, a dozen vendor visits, prices that change with every
                  phone call, and an aunt who insists she knows a better caterer. The
                  joy of the occasion disappears under spreadsheets and second-guessing.
                </p>
                <p>
                  We started Eventplus because we lived it. There was no single, trusted
                  place to find verified vendors, understand fair pricing, and keep a
                  sprawling family plan on track. So we built one — bringing
                  background-checked local vendors together with an AI co-planner that
                  understands the rhythm of a Malayali celebration, ritual by ritual.
                </p>
                <p>
                  And we're starting where it matters most to us: Kerala. Not as a
                  generic template stretched over the state, but built around our
                  customs, our districts and our way of celebrating — then earning the
                  trust of one family at a time.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                <Badge variant="green" className="gap-1.5">
                  <ShieldCheck className="size-3.5" /> Verified vendors
                </Badge>
                <Badge variant="maroon" className="gap-1.5">
                  <Sparkles className="size-3.5" /> AI co-planner
                </Badge>
                <Badge variant="gold" className="gap-1.5">
                  <MapPin className="size-3.5" /> Kerala-first
                </Badge>
              </div>
            </div>
          </Reveal>

          {/* Story collage */}
          <Reveal delay={0.1}>
            <div className="relative mx-auto aspect-square max-w-md">
              <div
                className="absolute left-0 top-4 w-3/5"
                style={{ animation: "var(--animate-float)" }}
              >
                <GradientVisual
                  seed={5}
                  className="aspect-[3/4] rounded-3xl shadow-lift ring-1 ring-cream-50/40"
                >
                  <div className="flex h-full items-end p-5">
                    <div className="text-cream-50">
                      <p className="text-xs uppercase tracking-widest text-gold-200">
                        Est. in Kochi
                      </p>
                      <p className="font-serif text-xl font-semibold">
                        Made by Malayalis
                      </p>
                    </div>
                  </div>
                </GradientVisual>
              </div>
              <div
                className="absolute right-0 top-0 w-2/5"
                style={{ animation: "var(--animate-float)", animationDelay: "1.4s" }}
              >
                <GradientVisual
                  seed={1}
                  className="aspect-square rounded-2xl shadow-lift ring-1 ring-cream-50/40"
                >
                  <div className="flex h-full items-end p-4">
                    <p className="font-serif text-base font-semibold text-cream-50">
                      Verified vendors
                    </p>
                  </div>
                </GradientVisual>
              </div>
              <div
                className="absolute bottom-0 right-2 w-1/2"
                style={{ animation: "var(--animate-float)", animationDelay: "0.7s" }}
              >
                <GradientVisual
                  seed={7}
                  className="aspect-[4/3] rounded-2xl shadow-lift ring-1 ring-cream-50/40"
                >
                  <div className="flex h-full items-end p-4">
                    <p className="font-serif text-base font-semibold text-cream-50">
                      Calm, on-time plans
                    </p>
                  </div>
                </GradientVisual>
              </div>
              {/* floating chip */}
              <div
                className="glass absolute bottom-8 left-0 flex items-center gap-3 rounded-2xl border border-cream-50/50 p-3 shadow-lift"
                style={{ animation: "var(--animate-float)", animationDelay: "0.4s" }}
              >
                <span className="grid size-10 place-items-center rounded-xl bg-maroon-100 text-maroon-700">
                  <Heart className="size-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">Founded</p>
                  <p className="font-serif text-base font-semibold text-ink">
                    With love, in Kerala
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------ Values grid */}
      <Section className="relative overflow-hidden bg-cream-50 bg-dots">
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="What we believe"
              title="The values behind every plan"
              description="Six commitments that guide who we partner with, what we build, and how we treat every family that trusts us."
            />
          </Reveal>
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const ValueIcon = value.icon;
              return (
                <RevealItem
                  key={value.title}
                  className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-maroon-900 shadow-soft">
                    <ValueIcon className="size-6" />
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-ink">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* ----------------------------------------------- Why Kerala first */}
      <Section className="bg-cream-100">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                align="left"
                eyebrow="Phase one"
                title={
                  <>
                    Why we're starting with{" "}
                    <span className="text-maroon-700">Kerala first</span>
                  </>
                }
                description="Going deep before going wide. We'd rather be indispensable in one place we love than thinly spread everywhere."
                className="max-w-2xl"
              />
              <Button asChild variant="outline" className="shrink-0">
                <Link href="/vendors">
                  Browse by city <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {focusCities.map((place) => (
              <RevealItem key={place.city}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <GradientVisual gradient={place.gradient} className="aspect-[5/3] w-full">
                    <div className="flex h-full flex-col justify-end p-4 text-cream-50">
                      <p className="inline-flex items-center gap-1 text-xs text-cream-100/90">
                        <MapPin className="size-3.5" /> {place.district}
                      </p>
                      <h3 className="font-serif text-2xl font-semibold leading-tight drop-shadow-sm">
                        {place.city}
                      </h3>
                    </div>
                  </GradientVisual>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {place.note}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-10 max-w-2xl text-pretty text-center text-sm text-muted-foreground">
              Live across all 14 Kerala districts today — with more cities and the rest
              of South India on the roadmap as our vendor community grows.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* --------------------------------------------------------- Stats band */}
      <section className="relative overflow-hidden bg-maroon-900 py-16 text-cream-100 sm:py-20">
        <Mandala className="pointer-events-none absolute -right-24 -top-20 size-96 text-gold-500/10 animate-spin-slow" />
        <Container className="relative">
          <Reveal>
            <p className="text-center font-serif text-2xl font-semibold text-cream-50 sm:text-3xl">
              The proof is in the celebrations
            </p>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream-200/10 bg-cream-200/10 sm:grid-cols-4">
            {heroStats.map((stat) => (
              <RevealItem
                key={stat.label}
                className="bg-maroon-900 px-4 py-8 text-center"
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

      {/* ------------------------------------------------------------ Team */}
      <Section className="bg-cream-50">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The people"
              title="A small team that cares deeply"
              description="Founders and builders who have planned these celebrations themselves — and want yours to be effortless."
            />
          </Reveal>
          <KasavuDivider className="mx-auto mt-6" />
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <RevealItem
                key={member.name}
                className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-border/70 bg-card p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative">
                  <Avatar className="size-20 border-2 border-cream-200 shadow-soft">
                    <AvatarFallback className="bg-transparent p-0">
                      <GradientVisual
                        seed={member.seed}
                        withMandala={false}
                        overlay={false}
                        className="grid size-full place-items-center rounded-full"
                      >
                        <span className="font-serif text-xl font-semibold text-cream-50 drop-shadow-sm">
                          {member.initials}
                        </span>
                      </GradientVisual>
                    </AvatarFallback>
                  </Avatar>
                  <Sparkle className="absolute -right-1 -top-1 size-4 text-gold-500 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ink">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-maroon-600">{member.role}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* --------------------------------------------------- Founder's note */}
      <Section className="bg-cream-100">
        <Container>
          <Reveal>
            <figure className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card sm:p-12">
              <Mandala className="pointer-events-none absolute -right-16 -top-16 size-56 text-gold-500/10" />
              <Quote className="size-10 text-gold-400" />
              <blockquote className="relative mt-5 text-pretty font-serif text-2xl font-medium leading-snug text-ink sm:text-3xl">
                “I built Eventplus for the version of me drowning in WhatsApp groups
                the week before my sister's kalyanam. Every family deserves to enjoy
                their own celebration — that's the whole reason we're here.”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-border/60 pt-6">
                <Avatar className="size-12 border border-cream-200">
                  <AvatarFallback className="bg-transparent p-0">
                    <GradientVisual
                      seed={5}
                      withMandala={false}
                      overlay={false}
                      className="grid size-full place-items-center rounded-full"
                    >
                      <span className="font-serif text-sm font-semibold text-cream-50">
                        AM
                      </span>
                    </GradientVisual>
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-ink">Arjun Menon</p>
                  <p className="text-sm text-muted-foreground">
                    Founder & CEO, Eventplus
                  </p>
                </div>
              </figcaption>
            </figure>
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
            Let's plan a celebration worth remembering
          </h2>
          <p className="max-w-xl text-pretty text-lg text-cream-200/70">
            Join thousands of Kerala families who started with a free plan — and
            celebrated without the stress.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="gold">
              <Link href="/plan">
                <Sparkles className="size-4" /> Start planning free
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-cream-200/30 text-cream-100 hover:bg-cream-50/10 hover:text-cream-50"
            >
              <Link href="/for-vendors">Partner with us</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
