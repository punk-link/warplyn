import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { generateWingetManifests } from "./generate-winget-manifests.mjs";


test("generates a release manifest with the matching publisher, URLs, and installer checksum", (t) => {
    const directory = mkdtempSync(join(tmpdir(), "warplyn-winget-test-"));
    t.after(() => rmSync(directory, { recursive: true, force: true }));
    const installer = join(directory, "Warplyn-1.2.3-win32-x64-setup.exe");
    writeFileSync(installer, "installer fixture");
    const metadata = { version: "1.2.3", author: "punk.link" };
    const output = generateWingetManifests(installer, directory, metadata);
    for (const [name, type] of [["PunkLink.Warplyn.yaml", "version"], ["PunkLink.Warplyn.locale.en-US.yaml", "defaultLocale"], ["PunkLink.Warplyn.installer.yaml", "installer"]]) {
        const generated = readFileSync(join(output, name), "utf8");
        assert.equal(generated.split(/\r?\n/, 1)[0], `# yaml-language-server: $schema=https://aka.ms/winget-manifest.${type}.1.10.0.schema.json`);
        assert.match(generated, /^ManifestVersion: 1\.10\.0$/m);
    }

    const manifest = readFileSync(join(output, "PunkLink.Warplyn.installer.yaml"), "utf8");
    const locale = readFileSync(join(output, "PunkLink.Warplyn.locale.en-US.yaml"), "utf8");
    const checksum = createHash("sha256").update("installer fixture").digest("hex").toUpperCase();
    assert.match(manifest, /PackageVersion: 1\.2\.3/);
    assert.match(manifest, /Publisher: punk\.link/);
    assert.match(manifest, /DisplayVersion: 1\.2\.3/);
    assert(manifest.includes("/v1.2.3/Warplyn-1.2.3-win32-x64-setup.exe"));
    assert(manifest.includes(`InstallerSha256: ${checksum}`));
    assert.match(locale, /Publisher: punk\.link/);
    assert(locale.includes("/blob/v1.2.3/LICENSE"));
    assert(locale.includes("/releases/tag/v1.2.3"));
    assert.match(readFileSync(join(output, "PunkLink.Warplyn.yaml"), "utf8"), /PackageVersion: 1\.2\.3/);
    assert.throws(() => generateWingetManifests(installer, directory, { ...metadata, version: "1.2.3-preview.1" }));
    assert.throws(() => generateWingetManifests(installer, directory, { ...metadata, version: "1.2.4" }));
});
