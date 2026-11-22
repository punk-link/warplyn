import { expect, test } from "@playwright/test";
import { assistantSkillRecoveryPath } from "@skladno/shared";


test("Skill recovery leaves writing available and exposes retry and backup controls", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    let blocked = true;
    await page.route("**" + assistantSkillRecoveryPath, (route) => {
        if (route.request().method() === "POST")
            blocked = false;

        return route.fulfill({ json: blocked ? { kind: "blocked", skillIds: [], allAuthorSkills: true } : { kind: "ready" } });
    });
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Review recovery" })).toBeVisible();
    const created = page.waitForResponse((response) => response.url().endsWith("/api/articles") && response.request().method() === "POST");
    const create = page.getByRole("button", { name: "Create", exact: true });
    if (await create.isVisible())
        await create.click();
    else
        await page.getByRole("button", { name: "New article", exact: true }).click();

    await created;
    const draft = "Writing remains available during Skill recovery.";
    const checkpoint = page.waitForResponse((response) => response.url().includes("/draft") && response.request().method() === "PUT");
    await page.getByRole("textbox", { name: "Article draft" }).fill(draft);
    await checkpoint;
    await page.getByRole("button", { name: "Review recovery" }).click();
    const recovery = page.getByRole("region", { name: "Author Skill recovery" });
    await expect(recovery.getByRole("button", { name: "Data & backups" })).toBeVisible();
    await recovery.getByRole("button", { name: "Retry recovery" }).click();
    await expect(recovery.getByRole("status")).toHaveText("Author Skills are available.");
    await expect(recovery.getByRole("status")).toBeFocused();
    await expect(page.getByRole("button", { name: "Review recovery" })).toHaveCount(0);
    await page.getByRole("button", { name: "Back", exact: true }).click();
    await expect(page.getByRole("textbox", { name: "Article draft" })).toHaveText(draft);
});
