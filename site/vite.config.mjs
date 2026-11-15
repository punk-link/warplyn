import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { readFileSync } from "node:fs";
import { landingLocales, languageNavigation, localizeLanding, alternateLanguageLinks } from "./landing-localization.mjs";

export default defineConfig({
    plugins: [{
        name: "localized-landing-pages",
        enforce: "post",
        generateBundle(_options, bundle) {
            const homepage = bundle["index.html"];
            if (!homepage || homepage.type !== "asset")
                throw new Error("Missing built homepage");

            const source = String(homepage.source);
            homepage.source = source.replace("</footer>", `${languageNavigation("en")}</footer>`)
                .replace("</head>", `${alternateLanguageLinks()}</head>`);
            for (const locale of landingLocales) {
                const catalog = JSON.parse(readFileSync(new URL(`./locales/${locale}.json`, import.meta.url), "utf8"));
                const translated = localizeLanding(source, locale, catalog);
                this.emitFile({ type: "asset", fileName: `${locale}/index.html`,
                    source: translated.replace("</footer>", `${languageNavigation(locale)}</footer>`) });
            }
        },
    }],
    build: {
        rollupOptions: {
            input: {
                home: fileURLToPath(new URL("./index.html", import.meta.url)),
                plans: fileURLToPath(new URL("./plans.html", import.meta.url)),
            },
        },
    },
});
