import { NARROW_NO_BREAK_SPACE, NO_BREAK_SPACE, typographyQuotePair, type TypographyDefinition, type TypographyQuotePair } from "@skladno/shared";


interface QuotePatch { start: number; end: number; replacement: string; }


const closingQuotes: Record<string, string> = {
    '"': '"', "“": "”", "«": "»", "‘": "’", "'": "'", "„": "“", "‚": "‘", "»": "«", "‹": "›", "›": "‹", "「": "」", "『": "』",
};


function quotePatches(text: string, start: number, end: number, pair: TypographyQuotePair): QuotePatch[] {
    const horizontal = new RegExp(`[ ${NO_BREAK_SPACE}${NARROW_NO_BREAK_SPACE}]`, "u");
    let innerStart = start + 1;
    let innerEnd = end;
    while (innerStart < innerEnd && horizontal.test(text[innerStart]!))
        innerStart++;

    while (innerEnd > innerStart && horizontal.test(text[innerEnd - 1]!))
        innerEnd--;

    return [
        { start, end: innerStart, replacement: pair.open + (pair.space ?? "") },
        { start: innerEnd, end: end + 1, replacement: (pair.space ?? "") + pair.close },
    ];
}


function quoteRole(text: string, index: number, closing: string | undefined, pairs: Record<string, string>): "open" | "close" | "skip" {
    const mark = text[index]!;
    const punctuationPattern = /['‘’]/u;
    const letterPattern2 = /[\p{L}\p{N}]/u;
    const letterPattern3 = /[\p{L}\p{N}]/u;
    if (punctuationPattern.test(mark) && letterPattern2.test(text[index - 1] ?? "") && letterPattern3.test(text[index + 1] ?? ""))
        return "skip";

    const numericPrime = /[\p{N}]/u;
    if (numericPrime.test(text[index - 1] ?? ""))
        return "skip";

    if (mark === closing)
        return "close";

    const letterPattern = /[\p{L}\p{N}]/u;
    if (pairs[mark] && !letterPattern.test(text[index - 1] ?? ""))
        return "open";

    return "skip";
}


export function typographyQuoteMatches(
    text: string,
    definition: Extract<TypographyDefinition, { kind: "quotes" }>,
): { patches: QuotePatch[]; skipped: number } {
    const stack: { index: number; closing: string; depth: number }[] = [];
    const patches: QuotePatch[] = [];
    let skipped = 0;
    const quotationMarks = /["“”„‟‚‛«»‹›‘’'「」『』]/gu;
    const outer = typographyQuotePair(definition.outer);
    const nested = typographyQuotePair(definition.nested);
    const sourcePairs = { ...closingQuotes, [outer.open]: outer.close, [nested.open]: nested.close };

    for (const match of text.matchAll(quotationMarks)) {
        const current = stack.at(-1);
        const role = quoteRole(text, match.index, current?.closing, sourcePairs);
        const punctuationPattern = /['‘’]/u;
        if (role === "open") {
            stack.push({ index: match.index, closing: sourcePairs[match[0]]!, depth: stack.length });
        } else if (role === "close" && current) {
            stack.pop();
            const pair = typographyQuotePair(current.depth % 2 === 0 ? definition.outer : definition.nested);
            patches.push(...quotePatches(text, current.index, match.index, pair));
        } else if (role === "skip" && !punctuationPattern.test(match[0])) {
            skipped++;
        }
    }

    const firstUnmatchedQuoteIndex = stack[0]?.index;
    const safePatches = patches.filter((patch) => firstUnmatchedQuoteIndex === undefined || patch.start < firstUnmatchedQuoteIndex);

    return { patches: safePatches, skipped: skipped + stack.length };
}
