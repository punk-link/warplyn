import type { TypographyPreset } from "../typography-configuration.js";

export const ruRuTypographyV1: TypographyPreset = {
    id: "ru-RU", version: 1, language: "ru-RU", preview: "«Цитата „внутри“ цитаты»",
    review: { status: "pending" },
    sources: ["https://www.w3.org/TR/typography/", "https://gramota.ru/biblioteka/spravochniki/pravila-russkoy-orfografii-i-punktuatsii"],
    omissions: ["Dialogue and syntactic dash placement require contextual review."],
    rules: [
        { id: "quotes", definition: { kind: "quotes", outer: { open: "«", close: "»" }, nested: { open: "„", close: "“" } } },
        { id: "dash", definition: { kind: "dash", mark: "—", spacing: "space" } },
        { id: "ellipsis", definition: { kind: "ellipsis", form: "…" } },
    ],
    examples: [{ source: 'Он сказал "привет".', expected: "Он сказал «привет»." }, { source: "10–20", expected: "10–20" }],
};
