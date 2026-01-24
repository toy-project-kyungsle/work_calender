/**
 * 한국어/영어 텍스트 토큰화 모듈
 * 형태소 분석기 없이 정규식 기반으로 토큰 추출
 */

import { isStopword } from "./stopwords";

/**
 * 텍스트를 토큰(단어) 배열로 변환합니다.
 * - 한글, 영문, 숫자를 추출
 * - 1글자 토큰 제외 (조사 등 노이즈)
 * - 불용어 제거
 * - 소문자 변환
 *
 * @param text 토큰화할 텍스트
 * @returns 토큰 배열
 */
export function tokenize(text: string): string[] {
  // 한글, 영문, 숫자 추출 (2글자 이상)
  const pattern = /[가-힣]{2,}|[a-zA-Z]{2,}|[0-9]+/g;
  const matches = text.match(pattern) || [];

  return matches
    .map((token) => token.toLowerCase())
    .filter((token) => !isStopword(token));
}

/**
 * 텍스트를 라인 단위로 분리하고 정제합니다.
 * - 빈 줄 제거
 * - 마크다운 리스트 마커 제거 (-, *, •)
 * - 앞뒤 공백 제거
 *
 * @param text 분리할 텍스트
 * @returns 정제된 라인 배열
 */
export function extractLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => {
      // 마크다운 리스트 마커 제거
      return line.replace(/^[-*•]\s*/, "").trim();
    })
    .filter((line) => line.length > 0);
}

/**
 * 괄호 내용을 제거합니다 (시간 정보 등).
 * 예: "팀 미팅 참석 (10:00)" -> "팀 미팅 참석"
 *
 * @param text 처리할 텍스트
 * @returns 괄호 내용이 제거된 텍스트
 */
export function removeParentheses(text: string): string {
  return text.replace(/\s*\([^)]*\)\s*/g, " ").trim();
}

/**
 * 문장을 의미 있는 단어 수로 변환합니다.
 * (불용어 제외한 토큰 수)
 *
 * @param text 분석할 텍스트
 * @returns 의미 있는 단어 수
 */
export function countMeaningfulWords(text: string): number {
  return tokenize(text).length;
}
