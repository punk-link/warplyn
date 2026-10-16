import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";
import { readSiteModuleGraph } from "./site-module-graph.mjs";


test("built module inspection follows imports and re-exports once, including cycles", (t) => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-module-graph-"));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    writeFileSync(join(root, "app.js"), 'import "./theme.js"; import "external-package"; export const app = true;');
    writeFileSync(join(root, "theme.js"), 'export * from "./analytics.js";');
    writeFileSync(join(root, "analytics.js"), 'import "./app.js"; export const id = "G-QWD5DZEQZG";');
    const source = readSiteModuleGraph(pathToFileURL(join(root, "app.js")));
    assert.ok(source.includes("G-QWD5DZEQZG"));
    assert.equal(source.split("G-QWD5DZEQZG").length, 2);
});


test("built module inspection does not count unrelated assets as loaded analytics", (t) => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-module-graph-"));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    writeFileSync(join(root, "app.js"), "export const app = true;");
    writeFileSync(join(root, "unused.js"), 'export const id = "G-QWD5DZEQZG";');
    const source = readSiteModuleGraph(pathToFileURL(join(root, "app.js")));
    assert.ok(!source.includes("G-QWD5DZEQZG"));
});
