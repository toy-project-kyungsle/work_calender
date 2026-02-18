"use client";

import { useState, useMemo, useCallback } from "react";
import { Calendar } from "@/components/calendar";
import { JournalSheet } from "@/components/journal";
import type { JournalEntry, SerializedJournalEntry } from "@/types/journal";
import { deserializeJournal } from "@/types/journal";

interface CalendarWithSheetProps {
  journals: SerializedJournalEntry[];
}

export function CalendarWithSheet({ journals: serializedJournals }: CalendarWithSheetProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedJournal, setSelectedJournal] = useState<JournalEntry | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // 직렬화된 저널을 역직렬화 후 날짜순 정렬
  const journals = useMemo(
    () =>
      serializedJournals
        .map(deserializeJournal)
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    [serializedJournals],
  );

  // 날짜 있는 일지만 필터링
  const journalsWithDate = useMemo(
    () => journals.filter((j) => j.date instanceof Date),
    [journals],
  );

  // 현재 선택된 일지의 인덱스 (날짜순 정렬 기준)
  const selectedIndex = useMemo(() => {
    if (!selectedJournal) return -1;
    return journalsWithDate.findIndex(
      (j) => j.date.getTime() === selectedJournal.date.getTime(),
    );
  }, [selectedJournal, journalsWithDate]);

  const hasPrev = selectedIndex > 0;
  const hasNext = selectedIndex >= 0 && selectedIndex < journalsWithDate.length - 1;

  const handleSelectDate = useCallback((date: Date, journal?: JournalEntry) => {
    if (journal) {
      setSelectedDate(date);
      setSelectedJournal(journal);
      setSheetOpen(true);
    }
  }, []);

  const handlePrevJournal = useCallback(() => {
    if (!hasPrev) return;
    const prev = journalsWithDate[selectedIndex - 1];
    setSelectedDate(prev.date);
    setSelectedJournal(prev);
  }, [hasPrev, journalsWithDate, selectedIndex]);

  const handleNextJournal = useCallback(() => {
    if (!hasNext) return;
    const next = journalsWithDate[selectedIndex + 1];
    setSelectedDate(next.date);
    setSelectedJournal(next);
  }, [hasNext, journalsWithDate, selectedIndex]);

  const handleSheetOpenChange = useCallback((open: boolean) => {
    setSheetOpen(open);
    if (!open) {
      setSelectedDate(null);
    }
  }, []);

  return (
    <>
      <Calendar
        journals={journals}
        onSelectDate={handleSelectDate}
        sheetOpen={sheetOpen}
        selectedDate={selectedDate}
      />
      <JournalSheet
        journal={selectedJournal}
        open={sheetOpen}
        onOpenChange={handleSheetOpenChange}
        onPrevJournal={handlePrevJournal}
        onNextJournal={handleNextJournal}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </>
  );
}
