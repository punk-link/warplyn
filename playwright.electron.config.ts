import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./e2e",
    testMatch: "electron-*.spec.ts",
    reporter: "line",
    workers: 1,
    webServer: {
        command: "node scripts/start-electron-web.mjs",
        url: "http://127.0.0.1:5173",
        reuseExistingServer: false,
    },
});
