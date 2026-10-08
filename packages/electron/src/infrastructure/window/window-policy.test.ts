import assert from "node:assert/strict";
import test from "node:test";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { basename, join } from "node:path";
import { createWindowOptions, focusWindow, isExternalWebUrl, isRendererNavigation } from "./window-policy.js";


// product: application.electron-secured-window
test("desktop window keeps the renderer isolated and only accepts web links", () => {
    const options = createWindowOptions("C:\\preload.cjs", { x: 1, y: 2, width: 1200, height: 800 });

    assert.deepEqual(options.webPreferences, {
        preload: "C:\\preload.cjs",
        contextIsolation: true,
        sandbox: true,
        nodeIntegration: false,
        webSecurity: true,
        spellcheck: true,
        allowRunningInsecureContent: false,
    });
    assert.equal(isExternalWebUrl("https://example.com/article"), true);
    assert.equal(isExternalWebUrl("http://example.com/article"), true);
    assert.equal(isExternalWebUrl("file:///C:/private.txt"), false);
    assert.equal(isExternalWebUrl("javascript:alert(1)"), false);
    assert.equal(isRendererNavigation("http://localhost:5173/", "http://localhost:5173"), true);
    assert.equal(isRendererNavigation("https://example.com/article", "http://localhost:5173"), false);
});


test("a second desktop launch restores and focuses the existing window", () => {
    const calls: string[] = [];
    focusWindow({
        isMinimized: () => true,
        restore: () => calls.push("restore"),
        show: () => calls.push("show"),
        focus: () => calls.push("focus"),
    });

    assert.deepEqual(calls, ["restore", "show", "focus"]);
});


test("hidden Electron tests keep rendering without revealing or focusing the window", () => {
    const options = createWindowOptions("C:\\preload.cjs", { x: 0, y: 0, width: 1200, height: 800 }, false, true);
    assert.equal(options.show, false);
    assert.equal(options.webPreferences?.backgroundThrottling, false);
    focusWindow({
        isMinimized: () => assert.fail("Hidden tests must not restore the window"),
        restore: () => assert.fail("Hidden tests must not restore the window"),
        show: () => assert.fail("Hidden tests must not show the window"),
        focus: () => assert.fail("Hidden tests must not take desktop focus"),
    }, true);
});


test("desktop window resolves the bundled platform icon beside the application build", () => {
    const appRoot = fileURLToPath(new URL("../../../", import.meta.url));
    const options = createWindowOptions(join(appRoot, "dist", "preload.cjs"), { x: 0, y: 0, width: 1200, height: 800 });

    assert.equal(typeof options.icon, "string");
    if (typeof options.icon !== "string")
        assert.fail("The window must use a bundled icon path");

    assert.equal(basename(options.icon), process.platform === "win32" ? "icon.ico" : "icon.png");
    assert.ok(existsSync(options.icon));
});
