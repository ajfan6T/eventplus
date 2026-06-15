import Link from "next/link";
import { ArrowUpRight, Users, Wallet } from "lucide-react";
import { GradientVisual } from "@/components/visual/gradient-visual";
import { Icon } from "@/components/icon";
import type { EventCategory } from "@/lib/types";

export function CategoryCard({ category }: { category: EventCategory }) {
  return (
    <Link
      href={`/events/${category.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <GradientVisual gradient={category.gradient} className="aspect-[5/4]">
        <div className="flex h-full flex-col justify-between p-5">
          <span className="grid size-12 place-items-center rounded-xl bg-cream-50/90 text-maroon-700 shadow-soft backdrop-blur">
            <Icon name={category.icon} className="size-6" />
          </span>
          <div className="text-cream-50">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold-200">
              {category.tagline}
            </p>
            <h3 className="mt-1 font-serif text-2xl font-semibold drop-shadow-sm">
              {category.name}
            </h3>
          </div>
        </div>
      </GradientVisual>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {category.description}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border/60 pt-4 text-xs text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <Wallet className="size-3.5 text-gold-600" /> {category.popularBudget}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-3.5 text-gold-600" /> {category.avgGuests}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 font-semibold text-maroon-600 transition-transform group-hover:translate-x-0.5">
            Plan <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
