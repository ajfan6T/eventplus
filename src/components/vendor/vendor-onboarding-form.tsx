"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Store,
  MapPin,
  Wallet,
  Sparkles,
  ListChecks,
  Plus,
  Trash2,
  Loader2,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { vendorCategoryLabels, keralaLocations } from "@/lib/data/categories";
import { eventCategories } from "@/lib/data/categories";
import { createVendorListing } from "@/lib/actions/vendor";
import { cn } from "@/lib/utils";

const categoryEntries = Object.entries(vendorCategoryLabels);
const priceUnits = ["per day", "per plate", "per event", "per person", "package"];
const responseTimes = ["within an hour", "within a few hours", "within a day", "within 2 days"];

type PackageRow = { name: string; price: string; features: string };

const splitList = (s: string) =>
  s.split(",").map((x) => x.trim()).filter(Boolean);

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-card">
      <h2 className="mb-5 inline-flex items-center gap-2 font-serif text-lg font-semibold text-ink">
        <span className="grid size-8 place-items-center rounded-lg bg-cream-200 text-maroon-600">
          <Icon className="size-4" />
        </span>
        {title}
      </h2>
      {children}
    </div>
  );
}

export function VendorOnboardingForm() {
  const router = useRouter();
  const [form, setForm] = React.useState({
    name: "",
    category: "",
    tagline: "",
    about: "",
    city: "",
    startingPrice: "",
    priceUnit: "package",
    yearsActive: "",
    responseTime: "within a day",
    services: "",
    serviceAreas: "",
    highlights: "",
  });
  const [eventTypes, setEventTypes] = React.useState<string[]>([]);
  const [packages, setPackages] = React.useState<PackageRow[]>([
    { name: "", price: "", features: "" },
  ]);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  function toggleEvent(slug: string) {
    setEventTypes((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }
  function setPackage(i: number, key: keyof PackageRow, value: string) {
    setPackages((prev) => prev.map((p, idx) => (idx === i ? { ...p, [key]: value } : p)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    const res = await createVendorListing({
      name: form.name,
      category: form.category,
      tagline: form.tagline,
      about: form.about,
      city: form.city,
      startingPrice: Number(form.startingPrice),
      priceUnit: form.priceUnit,
      yearsActive: Number(form.yearsActive),
      responseTime: form.responseTime,
      services: splitList(form.services),
      serviceAreas: splitList(form.serviceAreas),
      highlights: splitList(form.highlights),
      eventTypes,
      packages: packages.map((p) => ({
        name: p.name,
        price: Number(p.price),
        features: splitList(p.features),
      })),
    });
    if (!res.ok) {
      setError(res.error ?? "Could not create your listing. Please try again.");
      setSubmitting(false);
      return;
    }
    router.push("/vendor");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Basics */}
      <Section icon={Store} title="The basics">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="v-name">Business name *</Label>
            <Input id="v-name" required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Marigold Decor Studio" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="v-category">Category *</Label>
            <Select value={form.category} onValueChange={(v) => set("category", v)} required>
              <SelectTrigger id="v-category">
                <SelectValue placeholder="What do you offer?" />
              </SelectTrigger>
              <SelectContent>
                {categoryEntries.map(([slug, label]) => (
                  <SelectItem key={slug} value={slug}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="v-tagline">Tagline *</Label>
            <Input id="v-tagline" required value={form.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="One line that sells you" />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="v-about">About your service *</Label>
            <Textarea id="v-about" required rows={4} value={form.about} onChange={(e) => set("about", e.target.value)} placeholder="Tell couples and families what makes you special…" />
          </div>
        </div>
      </Section>

      {/* Location & pricing */}
      <Section icon={Wallet} title="Location & pricing">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="v-city">City *</Label>
            <Select value={form.city} onValueChange={(v) => set("city", v)} required>
              <SelectTrigger id="v-city">
                <SelectValue placeholder="Where are you based?" />
              </SelectTrigger>
              <SelectContent>
                {keralaLocations.map((l) => (
                  <SelectItem key={l.slug} value={l.slug}>
                    {l.city}, {l.district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="v-response">Typical response time</Label>
            <Select value={form.responseTime} onValueChange={(v) => set("responseTime", v)}>
              <SelectTrigger id="v-response">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {responseTimes.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="v-price">Starting price (₹) *</Label>
            <Input id="v-price" type="number" min={1} inputMode="numeric" required value={form.startingPrice} onChange={(e) => set("startingPrice", e.target.value)} placeholder="e.g. 45000" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="v-unit">Priced</Label>
            <Select value={form.priceUnit} onValueChange={(v) => set("priceUnit", v)}>
              <SelectTrigger id="v-unit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priceUnits.map((u) => (
                  <SelectItem key={u} value={u}>
                    {u}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="v-years">Years in business</Label>
            <Input id="v-years" type="number" min={0} inputMode="numeric" value={form.yearsActive} onChange={(e) => set("yearsActive", e.target.value)} placeholder="e.g. 6" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="v-areas">Service areas</Label>
            <Input id="v-areas" value={form.serviceAreas} onChange={(e) => set("serviceAreas", e.target.value)} placeholder="Kochi, Aluva, Thrissur (comma separated)" />
          </div>
        </div>
      </Section>

      {/* What you offer */}
      <Section icon={ListChecks} title="What you offer">
        <div className="grid gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="v-services">Services</Label>
            <Input id="v-services" value={form.services} onChange={(e) => set("services", e.target.value)} placeholder="Floral mandapams, Stage decor, Lighting (comma separated)" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="v-highlights">Highlights</Label>
            <Input id="v-highlights" value={form.highlights} onChange={(e) => set("highlights", e.target.value)} placeholder="Fresh-flower specialists, Same-day teardown (comma separated)" />
          </div>
        </div>
      </Section>

      {/* Occasions */}
      <Section icon={Sparkles} title="Occasions you serve *">
        <div className="flex flex-wrap gap-2.5">
          {eventCategories.map((c) => {
            const active = eventTypes.includes(c.slug);
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => toggleEvent(c.slug)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-maroon-600 bg-maroon-600 text-cream-50 shadow-soft"
                    : "border-border bg-cream-50 text-ink-soft hover:border-gold-300 hover:bg-gold-50"
                )}
              >
                {active && <Check className="size-3.5" />}
                {c.name}
              </button>
            );
          })}
        </div>
      </Section>

      {/* Packages */}
      <Section icon={MapPin} title="Packages *">
        <div className="flex flex-col gap-4">
          {packages.map((p, i) => (
            <div key={i} className="rounded-xl border border-border/70 bg-cream-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">
                  Package {i + 1}
                  {i === 0 && <span className="ml-1 text-muted-foreground">(most popular)</span>}
                </span>
                {packages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setPackages((prev) => prev.filter((_, idx) => idx !== i))}
                    className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" /> Remove
                  </button>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-[1fr_140px]">
                <Input value={p.name} onChange={(e) => setPackage(i, "name", e.target.value)} placeholder="Package name (e.g. Signature Mandapam)" />
                <Input type="number" min={1} inputMode="numeric" value={p.price} onChange={(e) => setPackage(i, "price", e.target.value)} placeholder="Price ₹" />
              </div>
              <Input className="mt-3" value={p.features} onChange={(e) => setPackage(i, "features", e.target.value)} placeholder="What's included, comma separated" />
            </div>
          ))}
          {packages.length < 3 && (
            <Button
              type="button"
              variant="soft"
              className="w-fit"
              onClick={() => setPackages((prev) => [...prev, { name: "", price: "", features: "" }])}
            >
              <Plus className="size-4" /> Add another package
            </Button>
          )}
        </div>
      </Section>

      {error && (
        <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Your listing goes live in the marketplace immediately.
        </p>
        <Button type="submit" variant="gold" size="lg" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Creating your listing…
            </>
          ) : (
            <>
              Publish my listing <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
