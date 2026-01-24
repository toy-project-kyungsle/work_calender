const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function WeekdayHeader() {
  return (
    <div className="grid grid-cols-7 gap-1 mb-2">
      {WEEKDAYS.map((day, index) => (
        <div
          key={day}
          className={`text-center text-sm font-medium py-2 ${
            index === 0 ? "text-red-500" : index === 6 ? "text-blue-500" : "text-muted-foreground"
          }`}
        >
          {day}
        </div>
      ))}
    </div>
  );
}
