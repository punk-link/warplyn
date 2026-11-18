import DefaultTheme from "vitepress/theme";
import { startGoogleAnalytics } from "../../../google-analytics.mjs";
import "./custom.css";

export default {
    extends: DefaultTheme,
    enhanceApp() {
        if (typeof document === "undefined")
            return;

        if (import.meta.env.PROD)
            startGoogleAnalytics();

        const root = document.documentElement;
        const syncColorScheme = () => {
            root.dataset.theme = root.classList.contains("dark") ? "dark" : "light";
        };

        const syncNavTitleLayout = () => {
            const title = root.querySelector<HTMLElement>(".VPNavBarTitle .title");
            const label = title?.querySelector<HTMLElement>("span:not(.logo)");
            if (!title || !label)
                return false;

            const lineHeight = Number.parseFloat(getComputedStyle(label).lineHeight);
            const isMultiline = label.getBoundingClientRect().height > lineHeight + 1;
            title.classList.toggle("is-multiline", isMultiline);
            root.classList.toggle("has-multiline-nav-title", isMultiline);
            return true;
        };

        syncColorScheme();
        new MutationObserver(syncColorScheme).observe(root, {
            attributes: true,
            attributeFilter: ["class"],
        });

        const titleResizeObserver = new ResizeObserver(syncNavTitleLayout);
        const observeNavTitle = () => {
            const label = root.querySelector<HTMLElement>(".VPNavBarTitle .title > span:not(.logo)");
            if (!label)
                return false;

            titleResizeObserver.observe(label);
            syncNavTitleLayout();
            return true;
        };
        const titleMutationObserver = new MutationObserver(() => {
            if (observeNavTitle())
                titleMutationObserver.disconnect();
        });

        titleMutationObserver.observe(root, { childList: true, subtree: true });
        if (observeNavTitle())
            titleMutationObserver.disconnect();
    },
};
