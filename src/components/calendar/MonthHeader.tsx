interface MonthHeaderProps {
  year: number;
  month: number;
}

const MONTH_NAMES = [
  "1월", "2월", "3월", "4월", "5월", "6월",
  "7월", "8월", "9월", "10월", "11월", "12월",
];

export function MonthHeader({ year, month }: MonthHeaderProps) {
  return (
    <div className="text-center mb-4">
      <h2 className="text-2xl font-bold">
        {year}년 {MONTH_NAMES[month]}
      </h2>
    </div>
  );
}
