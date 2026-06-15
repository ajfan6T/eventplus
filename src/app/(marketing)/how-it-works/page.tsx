import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Check,
  Store,
  Building2,
  Users,
  Heart,
  IndianRupee,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/icon";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { KasavuDivider, Mandala, Sparkle } from "@/components/decor/motifs";
import { howItWorks, valueProps } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "See how Eventplus turns a stressful Kerala celebration into a calm, organised plan — an AI co-planner, verified vendors, live budgets and one-place booking. Free for families, fair for vendors.",
};

/* Hand-written sub-bullets that enrich the 4-step journey data. */
const stepDetails: Record<string, string[]> = {
  "01": [
    "Pick your occasion — kalyanam, gruhapravesam, birthday and more",
    "Set your date, district, guest count and a budget you're comfortable with",
    "Add the rituals that matter to your family — we keep them front and centre",
  ],
  "02": [
    "Every task carries a deadline counted back from your event date",
    "Allocate by category and watch a live tracker flag any overspend",
    "AI-suggested tasks appear as your plan grows — accept or dismiss in a tap",
  ],
  "03": [
    "Matches are filtered by your style, budget band and availability",
    "Compare ratings, packages and real reviews side by side",
    "Shortlist favourites and message vendors without leaving Eventplus",
  ],
  "04": [
    "Confirm vendors and lock dates with a clear, itemised summary",
    "Track advances, balances and payment milestones in one timeline",
    "Run the whole celebration from a single dashboard, right up to the day",
  ],
};

const faqs = [
  {
    q: "How are vendors verified on Eventplus?",
    a: "Every vendor goes through a manual review before they go live. We check business registration and GST or FSSAI documents where applicable, confirm a portfolio of completed Kerala events, and speak to past clients. Catering partners must hold valid food-safety credentials. The “Verified” badge only appears once a vendor clears all of these, and we re-check listings periodically and after any flagged review.",
  },
  {
    q: "What does Eventplus cost families?",
    a: "It is completely free for families. There is no planning fee, no subscription and no charge to build your checklist, track your budget, browse vendors or message them. You pay vendors directly for their services at the rates shown on their listing — Eventplus never adds a markup on top.",
  },
  {
    q: "Which areas of Kerala do you cover?",
    a: "Phase one covers all 14 districts of Kerala, with the deepest vendor network around Kochi, Thiruvananthapuram, Kozhikode and Thrissur. Coverage in smaller towns is growing every week. If you don't yet see enough options for your location, tell us and we'll prioritise onboarding vendors near you.",
  },
  {
    q: "How does the AI planning actually work?",
    a: "When you describe your event, our AI co-planner draws on thousands of real Kerala celebrations to generate a deadline-aware checklist and a starting budget split tailored to your occasion, guest count and customs. As you make choices it keeps suggesting the next sensible step, nudges you before a deadline slips, and recommends verified vendors matched to your plan. You stay in control — every suggestion can be edited, accepted or dismissed.",
  },
  {
    q: "What happens if my plans change — can I get a refund?",
    a: "Your Eventplus plan, checklist and budget are free, so there's nothing to refund on our side. Payments you make to vendors are governed by each vendor's own cancellation and rescheduling terms, which are shown clearly before you confirm a booking. If a confirmed vendor cancels on you, our team steps in to help you find a verified replacement at short notice.",
  },
  {
    q: "How rigorously are vendors vetted before they can list?",
    a: "Listing is free, but it isn't automatic. We screen for genuine identity and credentials, a track record of delivered events, and consistent customer feedback. Vendors who repeatedly miss commitments, respond poorly or attract verified complaints are removed. Our goal is simple: every name you see is one we'd trust for our own family's celebration.",
  },
];

