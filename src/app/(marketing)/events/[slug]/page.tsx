import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Wallet,
  Users,
  Quote,
  Check,
  Calendar,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/icon";
import { Rating } from "@/components/ui/rating";
import { Mandala, Sparkle, KasavuDivider } from "@/components/decor/motifs";
import { GradientVisual } from "@/components/visual/gradient-visual";
import { CategoryCard } from "@/components/categories/category-card";
import { VendorCard } from "@/components/vendors/vendor-card";
import {
  eventCategories,
  getEventCategory,
  vendorCategoryLabels,
} from "@/lib/data/categories";
import { getVendorsByEventType } from "@/lib/data/vendors";
import { testimonials } from "@/lib/data/testimonials";
import type { VendorCategorySlug } from "@/lib/types";

/* -------------------------------------------------------------------------- */
/*  Icon mapping for vendor types (all names exist in the icon registry)      */
/* -------------------------------------------------------------------------- */
const vendorTypeIcons: Record<VendorCategorySlug, string> = {
  venues: "Building2",
  catering: "UtensilsCrossed",
  photography: "Camera",
  decor: "Flower2",
  makeup: "Sparkles",
  music: "Music",
  mehendi: "Sparkles",
  invitations: "Mail",
  planning: "LayoutDashboard",
  transport: "Car",
};

const vendorTypeBlurbs: Record<VendorCategorySlug, string> = {
  venues: "Mandapams, banquet halls, lawns and resorts sized to your guest list.",
  catering: "Banana-leaf sadhya, Malabar feasts and live counters by hygiene-rated cooks.",
  photography: "Candid storytellers and cinematic teams who know Kerala light.",
  decor: "Nilavilakku, marigold, kasavu drapes and stage florals, set to your theme.",
  makeup: "Bridal and family looks plus intricate mehendi, on schedule.",
  music: "Nadaswaram, chenda melam, classical ensembles and DJs.",
  mehendi: "Bridal and guest mehendi artists with traditional Kerala motifs.",
  invitations: "Printed and digital cards with custom Malayalam typesetting.",
  planning: "Founder-led coordinators who run the day so you don't have to.",
  transport: "Decorated cars, guest shuttles and out-station fleets.",
};

/* -------------------------------------------------------------------------- */
/*  Occasion-specific editorial content (Kerala customs & guidance)           */
/* -------------------------------------------------------------------------- */
type Milestone = { window: string; title: string; detail: string };
type OccasionGuide = {
  intro: string;
  customNote: string;
  budgetNote: string;
  milestones: Milestone[];
  testimonialMatch: string[];
};

