import { TriangleAlert, Wallet } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Icon } from "@/components/icon";
import type { BudgetLine } from "@/lib/types";
import { formatINR, cn } from "@/lib/utils";

const statusMeta: Record<
  string,
  { label: string; badge: string; bar: string }
> = {
  "on-track": {
    label: "On track",
    badge: "bg-green-100 text-green-700",
    bar: "bg-gradient-to-r from-green-400 to-green-600",
  },
  over: {
    label: "Over budget",
    badge: "bg-destructive/10 text-destructive",
    bar: "bg-destructive",
  },
  unspent: {
    label: "Not started",
    badge: "bg-cream-200 text-ink-soft",
    bar: "bg-gradient-to-r from-gold-300 to-gold-500",
  },
};

export function BudgetTracker({
  totalBudget,
  budgetLines,
}: {
  totalBudget: number;
  budgetLines: BudgetLine[];
}) {
  const totalAllocated = budgetLines.reduce((sum, l) => sum + l.allocated, 0);
  const totalSpent = budgetLines.reduce((sum, l) => sum + l.spent, 0);
  const remaining = totalAllocated - totalSpent;
  const usedPct = Math.round((totalSpent / totalAllocated) * 100);
  const overLines = budgetLines.filter((l) => l.status === "over");

  return (
    <div className="rounded-2xl border border-border/70 bg-card shadow-card">
      {/* Header summary */}
      <div className="border-b border-border/60 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-maroon-900 shadow-soft">
              <Wallet className="size-5" />
            </span>
            <div>
              <h3 className="font-serif text-xl font-semibold text-ink">Budget tracker</h3>
              <p className="text-sm text-muted-foreground">
                Total budget {formatINR(totalBudget, { compact: true })} · live across{" "}
                {budgetLines.length} categories
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center sm:gap-4">
            <div className="rounded-xl bg-cream-100 px-3 py-2">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Allocated</p>
              <p className="font-serif text-sm font-semibold text-ink sm:text-base">
                {formatINR(totalAllocated, { compact: true })}
              </p>
            </div>
            <div className="rounded-xl bg-maroon-50 px-3 py-2">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Spent</p>
              <p className="font-serif text-sm font-semibold text-maroon-700 sm:text-base">
                {formatINR(totalSpent, { compact: true })}
              </p>
            </div>
            <div className="rounded-xl bg-green-50 px-3 py-2">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Remaining</p>
              <p className="font-serif text-sm font-semibold text-green-600 sm:text-base">
                {formatINR(remaining, { compact: true })}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="font-medium text-ink">{usedPct}% of total budget used</span>
            <span className="text-muted-foreground">
              {formatINR(totalSpent)} / {formatINR(totalAllocated)}
            </span>
          </div>
          <Progress value={usedPct} />
        </div>
      </div>

      {/* Over-budget alert */}
      {overLines.length > 0 && (
        <div className="mx-5 mt-5 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 sm:mx-6">
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-destructive" />
          <div className="text-sm">
            <p className="font-semibold text-destructive">
              {overLines.length === 1 ? `${overLines[0].category} is over budget` : "Some categories are over budget"}
            </p>
            <p className="mt-0.5 text-ink-soft">
              {overLines
                .map(
                  (l) =>
                    `${l.category} is ${formatINR(l.spent - l.allocated)} above its ${formatINR(
                      l.allocated,
                      { compact: true }
                    )} allocation`
                )
                .join(". ")}
              . Consider trimming elsewhere or topping up from your buffer.
            </p>
          </div>
        </div>
      )}

      {/* Line items */}
      <ul className="flex flex-col p-5 sm:p-6">
        {budgetLines.map((line, i) => {
          const meta = statusMeta[line.status];
          const pct = line.allocated > 0 ? Math.round((line.spent / line.allocated) * 100) : 0;
          const isOver = line.status === "over";
          return (
            <li
              key={line.category}
              className={cn(
                "flex flex-col gap-2.5 py-4",
                i !== 0 && "border-t border-border/50"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-xl",
                    isOver ? "bg-destructive/10 text-destructive" : "bg-cream-100 text-maroon-600"
                  )}
                >
                  <Icon name={line.icon} className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-ink">{line.category}</p>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                        meta.badge
                      )}
                    >
                      {meta.label}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p
                    className={cn(
                      "font-serif text-sm font-semibold",
                      isOver ? "text-destructive" : "text-ink"
                    )}
                  >
                    {formatINR(line.spent)}
                  </p>
                  <p className="text-xs text-muted-foreground">of {formatINR(line.allocated)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Progress
                  value={Math.min(100, pct)}
                  className="h-2"
                  indicatorClassName={meta.bar}
                />
                <span
                  className={cn(
                    "w-10 shrink-0 text-right text-xs font-semibold",
                    isOver ? "text-destructive" : "text-muted-foreground"
                  )}
                >
                  {pct}%
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
