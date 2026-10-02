import { defineConfig } from "vitepress";

export default defineConfig({
    title: "Warplyn user guide",
    description: "Installation, user guides, settings, and reference for Warplyn.",
    base: "/docs/",
    outDir: "../public/docs",
    transformHead({ pageData, title, description }) {
        const url = `https://warplyn.com/docs/${pageData.relativePath.replace(/\.md$/, ".html")}`;

        return [
            ["link", { rel: "canonical", href: url }],
            ["meta", { property: "og:type", content: "website" }],
            ["meta", { property: "og:site_name", content: "Warplyn" }],
            ["meta", { property: "og:url", content: url }],
            ["meta", { property: "og:title", content: title }],
            ["meta", { property: "og:description", content: description }],
            ["meta", { name: "twitter:title", content: title }],
            ["meta", { name: "twitter:description", content: description }],
        ];
    },
    head: [
        ["meta", { property: "og:image", content: "https://warplyn.com/docs/images/editorial-assistant-example.png" }],
        ["meta", { property: "og:image:alt", content: "Warplyn desktop workspace with an Article and an Editorial Assistant revision request." }],
        ["meta", { name: "twitter:card", content: "summary_large_image" }],
        ["meta", { name: "twitter:image", content: "https://warplyn.com/docs/images/editorial-assistant-example.png" }],
        ["meta", { name: "robots", content: "max-image-preview:large" }],
        ["meta", { name: "msvalidate.01", content: "E7950C41DDCE9E24A1BA991C6CF6451D" }],
        ["link", { rel: "icon", type: "image/svg+xml", href: "/docs/warplyn.svg" }],
        ["script", { async: "", src: "https://www.googletagmanager.com/gtag/js?id=G-QWD5DZEQZG" }],
        ["script", {}, `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QWD5DZEQZG');
        `],
    ],
    themeConfig: {
        logo: { src: "/warplyn.svg", alt: "" },
        nav: [
            { text: "Guide index", link: "/" },
            { text: "Warplyn", link: "../", target: "_self" },
        ],
        sidebar: [
            {
                text: "Installation",
                items: [
                    { text: "Install Warplyn", link: "/installation" },
                    { text: "Moving from Skladno", link: "/migration" },
                ],
            },
            {
                text: "Guides",
                items: [
                    { text: "Editorial Assistant", link: "/editorial-assistant" },
                    { text: "Skills", link: "/skills" },
                ],
            },
            {
                text: "Settings",
                items: [
                    { text: "AI providers and models", link: "/providers" },
                    { text: "AI provider costs", link: "/provider-costs" },
                    { text: "Backups and recovery", link: "/backups-and-recovery" },
                    { text: "Update recovery", link: "/update-recovery" },
                    { text: "Diagnostic and usage data", link: "/telemetry" },
                ],
            },
            {
                text: "Reference",
                items: [
                    { text: "Glossary", link: "/glossary" },
                ],
            },
        ],
    },
    appearance: true,
});
