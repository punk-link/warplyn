import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { chmod, cp, mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { promisify } from "node:util";

assert.equal(process.platform, "linux");
assert.equal(process.arch, "x64");
const execute = promisify(execFile);
const projectDir = resolve("packages/electron");
const { version } = JSON.parse(await readFile(resolve(projectDir, "package.json"), "utf8"));
const output = resolve(projectDir, "out/make/appimage/x64");
await mkdir(output, { recursive: true });
const scratch = await mkdtemp(resolve(output, ".build-"));
const file = `Warplyn-${version}-linux-x64.AppImage`;


async function downloadTool(url, name, digest) {
    const response = await fetch(url);
    assert.ok(response.ok, `Unable to download ${name}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.equal(createHash("sha256").update(bytes).digest("hex"), digest);
    const path = resolve(scratch, name);
    await writeFile(path, bytes, { mode: 0o700 });
    return path;
}


try {
    const tool = await downloadTool("https://github.com/AppImage/appimagetool/releases/download/1.9.1/appimagetool-x86_64.AppImage",
        "appimagetool", "ed4ce84f0d9caff66f50bcca6ff6f35aae54ce8135408b3fa33abfc3cb384eb0");
    const runtime = await downloadTool("https://github.com/AppImage/type2-runtime/releases/download/20251108/runtime-x86_64",
        "runtime", "2fca8b443c92510f1483a883f60061ad09b46b978b2631c807cd873a47ec260d");
    const appDir = resolve(scratch, "Warplyn.AppDir");
    await cp(resolve(projectDir, "out/Warplyn-linux-x64"), appDir, { recursive: true });
    await writeFile(resolve(appDir, "AppRun"), '#!/bin/sh\nset -eu\nexec "$APPDIR/Warplyn" "$@"\n', { mode: 0o755 });
    await cp(resolve(projectDir, "assets/icon.png"), resolve(appDir, "warplyn.png"));
    await writeFile(resolve(appDir, "warplyn.desktop"), [
        "[Desktop Entry]", "Type=Application", "Name=Warplyn", "Exec=AppRun %U", "Icon=warplyn",
        "Terminal=false", "Categories=Office;", "StartupWMClass=Warplyn", `X-AppImage-Version=${version}`, "",
    ].join("\n"));
    const result = await execute(tool, ["--no-appstream", "--runtime-file", runtime, appDir, resolve(output, file)], {
        env: { ...process.env, ARCH: "x86_64", APPIMAGE_EXTRACT_AND_RUN: "1" }, maxBuffer: 16 * 1024 * 1024,
    });
    process.stdout.write(result.stdout);
    process.stderr.write(result.stderr);
    await chmod(resolve(output, file), 0o755);
    const hash = createHash("sha256");
    for await (const chunk of createReadStream(resolve(output, file)))
        hash.update(chunk);

    await writeFile(resolve(output, "warplyn-appimage-x64.json"), JSON.stringify({
        version, architecture: "x64", file, size: (await stat(resolve(output, file))).size, sha256: hash.digest("hex"),
    }) + "\n");
} finally {
    await rm(scratch, { recursive: true, force: true });
}
