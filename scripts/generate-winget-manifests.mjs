import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { pathToFileURL } from "node:url";


const templateDirectory = new URL("../distribution/winget/0.6.2/", import.meta.url);
const manifestNames = ["PunkLink.Warplyn.yaml", "PunkLink.Warplyn.locale.en-US.yaml", "PunkLink.Warplyn.installer.yaml"];


export function generateWingetManifests(installerPath, outputRoot, { version, author }) {
    assert.match(version, /^\d+\.\d+\.\d+$/, "WinGet manifests require a stable release version.");
    assert.match(author, /^[a-zA-Z0-9 .-]+$/, "Expected a plain publisher name.");
    assert.equal(basename(installerPath), `Warplyn-${version}-win32-x64-setup.exe`, "Installer filename must match the release version.");
    const checksum = createHash("sha256").update(readFileSync(installerPath)).digest("hex").toUpperCase();
    const directory = join(outputRoot, version);
    mkdirSync(directory, { recursive: true });

    for (const name of manifestNames) {
        const manifest = readFileSync(new URL(name, templateDirectory), "utf8")
            .replaceAll("0.6.2", version)
            .replace(/^(\s*Publisher:) .+$/gm, `$1 ${author}`)
            .replace(/^ {4}InstallerSha256: .+$/m, `    InstallerSha256: ${checksum}`);
        writeFileSync(join(directory, name), manifest);
    }

    return directory;
}


if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
    const electronPackage = JSON.parse(readFileSync(new URL("../packages/electron/package.json", import.meta.url), "utf8"));
    assert(process.argv[2] && process.argv[3], "Usage: node scripts/generate-winget-manifests.mjs <installer> <output-directory>");
    console.log(generateWingetManifests(process.argv[2], process.argv[3], electronPackage));
}
