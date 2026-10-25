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
                    { text: "Writing and organizing Articles", link: "/writing-and-articles" },
                    { text: "Article files", link: "/article-files" },
                    { text: "Editorial Assistant", link: "/editorial-assistant" },
                    { text: "Reviewing Articles", link: "/reviewing-articles" },
                    { text: "Translations", link: "/translations" },
                ],
            },
            {
                text: "Style Profile",
                items: [
                    { text: "Style Profile", link: "/style-profile" },
                ],
            },
            {
                text: "Skills",
                items: [
                    { text: "Built-in Skills", link: "/built-in-skills/" },
                    { text: "Develop key points", link: "/built-in-skills/develop-key-points" },
                    { text: "Turn your ideas into a draft", link: "/built-in-skills/turn-ideas-into-a-draft" },
                    { text: "Improve flow and clarity", link: "/built-in-skills/improve-flow-and-clarity" },
                    { text: "Shorten text", link: "/built-in-skills/shorten-text" },
                    { text: "Check facts", link: "/built-in-skills/check-facts" },
                    { text: "Check technical terms", link: "/built-in-skills/check-technical-terms" },
                    { text: "Review writing style", link: "/built-in-skills/review-writing-style" },
                    { text: "Translate text", link: "/built-in-skills/translate-text" },
                    { text: "Skill Creator", link: "/built-in-skills/skill-creator" },
                    { text: "Create and manage Skills", link: "/skills" },
                ],
            },
            {
                text: "Settings",
                items: [
                    { text: "AI providers and models", link: "/providers" },
                    { text: "AI provider costs", link: "/provider-costs" },
                    { text: "Application settings", link: "/application-settings" },
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
