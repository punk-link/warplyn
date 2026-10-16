import { execFileSync } from "node:child_process";


function git(...args) {
    return execFileSync("git", args, { encoding: "utf8" }).trim();
}


function resolveCommit(ref) {
    return git("rev-parse", "--verify", "--end-of-options", `${ref}^{commit}`);
}


export function getSourceChangeComparison(base = process.env.BASE_SHA, head = process.env.HEAD_SHA) {
    if (head && !base)
        throw new Error("A head comparison requires BASE_SHA or an explicit base argument.");

    if (!base)
        return { revision: "HEAD", description: "HEAD -> working tree, including staged, unstaged, and untracked files" };

    const baseCommit = resolveCommit(base);
    if (head) {
        const headCommit = resolveCommit(head);
        return { revision: `${baseCommit}...${headCommit}`, description: `${baseCommit}...${headCommit}; inspecting checkout files` };
    }

    const mergeBase = git("merge-base", baseCommit, "HEAD");
    return {
        revision: mergeBase,
        description: `${mergeBase} -> working tree, including local edits; PR base ${baseCommit}`,
    };
}
