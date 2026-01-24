import { Calendar } from "@/components/calendar";
import { createJournalEntry } from "@/lib/parser";
import fs from "fs";
import path from "path";
import type { JournalEntry } from "@/types/journal";

async function getJournals(): Promise<JournalEntry[]> {
  const dataDir = path.join(process.cwd(), "data");

  try {
    const files = fs.readdirSync(dataDir);
    const mdFiles = files.filter((file) => file.endsWith(".md"));

    const journals: JournalEntry[] = [];
    for (const fileName of mdFiles) {
      const filePath = path.join(dataDir, fileName);
      const content = fs.readFileSync(filePath, "utf-8");
      const journal = createJournalEntry(fileName, content);
      if (journal) {
        journals.push(journal);
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

        <Calendar journals={journals} />
      </main>
    </div>
  );
}
