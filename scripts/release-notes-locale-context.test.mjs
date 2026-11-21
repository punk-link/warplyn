import assert from "node:assert/strict";
import test from "node:test";
import { compactLocaleChanges } from "./release-notes-locale-context.mjs";


test("catalog moves preserve wording changes and omit unchanged literals", () => {
    const root = "packages/web/src/i18n/locales/es/";
    const before = { "old.ts": 'export const messages = {"ui.a": ("" + "A"), "ui.b": "B", "ui.removed": "Gone"};' };
    const after = { "new.ts": 'export const messages = {"ui.a": "A", "ui.b": "Changed", "ui.c": "C"};' };
    const changes = ["old.ts", "new.ts"].map((name) => ({ path: root + name, patch: "raw" }));
    const result = compactLocaleChanges(changes, (path) => before[path.slice(root.length)] || "",
        (path) => after[path.slice(root.length)] || "");
    assert.equal(result.length, 1);
    const summary = JSON.parse(result[0].patch);
    assert.equal(summary.unchanged, 1);
    assert.deepEqual(summary.messages, [
        { key: "ui.b", before: "B", after: "Changed" }, { key: "ui.removed", before: "Gone" }, { key: "ui.c", after: "C" },
    ]);
});

test("assembly and unsupported expressions keep raw evidence", () => {
    const changes = [{ path: "packages/web/src/i18n/locales/es/index.ts", patch: "raw" }];
    assert.deepEqual(compactLocaleChanges(changes, () => "", () => "export const es = {...messages};"), changes);
});
