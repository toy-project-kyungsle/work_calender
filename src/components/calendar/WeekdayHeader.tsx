import { cn } from "@/lib/utils";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function WeekdayHeader() {
  return (
    <div
      role="row"
      className="mb-px grid grid-cols-7 gap-px bg-[var(--calendar-line)]"
    >
      {WEEKDAYS.map((day, index) => (
        <div
          key={day}
          role="columnheader"
          aria-label={["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"][index]}
          className={cn(
            "bg-[var(--calendar-paper)] py-2 text-center text-[10px] font-semibold tracking-[0.3em] text-[var(--calendar-muted)]",
            (index === 0 || index === 6) && "text-[var(--calendar-accent)]",
          )}
        >
          {day}
        </div>
      ))}
    </div>
  );
}
