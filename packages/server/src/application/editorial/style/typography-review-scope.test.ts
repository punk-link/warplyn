import assert from "node:assert/strict";
import test from "node:test";
import type { StyleProfile } from "@skladno/shared";
import { reviewTypography } from "./typography-review.js";
import { scopeTypographyReview } from "./typography-review-scope.js";

test("selection provenance follows the whole-Article Proposal without checking surrounding text", () => {
    const profile: StyleProfile = { version: 1, confidence: "low", corpusItemCount: 0, characterCount: 0, contributorIds: [], traits: [], phrasesToAvoid: [], updatedAt: "2026-10-13", rules: { manual: "", typography: [{ id: "dots", definition: { kind: "ellipsis", form: "…" } }] } };
    const source = "Leave...\n\nWait...\n\nKeep...";
    const startOffset = source.indexOf("Wait");
    const endOffset = startOffset + "Wait...".length;
    const local = reviewTypography("Wait...", "Wait...", profile);
    const scoped = scopeTypographyReview(source, local.text, local.styleReview, { kind: "selection", startOffset, endOffset });
    assert.deepEqual(scoped?.typography?.changes, [{ changeId: "change-1", ruleIds: ["dots"] }]);
    assert.equal(scoped?.typography?.occurrences[0]?.start, startOffset + 4);
    assert.equal(scoped?.findings[0]?.typographyOccurrence?.start, startOffset + 4);
});
