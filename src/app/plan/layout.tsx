import Link from "next/link";
import { Store } from "lucide-react";
import { Logo } from "@/components/brand/logo";

export default function PlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-festive bg-mandala">
      {/* Slim focused top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-cream-50/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Logo />
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/vendors"
              className="hidden items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-maroon-700 sm:inline-flex"
            >
              <Store className="size-4" /> Need help? Browse vendors
            </Link>
            <Link
              href="/"
              className="rounded-full border border-maroon-600/25 px-4 py-1.5 text-sm font-medium text-maroon-700 transition-colors hover:bg-maroon-50"
            >
              Save &amp; exit
            </Link>
          </div>
        </div>
      </header>

      {/* Centered focused canvas */}
      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-8 sm:px-8 sm:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
