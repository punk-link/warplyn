import { defineConfig } from "@playwright/test";

process.env.WARPLYN_ELECTRON_TEST_HIDDEN ??= "true";

export default defineConfig({
    testDir: "./e2e",
    testMatch: "electron-*.spec.ts",
    reporter: "line",
    workers: 1,
    use: {
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
    },
    webServer: {
        command: "node scripts/start-electron-web.mjs",
        url: "http://127.0.0.1:5173",
        reuseExistingServer: false,
    },
});
