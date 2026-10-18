import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { prepareReleaseNotes } from "./release-notes.mjs";
import { compareVersions, git, releaseCommits, resolveCommit, selectBaseline } from "./release-notes-range.mjs";
import { classifiedReleaseVersion, readTaggedNotes, renderReleaseNotes, validateReleaseRecord } from "./release-notes-record.mjs";


// Product scenario: application.release-summary-evidence


function repository(t) {
    const cwd = mkdtempSync(join(tmpdir(), "warplyn-notes-test-"));
    t.after(() => rmSync(cwd, { recursive: true, force: true }));
    git(["init", "--initial-branch=main"], cwd);
    git(["config", "user.name", "Release test"], cwd);
    git(["config", "user.email", "release@example.test"], cwd);
    git(["config", "commit.gpgsign", "false"], cwd);
    mkdirSync(join(cwd, "packages/electron"), { recursive: true });
    writeFileSync(join(cwd, "package.json"), JSON.stringify({ version: "0.5.5", scripts: { test: "node --test" } }));
    writeFileSync(join(cwd, "packages/electron/package.json"), JSON.stringify({ version: "0.5.5", productName: "Warplyn" }));
    writeFileSync(join(cwd, "package-lock.json"), JSON.stringify({ version: "0.5.5", packages: { "": { version: "0.5.5" } } }));
    commit(cwd, "Initial source");
    git(["tag", "v0.5.5"], cwd);
    return cwd;
}


function commit(cwd, subject, path = "change.txt", content = subject) {
    writeFileSync(join(cwd, path), content);
    git(["add", "."], cwd);
    git(["commit", "-m", subject], cwd);
    return resolveCommit("HEAD", cwd);
}


function published(tag, extra = {}) {
    return { tag_name: tag, draft: false, prerelease: tag.includes("-preview."),
        assets: [{ name: `com.warplyn.desktop-${tag.slice(1)}-full.nupkg` }], ...extra };
}


function reviewed(record, commits) {
    return { security: false, securityReason: "", securityCommits: [],
        ...record, reviewed: true, entries: [{ text: "Recover your latest writing after restarting.", commits }] };
}


test("selects stable and preview baselines by version, ancestry, publication, and product", (t) => {
    const cwd = repository(t);
    commit(cwd, "Stable");
    git(["tag", "v0.6.0"], cwd);
    commit(cwd, "Preview");
    git(["tag", "v0.7.0-preview.1"], cwd);
    git(["tag", "v0.7.0-preview.1.security"], cwd);
    git(["tag", "v0.7.0-preview.2"], cwd);
    git(["checkout", "-b", "unrelated", "v0.5.5"], cwd);
    commit(cwd, "Other branch");
    git(["tag", "v0.8.0"], cwd);
    git(["checkout", "main"], cwd);
    const sourceCommit = commit(cwd, "Current");
    const releases = [published("v0.6.0"), published("v0.7.0-preview.1"), published("v0.7.0-preview.1.security"),
        published("v0.7.0-preview.2", { draft: true }), published("v0.8.0"), published("v0.5.5", { assets: [] })];
    const select = (version) => selectBaseline({ releases, version, sourceCommit, cwd }).previousTag;
    assert.equal(select("0.7.0"), "v0.6.0");
    assert.equal(select("0.7.0-preview.3"), "v0.7.0-preview.1.security");
    assert.equal(select("0.9.0-preview.1"), "v0.7.0-preview.1.security");
    assert(compareVersions("0.7.0", "0.7.0-preview.99.security") > 0);
    const omitPattern = /Omit/;
    assert.throws(() => selectBaseline({ releases, version: "0.9.0", sourceCommit, cwd, previousTag: "v0.5.5" }), omitPattern);
});


