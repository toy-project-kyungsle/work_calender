import type { JournalEntry } from "@/types/journal";
import { SECTION_NAMES } from "@/lib/constants";

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
  growth: string;
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
    growth: "",
    notes: "",
    retrospective: "",
  };

  // 섹션 패턴들 (상수에서 이름 가져옴)
  const escapeRegex = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const routinePattern = new RegExp(
    `# ${escapeRegex(SECTION_NAMES.routine)}\\n([\\s\\S]*?)(?=\\n#|\\n## |$)`,
  );
  const nineToSixPattern = new RegExp(
    `# 1\\. ${escapeRegex(SECTION_NAMES.nineToSix)}\\n([\\s\\S]*?)(?=\\n# \\d|$)`,
  );
  const afterSixPattern = new RegExp(
    `# 2\\. ${escapeRegex(SECTION_NAMES.growth)}\\n([\\s\\S]*?)(?=\\n# \\d|$)`,
  );
  const notesPattern = new RegExp(
    `# 3\\. ${escapeRegex(SECTION_NAMES.notes)}\\n([\\s\\S]*?)(?=\\n# \\d|$)`,
  );
  const retrospectivePattern = new RegExp(
    `# 4\\. ${escapeRegex(SECTION_NAMES.retrospective)}\\n([\\s\\S]*?)(?=\\n# \\d|$)`,
  );

  const routineMatch = content.match(routinePattern);
  if (routineMatch) sections.routine = routineMatch[1].trim();

  const nineToSixMatch = content.match(nineToSixPattern);
  if (nineToSixMatch) sections.nineToSix = nineToSixMatch[1].trim();

  const afterSixMatch = content.match(afterSixPattern);
  if (afterSixMatch) sections.growth = afterSixMatch[1].trim();

  const notesMatch = content.match(notesPattern);
  if (notesMatch) sections.notes = notesMatch[1].trim();

  const retrospectiveMatch = content.match(retrospectivePattern);
  if (retrospectiveMatch) sections.retrospective = retrospectiveMatch[1].trim();

  return sections;
}

/**
 * 6시 이후 섹션에 실제 내용이 있는지 확인합니다.
 */
export function hasGrowthContent(afterSixSection: string): boolean {
  return afterSixSection.trim().length > 0;
}

/**
 * 파일명과 내용을 받아 JournalEntry 객체를 생성합니다.
 */
export function createJournalEntry(
  fileName: string,
  rawContent: string,
): JournalEntry | null {
  const date = parseFileName(fileName);
  if (!date) return null;

  const parsed = parseJournalContent(rawContent);

  return {
    date,
    fileName,
    routine: parsed.routine || undefined,
    nineToSix: parsed.nineToSix,
    growth: parsed.growth,
    notes: parsed.notes,
    retrospective: parsed.retrospective,
    hasGrowthContent: hasGrowthContent(parsed.growth),
    rawContent,
  };
}
