import { readFileSync } from "node:fs";
import { landingLanguages, localizeLandingPage } from "./localize-landing-page.mjs";


export function landingLanguagesPlugin() {
    return {
        name: "landing-languages",
        enforce: "post",
        transformIndexHtml(html, context) {
            if (context.path === "/index.html" || context.path === "/")
                return localizeLandingPage(html, "en");

            if (context.path === "/plans.html")
                return localizeLandingPage(html, "en", "plans");
        },
        generateBundle(_options, bundle) {
            for (const page of ["index", "plans"]) {
                const template = bundle[`${page}.html`];
                for (const language of landingLanguages.filter((lang) => lang !== "en")) {
                    this.emitFile({
                        type: "asset",
                        fileName: `${language}/${page}.html`,
                        source: localizeLandingPage(template.source, language, page),
                    });
                }
            }
        },
        configureServer(server) {
            server.middlewares.use(async (request, response, next) => {
                const url = new URL(request.url, "http://localhost");
                const language = landingLanguages.find((lang) =>
                    url.pathname === `/${lang}/` || url.pathname === `/${lang}/plans.html`);
                if (!language || language === "en")
                    return next();

                try {
                    const page = url.pathname.endsWith("plans.html") ? "plans" : "index";
                    const source = readFileSync(new URL(`./${page}.html`, import.meta.url), "utf8");
                    const html = localizeLandingPage(source, language, page);
                    response.setHeader("Content-Type", "text/html; charset=utf-8");
                    response.end(await server.transformIndexHtml(request.url, html));
                } catch (error) {
                    next(error);
                }
            });
        },
    };
}
