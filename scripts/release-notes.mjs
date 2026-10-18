import assert from "node:assert/strict";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { git, resolveCommit, reviewMaterial, selectBaseline, versionParts } from "./release-notes-range.mjs";
import { collectReleaseContext } from "./release-notes-context.mjs";
import { generateReleaseNotes } from "./generate-release-notes.mjs";
import { renderReleaseDraft } from "./release-notes-record.mjs";


export async function prepareReleaseNotes({ version, releases, previousTag, cwd = process.cwd(), generate = generateReleaseNotes }) {
    assert.equal(git(["status", "--porcelain"], cwd), "", "Commit or stash changes before preparing release notes.");
    const sourceCommit = resolveCommit("HEAD", cwd);
    const baseline = selectBaseline({ releases, version, sourceCommit, previousTag, cwd });
    const record = { version, ...baseline, sourceCommit, reviewed: false, maintenanceOnly: false, entries: [],
        security: false, securityReason: "", securityCommits: [] };
    const material = reviewMaterial(record, cwd);
    const destination = join(cwd, "release-notes", `${version}.json`);
    assert(!existsSync(destination), "Notes already exist for this version. Review them or remove the unfinished record before retrying.");
    if (generate) {
        const evidence = collectReleaseContext(record, { cwd });
        const draft = await generate(evidence);
        renderReleaseDraft(draft, new Set(evidence.commits));
        record.maintenanceOnly = draft.maintenanceOnly;
        record.entries = draft.entries;
        record.security = draft.security;
        record.securityReason = draft.securityReason;
        record.securityCommits = draft.securityCommits;
    }

    mkdirSync(join(cwd, "release-notes"), { recursive: true });
    writeFileSync(destination, `${JSON.stringify(record, null, 4)}\n`, { flag: "wx" });
    const reviewPath = git(["rev-parse", "--git-path", `release-notes-${version}-review.txt`], cwd);
    const instructions = "Review the diffs and net result. Combine related visible changes; omit internal or reverted effects.\n";
    writeFileSync(resolve(cwd, reviewPath), instructions + material, "utf8");
    return { record, reviewPath };
}


export async function previewComparison(version, tag, cwd = process.cwd()) {
    versionParts(tag);
    const record = { version, previousTag: tag, previousCommit: resolveCommit(`refs/tags/${tag}`, cwd), sourceCommit: resolveCommit("HEAD", cwd) };
    const evidence = collectReleaseContext(record, { workingTree: true, cwd });
    const draft = await generateReleaseNotes(evidence);
    const body = renderReleaseDraft(draft, new Set(evidence.commits));
    const path = git(["rev-parse", "--git-path", "release-notes-preview.json"], cwd);
    writeFileSync(resolve(cwd, path), `${JSON.stringify({ ...record, ...draft, reviewed: false, preview: true }, null, 4)}\n`, "utf8");
    console.log(body);
    console.log(`\nSuggested security classification: ${draft.security ? draft.securityReason : "ordinary release"}`);
    console.log(`\nGenerated preview including uncommitted work. Evidence: ${path}. This preview cannot be published.`);
}
