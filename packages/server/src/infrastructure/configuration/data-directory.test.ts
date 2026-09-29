import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { resolveDataDirectory } from "./data-directory.js";


test("Warplyn ignores legacy overrides and refuses overlapping legacy directories, including junctions", () => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-isolation-"));
    const legacy = join(root, "legacy");
    const alias = join(root, "alias");
    mkdirSync(legacy);
    symlinkSync(legacy, alias, process.platform === "win32" ? "junction" : "dir");
    try {
        assert.equal(resolveDataDirectory({ SKLADNO_DATA_DIR: legacy }, root), join(root, ".warplyn"));
        for (const target of [legacy, alias, join(alias, "new"), root, join(root, ".skladno")])
            assert.throws(() => resolveDataDirectory({ WARPLYN_DATA_DIR: target, SKLADNO_DATA_DIR: legacy }, root), /Choose a separate WARPLYN_DATA_DIR/);

        assert.equal(resolveDataDirectory({ WARPLYN_DATA_DIR: join(root, "legacy-other"), SKLADNO_DATA_DIR: legacy }, root), join(root, "legacy-other"));
    } finally {
        rmSync(root, { recursive: true, force: true });
    }
});
