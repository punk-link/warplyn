import type { TypographyPreset } from "../typography-configuration.js";

export const enUsTypographyV1: TypographyPreset = {
    id: "en-US", version: 1, language: "en-US", preview: "“A quotation ‘within’ a quotation.”",
    review: { status: "pending" },
    sources: ["https://www.w3.org/Style/2013/quote-marks"],
    omissions: ["Punctuation relocation and dialogue require contextual review."],
    rules: [
        { id: "quotes", definition: { kind: "quotes", outer: { open: "“", close: "”" }, nested: { open: "‘", close: "’" } } },
        { id: "dash", definition: { kind: "dash", mark: "—", spacing: "none" } },
        { id: "ellipsis", definition: { kind: "ellipsis", form: "…" } },
    ],
    examples: [{ source: 'He said "hello".', expected: "He said “hello”." }, { source: "Version 1.2", expected: "Version 1.2" }],
};
