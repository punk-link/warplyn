import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";


const versionPattern = /^v?(\d+)\.(\d+)\.(\d+)(?:-preview\.(\d+)(\.security)?)?$/;
const lineBreakPattern = /\r?\n/;
const packagePattern = /^(?:com\.warplyn\.desktop-.+-full\.nupkg|warplyn_.+_amd64\.deb)$/;


export function git(args, cwd = process.cwd()) {
    return execFileSync("git", args, { cwd, encoding: "utf8", stdio: "pipe" }).trim();
}


export function versionParts(version) {
    const match = typeof version === "string" && versionPattern.exec(version);
    assert(match, `Unsupported release version ${version}. Use a stable or preview SemVer.`);
    const parts = match.slice(1, 4).map(Number);
    parts.push(match[4] ? Number(match[4]) : Number.MAX_SAFE_INTEGER, Number(Boolean(match[5])));
    assert(parts.every(Number.isSafeInteger), "Release version numbers must be safe integers.");
    return parts;
}


export function compareVersions(left, right) {
    const a = versionParts(left);
    const b = versionParts(right);
    for (let index = 0; index < a.length; index += 1) {
        if (a[index] !== b[index])
            return a[index] - b[index];
    }

    return 0;
}


export function resolveCommit(ref, cwd) {
    return git(["rev-parse", "--verify", `${ref}^{commit}`], cwd);
}


export function isAncestor(ancestor, target, cwd) {
    try {
        git(["merge-base", "--is-ancestor", ancestor, target], cwd);
        return true;
    } catch (error) {
        if (error.status === 1)
            return false;

        throw new Error("Cannot resolve release ancestry. Fetch the release tags and retry.", { cause: error });
    }
}


function publishedWarplynRelease(release) {
    return release && release.draft === false && typeof release.tag_name === "string" &&
        versionPattern.test(release.tag_name) && release.tag_name.startsWith("v") &&
        release.prerelease === release.tag_name.includes("-preview.") &&
        Array.isArray(release.assets) && release.assets.some((asset) => typeof asset?.name === "string" && packagePattern.test(asset.name));
}


export function selectBaseline({ releases, version, sourceCommit, previousTag, cwd }) {
    versionParts(version);
    assert(Array.isArray(releases), "GitHub did not return a release list. Check gh authentication and retry preparation.");
    const candidates = releases.filter(publishedWarplynRelease)
        .filter((release) => compareVersions(release.tag_name, version) < 0)
        .filter((release) => version.includes("-preview.") || !release.prerelease)
        .filter((release) => isAncestor(resolveCommit(`refs/tags/${release.tag_name}`, cwd), sourceCommit, cwd))
        .sort((left, right) => compareVersions(right.tag_name, left.tag_name));
    if (candidates.length > 0) {
        assert(!previousTag, "An earlier Warplyn release exists. Omit --previous-tag to use the published baseline.");
        const tag = candidates[0].tag_name;
        return { previousTag: tag, previousCommit: resolveCommit(`refs/tags/${tag}`, cwd), baseline: "published" };
    }

    assert.equal(previousTag, "v0.5.5", "No earlier Warplyn release. Review the migration baseline and pass --previous-tag v0.5.5.");
    const previousCommit = resolveCommit(`refs/tags/${previousTag}`, cwd);
    assert(isAncestor(previousCommit, sourceCommit, cwd), "The first-release baseline must be an ancestor of the source commit.");
    return { previousTag, previousCommit, baseline: "legacy-first-release" };
}


export function releaseCommits(previousCommit, sourceCommit, cwd) {
    assert(isAncestor(previousCommit, sourceCommit, cwd), "The release baseline must be an ancestor of its source commit.");
    const ids = git(["rev-list", "--reverse", "--topo-order", `${previousCommit}..${sourceCommit}`], cwd);
    return ids ? ids.split(lineBreakPattern) : [];
}


export function reviewMaterial(record, cwd) {
    const commits = releaseCommits(record.previousCommit, record.sourceCommit, cwd);
    return commits.map((commit) => {
        const description = git(["show", "--format=fuller", "--stat", "--no-renames", commit], cwd);
        return `${description}\nInspect: git show ${commit}\n`;
    }).join("\n");
}
