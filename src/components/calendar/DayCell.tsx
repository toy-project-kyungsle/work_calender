import { cn } from "@/lib/utils";

interface DayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday?: boolean;
  hasJournal?: boolean;
  hasGrowthContent?: boolean;
  isSelected?: boolean;
  summary?: string;
  onClick?: () => void;
}

export function DayCell({
  date,
  isCurrentMonth,
  isToday,
  hasJournal,
  hasGrowthContent,
  isSelected,
  summary,
  onClick,
}: DayCellProps) {
  const dayOfWeek = date.getDay();
  const isSunday = dayOfWeek === 0;
  const isSaturday = dayOfWeek === 6;
  const dayNumber = date.getDate();

  const baseClasses = cn(
    "relative min-h-16 p-1.5 text-left transition-colors md:min-h-24 md:p-2.5",
    "bg-[var(--calendar-paper)]",
    isCurrentMonth
      ? "text-[var(--calendar-text)]"
      : "bg-[var(--calendar-paper-muted)] text-[var(--calendar-muted)]",
    isSelected && hasJournal && "bg-[var(--calendar-paper-muted)]",
  );

  const dateNumberClasses = cn(
    "font-display text-lg leading-none",
    !isCurrentMonth && "text-[var(--calendar-muted)]",
    (isSunday || isSaturday) && isCurrentMonth && "text-[var(--calendar-accent)]",
  );

  const innerContent = (
    <>
      <div className="mb-1 flex items-center justify-between">
        {/* 오늘 날짜: accent 배경원으로 강조 */}
        {isToday ? (
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold leading-none text-white"
            style={{ backgroundColor: "var(--calendar-accent)" }}
            aria-label="오늘"
          >
            {dayNumber}
          </span>
        ) : (
          <span className={dateNumberClasses}>
            {dayNumber}
          </span>
        )}
        {hasGrowthContent && (
          <span
            className="text-xs leading-none"
            aria-label="개인 공부 완료"
            style={{ fontSize: "13px" }}
          >
            🔥
          </span>
        )}
      </div>

      {/* 모바일: 1줄 요약, 태블릿/데스크톱: 3줄 요약 */}
      {summary && (
        <p className="text-[10px] leading-relaxed text-[var(--calendar-muted)] line-clamp-1 md:line-clamp-3">
          {summary}
        </p>
      )}

      {/* 요약 없이 일지만 있는 경우 작은 점 표시 */}
      {hasJournal && !summary && (
        <span
          className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[var(--calendar-accent)] opacity-70"
          aria-hidden="true"
        />
      )}
    </>
  );

  // 일지가 있는 날짜만 button, 없는 날짜는 div (불필요한 탭 순서 방지)
  if (hasJournal) {
    return (
      <button
        onClick={onClick}
        aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${dayNumber}일 일지 보기`}
        aria-pressed={isSelected}
        className={cn(
          baseClasses,
          "cursor-pointer hover:bg-[var(--calendar-paper-muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[var(--calendar-accent)]",
        )}
      >
        {innerContent}
      </button>
    );
  }

  return (
    <div
      className={cn(baseClasses)}
      aria-hidden={!isCurrentMonth}
    >
      {innerContent}
    </div>
  );
}
