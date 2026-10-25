import assert from "node:assert/strict";
import { compareVersions, git, releaseCommits, resolveCommit, versionParts } from "./release-notes-range.mjs";


const hashPattern = /^[a-f0-9]{40}$/;
const unsafeTextPattern = /[<>[\]`*_]|https?:\/\/|www\./i;
const lineBreakPattern = /\r?\n/;
const securitySuffixPattern = /\.security$/;
const maintenanceMessage = "This release contains maintenance changes with no changes to your writing workflow.";


function validateEntry(entry, commits) {
    assert(entry && typeof entry.text === "string" && entry.text.trim(), "Each summary entry needs plain-language text.");
    assert(entry.bugFix === undefined || typeof entry.bugFix === "boolean", "Set entry bugFix to true or false.");
    assert.equal(entry.text, entry.text.trim(), "Remove leading or trailing whitespace from summary entries.");
    assert(!unsafeTextPattern.test(entry.text), "Use plain text without HTML, URLs, Markdown formatting, or line breaks in entries.");
    assert(![...entry.text].some((character) => character.charCodeAt(0) < 32), "Remove control characters and line breaks from entries.");
    assert(Array.isArray(entry.commits) && entry.commits.length > 0, "Each entry needs supporting commit IDs.");
    assert.equal(new Set(entry.commits).size, entry.commits.length, "Remove duplicate evidence within an entry.");
    for (const commit of entry.commits) {
        assert(commits.has(commit), `Evidence ${commit} is outside the release range. Refresh the notes.`);
        assert(!hashPattern.test(commit) || !entry.text.includes(commit), "Keep commit IDs in the commits array, outside the displayed summary.");
    }
}


export function renderReleaseNotes(record, commits) {
    assert(record && record.reviewed === true, "Review the release notes and set reviewed to true before releasing.");
    return renderReleaseDraft(record, commits);
}


export function renderReleaseDraft(record, commits) {
    assert(Array.isArray(record.entries), "Release notes need an entries array.");
    assert.equal(typeof record.maintenanceOnly, "boolean", "Set maintenanceOnly explicitly after reviewing the changes.");
    assert.equal(record.maintenanceOnly, record.entries.length === 0, "Maintenance-only notes must have no benefit entries.");
    const entries = new Set();
    for (const entry of record.entries) {
        validateEntry(entry, commits);
        const key = entry.text.toLocaleLowerCase("en");
        assert(!entries.has(key), "Combine duplicate release-summary entries.");
        entries.add(key);
    }

    validateSecurityClassification(record, commits);
    const body = record.maintenanceOnly ? maintenanceMessage : renderChangeSections(record.entries);
    assert(body.length <= 8000, "Release summary exceeds 8,000 characters. Shorten it before publication.");
    return body;
}


function renderChangeSections(entries) {
    const changes = entries.filter((entry) => !entry.bugFix).map((entry) => `- ${entry.text}`).join("\n");
    const fixes = entries.filter((entry) => entry.bugFix).map((entry) => `- ${entry.text}`).join("\n");
    if (!fixes)
        return changes;

    return [changes && `## Changes\n\n${changes}`, `## Bug fixes\n\n${fixes}`].filter(Boolean).join("\n\n");
}


function validateSecurityClassification(record, commits) {
    assert.equal(typeof record.security, "boolean", "Review and set the security flag explicitly.");
    assert.equal(typeof record.securityReason, "string", "Provide a securityReason string.");
    assert(Array.isArray(record.securityCommits), "Provide a securityCommits array.");
    if (!record.security) {
        assert(record.securityReason === "" && record.securityCommits.length === 0,
            "Clear securityReason and securityCommits when security is false.");
        return;
    }

    assert(!record.maintenanceOnly, "Describe the security fix in the release notes instead of marking it maintenance-only.");
    assert(record.securityReason.length <= 600, "Keep the security justification within 600 characters.");
    validateEntry({ text: record.securityReason, commits: record.securityCommits }, commits);
    const displayedEvidence = new Set(record.entries.flatMap((entry) => entry.commits));
    assert(record.securityCommits.every((commit) => displayedEvidence.has(commit)), "Security evidence must also support a release-note entry.");
}


