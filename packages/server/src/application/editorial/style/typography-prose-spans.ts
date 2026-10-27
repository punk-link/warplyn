interface ProseSpan { start: number; end: number; }


function protectPattern(content: string, protectedCharacters: Uint8Array, pattern: RegExp): void {
    for (const match of content.matchAll(pattern))
        protectedCharacters.fill(1, match.index, match.index + match[0].length);
}


function protectCodeLines(content: string, protectedCharacters: Uint8Array): void {
    let fence: { mark: string; length: number } | undefined;
    const lines = /[^\n]*(?:\n|$)/gu;
    for (const line of content.matchAll(lines)) {
        if (!line[0])
            continue;

        const punctuationPattern = /^ {0,3}(`{3,}|~{3,})/u;
        const marker = punctuationPattern.exec(line[0]);
        const wasFenced = Boolean(fence);

        if (marker) {
            const mark = marker[1]!;
            if (!fence)
                fence = { mark: mark[0]!, length: mark.length };
            else if (mark[0] === fence.mark && mark.length >= fence.length && line[0].trim() === mark)
                fence = undefined;
        }

        const indentedOrReferenceLine = /^(?: {4}|\t)|^ {0,3}\[[^\]]+\]:/u;
        if (wasFenced || fence || marker || indentedOrReferenceLine.test(line[0]))
            protectedCharacters.fill(1, line.index, line.index + line[0].length);
    }
}


function protectInlineCode(content: string, protectedCharacters: Uint8Array): void {
    const backtickRuns = /`+/gu;
    const runs = [...content.matchAll(backtickRuns)];
    const nextByLength = new Map<number, RegExpExecArray>();
    const closingRuns = new Map<number, RegExpExecArray>();

    for (const run of [...runs].reverse()) {
        const next = nextByLength.get(run[0].length);
        if (next)
            closingRuns.set(run.index, next);

        nextByLength.set(run[0].length, run);
    }

    for (const match of runs) {
        if (protectedCharacters[match.index])
            continue;

        const start = match.index;
        const closing = closingRuns.get(start);
        protectedCharacters.fill(1, start, closing ? closing.index + closing[0].length : content.length);
    }
}


export function typographyProseSpans(content: string): ProseSpan[] {
    const protectedCharacters = new Uint8Array(content.length);
    protectCodeLines(content, protectedCharacters);
    protectInlineCode(content, protectedCharacters);
    const markupSyntax = /!?\[[^\]\n]*\](?:\([^\n]*?\)|\[[^\]\n]*\])|\[\^[^\]\n]*\]|<[^>\n]*>|&(?:#\w+|\w+);|\\[^\n]/gu;
    const technicalTokens = /(?:https?:\/\/|www\.)[^\s<>]+|\b[\w.+-]+@[\w.-]+\.[\p{L}]+|\b[\p{L}\p{N}_]+(?:[._/-][\p{L}\p{N}_]+)+/gu;
    protectPattern(content, protectedCharacters, markupSyntax);
    protectPattern(content, protectedCharacters, technicalTokens);
    const blockMarkers = /^ {0,3}(?:[-+*] +|\d+[.)] +|#{1,6} +|> +)/gmu;
    const horizontalRules = /^ {0,3}(?:[-*_][ \t]*){3,}(?:\r?\n|$)/gmu;
    protectPattern(content, protectedCharacters, blockMarkers);
    protectPattern(content, protectedCharacters, horizontalRules);
    const rawHtmlBlocks = /<(pre|code|script|style)\b[^>]*>[\s\S]*?(?:<\/\1\s*>|$)|<!--[\s\S]*?(?:-->|$)/giu;
    const ambiguousMarkupLine = /^.*(?:\[[^\]\n]*$|<[^>\n]*$).*$/gmu;
    protectPattern(content, protectedCharacters, rawHtmlBlocks);
    protectPattern(content, protectedCharacters, ambiguousMarkupLine);
    const spans: ProseSpan[] = [];
    let start = 0;

    while (start < content.length) {
        if (protectedCharacters[start]) {
            start++;
            continue;
        }

        let end = start + 1;
        while (end < content.length && !protectedCharacters[end])
            end++;

        spans.push({ start, end });
        start = end;
    }

    return spans;
}
