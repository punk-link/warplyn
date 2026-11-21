import { expect, test } from "@playwright/test";


test("Quick Start opens, dismisses and reopens from the application shell", async ({ page }) => {
    await page.goto("/");
    const dialog = page.getByRole("dialog", { name: "Welcome to Warplyn" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await page.reload();
    await expect(page.getByRole("button", { name: "Settings", exact: true })).toBeVisible();
    await expect(dialog).toHaveCount(0);

    await page.getByRole("button", { name: "Settings", exact: true }).click();
    await page.getByRole("button", { name: "About Warplyn", exact: true }).click();
    const openQuickStart = page.getByRole("button", { name: "Open quick start" });
    await openQuickStart.click();
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Close quick start" }).click();
    await expect(openQuickStart).toBeFocused();
});
