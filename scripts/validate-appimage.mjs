import assert from "node:assert/strict";
import { extractFile, listPackage } from "@electron/asar";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { mkdtemp, open, readdir, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { promisify } from "node:util";

const directory = resolve("packages/electron/out/make/appimage/x64");
const { version } = JSON.parse(await readFile("package.json", "utf8"));
const metadata = JSON.parse(await readFile(resolve(directory, "warplyn-appimage-x64.json"), "utf8"));
const file = `Warplyn-${version}-linux-x64.AppImage`;
assert.deepEqual((await readdir(directory)).filter((name) => name.endsWith(".AppImage")), [file]);
assert.equal(metadata.version, version);
assert.equal(metadata.architecture, "x64");
assert.equal(metadata.file, file);
assert.equal(metadata.size, (await stat(resolve(directory, file))).size);
const handle = await open(resolve(directory, file), "r");
try {
    const header = Buffer.alloc(20);
    await handle.read(header, 0, header.length, 0);
    assert.equal(header.subarray(0, 4).toString("hex"), "7f454c46");
    assert.equal(header[4], 2);
    assert.equal(header.readUInt16LE(18), 62);
    assert.equal(header.subarray(8, 11).toString("hex"), "414902");
} finally {
    await handle.close();
}

const hash = createHash("sha256");
for await (const chunk of createReadStream(resolve(directory, file)))
    hash.update(chunk);

assert.equal(metadata.sha256, hash.digest("hex"));
assert.ok((await stat(resolve(directory, file))).mode & 0o111);
const scratch = await mkdtemp(resolve(tmpdir(), "warplyn-image-validation-"));
try {
    await promisify(execFile)(resolve(directory, file), ["--appimage-extract"], { cwd: scratch, maxBuffer: 16 * 1024 * 1024 });
    const appDir = resolve(scratch, "squashfs-root");
    const archive = resolve(appDir, "resources/app.asar");
    const packaged = JSON.parse(extractFile(archive, "package.json").toString("utf8"));
    assert.equal(packaged.version, version);
    assert.equal(packaged.productName, "Warplyn");
    const entries = listPackage(archive);
    assert.ok(entries.some((entry) => entry.includes("keyring-linux-x64-gnu") && entry.endsWith(".node")));
    assert.ok(!entries.some((entry) => entry.includes("keyring-win32-x64-msvc")));
    const launcher = await readFile(resolve(appDir, "AppRun"), "utf8");
    const desktop = await readFile(resolve(appDir, "warplyn.desktop"), "utf8");
    assert.ok(!launcher.includes("--no-sandbox"));
    assert.ok(!desktop.includes("--no-sandbox"));
    assert.ok(desktop.includes(`X-AppImage-Version=${version}`));
    assert.ok(desktop.includes("Categories=Office;"));
    assert.ok(desktop.includes("Exec=AppRun %U"));
    assert.ok((await stat(resolve(appDir, "warplyn.png"))).size > 0);
} finally {
    await rm(scratch, { recursive: true, force: true });
}

console.log(`Validated ${file} and update metadata.`);
