"use client";

import ReactMarkdown from "react-markdown";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="journal-prose">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
