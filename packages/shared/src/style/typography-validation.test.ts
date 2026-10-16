import assert from "node:assert/strict";
import test from "node:test";
import { isTypographyRules, typographyIssues } from "./typography-validation.js";

test("typography configuration rejects malformed, duplicate, and cycling rules", () => {
    assert.ok(isTypographyRules([]));
    assert.ok(isTypographyRules([{ id: "dots", definition: { kind: "ellipsis", form: "…" } }]));
    assert.equal(isTypographyRules([{ id: "bad", definition: { kind: "contextual", instruction: " " } }]), false);
    assert.equal(isTypographyRules([{ id: "bad", definition: { kind: "literal", source: "word", replacement: "!" } }]), false);
    const cycling = [
        { id: "one", definition: { kind: "literal", source: "!", replacement: "?" } },
        { id: "two", definition: { kind: "literal", source: "?", replacement: "!" } },
    ];
    assert.deepEqual(typographyIssues(cycling), [{ index: 1, reason: "conflict" }]);
    assert.equal(
        isTypographyRules([
            { id: "a", definition: { kind: "dash", mark: "—", spacing: "space" } },
            { id: "b", definition: { kind: "dash", mark: "–", spacing: "none" } },
        ]),
        false,
    );
    assert.equal(isTypographyRules([{ id: "a", definition: { kind: "literal", source: ".", replacement: "..." } }]), false);
});
