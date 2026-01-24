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
        "relative min-h-24 p-2 rounded-lg border transition-colors text-left",
        "hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20",
        isCurrentMonth ? "bg-background" : "bg-muted/30",
        !hasJournal && "cursor-default opacity-60",
        hasJournal && "cursor-pointer hover:bg-accent/50",
        isToday && "ring-2 ring-primary"
      )}
    >
      {/* 날짜 번호 */}
      <div className="flex items-center justify-between mb-1">
        <span
          className={cn(
            "text-sm font-medium",
            !isCurrentMonth && "text-muted-foreground",
            isSunday && isCurrentMonth && "text-red-500",
            isSaturday && isCurrentMonth && "text-blue-500"
          )}
        >
          {date.getDate()}
        </span>
        {/* 6시 이후 활동 이모지 */}
        {hasAfterSixContent && <span className="text-sm">🔥</span>}
      </div>

      {/* 요약 텍스트 */}
      {summary && (
        <p className="text-xs text-muted-foreground line-clamp-3">{summary}</p>
      )}
    </button>
  );
}
