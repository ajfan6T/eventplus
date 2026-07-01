import type { Metadata } from "next";
import { Clock, ShieldCheck, Store } from "lucide-react";
import { getAllVendorsForAdmin } from "@/lib/queries";
import { VendorApprovalRow } from "@/components/admin/vendor-approval-row";

export const metadata: Metadata = { title: "Vendor approvals" };

export default async function AdminPage() {
  const vendors = await getAllVendorsForAdmin();
  const pending = vendors.filter((v) => !v.verified);
  const approved = vendors.filter((v) => v.verified);

  const stats = [
    { label: "Total listings", value: vendors.length, icon: Store, tone: "bg-maroon-100 text-maroon-700" },
    { label: "Pending review", value: pending.length, icon: Clock, tone: "bg-gold-100 text-gold-800" },
    { label: "Approved & live", value: approved.length, icon: ShieldCheck, tone: "bg-green-100 text-green-700" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">Vendor approvals</h1>
        <p className="mt-2 text-muted-foreground">
          Review and approve new vendor listings. Approved listings appear in the public marketplace.
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
            Vendor sign-ups and their listings will show here for approval.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {pending.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold-700">
                <Clock className="size-4" /> Awaiting review ({pending.length})
              </h2>
              {pending.map((v) => (
                <VendorApprovalRow key={v.slug} vendor={v} />
              ))}
            </section>
          )}
          {approved.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-green-700">
                <ShieldCheck className="size-4" /> Live listings ({approved.length})
              </h2>
              {approved.map((v) => (
                <VendorApprovalRow key={v.slug} vendor={v} />
              ))}
            </section>
          )}
        </div>
      )}
    </div>
  );
}