const occasionGuides: Record<string, OccasionGuide> = {
  weddings: {
    intro:
      "A Kerala kalyanam moves fast on the muhurtham morning but takes months to set up. We sequence every ritual — from the nilavilakku lighting to the post-reception sadhya — so nothing is left to the last week.",
    customNote:
      "Lock the auspicious muhurtham with your astrologer first; venue, sadhya headcount and the nadaswaram troupe all flow from that date.",
    budgetNote:
      "Venue and catering typically take the largest share. A 28-item sadhya for 500 guests and a backwater-facing mandapam are where most of the budget lands.",
    milestones: [
      {
        window: "5–6 months out",
        title: "Date, venue & guest list",
        detail:
          "Confirm the muhurtham, block the mandapam or convention centre for both ceremony and reception, and draft the family guest list.",
      },
      {
        window: "3–4 months out",
        title: "Sadhya, photography & decor",
        detail:
          "Finalise the caterer and per-plate sadhya menu, book candid and traditional photo-video teams, and lock the nilavilakku-and-marigold stage decor.",
      },
      {
        window: "1–2 months out",
        title: "Makeup, mehendi & invites",
        detail:
          "Trial the bridal look, schedule mehendi, send printed and WhatsApp invitations, and confirm the nadaswaram or chenda melam ensemble.",
      },
      {
        window: "Final week",
        title: "Run-sheet & rehearsal",
        detail:
          "Walk the venue with your coordinator, confirm timings with every vendor, and hand over the muhurtham run-sheet to the family.",
      },
    ],
    testimonialMatch: ["Wedding", "Reception"],
  },
  housewarmings: {
    intro:
      "Gruhapravesam is about blessing a new home with the right rituals at the right hour. We help you choreograph the paal kaachal, puja and sadhya so guests feel welcomed the moment they arrive.",
    customNote:
      "Begin with the paal kaachal (boiling milk) at the auspicious time, light the nilavilakku, and seat elders for the puja before the sadhya is served.",
    budgetNote:
      "Catering for the sadhya is the biggest line. Keep a little aside for the puja samagri, a priest's dakshina and fresh florals for the entrance.",
    milestones: [
      {
        window: "4–6 weeks out",
        title: "Date, priest & sadhya count",
        detail:
          "Fix the auspicious gruhapravesam date with your priest and confirm the sadhya headcount with a caterer.",
      },
      {
        window: "2–3 weeks out",
        title: "Decor, photos & music",
        detail:
          "Book entrance florals and the nilavilakku setup, a photographer for the rituals, and a nadaswaram artist if desired.",
      },
      {
        window: "1 week out",
        title: "Puja samagri & transport",
        detail:
          "Arrange puja materials, confirm timings, and organise transport or parking for elders and out-station family.",
      },
      {
        window: "On the day",
        title: "Paal kaachal & sadhya",
        detail:
          "Boil the milk at the muhurtham, complete the puja, then serve a warm banana-leaf sadhya to every guest.",
      },
    ],
    testimonialMatch: ["Housewarming"],
  },
  birthdays: {
    intro:
      "Whether it's a first birthday choroonu celebration or a milestone bash, we build the day around a theme — then layer in decor, cake, entertainment and capture-worthy moments.",
    customNote:
      "For a first birthday, plan the choroonu (rice-feeding) at the auspicious time before the cake and games begin, and keep an elder on hand to bless the child.",
    budgetNote:
      "Decor and entertainment drive the spend for themed parties. A balloon-and-backdrop setup with a magician or character host is the typical splurge.",
    milestones: [
      {
        window: "4–5 weeks out",
        title: "Theme, venue & guest list",
        detail:
          "Pick a theme, book a venue or banquet space, and finalise the kids-and-family guest list.",
      },
      {
        window: "2–3 weeks out",
        title: "Cake, decor & entertainment",
        detail:
          "Order the themed cake, lock balloon-and-backdrop decor, and book a magician, mascot or kids' host.",
      },
      {
        window: "1 week out",
        title: "Catering & favours",
        detail:
          "Confirm finger food and the meal menu, arrange return gifts, and brief your photographer on key moments.",
      },
      {
        window: "On the day",
        title: "Choroonu & celebration",
        detail:
          "Complete the rice-feeding ritual if it's a first birthday, then move into the cake-cutting and games.",
      },
    ],
    testimonialMatch: ["1st Birthday", "Birthday"],
  },
  "baby-showers": {
    intro:
      "Seemantham and valaikappu are gentle, glowing celebrations for the mum-to-be. We keep things soft and intimate — pastel decor, comfortable seating, easy catering and keepsake photos.",
    customNote:
      "Honour the mum-to-be with bangles (valaikappu), seat her comfortably, and serve her favourite foods — the day is built entirely around her comfort.",
    budgetNote:
      "Decor and photography are the highlights. Catering stays modest for an intimate guest list, so spend where the keepsakes are made.",
    milestones: [
      {
        window: "3–4 weeks out",
        title: "Date, venue & guest list",
        detail:
          "Choose a comfortable date (usually the 7th or 9th month), book a home or hall, and keep the guest list close.",
      },
      {
        window: "2 weeks out",
        title: "Decor, makeup & photos",
        detail:
          "Lock soft pastel decor and a floral seat for the mum-to-be, book light makeup and a candid photographer.",
      },
      {
        window: "1 week out",
        title: "Catering & bangles",
        detail:
          "Confirm a gentle menu with her favourites, arrange the valaikappu bangles, and prepare keepsake gifts.",
      },
      {
        window: "On the day",
        title: "Valaikappu & blessings",
        detail:
          "Welcome her with bangles and flowers, gather elders for blessings, and capture the glow.",
      },
    ],
    testimonialMatch: ["Baby Shower"],
  },
  inaugurations: {
    intro:
      "Open your shop, clinic or studio on an auspicious note. We bring together the lamp lighting, nadaswaram, ribbon ceremony and the buzz that gets footfall through the door on day one.",
    customNote:
      "Light the nilavilakku and break a coconut at the auspicious muhurtham, invite an elder or local dignitary for the ribbon-cutting, and keep nadaswaram playing as guests arrive.",
    budgetNote:
      "Decor and music set the tone, while a small sadhya or refreshment counter keeps guests lingering — and lingering guests mean opening-day buzz.",
    milestones: [
      {
        window: "3–4 weeks out",
        title: "Muhurtham, venue prep & guests",
        detail:
          "Fix the auspicious opening time, prepare the premises, and invite dignitaries, neighbours and media.",
      },
      {
        window: "2 weeks out",
        title: "Decor, lamp & music",
        detail:
          "Book entrance florals and the ribbon-and-lamp setup, arrange nadaswaram, and confirm a photographer.",
      },
      {
        window: "1 week out",
        title: "Refreshments & invites",
        detail:
          "Lock a refreshment or sadhya counter, send printed and digital invites, and brief staff on the run-sheet.",
      },
      {
        window: "On the day",
        title: "Lamp lighting & ribbon-cutting",
        detail:
          "Light the lamp, break the coconut, cut the ribbon at the muhurtham, then welcome the first customers.",
      },
    ],
    testimonialMatch: ["Inauguration"],
  },
};

