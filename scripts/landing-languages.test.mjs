import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { JSDOM } from "jsdom";
import { landingLanguages, localizeLandingPage } from "../site/localize-landing-page.mjs";

const source = readFileSync(new URL("../site/index.html", import.meta.url), "utf8");


test("all landing languages translate content, metadata, and accessible names without changing behavior", () => {
    const original = new JSDOM(source).window.document;
    for (const language of landingLanguages) {
        const catalog = JSON.parse(readFileSync(new URL(`../site/landing-locales/${language}.json`, import.meta.url), "utf8"));
        const html = localizeLandingPage(source, language);
        const document = new JSDOM(html).window.document;
        const path = language === "en" ? "/" : `/${language}/`;
        assert.equal(document.documentElement.lang, language);
        assert.equal(document.title, catalog.title);
        assert.equal(document.querySelector('meta[name="description"]').content, catalog.description);
        assert.equal(document.querySelector('link[rel="canonical"]').href, `https://warplyn.com${path}`);
        assert.equal(document.querySelector('meta[property="og:url"]').content, `https://warplyn.com${path}`);
        assert.equal(document.querySelector(".lede").textContent.trim(), catalog.intro);
        assert.equal(document.querySelector(".editor-scene").getAttribute("aria-label"), catalog.illustration);
        assert.equal(document.querySelector(".guide-languages summary").getAttribute("aria-label"), catalog.language);
        assert.equal(document.querySelector("[data-current-language]").textContent, language.toUpperCase());
        assert.ok(document.querySelector(".site-header > .guide-languages"));
        assert.equal(document.querySelectorAll("link[hreflang]").length, 12);
        assert.equal(document.querySelectorAll(".feature-card").length, 6);
        const plansPath = language === "en" ? "/plans.html" : `/${language}/plans.html`;
        assert.equal(document.querySelector(`a[href="${plansPath}"]`).textContent, catalog.plans);
        for (const target of landingLanguages) {
            const href = target === "en" ? "/" : `/${target}/`;
            assert.equal(document.querySelector(`.guide-languages a[lang="${target}"]`).getAttribute("href"), href);
        }

        const guidePrefix = language === "en" ? "/docs/" : `/docs/${language}/`;
        assert.ok(document.querySelector(`a[href="${guidePrefix}index.html"]`));
        assert.ok(document.querySelector(`a[href="${guidePrefix}data-request.html"]`));
        assert.equal(document.querySelector('a[href="https://github.com/punk-link/warplyn/releases/latest"]').textContent.trim(), catalog.download);
        assert.deepEqual([...document.scripts].map((script) => script.src), [...original.scripts].map((script) => script.src));
        assert.equal(document.querySelector(".icon-sprite").outerHTML, original.querySelector(".icon-sprite").outerHTML);
        const schema = JSON.parse(document.querySelectorAll('script[type="application/ld+json"]')[1].textContent);
        assert.equal(schema.url, `https://warplyn.com${path}`);
        assert.equal(schema.description, catalog.schemaDescription);
    }
});


test("uncatalogued copy and unsupported languages fail rather than silently shipping English", () => {
    const unsupportedPattern = /Unsupported/;
    assert.throws(() => localizeLandingPage(source, "xx"), unsupportedPattern);
    const uncataloguedPattern = /Uncatalogued/;
    assert.throws(() => localizeLandingPage(source.replace("Your writing.<br", "New copy.<br"), "es"), uncataloguedPattern);
});


test("plans have their own language selector and keep the selected language through navigation", () => {
    const plans = readFileSync(new URL("../site/plans.html", import.meta.url), "utf8");
    for (const language of landingLanguages) {
        const catalog = JSON.parse(readFileSync(new URL(`../site/plans-locales/${language}.json`, import.meta.url), "utf8"));
        const document = new JSDOM(localizeLandingPage(plans, language, "plans")).window.document;
        const prefix = language === "en" ? "/" : `/${language}/`;
        assert.equal(document.title, catalog.plansTitle);
        assert.equal(document.querySelector(".lede").textContent.trim(), catalog.plansIntro);
        assert.equal(document.querySelector('link[rel="canonical"]').href, `https://warplyn.com${prefix}plans.html`);
        assert.equal(document.querySelectorAll(".faq-list details").length, 5);
        assert.equal(document.querySelector(".price-tag").textContent.trim(), `$0 ${catalog.plansToday}`);
        assert.ok(document.querySelector(`a[href="${prefix}#providers"]`));
        assert.ok(document.querySelector(`a[href="${prefix}#privacy"]`));
        const guide = language === "en" ? "/docs/index.html" : `/docs/${language}/index.html`;
        assert.ok(document.querySelector(`[data-message="plansHelpAnswer"] a[href="${guide}"]`));
        assert.ok(document.querySelector(".site-header .guide-languages"));
        for (const target of landingLanguages) {
            const targetPrefix = target === "en" ? "/" : `/${target}/`;
            const selector = `.guide-languages a[lang="${target}"]`;
            assert.equal(document.querySelector(selector).getAttribute("href"), `${targetPrefix}plans.html`);
            assert.ok(document.querySelector(`link[hreflang="${target}"]`).href.endsWith(`${targetPrefix}plans.html`));
        }
    }
});


test("unknown plans messages fail before a page can ship with missing content", () => {
    const plans = readFileSync(new URL("../site/plans.html", import.meta.url), "utf8");
    const unknownMessage = plans.replace('data-message="plansFreeAnswer"', 'data-message="unknown"');
    const unknownMessagePattern = /Uncatalogued page message/;
    assert.throws(() => localizeLandingPage(unknownMessage, "es", "plans"), unknownMessagePattern);
});
