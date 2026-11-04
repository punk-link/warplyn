import { expect, test } from "@playwright/test";


test("Library attention follows background work and survives viewing a pending Proposal", async ({ page }) => {
    const service = "http://127.0.0.1:8787/api/articles";
    const created = await page.request.post(service, { data: {
        title: "Attention source", content: "It is important to note that retries need limits.", language: "en",
    } });
    expect(created.ok()).toBe(true);
    const source: { id: string } = await created.json();
    const other = await page.request.post(service, { data: { title: "Attention other", content: "Independent writing.", language: "en" } });
    expect(other.ok()).toBe(true);
    await page.addInitScript((id) => {
        localStorage.setItem("skladno.quick-start.v1", "complete");
        if (!localStorage.getItem("skladno-workspace-layout"))
            localStorage.setItem("skladno-workspace-layout", JSON.stringify({ version: 4, view: "write", selectedArticleId: id,
                libraryCollapsed: false, assistantCollapsed: false }));
    }, source.id);
    let release: (() => void) | undefined;
    await page.route(`**/api/articles/${source.id}/assistant/requests`, async (route) => {
        await new Promise<void>((resolve) => {
            release = resolve;
        });
        await route.continue();
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const library = page.locator('[data-workspace-panel="article-library"]');
    const attentionSourceNamePattern = /Attention source/;
    const row = library.getByRole("button", { name: attentionSourceNamePattern });
    await page.getByRole("button", { name: "Quick actions", exact: true }).click();
    await page.getByRole("option", { name: "Shorten text", exact: true }).click();
    await page.getByRole("button", { name: "Send editorial request", exact: true }).click();
    await expect(row.getByRole("img", { name: "Assistant request in progress", exact: true })).toBeVisible();
    const attentionOtherNamePattern = /Attention other/;
    await library.getByRole("button", { name: attentionOtherNamePattern }).click();
    await expect(page.getByRole("textbox", { name: "Article draft" })).toHaveText("Independent writing.");
    await expect.poll(() => Boolean(release)).toBe(true);
    release?.();
    const changesAwaitingReviewNamePattern = /Changes awaiting review/;
    await expect(row.getByRole("img", { name: changesAwaitingReviewNamePattern })).toBeVisible();
    const unseenAssistantResponseNamePattern = /Unseen Assistant response/;
    await expect(row.getByRole("img", { name: unseenAssistantResponseNamePattern })).toBeVisible();
    await page.reload();
    await expect(row.getByRole("img", { name: unseenAssistantResponseNamePattern })).toBeVisible();
    await row.click();
    await expect(row.getByRole("img", { name: unseenAssistantResponseNamePattern })).toHaveCount(0);
    await expect(row.getByRole("img", { name: "Changes awaiting review", exact: true })).toBeVisible();
});
