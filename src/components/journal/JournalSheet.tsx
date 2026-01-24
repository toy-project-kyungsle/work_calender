"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { JournalEntry } from "@/types/journal";

interface JournalSheetProps {
  journal: JournalEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  return `${year}년 ${month}월 ${day}일 (${weekday})`;
}

function JournalSection({
  title,
  content,
  icon,
}: {
  title: string;
  content: string;
  icon: string;
}) {
  if (!content) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </h3>
      <div className="text-sm text-muted-foreground whitespace-pre-wrap pl-6">
        {content}
      </div>
    </div>
  );
}

export function JournalSheet({ journal, open, onOpenChange }: JournalSheetProps) {
  if (!journal) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">
            {formatDate(journal.date)}
            {journal.hasAfterSixContent && " 🔥"}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          {journal.routine && (
            <JournalSection
              title="루틴"
              content={journal.routine}
              icon="📋"
            />
          )}

          <JournalSection
            title="9 to 6 할 일"
            content={journal.nineToSix}
            icon="💼"
          />

          <JournalSection
            title="6시 이후 하려는 일"
            content={journal.afterSix}
            icon="🌙"
          />

          <JournalSection
            title="노트"
            content={journal.notes}
            icon="📝"
          />

          <JournalSection
            title="회고"
            content={journal.retrospective}
            icon="💭"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
