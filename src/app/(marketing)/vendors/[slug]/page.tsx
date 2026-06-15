import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  BadgeCheck,
  MapPin,
  Clock,
  CalendarDays,
  Sparkles,
  Check,
  Star,
  Quote,
  ArrowRight,
  ArrowUpRight,
  Images,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { GradientVisual } from "@/components/visual/gradient-visual";
import { Mandala, KasavuDivider, Sparkle } from "@/components/decor/motifs";
import { VendorCard } from "@/components/vendors/vendor-card";
import { BookingPanel } from "@/components/vendors/booking-panel";
import { vendors, getVendor, getRelatedVendors } from "@/lib/data/vendors";
import { formatINR } from "@/lib/utils";

export async function generateStaticParams() {
  return vendors.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vendor = getVendor(slug);

  if (!vendor) {
    return {
      title: "Vendor not found",
      description: "We couldn't find this vendor on Eventplus.",
    };
  }

  return {
    title: `${vendor.name} — ${vendor.categoryLabel} in ${vendor.city}`,
    description: `${vendor.tagline}. ${vendor.categoryLabel} in ${vendor.city}, ${vendor.district} · ${vendor.rating.toFixed(1)}★ (${vendor.reviewCount} reviews) · from ${formatINR(vendor.startingPrice)} / ${vendor.priceUnit}. Request a quote on Eventplus.`,
    openGraph: {
      title: `${vendor.name} · Eventplus`,
      description: vendor.tagline,
      type: "profile",
    },
  };
}

