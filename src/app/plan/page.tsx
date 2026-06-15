import type { Metadata } from "next";
import { PlanWizard } from "@/components/plan/plan-wizard";

export const metadata: Metadata = {
  title: "Plan your event",
  description:
    "Tell Eventplus about your celebration and get an instant AI-built plan — a deadline-aware checklist, a live budget breakdown and curated Kerala vendors matched to your occasion.",
};

export default function PlanPage() {
  return <PlanWizard />;
}
