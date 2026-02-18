"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  sheetOpen?: boolean;
  selectedDate?: Date | null;
}

export function Calendar({ journals, onSelectDate, sheetOpen, selectedDate }: CalendarProps) {
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

  // 현재 표시 중인 달이 실제 오늘 달인지 확인
  const isViewingCurrentMonth =
    currentYear === today.getFullYear() && currentMonth === today.getMonth();

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

  // 현재 표시 달의 일지 개수 및 성장 일수 계산
  const currentMonthStats = calendarDays.reduce(
    (acc, date) => {
      if (
        date.getFullYear() === currentYear &&
        date.getMonth() === currentMonth
      ) {
        const journal = getJournalForDate(date);
        if (journal) {
          acc.journalCount++;
          if (journal.hasGrowthContent) acc.growthCount++;
        }
      }
      return acc;
    },
    { journalCount: 0, growthCount: 0 },
  );

  const handlePrevMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }, [currentMonth]);

  const handleNextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }, [currentMonth]);

  const handleToday = useCallback(() => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
  }, [today]);

  // 키보드 단축키: Sheet가 열려있으면 화살표 키 비활성화
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (sheetOpen) return;
      if (e.key === "ArrowLeft") {
        handlePrevMonth();
      } else if (e.key === "ArrowRight") {
        handleNextMonth();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevMonth, handleNextMonth, sheetOpen]);

  // 터치 스와이프로 월 이동
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) {
      handleNextMonth();
    } else if (diff < -threshold) {
      handlePrevMonth();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleDayClick = (date: Date) => {
    const journal = getJournalForDate(date);
    onSelectDate?.(date, journal);
  };

  return (
    <div
      className="w-full"
      style={calendarStyle}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="mx-auto w-full max-w-4xl px-4">
        <div
          className="overflow-hidden rounded-sm border border-[var(--calendar-line)] border-t-2 bg-[var(--calendar-paper)] shadow-[0_20px_50px_rgba(35,30,24,0.10)]"
          style={{ borderTopColor: "var(--calendar-accent)" }}
        >
          <div className="px-6 pt-6 pb-5 md:px-8 md:pt-8 md:pb-6">
            <MonthHeader
              year={currentYear}
              month={currentMonth}
              onPrev={handlePrevMonth}
              onNext={handleNextMonth}
              onToday={handleToday}
              isCurrentMonth={isViewingCurrentMonth}
              journalCount={currentMonthStats.journalCount}
              growthCount={currentMonthStats.growthCount}
            />
          </div>

          <div className="px-6 pb-6 md:px-8 md:pb-8">
            <div
              role="grid"
              aria-label={`${currentYear}년 ${currentMonth + 1}월 캘린더`}
            >
              <WeekdayHeader />
              <div
                role="rowgroup"
                className="grid grid-cols-7 gap-px bg-[var(--calendar-line)]"
              >
                {calendarDays.map((date, index) => {
                  const journal = getJournalForDate(date);
                  const isSelected = selectedDate
                    ? isSameDay(date, selectedDate)
                    : false;
                  return (
                    <div key={index} role="gridcell">
                      <DayCell
                        date={date}
                        isCurrentMonth={checkIsCurrentMonth(
                          date,
                          currentYear,
                          currentMonth,
                        )}
                        isToday={isSameDay(date, today)}
                        hasJournal={!!journal}
                        hasGrowthContent={journal?.hasGrowthContent}
                        isSelected={isSelected}
                        summary={(journal?.summary ?? journal?.nineToSix)?.slice(
                          0,
                          52,
                        )}
                        onClick={() => handleDayClick(date)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
