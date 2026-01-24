import { CalendarWithSheet } from "@/components/CalendarWithSheet";
import { createJournalEntry } from "@/lib/parser";
import { summarizeJournal } from "@/lib/summarizer";
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
    const years = fs
      .readdirSync(dataDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const year of years) {
      const yearDir = path.join(dataDir, year);

      // 월 폴더 순회
      const months = fs
        .readdirSync(yearDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);

      for (const month of months) {
        const monthDir = path.join(yearDir, month);

        // .md 파일 읽기
        const files = fs.readdirSync(monthDir).filter((f) => f.endsWith(".md"));

        for (const fileName of files) {
          const filePath = path.join(monthDir, fileName);
          const content = fs.readFileSync(filePath, "utf-8");
          const journal = createJournalEntry(fileName, content);
          if (journal) {
            // 첫 번째 할 일 + 노트 첫 줄로 요약
            journal.summary = summarizeJournal(journal.nineToSix, journal.notes);
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
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#f4efe7",
        backgroundImage:
          "radial-gradient(circle at top, #fbf7f0 0%, #f4efe7 45%, #efe9df 100%)",
      }}
    >
      <main className="mx-auto flex w-full max-w-6xl flex-col py-12">
        <CalendarWithSheet journals={journals} />
      </main>
    </div>
  );
}
