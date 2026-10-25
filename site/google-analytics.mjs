import { isWebsiteAnalyticsAllowed } from "./analytics-preferences.mjs";


const measurementId = "G-QWD5DZEQZG";
const downloadUrl = "https://github.com/punk-link/warplyn/releases/latest";


export function startGoogleAnalytics() {
    if (!isWebsiteAnalyticsAllowed() || document.getElementById("google-analytics"))
        return;

    window.dataLayer ??= [];
    window.gtag ??= function () {
        window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId);

    document.addEventListener("click", (event) => {
        const link = event.target.closest?.("a");
        if (link?.href === downloadUrl)
            window.gtag("event", "download_clicked");
    });

    const script = document.createElement("script");
    script.id = "google-analytics";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(script);
}
