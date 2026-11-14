import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getRelease, publishReleaseNotes } from "./publish-release-notes.mjs";

// Product scenario: application.release-summary-publication

test("draft lookup uses the authenticated paginated release list", () => {
    const draft = { tag_name: "v1.2.3", draft: true };
    assert.deepEqual(getRelease(draft.tag_name, args => {
        assert.equal(args[1], "repos/punk-link/warplyn/releases");
        assert(args.includes("--paginate"));
        assert.equal(args.at(-1), '.[] | select(.tag_name == "v1.2.3")');
        return JSON.stringify(draft);
    }), draft);
    assert.equal(getRelease(draft.tag_name, () => ""), undefined);
});


test("stable security publication labels the title and rejects an unmarked retry", () => {
    for (const marked of [true, false]) {
        const publish = () => publishReleaseNotes({ tag: "v0.8.0", body: "## Security release\n\n- Fix backups.",
            targetCommit: "abc", run: (args) => {
                if (args[0] === "release") {
                    assert.equal(args[args.indexOf("--title") + 1], "Warplyn v0.8.0 - Security release");
                    assert(args.includes("--prerelease=false"));
                    return "";
                }

                return JSON.stringify(args[1].includes("/commits/") ? { sha: "abc" } : {
                    tag_name: "v0.8.0", name: marked ? "Warplyn v0.8.0 - Security release" : "Warplyn v0.8.0",
                    body: "## Security release\n\n- Fix backups.", draft: true, prerelease: false,
                });
            } });
        if (marked) {
            assert.doesNotThrow(publish);
        } else {
            const titleMismatchPattern = /Security release title differs/;
            assert.throws(publish, titleMismatchPattern);
        }
    }
});


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

                assert(args.includes("--draft"));
                published = { tag_name: tag, body: actual, draft: true, prerelease: true };
                return "";
            }

            return JSON.stringify(args[1].includes("/commits/") ? { sha: "abc" } : published) ?? "";
        } });
    }
});


test("publication rejects mismatched body, channel, tag, draft, remote commit, and authentication failures", () => {
    const release = { tag_name: "v1.2.3", body: "- Changes", draft: true, prerelease: false };
    const variants = [{ body: "Other notes" }, { prerelease: true }, { tag_name: "v1.2.4" }, { draft: false }];
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
            : { tag_name: tag, name: `Warplyn ${tag} - Security release`, body, draft: true, prerelease: true });
    } });
});
