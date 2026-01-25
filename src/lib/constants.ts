/**
 * 데이터 디렉토리 경로 설정
 * data/calender/년도/월/*.md 구조
 */
export const DATA_DIR = "data/calender";

/**
 * 저널 섹션 이름 설정
 * 마크다운 파일의 섹션 헤더와 UI 표시에 사용됩니다.
 */
export const SECTION_NAMES = {
  routine: "루틴",
  nineToSix: "9 to 6 할 일",
  afterSix: "6시 이후 하려는 일",
  notes: "노트",
  retrospective: "회고",
} as const;

export type SectionKey = keyof typeof SECTION_NAMES;