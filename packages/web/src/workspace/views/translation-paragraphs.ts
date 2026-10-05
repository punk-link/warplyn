function insideProtectedValue(content: string, position: number, protectedSpans: readonly string[]): boolean {
    return protectedSpans.some((value) => {
        if (!value)
            return false;

        const start = content.lastIndexOf(value, position);
        return start >= 0 && start < position && start + value.length > position;
    });
}


export function splitTranslationParagraphs(content: string, protectedSpans: readonly string[] = []): string[] {
    const paragraphs: string[] = [];
    let start = 0;
    for (const match of content.matchAll(/\n\s*\n|(?=^\s*(?:#{1,6}\s|[-*+]\s+|\d+\.\s))/gm)) {
        if (insideProtectedValue(content, match.index, protectedSpans))
            continue;

        paragraphs.push(content.slice(start, match.index));
        start = match.index + match[0].length;
    }

    paragraphs.push(content.slice(start));
    return paragraphs.filter((paragraph) => paragraph.trim().length > 0);
}