test("requires an explicit first-release baseline and leaves an unfinished record with review material", async (t) => {
    const cwd = repository(t);
    const visible = commit(cwd, "refactor: recover latest Draft", "recovery.ts");
    commit(cwd, "feat: internal build cleanup", "build.mjs");
    const options = { cwd, version: "0.6.0", releases: [], generate: null };
    const previousTagPattern = /--previous-tag/;
    await assert.rejects(() => prepareReleaseNotes(options), previousTagPattern);
    const { record, reviewPath } = await prepareReleaseNotes({ ...options, previousTag: "v0.5.5" });
    assert.equal(record.reviewed, false);
    assert.equal(record.security, false);
    const material = readFileSync(join(cwd, reviewPath), "utf8");
    assert(material.includes("recovery.ts") && material.includes("build.mjs") && material.includes(`git show ${visible}`));
    const reviewPattern = /Review/;
    assert.throws(() => renderReleaseNotes(record, new Set([visible])), reviewPattern);
    const commitStashPattern = /Commit or stash/;
    await assert.rejects(() => prepareReleaseNotes({ ...options, previousTag: "v0.5.5" }), commitStashPattern);
});


test("reviewed security classification controls the preview tag and tagged record lookup", async (t) => {
    const cwd = repository(t);
    const visible = commit(cwd, "Fix Article import vulnerability");
    const version = "0.6.0-preview.1";
    const { record } = await prepareReleaseNotes({ cwd, version, releases: [], previousTag: "v0.5.5", generate: null });
    const final = reviewed({ ...record, security: true, securityReason: "Fixes an Article import vulnerability.", securityCommits: [visible] }, [visible]);
    assert.equal(classifiedReleaseVersion(record), version);
    assert.equal(classifiedReleaseVersion(final), `${version}.security`);
    commit(cwd, "Review security notes", `release-notes/${version}.json`, JSON.stringify(final));
    git(["tag", `v${version}.security`], cwd);
    const tagged = readTaggedNotes(`${version}.security`, `v${version}.security`, cwd);
    assert.equal(validateReleaseRecord(tagged, `${version}.security`, `v${version}.security`, cwd),
        "- Recover your latest writing after restarting.");
    const classificationPattern = /security classification/;
    const reviewPattern = /Review/;
    const previewRequiredPattern = /require a preview version/;
    const unsuffixedPattern = /unsuffixed/;
    assert.throws(() => validateReleaseRecord(final, version, "HEAD", cwd), classificationPattern);
    assert.throws(() => validateReleaseRecord({ ...final, security: false, securityReason: "", securityCommits: [] },
        `${version}.security`, "HEAD", cwd), classificationPattern);
    assert.throws(() => validateReleaseRecord({ ...final, reviewed: false }, `${version}.security`, "HEAD", cwd), reviewPattern);
    assert.throws(() => classifiedReleaseVersion({ ...final, version: "0.6.0" }), previewRequiredPattern);
    assert.throws(() => classifiedReleaseVersion({ ...final, version: `${version}.security` }), unsuffixedPattern);
});


test("security classifications require explicit flags, valid evidence, and a visible fix", () => {
    const record = reviewed({ maintenanceOnly: false, security: true,
        securityReason: "Fixes an Article import vulnerability.", securityCommits: ["a"] }, ["a"]);
    const commits = new Set(["a", "b"]);
    assert(renderReleaseNotes(record, commits));
    const variants = [
        { security: undefined }, { security: "true" }, { securityReason: "" }, { securityReason: "<b>Fix</b>" },
        { securityReason: "x".repeat(601) }, { securityCommits: [] }, { securityCommits: ["unknown"] },
        { securityCommits: ["a", "a"] }, { securityCommits: ["b"] },
        { maintenanceOnly: true, entries: [] }, { security: false },
    ];
    for (const extra of variants)
        assert.throws(() => renderReleaseNotes({ ...record, ...extra }, commits));
});


