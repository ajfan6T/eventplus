import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  size = "sm",
  className,
}: {
  value: number;
  count?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const starSize = size === "md" ? "size-4" : "size-3.5";
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="inline-flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = value >= i + 1;
          const half = !filled && value > i + 0.25;
          return (
            <Star
              key={i}
              className={cn(
                starSize,
                filled || half
                  ? "fill-gold-400 text-gold-500"
                  : "fill-cream-300 text-cream-300"
              )}
            />
          );
        })}
      </span>
      <span className="text-sm font-semibold text-ink">{value.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-sm text-muted-foreground">({count})</span>
      )}
    </span>
  );
}
