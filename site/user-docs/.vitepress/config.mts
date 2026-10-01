import { defineConfig } from "vitepress";

export default defineConfig({
    title: "Warplyn user guide",
    description: "Installation, user guides, settings, and reference for Warplyn.",
    base: "/docs/",
    outDir: "../public/docs",
    themeConfig: {
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
