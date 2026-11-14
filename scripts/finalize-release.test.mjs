import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { finalizeRelease } from "./finalize-release.mjs";

test("only complete uploaded platform sets can publish", () => {
    const tag = "v0.8.4-preview.4.security";
    const assets = [
        `Warplyn-${tag.slice(1)}-win32-x64-setup.exe`, "RELEASES", "com.warplyn.desktop-0.8.4-preview4security-full.nupkg",
        `warplyn_${tag.slice(1)}_amd64.deb`, `Warplyn-${tag.slice(1)}-linux-x64.AppImage`, "warplyn-appimage-x64.json",
    ].map(name => ({ name, size: 1, state: "uploaded" }));
    for (const candidate of [assets, assets.slice(3), assets.map(asset => ({ ...asset, state: "new" })),
        assets.map(asset => ({ ...asset, size: 0 })), [...assets, assets[0]],
        assets.map(asset => ({ ...asset, name: asset.name.replace("preview.4", "preview.3") }))]) {
        let published = false;
        const publish = () => finalizeRelease(tag, args => {
            if (args[0] === "api")
                return JSON.stringify({ tag_name: tag, assets: candidate });

            published = true;
        });
        if (candidate === assets) {
            assert.doesNotThrow(publish);
            assert(published);
        } else {
            assert.throws(publish);
            assert(!published);
        }
    }
});


test("one workflow coordinates both builds before publication", () => {
    const windows = readFileSync(new URL("../.github/workflows/electron-windows.yml", import.meta.url), "utf8");
    const linux = readFileSync(new URL("../.github/workflows/electron-linux.yml", import.meta.url), "utf8");
    assert(windows.includes("needs: [release-windows, release-linux]"));
    assert(windows.includes("uses: ./.github/workflows/electron-linux.yml"));
    assert(windows.includes("node scripts/finalize-release.mjs"));
    assert(linux.includes("workflow_call:"));
    assert(!linux.includes("    push:") && !linux.includes("    workflow_dispatch:"));
});
