"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { JournalEntry } from "@/types/journal";
import { SECTION_NAMES } from "@/lib/constants";

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
    <section className="border-t border-[var(--calendar-line)] py-5">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--calendar-line)] text-[var(--calendar-accent)] text-sm">
          {icon}
        </span>
        <h3 className="text-xs font-semibold tracking-[0.3em] text-[var(--calendar-muted)]">
          {title}
        </h3>
      </div>
      <div className="mt-3 text-sm leading-6 text-[var(--calendar-text)] whitespace-pre-wrap">
        {content}
      </div>
    </section>
  );
}

export function JournalSheet({
  journal,
  open,
  onOpenChange,
}: JournalSheetProps) {
  if (!journal) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto gap-0">
        <SheetHeader className="border-b border-[var(--calendar-line)] px-6 py-5">
          <div className="text-[10px] font-semibold tracking-[0.45em] text-[var(--calendar-muted)]">
            JOURNAL ENTRY
          </div>
          <SheetTitle className="mt-3 font-display text-3xl text-[var(--calendar-accent)]">
            {formatDate(journal.date)}
          </SheetTitle>
          {journal.hasGrowthContent && (
            <div className="mt-2 text-[10px] font-semibold tracking-[0.4em] text-[var(--calendar-accent)]">
              🔥 개인 공부 성공!
            </div>
          )}
        </SheetHeader>

        <div className="px-6 pb-6">
          {journal.routine && (
            <JournalSection
              title={SECTION_NAMES.routine}
              content={journal.routine}
              icon="📋"
            />
          )}

          <JournalSection
            title={SECTION_NAMES.nineToSix}
            content={journal.nineToSix}
            icon="💼"
          />

          <JournalSection
            title={SECTION_NAMES.growth}
            content={journal.growth}
            icon="🌙"
          />

          <JournalSection
            title={SECTION_NAMES.notes}
            content={journal.notes}
            icon="📝"
          />

          <JournalSection
            title={SECTION_NAMES.retrospective}
            content={journal.retrospective}
            icon="💭"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
