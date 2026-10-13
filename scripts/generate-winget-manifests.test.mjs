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
        const lineBreakPattern = /\r?\n/;
        assert.equal(generated.split(lineBreakPattern, 1)[0], `# yaml-language-server: $schema=https://aka.ms/winget-manifest.${type}.1.10.0.schema.json`);
        const manifestversionPattern = /^ManifestVersion: 1\.10\.0$/m;
        assert.match(generated, manifestversionPattern);
    }

    const manifest = readFileSync(join(output, "PunkLink.Warplyn.installer.yaml"), "utf8");
    const locale = readFileSync(join(output, "PunkLink.Warplyn.locale.en-US.yaml"), "utf8");
    const checksum = createHash("sha256").update("installer fixture").digest("hex").toUpperCase();
    const packageversionPattern = /PackageVersion: 1\.2\.3/;
    assert.match(manifest, packageversionPattern);
    const manifestPublisherPattern = /Publisher: punk\.link/;
    assert.match(manifest, manifestPublisherPattern);
    const displayversionPattern = /DisplayVersion: 1\.2\.3/;
    assert.match(manifest, displayversionPattern);
    assert(manifest.includes("/v1.2.3/Warplyn-1.2.3-win32-x64-setup.exe"));
    assert(manifest.includes(`InstallerSha256: ${checksum}`));
    const localePublisherPattern = /Publisher: punk\.link/;
    assert.match(locale, localePublisherPattern);
    assert(locale.includes("/blob/v1.2.3/LICENSE"));
    assert(locale.includes("/releases/tag/v1.2.3"));
    const generatedPackageVersionPattern = /PackageVersion: 1\.2\.3/;
    assert.match(readFileSync(join(output, "PunkLink.Warplyn.yaml"), "utf8"), generatedPackageVersionPattern);
    assert.throws(() => generateWingetManifests(installer, directory, { ...metadata, version: "1.2.3-preview.1" }));
    assert.throws(() => generateWingetManifests(installer, directory, { ...metadata, version: "1.2.4" }));
});
