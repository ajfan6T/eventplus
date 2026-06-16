"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, MapPin, Tag, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Sparkle } from "@/components/decor/motifs";
import { VendorCard } from "@/components/vendors/vendor-card";
import { vendorCategoryLabels, keralaLocations } from "@/lib/data/categories";
import type { Vendor, VendorCategorySlug } from "@/lib/types";
import { cn } from "@/lib/utils";

type SortKey = "rating" | "price-asc" | "price-desc" | "booked";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "rating", label: "Top rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "booked", label: "Most booked" },
];

const categoryEntries = Object.entries(vendorCategoryLabels) as [
  VendorCategorySlug,
  string,
][];

const ALL = "all";

function matchesQuery(vendor: Vendor, q: string) {
  if (!q) return true;
  const haystack = [
    vendor.name,
    vendor.tagline,
    vendor.city,
    vendor.district,
    vendor.categoryLabel,
    ...vendor.services,
    ...vendor.serviceAreas,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q.toLowerCase());
}

export function VendorBrowser({ vendors }: { vendors: Vendor[] }) {
  const source = vendors;

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<VendorCategorySlug | typeof ALL>(ALL);
  const [location, setLocation] = useState<string>(ALL);
  const [sort, setSort] = useState<SortKey>("rating");

  // Honour ?category= and ?q= deep links (e.g. from event-category pages).
  // Read on mount only, so server and first client render match (no hydration mismatch).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("category");
    const q = params.get("q");
    if (c && categoryEntries.some(([slug]) => slug === c)) {
      setCategory(c as VendorCategorySlug);
    }
    if (q) setQuery(q);
  }, []);

  const results = useMemo(() => {
    const filtered = source.filter((v) => {
      if (!matchesQuery(v, query)) return false;
      if (category !== ALL && v.category !== category) return false;
      if (location !== ALL && v.city !== location) return false;
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case "booked":
        sorted.sort((a, b) => b.bookings - a.bookings);
        break;
      default:
        sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    }
    return sorted;
  }, [source, query, category, location, sort]);

  const hasActiveFilters =
    query.trim() !== "" || category !== ALL || location !== ALL || sort !== "rating";

  const filterCount =
    (query.trim() !== "" ? 1 : 0) +
    (category !== ALL ? 1 : 0) +
    (location !== ALL ? 1 : 0);

  function resetFilters() {
    setQuery("");
    setCategory(ALL);
    setLocation(ALL);
    setSort("rating");
  }

  const locationLabel =
    location === ALL
      ? "All Kerala"
      : keralaLocations.find((l) => l.city === location)?.city ?? location;

  /* ---- Filter panel (shared between sidebar & sheet) ---- */
  const FilterPanel = (
    <div className="flex flex-col gap-7">
      {/* Search */}
      <div className="flex flex-col gap-2.5">
        <label
          htmlFor="vendor-search"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700"
        >
          <Search className="size-3.5" /> Search
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="vendor-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Caterers, photographers, Kochi…"
            className="pl-10"
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="flex flex-col gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
          <Tag className="size-3.5" /> Category
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory(ALL)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              category === ALL
                ? "border-maroon-600 bg-maroon-600 text-cream-50 shadow-soft"
                : "border-border bg-cream-50 text-ink-soft hover:border-gold-300 hover:bg-gold-50",
            )}
          >
            All vendors
          </button>
          {categoryEntries.map(([slug, label]) => {
            const active = category === slug;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => setCategory(slug)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "border-maroon-600 bg-maroon-600 text-cream-50 shadow-soft"
                    : "border-border bg-cream-50 text-ink-soft hover:border-gold-300 hover:bg-gold-50",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-2.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
          <MapPin className="size-3.5" /> Location
        </span>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger aria-label="Filter by location">
            <SelectValue placeholder="All Kerala" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Kerala</SelectItem>
            {keralaLocations.map((loc) => (
              <SelectItem key={loc.slug} value={loc.city}>
                {loc.city}
                <span className="text-muted-foreground"> · {loc.district}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort */}
      <div className="flex flex-col gap-2.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
          <ArrowUpDown className="size-3.5" /> Sort by
        </span>
        <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
          <SelectTrigger aria-label="Sort vendors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          onClick={resetFilters}
          className="w-fit text-maroon-600 hover:text-maroon-700"
        >
          <X className="size-4" /> Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[280px_1fr]">
      {/* ---- Desktop sticky sidebar ---- */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-border/70 bg-card p-6 shadow-card">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="inline-flex items-center gap-2 font-serif text-lg font-semibold text-ink">
              <SlidersHorizontal className="size-5 text-gold-600" /> Filters
            </h2>
            {filterCount > 0 && (
              <Badge variant="gold">{filterCount} active</Badge>
            )}
          </div>
          {FilterPanel}
        </div>
      </aside>

      {/* ---- Results column ---- */}
      <div className="min-w-0">
        {/* Result toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-ink">{results.length}</span> of{" "}
            <span className="font-semibold text-ink">{source.length}</span> vendors
            {location !== ALL && (
              <>
                {" "}
                in <span className="font-semibold text-maroon-700">{locationLabel}</span>
              </>
            )}
          </p>

          {/* Mobile filter trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <SlidersHorizontal className="size-4" /> Filters
                {filterCount > 0 && (
                  <span className="ml-1 grid size-5 place-items-center rounded-full bg-maroon-600 text-[11px] font-semibold text-cream-50">
                    {filterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[88%] overflow-y-auto sm:max-w-md">
              <SheetHeader className="pb-2">
                <SheetTitle className="inline-flex items-center gap-2 font-serif">
                  <SlidersHorizontal className="size-5 text-gold-600" /> Filter vendors
                </SheetTitle>
                <SheetDescription>
                  Narrow {source.length} verified vendors to your perfect match.
                </SheetDescription>
              </SheetHeader>
              <div className="px-6 pb-8">
                {FilterPanel}
                <SheetClose asChild>
                  <Button variant="primary" className="mt-8 w-full">
                    Show {results.length}{" "}
                    {results.length === 1 ? "vendor" : "vendors"}
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active filter pills */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {query.trim() !== "" && (
              <FilterPill onClear={() => setQuery("")}>
                <Search className="size-3.5" /> “{query.trim()}”
              </FilterPill>
            )}
            {category !== ALL && (
              <FilterPill onClear={() => setCategory(ALL)}>
                <Tag className="size-3.5" /> {vendorCategoryLabels[category]}
              </FilterPill>
            )}
            {location !== ALL && (
              <FilterPill onClear={() => setLocation(ALL)}>
                <MapPin className="size-3.5" /> {locationLabel}
              </FilterPill>
            )}
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-maroon-700 hover:underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results grid OR empty state */}
        {results.length > 0 ? (
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((vendor) => (
              <RevealItem key={vendor.slug}>
                <VendorCard vendor={vendor} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <Reveal className="flex flex-col items-center gap-5 rounded-3xl border border-dashed border-maroon-300 bg-maroon-50/40 px-6 py-20 text-center">
            <span className="relative grid size-16 place-items-center rounded-2xl bg-cream-50 text-maroon-600 shadow-soft">
              <Search className="size-7" />
              <Sparkle className="absolute -right-2 -top-2 size-5 text-gold-500" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-serif text-2xl font-semibold text-ink">
                No vendors match just yet
              </h3>
              <p className="mx-auto max-w-md text-pretty text-muted-foreground">
                Try a different category, widen your location to all of Kerala, or
                soften your search. Your dream vendor may be one tweak away.
              </p>
            </div>
            <Button variant="primary" onClick={resetFilters}>
              <X className="size-4" /> Reset all filters
            </Button>
          </Reveal>
        )}
      </div>
    </div>
  );
}

function FilterPill({
  children,
  onClear,
}: {
  children: React.ReactNode;
  onClear: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-300 bg-gold-50 py-1 pl-3 pr-1.5 text-sm font-medium text-gold-800">
      {children}
      <button
        type="button"
        onClick={onClear}
        aria-label="Remove filter"
        className="grid size-5 place-items-center rounded-full text-gold-700 transition-colors hover:bg-gold-200 hover:text-maroon-700"
      >
        <X className="size-3.5" />
      </button>
    </span>
  );
}
