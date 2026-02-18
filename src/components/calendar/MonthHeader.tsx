interface MonthHeaderProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
  onToday?: () => void;
  isCurrentMonth?: boolean;
  journalCount?: number;
  growthCount?: number;
}

const MONTH_NAMES = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May.",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];

export function MonthHeader({
  year,
  month,
  onPrev,
  onNext,
  onToday,
  isCurrentMonth,
  journalCount,
  growthCount,
}: MonthHeaderProps) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <div className="text-[10px] font-semibold tracking-[0.5em] text-[var(--calendar-muted)]">
          WORK CALENDAR
        </div>
        <h2 className="mt-3 flex items-baseline gap-3 font-display text-[var(--calendar-accent)]">
          <span className="text-6xl font-black leading-none">{month + 1}</span>
          <span className="text-5xl font-bold leading-none">
            {MONTH_NAMES[month]}
          </span>
        </h2>
        <div className="mt-2 text-xs font-semibold tracking-[0.4em] text-[var(--calendar-muted)]">
          {year}
        </div>

        {/* 월간 통계 요약 */}
        {(journalCount !== undefined && journalCount > 0) && (
          <div className="mt-3 flex items-center gap-3 text-[10px] font-medium text-[var(--calendar-muted)]">
            <span>
              <span className="font-bold text-[var(--calendar-accent)]">{journalCount}</span>
              {" "}일지
            </span>
            {growthCount !== undefined && growthCount > 0 && (
              <span>
                <span className="font-bold text-[var(--calendar-accent)]">{growthCount}</span>
                {" "}🔥
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 pb-1">
        {/* TODAY 버튼: 현재 월이 아닐 때만 표시 */}
        {!isCurrentMonth && onToday && (
          <button
            type="button"
            onClick={onToday}
            aria-label="오늘로 이동"
            className="flex h-11 items-center justify-center px-3 border border-[var(--calendar-accent)] text-[var(--calendar-accent)] text-[10px] font-bold tracking-[0.2em] transition-colors hover:bg-[var(--calendar-accent)] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--calendar-accent)]"
          >
            TODAY
          </button>
        )}
        <button
          type="button"
          onClick={onPrev}
          aria-label="이전 달"
          className="flex h-11 w-11 items-center justify-center border border-[var(--calendar-line)] text-[var(--calendar-text)] text-xs font-semibold transition-colors hover:bg-[var(--calendar-paper-muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--calendar-accent)]"
        >
          &lt;
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="다음 달"
          className="flex h-11 w-11 items-center justify-center border border-[var(--calendar-line)] text-[var(--calendar-text)] text-xs font-semibold transition-colors hover:bg-[var(--calendar-paper-muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--calendar-accent)]"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
