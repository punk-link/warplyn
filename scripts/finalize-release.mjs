import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { github } from "./publish-release-notes.mjs";


export function finalizeRelease(tag, run = github) {
    const numberPattern = /^v\d+\.\d+\.\d+(?:-preview\.\d+(?:\.security)?)?$/;
    assert(numberPattern.test(tag), "Invalid release tag.");
    const release = JSON.parse(run(["api", `repos/punk-link/warplyn/releases/tags/${tag}`]));
    assert.equal(release.tag_name, tag);
    const version = tag.slice(1);
    const [base, preview] = version.split("-");
    const packageVersion = preview ? `${base}-${preview.replaceAll(".", "")}` : base;
    const names = [
        `Warplyn-${version}-win32-x64-setup.exe`,
        "RELEASES",
        `com.warplyn.desktop-${packageVersion}-full.nupkg`,
        `warplyn_${version}_amd64.deb`,
        `Warplyn-${version}-linux-x64.AppImage`,
        "warplyn-appimage-x64.json",
    ];
    assert.equal(release.assets.length, names.length, "Expected all six release assets before publication.");
    for (const name of names) {
        const matches = release.assets.filter(asset => asset.name === name);
        assert.equal(matches.length, 1, `Missing or ambiguous release asset: ${name}`);
        assert(matches[0].size > 0 && matches[0].state === "uploaded", "Release asset upload is incomplete.");
    }

    run(["release", "edit", tag, "--repo", "punk-link/warplyn", "--draft=false"]);
}


if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url)
    finalizeRelease(process.argv[2]);
