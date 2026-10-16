import { NARROW_NO_BREAK_SPACE, NO_BREAK_SPACE, type TypographyDefinition } from "@skladno/shared";


export function typographyPunctuationMatches(text: string, rule: Extract<TypographyDefinition, { kind: "punctuation-space" }>) {
    const patches: { start: number; end: number; replacement: string }[] = [];
    // Restrict to a letter or closing quote before punctuation; numeric and leading dialogue cases stay untouched.
    const punctuation = new RegExp(`([\\p{L}”»」』])[ ${NO_BREAK_SPACE}${NARROW_NO_BREAK_SPACE}]*([;:!?،؛؟]+)(?=$|[\\s\\p{L}“«「『])`, "gu");
    for (const match of text.matchAll(punctuation)) {
        const marks = match[2]!;
        if (!rule.marks.includes(marks[0]!))
            continue;

        const start = match.index + match[1]!.length;
        const end = match.index + match[0].length - marks.length;
        if (text.slice(start, end) !== rule.before)
            patches.push({ start, end, replacement: rule.before });
    }

    return patches;
}
