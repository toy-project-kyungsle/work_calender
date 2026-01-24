export interface MonthTheme {
  bg: string;
  paper: string;
  paperMuted: string;
  line: string;
  accent: string;
  text: string;
  muted: string;
}

const baseTheme: MonthTheme = {
  bg: "#f4efe7",
  paper: "#fbf8f2",
  paperMuted: "#f1ece4",
  line: "#e2d7c8",
  accent: "#c45442",
  text: "#2f2b26",
  muted: "#8b8277",
};

export function getMonthTheme(month: number): MonthTheme {
  return baseTheme;
}
