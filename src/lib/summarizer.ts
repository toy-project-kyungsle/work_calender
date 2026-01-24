/**
 * 일지 내용에서 핵심 내용을 추출합니다.
 * - 첫 번째 할 일 항목 추출
 * - 마크다운 기호 제거
 */
export function summarizeJournal(nineToSix: string, notes: string): string {
  // 9to6에서 첫 번째 할 일 항목 추출
  const todoLines = nineToSix
    .split("\n")
    .map((line) => line.replace(/^[-*]\s*/, "").trim())
    .filter((line) => line.length > 0);

  // 노트에서 첫 문장 추출
  const noteFirstLine = notes
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)[0] || "";

  // 첫 번째 할 일 + 노트 첫 줄
  const parts: string[] = [];

  if (todoLines[0]) {
    parts.push(todoLines[0]);
  }

  if (noteFirstLine && noteFirstLine !== todoLines[0]) {
    parts.push(noteFirstLine);
  }

  const result = parts.join(" · ");

  // 최대 60자로 제한
  if (result.length > 60) {
    return result.slice(0, 57) + "...";
  }

  return result || "내용 없음";
}
