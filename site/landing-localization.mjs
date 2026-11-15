import { parse, serialize } from "parse5";

export const landingLocales = ["es", "pt-BR", "fr", "de", "ru", "ja", "zh-CN", "it", "pl", "ko"];
export const languageNames = ["English", "Español", "Português (Brasil)", "Français", "Deutsch", "Русский", "日本語", "简体中文", "Italiano", "Polski", "한국어"];
const languageLabels = ["Language", "Idioma", "Idioma", "Langue", "Sprache", "Язык", "言語", "语言", "Lingua", "Język", "언어"];


export function visitLandingCopy(node, transform) {
    if (node.tagName === "script" && node.attrs?.some((entry) => entry.value === "application/ld+json")) {
        const text = node.childNodes[0];
        const data = JSON.parse(text.value);
        if (data.description)
            data.description = transform(data.description);

        text.value = JSON.stringify(data);
        return;
    }

    if (["script", "style", "svg"].includes(node.tagName))
        return;

    const textContentPattern = /\S[\s\S]*\S|\S/;
    const whitespacePattern = /\s+/g;
    if (node.nodeName === "#text" && node.value.trim())
        node.value = node.value.replace(textContentPattern, (text) => transform(text.replace(whitespacePattern, " ")));

    for (const attribute of node.attrs ?? []) {
        if (["alt", "aria-label", "title"].includes(attribute.name) && attribute.value)
            attribute.value = transform(attribute.value);

        if (node.tagName === "meta" && attribute.name === "content" &&
            node.attrs.some((entry) => [
                "description", "og:title", "og:description", "og:image:alt", "twitter:title", "twitter:description",
            ].includes(entry.value)))
            attribute.value = transform(attribute.value);
    }

    for (const child of node.childNodes ?? [])
        visitLandingCopy(child, transform);
}


export function localizeLanding(html, locale, catalog) {
    const tree = parse(html);
    visitLandingCopy(tree, (source) => {
        if (!Object.hasOwn(catalog, source))
            throw new Error(`Missing ${locale} landing translation: ${source}`);

        return catalog[source];
    });
    return serialize(tree).replace('<html lang="en"', `<html lang="${locale}"`)
        .replaceAll('href="/"', `href="/${locale}/"`)
        .replaceAll('https://warplyn.com/"', `https://warplyn.com/${locale}/"`)
        .replace("</head>", `${alternateLanguageLinks()}</head>`);
}


export function languageNavigation(locale) {
    const locales = ["en", ...landingLocales];
    const links = locales.map((code, index) => {
        const href = code === "en" ? "/" : `/${code}/`;
        const current = code === locale ? ' aria-current="page"' : "";
        return `<a href="${href}" lang="${code}" hreflang="${code}"${current}>${languageNames[index]}</a>`;
    });
    return `<nav class="language-navigation" aria-label="${languageLabels[locales.indexOf(locale)]}">${links.join(" · ")}</nav>`;
}


export function alternateLanguageLinks() {
    return ["en", ...landingLocales].map((locale) => {
        const path = locale === "en" ? "" : `${locale}/`;
        return `<link rel="alternate" hreflang="${locale}" href="https://warplyn.com/${path}">`;
    }).join("");
}
