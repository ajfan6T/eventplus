"use client";

import { useMemo, useState } from "react";
import {
  MapPin,
  CalendarDays,
  Clock,
  MessageSquareText,
  Wallet,
  Phone,
  FileText,
  ArrowRight,
  Inbox,
  PartyPopper,
  CircleCheck,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { leads, leadStatusMeta } from "@/lib/data/vendor-dashboard";
import type { Lead } from "@/lib/types";
import { cn, formatINR } from "@/lib/utils";

type FilterKey = "all" | Lead["status"];

const filterOrder: FilterKey[] = ["all", "new", "contacted", "quoted", "booked", "lost"];

const filterLabels: Record<FilterKey, string> = {
  all: "All",
  new: leadStatusMeta.new.label,
  contacted: leadStatusMeta.contacted.label,
  quoted: leadStatusMeta.quoted.label,
  booked: leadStatusMeta.booked.label,
  lost: leadStatusMeta.lost.label,
};

export function LeadsBoard() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selected, setSelected] = useState<Lead | null>(null);

  const counts = useMemo(() => {
    const base = { all: leads.length } as Record<FilterKey, number>;
    for (const key of filterOrder) {
      if (key === "all") continue;
      base[key] = leads.filter((l) => l.status === key).length;
    }
    return base;
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? leads : leads.filter((l) => l.status === filter)),
    [filter],
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Status filter */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterKey)}>
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1.5 rounded-2xl">
          {filterOrder.map((key) => (
            <TabsTrigger key={key} value={key} className="gap-1.5">
              {filterLabels[key]}
              <span
                className={cn(
                  "grid min-w-5 place-items-center rounded-full px-1 text-[11px] font-semibold",
                  filter === key
                    ? "bg-cream-50/25 text-cream-50"
                    : "bg-cream-300/70 text-ink-soft",
                )}
              >
                {counts[key]}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Lead list */}
      {visible.length > 0 ? (
        <div className="flex flex-col gap-4">
          {visible.map((lead) => (
            <LeadRow key={lead.id} lead={lead} onOpen={() => setSelected(lead)} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-maroon-200 bg-maroon-50/40 px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-cream-50 text-maroon-600 shadow-soft">
            <Inbox className="size-6" />
          </span>
          <p className="font-serif text-lg font-semibold text-ink">
            No {filter === "all" ? "" : filterLabels[filter].toLowerCase() + " "}leads here
          </p>
          <p className="max-w-xs text-sm text-muted-foreground">
            New enquiries will land in this inbox the moment a customer reaches out.
          </p>
        </div>
      )}

      {/* Detail sheet */}
      <Sheet open={selected !== null} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent side="right" className="flex w-full flex-col overflow-y-auto sm:max-w-md">
          {selected && <LeadDetail lead={selected} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function LeadRow({ lead, onOpen }: { lead: Lead; onOpen: () => void }) {
  const meta = leadStatusMeta[lead.status];
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group w-full rounded-2xl border border-border/70 bg-card p-5 text-left shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-lift"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif text-lg font-semibold text-ink">{lead.customer}</h3>
            <Badge variant={meta.badge}>{meta.label}</Badge>
          </div>
          <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5" /> {lead.receivedAt}
            <span className="text-cream-400">·</span>
            <span className="font-mono text-[11px]">{lead.id}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Budget</p>
          <p className="font-serif text-lg font-semibold text-maroon-700">
            {formatINR(lead.budget)}
          </p>
        </div>
      </div>

      {/* Meta chips */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <PartyPopper className="size-4 text-gold-600" /> {lead.event}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-4 text-gold-600" /> {lead.date}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-4 text-gold-600" /> {lead.location}
        </span>
      </div>

      {/* Message preview */}
      <p className="mt-3 line-clamp-2 rounded-xl bg-cream-100 px-3.5 py-2.5 text-sm leading-relaxed text-ink-soft">
        <MessageSquareText className="mr-1.5 inline size-3.5 -translate-y-0.5 text-muted-foreground" />
        {lead.message}
      </p>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <span
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 rounded-full bg-maroon-600 px-4 py-2 text-[13px] font-medium text-cream-50 shadow-soft transition-colors hover:bg-maroon-700"
        >
          <Phone className="size-3.5" /> Contact
        </span>
        <span
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 rounded-full border border-maroon-600/30 px-4 py-2 text-[13px] font-medium text-maroon-700 transition-colors hover:bg-maroon-50"
        >
          <FileText className="size-3.5" /> Send quote
        </span>
        <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-maroon-600 transition-transform group-hover:translate-x-0.5">
          Open <ArrowRight className="size-4" />
        </span>
      </div>
    </button>
  );
}

function LeadDetail({ lead }: { lead: Lead }) {
  const meta = leadStatusMeta[lead.status];
  return (
    <>
      <SheetHeader className="border-b border-border/60 bg-cream-100/60">
        <div className="flex items-center gap-2">
          <Badge variant={meta.badge}>{meta.label}</Badge>
          <span className="font-mono text-[11px] text-muted-foreground">{lead.id}</span>
        </div>
        <SheetTitle className="font-serif text-2xl">{lead.customer}</SheetTitle>
        <SheetDescription className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5" /> Received {lead.receivedAt}
        </SheetDescription>
      </SheetHeader>

      <div className="flex flex-1 flex-col gap-5 p-6">
        {/* Detail grid */}
        <div className="grid grid-cols-2 gap-3">
          <DetailTile icon={<PartyPopper className="size-4" />} label="Occasion" value={lead.event} />
          <DetailTile icon={<CalendarDays className="size-4" />} label="Event date" value={lead.date} />
          <DetailTile icon={<MapPin className="size-4" />} label="Location" value={lead.location} />
          <DetailTile
            icon={<Wallet className="size-4" />}
            label="Budget"
            value={formatINR(lead.budget)}
            accent
          />
        </div>

        {/* Message */}
        <div>
          <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
            <MessageSquareText className="size-3.5" /> Customer message
          </p>
          <div className="rounded-2xl border border-border/60 bg-cream-100 p-4 text-sm leading-relaxed text-ink-soft">
            “{lead.message}”
          </div>
        </div>

        {/* Suggested next step */}
        <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4">
          <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-green-100 text-green-700">
            <CircleCheck className="size-4" />
          </span>
          <p className="text-sm leading-relaxed text-green-800">
            Respond within your <span className="font-semibold">2-hour</span> average to keep your
            96% response rate — fast replies win ~3× more bookings.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-2.5 pt-2">
          <Button variant="primary" className="w-full">
            <Phone className="size-4" /> Call {lead.customer.split(" ")[0]}
          </Button>
          <div className="grid grid-cols-2 gap-2.5">
            <Button variant="gold">
              <FileText className="size-4" /> Send quote
            </Button>
            <SheetClose asChild>
              <Button variant="soft">Mark contacted</Button>
            </SheetClose>
          </div>
        </div>
      </div>
    </>
  );
}

function DetailTile({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-3.5">
      <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="text-gold-600">{icon}</span> {label}
      </p>
      <p
        className={cn(
          "mt-1 font-semibold",
          accent ? "font-serif text-lg text-maroon-700" : "text-ink",
        )}
      >
        {value}
      </p>
    </div>
  );
}
