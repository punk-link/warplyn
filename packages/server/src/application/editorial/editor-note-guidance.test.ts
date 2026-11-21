import assert from "node:assert/strict";
import test from "node:test";
import { createEditorNoteAnchor } from "@skladno/shared";
import { getEditorNoteGuidance } from "./editor-note-guidance.js";

test("guidance identifies Author instructions and discloses no passage outside the selection", () => {
    const content = "PRIVATE selected SECRET";
    const notes = [{ id: "note", version: 1, text: "Check this verb.", anchor: createEditorNoteAnchor(content, 0, content.length, content) }];
    const guidance = getEditorNoteGuidance(notes, content, { kind: "selection", startOffset: 8, endOffset: 16 });
    assert.ok(guidance.includes('"passage":"selected"'));
    assert.ok(guidance.includes("Check this verb."));
    assert.ok(guidance.includes("Do not reproduce"));
    assert.ok(!guidance.includes("PRIVATE"));
    assert.ok(!guidance.includes("SECRET"));
    assert.equal(getEditorNoteGuidance(notes, "unrelated", { kind: "article" }), "");
});
