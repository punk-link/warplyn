export interface ArticleTitleGenerator {
    generate(content: string, signal: AbortSignal, language?: string): Promise<string>;
}
