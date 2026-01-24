/**
 * TF-IDF 기반 일지 요약 모듈
 *
 * 일지(Journal) 내용을 60자 이내로 요약합니다.
 * - nineToSix: 첫 번째 핵심 업무 추출 (위치 기반 가중치)
 * - notes: TF-IDF 기반 가장 중요한 문구 추출
 * - 두 결과를 조합하여 최종 요약 생성
 */

import {
  extractLines,
  removeParentheses,
  selectBestSentence,
  extractKeyPhrase,
} from "./tfidf";

const MAX_LENGTH = 60;
const TRUNCATE_LENGTH = 57;
const SEPARATOR = " · ";

/**
 * nineToSix 섹션에서 가장 중요한 업무 항목을 추출합니다.
 * 위치 가중치를 적용하여 첫 번째 항목에 높은 가중치를 부여합니다.
 *
 * @param nineToSix 업무 목록 텍스트
 * @returns 가장 중요한 업무 항목
 */
function extractMainTask(nineToSix: string): string {
  const lines = extractLines(nineToSix);

  if (lines.length === 0) return "";
  if (lines.length === 1) return removeParentheses(lines[0]);

  // 위치 가중치 적용하여 최선의 문장 선택
  const result = selectBestSentence(lines, true);

  if (result) {
    return removeParentheses(result.sentence);
  }

  // fallback: 첫 번째 항목
  return removeParentheses(lines[0]);
}

/**
 * notes 섹션에서 TF-IDF 기반 핵심 문구를 추출합니다.
 *
 * @param notes 노트 텍스트
 * @returns 가장 중요한 문구 (간결하게 처리)
 */
function extractNoteHighlight(notes: string): string {
  if (!notes.trim()) return "";

  const keyPhrase = extractKeyPhrase(notes);

  // 너무 긴 경우 핵심 부분만 추출
  if (keyPhrase.length > 30) {
    // 첫 번째 마침표, 쉼표 전까지만 사용
    const match = keyPhrase.match(/^[^,.。，]+/);
    if (match && match[0].length > 5) {
      return match[0].trim();
    }
  }

  return keyPhrase;
}

/**
 * 일지 내용에서 핵심 내용을 추출합니다.
 * TF-IDF 알고리즘을 활용하여 중요도 기반 요약을 생성합니다.
 *
 * @param nineToSix 9to6 업무 목록
 * @param notes 노트 내용
 * @returns 60자 이내의 요약 문자열
 */
export function summarizeJournal(nineToSix: string, notes: string): string {
  const mainTask = extractMainTask(nineToSix);
  const noteHighlight = extractNoteHighlight(notes);

  // 결과 조합
  const parts: string[] = [];

  if (mainTask) {
    parts.push(mainTask);
  }

  // 노트 하이라이트가 메인 태스크와 다른 경우에만 추가
  if (noteHighlight && noteHighlight !== mainTask) {
    parts.push(noteHighlight);
  }

  let result = parts.join(SEPARATOR);

  // 60자 초과 시 처리
  if (result.length > MAX_LENGTH) {
    // 먼저 메인 태스크만 사용 시도
    if (mainTask && mainTask.length <= MAX_LENGTH) {
      result = mainTask;
    } else if (mainTask) {
      // 메인 태스크도 길면 자르기
      result = mainTask.slice(0, TRUNCATE_LENGTH) + "...";
    } else if (noteHighlight) {
      result = noteHighlight.slice(0, TRUNCATE_LENGTH) + "...";
    }
  }

  return result || "내용 없음";
}
