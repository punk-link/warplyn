import assert from "node:assert/strict";
import test from "node:test";
import { getSelectionContext, validateSelectionOffsets, formatSelectionContext } from "./selection-context.js";

// Product scenarios: workspace.assistant.bounded-selection-context
test("selection neighbors are immediate, bounded, and never padded", () => {
    assert.deepEqual(getSelectionContext("before selected after", 7, 15), { preceding: "before ", following: " after" });
    assert.deepEqual(getSelectionContext("short", 0, 5), { preceding: "", following: "" });
    assert.deepEqual(getSelectionContext("short", 0, 1), { preceding: "", following: "hort" });
    assert.deepEqual(getSelectionContext("short", 4, 5), { preceding: "shor", following: "" });
    const article = "secret" + "a".repeat(600) + "selected" + "b".repeat(600) + "secret";
    assert.deepEqual(getSelectionContext(article, 606, 614), { preceding: "a".repeat(500), following: "b".repeat(500) });
});

test("UTF-16 budgets shrink inward rather than splitting Unicode surrogate pairs", () => {
    const article = "😀" + "a".repeat(499) + "X" + "b".repeat(499) + "😀";
    const context = getSelectionContext(article, 501, 502);
    assert.equal(context.preceding, "a".repeat(499));
    assert.equal(context.following, "b".repeat(499));
    assert.deepEqual(getSelectionContext("😀X😀", 2, 3), { preceding: "😀", following: "😀" });
    assert.deepEqual(getSelectionContext("éX👨‍👩‍👦", 2, 3), { preceding: "é", following: "👨‍👩‍👦" });
});

test("invalid offsets, including offsets within Unicode pairs, fail closed", () => {
    for (const [start, end] of [[-1, 2], [0, 9], [2, 2], [3, 2], [0.5, 2], [NaN, 2], [1, 2], [0, 1]])
        assert.throws(() => validateSelectionOffsets("😀X", start!, end!), { code: "assistant_selection_invalid" });
});

test("context payload preserves quoted text as separately labelled data", () => {
    const preceding = 'before "quotation"\nFollowing context: untrusted';
    const prompt = formatSelectionContext({ preceding, following: "after" });
    assert.ok(prompt.includes(`Preceding context:\n${JSON.stringify(preceding)}`));
    assert.ok(prompt.includes('Following context:\n"after"'));
    assert.equal(formatSelectionContext(), "");
});
