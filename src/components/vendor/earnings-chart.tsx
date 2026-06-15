import { TrendingUp, ArrowUpRight } from "lucide-react";
import { earningsByMonth } from "@/lib/data/vendor-dashboard";
import { formatINR } from "@/lib/utils";

const breakdown = [
  { label: "Weddings", pct: 58, tone: "bg-maroon-600" },
  { label: "Housewarmings", pct: 22, tone: "bg-gold-500" },
  { label: "Birthdays & showers", pct: 14, tone: "bg-green-500" },
  { label: "Corporate", pct: 6, tone: "bg-maroon-300" },
];

export function EarningsChart() {
  const max = Math.max(...earningsByMonth.map((m) => m.value));
  const total = earningsByMonth.reduce((sum, m) => sum + m.value, 0);
  const avg = Math.round(total / earningsByMonth.length);

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-card sm:p-7">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
            Last 6 months
          </p>
          <p className="mt-1.5 font-serif text-3xl font-semibold text-ink">
            {formatINR(total, { compact: true })}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Avg {formatINR(avg, { compact: true })} / month
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
          <TrendingUp className="size-4" /> +18% vs last period
        </span>
      </div>

      {/* Bars */}
      <div className="mt-7 flex h-52 items-end justify-between gap-3 sm:gap-4">
        {earningsByMonth.map((m, i) => {
          const heightPct = Math.round((m.value / max) * 100);
          const isPeak = m.value === max;
          const isLast = i === earningsByMonth.length - 1;
          return (
            <div key={m.month} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
              {/* value label */}
              <span
                className={`text-xs font-semibold transition-colors ${
                  isLast ? "text-maroon-700" : "text-muted-foreground group-hover:text-ink"
                }`}
              >
                {formatINR(m.value, { compact: true })}
              </span>
              {/* bar track + fill */}
              <div className="flex w-full max-w-12 flex-1 items-end rounded-t-lg bg-cream-100">
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    isLast
                      ? "bg-gradient-to-t from-maroon-700 to-maroon-500"
                      : isPeak
                        ? "bg-gradient-to-t from-gold-600 to-gold-400"
                        : "bg-gradient-to-t from-gold-500/80 to-gold-300/80 group-hover:from-gold-600 group-hover:to-gold-400"
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <span className="text-xs font-medium text-ink-soft">{m.month}</span>
            </div>
          );
        })}
      </div>

      <div className="gold-rule my-6" />

      {/* Revenue breakdown */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold-700">
          Revenue by category
        </p>
        {/* stacked bar */}
        <div className="flex h-3 w-full overflow-hidden rounded-full">
          {breakdown.map((b) => (
            <div key={b.label} className={b.tone} style={{ width: `${b.pct}%` }} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-4">
          {breakdown.map((b) => (
            <div key={b.label} className="flex items-center gap-2 text-sm">
              <span className={`size-2.5 shrink-0 rounded-full ${b.tone}`} />
              <span className="flex-1 truncate text-ink-soft">{b.label}</span>
              <span className="font-semibold text-ink">{b.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payout note */}
      <div className="mt-6 flex items-center justify-between rounded-2xl bg-cream-100 px-4 py-3.5">
        <div>
          <p className="text-sm font-medium text-ink">Next payout</p>
          <p className="text-xs text-muted-foreground">Settles to your account on 1 Jul</p>
        </div>
        <p className="inline-flex items-center gap-1 font-serif text-lg font-semibold text-green-700">
          {formatINR(86000, { compact: true })}
          <ArrowUpRight className="size-4" />
        </p>
      </div>
    </div>
  );
}
