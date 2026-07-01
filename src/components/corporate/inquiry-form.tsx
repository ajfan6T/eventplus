"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Clock,
  Send,
  Loader2,
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
import { site } from "@/lib/data/site";
import {
  itParkOptions,
  eventTypeOptions,
  headcountOptions,
  budgetBandOptions,
} from "@/lib/data/corporate";
import { submitCorporateInquiry } from "@/lib/actions/corporate";

type FormState = {
  company: string;
  contact: string;
  email: string;
  phone: string;
  itPark: string;
  eventType: string;
  headcount: string;
  budget: string;
  date: string;
  message: string;
};

const initialState: FormState = {
  company: "",
  contact: "",
  email: "",
  phone: "",
  itPark: "",
  eventType: "",
  headcount: "",
  budget: "",
  date: "",
  message: "",
};

function buildMailto(form: FormState) {
  const subject = form.company
    ? `Corporate event brief — ${form.company}`
    : "Corporate event brief";
  const body = [
    `Company: ${form.company || "—"}`,
    `Contact: ${form.contact || "—"}`,
    `Work email: ${form.email || "—"}`,
    `Phone: ${form.phone || "—"}`,
    `IT park: ${form.itPark || "—"}`,
    `Event type: ${form.eventType || "—"}`,
    `Headcount: ${form.headcount || "—"}`,
    `Budget band: ${form.budget || "—"}`,
    `Preferred date: ${form.date || "—"}`,
    "",
    "Brief:",
    form.message || "—",
  ].join("\n");
  return `mailto:${site.founderEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export function InquiryForm() {
  const [form, setForm] = React.useState<FormState>(initialState);
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    const res = await submitCorporateInquiry({
      company: form.company,
      contactName: form.contact,
      email: form.email,
      phone: form.phone,
      itPark: form.itPark,
      eventType: form.eventType,
      headcount: form.headcount,
      budgetBand: form.budget,
      preferredAt: form.date,
      message: form.message,
    });
    setSubmitting(false);
    if (!res.ok) {
      setError(res.error ?? "Something went wrong. Please try again or email us directly.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-green-200 bg-card p-8 text-center shadow-card sm:p-12">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400" />
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-green-100 text-green-700">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="mt-6 font-serif text-2xl font-semibold text-ink sm:text-3xl">
          Thank you — your brief is on its way
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Your brief has been routed to our founder ({site.founderEmail}). Expect a
          reply within 72 hours.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="gold">
            <a href={buildMailto(form)}>
              <Mail className="size-4" /> Open in your email app
            </a>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setForm(initialState);
              setSubmitted(false);
            }}
          >
            Submit another brief
          </Button>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Prefer to talk now? Call us on {site.phone}.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8 lg:p-10"
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400" />

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-green-600" /> Founder-led, confidential
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5 text-green-600" /> 72-hour proposal promise
        </span>
      </div>

      <div className="mt-7 grid gap-x-5 gap-y-5 sm:grid-cols-2">
        {/* Company name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="company">
            Company name <span className="text-maroon-600">*</span>
          </Label>
          <Input
            id="company"
            name="company"
            required
            autoComplete="organization"
            placeholder="e.g. Lumina Labs Pvt Ltd"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </div>

        {/* Contact name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact">
            Contact name <span className="text-maroon-600">*</span>
          </Label>
          <Input
            id="contact"
            name="contact"
            required
            autoComplete="name"
            placeholder="Your full name"
            value={form.contact}
            onChange={(e) => update("contact", e.target.value)}
          />
        </div>

        {/* Work email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">
            Work email <span className="text-maroon-600">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">
            Phone <span className="text-maroon-600">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 ..."
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>

        {/* IT park */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="itPark">
            IT park <span className="text-maroon-600">*</span>
          </Label>
          <Select
            value={form.itPark}
            onValueChange={(v) => update("itPark", v)}
            required
          >
            <SelectTrigger id="itPark" aria-label="IT park">
              <SelectValue placeholder="Select a park" />
            </SelectTrigger>
            <SelectContent>
              {itParkOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Event type */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="eventType">
            Event type <span className="text-maroon-600">*</span>
          </Label>
          <Select
            value={form.eventType}
            onValueChange={(v) => update("eventType", v)}
            required
          >
            <SelectTrigger id="eventType" aria-label="Event type">
              <SelectValue placeholder="What are you planning?" />
            </SelectTrigger>
            <SelectContent>
              {eventTypeOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Headcount */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="headcount">
            Headcount <span className="text-maroon-600">*</span>
          </Label>
          <Select
            value={form.headcount}
            onValueChange={(v) => update("headcount", v)}
            required
          >
            <SelectTrigger id="headcount" aria-label="Headcount">
              <SelectValue placeholder="Expected attendees" />
            </SelectTrigger>
            <SelectContent>
              {headcountOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Budget band */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="budget">
            Budget band <span className="text-maroon-600">*</span>
          </Label>
          <Select
            value={form.budget}
            onValueChange={(v) => update("budget", v)}
            required
          >
            <SelectTrigger id="budget" aria-label="Budget band">
              <SelectValue placeholder="Indicative budget" />
            </SelectTrigger>
            <SelectContent>
              {budgetBandOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Preferred date */}
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="date">Preferred date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            className="sm:max-w-xs"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="message">
            Tell us about your event <span className="text-maroon-600">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            required
            placeholder="Your objective, must-haves, location preferences, format (in-person / hybrid) and anything else that will help us shape the perfect proposal."
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
          />
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive"
        >
          {error}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
          By submitting, your brief is routed straight to our founder. No spam, no
          sales floor — just a tailored proposal.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" variant="gold" size="lg" disabled={submitting} className="sm:px-7">
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send className="size-4" /> Send my brief
              </>
            )}
          </Button>
          <Button asChild type="button" variant="ghost" size="lg">
            <Link href={buildMailto(form)}>
              Email instead <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </form>
  );
}
