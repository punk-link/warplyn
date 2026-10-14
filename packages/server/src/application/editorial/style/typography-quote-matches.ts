import type { TypographyDefinition } from "@skladno/shared";


interface QuotePatch { start: number; end: number; replacement: string; }


const quotePairs = { curly: ["“", "”"], guillemets: ["«", "»"], straight: ['"', '"'] } as const;
const closingQuotes: Record<string, string> = { '"': '"', "“": "”", "«": "»", "‘": "’", "'": "'" };


function quoteRole(text: string, index: number, closing?: string): "open" | "close" | "skip" {
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
    if (closingQuotes[mark] && !letterPattern.test(text[index - 1] ?? ""))
        return "open";

    return "skip";
}


export function typographyQuoteMatches(text: string, definition: Extract<TypographyDefinition, { kind: "quotes" }>): { patches: QuotePatch[]; skipped: number } {
    const stack: { index: number; closing: string; depth: number }[] = [];
    const patches: QuotePatch[] = [];
    let skipped = 0;
    const quotationMarks = /["“”«»‘’']/gu;

    for (const match of text.matchAll(quotationMarks)) {
        const current = stack.at(-1);
        const role = quoteRole(text, match.index, current?.closing);
        const punctuationPattern = /['‘’]/u;
        if (role === "open") {
            stack.push({ index: match.index, closing: closingQuotes[match[0]]!, depth: stack.length });
        } else if (role === "close" && current) {
            stack.pop();
            const pair = quotePairs[current.depth % 2 === 0 ? definition.outer : definition.nested];
            patches.push({ start: current.index, end: current.index + 1, replacement: pair[0] }, { start: match.index, end: match.index + 1, replacement: pair[1] });
        } else if (role === "skip" && !punctuationPattern.test(match[0])) {
            skipped++;
        }
    }

    // An unmatched outer quote makes its whole group ambiguous.
    const unmatched = stack[0]?.index;
    return { patches: patches.filter((patch) => unmatched === undefined || patch.start < unmatched), skipped: skipped + stack.length };
}
