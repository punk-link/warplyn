import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { publishReleaseNotes } from "./publish-release-notes.mjs";

// Product scenario: application.release-summary-publication


test("platform creation, races, and retries publish the exact body through a file", () => {
    const tag = "v1.2.3-preview.1";
    const body = '- Recover writing with Unicode: café.\n- Keep literal shell characters $() and "quotes".';
    let published;
    for (const creator of ["Windows", "Linux", "retry"]) {
        publishReleaseNotes({ tag, body, targetCommit: "abc", run: (args) => {
            if (args[0] === "release") {
                assert(args.includes("--verify-tag") && args.includes("--prerelease=true"));
                const actual = readFileSync(args[args.indexOf("--notes-file") + 1], "utf8");
                assert.equal(actual, body);
                if (published)
                    throw new Error(`Already created before ${creator}`);

                published = { tag_name: tag, body: actual, draft: false, prerelease: true };
                return "";
            }

            return JSON.stringify(args[1].includes("/commits/") ? { sha: "abc" } : published);
        } });
    }
});


test("publication rejects mismatched body, channel, tag, draft, remote commit, and authentication failures", () => {
    const release = { tag_name: "v1.2.3", body: "- Changes", draft: false, prerelease: false };
    const variants = [{ body: "Other notes" }, { prerelease: true }, { tag_name: "v1.2.4" }, { draft: true }];
    for (const extra of variants) {
        assert.throws(() => publishReleaseNotes({ tag: "v1.2.3", body: release.body, targetCommit: "abc", run: () => {
            return JSON.stringify({ ...release, ...extra });
        } }));
    }

    const remoteReleaseTagPattern = /Remote release tag/;
    assert.throws(() => publishReleaseNotes({ tag: "v1.2.3", body: release.body, targetCommit: "abc", run: (args) => {
        return JSON.stringify(args[1].includes("/commits/") ? { sha: "moved" } : release);
    } }), remoteReleaseTagPattern);
    const authenticatePattern = /Authenticate/;
    assert.throws(() => publishReleaseNotes({ tag: "v1.2.3", body: release.body, targetCommit: "abc", run: () => {
        throw new Error("Authenticate gh before retrying");
    } }), authenticatePattern);
});


test("both workflows use the shared publisher and never overwrite release bodies", () => {
    for (const platform of ["windows", "linux"]) {
        const workflow = readFileSync(new URL(`../.github/workflows/electron-${platform}.yml`, import.meta.url), "utf8");
        assert(workflow.includes("node scripts/publish-release-notes.mjs"));
        assert(!workflow.includes("gh release create") && !workflow.includes("gh release edit"));
    }
});


test("security-tagged previews publish with their exact identity and prerelease channel", () => {
    const tag = "v1.2.3-preview.1.security";
    const body = "- Fix an Article import vulnerability.";
    publishReleaseNotes({ tag, body, targetCommit: "abc", run: (args) => {
        if (args[0] === "release") {
            assert.equal(args[2], tag);
            assert(args.includes("--prerelease=true"));
            assert.equal(readFileSync(args[args.indexOf("--notes-file") + 1], "utf8"), body);
            return "";
        }

        return JSON.stringify(args[1].includes("/commits/")
            ? { sha: "abc" }
            : { tag_name: tag, body, draft: false, prerelease: true });
    } });
});
