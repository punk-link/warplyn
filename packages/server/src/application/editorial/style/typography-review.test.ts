import assert from "node:assert/strict";
import test from "node:test";
import { NO_BREAK_SPACE, type StyleProfile, type TypographyRule } from "@skladno/shared";
import { reviewTypography } from "./typography-review.js";


function profile(rules: TypographyRule[]): StyleProfile {
    return {
        version: 1,
        confidence: "low",
        characterCount: 0,
        corpusItemCount: 0,
        contributorIds: [],
        traits: [],
        phrasesToAvoid: [],
        rules: { manual: "", typography: rules },
        updatedAt: "2026-10-13T00:00:00Z",
    };
}


const rules: TypographyRule[] = [
    { id: "quotes", definition: { kind: "quotes", outer: "curly", nested: "guillemets" } },
    { id: "ellipsis", definition: { kind: "ellipsis", form: "…" } },
    { id: "dash", definition: { kind: "dash", mark: "—", spacing: "space" } },
    { id: "space", definition: { kind: "horizontal-space" } },
    { id: "nbsp", definition: { kind: "nonbreaking-space", left: "10", right: "kg", space: NO_BREAK_SPACE } },
];

test("checks prose punctuation with stable rule provenance and idempotent output", () => {
    const source = '😀 "Hello..."  words – words, 10 kg. 3.14 and 1–2 stay.\r\n';
    const result = reviewTypography(source, source, profile(rules), undefined, true);
    assert.equal(result.text, `😀 “Hello…” words — words, 10${NO_BREAK_SPACE}kg. 3.14 and 1–2 stay.\r\n`);
    assert.ok(result.styleReview.typography?.local);
    assert.equal(result.styleReview.typography?.rules.length, rules.length);
    assert.equal(result.styleReview.typography?.changes[0]?.ruleIds.length, 5);
    assert.equal(reviewTypography(result.text, result.text, profile(rules)).text, result.text);
});

test("protects Markdown, URLs, technical identifiers, and ambiguous quotes", () => {
    const protectedText =
        '```js\r\n"code..."  unchanged\r\n```\r\n`"inline..."` ["link..."](https://example.test/a...) <i title="..."> &quot; \\" https://example.test/... ' +
        'file.name\n    "indented..."\n';
    assert.equal(reviewTypography(protectedText, protectedText, profile(rules)).text, protectedText);
    const relationships = "north–south, 1–2, and negative -2 stay unchanged.";
    assert.equal(reviewTypography(relationships, relationships, profile([rules[2]!])).text, relationships);
    const ambiguousMarkup = '<pre>"raw..."  code</pre>\nAn [unfinished "link..."\n';
    assert.equal(reviewTypography(ambiguousMarkup, ambiguousMarkup, profile(rules)).text, ambiguousMarkup);
    const multilineCode = "`one...\ntwo...`\n```\ncode...\n```~~~\nmore code...\n";
    assert.equal(reviewTypography(multilineCode, multilineCode, profile(rules)).text, multilineCode);
    const ambiguous = 'I don\'t change 12" or "unclosed...';
    const result = reviewTypography(ambiguous, ambiguous, profile([rules[0]!]));
    assert.equal(result.text, ambiguous);
    assert.ok(result.styleReview.typography!.skipped > 0);
});

test("handles nested pairs and reports contextual rules without running them locally", () => {
    const source = '"A ‘nested’ quote"';
    const contextual: TypographyRule = { id: "context", definition: { kind: "contextual", instruction: "Use punctuation appropriate to the speaker." } };
    const result = reviewTypography(source, source, profile([rules[0]!, contextual]), undefined, true);
    assert.equal(result.text, "“A «nested» quote”");
    assert.deepEqual(result.styleReview.typography?.contextualRuleIds, ["context"]);
});

test("literal punctuation replacement preserves numbers and uses one final combined diff", () => {
    const source = "One paragraph.\n\nWait!! 42!!";
    const candidate = "A clearer paragraph.\n\nWait!! 42!!";
    const rule: TypographyRule = { id: "literal", definition: { kind: "literal", source: "!!", replacement: "!" } };
    const result = reviewTypography(source, candidate, profile([rule]), { findings: [{ divergence: "Opening", suggestion: "Clarify", traitIds: ["voice"] }] });
    assert.equal(result.text, "A clearer paragraph.\n\nWait! 42!!");
    assert.equal(result.styleReview.findings.length, 2);
    assert.equal(result.styleReview.typography?.changes.length, 1);
    const markdown = "- A list -- with punctuation.\n\n---\n";
    const dash: TypographyRule = { id: "literal-dash", definition: { kind: "literal", source: "--", replacement: "—" } };
    assert.equal(reviewTypography(markdown, markdown, profile([dash])).text, "- A list — with punctuation.\n\n---\n");
    const numeric = "1 - 2 and - 3";
    const minus: TypographyRule = { id: "minus", definition: { kind: "literal", source: "-", replacement: "—" } };
    assert.equal(reviewTypography(numeric, numeric, profile([minus])).text, numeric);
});
