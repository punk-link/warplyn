import { expect, test } from "@playwright/test";
import { defaultGeneralSettings } from "@skladno/shared";


test("translation progress blocks review, preserves results, and stays accessible on narrow layouts", async ({ page }) => {
    const service = "http://127.0.0.1:8787";
    await page.request.put(`${service}/api/settings/general`, { data: { ...defaultGeneralSettings, defaultTranslationLanguages: ["es"] } });
    const response = await page.request.post(`${service}/api/articles`, { data: { title: "Progress source", content: "Source for translation progress.", language: "en" } });
    expect(response.ok()).toBe(true);
    const article = await response.json();
    await page.addInitScript((id) => {
        localStorage.setItem("skladno.quick-start.v1", "complete");
        localStorage.setItem("skladno-workspace-layout", JSON.stringify({ version: 3, view: "translations", selectedArticleId: id, assistantCollapsed: true }));
    }, article.id);
    let releaseRequest: (() => void) | undefined;
    let requests = 0;
    await page.route(`**/api/articles/${article.id}/assistant/requests`, async (route) => {
        requests += 1;
        await new Promise<void>((resolve) => {
            releaseRequest = resolve;
        });
        await route.continue();
    });
    await page.goto("/");
    for (const width of [1280, 640]) {
        await page.setViewportSize({ width, height: 800 });
        if (width === 640)
            await page.getByRole("tab", { name: "Spanish translation", exact: true }).click();

        await page.getByRole("button", { name: "New translation…", exact: true }).click();
        await page.getByRole("dialog").getByRole("button", { name: "Generate Spanish translation", exact: true }).click();
        const status = page.getByRole("status").filter({ hasText: "Translating into Spanish…" });
        await expect(status).toBeVisible();
        await expect.poll(() => requests).toBe(width === 1280 ? 1 : 2);
        expect(await page.getByRole("button", { name: "New translation…", exact: true }).evaluate((button) => {
            button.focus();
            return document.activeElement === button;
        })).toBe(false);
        await expect(page.locator("[inert][aria-busy=true]")).toBeVisible();
        if (width === 640)
            await expect(page.locator("[inert]").getByText("Texto de traducción de prueba.", { exact: true })).toBeVisible();

        await expect(status.locator("..").getByRole("button")).toHaveCount(0);
        await expect(page.getByRole("button", { name: "Cancel", exact: true })).toHaveCount(0);
        await expect(page.getByRole("button", { name: "Expand Editorial Assistant Panel", exact: true })).toBeVisible();
        await page.getByRole("button", { name: "Expand Editorial Assistant Panel", exact: true }).click();
        const stop = page.getByRole("button", { name: "Stop request", exact: true });
        await stop.focus();
        await expect(stop).toBeFocused();
        await page.getByRole("button", { name: "Collapse Editorial Assistant Panel", exact: true }).click();
        const indicator = status.locator("[aria-hidden=true]");
        expect(await indicator.evaluate((element) => getComputedStyle(element).animationName)).toBe("pulse");
        await page.emulateMedia({ reducedMotion: "reduce" });
        expect(await indicator.evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
        await page.emulateMedia({ reducedMotion: "no-preference" });
        releaseRequest?.();
        await expect(status).toHaveCount(0);
        await expect(page.locator("[inert]")).toHaveCount(0);
        await expect(page.getByRole("button", { name: "Edit", exact: true })).toBeEnabled();
    }

    const stored = await (await page.request.get(`${service}/api/articles/${article.id}`)).json();
    expect(stored.currentRevisionId).toBe(article.currentRevisionId);
});
