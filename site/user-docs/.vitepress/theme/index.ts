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

        syncColorScheme();
        new MutationObserver(syncColorScheme).observe(root, {
            attributes: true,
            attributeFilter: ["class"],
        });
    },
};
