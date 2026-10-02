import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./e2e",
    testMatch: "electron-*.spec.ts",
    reporter: "line",
    workers: 1,
    webServer: {
        command: "npm run dev --workspace @skladno/web -- --host localhost",
        url: "http://localhost:5173",
        reuseExistingServer: false,
    },
});
