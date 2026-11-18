import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { guideLocales } from "../site/user-docs/.vitepress/locales.mjs";

test("every translated guide has localized navigation and reachable sidebar links", () => {
    const locales = guideLocales();
    assert.equal(Object.keys(locales).length, 11);
    const landing = readFileSync(new URL("../site/index.html", import.meta.url), "utf8");
    for (const [lang, locale] of Object.entries(locales)) {
        if (lang === "root")
            continue;

        assert.ok(landing.includes(`href="/${lang}/"`));
        assert.equal(locale.themeConfig.nav[0].link, `/${lang}/`);
        assert.ok(locale.themeConfig.sidebar.length >= 6);
        assert.ok(locale.themeConfig.langMenuLabel);
        assert.ok(locale.themeConfig.docFooter.next);
        assert.ok(locale.themeConfig.outline.label);
        assert.notEqual(locale.themeConfig.docFooter.next, "Next page");
        assert.notEqual(locale.themeConfig.skipToContentLabel, "Skip to content");
        for (const group of locale.themeConfig.sidebar) {
            assert.ok(group.items.length > 0);
            for (const item of group.items) {
                const path = item.link.endsWith("/") ? `${item.link}index` : item.link;
                assert.ok(existsSync(new URL(`../site/user-docs${path}.md`, import.meta.url)), item.link);
            }
        }
    }
});
