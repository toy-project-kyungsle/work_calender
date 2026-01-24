const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function WeekdayHeader() {
  return (
    <div className="grid grid-cols-7 gap-px bg-[var(--calendar-line)] mb-2">
      {WEEKDAYS.map((day, index) => (
        <div
          key={day}
          className={`bg-[var(--calendar-paper)] py-2 text-center text-[10px] font-semibold tracking-[0.3em] text-[var(--calendar-muted)] ${
            index === 0 || index === 6 ? "text-[var(--calendar-accent)]" : ""
          }`}
        >
          {day}
        </div>
      ))}
    </div>
  );
}
