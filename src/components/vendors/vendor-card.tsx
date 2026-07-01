import Link from "next/link";
import { BadgeCheck, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { GradientVisual } from "@/components/visual/gradient-visual";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { formatINR } from "@/lib/utils";
import type { Vendor } from "@/lib/types";

export function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <Link
      href={`/vendors/${vendor.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative">
        <GradientVisual
          gradient={vendor.gradient}
          image={vendor.coverImage}
          className="aspect-[4/3] w-full"
        >
          <div className="flex h-full flex-col justify-between p-4">
            <div className="flex items-start justify-between">
              <Badge variant="gold" className="shadow-sm backdrop-blur">
                {vendor.categoryLabel}
              </Badge>
              {vendor.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-cream-50/90 px-2.5 py-1 text-xs font-semibold text-green-700 shadow-sm backdrop-blur">
                  <BadgeCheck className="size-3.5" /> Verified
                </span>
              )}
            </div>
            <div className="text-cream-50">
              <h3 className="font-serif text-xl font-semibold leading-tight drop-shadow-sm">
                {vendor.name}
              </h3>
              <p className="mt-1 inline-flex items-center gap-1 text-sm text-cream-100/90">
                <MapPin className="size-3.5" /> {vendor.city}, {vendor.district}
              </p>
            </div>
          </div>
        </GradientVisual>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <Rating value={vendor.rating} count={vendor.reviewCount} />
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3.5" /> {vendor.responseTime}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{vendor.tagline}</p>
        <div className="flex flex-wrap gap-1.5">
          {vendor.services.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full bg-cream-200 px-2.5 py-1 text-xs font-medium text-ink-soft"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between border-t border-border/60 pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="font-serif text-lg font-semibold text-maroon-700">
              {formatINR(vendor.startingPrice)}
              <span className="text-xs font-normal text-muted-foreground"> / {vendor.priceUnit}</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-maroon-600 transition-transform group-hover:translate-x-0.5">
            View <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
