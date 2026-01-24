"use client";

import { useState } from "react";
import { MonthHeader } from "./MonthHeader";
import { WeekdayHeader } from "./WeekdayHeader";
import { DayCell } from "./DayCell";
import { getCalendarDays, isCurrentMonth as checkIsCurrentMonth, isSameDay } from "@/lib/dateUtils";
import { getMonthTheme } from "@/lib/themes";
import type { JournalEntry } from "@/types/journal";

interface CalendarProps {
  journals: JournalEntry[];
  onSelectDate?: (date: Date, journal?: JournalEntry) => void;
}

export function Calendar({ journals, onSelectDate }: CalendarProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const calendarDays = getCalendarDays(currentYear, currentMonth);
  const theme = getMonthTheme(currentMonth);

  // 날짜별 저널 매핑
  const journalMap = new Map<string, JournalEntry>();
  journals.forEach((journal) => {
    const key = `${journal.date.getFullYear()}-${journal.date.getMonth()}-${journal.date.getDate()}`;
    journalMap.set(key, journal);
  });

  const getJournalForDate = (date: Date): JournalEntry | undefined => {
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return journalMap.get(key);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (date: Date) => {
    const journal = getJournalForDate(date);
    onSelectDate?.(date, journal);
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto p-4 rounded-xl transition-colors duration-300"
      style={{ backgroundColor: theme.bg }}
    >
      {/* 네비게이션 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 rounded-lg border transition-colors hover:opacity-80"
          style={{ borderColor: theme.accent, color: theme.text }}
        >
          ← 이전
        </button>
        <MonthHeader year={currentYear} month={currentMonth} textColor={theme.text} />
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 rounded-lg border transition-colors hover:opacity-80"
          style={{ borderColor: theme.accent, color: theme.text }}
        >
          다음 →
        </button>
      </div>

      {/* 요일 헤더 */}
      <WeekdayHeader />

      {/* 캘린더 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          const journal = getJournalForDate(date);
          return (
            <DayCell
              key={index}
              date={date}
              isCurrentMonth={checkIsCurrentMonth(date, currentYear, currentMonth)}
              isToday={isSameDay(date, today)}
              hasJournal={!!journal}
              hasAfterSixContent={journal?.hasAfterSixContent}
              summary={journal?.nineToSix.slice(0, 50)}
              accentColor={theme.accent}
              onClick={() => handleDayClick(date)}
            />
          );
        })}
      </div>
    </div>
  );
}
