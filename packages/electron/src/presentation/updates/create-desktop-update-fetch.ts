import { session } from "electron";


/** Electron cancels manual redirects, so validate every hop in the native request interceptor. */
export function createDesktopUpdateFetch(): typeof fetch {
    const updateSession = session.fromPartition("warplyn-updates");
    updateSession.webRequest.onBeforeRequest((details, callback) => {
        const target = new URL(details.url);
        const allowed = target.protocol === "https:" && !target.username && !target.password && !target.port &&
            ["api.github.com", "github.com", "release-assets.githubusercontent.com", "objects.githubusercontent.com"].includes(target.hostname);
        callback({ cancel: !allowed });
    });

    return (url, options) => updateSession.fetch(url instanceof URL ? url.href : url,
        { ...options, credentials: "omit", redirect: "follow" });
}
