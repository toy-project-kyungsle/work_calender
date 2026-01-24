// Server-side only - 빌드 타임에 요약 생성
import { SummarizerManager } from "node-summarizer";

/**
 * 일지 내용을 2-3문장으로 요약합니다.
 * @param content - 요약할 텍스트
 * @returns 요약된 문자열
 */
export async function summarizeJournal(content: string): Promise<string> {
  // 빈 내용 처리
  if (!content || content.trim().length === 0) {
    return "";
  }

  // 너무 짧은 내용은 그대로 반환
  if (content.length < 50) {
    return content.trim();
  }

  try {
    const summarizer = new SummarizerManager(content, 2); // 2문장 요약
    const result = await summarizer.getSummaryByFrequency();

    if (result.summary && result.summary.trim().length > 0) {
      return result.summary.trim();
    }

    // 요약 실패 시 폴백
    return content.slice(0, 80).trim() + "...";
  } catch (error) {
    console.error("Summarization failed:", error);
    // 폴백: 첫 80자
    return content.slice(0, 80).trim() + "...";
  }
}