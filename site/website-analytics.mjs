import { isWebsiteAnalyticsAllowed } from "./analytics-preferences.mjs";


const downloadUrl = "https://github.com/punk-link/warplyn/releases/latest";


export function startWebsiteAnalytics(analytics, projectKey) {
    if (!projectKey || !isWebsiteAnalyticsAllowed())
        return;

    analytics.init(projectKey, {
        api_host: "https://us.i.posthog.com",
        cookieless_mode: "always",
        person_profiles: "never",
        autocapture: false,
        capture_pageview: false,
        capture_pageleave: false,
        disable_session_recording: true,
        disable_surveys: true,
        disable_external_dependency_loading: true,
        advanced_disable_feature_flags: true,
        capture_performance: false,
        enable_heatmaps: false,
        rageclick: false,
        loaded: (client) => {
            client.register({ analyticsSource: "website" });
            client.capture("$pageview");
        },
    });

    document.addEventListener("click", (event) => {
        const link = event.target.closest?.("a");
        if (link?.href !== downloadUrl)
            return;

        const section = link.closest("header, footer, section");
        analytics.capture("download_clicked", {
            buttonLocation: section?.classList[0] ?? "navigation",
        }, { transport: "sendBeacon", send_instantly: true });
    });
}
