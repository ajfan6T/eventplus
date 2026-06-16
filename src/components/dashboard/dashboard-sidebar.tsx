"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ListChecks,
  Wallet,
  Store,
  CalendarCheck,
  MessageCircle,
  Settings,
  ArrowUpRight,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mandala } from "@/components/decor/motifs";
import type { DemoEvent } from "@/lib/queries";
import { signOutAction } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

type SidebarUser = { name?: string | null; email?: string | null; role?: string };

const roleLabel: Record<string, string> = {
  family: "Family plan",
  vendor: "Vendor",
  admin: "Admin",
};

function initialsOf(user?: SidebarUser) {
  const source = user?.name ?? user?.email ?? "Guest";
  return (
    source
      .split(/[\s@.]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase())
      .join("") || "U"
  );
}

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Hash that marks this item active on the overview page. */
  anchor?: string;
  /** Soft "coming soon" link — visually present, anchors to overview. */
  external?: boolean;
};

export const dashboardNav: NavItem[] = [
  { label: "Overview", href: "/dashboard#overview", icon: LayoutDashboard, anchor: "overview" },
  { label: "Checklist", href: "/dashboard#checklist", icon: ListChecks, anchor: "checklist" },
  { label: "Budget", href: "/dashboard#budget", icon: Wallet, anchor: "budget" },
  { label: "Vendors", href: "/dashboard#vendors", icon: Store, anchor: "vendors" },
  { label: "Browse all vendors", href: "/vendors", icon: ArrowUpRight, external: true },
  { label: "Bookings", href: "/dashboard#bookings", icon: CalendarCheck, anchor: "bookings" },
  { label: "Messages", href: "/dashboard#messages", icon: MessageCircle, anchor: "messages" },
  { label: "Settings", href: "/dashboard#settings", icon: Settings, anchor: "settings" },
];

function NavLink({
  item,
  activeAnchor,
  onNavigate,
}: {
  item: NavItem;
  activeAnchor: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = item.external
    ? pathname.startsWith("/vendors")
    : pathname === "/dashboard" && activeAnchor === item.anchor;
  const ItemIcon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group/nav flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-maroon-600 text-cream-50 shadow-soft"
          : "text-ink-soft hover:bg-cream-200/70 hover:text-ink"
      )}
    >
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-lg transition-colors",
          active
            ? "bg-cream-50/15 text-gold-200"
            : "bg-cream-100 text-maroon-600 group-hover/nav:bg-cream-200"
        )}
      >
        <ItemIcon className="size-4" />
      </span>
      <span className="flex-1">{item.label}</span>
      {item.external && (
        <ArrowUpRight
          className={cn(
            "size-3.5 transition-transform group-hover/nav:translate-x-0.5",
            active ? "text-gold-200" : "text-muted-foreground"
          )}
        />
      )}
    </Link>
  );
}

/**
 * Shared inner sidebar body. Rendered both in the fixed lg rail and inside the
 * mobile Sheet (where `onNavigate` closes the sheet on tap).
 */
export function DashboardSidebar({
  activeAnchor,
  onNavigate,
  className,
  event,
  user,
}: {
  activeAnchor: string;
  onNavigate?: () => void;
  className?: string;
  event?: DemoEvent;
  user?: SidebarUser;
}) {
  const displayName = user?.name ?? user?.email ?? "Guest";
  const subLabel = roleLabel[user?.role ?? "family"] ?? "Family plan";
  return (
    <div className={cn("flex h-full flex-col gap-6 px-4 py-6", className)}>
      <div className="px-2">
        <Logo />
      </div>

      {/* Active event card */}
      {event && (
        <div className="relative overflow-hidden rounded-2xl border border-maroon-200/50 bg-gradient-to-br from-maroon-600 to-maroon-800 p-4 text-cream-50 shadow-soft">
          <Mandala className="pointer-events-none absolute -right-6 -top-6 size-24 text-gold-300/15" />
          <p className="relative text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-200">
            {event.type}
          </p>
          <p className="relative mt-1 font-serif text-lg font-semibold leading-tight">
            {event.coupleNames}
          </p>
          <p className="relative mt-1 text-xs text-cream-100/80">{event.dateLabel}</p>
          <span className="relative mt-3 inline-flex items-center gap-1.5 rounded-full bg-cream-50/15 px-2.5 py-1 text-[11px] font-semibold text-gold-100 backdrop-blur">
            {event.daysAway} days to go
          </span>
        </div>
      )}

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {dashboardNav.map((item) => (
          <NavLink
            key={item.label}
            item={item}
            activeAnchor={activeAnchor}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      {/* User block */}
      <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-cream-50 p-3 shadow-soft">
        <Avatar className="size-10 border-maroon-200">
          <AvatarFallback className="bg-maroon-100 text-maroon-700">
            {initialsOf(user)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">{displayName}</p>
          <p className="truncate text-xs text-muted-foreground">{subLabel}</p>
        </div>
        <form action={signOutAction}>
          <button
            type="submit"
            aria-label="Sign out"
            className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-maroon-50 hover:text-maroon-700"
          >
            <LogOut className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
