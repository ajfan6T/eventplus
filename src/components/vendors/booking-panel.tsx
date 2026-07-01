"use client";

import * as React from "react";
import {
  CalendarDays,
  Users,
  ShieldCheck,
  Clock,
  Sparkles,
  Phone,
  CheckCircle2,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { formatINR } from "@/lib/utils";
import { site } from "@/lib/data/site";
import { createBookingRequest } from "@/lib/actions/bookings";
import type { Vendor } from "@/lib/types";

export function BookingPanel({ vendor }: { vendor: Vendor }) {
  const [packageName, setPackageName] = React.useState(
    vendor.packages.find((p) => p.popular)?.name ?? vendor.packages[0]?.name ?? ""
  );
  const [date, setDate] = React.useState("");
  const [guests, setGuests] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({ name: "", phone: "", message: "" });

  const selectedPackage =
    vendor.packages.find((p) => p.name === packageName) ?? vendor.packages[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    const res = await createBookingRequest({
      vendorSlug: vendor.slug,
      name: form.name,
      phone: form.phone,
      message: form.message,
      packageName: selectedPackage?.name,
      date,
      guests,
    });
    setSubmitting(false);
    if (!res.ok) {
      setError(res.error ?? "Something went wrong. Please try again.");
      return;
    }
    setSent(true);
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      // reset after the close animation so the success state doesn't flash
      window.setTimeout(() => {
        setSent(false);
        setError(null);
        setForm({ name: "", phone: "", message: "" });
      }, 200);
    }
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground">Starting from</p>
          <p className="font-serif text-3xl font-semibold text-maroon-700">
            {formatINR(vendor.startingPrice)}
            <span className="text-sm font-normal text-muted-foreground">
              {" "}
              / {vendor.priceUnit}
            </span>
          </p>
        </div>
        {vendor.verified && (
          <Badge variant="green" className="gap-1">
            <ShieldCheck className="size-3.5" /> Verified
          </Badge>
        )}
      </div>

      <div className="my-5 h-px bg-border/70" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="bp-package">Choose a package</Label>
          <Select value={packageName} onValueChange={setPackageName}>
            <SelectTrigger id="bp-package" aria-label="Choose a package">
              <SelectValue placeholder="Select a package" />
            </SelectTrigger>
            <SelectContent>
              {vendor.packages.map((p) => (
                <SelectItem key={p.name} value={p.name}>
                  {p.name} — {formatINR(p.price, { compact: true })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="bp-date">Event date</Label>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="bp-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="bp-guests">Guests</Label>
            <div className="relative">
              <Users className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="bp-guests"
                type="number"
                min={1}
                inputMode="numeric"
                placeholder="e.g. 300"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {selectedPackage && (
          <div className="rounded-2xl bg-cream-100 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink">{selectedPackage.name}</span>
              <span className="font-serif text-base font-semibold text-maroon-700">
                {formatINR(selectedPackage.price)}
                <span className="text-xs font-normal text-muted-foreground">
                  {" "}
                  / {selectedPackage.unit ?? vendor.priceUnit}
                </span>
              </span>
            </div>
            {selectedPackage.popular && (
              <Badge variant="gold" className="mt-2 gap-1">
                <Sparkles className="size-3" /> Most popular
              </Badge>
            )}
          </div>
        )}

        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button variant="gold" size="lg" className="w-full">
              Request to book <ArrowRight className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            {sent ? (
              <div className="flex flex-col items-center gap-4 py-4 text-center">
                <span className="grid size-16 place-items-center rounded-full bg-green-100 text-green-700">
                  <CheckCircle2 className="size-8" />
                </span>
                <DialogTitle className="font-serif text-2xl">Request sent!</DialogTitle>
                <DialogDescription className="max-w-sm text-base">
                  {vendor.name} responds {vendor.responseTime}. We&rsquo;ll notify you the
                  moment they reply — keep an eye on your phone.
                </DialogDescription>
                <div className="mt-1 flex w-full flex-col gap-2 rounded-2xl bg-cream-100 p-4 text-left text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Package</span>
                    <span className="font-medium text-ink">{selectedPackage?.name}</span>
                  </div>
                  {date && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium text-ink">{date}</span>
                    </div>
                  )}
                  {guests && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guests</span>
                      <span className="font-medium text-ink">{guests}</span>
                    </div>
                  )}
                </div>
                <DialogClose asChild>
                  <Button variant="outline" className="mt-2 w-full">
                    Done
                  </Button>
                </DialogClose>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl">
                    Request a quote from {vendor.name}
                  </DialogTitle>
                  <DialogDescription>
                    Share a few details and {vendor.name} will get back to you{" "}
                    {vendor.responseTime}. No payment needed to enquire.
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="bp-name">Your name</Label>
                    <Input
                      id="bp-name"
                      required
                      placeholder="e.g. Anjali Menon"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="bp-phone">Phone</Label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="bp-phone"
                        type="tel"
                        required
                        placeholder="+91 98xxx xxxxx"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="bp-message">Message</Label>
                    <Textarea
                      id="bp-message"
                      rows={3}
                      placeholder={`Tell ${vendor.name} about your ${selectedPackage?.name ?? "event"}, date and any requests…`}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    />
                  </div>

                  <div className="rounded-xl border border-border/70 bg-cream-50 px-3.5 py-2.5 text-xs text-muted-foreground">
                    Enquiring about{" "}
                    <span className="font-medium text-ink">{selectedPackage?.name}</span>
                    {date ? ` · ${date}` : ""}
                    {guests ? ` · ${guests} guests` : ""}
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm font-medium text-destructive"
                    >
                      {error}
                    </p>
                  )}
                </div>

                <DialogFooter className="mt-5">
                  <DialogClose asChild>
                    <Button type="button" variant="ghost" disabled={submitting}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" variant="gold" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send request <ArrowRight className="size-4" />
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>

        <Button asChild variant="outline" size="lg" className="w-full">
          <a href={`tel:${site.phone.replace(/\s+/g, "")}`} aria-label={`Call about ${vendor.name}`}>
            <Phone className="size-4" /> Call to enquire
          </a>
        </Button>
      </div>

      <div className="mt-5 flex flex-col gap-2.5 border-t border-border/70 pt-5 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <Clock className="size-4 text-gold-600" /> Typically replies {vendor.responseTime}
        </span>
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="size-4 text-green-600" /> Background-checked &amp; verified
        </span>
        <span className="inline-flex items-center gap-2">
          <Sparkles className="size-4 text-maroon-500" /> {vendor.bookings.toLocaleString("en-IN")}+
          events booked on Eventplus
        </span>
      </div>
    </div>
  );
}
