import { redirect } from "next/navigation";
import { Bell } from "lucide-react";
import { auth } from "@/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  VendorSidebar,
  VendorSidebarMobile,
  type SidebarListing,
} from "@/components/vendor/vendor-sidebar";
import { getLeadsForUser, getVendorForUser } from "@/lib/queries";

function initials(name?: string | null) {
  const s = (name ?? "V").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
  return s || "V";
}

export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/vendor");
  if (session.user.role === "family") redirect("/dashboard");

  const listing = await getVendorForUser(session.user.id);
  const leads = listing ? (await getLeadsForUser(session.user.id)) ?? [] : [];
  const newLeads = leads.filter((l) => l.status === "new").length;

  const sidebarListing: SidebarListing | null = listing
    ? { name: listing.name, rating: listing.rating, reviewCount: listing.reviewCount, slug: listing.slug }
    : null;

  const displayName = listing?.name ?? session.user.name ?? "Your workspace";
  const displaySub = listing ? `${listing.categoryLabel} · ${listing.city}` : "Set up your listing";

  return (
    <div className="flex min-h-dvh bg-cream-100">
      <VendorSidebar listing={sidebarListing} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border/70 bg-cream-50/85 backdrop-blur-md">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <VendorSidebarMobile listing={sidebarListing} />

            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-base font-semibold leading-tight text-ink sm:text-lg">
                {displayName}
              </p>
              <p className="truncate text-xs text-muted-foreground">{displaySub}</p>
            </div>

            {listing && (
              <a
                href="#leads"
                aria-label={`${newLeads} new leads`}
                className="relative inline-flex items-center gap-2 rounded-full border border-maroon-600/25 bg-cream-50 px-3 py-1.5 text-sm font-medium text-maroon-700 transition-colors hover:bg-maroon-50"
              >
                <Bell className="size-4" />
                <span className="hidden sm:inline">{newLeads} new leads</span>
                <span className="grid size-5 place-items-center rounded-full bg-maroon-600 text-[11px] font-semibold text-cream-50 sm:hidden">
                  {newLeads}
                </span>
                {newLeads > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-gold-500 ring-2 ring-cream-50" />
                )}
              </a>
            )}

            <Avatar className="size-10 border-gold-300">
              <AvatarFallback className="bg-gradient-to-br from-maroon-600 to-maroon-800 font-serif text-cream-50">
                {initials(displayName)}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
