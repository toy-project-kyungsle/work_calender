/**
 * 해당 월의 일수를 반환합니다.
 * @param year - 연도
 * @param month - 월 (0-indexed, 0 = 1월)
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * 해당 월 1일의 요일을 반환합니다.
 * @param year - 연도
 * @param month - 월 (0-indexed, 0 = 1월)
 * @returns 0 = 일요일, 1 = 월요일, ..., 6 = 토요일
 */
export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * 캘린더에 표시할 날짜 배열을 생성합니다.
 * 이전 달 마지막 주, 해당 월, 다음 달 첫 주를 포함합니다.
 * @param year - 연도
 * @param month - 월 (0-indexed)
 */
export function getCalendarDays(year: number, month: number): Date[] {
  const days: Date[] = [];

  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(
    month === 0 ? year - 1 : year,
    month === 0 ? 11 : month - 1
  );

  // 이전 달 날짜 추가 (일요일부터 시작하도록)
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    days.push(new Date(prevYear, prevMonth, daysInPrevMonth - i));
  }

  // 현재 달 날짜 추가
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  // 다음 달 날짜 추가 (6주 채우기 - 42일)
  const remainingDays = 42 - days.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  for (let day = 1; day <= remainingDays; day++) {
    days.push(new Date(nextYear, nextMonth, day));
  }

  return days;
}

/**
 * 날짜가 해당 월에 속하는지 확인합니다.
 */
export function isCurrentMonth(date: Date, year: number, month: number): boolean {
  return date.getFullYear() === year && date.getMonth() === month;
}

/**
 * 두 날짜가 같은 날인지 확인합니다.
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * 날짜를 YYYY-MM-DD 형식 문자열로 변환합니다.
 */
export function formatDateToFileName(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}.md`;
}
