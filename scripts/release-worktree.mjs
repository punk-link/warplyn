import assert from "node:assert/strict";
import { git } from "./release-notes-range.mjs";


const nullSeparator = "\0";


export function assertReleaseWorktree(version, cwd = process.cwd()) {
    const paths = [git(["diff", "--name-only", "-z", "HEAD"], cwd), git(["diff", "--cached", "--name-only", "-z"], cwd),
        git(["ls-files", "--others", "--exclude-standard", "-z"], cwd)].flatMap((value) => value.split(nullSeparator).filter(Boolean));
    assert(paths.every((path) => path === `release-notes/${version}.json`),
        "Commit or stash changes before releasing. Only this release's notes may be uncommitted.");
}