/* -------------------------------------------------------------------------- */
/*  Static params + metadata                                                  */
/* -------------------------------------------------------------------------- */
export function generateStaticParams() {
  return eventCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getEventCategory(slug);
  if (!category) {
    return { title: "Occasion not found | Eventplus" };
  }
  return {
    title: `${category.name} — ${category.tagline} | Eventplus`,
    description: category.description,
  };
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */
export default async function EventCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getEventCategory(slug);
  if (!category) notFound();

  const guide = occasionGuides[category.slug];
  const recommended = getVendorsByEventType(category.slug).slice(0, 6);
  const otherCategories = eventCategories.filter((c) => c.slug !== category.slug);

  // Testimonials relevant to this occasion, falling back to a general set.
  const matched = testimonials.filter((t) =>
    guide?.testimonialMatch.some((m) =>
      t.event.toLowerCase().includes(m.toLowerCase())
    )
  );
  const occasionTestimonials = (matched.length ? matched : testimonials).slice(0, 3);

  return (
    <>
      {/* ----------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <GradientVisual
          gradient={category.gradient}
          className="min-h-[34rem] w-full"
          overlay={false}
        >
          {/* deep base scrim for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 via-maroon-900/35 to-transparent" />
          <Mandala className="pointer-events-none absolute -right-24 -top-20 size-[30rem] text-cream-50/15 animate-spin-slow" />
          <Container className="relative flex min-h-[34rem] flex-col justify-end py-14 lg:py-20">
            <Reveal>
              <Link
                href="/events"
                className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-cream-50/30 bg-cream-50/10 px-3.5 py-1.5 text-xs font-semibold text-cream-50 backdrop-blur transition-colors hover:bg-cream-50/20"
              >
                <ArrowRight className="size-3.5 rotate-180" /> All occasions
              </Link>
            </Reveal>
            <div className="max-w-3xl text-cream-50">
              <Reveal delay={0.05}>
                <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-gold-200">
                  <Icon name={category.icon} className="size-4" /> {category.tagline}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-3 text-balance font-serif text-4xl font-semibold leading-[1.05] drop-shadow-sm sm:text-5xl lg:text-6xl">
                  {category.name}
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-cream-100/90">
                  {category.description}
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-cream-50/20 bg-cream-50/10 px-4 py-2 text-sm font-medium backdrop-blur">
                    <Wallet className="size-4 text-gold-300" /> Typical budget{" "}
                    <span className="font-semibold text-cream-50">
                      {category.popularBudget}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-cream-50/20 bg-cream-50/10 px-4 py-2 text-sm font-medium backdrop-blur">
                    <Users className="size-4 text-gold-300" /> {category.avgGuests}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" variant="gold">
                    <Link href="/plan">
                      <Sparkles className="size-4" /> Plan my {category.name.toLowerCase()}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-cream-200/40 bg-cream-50/5 text-cream-50 hover:bg-cream-50/15 hover:text-cream-50"
                  >
                    <Link href="/vendors">
                      Browse vendors <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </Container>
        </GradientVisual>
      </section>

      {/* --------------------------------------- What we'll help arrange */}
      <Section className="bg-cream-100">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Everything in one place"
              title="What we'll help you arrange"
              description={`The vendors and services that make a ${category.name.toLowerCase().replace(/s$/, "")} come together — each verified, reviewed and ready to book.`}
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {category.vendorTypes.map((type) => (
              <RevealItem key={type}>
                <Link
                  href={`/vendors?category=${type}`}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-maroon-900 shadow-soft">
                    <Icon name={vendorTypeIcons[type]} className="size-6" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="inline-flex items-center gap-1 font-serif text-lg font-semibold text-ink">
                      {vendorCategoryLabels[type]}
                      <ArrowUpRight className="size-4 text-maroon-500 opacity-0 transition-opacity group-hover:opacity-100" />
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {vendorTypeBlurbs[type]}
                    </p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ---------------------------------------------- Recommended vendors */}
      {recommended.length > 0 && (
        <Section className="bg-cream-50">
          <Container>
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                <SectionHeading
                  align="left"
                  eyebrow="Hand-picked for you"
                  title={`Top-rated vendors for ${category.name.toLowerCase()}`}
                  description="Verified, background-checked and loved by Kerala families — booked through one calm dashboard."
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
              {recommended.map((vendor) => (
                <RevealItem key={vendor.slug}>
                  <VendorCard vendor={vendor} />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      )}

      {/* ----------------------------------------- Timeline & budget guide */}
      {guide && (
        <Section className="relative overflow-hidden bg-cream-100 bg-dots">
          <Container className="relative">
            <Reveal>
              <SectionHeading
                eyebrow="Plan with confidence"
                title="A typical timeline & budget"
                description={guide.intro}
              />
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              {/* Milestones */}
              <RevealGroup className="grid gap-5 sm:grid-cols-2">
                {guide.milestones.map((m, i) => (
                  <RevealItem
                    key={m.title}
                    className="relative flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-card p-6 shadow-card"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-maroon-50 px-3 py-1 text-xs font-semibold text-maroon-700">
                        <Calendar className="size-3.5" /> {m.window}
                      </span>
                      <span className="font-serif text-3xl font-semibold text-cream-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-ink">
                      {m.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {m.detail}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>

              {/* Custom + budget notes */}
              <Reveal delay={0.1} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 rounded-3xl border border-gold-300/60 bg-gradient-to-br from-gold-50 to-cream-50 p-7 shadow-card">
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-maroon-900 shadow-soft">
                    <Sparkles className="size-5" />
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-ink">
                    The custom that matters most
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {guide.customNote}
                  </p>
                </div>
                <div className="flex flex-col gap-4 rounded-3xl border border-border bg-gradient-to-br from-green-700 to-green-900 p-7 text-cream-50 shadow-card">
                  <span className="grid size-11 place-items-center rounded-xl bg-cream-50/15 text-gold-300">
                    <Wallet className="size-5" />
                  </span>
                  <h3 className="font-serif text-xl font-semibold">Where the budget goes</h3>
                  <p className="text-sm leading-relaxed text-cream-100/85">
                    {guide.budgetNote}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-sm font-medium text-gold-200">
                    <Check className="size-4" /> Typical range: {category.popularBudget}
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>
      )}

      {/* -------------------------------------------------- Testimonials */}
      <Section className="bg-cream-50">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Loved by families"
              title={`Real ${category.name.toLowerCase()}, beautifully planned`}
            />
          </Reveal>
          <KasavuDivider className="mx-auto mt-6" />
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {occasionTestimonials.map((t) => (
              <RevealItem
                key={t.name}
                className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card"
              >
                <Quote className="size-7 text-gold-400" />
                <p className="text-pretty leading-relaxed text-ink-soft">
                  &ldquo;{t.quote}&rdquo;
                </p>
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

      {/* ----------------------------------------- Explore other occasions */}
      <Section className="bg-cream-100">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="More to celebrate"
              title="Explore other occasions"
              description="One platform, every milestone — each with its own curated vendors and playbook."
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {otherCategories.map((c) => (
              <RevealItem key={c.slug}>
                <CategoryCard category={c} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ------------------------------------------------------ Final CTA */}
      <section className="relative overflow-hidden bg-maroon-900 py-20">
        <Mandala className="pointer-events-none absolute -left-20 -top-20 size-96 text-gold-500/10 animate-spin-slow" />
        <Mandala className="pointer-events-none absolute -right-24 -bottom-24 size-[26rem] text-gold-500/10" />
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <Sparkle className="size-8 text-gold-400" />
          <h2 className="max-w-3xl text-balance font-serif text-4xl font-semibold leading-tight text-cream-50 sm:text-5xl">
            Ready to plan your {category.name.toLowerCase().replace(/s$/, "")}?
          </h2>
          <p className="max-w-xl text-pretty text-lg text-cream-200/70">
            It's free to start. Build your plan, shortlist verified vendors and watch your
            budget come together in minutes — tuned to {category.name.toLowerCase()} in Kerala.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="gold">
              <Link href="/plan">
                <Sparkles className="size-4" /> Plan my {category.name.toLowerCase()}
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
