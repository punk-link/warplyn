import { expect, test } from "@playwright/test";


test("Settings remains accessible through a pending Article load and its late failure", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    let fail: () => void = () => undefined;
    const pending = new Promise<void>((resolve) => {
        fail = resolve;
    });
    await page.route("**/api/articles/summaries", async (route) => {
        await pending;
        await route.fulfill({ status: 503, json: { error: "service_unavailable" } });
    });
    await page.goto("/");
    await expect(page.getByRole("status")).toContainText("Loading your local articles");
    await page.getByRole("button", { name: "Settings", exact: true }).click();
    await expect(page.getByRole("heading", { name: "General", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Data & backups", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Data & backups", exact: true })).toBeVisible();
    const failedLoad = page.waitForResponse((response) => response.url().endsWith("/api/articles/summaries"));
    fail();
    await failedLoad;
    await expect(page.getByRole("heading", { name: "Data & backups", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Back", exact: true }).click();
    await expect(page.getByRole("alert")).toContainText("Your local service is unavailable.");
    await page.getByRole("button", { name: "Settings", exact: true }).click();
    await expect(page.getByRole("heading", { name: "General", exact: true })).toBeVisible();
});


test("a late Article body restores its Draft without replacing the open Settings section", async ({ page, request }) => {
    const response = await request.post("http://127.0.0.1:8787/api/articles", { data: { title: "Delayed recovery", content: "Saved text" } });
    const article = await response.json();
    await request.put(`http://127.0.0.1:8787/api/articles/${article.id}/draft`, {
        data: { content: "Recovered Draft", baseRevisionId: article.currentRevisionId },
    });
    await page.addInitScript((id) => {
        localStorage.setItem("skladno.quick-start.v1", "complete");
        localStorage.setItem("skladno-workspace-layout", JSON.stringify({ version: 4, selectedArticleId: id, view: "write" }));
    }, article.id);
    let finish: () => void = () => undefined;
    const pending = new Promise<void>((resolve) => {
        finish = resolve;
    });
    await page.route(`**/api/articles/${article.id}`, async (route) => {
        await pending;
        await route.continue();
    });
    await page.goto("/");
    await page.getByRole("button", { name: "Settings", exact: true }).click();
    await page.getByRole("button", { name: "Key bindings", exact: true }).click();
    const loaded = page.waitForResponse((result) => result.url().endsWith(`/api/articles/${article.id}`));
    finish();
    await loaded;
    await expect(page.getByRole("heading", { name: "Key bindings", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Back", exact: true }).click();
    await expect(page.getByRole("textbox", { name: "Article draft" })).toContainText("Recovered Draft");
    await request.delete(`http://127.0.0.1:8787/api/articles/${article.id}`);
});
