import { expect, test } from "@playwright/test";
import { defaultGeneralSettings } from "@skladno/shared";

test("custom translation targets survive generation, Article creation and reload", async ({ page }) => {
    const service = "http://127.0.0.1:8787";
    const configured = await page.request.put(`${service}/api/settings/general`, { data: defaultGeneralSettings });
    expect(configured.ok()).toBe(true);
    const response = await page.request.post(`${service}/api/articles`, {
        data: { title: "Custom target source", content: "An Article for translation.", language: "en" },
    });
    expect(response.ok()).toBe(true);
    const source = await response.json();
    await page.addInitScript((id) => {
        localStorage.setItem("skladno.quick-start.v1", "complete");
        localStorage.setItem("skladno-workspace-layout", JSON.stringify({ version: 3, view: "translations", selectedArticleId: id }));
    }, source.id);
    await page.goto("/");
    await page.getByRole("button", { name: "New translation…", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("combobox", { name: "Language or regional variant", exact: true }).fill("Spanish, Argentina");
    await dialog.getByRole("button", { name: "Add", exact: true }).click();

    await expect(dialog.getByRole("button", { name: "Remove Spanish, Argentina", exact: true })).toBeVisible();
    await dialog.getByRole("button", { name: "Generate Spanish, Argentina translation", exact: true }).click();
    await expect(page.getByRole("button", { name: "Edit", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Edit", exact: true }).click();
    await expect.poll(async () => {
        const articles = await (await page.request.get(`${service}/api/articles`)).json();
        return articles.some((article: { sourceArticleId?: string }) => article.sourceArticleId === source.id);
    }).toBe(true);
    const articles = await (await page.request.get(`${service}/api/articles`)).json();
    const target = articles.find((article: { sourceArticleId?: string }) => article.sourceArticleId === source.id);
    expect(target.language).toBe("Spanish, Argentina");
    await page.reload();
    const stored = await (await page.request.get(`${service}/api/articles/${target.id}`)).json();
    expect(stored.language).toBe("Spanish, Argentina");
    expect(stored.sourceArticleId).toBe(source.id);
    expect((await (await page.request.get(`${service}/api/articles/${source.id}`)).json()).currentRevisionId).toBe(source.currentRevisionId);
    await page.evaluate((id) => {
        localStorage.setItem("skladno-workspace-layout", JSON.stringify({ version: 3, view: "translations", selectedArticleId: id }));
    }, source.id);
    await page.reload();
    await page.getByRole("button", { name: "New translation…", exact: true }).click();
    await expect(page.getByRole("dialog").getByRole("button", { name: "Remove Spanish, Argentina", exact: true })).toBeVisible();
    await page.getByRole("dialog").getByRole("button", { name: "Generate Spanish, Argentina translation", exact: true }).click();
    await expect(page.getByRole("button", { name: "Translation result", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Update", exact: true }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Update", exact: true }).click();
    await expect.poll(async () => {
        const revisions = await (await page.request.get(`${service}/api/articles/${target.id}/revisions`)).json();
        return revisions.length;
    }).toBe(2);
});
