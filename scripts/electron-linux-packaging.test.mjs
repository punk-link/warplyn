import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

import forgeConfig from "../packages/electron/forge.config.js";


test("Windows executable metadata uses a numeric version without changing package identity", () => {
    const root = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
    if (process.platform === "win32")
        assert.equal(forgeConfig.packagerConfig.appVersion, root.version.split("-")[0]);

    assert(forgeConfig.makers[0].config.setupExe.includes(root.version));
});


test("the Debian launcher uses Electron's packaged executable", () => {
    const debMaker = forgeConfig.makers.find(({ name }) => name === "@electron-forge/maker-deb");

    assert.equal(debMaker?.config.options.bin, forgeConfig.packagerConfig.executableName);
    assert.ok(debMaker.config.options.icon.scalable.endsWith("warplyn.svg"));
});

test("Linux verification and release stay on the acceptance baseline and retain evidence", () => {
    const workflow = readFileSync(new URL("../.github/workflows/electron-linux.yml", import.meta.url), "utf8");

    const acceptanceRunner = /runs-on: ubuntu-22\.04/g;
    assert.equal(workflow.match(acceptanceRunner)?.length, 2);
    assert.ok(workflow.includes("desktop-file-validate"));
    assert.ok(workflow.includes("sha256sum"));
    assert.ok(workflow.includes("if: always()"));
    assert.ok(!workflow.includes("--no-sandbox"));
});
