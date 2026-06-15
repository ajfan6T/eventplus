"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  CalendarDays,
  TrendingUp,
  UserRound,
  Star,
  Settings,
  ExternalLink,
  Menu,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Rating } from "@/components/ui/rating";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { vendorProfile } from "@/lib/data/vendor-dashboard";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** in-page section anchor (matched against the URL hash) */
  hash?: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/vendor#dashboard", icon: LayoutDashboard, hash: "#dashboard" },
  { label: "Leads", href: "/vendor#leads", icon: Inbox, hash: "#leads" },
  { label: "Calendar", href: "/vendor#calendar", icon: CalendarDays, hash: "#calendar" },
  { label: "Earnings", href: "/vendor#earnings", icon: TrendingUp, hash: "#earnings" },
  { label: "Profile", href: "/vendor#profile", icon: UserRound, hash: "#profile" },
  { label: "Reviews", href: "/vendor#reviews", icon: Star, hash: "#reviews" },
  { label: "Settings", href: "/vendor#settings", icon: Settings, hash: "#settings" },
];

const PUBLIC_PROFILE = "/vendors/marigold-decor-studio";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const onVendor = pathname === "/vendor";

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        // The first nav item is the default active state when on /vendor.
        const active = onVendor && item.hash === "#dashboard";
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-maroon-600 text-cream-50 shadow-soft"
                : "text-ink-soft hover:bg-cream-200/70 hover:text-maroon-700",
            )}
          >
            <Icon
              className={cn(
                "size-[18px] shrink-0 transition-colors",
                active ? "text-gold-300" : "text-gold-600 group-hover:text-gold-700",
              )}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 p-5">
      <Logo />

      <div className="gold-rule" />

      <div className="flex-1">
        <p className="mb-2 px-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-700">
          Workspace
        </p>
        <NavLinks onNavigate={onNavigate} />
      </div>

      {/* Public profile link */}
      <Link
        href={PUBLIC_PROFILE}
        onClick={onNavigate}
        className="group flex items-center gap-3 rounded-xl border border-gold-300 bg-gold-50 px-3.5 py-2.5 text-sm font-semibold text-gold-800 transition-colors hover:bg-gold-100"
      >
        <ExternalLink className="size-[18px] shrink-0 text-gold-600" />
        View public profile
      </Link>

      {/* Vendor identity block */}
      <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-cream-100 p-3.5">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-maroon-600 to-maroon-800 font-serif text-base font-semibold text-cream-50 shadow-soft">
          MD
        </span>
        <div className="min-w-0">
          <p className="truncate font-serif text-sm font-semibold text-ink">
            {vendorProfile.name}
          </p>
          <Rating value={vendorProfile.rating} className="mt-0.5" />
        </div>
      </div>
    </div>
  );
}

export function VendorSidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-[260px] shrink-0 border-r border-border/70 bg-cream-50 lg:block">
      <SidebarBody />
    </aside>
  );
}

/** Mobile hamburger that opens the sidebar in a Sheet. */
export function VendorSidebarMobile() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="grid size-10 place-items-center rounded-xl border border-border bg-cream-50 text-maroon-700 transition-colors hover:bg-cream-200 lg:hidden"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0 sm:max-w-xs">
        {/* SheetClose wraps body via onNavigate so taps close the sheet */}
        <SidebarBody onNavigate={() => setOpen(false)} />
        <SheetClose className="sr-only">Close</SheetClose>
      </SheetContent>
    </Sheet>
  );
}
