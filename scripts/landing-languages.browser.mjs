import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { chromium, expect } from "@playwright/test";
import { landingLanguages } from "../site/localize-landing-page.mjs";
import { guideLocales } from "../site/user-docs/.vitepress/locales.mjs";

const browser = await chromium.launch();
try {
    const page = await browser.newPage();
    await page.route("**/*", async (route) => {
        const url = new URL(route.request().url());
        if (url.hostname !== "landing.test")
            return route.abort();

        const path = url.pathname.endsWith("/") ? `${url.pathname}index.html` : url.pathname;
        try {
            await route.fulfill({ path: fileURLToPath(new URL(`../site/dist${path}`, import.meta.url)) });
        } catch {
            await route.fulfill({ status: 404, body: "Not found" });
        }
    });
    for (const width of [1440, 768, 390]) {
        await page.setViewportSize({ width, height: 1000 });
        for (const language of landingLanguages) {
            const path = language === "en" ? "/" : `/${language}/`;
            await page.goto(`http://landing.test${path}`);
            assert.equal(await page.locator("html").getAttribute("lang"), language);
            await page.locator(".guide-languages summary").focus();
            await page.keyboard.press("Enter");
            const menu = page.locator(".guide-languages nav");
            const bounds = await menu.boundingBox();
            assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width, `${language} dropdown fits at ${width}px`);
            await page.keyboard.press("Escape");
            assert.equal(await menu.isVisible(), false);
            await page.keyboard.press("Enter");
            await page.locator(".hero").click({ position: { x: 3, y: 3 } });
            assert.equal(await menu.isVisible(), false);
            await page.locator(".guide-languages summary").focus();
            await page.keyboard.press("Enter");
            await page.locator('.guide-languages a[lang="es"]').click();
            await page.waitForURL("**/es/");
            await page.locator(".guide-languages summary").click();
            await page.locator('.guide-languages a[lang="en"]').click();
            await page.waitForURL("http://landing.test/");
            await page.goto(`http://landing.test${path}`);
            const overflow = await page.evaluate(() => globalThis.document.documentElement.scrollWidth > globalThis.innerWidth);
            assert.equal(overflow, false, `${language} overflows at ${width}px`);
            assert.equal(await page.locator('.guide-languages a[aria-current="page"]').count(), 1);
            const plans = `${path}plans.html`;
            await page.locator(`.site-footer a[href="${plans}"]`).click();
            await page.waitForURL(`http://landing.test${plans}`);
            assert.equal(await page.locator("html").getAttribute("lang"), language);
            const catalog = JSON.parse(readFileSync(new URL(`../site/plans-locales/${language}.json`, import.meta.url), "utf8"));
            assert.equal(await page.title(), catalog.plansTitle);
            assert.ok((await page.locator(".lede").innerText()).includes(catalog.plansIntro));
            await page.locator(".guide-languages summary").click();
            await page.locator('.guide-languages a[lang="fr"]').click();
            await page.waitForURL("**/fr/plans.html");
            await page.locator(".guide-languages summary").click();
            await page.locator(`.guide-languages a[lang="${language}"]`).click();
            await page.waitForURL(`http://landing.test${plans}`);
            const plansOverflow = await page.evaluate(() => globalThis.document.documentElement.scrollWidth > globalThis.innerWidth);
            assert.equal(plansOverflow, false, `${language} plans overflows at ${width}px`);
            const guide = language === "en" ? "/docs/index.html" : `/docs/${language}/index.html`;
            const link = page.locator(`.site-footer a[href="${guide}"]`);
            await link.click();
            await page.waitForURL(`http://landing.test${guide}`);
            assert.equal(await page.locator("html").getAttribute("lang"), language);
            const locale = guideLocales()[language === "en" ? "root" : language];
            if (language !== "en") {
                assert.ok((await page.locator(".vp-doc h1").innerText()).startsWith(locale.title));
                assert.ok(await page.getByText(locale.themeConfig.docFooter.next, { exact: true }).isVisible());
                const title = locale.themeConfig.langMenuLabel;
                if (width >= 1280) {
                    await page.getByRole("button", { name: title, exact: true }).click();
                    await page.locator(".VPNavBarTranslations").getByRole("link", { name: "English", exact: true }).click();
                } else if (width >= 768) {
                    await page.locator(".VPNavBarExtra > button").click();
                    await page.locator(".VPNavBarExtra").getByRole("link", { name: "English", exact: true }).click();
                } else {
                    await page.locator(".VPNavBarHamburger").click();
                    await page.locator(".VPNavScreenTranslations > button").click();
                    await page.locator(".VPNavScreenTranslations").getByRole("link", { name: "English", exact: true }).click();
                }

                const englishGuideIndexPattern = /\/docs\/(?:index\.html)?$/;
                await page.waitForURL(englishGuideIndexPattern);
                await expect(page.locator("html")).toHaveAttribute("lang", "en");
            }
        }
    }

    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("http://landing.test/docs/es/installation.html");
    await page.getByRole("button", { name: guideLocales().es.themeConfig.langMenuLabel, exact: true }).click();
    await page.locator(".VPNavBarTranslations").getByRole("link", { name: "Deutsch", exact: true }).click();
    await page.waitForURL("**/docs/de/installation.html");
    await expect(page.locator("html")).toHaveAttribute("lang", "de");
    console.log("Passed independent landing, plans, and documentation selectors, localized navigation, and responsive layout for 11 languages.");
} finally {
    await browser.close();
}
