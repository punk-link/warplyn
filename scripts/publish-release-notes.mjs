import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { readTaggedNotes, validateReleaseRecord } from "./release-notes-record.mjs";
import { resolveCommit, versionParts } from "./release-notes-range.mjs";


export function github(args) {
    return execFileSync("gh", args, { encoding: "utf8", stdio: "pipe", maxBuffer: 16 * 1024 * 1024 });
}


export function publishReleaseNotes({ tag, body, targetCommit, run = github }) {
    const directory = mkdtempSync(join(tmpdir(), "warplyn-release-notes-"));
    const file = join(directory, "notes.txt");
    const prerelease = tag.includes("-preview.");
    try {
        writeFileSync(file, body, "utf8");
        try {
            run(["release", "create", tag, "--repo", "punk-link/warplyn", "--verify-tag",
                `--prerelease=${prerelease}`, "--title", `Warplyn ${tag}`, "--notes-file", file]);
        } catch {
            // Another platform may have created this release first. Validate before uploading assets.
        }

        const release = JSON.parse(run(["api", `repos/punk-link/warplyn/releases/tags/${tag}`]));
        assert(release.tag_name === tag && release.draft === false && release.prerelease === prerelease,
            "Existing release identity or channel differs. Inspect the release before retrying publication.");
        assert.equal(release.body?.replaceAll("\r\n", "\n").trim(), body,
            "Existing release summary differs from the tagged notes. Resolve the mismatch before uploading assets.");
        const ref = JSON.parse(run(["api", `repos/punk-link/warplyn/commits/${tag}`]));
        assert.equal(ref.sha, targetCommit, "Remote release tag differs from the verified commit. Stop and inspect the tag.");
    } finally {
        rmSync(directory, { recursive: true, force: true });
    }
}


if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
    const tag = process.argv[2];
    versionParts(tag);
    assert(tag.startsWith("v"), "Pass the release tag, including v.");
    const version = tag.slice(1);
    const target = resolveCommit(`refs/tags/${tag}`);
    const record = readTaggedNotes(version, target);
    const body = validateReleaseRecord(record, version, target);
    publishReleaseNotes({ tag, body, targetCommit: target });
}
