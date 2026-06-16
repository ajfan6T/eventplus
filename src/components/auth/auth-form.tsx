"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  Phone,
  Loader2,
  PartyPopper,
  Store,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkle } from "@/components/decor/motifs";
import { keralaLocations } from "@/lib/data/categories";
import { registerUser } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

type Mode = "login" | "signup";
type Role = "family" | "vendor";

/** Google "G" glyph — inline SVG (lucide brand icons are unavailable). */
function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export function AuthForm({
  mode,
  googleEnabled = false,
}: {
  mode: Mode;
  googleEnabled?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLogin = mode === "login";
  const callbackUrl = searchParams.get("callbackUrl");

  const [role, setRole] = useState<Role>(
    searchParams.get("role") === "vendor" ? "vendor" : "family"
  );
  const [submitting, setSubmitting] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    const name = String(fd.get("name") ?? "").trim();

    try {
      if (!isLogin) {
        const reg = await registerUser({ name, email, password, role, city });
        if (!reg.ok) {
          setError(reg.error ?? "Could not create your account.");
          setSubmitting(false);
          return;
        }
      }

      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) {
        setError(
          isLogin
            ? "Incorrect email or password."
            : "Account created, but sign-in failed. Try logging in."
        );
        setSubmitting(false);
        return;
      }

      const dest =
        callbackUrl ?? (!isLogin && role === "vendor" ? "/vendor" : "/dashboard");
      router.push(dest);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  function handleGoogle() {
    signIn("google", {
      callbackUrl: callbackUrl ?? (role === "vendor" ? "/vendor" : "/dashboard"),
    });
  }

  return (
    <div className="flex flex-col gap-7">
      {/* ----------------------------------------------------------- Heading */}
      <div className="flex flex-col gap-2">
        <span className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
          <Sparkle className="size-3.5 text-gold-500" />
          {isLogin ? "Welcome back" : "Get started free"}
        </span>
        <h1 className="font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {isLogin ? (
            <>
              Sign in to <span className="text-maroon-700">Eventplus</span>
            </>
          ) : (
            <>
              Create your <span className="text-maroon-700">account</span>
            </>
          )}
        </h1>
        <p className="text-pretty text-muted-foreground">
          {isLogin
            ? "Pick up your plan, vendors and budget right where you left off."
            : "It's free to start. No planning fee, ever — just joyful celebrations."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* ------------------------------------------- Signup: role chooser */}
        {!isLogin && (
          <fieldset className="flex flex-col gap-2.5">
            <legend className="mb-2.5 text-sm font-medium text-ink">
              I want to…
            </legend>
            <div className="grid grid-cols-2 gap-3">
              <RoleOption
                active={role === "family"}
                onClick={() => setRole("family")}
                icon={<PartyPopper className="size-5" />}
                title="Plan an event"
                subtitle="For families"
              />
              <RoleOption
                active={role === "vendor"}
                onClick={() => setRole("vendor")}
                icon={<Store className="size-5" />}
                title="List my services"
                subtitle="For vendors"
              />
            </div>
          </fieldset>
        )}

        {/* --------------------------------------------- Signup: name field */}
        {!isLogin && (
          <Field
            id="name"
            label="Full name"
            icon={<User className="size-4" />}
            type="text"
            placeholder={role === "vendor" ? "Your business name" : "Your name"}
            autoComplete="name"
          />
        )}

        {/* ------------------------------------------------------ Email field */}
        <Field
          id="email"
          label="Email address"
          icon={<Mail className="size-4" />}
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
        />

        {/* --------------------------------------------- Signup: phone field */}
        {!isLogin && (
          <Field
            id="phone"
            label="Phone number"
            icon={<Phone className="size-4" />}
            type="tel"
            placeholder="+91 98XXX XXXXX"
            autoComplete="tel"
          />
        )}

        {/* --------------------------------------------------- Password field */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {isLogin && (
              <Link
                href="#"
                className="text-xs font-medium text-maroon-600 transition-colors hover:text-maroon-700 hover:underline"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Lock className="size-4" />
            </span>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder={isLogin ? "Enter your password" : "Create a password"}
              autoComplete={isLogin ? "current-password" : "new-password"}
              className="pl-10"
            />
          </div>
        </div>

        {/* --------------------------------------- Signup: city + login: remember */}
        {isLogin ? (
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft">
            <Checkbox id="remember" defaultChecked />
            Keep me signed in
          </label>
        ) : (
          <div className="flex flex-col gap-2">
            <Label htmlFor="city">City</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger id="city">
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent>
                {keralaLocations.map((loc) => (
                  <SelectItem key={loc.slug} value={loc.slug}>
                    {loc.city}, {loc.district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* --------------------------------------------------------- Error */}
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive"
          >
            {error}
          </p>
        )}

        {/* ------------------------------------------------------ Submit button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={submitting}
          className="mt-1 w-full"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {isLogin ? "Signing in…" : "Creating account…"}
            </>
          ) : (
            <>
              {isLogin ? "Sign in" : "Create account"}
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>

        {!isLogin && (
          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            By creating an account you agree to our{" "}
            <Link href="#" className="font-medium text-maroon-600 hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="#" className="font-medium text-maroon-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        )}
      </form>

      {/* --------------------------------------------------- Social (Google) */}
      {googleEnabled && (
        <>
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              or
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <Button
            variant="outline"
            type="button"
            onClick={handleGoogle}
            className="w-full"
          >
            <GoogleGlyph className="size-4" />
            {isLogin ? "Sign in with Google" : "Sign up with Google"}
          </Button>
        </>
      )}

      {/* ----------------------------------------------------------- Footer link */}
      <p className="text-center text-sm text-muted-foreground">
        {isLogin ? (
          <>
            New to Eventplus?{" "}
            <Link
              href="/signup"
              className="font-semibold text-maroon-700 transition-colors hover:text-maroon-600 hover:underline"
            >
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-maroon-700 transition-colors hover:text-maroon-600 hover:underline"
            >
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Local helper components                                           */
/* ------------------------------------------------------------------ */

function Field({
  id,
  label,
  icon,
  ...props
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <Input id={id} name={id} required className="pl-10" {...props} />
      </div>
    </div>
  );
}

function RoleOption({
  active,
  onClick,
  icon,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "group relative flex flex-col items-start gap-2 rounded-2xl border bg-card p-4 text-left transition-all duration-200",
        active
          ? "border-maroon-600 bg-maroon-50/60 shadow-soft ring-1 ring-maroon-600/30"
          : "border-border/70 hover:-translate-y-0.5 hover:border-maroon-300 hover:shadow-card"
      )}
    >
      <span
        className={cn(
          "grid size-10 place-items-center rounded-xl transition-colors",
          active
            ? "bg-maroon-600 text-cream-50"
            : "bg-cream-200 text-maroon-700 group-hover:bg-cream-300"
        )}
      >
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="font-serif text-base font-semibold text-ink">{title}</span>
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      </span>
      <span
        className={cn(
          "absolute right-3 top-3 grid size-5 place-items-center rounded-full border-2 transition-all",
          active
            ? "border-maroon-600 bg-maroon-600 text-cream-50"
            : "border-cream-400 text-transparent"
        )}
      >
        <Check className="size-3 stroke-[3]" />
      </span>
    </button>
  );
}
