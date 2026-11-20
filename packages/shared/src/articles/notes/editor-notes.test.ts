import assert from "node:assert/strict";
import test from "node:test";
import { createEditorNoteAnchor, getRelevantEditorNotes, isEditorNoteChange, resolveEditorNoteAnchor } from "./editor-notes.js";

test("anchors follow unchanged context and reject edited, missing, and ambiguous passages", () => {
    const source = "before selected after";
    const anchor = createEditorNoteAnchor(source, 7, 15, "selected");
    assert.deepEqual(resolveEditorNoteAnchor(source, anchor), { startOffset: 7, endOffset: 15 });
    assert.deepEqual(resolveEditorNoteAnchor("New paragraph. " + source, anchor), { startOffset: 22, endOffset: 30 });
    assert.equal(resolveEditorNoteAnchor("before changed after", anchor), undefined);
    assert.equal(resolveEditorNoteAnchor("unrelated selected passage", anchor), undefined);
    assert.equal(resolveEditorNoteAnchor(source + " " + source, anchor), undefined);
    assert.equal(resolveEditorNoteAnchor("", anchor), undefined);
});

test("only attached overlapping notes accompany a selection", () => {
    const content = "one two three";
    const notes = [
        { id: "one", version: 1, text: "First guidance", anchor: createEditorNoteAnchor(content, 0, 3, "one") },
        { id: "two", version: 1, text: "Second guidance", anchor: createEditorNoteAnchor(content, 4, 7, "two") },
    ];
    assert.deepEqual(getRelevantEditorNotes(notes, content, { kind: "selection", startOffset: 2, endOffset: 4 }), [notes[0]]);
    assert.deepEqual(getRelevantEditorNotes(notes, content, { kind: "selection", startOffset: 3, endOffset: 4 }), []);
    assert.deepEqual(getRelevantEditorNotes(notes, content, { kind: "article" }), notes);
    assert.deepEqual(getRelevantEditorNotes(notes, "missing", { kind: "article" }), []);
});

test("note mutations validate all untrusted fields and bounds", () => {
    const change = { kind: "save", id: "note", expectedVersion: 0, text: "Guide", anchor: createEditorNoteAnchor("text", 0, 4, "text") };
    assert.equal(isEditorNoteChange(change), true);
    for (const invalid of [null, {}, { ...change, expectedVersion: -1 }, { ...change, expectedVersion: 0.5 },
        { ...change, text: " " }, { ...change, text: "x".repeat(10001) }, { ...change, anchor: { ...change.anchor, before: "x".repeat(65) } },
        { ...change, anchor: { ...change.anchor, quote: "" } }, { kind: "remove", id: "note", expectedVersion: 0 }])
        assert.equal(isEditorNoteChange(invalid), false);

    assert.equal(isEditorNoteChange({ kind: "remove", id: "note", expectedVersion: 1 }), true);
});
