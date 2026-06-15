import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-transparent bg-maroon-600 text-primary-foreground",
        gold: "border-gold-300 bg-gold-100 text-gold-800",
        green: "border-green-200 bg-green-100 text-green-700",
        maroon: "border-maroon-200 bg-maroon-50 text-maroon-700",
        outline: "border-border text-ink-soft",
        muted: "border-transparent bg-cream-200 text-ink-soft",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
