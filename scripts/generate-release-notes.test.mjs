import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { generateReleaseNotes } from "./generate-release-notes.mjs";
import { collectReleaseContext } from "./release-notes-context.mjs";
import { git, resolveCommit } from "./release-notes-range.mjs";
import { prepareReleaseNotes } from "./release-notes.mjs";
import { renderReleaseNotes } from "./release-notes-record.mjs";
import { releaseContextBatches } from "./release-notes-batches.mjs";
import { productReleaseChanges } from "./release-notes-product-context.mjs";


const ordinary = { security: false, securityReason: "", securityCommits: [] };
const draft = { ...ordinary, maintenanceOnly: false,
    entries: [{ text: "Review typography without an AI connection.", commits: ["abc"], bugFix: false }] };


function completed(value = draft) {
    return { status: "completed", output: [{ type: "message", status: "completed", content: [{ type: "output_text", text: JSON.stringify(value) }] }] };
}


test("generation uses the dedicated secret, disables storage, and validates structured evidence", async () => {
    const result = await generateReleaseNotes({ apiKey: "test-secret", model: "test-model", context: { changes: [] }, commits: ["abc"],
        fetchResponse: async (url, options) => {
            assert.equal(url, "https://api.openai.com/v1/responses");
            assert.equal(options.headers.Authorization, "Bearer test-secret");
            assert.equal(options.redirect, "error");
            const request = JSON.parse(options.body);
            assert.equal(request.store, false);
            assert.equal(request.model, "test-model");
            assert.deepEqual(request.reasoning, { effort: "medium" });
            assert.equal(request.text.format.type, "json_schema");
            assert.equal(request.text.format.strict, true);
            assert(request.text.format.schema.required.includes("security"));
            assert(request.instructions.includes("actual vulnerability"));
            assert(!request.input.includes("test-secret"));
            return new Response(JSON.stringify(completed()));
        } });
    assert.deepEqual(result, draft);
});


test("generated bug fixes render separately from other changes", async () => {
    const fix = { text: "Recover Drafts after restarting.", commits: ["abc"], bugFix: true };
    const value = { ...draft, entries: [fix, ...draft.entries] };
    const result = await generateReleaseNotes({ apiKey: "test-secret", context: {}, commits: ["abc"],
        fetchResponse: async () => new Response(JSON.stringify(completed(value))) });
    assert.equal(renderReleaseNotes({ ...result, reviewed: true }, new Set(["abc"])),
        "## Changes\n\n- Review typography without an AI connection.\n\n## Bug fixes\n\n- Recover Drafts after restarting.");
    assert.equal(renderReleaseNotes({ ...result, reviewed: true, entries: [fix] }, new Set(["abc"])),
        "## Bug fixes\n\n- Recover Drafts after restarting.");
});


test("failed, incomplete, refused, malformed, duplicated, and unsupported output is rejected", async () => {
    const variants = [
        { status: "incomplete", output: completed().output },
        { status: "completed", output: [] },
        { status: "completed", output: [{ type: "message", status: "incomplete", content: [] }] },
        { status: "completed", output: [{ type: "message", status: "completed", content: [{ type: "refusal", refusal: "No" }] }] },
        completed({ ...draft, entries: [{ text: "Invented", commits: ["unknown"] }] }),
        completed({ ...draft, entries: [draft.entries[0], draft.entries[0]] }),
        completed({ ...draft, entries: [{ ...draft.entries[0], bugFix: "true" }] }),
        completed({ ...draft, entries: [{ text: "Missing classification", commits: ["abc"] }] }),
        completed({ ...draft, reviewed: true }),
        completed({ ...draft, security: "true" }),
        completed({ ...draft, security: true }),
        completed({ ...draft, securityReason: "Security mentioned" }),
        completed({ ...draft, entries: [] }),
        completed({ ...draft, entries: [{ text: "<b>Unsafe</b>", commits: ["abc"] }] }),
    ];
    for (const payload of variants) {
        await assert.rejects(() => generateReleaseNotes({ apiKey: "test-secret", context: {}, commits: ["abc"],
            fetchResponse: async () => new Response(JSON.stringify(payload)) }));
    }

    await assert.rejects(() => generateReleaseNotes({ apiKey: "", context: {}, commits: [] }));
    const punctuationPattern = /HTTP 401/;
    await assert.rejects(() => generateReleaseNotes({ apiKey: "test-secret", context: {}, commits: [],
        fetchResponse: async () => new Response("secret-provider-details", { status: 401 }) }), punctuationPattern);
    const unreadableResponsePattern = /unreadable response/;
    await assert.rejects(() => generateReleaseNotes({ apiKey: "test-secret", context: {}, commits: [],
        fetchResponse: async () => new Response("not-json") }), unreadableResponsePattern);
    const couldReachOpenaiPattern = /Could not reach OpenAI/;
    await assert.rejects(() => generateReleaseNotes({ apiKey: "test-secret", context: {}, commits: [], fetchResponse: async () => {
        throw new Error("secret-provider-details");
    } }), couldReachOpenaiPattern);
    const maintenance = { ...ordinary, maintenanceOnly: true, entries: [] };
    assert.deepEqual(await generateReleaseNotes({ apiKey: "test-secret", context: {}, commits: [],
        fetchResponse: async () => new Response(JSON.stringify(completed(maintenance))) }), maintenance);
});


