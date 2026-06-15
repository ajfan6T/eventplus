import Link from "next/link";
import { ArrowLeft, ShieldCheck, Sparkles, Wallet, Quote } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Mandala, Sparkle, KasavuDivider } from "@/components/decor/motifs";

const trustBullets = [
  {
    icon: ShieldCheck,
    title: "Verified vendors, only",
    description: "Every vendor is background-checked and reviewed by real Kerala families.",
  },
  {
    icon: Sparkles,
    title: "An AI co-planner",
    description: "Smart checklists and timelines tuned to your occasion and customs.",
  },
  {
    icon: Wallet,
    title: "Live budget tracking",
    description: "Watch every rupee in real time, with alerts before you go over.",
  },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-cream-50 lg:flex-row">
      {/* ------------------------------------------------ Brand panel (left) */}
      <aside className="relative hidden overflow-hidden bg-maroon-900 text-cream-100 lg:flex lg:w-[45%] lg:flex-col lg:justify-between">
        {/* gradient + motif backdrop */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(120% 90% at 85% -10%, rgb(201 162 39 / 0.22), transparent 55%), radial-gradient(90% 90% at 0% 110%, rgb(31 77 58 / 0.28), transparent 55%), linear-gradient(160deg, #2f0a16, #460f20 60%, #2f0a16)",
          }}
        />
        <Mandala className="pointer-events-none absolute -right-24 -top-24 size-[30rem] text-gold-500/15 animate-spin-slow" />
        <Mandala className="pointer-events-none absolute -left-28 bottom-12 size-80 text-maroon-600/30" />

        <div className="relative flex flex-col gap-3 p-12 xl:p-14">
          <Logo tone="light" />
        </div>

        <div className="relative flex flex-col gap-10 p-12 xl:p-14">
          <div className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-cream-50/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold-200 ring-1 ring-cream-50/10">
              <Sparkle className="size-3.5 text-gold-300" /> Kerala's joyful event planner
            </span>
            <h2 className="text-balance font-serif text-4xl font-semibold leading-[1.1] text-cream-50 xl:text-[2.75rem]">
              Every celebration deserves to feel{" "}
              <span className="text-gold-foil">effortless</span>.
            </h2>
            <p className="max-w-md text-pretty leading-relaxed text-cream-200/75">
              Join thousands of families and vendors planning kalyanams,
              gruhapravesams and more — verified, organised and joyful.
            </p>
          </div>

          <ul className="flex flex-col gap-5">
            {trustBullets.map((bullet) => (
              <li key={bullet.title} className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-500/15 text-gold-300 ring-1 ring-gold-400/20">
                  <bullet.icon className="size-5" />
                </span>
                <div>
                  <p className="font-medium text-cream-50">{bullet.title}</p>
                  <p className="text-sm leading-relaxed text-cream-200/70">
                    {bullet.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Mini testimonial */}
        <div className="relative p-12 pt-0 xl:p-14 xl:pt-0">
          <KasavuDivider className="mb-7 opacity-60" />
          <figure className="rounded-2xl border border-cream-200/10 bg-maroon-800/40 p-6 backdrop-blur">
            <Quote className="size-6 text-gold-400" />
            <blockquote className="mt-3 text-pretty leading-relaxed text-cream-100/90">
              “We planned our daughter's wedding across three districts without a
              single sleepless night. Eventplus kept every ritual, vendor and
              rupee in one calm place.”
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3 border-t border-cream-200/10 pt-4">
              <span className="grid size-10 place-items-center rounded-full bg-gold-500/20 font-semibold text-gold-200">
                AM
              </span>
              <div>
                <p className="text-sm font-semibold text-cream-50">Anjali Menon</p>
                <p className="text-xs text-cream-200/60">Kalyanam · Thrissur</p>
              </div>
            </figcaption>
          </figure>
        </div>
      </aside>

      {/* ------------------------------------------------ Content area (right) */}
      <main className="relative flex flex-1 flex-col bg-cream-50 bg-mandala">
        {/* Top bar: mobile logo + back link */}
        <div className="flex items-center justify-between p-6 sm:p-8">
          <div className="lg:hidden">
            <Logo />
          </div>
          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-maroon-700"
          >
            <ArrowLeft className="size-4" /> Back to home
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-16 sm:px-8">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </main>
    </div>
  );
}
