import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { JSDOM } from "jsdom";
import { landingLanguages, localizeLandingPage } from "../site/localize-landing-page.mjs";

test("landing catalogs cover source copy and produce localized static pages", () => {
    const html = readFileSync(new URL("../site/index.html", import.meta.url), "utf8");
    const english = JSON.parse(readFileSync(new URL("../site/landing-locales/en.json", import.meta.url), "utf8"));
    for (const locale of landingLanguages) {
        const catalog = JSON.parse(readFileSync(new URL(`../site/landing-locales/${locale}.json`, import.meta.url), "utf8"));
        assert.deepEqual(Object.keys(catalog).sort(), Object.keys(english).sort());

        const document = new JSDOM(localizeLandingPage(html, locale)).window.document;
        const providers = [...document.querySelectorAll("#providers li")].map((provider) => provider.textContent.trim());
        assert.deepEqual(providers, ["OpenAI", "Anthropic", "Google Gemini API", "xAI Grok", "DeepSeek", "OpenCode Zen"]);
        assert.ok(document.querySelector(".brand").textContent.includes("Warplyn"));
        assert.ok(document.querySelector('.desktop-nav a[href="https://github.com/punk-link/warplyn"]').textContent.includes("GitHub"));
        assert.equal(document.querySelector('link[hreflang="en"]').href, "https://warplyn.com/");
        for (const picker of document.querySelectorAll(".guide-languages"))
            assert.equal(picker.querySelector('[aria-current="page"]').lang, locale);
    }
});
