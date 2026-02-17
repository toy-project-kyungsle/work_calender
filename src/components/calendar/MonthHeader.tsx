interface MonthHeaderProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
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

export function MonthHeader({ year, month, onPrev, onNext }: MonthHeaderProps) {
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
      </div>

      <div className="flex items-center gap-1.5 pb-1">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous month"
          className="flex h-8 w-8 items-center justify-center border border-[var(--calendar-line)] text-[var(--calendar-text)] text-xs font-semibold transition-colors hover:bg-[var(--calendar-paper-muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--calendar-accent)]"
        >
          &lt;
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next month"
          className="flex h-8 w-8 items-center justify-center border border-[var(--calendar-line)] text-[var(--calendar-text)] text-xs font-semibold transition-colors hover:bg-[var(--calendar-paper-muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--calendar-accent)]"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
