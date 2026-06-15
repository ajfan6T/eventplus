"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Check,
  CalendarDays,
  MapPin,
  Users,
  Wallet,
  Palette,
  LayoutDashboard,
  Store,
  PartyPopper,
  ListChecks,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Icon } from "@/components/icon";
import { Mandala, Sparkle, KasavuDivider } from "@/components/decor/motifs";
import { GradientVisual } from "@/components/visual/gradient-visual";
import {
  plannerEventTypes,
  guestRanges,
  budgetRanges,
  planStyles,
} from "@/lib/data/planner";
import {
  keralaLocations,
  getEventCategory,
  vendorCategoryLabels,
} from "@/lib/data/categories";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Step metadata                                                     */
/* ------------------------------------------------------------------ */

const STEPS = [
  { id: "occasion", title: "What are we celebrating?", eyebrow: "The occasion" },
  { id: "when", title: "When & where?", eyebrow: "Date & location" },
  { id: "scale", title: "How big & what's the budget?", eyebrow: "Guests & budget" },
  { id: "style", title: "Set the mood", eyebrow: "Style & details" },
] as const;

const TOTAL = STEPS.length;

/* ------------------------------------------------------------------ */
/*  Derived plan content                                              */
/* ------------------------------------------------------------------ */

/** Occasion-appropriate checklist templates keyed by planner event value. */
const checklistTemplates: Record<string, string[]> = {
  weddings: [
    "Lock the muhurtham & confirm both families",
    "Book the venue or mandapam",
    "Finalise caterer & sadhya menu",
    "Reserve photographer & videographer",
    "Confirm decor theme & florals",
    "Book bridal makeup, mehendi & nadaswaram",
  ],
  housewarmings: [
    "Fix the gruhapravesam muhurtham with the priest",
    "Arrange paal kaachal & puja essentials",
    "Book the sadhya caterer",
    "Plan welcome decor & nilavilakku setup",
    "Confirm photographer for the blessings",
    "Send invitations to family & neighbours",
  ],
  birthdays: [
    "Pick a theme & colour palette",
    "Book the venue or party space",
    "Order the cake & dessert table",
    "Arrange themed decor & balloons",
    "Line up entertainment & games",
    "Book a photographer for candids",
  ],
  "baby-showers": [
    "Choose the seemantham date with elders",
    "Plan gentle, glowing decor",
    "Book intimate catering & sweets",
    "Arrange the mum-to-be's outfit & makeup",
    "Book keepsake photography",
    "Prepare return gifts for guests",
  ],
  inaugurations: [
    "Confirm the auspicious opening muhurtham",
    "Arrange ribbon, lamp & ceremonial setup",
    "Book nadaswaram or live performers",
    "Plan entrance decor & footfall buzz",
    "Order refreshments & sweets for guests",
    "Send invitations to clients & community",
  ],
};

/** Rough mid-point (in rupees) for each budget range, used to split the plan. */
const budgetMidpoints: Record<string, number> = {
  "Under ₹1 lakh": 80000,
  "₹1–3 lakh": 200000,
  "₹3–8 lakh": 550000,
  "₹8–20 lakh": 1400000,
  "₹20–40 lakh": 3000000,
  "₹40 lakh+": 5000000,
};

/** Category split weights (must sum to 1) per occasion. */
const budgetSplits: Record<
  string,
  { label: string; icon: string; weight: number }[]
