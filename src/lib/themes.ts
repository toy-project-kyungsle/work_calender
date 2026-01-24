export interface MonthTheme {
  bg: string;
  accent: string;
  text: string;
}

export const monthThemes: Record<number, MonthTheme> = {
  0: { bg: "#E3F2FD", accent: "#1976D2", text: "#0D47A1" }, // 1월: 파랑
  1: { bg: "#FCE4EC", accent: "#E91E63", text: "#880E4F" }, // 2월: 핑크
  2: { bg: "#E8F5E9", accent: "#4CAF50", text: "#1B5E20" }, // 3월: 초록
  3: { bg: "#FFF3E0", accent: "#FF9800", text: "#E65100" }, // 4월: 주황
  4: { bg: "#F3E5F5", accent: "#9C27B0", text: "#4A148C" }, // 5월: 보라
  5: { bg: "#E0F7FA", accent: "#00BCD4", text: "#006064" }, // 6월: 청록
  6: { bg: "#FFEBEE", accent: "#F44336", text: "#B71C1C" }, // 7월: 빨강
  7: { bg: "#FFF8E1", accent: "#FFC107", text: "#FF6F00" }, // 8월: 노랑
  8: { bg: "#EFEBE9", accent: "#795548", text: "#3E2723" }, // 9월: 갈색
  9: { bg: "#FAFAFA", accent: "#607D8B", text: "#263238" }, // 10월: 회색
  10: { bg: "#EDE7F6", accent: "#673AB7", text: "#311B92" }, // 11월: 남보라
  11: { bg: "#E8EAF6", accent: "#3F51B5", text: "#1A237E" }, // 12월: 인디고
};

export function getMonthTheme(month: number): MonthTheme {
  return monthThemes[month] || monthThemes[0];
}
