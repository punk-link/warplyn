import { expect, test } from "@playwright/test";
import { defaultGeneralSettings } from "@skladno/shared";


test("parallel translations become stale after a source edit and refresh preserves existing history", async ({ page }) => {
    const service = "http://127.0.0.1:8787";
    const configured = await page.request.put(`${service}/api/settings/general`, { data: { ...defaultGeneralSettings, defaultTranslationLanguages: ["es", "de"] } });
    expect(configured.ok()).toBe(true);
    const created = await page.request.post(`${service}/api/articles`, { data: { title: "Parallel source", content: "Original translation source.", language: "en" } });
    expect(created.ok()).toBe(true);
    const source = await created.json();
    await page.addInitScript((id) => {
        localStorage.setItem("skladno.quick-start.v1", "complete");
        localStorage.setItem("skladno-workspace-layout", JSON.stringify({ version: 3, view: "translations", selectedArticleId: id }));
    }, source.id);
    await page.goto("/");
    await page.getByRole("tab", { name: /Translations/ }).click();
    await page.getByRole("button", { name: "Translate", exact: true }).click();
    await expect(page.getByRole("tab", { name: "Spanish", exact: true })).toBeVisible();
    await expect(page.getByRole("tab", { name: "German", exact: true })).toBeVisible();
    for (const language of ["Spanish", "German"]) {
        await page.getByRole("tab", { name: language, exact: true }).click();
        await page.getByRole("button", { name: `Edit ${language} translation`, exact: true }).click();
        await page.getByRole("tab", { name: /Translations/ }).click();
        await page.getByRole("button", { name: "Parallel source", exact: true }).click();
    }

    const before = (await (await page.request.get(`${service}/api/articles`)).json()).filter((article: { sourceArticleId?: string }) => article.sourceArticleId === source.id);
    expect(before).toHaveLength(2);
    await page.getByRole("tab", { name: "Write", exact: true }).click();
    await page.getByRole("textbox", { name: "Article draft" }).fill("Changed translation source.");
    await page.getByRole("button", { name: "Save revision", exact: true }).click();
    await page.getByRole("tab", { name: /Translations/ }).click();
    await expect(page.getByText("Outdated", { exact: true })).toHaveCount(2);
    const unchanged = (await (await page.request.get(`${service}/api/articles`)).json()).filter((article: { sourceArticleId?: string }) => article.sourceArticleId === source.id);
    expect(unchanged.map((article: { currentRevisionId: string }) => article.currentRevisionId).sort()).toEqual(before.map((article: { currentRevisionId: string }) => article.currentRevisionId).sort());
    await page.getByRole("button", { name: "Translate", exact: true }).click();
    await page.getByRole("tab", { name: "Spanish", exact: true }).click();
    await expect(page.getByRole("button", { name: "Update existing translation", exact: true })).toBeEnabled();
    await page.getByRole("button", { name: "Update existing translation", exact: true }).click();
    const accepted = page.waitForResponse((response) => response.url().endsWith("/proposal-acceptances") && response.request().method() === "POST");
    await page.getByRole("dialog").getByRole("button", { name: "Accept updated translation", exact: true }).click();
    expect((await accepted).status()).toBe(201);
    await expect(page.getByText(/Its text has been preserved/)).toHaveCount(0);
    const spanish = before.find((article: { language: string }) => article.language === "es");
    const revisions = await (await page.request.get(`${service}/api/articles/${spanish.id}/revisions`)).json();
    expect(revisions).toHaveLength(2);
    expect(revisions.some((revision: { id: string }) => revision.id === spanish.currentRevisionId)).toBe(true);
    await page.reload();
    await page.getByRole("tab", { name: /Translations/ }).click();
    await expect(page.getByText("Current", { exact: true })).toHaveCount(1);
    await expect(page.getByText("Outdated", { exact: true })).toHaveCount(1);
    await page.getByRole("button", { name: "Translate", exact: true }).click();
    await page.getByRole("tab", { name: "Spanish", exact: true }).click();
    await page.getByRole("button", { name: "Edit Spanish translation", exact: true }).click();
    await expect.poll(async () => (await (await page.request.get(`${service}/api/articles`)).json()).filter((article: { sourceArticleId?: string }) => article.sourceArticleId === source.id).length).toBe(3);
});
