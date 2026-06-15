import Link from "next/link";
import { Diya } from "@/components/decor/motifs";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
  tone = "default",
}: {
  className?: string;
  href?: string;
  tone?: "default" | "light";
}) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="Eventplus home"
    >
      <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-maroon-600 to-maroon-800 shadow-soft transition-transform group-hover:scale-105">
        <Diya className="size-6 text-gold-300" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-xl font-semibold tracking-tight",
            tone === "light" ? "text-cream-50" : "text-ink"
          )}
        >
          Event<span className="text-maroon-600">plus</span>
        </span>
        <span
          className={cn(
            "text-[10px] font-medium uppercase tracking-[0.22em]",
            tone === "light" ? "text-cream-200/80" : "text-gold-700"
          )}
        >
          Kerala
        </span>
      </span>
    </Link>
  );
}
