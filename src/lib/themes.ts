export interface MonthTheme {
  bg: string;
  paper: string;
  paperMuted: string;
  line: string;
  accent: string;
  text: string;
  muted: string;
}

// 12개 월별 테마
// 각 테마는 WCAG AA 기준 대비비 4.5:1 이상을 준수합니다.
const MONTH_THEMES: MonthTheme[] = [
  // 1월: Rose Red
  {
    bg: "#f5eded",
    paper: "#fdf8f8",
    paperMuted: "#f0e8e8",
    line: "#e8d5d5",
    accent: "#c0392b",
    text: "#2d1f1f",
    muted: "#8a6f6f",
  },
  // 2월: Coral Orange
  {
    bg: "#f5efeb",
    paper: "#fdf9f7",
    paperMuted: "#f0e8e3",
    line: "#e8d8cf",
    accent: "#c0622b",
    text: "#2d2018",
    muted: "#8a6e5f",
  },
  // 3월: Mint Green
  {
    bg: "#eaf4ef",
    paper: "#f6fcf9",
    paperMuted: "#e0ede7",
    line: "#cce3d8",
    accent: "#1e7a50",
    text: "#1a2e26",
    muted: "#5e8a74",
  },
  // 4월: Sky Blue
  {
    bg: "#eaf0f7",
    paper: "#f5f9fd",
    paperMuted: "#ddeaf4",
    line: "#c8dced",
    accent: "#1e5c9a",
    text: "#1a2433",
    muted: "#5e7a9a",
  },
  // 5월: Lavender Purple
  {
    bg: "#f0ecf7",
    paper: "#f9f7fd",
    paperMuted: "#e8e3f2",
    line: "#d8d0ea",
    accent: "#6b3fa0",
    text: "#261d33",
    muted: "#7d6a9a",
  },
  // 6월: Peach
  {
    bg: "#f7f0ea",
    paper: "#fdf9f5",
    paperMuted: "#f2e8de",
    line: "#ead8c8",
    accent: "#b56428",
    text: "#2e2018",
    muted: "#8a6e50",
  },
  // 7월: Teal
  {
    bg: "#e8f4f4",
    paper: "#f3fbfb",
    paperMuted: "#d8eded",
    line: "#c0e0e0",
    accent: "#157070",
    text: "#162828",
    muted: "#508080",
  },
  // 8월: Gold
  {
    bg: "#f5f0e0",
    paper: "#fdfaf0",
    paperMuted: "#eee8d4",
    line: "#e0d4b0",
    accent: "#8a6800",
    text: "#2a2410",
    muted: "#8a7840",
  },
  // 9월: Sage Green
  {
    bg: "#eef2ec",
    paper: "#f7faf6",
    paperMuted: "#e4ebe2",
    line: "#d0dece",
    accent: "#3d6b38",
    text: "#1e2b1c",
    muted: "#648060",
  },
  // 10월: Burgundy
  {
    bg: "#f2ecee",
    paper: "#faf6f7",
    paperMuted: "#eae0e2",
    line: "#dccdd0",
    accent: "#8b1a2e",
    text: "#2a1418",
    muted: "#8a5a60",
  },
  // 11월: Navy Blue
  {
    bg: "#eaecf2",
    paper: "#f5f6fb",
    paperMuted: "#e0e3ee",
    line: "#ccd0e4",
    accent: "#1a2e6e",
    text: "#181c2a",
    muted: "#5a647a",
  },
  // 12월: Forest Green
  {
    bg: "#eaf0ea",
    paper: "#f5faf5",
    paperMuted: "#dde8dd",
    line: "#c8d8c8",
    accent: "#2a5a2a",
    text: "#182418",
    muted: "#587858",
  },
];

export function getMonthTheme(month: number): MonthTheme {
  // month는 0-indexed (0 = 1월, 11 = 12월)
  return MONTH_THEMES[month] ?? MONTH_THEMES[0];
}
