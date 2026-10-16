export function isWebsiteAnalyticsAllowed() {
    return navigator.doNotTrack !== "1" && !navigator.globalPrivacyControl;
}
