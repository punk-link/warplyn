import { expect, test, type Page } from "@playwright/test";


async function createAndNameArticle(page: Page, title: string) {
    const created = page.waitForResponse((response) => response.url().endsWith("/api/articles") && response.request().method() === "POST");
    await page.getByRole("button", { name: "New article", exact: true }).click();
    const response = await created;
    expect(response.ok()).toBe(true);
    await page.getByRole("button", { name: "Rename article: Untitled article", exact: true }).click();
    const field = page.getByRole("textbox", { name: "Article title", exact: true });
    await field.fill(title);
    await field.press("Enter");
    await expect(page.getByRole("button", { name: `Rename article: ${title}`, exact: true })).toBeVisible();
}


test("opening an unchanged older Draft preserves Recent order and its checkpoint", async ({ page }) => {
    const service = "http://127.0.0.1:8787/api/articles";
    const created = await page.request.post(service, { data: { title: "Unchanged older Draft", content: "Saved Revision", language: "en" } });
    expect(created.ok()).toBe(true);
    const older: { id: string; currentRevisionId: string } = await created.json();
    const saved = await page.request.put(`${service}/${older.id}/draft`, {
        data: { content: "Retained Draft text", baseRevisionId: older.currentRevisionId },
    });
    expect(saved.ok()).toBe(true);
    const checkpoint: { version: number; updatedAt: string } = await saved.json();
    const newestResponse = await page.request.post(service, { data: { title: "Newest Recent Article", content: "Newest text", language: "en" } });
    expect(newestResponse.ok()).toBe(true);
    const newest: { id: string } = await newestResponse.json();
    await page.addInitScript((selectedArticleId) => {
        localStorage.setItem("skladno.quick-start.v1", "complete");
        localStorage.setItem("skladno-workspace-layout", JSON.stringify({ version: 4, selectedArticleId, libraryCollapsed: false }));
    }, newest.id);
    await page.goto("/");
    const library = page.locator('[data-workspace-panel="article-library"]');
    const fixtureTitles = /Unchanged older Draft|Newest Recent Article/;
    const olderTitle = /Unchanged older Draft/;
    const newestTitle = /Newest Recent Article/;
    const rows = library.getByRole("button", { name: fixtureTitles });
    await expect(rows.first()).toContainText("Newest Recent Article");
    await library.getByRole("button", { name: olderTitle }).click();
    await expect(page.getByRole("textbox", { name: "Article draft" })).toHaveText("Retained Draft text");
    await library.getByRole("button", { name: newestTitle }).click();
    await expect(page.getByRole("textbox", { name: "Article draft" })).toHaveText("Newest text");
    await expect(rows.first()).toContainText("Newest Recent Article");
    await page.reload();
    await expect(rows.first()).toContainText("Newest Recent Article");
    const persisted = await page.request.get(`${service}/${older.id}`);
    const article: { draft: { version: number; updatedAt: string } } = await persisted.json();
    expect(article.draft.version).toBe(checkpoint.version);
    expect(article.draft.updatedAt).toBe(checkpoint.updatedAt);
});


test("many pinned shortcuts scroll while Rail actions and Settings remain visible", async ({ page }) => {
    const service = "http://127.0.0.1:8787";
    for (let index = 0; index < 16; index++) {
        const created = await page.request.post(`${service}/api/articles`, { data: { title: `Overflow pin ${index}`, content: "Pinned fixture.", language: "en" } });
        expect(created.ok()).toBe(true);
        const article: { id: string } = await created.json();
        const pinned = await page.request.put(`${service}/api/articles/${article.id}/pin`, { data: { pinned: true } });
        expect(pinned.ok()).toBe(true);
    }

    await page.addInitScript(() => {
        localStorage.setItem("skladno.quick-start.v1", "complete");
        localStorage.setItem("skladno-workspace-layout", JSON.stringify({ version: 4, view: "write", libraryCollapsed: true, assistantCollapsed: true }));
    });
    await page.setViewportSize({ width: 760, height: 480 });
    await page.goto("/");
    const library = page.locator('[data-workspace-panel="article-library"]');
    const pins = library.getByRole("group", { name: "Pinned" });
    const last = pins.getByRole("button", { name: "Open pinned article: Overflow pin 15", exact: true });
    await expect(last).toBeAttached();
    expect(await pins.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);
    await last.focus();
    await expect(last).toBeInViewport();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("button", { name: "Rename article: Overflow pin 15", exact: true })).toBeVisible();
    await expect(library.getByRole("navigation")).toHaveCount(0);
    await expect(library.getByRole("button", { name: "Search articles", exact: true })).toBeInViewport();
    await expect(library.getByRole("button", { name: "Settings", exact: true })).toBeInViewport();
});


