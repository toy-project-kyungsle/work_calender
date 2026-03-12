"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { JournalEntry } from "@/types/journal";
import { SECTION_NAMES } from "@/lib/constants";
import { MarkdownContent } from "./MarkdownContent";

interface JournalSheetProps {
  journal: JournalEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPrevJournal?: () => void;
  onNextJournal?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
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
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--calendar-line)] text-[var(--calendar-accent)] text-sm"
          aria-hidden="true"
        >
          {icon}
        </span>
        <h3 className="text-xs font-semibold tracking-[0.3em] text-[var(--calendar-muted)]">
          {title}
        </h3>
      </div>
      <div className="mt-3 text-sm leading-6 text-[var(--calendar-text)]">
        <MarkdownContent content={content} />
      </div>
    </section>
  );
}

export function JournalSheet({
  journal,
  open,
  onOpenChange,
  onPrevJournal,
  onNextJournal,
  hasPrev,
  hasNext,
}: JournalSheetProps) {
  const hasContent =
    journal &&
    (journal.routine ||
      journal.nineToSix ||
      journal.growth ||
      journal.notes ||
      journal.retrospective);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto gap-0">
        {journal ? (
          <>
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
              {hasContent ? (
                <>
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
                    icon="🌱"
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
                </>
              ) : (
                /* 빈 일지 안내 문구 */
                <div className="border-t border-[var(--calendar-line)] py-10 text-center">
                  <div className="text-3xl mb-3" aria-hidden="true">📋</div>
                  <p className="text-sm text-[var(--calendar-muted)]">
                    이 날의 일지 내용이 없습니다.
                  </p>
                  <p className="mt-1 text-xs text-[var(--calendar-muted)] opacity-70">
                    마크다운 파일에 내용을 추가해보세요.
                  </p>
                </div>
              )}
            </div>

            {/* 이전/다음 일지 이동 버튼 */}
            {(hasPrev || hasNext) && (
              <div className="mt-auto border-t border-[var(--calendar-line)] px-6 py-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onPrevJournal}
                  disabled={!hasPrev}
                  aria-label="이전 일지"
                  className="flex items-center gap-1.5 text-xs font-semibold text-[var(--calendar-muted)] transition-colors hover:text-[var(--calendar-text)] disabled:opacity-30 disabled:cursor-default focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--calendar-accent)]"
                >
                  <span aria-hidden="true">&lt;</span>
                  이전 일지
                </button>
                <button
                  type="button"
                  onClick={onNextJournal}
                  disabled={!hasNext}
                  aria-label="다음 일지"
                  className="flex items-center gap-1.5 text-xs font-semibold text-[var(--calendar-muted)] transition-colors hover:text-[var(--calendar-text)] disabled:opacity-30 disabled:cursor-default focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--calendar-accent)]"
                >
                  다음 일지
                  <span aria-hidden="true">&gt;</span>
                </button>
              </div>
            )}
          </>
        ) : (
          /* journal이 null일 때 빈 상태 */
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <div className="text-4xl mb-4" aria-hidden="true">📖</div>
            <p className="text-sm text-[var(--calendar-muted)]">
              날짜를 선택하면 일지를 볼 수 있습니다.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
