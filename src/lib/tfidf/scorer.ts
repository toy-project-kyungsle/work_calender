/**
 * 문장 점수 계산 모듈
 * TF-IDF 기반 문장 중요도 평가
 */

import { tokenize } from "./tokenizer";
import { calculateTF, calculateIDF, calculateTFIDF } from "./calculator";

/**
 * 위치 가중치 계산
 * 첫 번째 항목일수록 높은 가중치 부여
 *
 * @param index 문장의 인덱스 (0부터 시작)
 * @returns 위치 가중치 (1.0 ~ 1.2)
 */
export function getPositionWeight(index: number): number {
  if (index === 0) return 1.2;
  if (index === 1) return 1.1;
  return 1.0;
}

/**
 * 단일 문장의 TF-IDF 기반 점수를 계산합니다.
 * score = sum(TF-IDF of each token) / unique_token_count
 *
 * @param tokens 문장의 토큰 배열
 * @param tfidf 토큰별 TF-IDF 점수 Map
 * @returns 문장 점수
 */
export function scoreSentence(
  tokens: string[],
  tfidf: Map<string, number>
): number {
  if (tokens.length === 0) return 0;

  const uniqueTokens = new Set(tokens);
  let totalScore = 0;

  for (const token of uniqueTokens) {
    totalScore += tfidf.get(token) || 0;
  }

  return totalScore / uniqueTokens.size;
}

/**
 * 위치 가중치를 적용한 문장 점수를 계산합니다.
 *
 * @param tokens 문장의 토큰 배열
 * @param index 문장의 인덱스
 * @param tfidf 토큰별 TF-IDF 점수 Map
 * @returns 위치 가중치가 적용된 문장 점수
 */
export function scoreWithPosition(
  tokens: string[],
  index: number,
  tfidf: Map<string, number>
): number {
  const baseScore = scoreSentence(tokens, tfidf);
  return baseScore * getPositionWeight(index);
}

/**
 * 문장 배열에서 가장 중요한 문장을 선택합니다.
 *
 * @param sentences 문장 배열
 * @param applyPositionWeight 위치 가중치 적용 여부
 * @returns 가장 높은 점수의 문장과 그 인덱스
 */
export function selectBestSentence(
  sentences: string[],
  applyPositionWeight: boolean = false
): { sentence: string; index: number; score: number } | null {
  if (sentences.length === 0) return null;

  // 각 문장을 토큰화
  const tokenizedSentences = sentences.map((s) => tokenize(s));

  // IDF 계산 (모든 문장을 문서로 취급)
  const idf = calculateIDF(tokenizedSentences);

  let bestSentence = "";
  let bestIndex = 0;
  let bestScore = -1;

  for (let i = 0; i < sentences.length; i++) {
    const tokens = tokenizedSentences[i];
    const tf = calculateTF(tokens);
    const tfidf = calculateTFIDF(tf, idf);

    const score = applyPositionWeight
      ? scoreWithPosition(tokens, i, tfidf)
      : scoreSentence(tokens, tfidf);

    if (score > bestScore) {
      bestScore = score;
      bestSentence = sentences[i];
      bestIndex = i;
    }
  }

  return { sentence: bestSentence, index: bestIndex, score: bestScore };
}

/**
 * 임계값 이상의 문장들을 선택합니다.
 * 임계값 = 모든 문장 점수의 평균
 *
 * @param sentences 문장 배열
 * @returns 임계값 이상인 문장 배열 (원래 순서 유지)
 */
export function selectAboveThreshold(sentences: string[]): string[] {
  if (sentences.length === 0) return [];
  if (sentences.length === 1) return sentences;

  // 각 문장을 토큰화
  const tokenizedSentences = sentences.map((s) => tokenize(s));

  // IDF 계산
  const idf = calculateIDF(tokenizedSentences);

  // 각 문장의 점수 계산
  const scores: number[] = [];

  for (let i = 0; i < sentences.length; i++) {
    const tokens = tokenizedSentences[i];
    const tf = calculateTF(tokens);
    const tfidf = calculateTFIDF(tf, idf);
    scores.push(scoreSentence(tokens, tfidf));
  }

  // 임계값 계산 (평균)
  const threshold = scores.reduce((a, b) => a + b, 0) / scores.length;

  // 임계값 이상인 문장 선택
  return sentences.filter((_, i) => scores[i] >= threshold);
}

/**
 * 텍스트에서 가장 중요한 문구를 추출합니다.
 * 짧은 문서에 최적화된 방식.
 *
 * @param text 분석할 텍스트
 * @returns 가장 중요한 문구
 */
export function extractKeyPhrase(text: string): string {
  const lines = text
    .split("\n")
    .map((line) => line.replace(/^[-*•]\s*/, "").trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) return "";
  if (lines.length === 1) return lines[0];

  const result = selectBestSentence(lines, false);
  return result?.sentence || lines[0];
}
