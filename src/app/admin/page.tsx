import type { Metadata } from "next";
import { Clock, ShieldCheck, Store } from "lucide-react";
import { getAllVendorsForAdmin } from "@/lib/queries";
import { VendorApprovalRow } from "@/components/admin/vendor-approval-row";

export const metadata: Metadata = { title: "Vendor listings" };

export default async function AdminPage() {
  const vendors = await getAllVendorsForAdmin();
  const hidden = vendors.filter((v) => !v.verified);
  const live = vendors.filter((v) => v.verified);

  const stats = [
    { label: "Total listings", value: vendors.length, icon: Store, tone: "bg-maroon-100 text-maroon-700" },
    { label: "Hidden", value: hidden.length, icon: Clock, tone: "bg-gold-100 text-gold-800" },
    { label: "Live", value: live.length, icon: ShieldCheck, tone: "bg-green-100 text-green-700" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">Vendor listings</h1>
        <p className="mt-2 text-muted-foreground">
          New vendor listings go live in the marketplace immediately. Use this page to hide a
          listing if it needs to come down, or publish it again.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-card">
              <span className={`grid size-11 place-items-center rounded-xl ${s.tone}`}>
                <Icon className="size-5" />
              </span>
              <div>
                <p className="font-serif text-2xl font-semibold text-ink">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {vendors.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-cream-50 p-12 text-center">
          <p className="font-serif text-lg font-semibold text-ink">No vendor listings yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Vendor sign-ups and their listings will show here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {hidden.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold-700">
                <Clock className="size-4" /> Hidden ({hidden.length})
              </h2>
              {hidden.map((v) => (
                <VendorApprovalRow key={v.slug} vendor={v} />
              ))}
            </section>
          )}
          {live.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-green-700">
                <ShieldCheck className="size-4" /> Live listings ({live.length})
              </h2>
              {live.map((v) => (
                <VendorApprovalRow key={v.slug} vendor={v} />
              ))}
            </section>
          )}
        </div>
      )}
    </div>
  );
}
