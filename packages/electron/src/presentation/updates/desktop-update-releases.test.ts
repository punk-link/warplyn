import assert from "node:assert/strict";
import test from "node:test";
import { getNewestCompatibleRelease } from "./desktop-update-releases.js";


test("Warplyn release selection excludes Skladno packages on both platforms", () => {
    const release = { tag_name: "v0.6.0", html_url: "https://example.test", prerelease: false, draft: false };
    const legacy = { ...release, assets: [{ name: "RELEASES" }, { name: "io.github.kirillta.skladno-0.6.0-full.nupkg" }, { name: "skladno_0.6.0_amd64.deb" }] };
    for (const platform of ["win32", "linux"] as const)
        assert.equal(getNewestCompatibleRelease([legacy], "0.5.5", {}, platform), undefined);

    const current = { ...release, assets: [{ name: "RELEASES" }, { name: "com.warplyn.desktop-0.6.0-full.nupkg" }, { name: "warplyn_0.6.0_amd64.deb" }] };
    for (const platform of ["win32", "linux"] as const)
        assert.equal(getNewestCompatibleRelease([legacy, current], "0.5.5", {}, platform), current);
});
