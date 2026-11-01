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
import { runReleaseStep } from "./release-progress.mjs";


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
        const action = answer.trim().toLowerCase();

        return action === "edit" ? "edit" : action === "yes";
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
        const published = await runReleaseStep("Reading published releases", releases, print);
        const result = await runReleaseStep("Preparing release notes", () =>
            prepareReleaseNotes({ version, previousTag, cwd, releases: published, generate: manual ? null : generate }), print);
        print(`Generated ${path}. Review evidence: ${result.reviewPath}`);
        if (manual)
            await waitForDraftEdit(path, approve);
    }

    const head = resolveCommit("HEAD", cwd);
    while (true) {
        assert.equal(resolveCommit("HEAD", cwd), head, "The source changed during review. Rerun the release command.");
        assertReleaseWorktree(version, cwd);
        const draft = await readReviewDraft({ path, version, cwd }, { approve, print });
        if (!draft)
            continue;

        const { record, candidate, original, releaseVersion, body } = draft;
        await runReleaseStep("Reviewing test changes", () => reviewTests(record, { cwd, manual, print }), print);
        print(`\nRelease v${releaseVersion}\n\n${body}\n\nSecurity: ${record.security ? record.securityReason : "ordinary release"}\n`);
        if (record.reviewed === true)
            return record;

        const action = await approve("Type yes to approve, verify and publish; edit to revise the saved draft; anything else to cancel: ");
        if (action === "edit") {
            await waitForDraftEdit(path, approve);
            continue;
        }

        assert(action === true, `Release cancelled. Edit ${path} if needed, then rerun the same release command.`);
        if (readFileSync(path, "utf8") !== original) {
            print("The draft changed during review. Reloading it for a fresh review.");
            continue;
        }

        assert.equal(resolveCommit("HEAD", cwd), head, "The source changed during review. Rerun the release command.");
        assertReleaseWorktree(version, cwd);
        writeFileSync(path, `${JSON.stringify(candidate, null, 4)}\n`, "utf8");

        return candidate;
    }
}


async function waitForDraftEdit(path, approve) {
    assert(await approve(`Edit ${path} and save it, then type yes to reload and review; anything else to cancel: `) === true,
        "Release cancelled. The saved draft is available for a later retry.");
}


async function readReviewDraft({ path, version, cwd }, { approve, print }) {
    try {
        const original = readFileSync(path, "utf8");
        const record = JSON.parse(original);
        assert.equal(record.version, version, "Release notes version does not match the intended release.");
        const candidate = { ...record, reviewed: true };
        const releaseVersion = classifiedReleaseVersion(candidate);
        const body = validateReleaseRecord(candidate, releaseVersion, "HEAD", cwd);

        return { original, record, candidate, releaseVersion, body };
    } catch (error) {
        print(`Release notes need correction: ${error.message}`);
        await waitForDraftEdit(path, approve);

        return undefined;
    }
}
