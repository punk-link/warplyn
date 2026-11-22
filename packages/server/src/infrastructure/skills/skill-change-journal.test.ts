import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import test from "node:test";
import { SkillChangeJournal } from "./skill-change-journal.js";


for (const [label, name, content] of [
    ["malformed JSON", "damaged.json", "{broken"],
    ["mismatched identity", "wrong.json", JSON.stringify({ requestId: "request", skillId: "author-review" })],
    ["unsafe recovery files", `${createHash("sha256").update("request").digest("hex")}.json`,
        JSON.stringify({ requestId: "request", skillId: "author-review", previousFiles: { "../outside.md": "unsafe" } })],
    ["invalid snapshot", `${createHash("sha256").update("request").digest("hex")}.json`,
        JSON.stringify({ requestId: "request", skillId: "author-review", previousFiles: { "SKILL.md": "not a valid Skill" } })],
    ["oversized data", "oversized.json", "x".repeat(2 * 1024 * 1024 + 1)],
]) {
    test(`journal reads preserve ${label} as unreadable evidence`, (context) => {
        const root = mkdtempSync(join(tmpdir(), "warplyn-skill-journal-"));
        assert.equal(dirname(resolve(root)), resolve(tmpdir()));
        context.after(() => rmSync(root, { recursive: true, force: true }));
        mkdirSync(join(root, "skill-staging"));
        const path = join(root, "skill-staging", name!);
        writeFileSync(path, content!);
        assert.deepEqual(new SkillChangeJournal(root).list(), [{ kind: "unreadable" }]);
        assert.equal(readFileSync(path, "utf8"), content);
    });
}
