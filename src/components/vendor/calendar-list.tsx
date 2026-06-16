import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CalendarBooking } from "@/lib/types";
import { formatINR } from "@/lib/utils";

const typeMeta: Record<
  CalendarBooking["type"],
  { label: string; badge: "green" | "gold" | "outline"; dot: string }
> = {
  booked: { label: "Confirmed", badge: "green", dot: "bg-green-500" },
  hold: { label: "On hold", badge: "gold", dot: "bg-gold-500" },
  inquiry: { label: "Enquiry", badge: "outline", dot: "bg-maroon-300" },
};

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return {
    day: d.toLocaleDateString("en-IN", { day: "2-digit" }),
    month: d.toLocaleDateString("en-IN", { month: "short" }),
    weekday: d.toLocaleDateString("en-IN", { weekday: "short" }),
  };
}

export function CalendarList({
  calendarBookings,
}: {
  calendarBookings: CalendarBooking[];
}) {
  const sorted = [...calendarBookings].sort(
    (a, b) => +new Date(a.date) - +new Date(b.date),
  );
  const confirmedValue = sorted
    .filter((b) => b.type === "booked" || b.type === "hold")
    .reduce((sum, b) => sum + b.value, 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card">
      {/* Month-ish header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-cream-100/70 px-6 py-4">
        <div className="inline-flex items-center gap-2.5">
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-maroon-600 to-maroon-800 text-cream-50 shadow-soft">
            <CalendarDays className="size-5" />
          </span>
          <div>
            <p className="font-serif text-lg font-semibold text-ink">Upcoming bookings</p>
            <p className="text-xs text-muted-foreground">
              {sorted.length} dates · {formatINR(confirmedValue, { compact: true })} held value
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {Object.entries(typeMeta).map(([key, meta]) => (
            <span key={key} className="inline-flex items-center gap-1.5 text-xs text-ink-soft">
              <span className={`size-2 rounded-full ${meta.dot}`} /> {meta.label}
            </span>
          ))}
        </div>
      </div>

      {/* List */}
      <ul className="divide-y divide-border/50">
        {sorted.map((booking) => {
          const meta = typeMeta[booking.type];
          const { day, month, weekday } = formatDate(booking.date);
          return (
            <li
              key={booking.id}
              className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-cream-100/60"
            >
              {/* date chip */}
              <div className="flex w-14 shrink-0 flex-col items-center rounded-xl border border-border/60 bg-cream-50 py-1.5">
                <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  {month}
                </span>
                <span className="font-serif text-xl font-semibold leading-none text-maroon-700">
                  {day}
                </span>
                <span className="text-[10px] text-muted-foreground">{weekday}</span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-ink">{booking.title}</p>
                <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" /> Kerala
                  <span className="text-cream-400">·</span>
                  {formatINR(booking.value)}
                </p>
              </div>

              <Badge variant={meta.badge} className="shrink-0">
                <span className={`size-1.5 rounded-full ${meta.dot}`} /> {meta.label}
              </Badge>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
