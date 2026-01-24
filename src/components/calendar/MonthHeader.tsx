import { getCalendarDays, isCurrentMonth, isSameDay } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";

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

const MINI_WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function MiniCalendar({ year, month }: { year: number; month: number }) {
  const days = getCalendarDays(year, month);
  const today = new Date();

  return (
    <div className="w-28">
      <div className="grid grid-cols-7 gap-px bg-[var(--calendar-line)]">
        {MINI_WEEKDAYS.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className="bg-[var(--calendar-paper)] py-1 text-center text-[9px] font-semibold text-[var(--calendar-muted)]"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-px bg-[var(--calendar-line)]">
        {days.map((date, index) => {
          const inMonth = isCurrentMonth(date, year, month);
          const isToday = isSameDay(date, today);

          return (
            <div
              key={`${date.toISOString()}-${index}`}
              className={cn(
                "bg-[var(--calendar-paper)] py-1 text-center text-[9px] leading-4",
                inMonth ? "text-[var(--calendar-text)]" : "text-[var(--calendar-muted)]",
                isToday && "font-semibold text-[var(--calendar-accent)]"
              )}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MonthHeader({ year, month, onPrev, onNext }: MonthHeaderProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="text-[10px] font-semibold tracking-[0.5em] text-[var(--calendar-muted)]">
          WORK CALENDAR
        </div>
        <h2 className="mt-3 font-display text-5xl leading-none text-[var(--calendar-accent)]">
          {month + 1} {MONTH_NAMES[month]}
        </h2>
        <div className="mt-2 text-xs font-semibold tracking-[0.4em] text-[var(--calendar-muted)]">
          {year}
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous month"
            className="h-8 w-8 border border-[var(--calendar-line)] text-[var(--calendar-text)] text-xs font-semibold transition-colors hover:bg-[var(--calendar-paper-muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--calendar-accent)]"
          >
            &lt;
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next month"
            className="h-8 w-8 border border-[var(--calendar-line)] text-[var(--calendar-text)] text-xs font-semibold transition-colors hover:bg-[var(--calendar-paper-muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--calendar-accent)]"
          >
            &gt;
          </button>
        </div>
        <div className="hidden md:block">
          <MiniCalendar year={year} month={month} />
        </div>
      </div>
    </div>
  );
}
