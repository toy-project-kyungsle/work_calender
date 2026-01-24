declare module "node-summarizer" {
  export class SummarizerManager {
    constructor(text: string, numberOfSentences: number);
    getSummaryByFrequency(): Promise<{ summary: string }>;
  }
}
