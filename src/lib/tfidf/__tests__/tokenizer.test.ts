import { describe, it, expect } from "vitest";
import {
  tokenize,
  extractLines,
  removeParentheses,
  countMeaningfulWords,
} from "../tokenizer";

describe("tokenizer", () => {
  describe("tokenize", () => {
    it("한국어 텍스트를 토큰화한다", () => {
      const tokens = tokenize("프로젝트 기획안 검토");
      expect(tokens).toContain("프로젝트");
      expect(tokens).toContain("기획안");
      expect(tokens).toContain("검토");
    });

    it("영어 텍스트를 토큰화한다", () => {
      const tokens = tokenize("API design document");
      expect(tokens).toContain("api");
      expect(tokens).toContain("design");
      expect(tokens).toContain("document");
    });

    it("혼합 텍스트를 토큰화한다", () => {
      const tokens = tokenize("React 컴포넌트 개발");
      expect(tokens).toContain("react");
      expect(tokens).toContain("컴포넌트");
      expect(tokens).toContain("개발");
    });

    it("1글자 토큰을 제외한다", () => {
      const tokens = tokenize("A가 B를 위해 C");
      // 1글자는 제외되어야 함
      expect(tokens).not.toContain("a");
      expect(tokens).not.toContain("가");
      expect(tokens).not.toContain("b");
    });

    it("불용어를 제거한다", () => {
      const tokens = tokenize("매우 중요한 프로젝트 검토");
      expect(tokens).not.toContain("매우");
      expect(tokens).toContain("중요한");
      expect(tokens).toContain("프로젝트");
    });

    it("빈 문자열을 처리한다", () => {
      const tokens = tokenize("");
      expect(tokens).toEqual([]);
    });

    it("숫자를 추출한다", () => {
      const tokens = tokenize("버전 2024 업데이트");
      expect(tokens).toContain("2024");
      expect(tokens).toContain("버전");
    });
  });

  describe("extractLines", () => {
    it("마크다운 리스트 마커를 제거한다", () => {
      const text = "- 첫 번째 항목\n- 두 번째 항목";
      const lines = extractLines(text);
      expect(lines).toEqual(["첫 번째 항목", "두 번째 항목"]);
    });

    it("별표 리스트 마커를 제거한다", () => {
      const text = "* 항목 1\n* 항목 2";
      const lines = extractLines(text);
      expect(lines).toEqual(["항목 1", "항목 2"]);
    });

    it("빈 줄을 제거한다", () => {
      const text = "항목 1\n\n항목 2\n";
      const lines = extractLines(text);
      expect(lines).toEqual(["항목 1", "항목 2"]);
    });

    it("앞뒤 공백을 제거한다", () => {
      const text = "  항목 1  \n  항목 2  ";
      const lines = extractLines(text);
      expect(lines).toEqual(["항목 1", "항목 2"]);
    });
  });

  describe("removeParentheses", () => {
    it("괄호 내용을 제거한다", () => {
      const result = removeParentheses("팀 미팅 참석 (10:00)");
      expect(result).toBe("팀 미팅 참석");
    });

    it("여러 괄호를 제거한다", () => {
      const result = removeParentheses("회의 (오전) 참석 (필수)");
      expect(result).toBe("회의 참석");
    });

    it("괄호가 없으면 원본을 반환한다", () => {
      const result = removeParentheses("일반 텍스트");
      expect(result).toBe("일반 텍스트");
    });
  });

  describe("countMeaningfulWords", () => {
    it("불용어를 제외한 단어 수를 반환한다", () => {
      const count = countMeaningfulWords("프로젝트 기획안 검토");
      expect(count).toBe(3);
    });

    it("빈 문자열은 0을 반환한다", () => {
      const count = countMeaningfulWords("");
      expect(count).toBe(0);
    });
  });
});
