import { expect, test } from "@playwright/test";


test("AI Settings confines scrolling to its content when models are unavailable", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.route("**/api/settings/ai/models", (route) => route.fulfill({ json: [] }));
    await page.goto("/");
    await page.getByRole("button", { name: "Settings", exact: true }).click();
    await page.getByRole("button", { name: "AI assistant", exact: true }).click();
    await expect(page.locator('[aria-disabled="true"]').first()).toBeVisible();

    for (const viewport of [{ width: 1280, height: 800 }, { width: 600, height: 800 }]) {
        await page.setViewportSize(viewport);
        await expect.poll(() => page.evaluate(() => {
            const scrollingElement = document.scrollingElement;
            return scrollingElement ? scrollingElement.scrollHeight - scrollingElement.clientHeight : 0;
        })).toBeLessThanOrEqual(1);
        const content = page.locator('[data-focus-area="settings-content"]');
        await content.evaluate((element) => {
            element.scrollTop = element.scrollHeight;
        });
        await expect(page.getByRole("button", { name: "Models for specific tasks" })).toBeVisible();
    }
});
