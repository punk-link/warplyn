import assert from "node:assert/strict";
import test from "node:test";
import { applyProposalChanges, createTextProposal } from "./revisions.js";
import { parseProposalReplacements, withProposalReplacements } from "./proposal-replacements.js";


test("replacement edits preserve group identity, rejected text, empty deletions, and whitespace", () => {
    const generated = createTextProposal("First\n\nAnchor\n\nLast", "Changed first\n\nAnchor\n\nChanged last");
    const [first, last] = generated.changes;
    assert.ok(first && last);
    const edited = withProposalReplacements(generated, { [first.id]: "  Author text\n\nNew paragraph  ", [last.id]: "" });
    assert.deepEqual(edited.changes.map((change) => [change.id, change.baseStart, change.baseEnd]),
        generated.changes.map((change) => [change.id, change.baseStart, change.baseEnd]));
    assert.equal(applyProposalChanges(edited, new Set([first.id])), "  Author text\n\nNew paragraph  \n\nAnchor\n\nLast");
    assert.equal(applyProposalChanges(edited, new Set([last.id])), "First\n\nAnchor\n");
    assert.equal(generated.proposedContent, "Changed first\n\nAnchor\n\nChanged last");
});


test("addition and removal groups accept Author replacement text", () => {
    for (const [base, proposed] of [["", "Added"], ["Removed", ""]]) {
        const review = createTextProposal(base, proposed);
        const id = review.changes[0]!.id;
        const edited = withProposalReplacements(review, { [id]: "Author\ntext" });
        assert.equal(applyProposalChanges(edited, new Set([id])), "Author\ntext");
        assert.equal(applyProposalChanges(edited, new Set()), base);
    }
});


test("replacement metadata validates values at recovery and transport boundaries", () => {
    assert.deepEqual(parseProposalReplacements({ "change-1": "" }), { "change-1": "" });
    for (const invalid of [undefined, null, [], "text", { "change-1": 3 }])
        assert.equal(parseProposalReplacements(invalid), undefined);
});
