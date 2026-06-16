import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to Eventplus to pick up your event plan, vendors and live budget right where you left off.",
};

export default function LoginPage() {
  const googleEnabled = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
  return (
    <Suspense fallback={<AuthFormFallback />}>
      <AuthForm mode="login" googleEnabled={googleEnabled} />
    </Suspense>
  );
}

function AuthFormFallback() {
  return (
    <div className="flex animate-pulse flex-col gap-6">
      <div className="h-9 w-2/3 rounded-lg bg-cream-200" />
      <div className="h-12 rounded-xl bg-cream-200" />
      <div className="h-12 rounded-xl bg-cream-200" />
      <div className="h-13 rounded-full bg-cream-200" />
    </div>
  );
}
