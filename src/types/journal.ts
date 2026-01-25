export interface JournalEntry {
  date: Date;
  fileName: string;
  routine?: string;
  nineToSix: string;
  growth: string;
  notes: string;
  retrospective: string;
  hasAfterSixContent: boolean;
  rawContent: string;
  summary?: string; // 캘린더에 표시할 요약
}

// 서버 → 클라이언트 직렬화용
export interface SerializedJournalEntry {
  dateIso: string; // ISO 문자열
  fileName: string;
  routine?: string;
  nineToSix: string;
  growth: string;
  notes: string;
  retrospective: string;
  hasAfterSixContent: boolean;
  rawContent: string;
  summary?: string;
}

export function serializeJournal(
  journal: JournalEntry,
): SerializedJournalEntry {
  return {
    ...journal,
    dateIso: journal.date.toISOString(),
  };
}

export function deserializeJournal(
  journal: SerializedJournalEntry,
): JournalEntry {
  return {
    ...journal,
    date: new Date(journal.dateIso),
  };
}
