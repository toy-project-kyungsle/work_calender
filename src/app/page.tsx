import { CalendarWithSheet } from "@/components/CalendarWithSheet";
import { createJournalEntry } from "@/lib/parser";
import fs from "fs";
import path from "path";
import type { SerializedJournalEntry } from "@/types/journal";
import { serializeJournal } from "@/types/journal";

// data/년도/월/*.md 구조로 파일 읽기
async function getJournals(): Promise<SerializedJournalEntry[]> {
  const dataDir = path.join(process.cwd(), "data");
  const journals: SerializedJournalEntry[] = [];

  try {
    // 년도 폴더 순회
    const years = fs.readdirSync(dataDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const year of years) {
      const yearDir = path.join(dataDir, year);

      // 월 폴더 순회
      const months = fs.readdirSync(yearDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);

      for (const month of months) {
        const monthDir = path.join(yearDir, month);

        // .md 파일 읽기
        const files = fs.readdirSync(monthDir)
          .filter((f) => f.endsWith(".md"));

        for (const fileName of files) {
          const filePath = path.join(monthDir, fileName);
          const content = fs.readFileSync(filePath, "utf-8");
          const journal = createJournalEntry(fileName, content);
          if (journal) {
            journals.push(serializeJournal(journal));
          }
        }
      }
    }

    return journals;
  } catch (error) {
    console.error("Failed to load journals:", error);
    return [];
  }
}

export default async function Home() {
  const journals = await getJournals();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Work Calendar</h1>
          <p className="mt-2 text-muted-foreground">
            Obsidian 바인드 일지 시각화
          </p>
        </header>

        <CalendarWithSheet journals={journals} />
      </main>
    </div>
  );
}
