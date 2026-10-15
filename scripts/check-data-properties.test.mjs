import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";


const checkPath = fileURLToPath(new URL("./check-data-properties.mjs", import.meta.url));
const properties = Array.from({ length: 21 }, (_, index) => `field${index}: ${index}`).join(", ");
const changedShapePattern = /fixture\.ts:3 This data shape has 21 properties/u;
const untouchedShapePattern = /fixture\.ts:6 This data shape has 21 properties/u;


function source(label) {
    return `export function changed() {
    const label = "${label}";
    return { ${properties} };
}
export function untouched() {
    return { ${properties} };
}
`;
}


test("CI checks return objects throughout changed functions while preserving unrelated baselines", () => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-property-gate-"));
    const directory = join(root, "packages", "fixture", "src");
    const fixture = join(directory, "fixture.ts");
    const git = (...args) => execFileSync("git", ["-c", "core.autocrlf=false", ...args], { cwd: root, encoding: "utf8" }).trim();
    const commit = () => {
        git("add", ".");
        git("-c", "user.name=Property gate test", "-c", "user.email=property-gate@example.invalid", "commit", "--quiet", "-m", "Fixture");
        return git("rev-parse", "HEAD");
    };
    const check = (...args) => spawnSync(process.execPath, [checkPath, ...args], {
        cwd: root,
        encoding: "utf8",
        env: { ...process.env, BASE_SHA: "", HEAD_SHA: "" },
    });

    try {
        mkdirSync(directory, { recursive: true });
        writeFileSync(join(root, "eslint.config.mjs"), "export default [{}];\n");
        writeFileSync(join(root, "tsconfig.json"), JSON.stringify({ compilerOptions: { strict: true }, include: ["packages/**/*.ts"] }));
        writeFileSync(fixture, source("before"));
        git("init", "--quiet");
        const base = commit();
        writeFileSync(fixture, source("after"));
        const local = check();
        assert.equal(local.status, 1, local.stdout + local.stderr);
        assert.match(local.stderr, changedShapePattern);
        const head = commit();

        const workingTreePr = check(base);
        assert.equal(workingTreePr.status, 1, workingTreePr.stdout + workingTreePr.stderr);
        assert.match(workingTreePr.stderr, changedShapePattern);
        assert.doesNotMatch(workingTreePr.stderr, untouchedShapePattern);

        const changed = check(base, head);
        assert.equal(changed.status, 1, changed.stdout + changed.stderr);
        assert.match(changed.stderr, changedShapePattern);
        assert.doesNotMatch(changed.stderr, untouchedShapePattern);

        const all = check("--all");
        assert.equal(all.status, 1, all.stdout + all.stderr);
        assert.match(all.stderr, untouchedShapePattern);

        writeFileSync(fixture, `export const unrelated = true;\n${source("after")}`);
        const unrelated = check(head, commit());
        assert.equal(unrelated.status, 0, unrelated.stdout + unrelated.stderr);
    } finally {
        rmSync(root, { recursive: true, force: true });
    }
});
