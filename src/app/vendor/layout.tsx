import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  VendorSidebar,
  VendorSidebarMobile,
} from "@/components/vendor/vendor-sidebar";
import { vendorProfile } from "@/lib/data/vendor-dashboard";
import { getLeads } from "@/lib/queries";

export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const leads = await getLeads();
  const newLeads = leads.filter((l) => l.status === "new").length;

  return (
    <div className="flex min-h-dvh bg-cream-100">
      <VendorSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-border/70 bg-cream-50/85 backdrop-blur-md">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <VendorSidebarMobile />

            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-base font-semibold leading-tight text-ink sm:text-lg">
                {vendorProfile.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {vendorProfile.category} · {vendorProfile.city}
              </p>
            </div>

            {/* Leads notification pill */}
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

            <Avatar className="size-10 border-gold-300">
              <AvatarFallback className="bg-gradient-to-br from-maroon-600 to-maroon-800 font-serif text-cream-50">
                MD
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