function repository(t) {
    const cwd = mkdtempSync(join(tmpdir(), "warplyn-generation-test-"));
    t.after(() => rmSync(cwd, { recursive: true, force: true }));
    git(["init", "--initial-branch=main"], cwd);
    git(["config", "user.name", "Release test"], cwd);
    git(["config", "user.email", "release@example.test"], cwd);
    git(["config", "commit.gpgsign", "false"], cwd);
    mkdirSync(join(cwd, "packages/web/src"), { recursive: true });
    writeFileSync(join(cwd, "packages/web/src/feature.ts"), "export const feature = false;\n");
    git(["add", "."], cwd);
    git(["commit", "-m", "Baseline"], cwd);
    git(["tag", "v0.5.5"], cwd);
    const previousCommit = resolveCommit("HEAD", cwd);
    writeFileSync(join(cwd, "packages/web/src/feature.ts"), "export const feature = true;\n");
    git(["add", "."], cwd);
    git(["commit", "-m", "refactor: visible feature"], cwd);
    return { cwd, previousCommit, sourceCommit: resolveCommit("HEAD", cwd), version: "0.6.0", previousTag: "v0.5.5" };
}


test("context includes net code and optional uncommitted work while excluding private files and test data", (t) => {
    const record = repository(t);
    const cwd = record.cwd;
    writeFileSync(join(cwd, ".env"), "PRIVATE_CONTENT");
    writeFileSync(join(cwd, "package.json"), JSON.stringify({ dependencies: { library: "2.0.0" } }));
    writeFileSync(join(cwd, "packages/web/src/feature.test.ts"), "PRIVATE_TEST_DATA");
    writeFileSync(join(cwd, "packages/web/src/new-feature.ts"), "export const newFeature = true;");
    writeFileSync(join(cwd, "packages/web/src/feature.ts"), "export const feature = 2;\n");
    const evidence = collectReleaseContext(record, { cwd, workingTree: true });
    assert(evidence.commits.includes("working-tree"));
    const serialized = JSON.stringify(evidence.context);
    assert(serialized.includes("feature = 2") && serialized.includes("newFeature"));
    assert(evidence.context.changes.some((change) => change.path === "package.json" && change.patch.includes("library")));
    assert(evidence.context.changes.find((change) => change.path.endsWith("/feature.ts")).uncommittedPatch.includes("feature = 2"));
    assert(!serialized.includes("PRIVATE_CONTENT") && !serialized.includes("PRIVATE_TEST_DATA"));
    const committed = collectReleaseContext(record, { cwd });
    assert(!committed.commits.includes("working-tree"));
    assert(JSON.stringify(committed.context).includes("feature = true"));
    assert(!JSON.stringify(committed.context).includes("newFeature"));
});


test("preparation saves only valid completed drafts and never grants model-generated publication approval", async (t) => {
    const record = repository(t);
    const options = { cwd: record.cwd, version: record.version, releases: [], previousTag: record.previousTag };
    await assert.rejects(() => prepareReleaseNotes({ ...options, generate: async () => {
        throw new Error("Generation failed");
    } }));
    assert.equal(existsSync(join(record.cwd, "release-notes/0.6.0.json")), false);
    const result = await prepareReleaseNotes({ ...options, generate: async () => ({
        ...ordinary, maintenanceOnly: false, entries: [{ text: "Use the new writing feature.", commits: [record.sourceCommit] }], reviewed: true,
    }) });
    assert.equal(result.record.reviewed, false);
    assert.equal(result.record.entries.length, 1);
    const reviewPattern = /Review/;
    assert.throws(() => renderReleaseNotes(result.record, new Set([record.sourceCommit])), reviewPattern);
});


