import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { landingLocales, localizeLanding, languageNavigation } from "../site/landing-localization.mjs";

test("landing catalogs cover source copy and produce localized static pages", () => {
    const html = readFileSync(new URL("../site/index.html", import.meta.url), "utf8");
    const english = JSON.parse(readFileSync(new URL("../site/locales/en.json", import.meta.url), "utf8"));
    for (const locale of landingLocales) {
        const catalog = JSON.parse(readFileSync(new URL(`../site/locales/${locale}.json`, import.meta.url), "utf8"));
        assert.deepEqual(Object.keys(catalog).sort(), Object.keys(english).sort());
        for (const name of ["Warplyn", "GitHub", "OpenAI", "Anthropic", "Google Gemini API", "xAI Grok", "DeepSeek", "OpenCode Zen"])
            assert.equal(catalog[name], name, `${locale} preserves provider and product names`);

        const translated = localizeLanding(html, locale, catalog);
        assert.ok(translated.includes(`lang="${locale}"`));
        assert.ok(translated.includes(`https://warplyn.com/${locale}/`));
        assert.ok(translated.includes(`href="/${locale}/"`));
        assert.ok(translated.includes('hreflang="en" href="https://warplyn.com/"'));
        assert.ok(translated.includes('href="/docs/'));
        assert.ok(languageNavigation(locale).includes(`hreflang="${locale}" aria-current="page"`));
    }
});
