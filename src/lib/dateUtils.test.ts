import { describe, it, expect } from "vitest";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  getCalendarDays,
} from "./dateUtils";

describe("getDaysInMonth", () => {
  it("1월은 31일", () => {
    expect(getDaysInMonth(2025, 0)).toBe(31);
  });

  it("2월은 28일 (평년)", () => {
    expect(getDaysInMonth(2025, 1)).toBe(28);
  });

  it("2월은 29일 (윤년)", () => {
    expect(getDaysInMonth(2024, 1)).toBe(29);
  });
});

describe("getFirstDayOfMonth", () => {
  it("2025년 1월 1일은 수요일 (3)", () => {
    expect(getFirstDayOfMonth(2025, 0)).toBe(3);
  });
});

describe("getCalendarDays", () => {
  it("캘린더에 표시할 날짜 배열을 반환한다", () => {
    const days = getCalendarDays(2025, 0); // 2025년 1월

    // 최소 28일 + 앞뒤 여백
    expect(days.length).toBeGreaterThanOrEqual(28);

    // 배열의 각 요소는 Date 객체
    expect(days[0]).toBeInstanceOf(Date);
  });

  it("이전 달 날짜가 앞에 포함된다", () => {
    const days = getCalendarDays(2025, 0); // 2025년 1월 1일은 수요일

    // 수요일 시작이면 앞에 3일 (일, 월, 화)이 이전 달
    const firstDay = days[0];
    expect(firstDay.getMonth()).toBe(11); // 12월 (0-indexed)
    expect(firstDay.getFullYear()).toBe(2024);
  });
});
