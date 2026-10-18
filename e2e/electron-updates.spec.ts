import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { closePackaged, launchPackaged } from "./electron-packaged-app.js";
import { createUpdateNetwork } from "./electron-update-network.js";


// Product scenario: settings.release-summary-details
test("packaged updates show complete safe summaries without changing update authority", async () => {
    const root = await mkdtemp(join(tmpdir(), "warplyn-update-summary-"));
    const network = await createUpdateNetwork();
    const body = `- ${"Recover café writing after restarting. ".repeat(40)}\n- <script>alert(1)</script> ![image](https://example.test/image)`;
    network.setBody(body);
    let app: Awaited<ReturnType<typeof launchPackaged>> | undefined;
    try {
        app = await launchPackaged(root, network.args);
        const page = app.page;
        await page.getByRole("button", { name: "Skip quick start", exact: true }).click();
        await page.getByRole("button", { name: "Settings", exact: true }).click();
        await page.getByRole("button", { name: "About Warplyn", exact: true }).click();
        expect(network.requestCount()).toBe(0);
        await page.getByRole("switch", { name: "Allow network access for updates", exact: true }).click();
        await page.getByRole("button", { name: "Allow", exact: true }).click();
        await page.getByRole("button", { name: "Check now", exact: true }).click();
        const details = page.locator('section[aria-labelledby="settings-update-changes"] p');
        await expect(details).toHaveText(body);
        expect(network.requestCount()).toBeGreaterThan(0);
        await expect(details.locator("script, img, a")).toHaveCount(0);
        await expect(page.getByRole("button", { name: "View release notes", exact: true })).toBeEnabled();
        const download = page.getByRole("button", { name: "Download", exact: true });
        await expect(download).toHaveCount(process.platform === "win32" ? 1 : 0);
        await page.getByRole("heading", { name: "Changes in 99.0.0", exact: true }).scrollIntoViewIfNeeded();
        await page.screenshot({ path: "test-results/desktop/update-summary-wide.png" });
        await page.setViewportSize({ width: 760, height: 900 });
        expect(await details.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
        for (const summary of ["This release contains maintenance changes with no changes to your writing workflow.", ""]) {
            network.setBody(summary);
            await page.getByRole("button", { name: "Check now", exact: true }).click();
            await expect(details).toHaveText(summary || "Release details are unavailable. You can still update.");
            await expect(page.getByRole("button", { name: "View release notes", exact: true })).toBeEnabled();
            await expect(download).toHaveCount(process.platform === "win32" ? 1 : 0);
        }
    } finally {
        if (app)
            await closePackaged(app);

        await network.close();
        await rm(root, { recursive: true, force: true });
    }
});
