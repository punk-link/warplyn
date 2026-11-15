import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { createDesktopUpdateCoordinator } from "./desktop-update-coordinator.js";
import { getNewestCompatibleRelease } from "./desktop-update-releases.js";
import { createAppImageUpdater } from "./appimage-updater.js";


for (const cached of ["new", "bad", "missing"])
    test(`AppImage discovery restores only the verified latest download: ${cached}`, async () => {
        const root = await mkdtemp(join(tmpdir(), "warplyn-cached-discovery-"));
        try {
            const file = "Warplyn-1.10.0-linux-x64.AppImage";
            if (cached !== "missing")
                await writeFile(join(root, file), cached);

            const runtimePath = join(root, "runtime.json");
            await writeFile(runtimePath, JSON.stringify({ updateNetworkAccess: true }));
            const updater = createAppImageUpdater(join(root, "installed"), root, async (url) => {
                assert.ok(String(url).endsWith(".json"), "Discovery must not download an image");
                return new Response(JSON.stringify({ version: "1.10.0", architecture: "x64", file,
                    size: 3, sha256: createHash("sha256").update("new").digest("hex") }));
            }, () => assert.fail("Discovery must not restart"));
            const coordinator = createDesktopUpdateCoordinator(
                { runtimePath, currentVersion: "1.9.0", supported: true, platform: "linux", appImage: true },
                { openExternal: async () => undefined, fetchReleases: async () => new Response(JSON.stringify([
                    { tag_name: "v1.10.0", html_url: "https://github.com/punk-link/warplyn/releases/tag/v1.10.0",
                        prerelease: false, draft: false, assets: [{ name: file }, { name: "warplyn-appimage-x64.json" }] },
                ])) },
                { dataDirectory: root, updater, createSnapshot: async () => undefined,
                    requestCheckpoint: async () => false, closeApplication: () => assert.fail("Discovery must not close") },
                { notify: () => undefined },
            );
            assert.equal((await coordinator.checkNow()).kind, cached === "new" ? "ready" : "available");
        } finally {
            await rm(root, { recursive: true, force: true });
        }
    });

// Product scenarios: application.electron-appimage-update-recovery
test("AppImage releases require same-version x64 images and metadata", () => {
    const release = { tag_name: "v0.9.0", html_url: "https://github.com/punk-link/warplyn/releases/tag/v0.9.0",
        prerelease: false, draft: false };
    for (const assets of [[{ name: "warplyn_0.9.0_amd64.deb" }], [{ name: "Warplyn-0.9.0-linux-arm64.AppImage" }],
        [{ name: "Warplyn-0.8.0-linux-x64.AppImage" }, { name: "warplyn-appimage-x64.json" }]])
        assert.equal(getNewestCompatibleRelease([{ ...release, assets }], "0.8.0", {}, "linux", true), undefined);

    const valid = { ...release, assets: [{ name: "Warplyn-0.9.0-linux-x64.AppImage" }, { name: "warplyn-appimage-x64.json" }] };
    assert.equal(getNewestCompatibleRelease([valid], "0.8.0", {}, "linux", true), valid);
    assert.equal(getNewestCompatibleRelease([valid], "0.8.0", {}, "linux"), undefined);
});

for (const failure of ["none", "checkpoint", "snapshot", "prepare"])
    test(`AppImage lifecycle gates apply with ${failure} failure`, async () => {
        const root = await mkdtemp(join(tmpdir(), "warplyn-image-coordinator-"));
        try {
            const runtimePath = join(root, "runtime.json");
            await writeFile(runtimePath, JSON.stringify({ updateNetworkAccess: true }));
            const calls: string[] = [];
            let downloaded: () => void = () => undefined;
            const coordinator = createDesktopUpdateCoordinator(
                { runtimePath, currentVersion: "0.8.0", supported: true, platform: "linux", appImage: true },
                { openExternal: async () => undefined, fetchReleases: async () => new Response(JSON.stringify([
                    { tag_name: "v0.9.0", html_url: "https://github.com/punk-link/warplyn/releases/tag/v0.9.0",
                        prerelease: false, draft: false,
                        assets: [{ name: "Warplyn-0.9.0-linux-x64.AppImage" }, { name: "warplyn-appimage-x64.json" }] },
                ])) },
                {
                    dataDirectory: root,
                    createSnapshot: async (path) => {
                        calls.push("snapshot");
                        if (failure === "snapshot")
                            throw new Error("Failed snapshot");

                        await writeFile(path, "snapshot");
                    },
                    requestCheckpoint: async () => {
                        calls.push("checkpoint");
                        return failure !== "checkpoint";
                    },
                    closeApplication: () => {
                        calls.push("close");
                    },
                    updater: {
                        setFeedURL: () => undefined, checkForUpdates: () => downloaded(),
                        on: (event, listener) => {
                            if (event === "update-downloaded")
                                downloaded = listener;
                        },
                        prepareApply: async () => {
                            calls.push("prepare");
                            if (failure === "prepare")
                                throw new Error("Failed staging");
                        },
                        quitAndInstall: () => {
                            calls.push("apply");
                        },
                    },
                }, { notify: () => undefined },
            );
            await coordinator.checkNow();
            assert.equal(coordinator.getState().kind, "available");
            coordinator.download();
            assert.equal(coordinator.getState().kind, "ready");
            await coordinator.checkNow();
            assert.equal(coordinator.getState().kind, "ready");
            assert.equal(await coordinator.restartAndUpdate(), failure === "none");
            if (failure === "none") {
                assert.deepEqual(calls, ["checkpoint", "snapshot", "prepare", "close", "apply"]);
                assert.equal(JSON.parse(await readFile(runtimePath, "utf8")).startupSuccess, false);
                coordinator.markStartupSuccessful();
                assert.equal(JSON.parse(await readFile(runtimePath, "utf8")).startupSuccess, true);
            } else {
                assert.equal(calls.includes("close"), false);
                assert.equal(calls.includes("apply"), false);
            }
        } finally {
            await rm(root, { recursive: true, force: true });
        }
    });
