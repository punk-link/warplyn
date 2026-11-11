import { expect, test } from "@playwright/test";


test("writing-language names, regional variants and codes survive reload without creating Revisions", async ({ page }) => {
    const service = "http://127.0.0.1:8787";
    const created = await page.request.post(`${service}/api/articles`, {
        data: { title: "Writing language choices", content: "Keep this Article unchanged.", language: "en" },
    });
    expect(created.ok()).toBe(true);
    const article = await created.json();
    await page.addInitScript((id) => {
        localStorage.setItem("skladno.quick-start.v1", "complete");
        localStorage.setItem("skladno-workspace-layout", JSON.stringify({ version: 3, view: "write", selectedArticleId: id }));
    }, article.id);
    await page.goto("/");

    for (const { input, expected } of [
        { input: "Polish", expected: "Polish" },
        { input: "Spanish, Argentina", expected: "Spanish, Argentina" },
        { input: "es-ar", expected: "es-AR" },
    ]) {
        await page.getByRole("button", { name: "Source language", exact: true }).click();
        await page.getByRole("menuitem", { name: "Other language…", exact: true }).click();
        const dialog = page.getByRole("dialog");
        await dialog.getByRole("textbox", { name: "Language or regional variant", exact: true }).fill(input);
        await dialog.getByRole("button", { name: "Use language", exact: true }).click();
        await expect(dialog).toHaveCount(0);
        await page.reload();
        const stored = await (await page.request.get(`${service}/api/articles/${article.id}`)).json();
        expect(stored.language).toBe(expected);
        expect(stored.currentRevisionId).toBe(article.currentRevisionId);
        expect(stored.currentRevision.content).toBe(article.currentRevision.content);
    }
});
