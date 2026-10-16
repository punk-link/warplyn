import { expect, test } from "@playwright/test";
import { selectStyleProfileSection } from "./style-profile-navigation.js";

test("Style Profile keeps one content scrollbar without empty page space", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.goto("/");
    await page.getByRole("button", { name: "Style Profile", exact: true }).click();
    await selectStyleProfileSection(page, "sources");
    await page.getByRole("button", { name: "Add writing sample", exact: true }).click();

    for (const viewport of [{ width: 1440, height: 600 }, { width: 600, height: 600 }]) {
        await page.setViewportSize(viewport);
        await expect.poll(() => page.evaluate(() => {
            const root = document.scrollingElement;
            return root ? root.scrollHeight - root.clientHeight : 0;
        })).toBeLessThanOrEqual(1);
        const content = page.locator('[data-focus-area="settings-content"]');
        await expect.poll(() => content.evaluate((element) => getComputedStyle(element).overflowY)).toBe("auto");
        expect(await page.locator("main").evaluate((element) => [...element.querySelectorAll("*")].filter((child) =>
            getComputedStyle(child).overflowY === "auto" && child.scrollHeight > child.clientHeight,
        ).length)).toBe(1);
        await content.evaluate((element) => {
            element.scrollTop = element.scrollHeight;
        });
        await expect(page.getByRole("button", { name: "Add", exact: true })).toBeInViewport();
        await expect(page.getByRole("button", { name: "Back to workspace", exact: true })).toBeInViewport();
        await page.screenshot({ path: `test-results/style-profile-scroll-${viewport.width}.png` });
    }
});
