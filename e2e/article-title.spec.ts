import { expect, test } from "@playwright/test";


test("missing title is generated after saving and persists without another Revision", async ({ page, request }) => {
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.goto("/");
    const createdResponse = page.waitForResponse((response) => response.url().endsWith("/api/articles") && response.request().method() === "POST");
    await page.getByRole("button", { name: "New article" }).click();
    const created = await (await createdResponse).json();
    expect(created.title).toBe("");
    await expect(page.getByRole("button", { name: "Rename article: Untitled article" })).toBeVisible();
    const editor = page.getByRole("textbox", { name: "Article draft" });
    await editor.fill("Community gardens give neighbors a place to grow fresh vegetables together. Shared tools and weekly meetings help new gardeners learn practical skills and build lasting friendships.");
    await page.getByRole("button", { name: "Save revision" }).click();
    await expect(page.getByRole("button", { name: "Rename article: Community gardens" })).toBeVisible();
    await page.reload();
    await expect(page.getByRole("button", { name: "Rename article: Community gardens" })).toBeVisible();
    const revisions = await (await request.get(`http://127.0.0.1:8787/api/articles/${created.id}/revisions`)).json();
    expect(revisions).toHaveLength(2);
    expect(revisions.every((revision: { titleGeneration?: unknown }) => revision.titleGeneration === undefined)).toBe(true);
    await request.delete(`http://127.0.0.1:8787/api/articles/${created.id}`);
});


test("insufficient context and provider failure preserve saved text with actionable notices", async ({ page, request }) => {
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.goto("/");
    const createdResponse = page.waitForResponse((response) => response.url().endsWith("/api/articles") && response.request().method() === "POST");
    await page.getByRole("button", { name: "New article" }).click();
    const created = await (await createdResponse).json();
    const editor = page.getByRole("textbox", { name: "Article draft" });
    await editor.fill("Brief note");
    await page.getByRole("button", { name: "Save revision" }).click();
    await expect(page.getByText("Add more detail and save another Revision, or rename the Article yourself.")).toBeVisible();
    await page.getByRole("button", { name: "Dismiss notification: Revision saved without an Article title" }).click();
    const content = "Title generation unavailable. Community gardens give neighbors a place to grow fresh vegetables together. Shared tools and weekly meetings help new gardeners learn practical skills and build lasting friendships.";
    await editor.fill(content);
    await page.getByRole("button", { name: "Save revision" }).click();
    await expect(page.getByText("Rename the Article yourself, or check the Text Generation Model in Settings and save another Revision.")).toBeVisible();
    await page.reload();
    await expect(page.getByRole("button", { name: "Rename article: Untitled article" })).toBeVisible();
    await expect(editor).toContainText(content);
    const revisions = await (await request.get(`http://127.0.0.1:8787/api/articles/${created.id}/revisions`)).json();
    expect(revisions).toHaveLength(3);
    await request.delete(`http://127.0.0.1:8787/api/articles/${created.id}`);
});
