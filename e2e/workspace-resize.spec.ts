import { expect, test } from "@playwright/test";


test("widening restores the Library once after explicitly opening the Assistant", async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem("skladno.quick-start.v1", "complete");
        localStorage.setItem("skladno-workspace-layout", JSON.stringify({
            version: 4, view: "write", libraryWidth: 280, assistantWidth: 384,
            libraryCollapsed: false, assistantCollapsed: false,
            proposalWarningsDismissed: false, selectedTranslationLanguages: {},
        }));
    });
    await page.setViewportSize({ width: 900, height: 800 });
    await page.goto("/");
    await page.getByRole("button", { name: "Expand Editorial Assistant Panel", exact: true }).click();

    const libraryResize = page.getByRole("separator", { name: "Resize Article Library Panel", exact: true });
    for (const width of [900, 980, 1008, 1100, 1239]) {
        await page.setViewportSize({ width, height: 800 });
        await expect(libraryResize).toHaveCount(0);
        await expect(page.getByRole("button", { name: "Expand Article Library Panel", exact: true })).toBeVisible();
    }

    for (const width of [1240, 1280, 1440]) {
        await page.setViewportSize({ width, height: 800 });
        await expect(libraryResize).toBeVisible();
        await expect(page.getByRole("button", { name: "Collapse Article Library Panel", exact: true })).toBeVisible();
    }

    const preferences = await page.evaluate(() => JSON.parse(localStorage.getItem("skladno-workspace-layout") ?? "{}"));
    expect(preferences.libraryCollapsed).toBe(false);
});
