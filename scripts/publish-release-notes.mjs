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


export function getRelease(tag, run = github) {
    const result = run(["api", "repos/punk-link/warplyn/releases", "--paginate", "--jq",
        `.[] | select(.tag_name == ${JSON.stringify(tag)})`]);
    if (!result.trim())
        return undefined;

    const release = JSON.parse(result.trim().split("\n")[0]);
    assert(release, `Release ${tag} was not found, including drafts.`);
    return release;
}


export function publishReleaseNotes({ tag, body, targetCommit, run = github }) {
    const directory = mkdtempSync(join(tmpdir(), "warplyn-release-notes-"));
    const file = join(directory, "release.json");
    const prerelease = tag.includes("-preview.");
    const security = tag.endsWith(".security") || body.startsWith("## Security release\n\n");
    const title = `Warplyn ${tag}${security ? " - Security release" : ""}`;
    try {
        const ref = JSON.parse(run(["api", `repos/punk-link/warplyn/commits/${tag}`]));
        assert.equal(ref.sha, targetCommit, "Remote release tag differs from the verified commit. Stop and inspect the tag.");
        let release = getRelease(tag, run);
        if (!release) {
            writeFileSync(file, JSON.stringify({ tag_name: tag, name: title, body, draft: true, prerelease }), "utf8");
            try {
                release = JSON.parse(run(["api", "repos/punk-link/warplyn/releases", "--method", "POST", "--input", file]));
            } catch (error) {
                release = getRelease(tag, run);
                if (!release)
                    throw error;
            }
        }

        assert(release, `Release ${tag} was not found, including drafts.`);
        assert(release.tag_name === tag && release.draft === true && release.prerelease === prerelease,
            "Release identity or channel differs. Inspect the release before retrying publication.");
        if (security)
            assert.equal(release.name, title, "Security release title differs. Mark the release as a security release before retrying.");

        assert.equal(release.body?.replaceAll("\r\n", "\n").trim(), body,
            "Existing release summary differs from the tagged notes. Resolve the mismatch before uploading assets.");
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
