import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Create account",
  description:
    "Create your free Eventplus account — plan an event as a family or list your services as a verified Kerala vendor.",
};

export default function SignupPage() {
  const googleEnabled = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
  return (
    <Suspense fallback={<AuthFormFallback />}>
      <AuthForm mode="signup" googleEnabled={googleEnabled} />
    </Suspense>
  );
}

function AuthFormFallback() {
  return (
    <div className="flex animate-pulse flex-col gap-6">
      <div className="h-9 w-2/3 rounded-lg bg-cream-200" />
      <div className="grid grid-cols-2 gap-3">
        <div className="h-24 rounded-2xl bg-cream-200" />
        <div className="h-24 rounded-2xl bg-cream-200" />
      </div>
      <div className="h-12 rounded-xl bg-cream-200" />
      <div className="h-12 rounded-xl bg-cream-200" />
      <div className="h-13 rounded-full bg-cream-200" />
    </div>
  );
}
