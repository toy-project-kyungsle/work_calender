import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Work Calendar</h1>
          <p className="mt-2 text-muted-foreground">
            Obsidian 바인드 일지 시각화
          </p>
        </header>

        <div className="flex justify-center gap-4">
          <Button variant="outline">이전 달</Button>
          <Button variant="default">2025년 1월</Button>
          <Button variant="outline">다음 달</Button>
        </div>

        {/* 캘린더 컴포넌트가 여기에 들어갈 예정 */}
        <div className="mt-8 rounded-lg border border-border p-4">
          <p className="text-center text-muted-foreground">
            캘린더 컴포넌트 준비 중...
          </p>
        </div>
      </main>
    </div>
  );
}
