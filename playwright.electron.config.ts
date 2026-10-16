import { defineConfig } from "@playwright/test";

process.env.WARPLYN_ELECTRON_TEST_HIDDEN ??= "true";

const nativeDictionaryTests = ["electron-spelling.spec.ts", "electron-personal-dictionary-backup.spec.ts"];

export default defineConfig({
    testDir: "./e2e",
    testMatch: "electron-*.spec.ts",
    outputDir: "test-results/desktop",
    preserveOutput: "failures-only",
    reporter: "line",
    workers: process.env.WARPLYN_ELECTRON_TEST_HIDDEN === "true" ? 2 : 1,
    projects: [
        { name: "desktop", testIgnore: nativeDictionaryTests },
        // Native personal vocabulary is shared by the OS, including across profiles.
        { name: "native-dictionary", testMatch: nativeDictionaryTests, workers: 1 },
    ],
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
