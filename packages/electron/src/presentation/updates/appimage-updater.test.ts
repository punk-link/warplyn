import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { createAppImageUpdater } from "./appimage-updater.js";

test("AppImage download verifies bytes and waits for explicit prepare and apply", async () => {
    const root = await mkdtemp(join(tmpdir(), "warplyn-appimage-"));
    try {
        const installed = join(root, "Warplyn.AppImage");
        await writeFile(installed, "old");
        let restarted = false;
        const metadata = { version: "0.9.0", architecture: "x64", file: "Warplyn-0.9.0-linux-x64.AppImage",
            size: 3, sha256: createHash("sha256").update("new").digest("hex") };
        const updater = createAppImageUpdater(installed, join(root, "cache"), async (url) =>
            new Response(String(url).endsWith(".json") ? JSON.stringify(metadata) : "new"), () => {
            restarted = true;
        });
        assert.throws(() => updater.setFeedURL({ url: "https://example.test/v0.9.0" }));
        updater.setFeedURL({ url: "https://github.com/punk-link/warplyn/releases/download/v0.9.0" });
        const downloaded = new Promise<void>((resolve, reject) => {
            updater.on("update-downloaded", resolve);
            updater.on("error", () => reject(new Error("Unexpected download failure")));
        });
        updater.checkForUpdates();
        await downloaded;
        assert.equal(await readFile(installed, "utf8"), "old");
        assert.equal(restarted, false);
        let imageRequests = 0;
        const reopened = createAppImageUpdater(installed, join(root, "cache"), async (url) => {
            if (!String(url).endsWith(".json"))
                imageRequests += 1;
            return new Response(String(url).endsWith(".json") ? JSON.stringify(metadata) : "new");
        }, () => undefined);
        reopened.setFeedURL({ url: "https://github.com/punk-link/warplyn/releases/download/v0.9.0" });
        const restored = new Promise<void>((resolve, reject) => {
            reopened.on("update-downloaded", resolve);
            reopened.on("error", () => reject(new Error("Cache restore failed")));
        });
        reopened.checkForUpdates();
        await restored;
        assert.equal(imageRequests, 0);
        assert.equal(await readFile(installed, "utf8"), "old");
        await updater.prepareApply();
        await updater.quitAndInstall();
        assert.equal(await readFile(installed, "utf8"), "new");
        assert.equal(await readFile(`${installed}.previous`, "utf8"), "old");
        assert.equal(restarted, true);
    } finally {
        await rm(root, { recursive: true, force: true });
    }
});


for (const failure of ["digest", "truncated", "redirect", "metadata"])
    test(`AppImage ${failure} failure leaves the installed executable unchanged`, async () => {
        const root = await mkdtemp(join(tmpdir(), "warplyn-image-failure-"));
        try {
            const installed = join(root, "Warplyn.AppImage");
            await writeFile(installed, "old");
            const metadata = { version: "0.9.0", architecture: "x64", file: "Warplyn-0.9.0-linux-x64.AppImage",
                size: 3, sha256: createHash("sha256").update("new").digest("hex") };
            const updater = createAppImageUpdater(installed, join(root, "cache"), async (url) => {
                if (failure === "redirect")
                    return new Response(null, { status: 302, headers: { location: "https://example.test/private" } });

                if (String(url).endsWith(".json"))
                    return new Response(failure === "metadata" ? "x".repeat(4097) : JSON.stringify(metadata));

                return new Response(failure === "truncated" ? "n" : "bad");
            }, () => assert.fail("Failed updates must not restart"));
            updater.setFeedURL({ url: "https://github.com/punk-link/warplyn/releases/download/v0.9.0" });
            const failed = new Promise<void>((resolve) => updater.on("error", resolve));
            updater.on("update-downloaded", () => assert.fail("Invalid update must not become ready"));
            updater.checkForUpdates();
            await failed;
            await assert.rejects(updater.prepareApply());
            assert.equal(await readFile(installed, "utf8"), "old");
        } finally {
            await rm(root, { recursive: true, force: true });
        }
    });
