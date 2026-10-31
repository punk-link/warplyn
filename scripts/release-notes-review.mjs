import assert from "node:assert/strict";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { prepareReleaseNotes } from "./release-notes.mjs";
import { classifiedReleaseVersion, validateReleaseRecord } from "./release-notes-record.mjs";
import { git, resolveCommit } from "./release-notes-range.mjs";
import { github } from "./publish-release-notes.mjs";
import { reviewReleaseTestChanges } from "./explain-test-changes.mjs";


const nullSeparator = "\0";


export function assertReleaseWorktree(version, cwd = process.cwd()) {
    const paths = [git(["diff", "--name-only", "-z", "HEAD"], cwd), git(["diff", "--cached", "--name-only", "-z"], cwd),
    git(["ls-files", "--others", "--exclude-standard", "-z"], cwd)].flatMap((value) => value.split(nullSeparator).filter(Boolean));
    assert(paths.every((path) => path === `release-notes/${version}.json`),
        "Commit or stash changes before releasing. Only this release's notes may be uncommitted.");
}


function publishedReleases() {
    const pages = JSON.parse(github(["api", "--paginate", "--slurp", "repos/punk-link/warplyn/releases?per_page=100"]));
    return pages.flat();
}


async function approveRelease(question) {
    assert(stdin.isTTY && stdout.isTTY,
        "Release review needs an interactive terminal. Review the saved draft, set reviewed to true, then rerun the same release command.");
    const terminal = createInterface({ input: stdin, output: stdout });
    try {
        const answer = await terminal.question(question);
        return answer.trim().toLowerCase() === "yes";
    } finally {
        terminal.close();
    }
}


export async function reviewReleaseNotes({ version, previousTag, manual = false, cwd = process.cwd() },
    { releases = publishedReleases, generate, approve = approveRelease, print = console.log,
        reviewTests = reviewReleaseTestChanges } = {}) {
    assertReleaseWorktree(version, cwd);
    const path = join(cwd, "release-notes", `${version}.json`);
    if (!existsSync(path)) {
        const result = await prepareReleaseNotes({ version, previousTag, cwd, releases: await releases(), generate: manual ? null : generate });
        print(`Generated ${path}. Review evidence: ${result.reviewPath}`);
        assert(!manual, `Fill in ${path}, then rerun the same release command to review and publish.`);
    }

    const original = readFileSync(path, "utf8");
    const record = JSON.parse(original);
    assert.equal(record.version, version, "Release notes version does not match the intended release.");
    const candidate = { ...record, reviewed: true };
    const releaseVersion = classifiedReleaseVersion(candidate);
    await reviewTests(record, { cwd, manual, print });
    const body = validateReleaseRecord(candidate, releaseVersion, "HEAD", cwd);
    print(`\nRelease v${releaseVersion}\n\n${body}\n\nSecurity: ${record.security ? record.securityReason : "ordinary release"}\n`);
    if (record.reviewed === true)
        return record;

    const head = resolveCommit("HEAD", cwd);
    assert(await approve("Approve these notes and security classification, then verify and publish? Type yes to continue: "),
        `Release cancelled. Edit ${path} if needed, then rerun the same release command.`);
    assert.equal(readFileSync(path, "utf8"), original, "The draft changed during review. Rerun the release command to review it again.");
    assert.equal(resolveCommit("HEAD", cwd), head, "The source changed during review. Rerun the release command.");
    assertReleaseWorktree(version, cwd);
    writeFileSync(path, `${JSON.stringify(candidate, null, 4)}\n`, "utf8");

    return candidate;
}
