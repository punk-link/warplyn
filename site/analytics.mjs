import posthog from "posthog-js";
import { startGoogleAnalytics } from "./google-analytics.mjs";
import { startWebsiteAnalytics } from "./website-analytics.mjs";

if (import.meta.env.PROD) {
    startGoogleAnalytics();
    startWebsiteAnalytics(posthog, import.meta.env.VITE_POSTHOG_PROJECT_KEY);
}
