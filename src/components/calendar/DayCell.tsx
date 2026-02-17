import { cn } from "@/lib/utils";

interface DayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday?: boolean;
  hasJournal?: boolean;
  hasGrowthContent?: boolean;
  summary?: string;
  onClick?: () => void;
}

export function DayCell({
  date,
  isCurrentMonth,
  isToday,
  hasJournal,
  hasGrowthContent,
  summary,
  onClick,
}: DayCellProps) {
  const dayOfWeek = date.getDay();
  const isSunday = dayOfWeek === 0;
  const isSaturday = dayOfWeek === 6;

  return (
    <button
      onClick={onClick}
      disabled={!hasJournal}
      className={cn(
        "relative min-h-16 p-1.5 text-left transition-colors md:min-h-24 md:p-2.5",
        "bg-[var(--calendar-paper)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[var(--calendar-accent)]",
        isCurrentMonth
          ? "text-[var(--calendar-text)]"
          : "bg-[var(--calendar-paper-muted)] text-[var(--calendar-muted)]",
        !hasJournal && "cursor-default opacity-60",
        hasJournal && "cursor-pointer hover:bg-[var(--calendar-paper-muted)]",
        isToday &&
          "ring-1 ring-inset ring-[var(--calendar-accent)]",
      )}
    >
      <div className="mb-1 flex items-center justify-between">
        <span
          className={cn(
            "font-display text-lg leading-none",
            !isCurrentMonth && "text-[var(--calendar-muted)]",
            (isSunday || isSaturday) &&
              isCurrentMonth &&
              "text-[var(--calendar-accent)]",
          )}
        >
          {date.getDate()}
        </span>
        {hasGrowthContent && (
          <span className="text-[8px] leading-none" aria-label="After-hours activity">
            🔥
          </span>
        )}
      </div>

      {summary && (
        <p className="hidden text-[10px] leading-relaxed text-[var(--calendar-muted)] line-clamp-3 md:block">
          {summary}
        </p>
      )}

      {hasJournal && !summary && (
        <span className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[var(--calendar-accent)] opacity-70" />
      )}
    </button>
  );
}