export function classifiedReleaseVersion(record) {
    versionParts(record.version);
    assert(!record.version.endsWith(".security"), "Keep the draft version unsuffixed; the reviewed security flag controls the release tag.");
    assert.equal(typeof record.security, "boolean", "Review and set the security flag explicitly.");
    if (!record.security)
        return record.version;

    assert(record.version.includes("-preview."), "Security tags currently require a preview version. Prepare and review a preview release.");
    return `${record.version}.security`;
}


function versionMetadata(content, path) {
    const value = JSON.parse(content);
    delete value.version;
    if (path === "package-lock.json") {
        delete value.packages?.[""]?.version;
        delete value.packages?.["packages/electron"]?.version;
    }

    return value;
}


function validatePreparationChanges(record, target, cwd) {
    const range = `${record.sourceCommit}..${target}`;
    const changes = git(["log", "-m", "--format=", "--name-only", "--no-renames", range], cwd).split(lineBreakPattern).filter(Boolean);
    const metadataPaths = ["package.json", "package-lock.json", "packages/electron/package.json"];
    const allowed = new Set([...metadataPaths, `release-notes/${record.version}.json`]);
    assert(changes.every((path) => allowed.has(path)), "Product changes followed the reviewed source commit. Prepare and review notes again.");
    const commits = releaseCommits(record.sourceCommit, resolveCommit(target, cwd), cwd);
    for (const path of metadataPaths) {
        const before = versionMetadata(git(["show", `${record.sourceCommit}:${path}`], cwd), path);
        for (const commit of commits) {
            const after = versionMetadata(git(["show", `${commit}:${path}`], cwd), path);
            assert.deepEqual(after, before, `Non-version changes in ${path}. Prepare notes again.`);
        }
    }
}


export function validateReleaseRecord(record, version, target = "HEAD", cwd = process.cwd()) {
    versionParts(version);
    assert(record && classifiedReleaseVersion(record) === version, "Release notes version or security classification does not match the intended release.");
    assert(record.preview !== true, "Comparison previews cannot be released. Prepare notes from a clean worktree first.");
    assert(hashPattern.test(record.sourceCommit) && hashPattern.test(record.previousCommit), "Notes must pin full source and baseline commit IDs.");
    versionParts(record.previousTag);
    assert(compareVersions(record.previousTag, version) < 0, "The baseline must be an earlier release version.");
    assert(version.includes("-preview.") || !record.previousTag.includes("-preview."), "Stable notes must compare with a stable baseline.");
    assert.equal(resolveCommit(`refs/tags/${record.previousTag}`, cwd), record.previousCommit, "The baseline tag moved. Review the release range again.");
    assert(["published", "legacy-first-release"].includes(record.baseline), "Release notes need a recorded baseline decision.");
    if (record.baseline === "legacy-first-release")
        assert.equal(record.previousTag, "v0.5.5", "Only v0.5.5 is the inherited migration baseline.");

    const commits = new Set(releaseCommits(record.previousCommit, record.sourceCommit, cwd));
    releaseCommits(record.sourceCommit, resolveCommit(target, cwd), cwd);
    validatePreparationChanges(record, target, cwd);
    return renderReleaseNotes(record, commits);
}


export function readTaggedNotes(version, target = "HEAD", cwd = process.cwd()) {
    versionParts(version);
    const draftVersion = version.replace(securitySuffixPattern, "");
    try {
        return JSON.parse(git(["show", `${target}:release-notes/${draftVersion}.json`], cwd));
    } catch {
        throw new Error(`Committed notes for ${version} are unavailable. Rerun the matching release command to generate and review them.`);
    }
}
