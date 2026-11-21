import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";


test("check mode detects stale tables without writing and accepts current LF and CRLF tables", (t) => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-terminology-"));
    assert.equal(dirname(root), tmpdir());
    t.after(() => rmSync(root, { recursive: true, force: true }));
    const guideDirectory = join(root, "docs/development/i18n");
    mkdirSync(guideDirectory, { recursive: true });
    const guidePath = join(guideDirectory, "ui-terminology.md");
    const stale = "# Terminology\n\n| Message ID | English |\n| --- | --- |\n\n## Variable labels\n\nKeep this prose.\n";
    writeFileSync(guidePath, stale);
    const check = runGenerator(root, ["--check"]);
    assert.equal(check.status, 1);
    assert.ok(`${check.stdout}${check.stderr}`.includes("npm run docs:i18n-terminology"));
    assert.equal(readFileSync(guidePath, "utf8"), stale);
    const generated = runGenerator(root, []);
    assert.equal(generated.status, 0, generated.stderr);
    const current = readFileSync(guidePath, "utf8");
    assert.ok(current.includes("| Message ID | English | de | es | fr | it | ja | ko | pl | pt-BR | ru | zh-CN |"));
    assert.ok(current.endsWith("## Variable labels\n\nKeep this prose.\n"));
    assert.ok(!current.includes("`article.defaultTitle`"));
    assert.equal(runGenerator(root, ["--check"]).status, 0);
    assert.equal(readFileSync(guidePath, "utf8"), current);
    const windowsText = current.replaceAll("\n", "\r\n");
    writeFileSync(guidePath, windowsText);
    assert.equal(runGenerator(root, ["--check"]).status, 0);
    assert.equal(readFileSync(guidePath, "utf8"), windowsText);
});


function runGenerator(cwd, args) {
    const script = fileURLToPath(new URL("./generate-ui-terminology.mjs", import.meta.url));
    return spawnSync(process.execPath, ["--import", import.meta.resolve("tsx"), script, ...args], {
        cwd,
        encoding: "utf8",
    });
}
