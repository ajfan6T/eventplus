import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { auth } from "@/auth";
import { getVendorForUser } from "@/lib/queries";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Mandala } from "@/components/decor/motifs";
import { VendorOnboardingForm } from "@/components/vendor/vendor-onboarding-form";

export const metadata: Metadata = {
  title: "List your services",
  description: "Create your Eventplus vendor listing and start receiving leads from Kerala families.",
};

export default async function VendorOnboardingPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/vendor-onboarding");
  if (session.user.role === "family") redirect("/dashboard");
  const existing = await getVendorForUser(session.user.id);
  if (existing) redirect("/vendor");

  return (
    <div className="min-h-dvh bg-festive">
      <header className="border-b border-border/70 bg-cream-50/80 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Logo />
          <Link
            href="/vendor"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-maroon-700"
          >
            <ArrowLeft className="size-4" /> Back
          </Link>
        </Container>
      </header>

      <Container className="relative py-12 lg:py-16">
        <Mandala className="pointer-events-none absolute -right-24 -top-10 size-80 text-gold-500/10" />
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-8 flex flex-col gap-3">
            <Badge variant="gold" className="w-fit gap-1.5">
              <Sparkles className="size-3.5" /> Become a vendor
            </Badge>
            <h1 className="font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              List your services on <span className="text-maroon-700">Eventplus</span>
            </h1>
            <p className="max-w-2xl text-pretty text-muted-foreground">
              Tell Kerala families what you offer. Your listing goes live in the marketplace the
              moment you submit, so you can start receiving leads right away — free to list.
            </p>
          </div>
          <VendorOnboardingForm />
        </div>
      </Container>
    </div>
  );
}
