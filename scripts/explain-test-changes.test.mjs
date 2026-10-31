import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync } from "node:child_process";
import { collectTestChanges, explainTestChanges } from "./explain-test-changes.mjs";


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
