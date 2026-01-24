import type { JournalEntry } from "@/types/journal";

/**
 * 파일명에서 날짜를 파싱합니다.
 * @param fileName - "YYYY-MM-DD.md" 형식의 파일명
 * @returns Date 객체 또는 null (파싱 실패 시)
 */
export function parseFileName(fileName: string): Date | null {
  const match = fileName.match(/^(\d{4})-(\d{2})-(\d{2})\.md$/);
  if (!match) return null;

  const [, year, month, day] = match;
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

interface ParsedContent {
  routine?: string;
  nineToSix: string;
  afterSix: string;
  notes: string;
  retrospective: string;
}

/**
 * 마크다운 내용을 섹션별로 파싱합니다.
 */
export function parseJournalContent(content: string): ParsedContent {
  const sections = {
    routine: "",
    nineToSix: "",
    afterSix: "",
    notes: "",
    retrospective: "",
  };

  // 섹션 패턴들
  const routinePattern = /## 루틴\n([\s\S]*?)(?=\n#|\n## |$)/;
  const nineToSixPattern = /# 1\. 9 to 6 할 일\n([\s\S]*?)(?=\n# \d|$)/;
  const afterSixPattern = /# 2\. 6시 이후 하려는 일\n([\s\S]*?)(?=\n# \d|$)/;
  const notesPattern = /# 3\. 노트\n([\s\S]*?)(?=\n# \d|$)/;
  const retrospectivePattern = /# 4\. 회고\n([\s\S]*?)(?=\n# \d|$)/;

  const routineMatch = content.match(routinePattern);
  if (routineMatch) sections.routine = routineMatch[1].trim();

  const nineToSixMatch = content.match(nineToSixPattern);
  if (nineToSixMatch) sections.nineToSix = nineToSixMatch[1].trim();

  const afterSixMatch = content.match(afterSixPattern);
  if (afterSixMatch) sections.afterSix = afterSixMatch[1].trim();

  const notesMatch = content.match(notesPattern);
  if (notesMatch) sections.notes = notesMatch[1].trim();

  const retrospectiveMatch = content.match(retrospectivePattern);
  if (retrospectiveMatch) sections.retrospective = retrospectiveMatch[1].trim();

  return sections;
}

/**
 * 6시 이후 섹션에 실제 내용이 있는지 확인합니다.
 */
export function hasAfterSixContent(afterSixSection: string): boolean {
  return afterSixSection.trim().length > 0;
}

/**
 * 파일명과 내용을 받아 JournalEntry 객체를 생성합니다.
 */
export function createJournalEntry(
  fileName: string,
  rawContent: string
): JournalEntry | null {
  const date = parseFileName(fileName);
  if (!date) return null;

  const parsed = parseJournalContent(rawContent);

  return {
    date,
    fileName,
    routine: parsed.routine || undefined,
    nineToSix: parsed.nineToSix,
    afterSix: parsed.afterSix,
    notes: parsed.notes,
    retrospective: parsed.retrospective,
    hasAfterSixContent: hasAfterSixContent(parsed.afterSix),
    rawContent,
  };
}
