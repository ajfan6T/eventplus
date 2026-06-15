import { cn } from "@/lib/utils";

/** Concentric petal mandala — used as a watermark / backdrop. */
export function Mandala({ className }: { className?: string }) {
  const petals = Array.from({ length: 16 });
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("text-gold-500", className)}
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.9">
        <circle cx="100" cy="100" r="22" />
        <circle cx="100" cy="100" r="40" strokeDasharray="2 4" />
        <circle cx="100" cy="100" r="92" strokeDasharray="1 5" />
        {petals.map((_, i) => (
          <g key={i} transform={`rotate(${(360 / petals.length) * i} 100 100)`}>
            <path d="M100 8 C112 34 112 52 100 70 C88 52 88 34 100 8 Z" />
            <circle cx="100" cy="78" r="2.4" fill="currentColor" />
          </g>
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={`inner-${i}`} transform={`rotate(${(360 / 8) * i + 22.5} 100 100)`}>
            <path d="M100 44 C107 58 107 66 100 78 C93 66 93 58 100 44 Z" opacity="0.7" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Traditional nilavilakku (lamp) with a flame — the Eventplus brand mark. */
export function Diya({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      {/* flame */}
      <path
        d="M24 5c2.6 3.4 4.2 6.2 4.2 9.1 0 2.7-1.9 4.7-4.2 4.7s-4.2-2-4.2-4.7C19.8 11.2 21.4 8.4 24 5Z"
        fill="url(#flame)"
      />
      {/* lamp bowl */}
      <path
        d="M9 26c0 0 5 5 15 5s15-5 15-5c0 0-1.6 6.5-15 6.5S9 26 9 26Z"
        fill="currentColor"
      />
      <path d="M23 19h2v7h-2z" fill="currentColor" />
      {/* stem + base tiers */}
      <rect x="22" y="32" width="4" height="6" rx="1" fill="currentColor" />
      <path d="M15 39h18l-2.5 4h-13L15 39Z" fill="currentColor" />
      <ellipse cx="24" cy="44" rx="11" ry="2" fill="currentColor" opacity="0.85" />
      <defs>
        <linearGradient id="flame" x1="24" y1="5" x2="24" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0d98c" />
          <stop offset="0.55" stopColor="#d4b246" />
          <stop offset="1" stopColor="#a9851c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** A small four-point sparkle. */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0c.6 6 .6 6 12 12-11.4 6-11.4 6-12 12-.6-6-.6-6-12-12C11.4 6 11.4 6 12 0Z" />
    </svg>
  );
}

/** Ornate floral corner flourish. */
export function FloralCorner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M2 2 C40 6 60 26 64 64" />
        <path d="M2 2 C6 40 26 60 64 64" />
        <path d="M64 64 c10 -2 18 4 18 14 c-10 0 -16 -6 -18 -14Z" fill="currentColor" fillOpacity="0.15" />
        <path d="M30 8 c8 2 12 8 12 16 c-8 -2 -12 -8 -12 -16Z" fill="currentColor" fillOpacity="0.15" />
        <path d="M8 30 c2 8 8 12 16 12 c-2 -8 -8 -12 -16 -12Z" fill="currentColor" fillOpacity="0.15" />
        <circle cx="64" cy="64" r="3" fill="currentColor" />
      </g>
    </svg>
  );
}

/** Horizontal kasavu (gold-bordered) divider with a centred diamond. */
export function KasavuDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400 sm:w-28" />
      <Sparkle className="size-3.5 text-gold-500" />
      <span className="size-2 rotate-45 bg-gold-500" />
      <Sparkle className="size-3.5 text-gold-500" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400 sm:w-28" />
    </div>
  );
}
