import { expect, test } from "@playwright/test";
import { selectStyleProfileSection } from "./style-profile-navigation.js";

test("Style Profile section navigation preserves drafts on desktop and narrow screens", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.goto("/");
    const create = page.getByRole("button", { name: "Create", exact: true });
    if (await create.isVisible())
        await create.click();
    else
        await page.getByRole("button", { name: "New article", exact: true }).click();

    await expect(page.getByRole("tab", { name: "Style Profile", exact: true })).toHaveCount(0);
    await page.getByRole("button", { name: "Style Profile", exact: true }).click();
    await expect(page.getByRole("tablist")).toHaveCount(0);
    const back = page.getByRole("button", { name: "Back to workspace", exact: true });
    await expect(back).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("button", { name: "Detected characteristics", exact: true })).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await expect(page.getByRole("heading", { name: "Typography rules", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Detected characteristics", exact: true })).toBeHidden();
    await page.keyboard.press("Tab");
    const contentEntry = page.locator('[data-focus-area="settings-content"]').locator("button:visible:enabled, select:visible:enabled").first();
    await expect(contentEntry).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(back).toBeFocused();

    await selectStyleProfileSection(page, "guidance");
    const rules = page.getByRole("textbox", { name: "Global style rules", exact: true });
    await rules.fill("Keep this unsaved instruction.");
    await selectStyleProfileSection(page, "sources");
    await expect(rules).toBeHidden();
    await page.getByRole("button", { name: "Add writing sample", exact: true }).click();
    await page.getByRole("textbox", { name: "Source name", exact: true }).fill("Layout sample");
    const sample = page.getByRole("textbox", { name: "Sample text", exact: true });
    await sample.fill("A local writing sample for the layout journey.");
    await selectStyleProfileSection(page, "guidance");
    await expect(rules).toHaveValue("Keep this unsaved instruction.");
    await selectStyleProfileSection(page, "sources");
    await expect(sample).toHaveValue("A local writing sample for the layout journey.");
    await page.getByRole("button", { name: "Add", exact: true }).click();
    await expect(page.getByText("Layout sample", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Rebuild profile", exact: true }).click();
    await expect(page.getByText("Profile rebuilt from 1 active source.", { exact: true })).toBeVisible();
    await selectStyleProfileSection(page, "profile");
    await expect(page.getByRole("heading", { name: "Voice", exact: true })).toBeVisible();

    for (const width of [1440, 600]) {
        await page.setViewportSize({ width, height: 900 });
        await selectStyleProfileSection(page, "guidance");
        await expect(rules).toHaveValue("Keep this unsaved instruction.");
        await expect(page.getByRole("heading", { name: "Typography rules", exact: true })).toBeHidden();
        const content = page.locator('[data-focus-area="settings-content"]');
        expect(await content.evaluate((element) => element.scrollTop)).toBe(0);
        await page.screenshot({ path: `test-results/style-profile-sections-${width}.png` });
    }

    await back.click();
    await expect(page.getByRole("tab", { name: "Write", exact: true })).toHaveAttribute("aria-selected", "true");
});
