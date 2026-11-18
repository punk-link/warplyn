import { readFileSync } from "node:fs";

const localeUi = JSON.parse(readFileSync(new URL("./locale-ui.json", import.meta.url), "utf8"));
const languages = {
    de: "Deutsch",
    es: "Español",
    fr: "Français",
    it: "Italiano",
    ja: "日本語",
    ko: "한국어",
    pl: "Polski",
    "pt-BR": "Português (Brasil)",
    ru: "Русский",
    "zh-CN": "简体中文",
};


export function guideLocales() {
    return Object.fromEntries([
        ["root", { label: "English", lang: "en" }],
        ...Object.entries(languages).map(([lang, label]) => {
            const source = readFileSync(new URL(`../${lang}/index.md`, import.meta.url), "utf8");
            const titlePattern = /^# (.+)$/m;
            const title = source.match(titlePattern)[1];
            const sidebar = [];
            for (const line of source.split("\n")) {
                const sectionPattern = /^## (.+)/;
                const heading = line.match(sectionPattern);
                if (heading)
                    sidebar.push({ text: heading[1].trim(), items: [] });

                const guideLinkPattern = /^- \[([^\]]+)\]\(([^)]+)\.md\)/;
                const link = line.match(guideLinkPattern);
                const indexPattern = /index$/;
                if (link)
                    sidebar.at(-1).items.push({
                        text: link[1],
                        link: `/${lang}/${link[2].replace(indexPattern, "")}`,
                    });
            }

            return [lang, {
                label,
                lang,
                title,
                themeConfig: {
                    ...localeUi[lang],
                    nav: [
                        { text: title, link: `/${lang}/` },
                        { text: "Warplyn", link: `https://warplyn.com/${lang}/`, target: "_self" },
                    ],
                    sidebar,
                },
            }];
        }),
    ]);
}
