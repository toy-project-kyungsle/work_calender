"use client";

import { useState, useMemo } from "react";
import { Calendar } from "@/components/calendar";
import { JournalSheet } from "@/components/journal";
import type { JournalEntry, SerializedJournalEntry } from "@/types/journal";
import { deserializeJournal } from "@/types/journal";

interface CalendarWithSheetProps {
  journals: SerializedJournalEntry[];
}

export function CalendarWithSheet({ journals: serializedJournals }: CalendarWithSheetProps) {
  const [selectedJournal, setSelectedJournal] = useState<JournalEntry | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // 직렬화된 저널을 역직렬화
  const journals = useMemo(
    () => serializedJournals.map(deserializeJournal),
    [serializedJournals]
  );

  const handleSelectDate = (date: Date, journal?: JournalEntry) => {
    if (journal) {
      setSelectedJournal(journal);
      setSheetOpen(true);
    }
  };

  return (
    <>
      <Calendar journals={journals} onSelectDate={handleSelectDate} />
      <JournalSheet
        journal={selectedJournal}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </>
  );
}
