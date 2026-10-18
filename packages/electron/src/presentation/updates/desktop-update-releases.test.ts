import assert from "node:assert/strict";
import test from "node:test";
import { getAvailableUpdateState, getNewestCompatibleRelease } from "./desktop-update-releases.js";


test("Warplyn release selection excludes Skladno packages on both platforms", () => {
    const release = { tag_name: "v0.6.0", html_url: "https://example.test", prerelease: false, draft: false };
    const legacy = { ...release, assets: [{ name: "RELEASES" }, { name: "io.github.kirillta.skladno-0.6.0-full.nupkg" }, { name: "skladno_0.6.0_amd64.deb" }] };
    for (const platform of ["win32", "linux"] as const)
        assert.equal(getNewestCompatibleRelease([legacy], "0.5.5", {}, platform), undefined);

    const current = { ...release, assets: [{ name: "RELEASES" }, { name: "com.warplyn.desktop-0.6.0-full.nupkg" }, { name: "warplyn_0.6.0_amd64.deb" }] };
    for (const platform of ["win32", "linux"] as const)
        assert.equal(getNewestCompatibleRelease([legacy, current], "0.5.5", {}, platform), current);
});


test("release summaries preserve complete literal text and ignore unavailable or oversized bodies", () => {
    const release = { tag_name: "v0.8.0", html_url: "https://example.test", prerelease: false, draft: false, assets: [] };
    const body = `- Recover café writing.\r\n- ${"Long summary. ".repeat(100)}<script>alert(1)</script>`;
    assert.equal(getAvailableUpdateState({ ...release, body }, "0.7.0", {}, true).summary, body.replaceAll("\r\n", "\n"));
    for (const value of [undefined, null, {}, 123, "   ", "x".repeat(8001)]) {
        const selected = getNewestCompatibleRelease([{ ...release, body: value,
            assets: [{ name: "RELEASES" }, { name: "com.warplyn.desktop-0.8.0-full.nupkg" }] }], "0.7.0", {}, "win32");
        assert(selected);
        const state = getAvailableUpdateState(selected, "0.7.0", {}, true);
        assert.equal(state.summary, "");
        assert.equal(state.downloadable, true);
    }
});