const pricingTiers = [
  {
    name: "Families",
    icon: Heart,
    price: "₹0",
    unit: "always free",
    tagline: "Everything you need to plan a stress-free celebration.",
    featured: true,
    cta: { label: "Start planning free", href: "/plan", variant: "gold" as const },
    features: [
      "AI co-planner, checklist & live budget",
      "No planning fee, ever — full access",
      "Browse & message 1,200+ verified vendors",
      "One-place booking & payment tracking",
    ],
  },
  {
    name: "Vendors",
    icon: Store,
    price: "Pay as you grow",
    unit: "small commission per confirmed booking",
    tagline: "Free to list. You only pay when you actually win business.",
    featured: false,
    cta: { label: "Join as a vendor", href: "/for-vendors", variant: "outline" as const },
    features: [
      "Free to create and showcase your listing",
      "Qualified leads from families near you",
      "CRM dashboard, calendar & earnings tracking",
      "A modest commission only on confirmed bookings",
    ],
  },
  {
    name: "Corporate",
    icon: Building2,
    price: "Custom",
    unit: "founder-led, fully managed",
    tagline: "Premium, end-to-end events for Kerala's IT parks and enterprises.",
    featured: false,
    cta: { label: "Talk to the founder", href: "/corporate", variant: "outline" as const },
    features: [
      "Dedicated, founder-led planning team",
      "Offsites, town halls, launches & annual days",
      "Vetted premium venues & vendor crews",
      "Tailored quote built around your brief",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-festive">
        <Mandala className="pointer-events-none absolute -right-28 -top-24 size-[30rem] text-gold-500/15 animate-spin-slow" />
        <Mandala className="pointer-events-none absolute -left-32 bottom-0 size-96 text-maroon-600/10" />
        <Container className="relative flex flex-col items-center gap-6 py-16 text-center lg:py-24">
          <Reveal>
            <Badge variant="gold" className="gap-1.5 px-3.5 py-1.5 text-sm">
              <Sparkles className="size-3.5" /> A calmer way to celebrate
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-4xl text-balance font-serif text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              How{" "}
              <span className="relative whitespace-nowrap text-maroon-700">
                Eventplus
                <Sparkle className="absolute -right-6 -top-3 size-5 text-gold-500" />
              </span>{" "}
              works
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              From the first idea to the final farewell, Eventplus pairs an AI co-planner with
              verified Kerala vendors — turning a hundred loose worries into one calm, organised
              plan. Here's exactly how it comes together.
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
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-green-600" /> Free for families
              </span>
              <span className="size-1 rounded-full bg-cream-400" />
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-green-600" /> No planning fee
              </span>
              <span className="size-1 rounded-full bg-cream-400" />
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-green-600" /> Verified vendors only
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ----------------------------------------------- The 4-step journey */}
      <Section className="relative overflow-hidden bg-cream-50 bg-dots">
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="The journey"
              title="From overwhelmed to organised, in four steps"
              description="No spreadsheets, no group-chat chaos. Just a clear path from your first idea to a celebration that runs itself."
            />
          </Reveal>

          <div className="relative mt-14">
            {/* connecting spine for the timeline (desktop) */}
            <div className="pointer-events-none absolute left-[calc(2.5rem+1px)] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-gold-300 via-gold-400/60 to-transparent lg:block" />

            <RevealGroup className="flex flex-col gap-6">
              {howItWorks.map((step) => (
                <RevealItem key={step.step}>
                  <div className="group relative flex flex-col gap-6 rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8 lg:flex-row lg:items-center lg:gap-10">
                    {/* number + icon cluster */}
                    <div className="flex shrink-0 items-center gap-5 lg:w-72">
                      <span className="relative z-10 grid size-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold-300 to-gold-500 text-maroon-900 shadow-soft">
                        <Icon name={step.icon} className="size-9" />
                      </span>
                      <div>
                        <span className="font-serif text-5xl font-semibold leading-none text-cream-300">
                          {step.step}
                        </span>
                        <h3 className="mt-2 font-serif text-xl font-semibold text-ink">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* description + sub-bullets */}
                    <div className="flex flex-1 flex-col gap-4">
                      <p className="text-pretty leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                      <ul className="grid gap-2.5 sm:grid-cols-3">
                        {(stepDetails[step.step] ?? []).map((line) => (
                          <li
                            key={line}
                            className="flex items-start gap-2.5 rounded-xl bg-cream-100 px-3.5 py-3"
                          >
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-green-100 text-green-700">
                              <Check className="size-3 stroke-[3]" />
                            </span>
                            <span className="text-sm leading-snug text-ink-soft">{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------- Everything you get */}
      <Section className="bg-cream-100">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Everything you get"
              title="A complete toolkit, in one warm place"
              description="The features families use every day to plan with confidence — no add-ons, no upsells."
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop) => (
              <RevealItem
                key={prop.title}
                className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-maroon-900 shadow-soft">
                  <Icon name={prop.icon} className="size-6" />
                </span>
                <h3 className="font-serif text-xl font-semibold text-ink">{prop.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {prop.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ------------------------------------------------------- Pricing */}
      <Section id="pricing" className="relative overflow-hidden bg-cream-50 bg-mandala">
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="Pricing"
              title="Fair for families, fair for vendors"
              description="Families never pay to plan. Vendors only pay when they win. And enterprises get a bespoke, founder-led service."
            />
          </Reveal>

          <RevealGroup className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {pricingTiers.map((tier) => {
              const TierIcon = tier.icon;
              return (
                <RevealItem key={tier.name} className="h-full">
                  <div
                    className={
                      tier.featured
                        ? "relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border-2 border-gold-400 bg-card p-8 shadow-lift"
                        : "relative flex h-full flex-col gap-6 rounded-3xl border border-border/70 bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                    }
                  >
                    {tier.featured && (
                      <>
                        <Mandala className="pointer-events-none absolute -right-10 -top-10 size-44 text-gold-500/10" />
                        <Badge
                          variant="gold"
                          className="absolute right-6 top-6 gap-1 px-3 py-1 text-[11px]"
                        >
                          <Sparkles className="size-3" /> Most popular
                        </Badge>
                      </>
                    )}

                    <div className="flex flex-col gap-4">
                      <span
                        className={
                          tier.featured
                            ? "grid size-12 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-maroon-900 shadow-soft"
                            : "grid size-12 place-items-center rounded-xl bg-maroon-50 text-maroon-700"
                        }
                      >
                        <TierIcon className="size-6" />
                      </span>
                      <div>
                        <h3 className="font-serif text-2xl font-semibold text-ink">{tier.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{tier.tagline}</p>
                      </div>
                    </div>

                    <div className="border-y border-border/60 py-5">
                      <p className="font-serif text-4xl font-semibold text-maroon-700">
                        {tier.price}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{tier.unit}</p>
                    </div>

                    <ul className="flex flex-1 flex-col gap-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-green-100 text-green-700">
                            <Check className="size-3 stroke-[3]" />
                          </span>
                          <span className="text-sm leading-snug text-ink-soft">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      asChild
                      size="lg"
                      variant={tier.cta.variant}
                      className="mt-auto w-full"
                    >
                      <Link href={tier.cta.href}>
                        {tier.cta.label} <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 text-center text-sm text-muted-foreground">
              <IndianRupee className="size-4 text-gold-600" />
              No hidden charges and no markup on vendor prices — what you agree with a vendor is
              what you pay.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ----------------------------------------------------------- FAQ */}
      <Section className="bg-cream-100">
        <Container className="max-w-3xl">
          <Reveal>
            <SectionHeading
              eyebrow="Good questions"
              title="Everything you wanted to ask"
              description="Straight answers on verification, fees, coverage and how the planning actually works."
            />
          </Reveal>
          <KasavuDivider className="mx-auto mt-6" />
          <Reveal delay={0.05}>
            <div className="mt-8 rounded-2xl border border-border/70 bg-card px-6 shadow-card sm:px-8">
              <Accordion type="single" collapsible>
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={faq.q}
                    value={`faq-${i}`}
                    className={i === faqs.length - 1 ? "border-b-0" : undefined}
                  >
                    <AccordionTrigger className="font-serif text-lg">{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col items-center gap-3 text-center">
              <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="size-4 text-maroon-600" /> Still have a question?
              </p>
              <Button asChild variant="soft">
                <Link href="/corporate#inquiry">
                  Talk to our team <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ----------------------------------------------------- Final CTA */}
      <section className="relative overflow-hidden bg-maroon-900 py-20">
        <Mandala className="pointer-events-none absolute -left-20 -top-20 size-96 text-gold-500/10 animate-spin-slow" />
        <Mandala className="pointer-events-none absolute -right-24 -bottom-24 size-[26rem] text-gold-500/10" />
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <Sparkle className="size-8 text-gold-400" />
          <h2 className="max-w-3xl text-balance font-serif text-4xl font-semibold leading-tight text-cream-50 sm:text-5xl">
            Now that you know how it works — let's build your plan
          </h2>
          <p className="max-w-xl text-pretty text-lg text-cream-200/70">
            It's free to start. Tell us about your celebration and watch your checklist, budget and
            vendor shortlist come together in minutes.
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
              <Link href="/vendors">Browse vendors</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
