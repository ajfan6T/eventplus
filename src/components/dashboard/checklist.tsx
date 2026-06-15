"use client";

import { useMemo, useState } from "react";
import { Check, Sparkles, CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Icon } from "@/components/icon";
import { checklistTasks } from "@/lib/data/planner";
import { cn } from "@/lib/utils";

/** Map each task's category to a lucide icon name resolvable by <Icon />. */
const categoryIcon: Record<string, string> = {
  general: "ListChecks",
  venues: "Building2",
  catering: "UtensilsCrossed",
  photography: "Camera",
  decor: "Flower2",
  makeup: "Sparkles",
  mehendi: "Sparkles",
  music: "Music",
  invitations: "Mail",
  transport: "Car",
  planning: "CalendarCheck",
};

export function Checklist() {
  // Seed local "done" state from the data; toggling is purely client-side.
  const [done, setDone] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(checklistTasks.map((t) => [t.id, t.done]))
  );

  const toggle = (id: string) =>
    setDone((prev) => ({ ...prev, [id]: !prev[id] }));

  const completed = useMemo(
    () => checklistTasks.filter((t) => done[t.id]).length,
    [done]
  );
  const total = checklistTasks.length;
  const pct = Math.round((completed / total) * 100);

  // Preserve the phase order as authored in the data.
  const phases = useMemo(() => {
    const order: string[] = [];
    const grouped: Record<string, typeof checklistTasks> = {};
    for (const task of checklistTasks) {
      if (!grouped[task.phase]) {
        grouped[task.phase] = [];
        order.push(task.phase);
      }
      grouped[task.phase].push(task);
    }
    return order.map((phase) => ({ phase, tasks: grouped[phase] }));
  }, []);

  return (
    <div className="rounded-2xl border border-border/70 bg-card shadow-card">
      {/* Header + overall progress */}
      <div className="flex flex-col gap-4 border-b border-border/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h3 className="font-serif text-xl font-semibold text-ink">Your wedding checklist</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {completed} of {total} tasks done · auto-built for a Kerala kalyanam
          </p>
        </div>
        <div className="w-full max-w-xs">
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="font-medium text-ink">{pct}% complete</span>
            <span className="text-muted-foreground">{total - completed} left</span>
          </div>
          <Progress value={pct} indicatorClassName="bg-gradient-to-r from-green-400 to-green-600" />
        </div>
      </div>

      {/* Phases */}
      <div className="flex flex-col">
        {phases.map(({ phase, tasks }, i) => (
          <div
            key={phase}
            className={cn("px-5 py-4 sm:px-6", i !== 0 && "border-t border-border/50")}
          >
            <div className="mb-2 flex items-center gap-2">
              <CalendarClock className="size-3.5 text-gold-600" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-700">
                {phase}
              </span>
            </div>
            <ul className="flex flex-col gap-1.5">
              {tasks.map((task) => {
                const isDone = done[task.id];
                return (
                  <li key={task.id}>
                    <button
                      type="button"
                      onClick={() => toggle(task.id)}
                      aria-pressed={isDone}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors",
                        isDone
                          ? "border-green-100 bg-green-50/60"
                          : "border-border/60 bg-cream-50 hover:border-maroon-200 hover:bg-cream-100"
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-6 shrink-0 place-items-center rounded-md border-2 transition-colors",
                          isDone
                            ? "border-green-600 bg-green-600 text-cream-50"
                            : "border-cream-400 group-hover:border-maroon-400"
                        )}
                      >
                        {isDone && <Check className="size-3.5 stroke-[3]" />}
                      </span>

                      <span
                        className={cn(
                          "grid size-8 shrink-0 place-items-center rounded-lg",
                          isDone
                            ? "bg-green-100 text-green-600"
                            : "bg-cream-100 text-maroon-600"
                        )}
                      >
                        <Icon name={categoryIcon[task.category] ?? "ListChecks"} className="size-4" />
                      </span>

                      <span
                        className={cn(
                          "flex-1 text-sm",
                          isDone ? "text-muted-foreground line-through" : "text-ink"
                        )}
                      >
                        {task.title}
                      </span>

                      {task.aiSuggested && (
                        <Badge variant="gold" className="hidden shrink-0 gap-1 px-2 py-0.5 text-[10px] sm:inline-flex">
                          <Sparkles className="size-2.5" /> AI
                        </Badge>
                      )}

                      <span
                        className={cn(
                          "shrink-0 text-xs font-medium",
                          isDone
                            ? "text-green-600"
                            : task.dueLabel.includes("6 days")
                              ? "text-maroon-600"
                              : "text-muted-foreground"
                        )}
                      >
                        {isDone ? "Done" : task.dueLabel}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