test("preparation preserves an evidenced security suggestion without approving it", async (t) => {
    const record = repository(t);
    const security = { maintenanceOnly: false, security: true, securityReason: "Fixes an Article import vulnerability.",
        securityCommits: [record.sourceCommit], entries: [{ text: "Import Articles safely.", commits: [record.sourceCommit], bugFix: true }] };
    const result = await prepareReleaseNotes({ cwd: record.cwd, version: "0.6.0-preview.1", releases: [], previousTag: record.previousTag,
        generate: (evidence) => generateReleaseNotes({ ...evidence, apiKey: "test-secret",
            fetchResponse: async () => new Response(JSON.stringify(completed(security))) }) });
    assert.equal(result.record.reviewed, false);
    assert.equal(result.record.security, true);
    assert.equal(result.record.securityReason, security.securityReason);
    assert.deepEqual(result.record.securityCommits, [record.sourceCommit]);
});


test("large comparisons preserve all diffs in bounded batches and consolidate the generated candidates", async () => {
    const changes = ["first", "second", "third"].map((path) => ({ path, patch: "x".repeat(100_000) }));
    const seen = [];
    let consolidated = false;
    const result = await generateReleaseNotes({ apiKey: "test-secret", context: { history: "abc Feature", changes }, commits: ["abc"],
        fetchResponse: async (_url, options) => {
            const input = JSON.parse(JSON.parse(options.body).input);
            if (input.candidateSummaries) {
                assert.equal(input.candidateSummaries.length, 3);
                consolidated = true;
            } else {
                seen.push(...input.changes.map((change) => change.path));
            }

            return new Response(JSON.stringify(completed()));
        } });
    assert.deepEqual(seen.sort(), ["first", "second", "third"]);
    assert.equal(consolidated, true);
    assert.deepEqual(result, draft);
    assert.throws(() => releaseContextBatches({ changes: [{ patch: "x".repeat(200_000) }] }));
});


test("batch consolidation receives and preserves evidenced security fixes", async () => {
    const security = { ...draft, security: true, securityReason: "Fixes an Article import vulnerability.", securityCommits: ["abc"] };
    let consolidated = false;
    const result = await generateReleaseNotes({ apiKey: "test-secret", commits: ["abc"],
        context: { changes: [{ path: "first", patch: "x".repeat(100_000) }, { path: "second", patch: "x".repeat(100_000) }] },
        fetchResponse: async (_url, options) => {
            const input = JSON.parse(JSON.parse(options.body).input);
            if (input.candidateSummaries) {
                assert(input.candidateSummaries.some((candidate) => candidate.security && candidate.securityCommits.includes("abc")));
                consolidated = true;
            }

            return new Response(JSON.stringify(completed(security)));
        } });
    assert.equal(consolidated, true);
    assert.deepEqual(result, security);
});


test("product context compares capability meaning and ignores record formatting and owner-only changes", (t) => {
    const record = repository(t);
    const path = "product-model/areas/application.json";
    mkdirSync(join(record.cwd, "product-model/areas"), { recursive: true });
    const capability = { id: "app.typography", title: "Typography", status: "implemented", contract: "Custom rules are available.", owners: [] };
    writeFileSync(join(record.cwd, path), JSON.stringify({ capabilities: [capability] }));
    git(["add", "."], record.cwd);
    git(["commit", "-m", "Product baseline"], record.cwd);
    record.previousCommit = resolveCommit("HEAD", record.cwd);
    record.sourceCommit = record.previousCommit;
    writeFileSync(join(record.cwd, path), JSON.stringify({ capabilities: [{ ...capability, owners: ["new-owner.ts"] }] }, null, 4));
    assert.deepEqual(productReleaseChanges(path, record, { cwd: record.cwd, workingTree: true }), []);
    writeFileSync(join(record.cwd, path), JSON.stringify({ capabilities: [{ ...capability, contract: "Presets await review and cannot be activated." }] }));
    const changes = productReleaseChanges(path, record, { cwd: record.cwd, workingTree: true });
    assert.equal(changes.length, 1);
    assert.equal(changes[0].after.contract, "Presets await review and cannot be activated.");
});
