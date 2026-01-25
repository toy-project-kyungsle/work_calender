"use client";

import { useState, useEffect, useCallback } from "react";
import { MonthHeader } from "./MonthHeader";
import { WeekdayHeader } from "./WeekdayHeader";
import { DayCell } from "./DayCell";
import {
  getCalendarDays,
  isCurrentMonth as checkIsCurrentMonth,
  isSameDay,
} from "@/lib/dateUtils";
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
  const calendarStyle = {
    "--calendar-bg": theme.bg,
    "--calendar-paper": theme.paper,
    "--calendar-paper-muted": theme.paperMuted,
    "--calendar-line": theme.line,
    "--calendar-accent": theme.accent,
    "--calendar-text": theme.text,
    "--calendar-muted": theme.muted,
  } as React.CSSProperties;

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

  const handlePrevMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }, [currentMonth, currentYear]);

  const handleNextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }, [currentMonth, currentYear]);

  // 키보드 단축키 (←/→ 화살표)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevMonth();
      } else if (e.key === "ArrowRight") {
        handleNextMonth();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevMonth, handleNextMonth]);

  const handleDayClick = (date: Date) => {
    const journal = getJournalForDate(date);
    onSelectDate?.(date, journal);
  };

  return (
    <div className="w-full" style={calendarStyle}>
      <div className="mx-auto w-full max-w-4xl px-4">
        <div
          className="border border-[var(--calendar-line)] border-t-2 border-b-2 bg-[var(--calendar-paper)] shadow-[0_30px_60px_rgba(35,30,24,0.12)]"
          style={{
            borderTopColor: "var(--calendar-accent)",
            borderBottomColor: "var(--calendar-accent)",
          }}
        >
          <div className="px-6 pt-6 pb-4">
            <MonthHeader
              year={currentYear}
              month={currentMonth}
              onPrev={handlePrevMonth}
              onNext={handleNextMonth}
            />
          </div>

          <div className="px-6 pb-6">
            <WeekdayHeader />
            <div className="grid grid-cols-7 gap-px bg-[var(--calendar-line)]">
              {calendarDays.map((date, index) => {
                const journal = getJournalForDate(date);
                console.log(`kyungsle`, JSON.stringify(journal));
                return (
                  <DayCell
                    key={index}
                    date={date}
                    isCurrentMonth={checkIsCurrentMonth(
                      date,
                      currentYear,
                      currentMonth,
                    )}
                    isToday={isSameDay(date, today)}
                    hasJournal={!!journal}
                    hasGrowthContent={journal?.hasGrowthContent}
                    summary={(journal?.summary ?? journal?.nineToSix)?.slice(
                      0,
                      52,
                    )}
                    onClick={() => handleDayClick(date)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