> = {
  weddings: [
    { label: "Venue & Mandapam", icon: "Building2", weight: 0.24 },
    { label: "Catering & Sadhya", icon: "UtensilsCrossed", weight: 0.32 },
    { label: "Photography & Film", icon: "Camera", weight: 0.13 },
    { label: "Decor & Florals", icon: "Flower2", weight: 0.16 },
    { label: "Makeup & Music", icon: "Sparkles", weight: 0.09 },
    { label: "Buffer", icon: "PiggyBank", weight: 0.06 },
  ],
  housewarmings: [
    { label: "Catering & Sadhya", icon: "UtensilsCrossed", weight: 0.4 },
    { label: "Decor & Florals", icon: "Flower2", weight: 0.22 },
    { label: "Photography", icon: "Camera", weight: 0.16 },
    { label: "Music & Puja", icon: "Music", weight: 0.14 },
    { label: "Buffer", icon: "PiggyBank", weight: 0.08 },
  ],
  birthdays: [
    { label: "Venue", icon: "Building2", weight: 0.22 },
    { label: "Decor & Theme", icon: "Flower2", weight: 0.26 },
    { label: "Catering & Cake", icon: "UtensilsCrossed", weight: 0.28 },
    { label: "Photography", icon: "Camera", weight: 0.14 },
    { label: "Buffer", icon: "PiggyBank", weight: 0.1 },
  ],
  "baby-showers": [
    { label: "Decor & Florals", icon: "Flower2", weight: 0.3 },
    { label: "Catering & Sweets", icon: "UtensilsCrossed", weight: 0.3 },
    { label: "Photography", icon: "Camera", weight: 0.2 },
    { label: "Makeup & Outfit", icon: "Sparkles", weight: 0.12 },
    { label: "Buffer", icon: "PiggyBank", weight: 0.08 },
  ],
  inaugurations: [
    { label: "Ceremonial Setup", icon: "Sparkles", weight: 0.22 },
    { label: "Decor & Florals", icon: "Flower2", weight: 0.26 },
    { label: "Catering & Refreshments", icon: "UtensilsCrossed", weight: 0.24 },
    { label: "Music & Performers", icon: "Music", weight: 0.18 },
    { label: "Buffer", icon: "PiggyBank", weight: 0.1 },
  ],
};