for (const width of [1280, 760]) {
    test(`Library Rail overlays navigation and preserves Drafts at ${width}px`, async ({ page }) => {
        await page.addInitScript((collapsed) => {
            localStorage.setItem("skladno.quick-start.v1", "complete");
            localStorage.setItem("skladno-workspace-layout", JSON.stringify({
                version: 4, view: "write", libraryWidth: 208, assistantWidth: 384,
                libraryCollapsed: collapsed, assistantCollapsed: true,
                proposalWarningsDismissed: false, selectedTranslationLanguages: {},
            }));
        }, width === 1280);
        await page.setViewportSize({ width, height: 800 });
        await page.goto("/");
        const library = page.locator('[data-workspace-panel="article-library"]');
        const archivedTitle = `Rail archive fixture ${width}`;
        const activeTitle = `Rail active fixture ${width}`;
        const archivedTitlePattern = new RegExp(archivedTitle);
        const activeTitlePattern = new RegExp(activeTitle);
        await createAndNameArticle(page, archivedTitle);
        await page.getByRole("button", { name: "Archive Article", exact: true }).click();
        await createAndNameArticle(page, activeTitle);
        const draft = page.getByRole("textbox", { name: "Article draft" });
        const checkpoint = page.waitForResponse((response) => response.url().includes("/draft") && response.request().method() === "PUT");
        await draft.fill("Rail draft recovery text.");
        await checkpoint;
        const before = await draft.boundingBox();
        const articles = library.getByRole("button", { name: "Articles", exact: true });
        await articles.click();
        await expect(library.getByRole("navigation").getByRole("button", { name: activeTitlePattern })).toBeVisible();
        await expect(library.getByRole("navigation").getByRole("button", { name: archivedTitlePattern })).toHaveCount(0);
        expect((await draft.boundingBox())?.width).toBe(before?.width);
        expect((await library.boundingBox())?.width).toBe(40);
        if (process.env.WARPLYN_RAIL_SCREENSHOT_DIR)
            await page.screenshot({ path: `${process.env.WARPLYN_RAIL_SCREENSHOT_DIR}/rail-${width}.png` });

        await page.keyboard.press("Escape");
        await expect(articles).toBeFocused();
        await expect(library.getByRole("navigation")).toHaveCount(0);
        await page.keyboard.press("Control+f");
        const search = library.getByRole("textbox", { name: "Search articles" });
        await expect(search).toBeFocused();
        await search.fill(archivedTitle);
        await search.press("Enter");
        await page.keyboard.press("Enter");
        await expect(library.getByRole("navigation")).toHaveCount(0);
        await expect(page.getByRole("button", { name: `Rename article: ${archivedTitle}` })).toBeVisible();
        const archive = library.getByRole("button", { name: "Archive", exact: true });
        await archive.click();
        await expect(library.getByRole("navigation").getByRole("button", { name: archivedTitlePattern })).toBeVisible();
        await expect(library.getByRole("navigation").getByRole("button", { name: activeTitlePattern })).toHaveCount(0);
        await draft.click();
        await expect(library.getByRole("navigation")).toHaveCount(0);
        await articles.click();
        await library.getByRole("navigation").getByRole("button", { name: activeTitlePattern }).click();
        await expect(draft).toContainText("Rail draft recovery text.");
        await page.reload();
        await expect(draft).toContainText("Rail draft recovery text.");
        await expect(library.getByRole("navigation")).toHaveCount(0);
        await articles.click();
        await library.getByRole("navigation").getByRole("button", { name: activeTitlePattern }).click({ button: "right" });
        await page.getByRole("menuitem", { name: "Pin", exact: true }).click();
        const pinned = library.getByRole("button", { name: `Open pinned article: ${activeTitle}` });
        await expect(pinned).toBeVisible();
        await page.keyboard.press("Escape");
        await library.getByRole("button", { name: "New article", exact: true }).click();
        await pinned.click();
        await expect(draft).toContainText("Rail draft recovery text.");
        await expect(pinned).toHaveAttribute("aria-current", "page");
        await expect(library.getByRole("navigation")).toHaveCount(0);
        await page.setViewportSize({ width, height: 480 });
        await expect(pinned).toBeInViewport();
        await expect(library.getByRole("button", { name: "Settings", exact: true })).toBeInViewport();
        if (process.env.WARPLYN_RAIL_SCREENSHOT_DIR)
            await page.screenshot({ path: `${process.env.WARPLYN_RAIL_SCREENSHOT_DIR}/pinned-rail-${width}.png` });

        const preferences = await page.evaluate(() => JSON.parse(localStorage.getItem("skladno-workspace-layout") ?? "{}"));
        expect(preferences.libraryCollapsed).toBe(width === 1280);
    });
}
