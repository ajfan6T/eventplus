"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, X, Clock, ShieldCheck, ExternalLink, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setVendorApproval } from "@/lib/actions/vendor";
import { formatINR } from "@/lib/utils";

export type AdminVendor = {
  slug: string;
  name: string;
  categoryLabel: string;
  city: string;
  startingPrice: number;
  priceUnit: string;
  verified: boolean;
};

export function VendorApprovalRow({ vendor }: { vendor: AdminVendor }) {
  const router = useRouter();
  const [busy, setBusy] = React.useState(false);

  async function toggle(approved: boolean) {
    if (busy) return;
    setBusy(true);
    const res = await setVendorApproval(vendor.slug, approved);
    setBusy(false);
    if (res.ok) router.refresh();
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate font-serif text-lg font-semibold text-ink">{vendor.name}</p>
          {vendor.verified ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700">
              <ShieldCheck className="size-3" /> Live
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-gold-100 px-2 py-0.5 text-[11px] font-semibold text-gold-800">
              <Clock className="size-3" /> Hidden
            </span>
          )}
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span>{vendor.categoryLabel}</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" /> {vendor.city}
          </span>
          <span>from {formatINR(vendor.startingPrice)} / {vendor.priceUnit}</span>
          <Link href={`/vendors/${vendor.slug}`} className="inline-flex items-center gap-1 font-medium text-maroon-600 hover:underline">
            <ExternalLink className="size-3.5" /> Preview
          </Link>
        </p>
      </div>

      <div className="flex shrink-0 gap-2">
        {vendor.verified ? (
          <Button variant="outline" size="sm" disabled={busy} onClick={() => toggle(false)}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : <X className="size-4" />} Hide
          </Button>
        ) : (
          <Button variant="secondary" size="sm" disabled={busy} onClick={() => toggle(true)}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />} Publish
          </Button>
        )}
      </div>
    </div>
  );
}
