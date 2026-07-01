import { Mandala } from "@/components/decor/motifs";
import { cn } from "@/lib/utils";

const palette = [
  ["#7b1e3b", "#9a2f50", "#c9a227"],
  ["#1f4d3a", "#2c6044", "#d4b246"],
  ["#b8476a", "#d97c92", "#74ab8a"],
  ["#a9851c", "#c9a227", "#1f4d3a"],
  ["#5f162d", "#a9851c", "#3f7d5c"],
  ["#2b1a1e", "#7b1e3b", "#c9a227"],
  ["#d97c92", "#e3c766", "#74ab8a"],
  ["#2c6044", "#3f7d5c", "#d4b246"],
];

const angles = [120, 145, 160, 200, 220, 250, 300, 330];

function fromSeed(seed: number): { colors: string[]; angle: number } {
  return {
    colors: palette[seed % palette.length],
    angle: angles[(seed * 3) % angles.length],
  };
}

/**
 * A self-contained "photo" surface: a layered brand gradient with a subtle
 * mandala watermark and grain. Looks polished without external image assets.
 */
export function GradientVisual({
  seed = 1,
  gradient,
  image,
  className,
  withMandala = true,
  children,
  overlay = true,
}: {
  seed?: number;
  gradient?: [string, string, string];
  /** A real uploaded cover photo (data URL). When present, this replaces the gradient. */
  image?: string | null;
  className?: string;
  withMandala?: boolean;
  overlay?: boolean;
  children?: React.ReactNode;
}) {
  const { colors, angle } = gradient
    ? { colors: gradient, angle: 150 }
    : fromSeed(seed);

  if (image) {
    return (
      <div className={cn("relative overflow-hidden bg-cream-200", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element -- user-uploaded data URL, not an optimizable asset */}
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        {overlay && (
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-maroon-900/60 to-transparent" />
        )}
        {children && <div className="relative h-full w-full">{children}</div>}
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden bg-cream-200", className)}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]} 55%, ${colors[2]})`,
      }}
    >
      {/* soft light source */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 80% -10%, rgba(255,255,255,0.28), transparent 55%)",
        }}
      />
      {withMandala && (
        <Mandala className="absolute -right-8 -top-10 size-48 text-cream-50/25" />
      )}
      <div
        className="absolute inset-0 mix-blend-soft-light opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.5) 0.5px, transparent 0.5px)",
          backgroundSize: "8px 8px",
        }}
      />
      {overlay && (
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-maroon-900/55 to-transparent" />
      )}
      {children && <div className="relative h-full w-full">{children}</div>}
    </div>
  );
}
