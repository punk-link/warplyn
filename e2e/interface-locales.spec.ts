import { expect, test } from "@playwright/test";
import { defaultGeneralSettings } from "@skladno/shared";
import { installedLocaleCatalogs } from "../packages/web/src/i18n/catalogs.js";


// Product scenarios: cross-cutting.interface-locale-switching
test("interface languages switch immediately and survive reload without changing Article data", async ({ page }) => {
    const service = "http://127.0.0.1:8787";
    await page.request.put(`${service}/api/settings/general`, { data: defaultGeneralSettings });
    const created = await page.request.post(`${service}/api/articles`, {
        data: { title: "Author title stays unchanged", content: "Author content stays unchanged.", language: "en" },
    });
    expect(created.ok()).toBe(true);
    const article = await created.json();
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.goto("/");
    await page.getByRole("button", { name: "Settings", exact: true }).click();
    const language = page.getByRole("combobox").filter({ has: page.locator('option[value="pt-BR"]') });
    try {
        for (const catalog of installedLocaleCatalogs) {
            await language.selectOption(catalog.code);
            await expect(page.locator("html")).toHaveAttribute("lang", catalog.code);
            await expect(page.locator("#settings-appearance-and-language"))
                .toHaveText(catalog.messages["settings.appearanceAndLanguage"]);
            await page.setViewportSize({ width: 390, height: 844 });
            await expect(language).toBeVisible();
            await language.focus();
            await expect(language).toBeFocused();
            const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
            expect(overflow, `${catalog.code} mobile Settings overflow`).toBeLessThanOrEqual(1);
            await page.setViewportSize({ width: 1440, height: 900 });
        }

        await page.reload();
        await expect(page.locator("html")).toHaveAttribute("lang", "ko");
        const stored = await (await page.request.get(`${service}/api/articles/${article.id}`)).json();
        expect(stored.title).toBe(article.title);
        expect(stored.language).toBe(article.language);
        expect(stored.currentRevisionId).toBe(article.currentRevisionId);
        expect(stored.currentRevision.content).toBe(article.currentRevision.content);
    } finally {
        await page.request.put(`${service}/api/settings/general`, { data: defaultGeneralSettings });
    }
});
