import type { Metadata } from "next";
import { ShieldCheck, Star, MapPin, Sparkles } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Mandala, Sparkle } from "@/components/decor/motifs";
import { VendorBrowser } from "@/components/vendors/vendor-browser";
import { getVendors } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Browse verified vendors · Eventplus",
  description:
    "Discover 1,200+ verified event vendors across Kerala — venues, caterers, photographers, decor, makeup and more. Filter by category, location and price to find your perfect match.",
};

const heroBadges = [
  { icon: ShieldCheck, label: "Every vendor verified", tone: "text-green-600" },
  { icon: Star, label: "Real customer reviews", tone: "text-gold-600" },
  { icon: MapPin, label: "Across all of Kerala", tone: "text-maroon-600" },
];

export default async function VendorsPage() {
  const vendors = await getVendors();
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-festive">
        <Mandala className="pointer-events-none absolute -right-28 -top-24 size-[26rem] text-gold-500/15 animate-spin-slow" />
        <Mandala className="pointer-events-none absolute -left-32 bottom-0 size-80 text-maroon-600/10" />
        <Container className="relative flex flex-col items-center gap-6 py-16 text-center lg:py-20">
          <Reveal>
            <Badge variant="gold" className="gap-1.5 px-3.5 py-1.5 text-sm">
              <Sparkles className="size-3.5" /> 1,200+ vendors across Kerala
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="relative max-w-3xl text-balance font-serif text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              Browse{" "}
              <span className="relative whitespace-nowrap text-maroon-700">
                verified
                <Sparkle className="absolute -right-6 -top-3 size-5 text-gold-500" />
              </span>{" "}
              vendors
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              From waterfront mandapams to Malabar sadhya, candid filmmakers to
              floral artists — explore over 1,200 background-checked vendors across
              Kerala. Filter, compare and book with total confidence.
            </p>
          </Reveal>
          <Reveal
            delay={0.15}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {heroBadges.map(({ icon: Icon, label, tone }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft"
              >
                <Icon className={`size-4 ${tone}`} /> {label}
              </span>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------ Browser */}
      <Section className="bg-cream-100">
        <Container>
          <VendorBrowser vendors={vendors} />
        </Container>
      </Section>
    </>
  );
}
