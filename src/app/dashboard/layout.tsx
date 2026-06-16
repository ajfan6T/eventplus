import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getActiveEvent } from "@/lib/queries";

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
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/dashboard");
  if (session.user.role === "vendor") redirect("/vendor");

  const bundle = await getActiveEvent(session.user.id);

  return (
    <DashboardShell event={bundle?.event} user={session.user}>
      {children}
    </DashboardShell>
  );
}
