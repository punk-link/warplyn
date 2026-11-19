import { readFileSync } from "node:fs";
import { parse, parseFragment, serialize } from "parse5";

const source = readCatalog("en", "index");
const plansSource = readCatalog("en", "plans");
const messageIds = new Map(Object.entries({ ...source, ...plansSource }).map(([id, text]) => [text, id]));
const whitespacePattern = /\s+/g;
const letterPattern = /\p{L}/u;
const technicalText = new Set([
    "Warplyn", "Beta", "GitHub", "B", "I", "H₁", "H₂", "A",
    "English", "Deutsch", "Español", "Français", "Italiano", "日本語", "한국어",
    "Polski", "Português (Brasil)", "Русский", "简体中文",
    "OpenAI", "Anthropic", "Google Gemini API", "xAI Grok", "DeepSeek", "OpenCode Zen",
]);


export const landingLanguages = ["en", "de", "es", "fr", "it", "ja", "ko", "pl", "pt-BR", "ru", "zh-CN"];


export function localizeLandingPage(html, language, page = "index") {
    if (!landingLanguages.includes(language))
        throw new Error(`Unsupported landing language: ${language}`);

    const catalog = readCatalog(language, page);
    const requiredMessages = page === "plans" ? plansSource : source;
    for (const id of Object.keys(requiredMessages)) {
        if (typeof catalog[id] !== "string" || !catalog[id].trim())
            throw new Error(`Missing landing translation: ${language}.${id}`);
    }

    const tree = parse(html);
    translateNode(tree, { language, catalog, page });
    addLanguageLinks(tree, page);
    return serialize(tree);
}


function readCatalog(language, page) {
    const landing = JSON.parse(readFileSync(new URL(`./landing-locales/${language}.json`, import.meta.url), "utf8"));
    if (page === "index")
        return landing;

    const plans = JSON.parse(readFileSync(new URL(`./plans-locales/${language}.json`, import.meta.url), "utf8"));
    return { ...landing, ...plans };
}


function translateText(value, catalog) {
    const text = value.trim().replace(whitespacePattern, " ");
    const id = messageIds.get(text);
    if (id)
        return value.replace(value.trim(), catalog[id]);

    if (letterPattern.test(text) && !technicalText.has(text))
        throw new Error(`Uncatalogued landing text: ${text}`);

    return value;
}


function translateNode(node, context) {
    const message = node.attrs?.find((attribute) => attribute.name === "data-message");
    if (message) {
        const translated = context.catalog[message.value];
        if (typeof translated !== "string")
            throw new Error(`Uncatalogued page message: ${message.value}`);

        node.childNodes = parseFragment(translated).childNodes;
        localizeMessageLinks(node, context);
        return;
    }

    if (node.attrs?.some((attribute) => attribute.name === "data-current-language")) {
        node.childNodes[0].value = context.language.toUpperCase();
        return;
    }

    if (node.tagName === "script") {
        translateStructuredData(node, context);
        return;
    }

    if (["style", "svg"].includes(node.tagName))
        return;

    if (node.nodeName === "#text")
        node.value = translateText(node.value, context.catalog);

    for (const attribute of node.attrs ?? [])
        translateAttribute(attribute, node, context);

    if (node.tagName === "a" && node.attrs.some((attribute) => attribute.name === "lang")) {
        node.attrs = node.attrs.filter((attribute) => attribute.name !== "aria-current");
        if (node.attrs.some((attribute) => attribute.name === "lang" && attribute.value === context.language))
            node.attrs.push({ name: "aria-current", value: "page" });
    }

    for (const child of node.childNodes ?? []) {
        if (child.attrs?.some((attribute) => attribute.name === "data-english-only"))
            continue;

        translateNode(child, context);
    }

    if (context.language !== "en" && node.childNodes)
        node.childNodes = node.childNodes.filter((child) => !child.attrs?.some((attribute) => attribute.name === "data-english-only"));
}


function translateAttribute(attribute, node, { language, catalog, page }) {
    if (["aria-label", "alt"].includes(attribute.name) && attribute.value)
        attribute.value = translateText(attribute.value, catalog);

    if (node.tagName === "html" && attribute.name === "lang")
        attribute.value = language;

    if (node.tagName === "meta" && attribute.name === "content") {
        const id = messageIds.get(attribute.value);
        if (id)
            attribute.value = catalog[id];
    }

    if (["href", "content"].includes(attribute.name) && attribute.value === "https://warplyn.com/plans.html")
        attribute.value = `https://warplyn.com${landingPath(language, "plans")}`;

    if (["href", "content"].includes(attribute.name) && attribute.value === "https://warplyn.com/")
        attribute.value = `https://warplyn.com${landingPath(language)}`;

    if (node.tagName === "a" && attribute.name === "href" && node.attrs.some((item) => item.name === "lang")) {
        const target = node.attrs.find((item) => item.name === "lang").value;
        attribute.value = landingPath(target, page);
        return;
    }

    if (node.tagName === "a" && attribute.name === "href" && !node.attrs.some((item) => item.name === "lang"))
        attribute.value = localLink(attribute.value, language);
}


function localLink(href, language) {
    if (href === "/" || href.startsWith("/#"))
        return `${landingPath(language)}${href.slice(1)}`;

    if (href === "/plans.html")
        return landingPath(language, "plans");

    if (language !== "en" && href.startsWith("/docs/"))
        return href.replace("/docs/", `/docs/${language}/`).split("#")[0];

    return href;
}


function translateStructuredData(node, { language, catalog }) {
    if (!node.attrs.some((attribute) => attribute.name === "type" && attribute.value === "application/ld+json"))
        return;

    const text = node.childNodes[0];
    const data = JSON.parse(text.value);
    data.url = `https://warplyn.com${landingPath(language)}`;
    if (data.description)
        data.description = catalog.schemaDescription;

    text.value = JSON.stringify(data);
}


function landingPath(language, page = "index") {
    const prefix = language === "en" ? "/" : `/${language}/`;
    return page === "plans" ? `${prefix}plans.html` : prefix;
}


function addLanguageLinks(tree, page) {
    const html = tree.childNodes.find((node) => node.tagName === "html");
    const head = html.childNodes.find((node) => node.tagName === "head");
    head.childNodes = head.childNodes.filter((node) => !node.attrs?.some((attribute) => attribute.name === "hreflang"));
    const links = [...landingLanguages, "x-default"].map((language) => {
        const target = language === "x-default" ? "en" : language;
        const path = landingPath(target, page);
        return `<link rel="alternate" hreflang="${language}" href="https://warplyn.com${path}">`;
    });
    const fragment = parseFragment(links.join(""));
    for (const node of fragment.childNodes) {
        node.parentNode = head;
        head.childNodes.push(node);
    }
}


function localizeMessageLinks(node, context) {
    for (const attribute of node.attrs ?? []) {
        if (attribute.name === "href")
            attribute.value = localLink(attribute.value, context.language);
    }

    for (const child of node.childNodes ?? []) {
        child.parentNode = node;
        localizeMessageLinks(child, context);
    }
}
