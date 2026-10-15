import { NARROW_NO_BREAK_SPACE, NO_BREAK_SPACE, type TypographyDefinition } from "@skladno/shared";
import { typographyQuoteMatches } from "./typography-quote-matches.js";


interface TypographyPatch { start: number; end: number; replacement: string; }


function patternMatches(text: string, pattern: RegExp, replacement: (match: RegExpExecArray) => string | undefined): TypographyPatch[] {
    const patches: TypographyPatch[] = [];
    for (const match of text.matchAll(pattern)) {
        const value = replacement(match);
        if (value !== undefined && value !== match[0])
            patches.push({ start: match.index, end: match.index + match[0].length, replacement: value });
    }

    return patches;
}


function escapePattern(text: string): string {
    const punctuationPattern = /[.*+?^${}()|[\]\\]/gu;
    return text.replace(punctuationPattern, "\\$&");
}


function nonbreakingMatches(text: string, definition: Extract<TypographyDefinition, { kind: "nonbreaking-space" }>): TypographyPatch[] {
    const pattern = new RegExp(
        `(?<![\\p{L}\\p{N}_])${escapePattern(definition.left)}[ ${NO_BREAK_SPACE}${NARROW_NO_BREAK_SPACE}]+` +
            `${escapePattern(definition.right)}(?![\\p{L}\\p{N}_])`,
        "gu",
    );
    return patternMatches(text, pattern, () => `${definition.left}${definition.space}${definition.right}`);
}


function dashMatches(text: string, definition: Extract<TypographyDefinition, { kind: "dash" }>): TypographyPatch[] {
    const space = definition.spacing === "space" ? " " : "";
    const proseDash = /(?<=[\p{L}"”»])(?: +[—–-] +| *— *(?=[\p{L}"“«]))/gu;
    return patternMatches(text, proseDash, (match) => {
        const next = text[match.index + match[0].length] ?? "";
        const letterPattern = /[\p{L}"“«]/u;
        if (!letterPattern.test(next))
            return undefined;

        return `${space}${definition.mark}${space}`;
    });
}


function hasNumericNeighbour(text: string, start: number, end: number): boolean {
    const horizontalSpace = new RegExp(`[ \\t${NO_BREAK_SPACE}${NARROW_NO_BREAK_SPACE}]`, "u");
    const numericCharacter = /\p{N}/u;
    const numericOperators = /[-–—−]/u;
    const immediateBefore = Array.from(text.slice(Math.max(0, start - 2), start)).at(-1) ?? "";
    const immediateAfter = Array.from(text.slice(end, end + 2))[0] ?? "";
    if (numericCharacter.test(immediateBefore + immediateAfter))
        return true;

    if (!numericOperators.test(text.slice(start, end)))
        return false;

    let before = start - 1;
    let after = end;
    while (before >= 0 && horizontalSpace.test(text[before]!))
        before--;

    while (after < text.length && horizontalSpace.test(text[after]!))
        after++;

    const previous = Array.from(text.slice(Math.max(0, before - 1), before + 1)).at(-1) ?? "";
    const next = Array.from(text.slice(after, after + 2))[0] ?? "";
    return numericCharacter.test(previous + next);
}


function literalMatches(text: string, definition: Extract<TypographyDefinition, { kind: "literal" }>): TypographyPatch[] {
    const literalPunctuation = new RegExp(escapePattern(definition.source), "gu");
    return patternMatches(text, literalPunctuation, (match) => {
        if (hasNumericNeighbour(text, match.index, match.index + match[0].length))
            return undefined;

        return definition.replacement;
    });
}


export function typographyRuleMatches(text: string, definition: TypographyDefinition): { patches: TypographyPatch[]; skipped: number } {
    if (definition.kind === "quotes")
        return typographyQuoteMatches(text, definition);

    let patches: TypographyPatch[] = [];
    const ellipsis = /(?<![.\p{N}])(?:\.{3}|…)(?![.\p{N}])/gu;
    const repeatedProseSpaces = /(?<=\S) {2,}(?=\S)/gu;
    switch (definition.kind) {
        case "ellipsis":
            patches = patternMatches(text, ellipsis, () => definition.form);
            break;
        case "dash":
            patches = dashMatches(text, definition);
            break;
        case "nonbreaking-space":
            patches = nonbreakingMatches(text, definition);
            break;
        case "horizontal-space":
            patches = patternMatches(text, repeatedProseSpaces, () => " ");
            break;
        case "literal":
            patches = literalMatches(text, definition);
            break;
        case "contextual":
            break;
    }

    return { patches, skipped: 0 };
}
