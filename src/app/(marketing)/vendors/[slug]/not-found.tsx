import Link from "next/link";
import { ArrowLeft, Search, Compass } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Mandala, Sparkle, KasavuDivider } from "@/components/decor/motifs";

export default function VendorNotFound() {
  return (
    <section className="relative overflow-hidden bg-festive">
      <Mandala className="pointer-events-none absolute -right-24 -top-20 size-[26rem] text-gold-500/12 animate-spin-slow" />
      <Mandala className="pointer-events-none absolute -left-28 bottom-0 size-80 text-maroon-600/10" />
      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center gap-6 py-20 text-center">
        <span className="grid size-20 place-items-center rounded-3xl bg-card text-maroon-600 shadow-lift ring-1 ring-border">
          <Compass className="size-9" />
        </span>

        <div className="flex flex-col items-center gap-3">
          <p className="font-serif text-6xl font-semibold text-cream-300 sm:text-7xl">404</p>
          <h1 className="max-w-xl text-balance font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            We couldn&rsquo;t find that{" "}
            <span className="relative whitespace-nowrap text-maroon-700">
              vendor
              <Sparkle className="absolute -right-5 -top-2 size-4 text-gold-500" />
            </span>
          </h1>
          <p className="max-w-md text-pretty text-base text-muted-foreground sm:text-lg">
            This vendor may have moved, been renamed or isn&rsquo;t on Eventplus yet. Don&rsquo;t
            worry — there are 1,200+ verified vendors waiting for your celebration.
          </p>
        </div>

        <KasavuDivider className="my-1" />

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" variant="primary">
            <Link href="/vendors">
              <Search className="size-4" /> Browse all vendors
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/">
              <ArrowLeft className="size-4" /> Back home
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
