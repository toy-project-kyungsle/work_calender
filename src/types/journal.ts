export interface JournalEntry {
  date: Date;
  fileName: string;
  routine?: string;
  nineToSix: string;
  afterSix: string;
  notes: string;
  retrospective: string;
  hasAfterSixContent: boolean;
  rawContent: string;
}
