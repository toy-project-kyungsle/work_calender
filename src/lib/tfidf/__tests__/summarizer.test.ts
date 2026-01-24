import { describe, it, expect } from "vitest";
import { summarizeJournal } from "../../summarizer";

describe("summarizeJournal", () => {
  describe("기본 동작", () => {
    it("nineToSix와 notes를 조합한다", () => {
      const nineToSix = `- 프로젝트 A 기획안 검토
- 팀 미팅 참석 (10:00)
- API 설계 문서 작성
- 코드 리뷰 진행`;

      const notes = `오늘 미팅에서 새로운 요구사항이 추가됨.
일정 조율이 필요할 것 같다.`;

      const result = summarizeJournal(nineToSix, notes);

      expect(result.length).toBeLessThanOrEqual(60);
      expect(result).toContain("·"); // 구분자 포함
    });

    it("괄호 내용을 제거한다", () => {
      const nineToSix = "- 팀 미팅 참석 (10:00)";
      const notes = "";

      const result = summarizeJournal(nineToSix, notes);

      expect(result).not.toContain("(");
      expect(result).not.toContain(")");
      expect(result).toContain("팀 미팅 참석");
    });
  });

  describe("60자 제한", () => {
    it("결과가 60자를 초과하지 않는다", () => {
      const nineToSix = `- 매우 중요한 프로젝트의 아키텍처 설계 회의 참석
- 백엔드 API 엔드포인트 구현 및 테스트
- 프론트엔드 컴포넌트 리팩토링 진행`;

      const notes = `Jest 설정에서 ESM 관련 이슈가 있었음.
해결 방법: jest.config에서 transformIgnorePatterns 설정 변경`;

      const result = summarizeJournal(nineToSix, notes);

      expect(result.length).toBeLessThanOrEqual(60);
    });

    it("긴 메인 태스크만 있을 때 적절히 자른다", () => {
      const nineToSix =
        "- 매우매우매우 긴 프로젝트 이름의 아키텍처 설계 및 구현 계획 수립 회의";
      const notes = "";

      const result = summarizeJournal(nineToSix, notes);

      expect(result.length).toBeLessThanOrEqual(60);
      if (result.length > 57) {
        expect(result).toContain("...");
      }
    });
  });

  describe("빈 입력 처리", () => {
    it("모든 입력이 비어있으면 기본값을 반환한다", () => {
      const result = summarizeJournal("", "");
      expect(result).toBe("내용 없음");
    });

    it("nineToSix만 있을 때 동작한다", () => {
      const result = summarizeJournal("- 프로젝트 검토", "");
      expect(result).toBe("프로젝트 검토");
    });

    it("notes만 있을 때 동작한다", () => {
      const result = summarizeJournal("", "중요한 회의 메모");
      expect(result).toBe("중요한 회의 메모");
    });
  });

  describe("실제 일지 데이터 테스트", () => {
    it("예시 1: 기획안 검토 일지", () => {
      const nineToSix = `- 프로젝트 A 기획안 검토
- 팀 미팅 참석 (10:00)
- API 설계 문서 작성
- 코드 리뷰 진행`;

      const notes = `오늘 미팅에서 새로운 요구사항이 추가됨.
일정 조율이 필요할 것 같다.`;

      const result = summarizeJournal(nineToSix, notes);

      expect(result.length).toBeLessThanOrEqual(60);
      // 핵심 내용이 포함되어야 함
      expect(
        result.includes("프로젝트") ||
          result.includes("기획안") ||
          result.includes("요구사항")
      ).toBe(true);
    });

    it("예시 2: 백엔드 개발 일지", () => {
      const nineToSix = `- 백엔드 CRUD API 구현
- 단위 테스트 작성
- PR 리뷰`;

      const notes = `Jest 설정에서 ESM 관련 이슈가 있었음.
해결 방법: jest.config에서 transformIgnorePatterns 설정 변경`;

      const result = summarizeJournal(nineToSix, notes);

      expect(result.length).toBeLessThanOrEqual(60);
      // API 또는 Jest 관련 내용이 포함되어야 함
      expect(result.includes("API") || result.includes("Jest")).toBe(true);
    });
  });

  describe("마크다운 처리", () => {
    it("다양한 리스트 마커를 처리한다", () => {
      const nineToSix = `* 첫 번째 항목
• 두 번째 항목
- 세 번째 항목`;

      const result = summarizeJournal(nineToSix, "");

      expect(result).not.toContain("*");
      expect(result).not.toContain("•");
      expect(result).not.toContain("-");
    });
  });

  describe("중복 방지", () => {
    it("nineToSix와 notes가 같으면 중복을 제거한다", () => {
      const content = "프로젝트 검토";

      const result = summarizeJournal(content, content);

      // 중복되지 않아야 함 (구분자 없이 한 번만)
      expect(result).toBe("프로젝트 검토");
    });
  });
});
