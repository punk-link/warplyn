import { expect, test, type Locator } from "@playwright/test";
import { defaultGeneralSettings } from "@skladno/shared";
import { installedLocaleCatalogs } from "../packages/web/src/i18n/catalogs.js";


async function expectSingleLineLabels(buttons: Locator, context: string): Promise<void> {
    const wrapped = await buttons.evaluateAll((elements) => elements.flatMap((button) => {
        const walker = document.createTreeWalker(button, NodeFilter.SHOW_TEXT);
        const tops: number[] = [];
        while (walker.nextNode()) {
            const node = walker.currentNode;
            if (!node.textContent?.trim() || node.parentElement?.closest(".sr-only, svg, [aria-hidden=true]"))
                continue;

            const range = document.createRange();
            range.selectNodeContents(node);
            for (const rect of range.getClientRects())
                if (rect.width > 1 && rect.height > 1)
                    tops.push(rect.top);
        }

        const lineHeight = Number.parseFloat(getComputedStyle(button).lineHeight);
        return tops.length && Math.max(...tops) - Math.min(...tops) > lineHeight / 2 ? [button.textContent?.trim()] : [];
    }));
    expect.soft(wrapped, `${context}: compact controls keep their labels on one line`).toEqual([]);
}


// Product scenarios: cross-cutting.interface-locale-switching
test("interface languages switch immediately and survive reload without changing Article data", async ({ page }) => {
    test.setTimeout(90_000);
    const service = "http://127.0.0.1:8787";
    await page.request.put(`${service}/api/settings/general`, { data: defaultGeneralSettings });
    const created = await page.request.post(`${service}/api/articles`, {
        data: { title: "Author title stays unchanged", content: "Author content stays unchanged.", language: "en" },
    });
    expect(created.ok()).toBe(true);
    const article = await created.json();
    await page.addInitScript((id) => localStorage.setItem("skladno-workspace-layout", JSON.stringify({
        version: 3, view: "write", selectedArticleId: id,
    })), article.id);
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.addInitScript(() => Object.defineProperty(window, "skladnoDesktop", { value: {
        getLocations: async () => ({ dataDirectory: "Local data", backupDirectory: "Backups", dataDirectoryExternallyControlled: false }),
    } }));
    await page.goto("/");
    await page.getByRole("button", { name: "Settings", exact: true }).click();
    const language = page.getByRole("combobox").filter({ has: page.locator('option[value="pt-BR"]') });
    try {
        for (const catalog of installedLocaleCatalogs) {
            await language.selectOption(catalog.code);
            await expect(page.locator("html")).toHaveAttribute("lang", catalog.code);
            await expect(page.locator("#settings-appearance-and-language"))
                .toHaveText(catalog.messages["settings.appearanceAndLanguage"]);
            for (const width of [1280, 768, 390]) {
                await page.setViewportSize({ width, height: 900 });
                await expectSingleLineLabels(page.locator('[data-focus-area="settings-navigation"] button:visible'), `${catalog.code} ${width} navigation`);
                await expectSingleLineLabels(page.locator('[data-focus-area="settings-content"] button:visible'), `${catalog.code} ${width} General`);
            }

            await page.getByRole("combobox", { name: catalog.messages["settings.navigation"] }).selectOption("backups");
            await expect(page.getByText(catalog.messages["settings.backupFolderSelected"].replace("{folderName}", "Backups"))).toBeVisible();
            for (const width of [1280, 768, 390]) {
                await page.setViewportSize({ width, height: 900 });
                await expectSingleLineLabels(page.locator('[data-focus-area="settings-content"] button:visible'), `${catalog.code} ${width} backups`);
            }

            await page.getByRole("combobox", { name: catalog.messages["settings.navigation"] }).selectOption("general");
            await page.getByRole("button", { name: catalog.messages["settings.backToWorkspace"], exact: true }).click();
            for (const width of [1280, 768, 390]) {
                await page.setViewportSize({ width, height: 900 });
                await expectSingleLineLabels(page.getByRole("tab"), `${catalog.code} ${width} tabs`);
            }

            await page.getByRole("button", { name: catalog.messages["navigation.settings"], exact: true }).click();
            await page.setViewportSize({ width: 390, height: 844 });
            await expect(language).toBeVisible();
            await language.focus();
            await expect(language).toBeFocused();
            const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
            expect(overflow, `${catalog.code} mobile Settings overflow`).toBeLessThanOrEqual(1);
            await page.setViewportSize({ width: 1440, height: 900 });
        }

        await page.reload();
        await expect(page.locator("html")).toHaveAttribute("lang", installedLocaleCatalogs.at(-1)!.code);
        const stored = await (await page.request.get(`${service}/api/articles/${article.id}`)).json();
        expect(stored.title).toBe(article.title);
        expect(stored.language).toBe(article.language);
        expect(stored.currentRevisionId).toBe(article.currentRevisionId);
        expect(stored.currentRevision.content).toBe(article.currentRevision.content);
    } finally {
        await page.request.put(`${service}/api/settings/general`, { data: defaultGeneralSettings });
    }
});
