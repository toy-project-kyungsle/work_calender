import { CalendarWithSheet } from "@/components/CalendarWithSheet";
import { getJournals } from "@/lib/journals";
import { getMonthTheme } from "@/lib/themes";

export default async function Home() {
  const journals = await getJournals();

  // 현재 월 기준 초기 배경색 설정
  const today = new Date();
  const theme = getMonthTheme(today.getMonth());

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{
        backgroundColor: theme.bg,
        backgroundImage: `radial-gradient(circle at top, ${theme.paper} 0%, ${theme.bg} 45%, ${theme.paperMuted} 100%)`,
      }}
    >
      <main className="mx-auto flex w-full max-w-6xl flex-col py-12">
        <CalendarWithSheet journals={journals} />
      </main>
    </div>
  );
}
