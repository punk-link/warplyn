import { expect, test } from "@playwright/test";

test("selected archived Article stays visible after selection and reload", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.goto("/");
    const create = page.getByRole("button", { name: "Create", exact: true });
    if (await create.isVisible())
        await create.click();
    else
        await page.getByRole("button", { name: "New article", exact: true }).click();

    const renameArticlePattern = /^Rename article:/;
    await page.getByRole("button", { name: renameArticlePattern }).click();
    await page.getByRole("textbox", { name: "Article title", exact: true }).fill("Archived fixture Article");
    await page.getByRole("textbox", { name: "Article title", exact: true }).press("Enter");
    await page.getByRole("button", { name: "Archive Article", exact: true }).click();
    const archivedPattern = /^Archived \(/;
    const archive = page.getByRole("button", { name: archivedPattern });
    await archive.click();
    const archivedFixtureArticlePattern = /Archived fixture Article/;
    const row = page.getByRole("navigation").getByRole("button", { name: archivedFixtureArticlePattern });
    await row.click();
    await expect(row).toHaveAttribute("aria-current", "page");
    await expect(page.locator('[data-focus-area="article-header"]').getByText("Archived", { exact: true })).toBeVisible();
    await page.reload();
    await expect(archive).toHaveAttribute("aria-expanded", "true");
    await expect(row).toBeVisible();
    await expect(row).toHaveAttribute("aria-current", "page");
    await archive.click();
    await expect(row).toBeVisible();
    await page.getByRole("button", { name: "Unarchive Article", exact: true }).click();
    await expect(page.locator('[data-focus-area="article-header"]').getByText("Archived", { exact: true })).toHaveCount(0);
    await expect(row).toBeVisible();
});
