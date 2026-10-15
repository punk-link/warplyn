import { NARROW_NO_BREAK_SPACE, NO_BREAK_SPACE } from "../../text/unicode-characters.js";
import type { TypographyPreset } from "../typography-configuration.js";

export const frFrTypographyV1: TypographyPreset = {
    id: "fr-FR", version: 1, language: "fr-FR", preview: `«${NO_BREAK_SPACE}Une citation${NO_BREAK_SPACE}»${NARROW_NO_BREAK_SPACE}!`,
    review: { status: "pending" },
    sources: ["https://www.w3.org/Style/2013/quote-marks", "https://unicode.org/versions/Unicode16.0.0/core-spec/chapter-6/"],
    omissions: ["Publisher-specific spacing, dialogue, and punctuation relocation require contextual review."],
    rules: [
        { id: "quotes", definition: {
            kind: "quotes", outer: { open: "«", close: "»", space: NO_BREAK_SPACE }, nested: { open: "“", close: "”" },
        } },
        { id: "punctuation-fine", definition: { kind: "punctuation-space", marks: ";!?", before: NARROW_NO_BREAK_SPACE } },
        { id: "punctuation-colon", definition: { kind: "punctuation-space", marks: ":", before: NO_BREAK_SPACE } },
        { id: "ellipsis", definition: { kind: "ellipsis", form: "…" } },
    ],
    examples: [{ source: "Bonjour !", expected: `Bonjour${NARROW_NO_BREAK_SPACE}!` }, { source: "12:30", expected: "12:30" }],
};