function budgetSplitLabel(amount: number) {
  if (amount >= 100000)
    return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)}L`;
  if (amount >= 1000)
    return `₹${Math.round(amount / 1000)}K`;
  return `₹${amount}`;
}

/* ------------------------------------------------------------------ */
/*  Plan state                                                        */
/* ------------------------------------------------------------------ */

type PlanState = {
  occasion: string;
  date: string;
  location: string;
  guests: string;
  budget: string;
  styles: string[];
  eventName: string;
};

const initialState: PlanState = {
  occasion: "",
  date: "",
  location: "",
  guests: "",
  budget: "",
  styles: [],
  eventName: "",
};

const stepEase = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Wizard                                                            */
/* ------------------------------------------------------------------ */

export function PlanWizard() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [plan, setPlan] = useState<PlanState>(initialState);
  const [status, setStatus] = useState<"intake" | "crafting" | "result">("intake");

  const selectedEventType = plannerEventTypes.find((e) => e.value === plan.occasion);

  const isStepValid = (s: number) => {
    switch (s) {
      case 0:
        return Boolean(plan.occasion);
      case 1:
        return Boolean(plan.date) && Boolean(plan.location);
      case 2:
        return Boolean(plan.guests) && Boolean(plan.budget);
      case 3:
        return plan.styles.length > 0;
      default:
        return false;
    }
  };

  const goNext = () => {
    if (step < TOTAL - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (status === "result") {
      setStatus("intake");
      return;
    }
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const generate = () => {
    setStatus("crafting");
    setTimeout(() => setStatus("result"), 1800);
  };

  const progress =
    status === "result"
      ? 100
      : Math.round(((step + (isStepValid(step) ? 1 : 0)) / TOTAL) * 100);

  const toggleStyle = (s: string) =>
    setPlan((p) => ({
      ...p,
      styles: p.styles.includes(s)
        ? p.styles.filter((x) => x !== s)
        : [...p.styles, s],
    }));

  /* --- Result screen --- */
  if (status === "result") {
    return (
      <ResultScreen plan={plan} onBack={goBack} />
    );
  }

  /* --- Crafting screen --- */
  if (status === "crafting") {
    return <CraftingScreen eventLabel={selectedEventType?.label ?? "celebration"} />;
  }

  /* --- Intake wizard --- */
  return (
    <div className="flex flex-1 flex-col">
      {/* Progress header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Badge variant="gold" className="gap-1.5 px-3 py-1">
            <Sparkles className="size-3.5" /> AI co-planner
          </Badge>
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Step {step + 1} of {TOTAL} · {STEPS[step].eyebrow}
          </span>
        </div>
        <Progress value={progress} />
      </div>

      {/* Step heading */}
      <div className="mt-8 flex flex-col gap-2">
        <h1 className="text-balance font-serif text-2xl font-semibold leading-tight text-ink sm:text-3xl">
          {STEPS[step].title}
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          {step === 0 &&
            "Pick the celebration you're planning — we'll tailor everything to its rituals."}
          {step === 1 &&
            "We use this to build a deadline-aware timeline and find vendors near you."}
          {step === 2 &&
            "A rough idea is perfect — you can fine-tune every rupee later."}
          {step === 3 &&
            "Choose the vibes that fit. Mix and match as many as you like."}
        </p>
      </div>

      {/* Animated step body */}
      <div className="relative mt-8 flex-1">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -28 }}
            transition={{ duration: 0.32, ease: stepEase }}
          >
            {step === 0 && <OccasionStep plan={plan} setPlan={setPlan} />}
            {step === 1 && <WhenWhereStep plan={plan} setPlan={setPlan} />}
            {step === 2 && <ScaleStep plan={plan} setPlan={setPlan} />}
            {step === 3 && (
              <StyleStep plan={plan} setPlan={setPlan} toggleStyle={toggleStyle} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer nav */}
      <div className="mt-10 flex items-center justify-between border-t border-border/60 pt-6">
        <Button
          variant="ghost"
          onClick={goBack}
          disabled={step === 0}
          className="text-muted-foreground"
        >
          <ArrowLeft className="size-4" /> Back
        </Button>

        {step < TOTAL - 1 ? (
          <Button variant="primary" onClick={goNext} disabled={!isStepValid(step)}>
            Continue <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button variant="gold" size="lg" onClick={generate} disabled={!isStepValid(step)}>
            <Sparkles className="size-4" /> Generate my plan
          </Button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 1 — Occasion                                                 */
/* ------------------------------------------------------------------ */

function OccasionStep({
  plan,
  setPlan,
}: {
  plan: PlanState;
  setPlan: React.Dispatch<React.SetStateAction<PlanState>>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {plannerEventTypes.map((type) => {
        const active = plan.occasion === type.value;
        return (
          <button
            key={type.value}
            type="button"
            onClick={() => setPlan((p) => ({ ...p, occasion: type.value }))}
            aria-pressed={active}
            className={cn(
              "group relative flex items-start gap-4 rounded-2xl border bg-card p-5 text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift",
              active
                ? "border-maroon-600 ring-2 ring-gold-400 ring-offset-2 ring-offset-cream-50"
                : "border-border/70 hover:border-maroon-300"
            )}
          >
            <span
              className={cn(
                "grid size-12 shrink-0 place-items-center rounded-xl transition-colors",
                active
                  ? "bg-gradient-to-br from-gold-300 to-gold-500 text-maroon-900 shadow-soft"
                  : "bg-cream-200 text-maroon-700 group-hover:bg-maroon-50"
              )}
            >
              <Icon name={type.icon} className="size-6" />
            </span>
            <div className="flex-1">
              <p className="font-serif text-lg font-semibold text-ink">{type.label}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{type.blurb}</p>
            </div>
            <span
              className={cn(
                "absolute right-4 top-4 grid size-5 place-items-center rounded-full border-2 transition-all",
                active
                  ? "border-maroon-600 bg-maroon-600 text-cream-50"
                  : "border-cream-400 opacity-0 group-hover:opacity-100"
              )}
            >
              {active && <Check className="size-3 stroke-[3]" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 2 — When & where                                             */
/* ------------------------------------------------------------------ */

function WhenWhereStep({
  plan,
  setPlan,
}: {
  plan: PlanState;
  setPlan: React.Dispatch<React.SetStateAction<PlanState>>;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-2.5">
        <Label htmlFor="event-date" className="flex items-center gap-2 text-ink">
          <CalendarDays className="size-4 text-gold-600" /> Event date
        </Label>
        <Input
          id="event-date"
          type="date"
          value={plan.date}
          onChange={(e) => setPlan((p) => ({ ...p, date: e.target.value }))}
          className="h-12"
        />
        <p className="text-xs text-muted-foreground">
          Not fixed yet? Pick an approximate date — you can change it anytime.
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <Label className="flex items-center gap-2 text-ink">
          <MapPin className="size-4 text-gold-600" /> Location
        </Label>
        <Select
          value={plan.location}
          onValueChange={(v) => setPlan((p) => ({ ...p, location: v }))}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Choose a city in Kerala" />
          </SelectTrigger>
          <SelectContent>
            {keralaLocations.map((loc) => (
              <SelectItem key={loc.slug} value={loc.slug}>
                {loc.city}, {loc.district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          We&apos;ll surface verified vendors who serve this district.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 3 — Guests & budget                                          */
/* ------------------------------------------------------------------ */

function ChipGroup({
  options,
  value,
  onSelect,
}: {
  options: string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            aria-pressed={active}
            className={cn(
              "rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98]",
              active
                ? "border-maroon-600 bg-maroon-600 text-cream-50 shadow-soft"
                : "border-border bg-card text-ink-soft hover:border-maroon-300 hover:bg-maroon-50"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function ScaleStep({
  plan,
  setPlan,
}: {
  plan: PlanState;
  setPlan: React.Dispatch<React.SetStateAction<PlanState>>;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Label className="flex items-center gap-2 text-ink">
          <Users className="size-4 text-gold-600" /> Expected guests
        </Label>
        <ChipGroup
          options={guestRanges}
          value={plan.guests}
          onSelect={(v) => setPlan((p) => ({ ...p, guests: v }))}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label className="flex items-center gap-2 text-ink">
          <Wallet className="size-4 text-gold-600" /> Overall budget
        </Label>
        <ChipGroup
          options={budgetRanges}
          value={plan.budget}
          onSelect={(v) => setPlan((p) => ({ ...p, budget: v }))}
        />
        <p className="text-xs text-muted-foreground">
          We&apos;ll split this across categories and flag overspend as you book.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 4 — Style & details                                          */
/* ------------------------------------------------------------------ */

function StyleStep({
  plan,
  setPlan,
  toggleStyle,
}: {
  plan: PlanState;
  setPlan: React.Dispatch<React.SetStateAction<PlanState>>;
  toggleStyle: (s: string) => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Label className="flex items-center gap-2 text-ink">
          <Palette className="size-4 text-gold-600" /> Style &amp; mood
          <span className="text-xs font-normal text-muted-foreground">
            (select all that apply)
          </span>
        </Label>
        <div className="flex flex-wrap gap-2.5">
          {planStyles.map((s) => {
            const active = plan.styles.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleStyle(s)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98]",
                  active
                    ? "border-gold-500 bg-gold-100 text-gold-800 shadow-soft"
                    : "border-border bg-card text-ink-soft hover:border-gold-300 hover:bg-gold-50"
                )}
              >
                {active && <Check className="size-3.5 stroke-[3]" />}
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <Label htmlFor="event-name" className="text-ink">
          Event name or couple names{" "}
          <span className="text-xs font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="event-name"
          placeholder="e.g. Anjali & Vishnu, or Aarav's First Birthday"
          value={plan.eventName}
          onChange={(e) => setPlan((p) => ({ ...p, eventName: e.target.value }))}
          className="h-12"
        />
        <p className="text-xs text-muted-foreground">
          We&apos;ll use this to personalise your dashboard and invitations.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Crafting (loading) screen                                         */
/* ------------------------------------------------------------------ */

function CraftingScreen({ eventLabel }: { eventLabel: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-7 py-20 text-center">
      <div className="relative grid place-items-center">
        <Mandala className="size-40 animate-spin-slow text-gold-500/40" />
        <Mandala className="absolute size-28 text-maroon-600/30 [animation:spin_18s_linear_infinite_reverse]" />
        <span className="absolute grid size-16 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 text-maroon-900 shadow-glow">
          <Sparkles className="size-7" />
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
          Crafting your plan&hellip;
        </h1>
        <p className="max-w-md text-sm text-muted-foreground sm:text-base">
          Building a deadline-aware checklist, splitting your budget and matching verified{" "}
          {eventLabel.toLowerCase()} vendors across Kerala.
        </p>
      </div>
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-2.5 rounded-full bg-gold-500"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Result screen                                                     */
/* ------------------------------------------------------------------ */

function ResultScreen({
  plan,
  onBack,
}: {
  plan: PlanState;
  onBack: () => void;
}) {
  const eventType = plannerEventTypes.find((e) => e.value === plan.occasion);
  const category = getEventCategory(plan.occasion);
  const location = keralaLocations.find((l) => l.slug === plan.location);

  const tasks = useMemo(
    () => checklistTemplates[plan.occasion] ?? checklistTemplates.weddings,
    [plan.occasion]
  );

  const splits = budgetSplits[plan.occasion] ?? budgetSplits.weddings;
  const total = budgetMidpoints[plan.budget] ?? 0;

  const dateLabel = plan.date
    ? new Date(plan.date + "T00:00:00").toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date to confirm";

  const heading =
    plan.eventName.trim() ||
    `${eventType?.label ?? "Your"} celebration`;

  const summaryItems = [
    { icon: PartyPopper, label: "Occasion", value: eventType?.label ?? "—" },
    { icon: CalendarDays, label: "Date", value: dateLabel },
    {
      icon: MapPin,
      label: "Location",
      value: location ? `${location.city}, ${location.district}` : "—",
    },
    { icon: Users, label: "Guests", value: plan.guests || "—" },
    { icon: Wallet, label: "Budget", value: plan.budget || "—" },
  ];

  const recommendedTypes = (category?.vendorTypes ?? []).slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: stepEase }}
      className="flex flex-1 flex-col gap-8"
    >
      {/* Celebratory hero summary card */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
        <GradientVisual
          gradient={category?.gradient}
          seed={3}
          className="relative px-6 py-8 sm:px-9 sm:py-10"
        >
          <Sparkle className="absolute right-8 top-8 size-6 text-gold-200/80" />
          <div className="relative flex flex-col gap-3 text-cream-50">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-cream-50/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold-200 backdrop-blur">
              <Sparkles className="size-3.5" /> Your plan is ready
            </span>
            <h1 className="text-balance font-serif text-3xl font-semibold leading-tight drop-shadow-sm sm:text-4xl">
              {heading}
            </h1>
            <p className="max-w-lg text-pretty text-sm text-cream-100/90 sm:text-base">
              We&apos;ve built a tailored checklist and budget for your{" "}
              {eventType?.label.toLowerCase() ?? "event"}
              {location ? ` in ${location.city}` : ""}. Make it yours from your dashboard.
            </p>
            {plan.styles.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1.5">
                {plan.styles.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-cream-50/15 px-3 py-1 text-xs font-medium text-cream-50 backdrop-blur"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </GradientVisual>

        {/* Summary grid */}
        <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-5">
          {summaryItems.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 bg-card px-4 py-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <item.icon className="size-3.5 text-gold-600" /> {item.label}
              </span>
              <span className="font-serif text-sm font-semibold text-ink">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist + budget preview */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Checklist */}
        <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="inline-flex items-center gap-2 font-serif text-lg font-semibold text-ink">
              <span className="grid size-9 place-items-center rounded-xl bg-maroon-50 text-maroon-700">
                <ListChecks className="size-5" />
              </span>
              Your starter checklist
            </h2>
            <Badge variant="gold" className="gap-1 px-2 py-0.5 text-[10px]">
              <Sparkles className="size-2.5" /> AI
            </Badge>
          </div>
          <ul className="flex flex-col gap-2">
            {tasks.map((task, i) => (
              <li
                key={task}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-cream-50 px-3.5 py-2.5"
              >
                <span className="grid size-5 shrink-0 place-items-center rounded-md border-2 border-cream-400 text-[10px] font-semibold text-muted-foreground">
                  {i + 1}
                </span>
                <span className="text-sm text-ink">{task}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground">
            Plus deadline reminders and {Math.max(8, tasks.length + 6)}+ more tasks tuned to
            your timeline, in your dashboard.
          </p>
        </div>

        {/* Budget */}
        <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="inline-flex items-center gap-2 font-serif text-lg font-semibold text-ink">
              <span className="grid size-9 place-items-center rounded-xl bg-green-100 text-green-700">
                <Wallet className="size-5" />
              </span>
              Suggested budget split
            </h2>
            {total > 0 && (
              <span className="font-serif text-sm font-semibold text-maroon-700">
                {budgetSplitLabel(total)} total
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3.5">
            {splits.map((line) => {
              const amount = Math.round(total * line.weight);
              const pct = Math.round(line.weight * 100);
              return (
                <div key={line.label}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 text-ink-soft">
                      <Icon name={line.icon} className="size-3.5 text-gold-600" />
                      {line.label}
                    </span>
                    <span className="font-medium text-muted-foreground">
                      {total > 0 ? budgetSplitLabel(amount) : `${pct}%`}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-cream-300">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            Live tracking flags overspend on any category before it happens.
          </p>
        </div>
      </div>

      {/* Recommended vendor categories */}
      {recommendedTypes.length > 0 && (
        <div className="flex flex-col gap-3">
          <KasavuDivider className="mx-auto" />
          <p className="text-center text-sm text-muted-foreground">
            We&apos;ve lined up verified vendors for your{" "}
            {eventType?.label.toLowerCase()} across these categories
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {recommendedTypes.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-ink-soft shadow-sm"
              >
                {vendorCategoryLabels[t]}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground sm:order-first">
          <ArrowLeft className="size-4" /> Tweak my answers
        </Button>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="outline" size="lg">
            <Link href="/vendors">
              <Store className="size-4" /> Browse recommended vendors
            </Link>
          </Button>
          <Button asChild variant="gold" size="lg">
            <Link href="/dashboard">
              <LayoutDashboard className="size-4" /> Go to my dashboard
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
