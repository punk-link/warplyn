import assert from "node:assert/strict";
import { lstatSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { git, releaseCommits } from "./release-notes-range.mjs";
import { productReleaseChanges } from "./release-notes-product-context.mjs";
import { compactLocaleChanges } from "./release-notes-locale-context.mjs";


const publicSourcePattern = /^(?:packages\/[^/]+\/src\/|product-model\/areas\/|site\/user-docs\/|scripts\/|\.github\/workflows\/|README\.md$)/;
const textExtensionPattern = /\.(?:[cm]?[jt]sx?|json|md|html|css|ya?ml)$/;
const dependencyManifestPattern = /^(?:package(?:-lock)?\.json|packages\/[^/]+\/package\.json)$/;
const excludedSourcePattern = /(?:\.(?:test|spec)\.|\/(?:test-support|fixtures|dist|out|node_modules|\.vitepress)\/)/;
const nullSeparator = "\0";


function publicSource(path) {
    return (publicSourcePattern.test(path) || dependencyManifestPattern.test(path)) && textExtensionPattern.test(path) && !excludedSourcePattern.test(path);
}


export function collectReleaseContext(record, { workingTree = false, cwd = process.cwd() } = {}) {
    const range = `${record.previousCommit}..${record.sourceCommit}`;
    const commits = releaseCommits(record.previousCommit, record.sourceCommit, cwd);
    const history = git(["log", "--reverse", "--format=%H %s", "--name-only", range], cwd);
    const comparison = workingTree ? [record.previousCommit] : [record.previousCommit, record.sourceCommit];
    const paths = git(["diff", "--name-only", "-z", ...comparison, "--"], cwd).split(nullSeparator).filter(publicSource);
    const pendingPaths = workingTree ? git(["diff", "--name-only", "-z", record.sourceCommit, "--"], cwd).split(nullSeparator) : [];
    const pending = new Set(pendingPaths);
    const changes = paths.map((path) => ({ path,
        patch: path.startsWith("product-model/areas/")
            ? JSON.stringify(productReleaseChanges(path, record, { workingTree, cwd }))
            : git(["diff", "--no-ext-diff", "--no-textconv", "--unified=2", ...comparison, "--", path], cwd),
        ...(pending.has(path) ? {
            uncommittedPatch: git(["diff", "--no-ext-diff", "--no-textconv", "--unified=2", record.sourceCommit, "--", path], cwd),
        } : {}),
    }));
    if (workingTree) {
        commits.push("working-tree");
        const untracked = git(["ls-files", "--others", "--exclude-standard", "-z"], cwd).split(nullSeparator).filter(publicSource);
        for (const path of untracked) {
            const absolute = join(cwd, path);
            if (!lstatSync(absolute).isSymbolicLink())
                changes.push({ path, patch: `New working-tree file:\n${readFileSync(absolute, "utf8")}` });
        }
    }

    const historical = (ref, path) => {
        const exists = git(["ls-tree", "--name-only", ref, "--", path], cwd);
        return exists ? git(["show", `${ref}:${path}`], cwd) : "";
    };
    const current = (path) => {
        if (!workingTree)
            return historical(record.sourceCommit, path);

        try {
            return readFileSync(join(cwd, path), "utf8");
        } catch (error) {
            if (error.code === "ENOENT")
                return "";

            throw error;
        }
    };
    const compacted = compactLocaleChanges(changes, (path) => historical(record.previousCommit, path), current);
    if (workingTree) {
        const pendingChanges = changes.filter((change) => change.uncommittedPatch)
            .map((change) => ({ path: change.path, patch: change.uncommittedPatch }));
        const summaries = compactLocaleChanges(pendingChanges, (path) => historical(record.sourceCommit, path), current);
        for (const summary of summaries.filter((change) => !pending.has(change.path)))
            compacted.push({ ...summary, uncommittedPatch: summary.patch });
    }

    const context = { previousTag: record.previousTag, version: record.version, history, changes: compacted };
    const size = JSON.stringify(context).length;
    const largest = compacted.map((change) => ({ path: change.path, size: JSON.stringify(change).length }))
        .sort((a, b) => b.size - a.size).slice(0, 5).map((change) => `${change.path}: ${change.size}`).join(", ");
    console.log(`Release context: ${record.previousTag} (${record.previousCommit}) -> ${record.sourceCommit}` +
        `${workingTree ? " + working tree" : ""}; ${commits.length} commits; ${size} characters. Largest: ${largest}`);
    assert(size <= 2_000_000, `Release context exceeds 2,000,000 characters. Largest sources: ${largest}. Use --manual to review these changes.`);
    return { context, commits };
}
