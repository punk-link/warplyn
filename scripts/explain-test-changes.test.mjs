import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { collectTestChanges, explainTestChanges, reviewReleaseTestChanges } from "./explain-test-changes.mjs";


test("oversized evidence produces a manual-review report without calling the provider or stopping release review", async (t) => {
    const cwd = mkdtempSync(join(tmpdir(), "warplyn-test-report-"));
    t.after(() => rmSync(cwd, { recursive: true, force: true }));
    const git = (...args) => execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
    git("init");
    git("config", "user.name", "Test");
    git("config", "user.email", "test@example.test");
    git("config", "commit.gpgsign", "false");
    git("commit", "--allow-empty", "-m", "Baseline");
    const previousCommit = git("rev-parse", "HEAD");
    writeFileSync(join(cwd, "large.test.mjs"), "x".repeat(180_000));
    git("add", ".");
    git("commit", "-m", "Large test change");
    const sourceCommit = git("rev-parse", "HEAD");
    const evidence = collectTestChanges(previousCommit, sourceCommit, "owner/repo", cwd);
    assert(evidence.unavailable.includes("Review the diff manually"));
    assert.deepEqual(evidence.changes, []);
    assert.equal(await explainTestChanges(evidence, { fetchResponse: () => assert.fail("Unexpected request") }), evidence.unavailable);
    const report = await reviewReleaseTestChanges({ previousCommit, sourceCommit }, {
        cwd, print: () => undefined, generate: () => assert.fail("Oversized evidence cannot reach the provider"),
    });
    assert(readFileSync(report, "utf8").includes(evidence.unavailable));
});


test("collector compares exact commits and rejects option-like refs", () => {
    const sha = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
    assert.equal(collectTestChanges(sha, sha, "owner/repo").changes.length, 0);
    assert.throws(() => collectTestChanges("--help", sha, "owner/repo"));
});


test("unchanged tests do not call the provider or require a key", async () => {
    const summary = await explainTestChanges({ changes: [] }, { fetchResponse: () => assert.fail("Unexpected request") });
    assert(summary.startsWith("No test"));
});


test("summary uses Luna without storage and sends evidence as data", async () => {
    const evidence = { changes: [{ path: "example.test.mjs", patch: "- strict assertion" }] };
    const summary = await explainTestChanges(evidence, { apiKey: "fake", fetchResponse: async (url, options) => {
        assert.equal(url, "https://api.openai.com/v1/responses");
        const body = JSON.parse(options.body);
        assert.equal(body.model, "gpt-6-luna");
        assert.equal(body.store, false);
        assert.deepEqual(JSON.parse(body.input), evidence);
        return { ok: true, json: async () => ({ status: "completed", output: [
            { type: "message", status: "completed", content: [{ type: "output_text", text: "Weaker protection." }] },
        ] }) };
    } });
    assert.equal(summary, "Weaker protection.");
});


test("incomplete and refused output cannot become a summary", async () => {
    for (const payload of [{ status: "incomplete" }, { status: "completed", output: [
        { type: "message", status: "completed", content: [{ type: "refusal" }] },
    ] }])
        await assert.rejects(explainTestChanges({ changes: [{}] }, { apiKey: "fake",
            fetchResponse: async () => ({ ok: true, json: async () => payload }) }));
});