export default async function VendorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vendor = getVendor(slug);

  if (!vendor) notFound();

  const related = getRelatedVendors(slug, 3);
  const galleryTiles = vendor.gallerySeeds.slice(0, 6);

  const stats = [
    { icon: Star, label: "Rating", value: `${vendor.rating.toFixed(1)} / 5` },
    { icon: Clock, label: "Responds", value: vendor.responseTime },
    {
      icon: CalendarDays,
      label: "Events booked",
      value: `${vendor.bookings.toLocaleString("en-IN")}+`,
    },
    { icon: Sparkles, label: "On Eventplus", value: `${vendor.yearsActive} yrs` },
  ];

  return (
    <>
      {/* ------------------------------------------------------- Breadcrumb */}
      <div className="border-b border-border/70 bg-cream-100">
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 py-4 text-sm text-muted-foreground"
          >
            <Link href="/" className="transition-colors hover:text-maroon-700">
              Home
            </Link>
            <ChevronRight className="size-3.5 shrink-0 text-cream-400" />
            <Link href="/vendors" className="transition-colors hover:text-maroon-700">
              Vendors
            </Link>
            <ChevronRight className="size-3.5 shrink-0 text-cream-400" />
            <span className="truncate font-medium text-ink">{vendor.name}</span>
          </nav>
        </Container>
      </div>

      {/* ------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-festive">
        <Mandala className="pointer-events-none absolute -right-24 -top-24 size-[26rem] text-gold-500/12 animate-spin-slow" />
        <Container className="relative py-10 sm:py-14">
          <Reveal>
            <GradientVisual
              gradient={vendor.gradient}
              className="aspect-[16/10] w-full rounded-3xl shadow-lift ring-1 ring-cream-50/30 sm:aspect-[21/9]"
            >
              <div className="flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-start gap-2">
                  <Badge variant="gold" className="gap-1.5 shadow-sm backdrop-blur">
                    {vendor.categoryLabel}
                  </Badge>
                  {vendor.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-cream-50/90 px-2.5 py-1 text-xs font-semibold text-green-700 shadow-sm backdrop-blur">
                      <BadgeCheck className="size-3.5" /> Verified vendor
                    </span>
                  )}
                </div>

                <div className="text-cream-50">
                  <h1 className="max-w-3xl text-balance font-serif text-3xl font-semibold leading-[1.05] drop-shadow-sm sm:text-4xl lg:text-5xl">
                    {vendor.name}
                  </h1>
                  <p className="mt-2 max-w-2xl text-pretty text-base text-cream-100/90 sm:text-lg">
                    {vendor.tagline}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-cream-100/90">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-50/15 px-3 py-1 backdrop-blur">
                      <Star className="size-3.5 fill-gold-300 text-gold-300" />
                      <span className="font-semibold text-cream-50">
                        {vendor.rating.toFixed(1)}
                      </span>
                      <span className="text-cream-100/80">({vendor.reviewCount} reviews)</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-4" /> {vendor.city}, {vendor.district}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-4" /> Responds {vendor.responseTime}
                    </span>
                  </div>
                </div>
              </div>
            </GradientVisual>
          </Reveal>

          {/* Stat strip */}
          <Reveal delay={0.08}>
            <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 bg-card px-4 py-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-maroon-50 text-maroon-600">
                    <stat.icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-serif text-base font-semibold text-ink">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------- Gallery */}
      <Section className="bg-cream-50 !py-12 sm:!py-14">
        <Container>
          <Reveal>
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold-700">
              <Images className="size-4" /> Gallery
            </div>
          </Reveal>
          <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {galleryTiles.map((seed, i) => (
              <RevealItem
                key={seed}
                className={i === 0 ? "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2" : ""}
              >
                <GradientVisual
                  seed={seed}
                  overlay={false}
                  className={`w-full overflow-hidden rounded-2xl ring-1 ring-cream-50/30 transition-transform duration-300 hover:-translate-y-0.5 ${
                    i === 0 ? "aspect-square sm:aspect-auto sm:h-full" : "aspect-square"
                  }`}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ------------------------------------------------------ Two-col body */}
      <Section className="bg-cream-100 !pt-0">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_minmax(20rem,22rem)] lg:gap-12">
            {/* ------------------------------------------------------ LEFT */}
            <div className="flex flex-col gap-12">
              {/* About */}
              <Reveal>
                <section>
                  <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
                    About {vendor.name}
                  </h2>
                  <KasavuDivider className="mt-4 !justify-start" />
                  <p className="mt-5 text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
                    {vendor.about}
                  </p>
                </section>
              </Reveal>

              {/* Highlights */}
              <Reveal>
                <section>
                  <h3 className="font-serif text-xl font-semibold text-ink">Why families choose them</h3>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {vendor.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-card"
                      >
                        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-green-100 text-green-700">
                          <Check className="size-3.5 stroke-[3]" />
                        </span>
                        <span className="text-ink-soft">{h}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              {/* Services */}
              <Reveal>
                <section>
                  <h3 className="font-serif text-xl font-semibold text-ink">Services offered</h3>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {vendor.services.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-cream-50 px-3.5 py-1.5 text-sm font-medium text-ink-soft"
                      >
                        <Sparkle className="size-3 text-gold-500" /> {s}
                      </span>
                    ))}
                  </div>
                </section>
              </Reveal>

              {/* Service areas */}
              <Reveal>
                <section>
                  <h3 className="font-serif text-xl font-semibold text-ink">Service areas</h3>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {vendor.serviceAreas.map((area) => (
                      <span
                        key={area}
                        className="inline-flex items-center gap-1.5 rounded-full bg-maroon-50 px-3.5 py-1.5 text-sm font-medium text-maroon-700"
                      >
                        <MapPin className="size-3.5" /> {area}
                      </span>
                    ))}
                  </div>
                </section>
              </Reveal>

              {/* Packages */}
              <Reveal>
                <section id="packages">
                  <h3 className="font-serif text-2xl font-semibold text-ink">Packages &amp; pricing</h3>
                  <p className="mt-2 text-muted-foreground">
                    Transparent pricing — request a custom quote for anything in between.
                  </p>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {vendor.packages.map((pkg) => (
                      <div
                        key={pkg.name}
                        className={`relative flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                          pkg.popular ? "border-gold-400 ring-1 ring-gold-300" : "border-border/70"
                        }`}
                      >
                        {pkg.popular && (
                          <Badge
                            variant="gold"
                            className="absolute -top-2.5 right-5 gap-1 shadow-sm"
                          >
                            <Sparkles className="size-3" /> Popular
                          </Badge>
                        )}
                        <div>
                          <h4 className="font-serif text-lg font-semibold text-ink">{pkg.name}</h4>
                          <p className="mt-1 font-serif text-2xl font-semibold text-maroon-700">
                            {formatINR(pkg.price)}
                            <span className="text-sm font-normal text-muted-foreground">
                              {" "}
                              / {pkg.unit ?? vendor.priceUnit}
                            </span>
                          </p>
                        </div>
                        <ul className="flex flex-col gap-2.5">
                          {pkg.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                              <Check className="mt-0.5 size-4 shrink-0 text-green-600 stroke-[2.5]" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <Button
                          asChild
                          variant={pkg.popular ? "gold" : "outline"}
                          className="mt-auto w-full"
                        >
                          <Link href="#booking">
                            Request this package <ArrowRight className="size-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>

              {/* Reviews */}
              <Reveal>
                <section>
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <h3 className="font-serif text-2xl font-semibold text-ink">
                      What customers say
                    </h3>
                    <Rating value={vendor.rating} count={vendor.reviewCount} size="md" />
                  </div>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {vendor.reviews.map((review) => (
                      <article
                        key={`${review.author}-${review.date}`}
                        className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-maroon-100 font-semibold text-maroon-700">
                              {review.author.charAt(0)}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-ink">{review.author}</p>
                              <p className="text-xs text-muted-foreground">
                                {review.event} · {review.location}
                              </p>
                            </div>
                          </div>
                          <Quote className="size-6 shrink-0 text-gold-300" />
                        </div>
                        <p className="text-pretty leading-relaxed text-ink-soft">
                          &ldquo;{review.body}&rdquo;
                        </p>
                        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4">
                          <Rating value={review.rating} />
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </Reveal>
            </div>

            {/* ----------------------------------------------------- RIGHT */}
            <div className="lg:relative">
              <div id="booking" className="scroll-mt-24 lg:sticky lg:top-24">
                <Reveal y={0}>
                  <BookingPanel vendor={vendor} />
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------- Similar vendors */}
      {related.length > 0 && (
        <Section className="bg-cream-50 bg-dots">
          <Container>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="You might also like"
                title="Similar vendors for your celebration"
                description="Hand-picked picks that pair beautifully for the same kinds of events."
                className="max-w-2xl"
              />
            </Reveal>
            <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((v) => (
                <RevealItem key={v.slug}>
                  <VendorCard vendor={v} />
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal>
              <div className="mt-10 flex justify-center">
                <Button asChild variant="outline">
                  <Link href="/vendors">
                    Browse all vendors <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </Container>
        </Section>
      )}
    </>
  );
}
