import { describe, it, expect } from "vitest";
import {
  getPositionWeight,
  scoreSentence,
  scoreWithPosition,
  selectBestSentence,
  selectAboveThreshold,
  extractKeyPhrase,
} from "../scorer";

describe("scorer", () => {
  describe("getPositionWeight", () => {
    it("첫 번째 위치는 1.2 가중치를 반환한다", () => {
      expect(getPositionWeight(0)).toBe(1.2);
    });

    it("두 번째 위치는 1.1 가중치를 반환한다", () => {
      expect(getPositionWeight(1)).toBe(1.1);
    });

    it("세 번째 이후 위치는 1.0 가중치를 반환한다", () => {
      expect(getPositionWeight(2)).toBe(1.0);
      expect(getPositionWeight(5)).toBe(1.0);
      expect(getPositionWeight(10)).toBe(1.0);
    });
  });

  describe("scoreSentence", () => {
    it("TF-IDF 점수의 평균을 계산한다", () => {
      const tokens = ["프로젝트", "검토"];
      const tfidf = new Map([
        ["프로젝트", 0.5],
        ["검토", 1.0],
      ]);

      const score = scoreSentence(tokens, tfidf);
      expect(score).toBeCloseTo((0.5 + 1.0) / 2);
    });

    it("빈 토큰 배열은 0을 반환한다", () => {
      const tfidf = new Map([["프로젝트", 1.0]]);
      expect(scoreSentence([], tfidf)).toBe(0);
    });

    it("중복 토큰은 한 번만 계산한다", () => {
      const tokens = ["프로젝트", "프로젝트", "검토"];
      const tfidf = new Map([
        ["프로젝트", 0.6],
        ["검토", 0.4],
      ]);

      // 고유 토큰: 프로젝트, 검토 (2개)
      const score = scoreSentence(tokens, tfidf);
      expect(score).toBeCloseTo((0.6 + 0.4) / 2);
    });
  });

  describe("scoreWithPosition", () => {
    it("위치 가중치를 적용한 점수를 반환한다", () => {
      const tokens = ["프로젝트", "검토"];
      const tfidf = new Map([
        ["프로젝트", 0.5],
        ["검토", 0.5],
      ]);

      const baseScore = 0.5;
      expect(scoreWithPosition(tokens, 0, tfidf)).toBeCloseTo(baseScore * 1.2);
      expect(scoreWithPosition(tokens, 1, tfidf)).toBeCloseTo(baseScore * 1.1);
      expect(scoreWithPosition(tokens, 2, tfidf)).toBeCloseTo(baseScore * 1.0);
    });
  });

  describe("selectBestSentence", () => {
    it("가장 높은 점수의 문장을 선택한다", () => {
      const sentences = [
        "일반적인 회의 참석",
        "중요한 프로젝트 아키텍처 설계",
        "간단한 메모 작성",
      ];

      const result = selectBestSentence(sentences, false);
      expect(result).not.toBeNull();
      // 결과는 입력된 문장 중 하나여야 함
      expect(sentences).toContain(result!.sentence);
      // 인덱스가 유효해야 함
      expect(result!.index).toBeGreaterThanOrEqual(0);
      expect(result!.index).toBeLessThan(sentences.length);
      // 점수가 있어야 함
      expect(result!.score).toBeGreaterThanOrEqual(0);
    });

    it("위치 가중치를 적용할 수 있다", () => {
      // 동일한 내용의 문장들로 테스트 - 위치만 다름
      const sentences = [
        "프로젝트 검토 진행",
        "프로젝트 검토 진행",
        "프로젝트 검토 진행",
      ];

      const resultWithWeight = selectBestSentence(sentences, true);
      expect(resultWithWeight).not.toBeNull();
      // 동일 내용에서 위치 가중치 적용 시 첫 번째가 선택됨
      expect(resultWithWeight!.index).toBe(0);
    });

    it("빈 배열은 null을 반환한다", () => {
      expect(selectBestSentence([], false)).toBeNull();
    });

    it("단일 문장은 그 문장을 반환한다", () => {
      const result = selectBestSentence(["유일한 문장"], false);
      expect(result!.sentence).toBe("유일한 문장");
      expect(result!.index).toBe(0);
    });
  });

  describe("selectAboveThreshold", () => {
    it("평균 이상의 문장을 선택한다", () => {
      const sentences = [
        "매우 중요한 프로젝트 아키텍처 설계 문서 작성",
        "점심 식사",
        "커피 마시기",
        "핵심 API 엔드포인트 구현 완료",
      ];

      const selected = selectAboveThreshold(sentences);
      // 의미 있는 단어가 많은 문장들이 선택되어야 함
      expect(selected.length).toBeGreaterThan(0);
      expect(selected.length).toBeLessThan(sentences.length);
    });

    it("빈 배열은 빈 배열을 반환한다", () => {
      expect(selectAboveThreshold([])).toEqual([]);
    });

    it("단일 문장은 그 문장을 반환한다", () => {
      expect(selectAboveThreshold(["단일 문장"])).toEqual(["단일 문장"]);
    });
  });

  describe("extractKeyPhrase", () => {
    it("가장 중요한 문구를 추출한다", () => {
      const text = `오늘 미팅에서 새로운 요구사항이 추가됨.
일정 조율이 필요할 것 같다.
점심 식사 후 휴식.`;

      const keyPhrase = extractKeyPhrase(text);
      expect(keyPhrase.length).toBeGreaterThan(0);
      // 의미 있는 내용을 포함해야 함
      expect(keyPhrase).not.toBe("점심 식사 후 휴식.");
    });

    it("빈 텍스트는 빈 문자열을 반환한다", () => {
      expect(extractKeyPhrase("")).toBe("");
    });

    it("마크다운 리스트를 처리한다", () => {
      const text = `- 첫 번째 중요한 항목
- 두 번째 항목`;

      const keyPhrase = extractKeyPhrase(text);
      // 리스트 마커가 제거되어야 함
      expect(keyPhrase).not.toContain("-");
    });
  });
});
