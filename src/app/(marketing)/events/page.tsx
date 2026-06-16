import Link from "next/link";
import type { Metadata } from "next";
import { Sparkles, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mandala, Sparkle, KasavuDivider } from "@/components/decor/motifs";
import { CategoryCard } from "@/components/categories/category-card";
import { getEventCategories } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Plan any celebration — Events | Eventplus",
  description:
    "Weddings, housewarmings, birthdays, baby showers and inaugurations — pick your occasion and let Eventplus pair you with verified Kerala vendors and a smart, custom-built plan.",
};

const promises = [
  "Verified, background-checked vendors",
  "AI checklist tuned to your occasion",
  "Live budget tracking, no planning fee",
];

export default async function EventsPage() {
  const eventCategories = await getEventCategories();
  return (
    <>
      {/* ----------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-festive">
        <Mandala className="pointer-events-none absolute -right-28 -top-24 size-[30rem] text-gold-500/15 animate-spin-slow" />
        <Mandala className="pointer-events-none absolute -left-32 bottom-0 size-96 text-maroon-600/10" />
        <Container className="relative flex flex-col items-center gap-6 py-16 text-center lg:py-24">
          <Reveal>
            <Badge variant="gold" className="gap-1.5 px-3.5 py-1.5 text-sm">
              <Sparkles className="size-3.5" /> Every occasion, one platform
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-4xl text-balance font-serif text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              Plan any{" "}
              <span className="relative whitespace-nowrap text-maroon-700">
                celebration
                <Sparkle className="absolute -right-7 -top-3 size-5 text-gold-500" />
              </span>
              <br />
              the way Kerala does it best.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              From a grand kalyanam to an intimate seemantham, every occasion has its
              own rituals, rhythm and budget. Choose yours and we'll hand you a curated
              vendor shortlist and a playbook built around Kerala's customs.
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
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {promises.map((p, i) => (
                <li key={p} className="inline-flex items-center gap-2">
                  {i === 0 ? (
                    <ShieldCheck className="size-4 text-green-600" />
                  ) : (
                    <Check className="size-4 text-green-600" />
                  )}
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* --------------------------------------------------- Category grid */}
      <Section className="bg-cream-100">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Pick your occasion"
              title="A tailored plan for every kind of celebration"
              description="Each occasion comes with hand-picked vendors, a timeline tuned to local customs and a realistic budget guide — no two celebrations are alike."
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
                  Something else in mind?
                </p>
                <p className="text-sm text-muted-foreground">
                  Browse all 1,200+ vendors and build a custom plan
                </p>
              </Link>
            </RevealItem>
          </RevealGroup>
        </Container>
      </Section>

      {/* ------------------------------------------------------- CTA band */}
      <Section className="bg-cream-50">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-maroon-700 via-maroon-600 to-maroon-800 px-6 py-12 text-center text-cream-50 shadow-card sm:px-12 sm:py-16">
              <Mandala className="pointer-events-none absolute -right-16 -top-16 size-72 text-gold-500/15 animate-spin-slow" />
              <Mandala className="pointer-events-none absolute -left-20 -bottom-20 size-72 text-gold-500/10" />
              <div className="relative flex flex-col items-center gap-5">
                <Sparkle className="size-8 text-gold-300" />
                <h2 className="max-w-2xl text-balance font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                  Not sure where to begin? Let the planner do the first draft.
                </h2>
                <p className="max-w-xl text-pretty text-cream-100/80">
                  Tell us your occasion, guest count and budget. In minutes you'll have a
                  deadline-aware checklist, a live budget and vendor picks ready to book.
                </p>
                <KasavuDivider className="my-1" />
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" variant="gold">
                    <Link href="/plan">
                      <Sparkles className="size-4" /> Build my plan
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-cream-200/30 text-cream-100 hover:bg-cream-50/10 hover:text-cream-50"
                  >
                    <Link href="/how-it-works">See how it works</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
