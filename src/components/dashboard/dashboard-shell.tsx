"use client";

import { useEffect, useState } from "react";
import { Menu, Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/brand/logo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import type { DemoEvent } from "@/lib/queries";

/** Sections on the overview page that the sidebar + topbar track. */
const SCROLL_SPY_IDS = [
  "overview",
  "checklist",
  "budget",
  "vendors",
  "bookings",
  "messages",
  "settings",
];

const TITLES: Record<string, string> = {
  overview: "Overview",
  checklist: "Checklist",
  budget: "Budget",
  vendors: "Vendors",
  bookings: "Bookings",
  messages: "Messages",
  settings: "Settings",
};

export type DashboardUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

function initialsOf(user?: DashboardUser) {
  const source = user?.name ?? user?.email ?? "Guest";
  return source
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
}

export function DashboardShell({
  children,
  event,
  user,
}: {
  children: React.ReactNode;
  event?: DemoEvent;
  user?: DashboardUser;
}) {
  const [activeAnchor, setActiveAnchor] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const initials = initialsOf(user);

  // Scroll-spy: highlight the nav item for the section currently in view.
  useEffect(() => {
    const sections = SCROLL_SPY_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveAnchor(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      {/* ---- Fixed desktop sidebar ---- */}
      <aside className="sticky top-0 hidden h-screen border-r border-border/70 bg-cream-50 lg:block">
        <DashboardSidebar activeAnchor={activeAnchor} event={event} user={user} />
      </aside>

      {/* ---- Main column ---- */}
      <div className="flex min-h-screen flex-col bg-cream-100">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-border/70 bg-cream-50/90 backdrop-blur-md">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            {/* Mobile menu */}
            <div className="lg:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon-sm" aria-label="Open navigation">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[88%] max-w-xs border-r bg-cream-50 p-0">
                  <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
                  <DashboardSidebar
                    activeAnchor={activeAnchor}
                    onNavigate={() => setMobileOpen(false)}
                    event={event}
                    user={user}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* Mobile logo (desktop hides — logo lives in the rail) */}
            <div className="lg:hidden">
              <Logo />
            </div>

            {/* Active event summary */}
            <div className="hidden min-w-0 flex-1 items-center gap-3 lg:flex">
              <div className="min-w-0">
                <p className="truncate font-serif text-base font-semibold leading-tight text-ink">
                  {event?.coupleNames}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {TITLES[activeAnchor] ?? "Overview"}
                  {event ? ` · ${event.type} · ${event.dateLabel}` : ""}
                </p>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              {event && (
                <span className="hidden items-center gap-1.5 rounded-full border border-gold-300 bg-gold-50 px-3 py-1.5 text-xs font-semibold text-gold-800 sm:inline-flex">
                  <Sparkles className="size-3.5" /> {event.daysAway} days to go
                </span>
              )}
              <button
                type="button"
                aria-label="Notifications"
                className="relative grid size-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-cream-200"
              >
                <Bell className="size-4.5" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-maroon-600 ring-2 ring-cream-50" />
              </button>
              <Avatar className="size-9 border-maroon-200">
                <AvatarFallback className="bg-maroon-100 text-sm text-maroon-700">
                  {initials || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
