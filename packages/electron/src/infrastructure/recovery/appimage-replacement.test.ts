import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { prepareAppImageReplacement } from "./appimage-replacement.js";

test("AppImage replacement retains the original until apply and keeps a recovery binary", async () => {
    const root = await mkdtemp(join(tmpdir(), "warplyn-image-"));
    try {
        const installed = join(root, "Warplyn.AppImage");
        const downloaded = join(root, "download");
        await writeFile(installed, "old");
        await writeFile(downloaded, "new");
        const replacement = await prepareAppImageReplacement(installed, downloaded);
        assert.equal(await readFile(installed, "utf8"), "old");
        await replacement.apply();
        assert.equal(await readFile(installed, "utf8"), "new");
        assert.equal(await readFile(`${installed}.previous`, "utf8"), "old");
        await assert.rejects(prepareAppImageReplacement(installed, join(root, "missing")));
        assert.equal(await readFile(installed, "utf8"), "new");
    } finally {
        await rm(root, { recursive: true, force: true });
    }
});