test("validates grouped evidence, maintenance-only notes, duplicates, unsupported text, and body bounds", () => {
    const commits = new Set(["a", "b", "reverted", "revert"]);
    const record = reviewed({ maintenanceOnly: false }, ["a", "b"]);
    assert.equal(renderReleaseNotes(record, commits), "- Recover your latest writing after restarting.");
    const duplicatePattern = /duplicate/;
    assert.throws(() => renderReleaseNotes({ ...record, entries: [...record.entries, ...record.entries] }, commits), duplicatePattern);
    const outsidePattern = /outside/;
    assert.throws(() => renderReleaseNotes(reviewed(record, ["outside"]), commits), outsidePattern);
    const maintenancePattern = /Maintenance-only/;
    assert.throws(() => renderReleaseNotes({ ...record, entries: [] }, commits), maintenancePattern);
    for (const text of ["", "<b>Changes</b>", "[link](url)", "https://example.test", "**Bold**", "line\nbreak", "x".repeat(8000)])
        assert.throws(() => renderReleaseNotes({ ...record, entries: [{ text, commits: ["a"] }] }, commits));

    const hash = "a".repeat(40);
    const inlineCommitPattern = /commit IDs/;
    assert.throws(() => renderReleaseNotes({ ...record, entries: [{ text: `Changed in ${hash}`, commits: [hash] }] }, new Set([hash])), inlineCommitPattern);

    const maintenance = renderReleaseNotes({ ...record, maintenanceOnly: true, entries: [] }, commits);
    assert.equal(maintenance, "This release contains maintenance changes with no changes to your writing workflow.");
});


test("validates committed notes and version-only preparation; rejects stale or moved evidence", async (t) => {
    const cwd = repository(t);
    const visible = commit(cwd, "Visible recovery fix");
    const { record } = await prepareReleaseNotes({ cwd, version: "0.6.0", releases: [], previousTag: "v0.5.5", generate: null });
    const final = reviewed(record, [visible]);
    const previewPattern = /Comparison previews/;
    assert.throws(() => validateReleaseRecord({ ...final, preview: true }, "0.6.0", "HEAD", cwd), previewPattern);
    commit(cwd, "Review notes", "release-notes/0.6.0.json", JSON.stringify(final));
    assert.equal(validateReleaseRecord(readTaggedNotes("0.6.0", "HEAD", cwd), "0.6.0", "HEAD", cwd),
        "- Recover your latest writing after restarting.");
    commit(cwd, "Release version", "package.json", JSON.stringify({ version: "0.6.0", scripts: { test: "node --test" } }));
    assert(validateReleaseRecord(final, "0.6.0", "HEAD", cwd));
    commit(cwd, "Sneak product changes into package", "package.json", JSON.stringify({ version: "0.6.0", scripts: {} }));
    const nonVersionPattern = /Non-version/;
    assert.throws(() => validateReleaseRecord(final, "0.6.0", "HEAD", cwd), nonVersionPattern);
    commit(cwd, "Revert package changes", "package.json", JSON.stringify({ version: "0.6.0", scripts: { test: "node --test" } }));
    assert.throws(() => validateReleaseRecord(final, "0.6.0", "HEAD", cwd), nonVersionPattern);
    commit(cwd, "More product changes", "new.ts");
    const productChangesPattern = /Product changes/;
    assert.throws(() => validateReleaseRecord(final, "0.6.0", "HEAD", cwd), productChangesPattern);
    git(["tag", "-f", "v0.5.5"], cwd);
    const baselineTagMovedPattern = /baseline tag moved/;
    assert.throws(() => validateReleaseRecord(final, "0.6.0", "HEAD", cwd), baselineTagMovedPattern);
});


test("includes merged commits once and retains revert evidence for net-change review", (t) => {
    const cwd = repository(t);
    const baseline = resolveCommit("v0.5.5", cwd);
    git(["checkout", "-b", "feature"], cwd);
    const visible = commit(cwd, "Visible feature", "feature.txt");
    git(["checkout", "main"], cwd);
    const internal = commit(cwd, "Internal cleanup", "internal.txt");
    git(["merge", "--no-ff", "feature", "-m", "Merge feature"], cwd);
    git(["revert", "--no-edit", visible], cwd);
    const ids = releaseCommits(baseline, resolveCommit("HEAD", cwd), cwd);
    assert.equal(new Set(ids).size, 4);
    assert(ids.includes(visible) && ids.includes(internal));
    const ancestorPattern = /ancestor/;
    assert.throws(() => releaseCommits(resolveCommit("HEAD", cwd), baseline, cwd), ancestorPattern);
});
