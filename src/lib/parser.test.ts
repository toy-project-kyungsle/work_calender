import { describe, it, expect } from "vitest";
import { parseFileName, parseJournalContent, hasGrowthContent } from "./parser";

describe("parseFileName", () => {
  it("YYYY-MM-DD.md 형식에서 날짜를 파싱한다", () => {
    const result = parseFileName("2025-01-20.md");
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(0); // 0-indexed
    expect(result.getDate()).toBe(20);
  });

  it("잘못된 형식은 null을 반환한다", () => {
    const result = parseFileName("invalid.md");
    expect(result).toBeNull();
  });
});

describe("parseJournalContent", () => {
  const sampleContent = `# 2025-01-20 바인드 일지

## 루틴
- [x] 기상 6:30

# 1. 9 to 6 할 일

- 프로젝트 A 기획안 검토
- 팀 미팅 참석

# 2. 6시 이후 하려는 일

- 사이드 프로젝트 작업

# 3. 노트

오늘 미팅에서 새로운 요구사항이 추가됨.

# 4. 회고

계획했던 일의 80%를 완료했다.
`;

  it("각 섹션을 정확히 파싱한다", () => {
    const result = parseJournalContent(sampleContent);

    expect(result.nineToSix).toContain("프로젝트 A 기획안 검토");
    expect(result.growth).toContain("사이드 프로젝트 작업");
    expect(result.notes).toContain("새로운 요구사항이 추가됨");
    expect(result.retrospective).toContain("80%를 완료했다");
  });

  it("루틴 섹션을 파싱한다", () => {
    const result = parseJournalContent(sampleContent);
    expect(result.routine).toContain("기상 6:30");
  });
});

describe("hasGrowthContent", () => {
  it("6시 이후 섹션에 내용이 있으면 true", () => {
    const content = "- 사이드 프로젝트 작업";
    expect(hasGrowthContent(content)).toBe(true);
  });

  it("6시 이후 섹션이 비어있으면 false", () => {
    expect(hasGrowthContent("")).toBe(false);
    expect(hasGrowthContent("   ")).toBe(false);
    expect(hasGrowthContent("\n\n")).toBe(false);
  });
});
