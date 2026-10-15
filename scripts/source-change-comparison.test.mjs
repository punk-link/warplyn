import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { getSourceChangeComparison } from "./source-change-comparison.mjs";


const lineChecker = fileURLToPath(new URL("./check-line-length.mjs", import.meta.url));
const lineViolationPattern = /fixture\.js:1 \(163 characters\)/u;


test("PR comparison includes earlier commits and current edits even when the base branch advances", () => {
    const previousCwd = process.cwd();
    const root = mkdtempSync(join(tmpdir(), "warplyn-pr-comparison-"));
    const git = (...args) => execFileSync("git", ["-c", "core.autocrlf=false", ...args], { cwd: root, encoding: "utf8" }).trim();
    const commit = () => {
        git("add", ".");
        git("-c", "user.name=Verification test", "-c", "user.email=verify@example.invalid", "commit", "--quiet", "-m", "Fixture");
        return git("rev-parse", "HEAD");
    };
    const check = (base, head) => spawnSync(process.execPath, [lineChecker], {
        cwd: root,
        encoding: "utf8",
        env: { ...process.env, BASE_SHA: base, HEAD_SHA: head },
    });

    try {
        process.chdir(root);
        git("init", "--quiet");
        writeFileSync("fixture.js", "// before\n");
        const originalBase = commit();
        git("branch", "base");
        git("checkout", "--quiet", "-b", "feature");
        writeFileSync("fixture.js", `// ${"x".repeat(160)}\n`);
        const head = commit();
        git("checkout", "--quiet", "base");
        writeFileSync("base.txt", "base advanced\n");
        const base = commit();
        git("checkout", "--quiet", "feature");

        assert.equal(getSourceChangeComparison(base, "").revision, originalBase);
        assert.equal(getSourceChangeComparison(base, head).revision, `${base}...${head}`);
        assert.equal(check("", "").status, 0, "Clean local HEAD scope misses earlier PR changes.");
        const ci = check(base, head);
        assert.equal(ci.status, 1, ci.stdout + ci.stderr);
        assert.match(ci.stderr, lineViolationPattern);
        assert.ok(ci.stdout.includes(base), "The check prints its resolved base commit.");
        assert.equal(check(base, "").status, 1, "Working-tree PR scope catches the committed violation.");

        writeFileSync("fixture.js", "// fixed locally\n");
        assert.equal(check(base, "").status, 0, "Uncommitted fixes are included.");
        writeFileSync("untracked.js", `// ${"x".repeat(160)}\n`);
        assert.equal(check(base, "").status, 1, "Untracked source files are included.");
        const missingBasePattern = /requires BASE_SHA/u;
        assert.throws(() => getSourceChangeComparison("", head), missingBasePattern);
    } finally {
        process.chdir(previousCwd);
        rmSync(root, { recursive: true, force: true });
    }
});
