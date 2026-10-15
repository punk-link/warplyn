import assert from "node:assert/strict";
import test from "node:test";
import { NARROW_NO_BREAK_SPACE, NO_BREAK_SPACE, typographyPresets, type StyleProfile, type TypographyRule } from "@skladno/shared";
import { reviewTypography } from "./typography-review.js";


function profile(rules: TypographyRule[]): StyleProfile {
    return { version: 1, confidence: "low", characterCount: 0, corpusItemCount: 0, contributorIds: [], traits: [],
        phrasesToAvoid: [], rules: { manual: "", typography: rules }, updatedAt: "2026-10-15T00:00:00Z" };
}


test("all modular preset fixtures produce idempotent local corrections", () => {
    for (const preset of typographyPresets) {
        const settings = profile(preset.rules);
        for (const example of preset.examples) {
            const result = reviewTypography(example.source, example.source, settings).text;
            assert.equal(result, example.expected, `${preset.id}: ${example.source}`);
            assert.equal(reviewTypography(result, result, settings).text, result);
        }

        const protectedText = '`"code" !` https://example.test/a! 12:30 1–2';
        assert.equal(reviewTypography(protectedText, protectedText, settings).text, protectedText);
    }
});

test("explicit pairs support low-opening, reversed, single, and Japanese quotes while preserving apostrophes", () => {
    const pairs = [
        { open: "„", close: "“" }, { open: "»", close: "«" }, { open: "‘", close: "’" }, { open: "「", close: "」" },
    ];
    for (const pair of pairs) {
        const settings = profile([{ id: "quotes", definition: { kind: "quotes", outer: pair, nested: { open: "『", close: "』" } } }]);
        const source = 'She said "I don\'t change 12′ or 中文 words".';
        const expected = `She said ${pair.open}I don't change 12′ or 中文 words${pair.close}.`;
        assert.equal(reviewTypography(source, source, settings).text, expected);
        assert.equal(reviewTypography(expected, expected, settings).text, expected);
    }
});

test("French spacing stays inside matched quotes and avoids numbers and ambiguous dialogue", () => {
    const preset = typographyPresets.find((item) => item.id === "fr-FR")!;
    const settings = profile(preset.rules);
    const source = '« texte » ! 12:30\n\n— Dialogue incertain\n\n"unclosed';
    const expected = `«${NO_BREAK_SPACE}texte${NO_BREAK_SPACE}»${NARROW_NO_BREAK_SPACE}! 12:30\n\n— Dialogue incertain\n\n"unclosed`;
    const result = reviewTypography(source, source, settings);
    assert.equal(result.text, expected);
    assert.ok(result.styleReview.typography!.skipped);
});
