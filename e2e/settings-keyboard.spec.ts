import { expect, test } from "@playwright/test";


test("Settings keyboard navigation reaches sections and all visible content controls", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.goto("/");
    await page.getByRole("button", { name: "Settings", exact: true }).click();
    const back = page.getByRole("button", { name: "Back to workspace" });
    await back.focus();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("button", { name: "General", exact: true })).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("heading", { name: "Key bindings", exact: true })).toBeVisible();
    await page.keyboard.press("Home");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    const content = page.locator('[data-focus-area="settings-content"]');
    const controls = content.locator("button:enabled:visible, input:enabled:visible, select:enabled:visible, textarea:enabled:visible, a[href]:visible");
    await expect(controls.first()).toBeVisible();
    await page.keyboard.press("Tab");
    for (let index = 0; index < await controls.count(); index++) {
        await expect(controls.nth(index)).toBeFocused();
        await page.keyboard.press("Tab");
    }

    await expect(back).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    for (let index = await controls.count() - 1; index >= 0; index--) {
        await expect(controls.nth(index)).toBeFocused();
        await page.keyboard.press("Shift+Tab");
    }

    await expect(back).toBeFocused();

    await page.setViewportSize({ width: 600, height: 800 });
    await back.focus();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("combobox", { name: "Settings navigation" })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(controls.first()).toBeFocused();
});
