import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getDemoEvent } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Your dashboard",
  description:
    "Plan your celebration end to end — a living checklist, live budget tracking, your shortlisted vendors and bookings, all in one warm place.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const demo = await getDemoEvent();

  return <DashboardShell event={demo?.event}>{children}</DashboardShell>;
}
