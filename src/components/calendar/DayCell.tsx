import { cn } from "@/lib/utils";

interface DayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday?: boolean;
  hasJournal?: boolean;
  hasAfterSixContent?: boolean;
  summary?: string;
  onClick?: () => void;
}

export function DayCell({
  date,
  isCurrentMonth,
  isToday,
  hasJournal,
  hasAfterSixContent,
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
        "relative min-h-16 p-1.5 text-left transition-colors md:min-h-24 md:p-2",
        "bg-[var(--calendar-paper)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--calendar-accent)]",
        isCurrentMonth ? "text-[var(--calendar-text)]" : "text-[var(--calendar-muted)] bg-[var(--calendar-paper-muted)]",
        !hasJournal && "cursor-default opacity-70",
        hasJournal && "cursor-pointer hover:bg-[var(--calendar-paper-muted)]",
        isToday && "outline outline-1 outline-[var(--calendar-accent)]"
      )}
    >
      {/* 날짜 번호 */}
      <div className="flex items-center justify-between mb-2">
        <span
          className={cn(
            "font-display text-lg leading-none",
            !isCurrentMonth && "text-[var(--calendar-muted)]",
            isSunday && isCurrentMonth && "text-[var(--calendar-accent)]",
            isSaturday && isCurrentMonth && "text-[var(--calendar-accent)]"
          )}
        >
          {date.getDate()}
        </span>
        {/* 6시 이후 활동 이모지 */}
        {hasAfterSixContent && (
          <span className="text-[9px] font-semibold tracking-[0.2em] text-[var(--calendar-accent)]">
            PM
          </span>
        )}
      </div>

      {/* 요약 텍스트 */}
      {summary && (
        <p className="text-[10px] leading-4 text-[var(--calendar-muted)] line-clamp-3">
          {summary}
        </p>
      )}

      {hasJournal && !summary && (
        <span className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-[var(--calendar-accent)] opacity-80" />
      )}
    </button>
  );
}
