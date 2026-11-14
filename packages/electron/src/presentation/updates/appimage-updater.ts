import { createHash } from "node:crypto";
import { EventEmitter } from "node:events";
import { constants } from "node:fs";
import { access, mkdir, open, realpath, rm } from "node:fs/promises";
import { isAbsolute, join } from "node:path";
import { prepareAppImageReplacement } from "../../infrastructure/recovery/appimage-replacement.js";
import { readAppImageUpdateMetadata } from "./appimage-update-metadata.js";

const releaseRoot = "https://github.com/punk-link/warplyn/releases/download/";


export async function getInstalledAppImage(packaged: boolean): Promise<string | undefined> {
    const path = process.env.APPIMAGE;
    const mount = process.env.APPDIR;
    if (!packaged || process.platform !== "linux" || process.arch !== "x64" || !path || !mount || !isAbsolute(path))
        return undefined;

    const executable = await realpath(process.execPath);
    if (!executable.startsWith(`${await realpath(mount)}/`))
        return undefined;

    await access(path, constants.R_OK | constants.X_OK);
    return realpath(path);
}


async function fetchReleaseAsset(url: string, fetchAsset: typeof fetch): Promise<Response> {
    for (let redirects = 0; redirects < 5; redirects += 1) {
        const target = new URL(url);
        if (target.protocol !== "https:" || target.username || target.password || target.port ||
            !["github.com", "release-assets.githubusercontent.com", "objects.githubusercontent.com"].includes(target.hostname))
            throw new Error("Invalid update destination.");

        const response = await fetchAsset(url, { redirect: "manual" });
        if (response.status >= 300 && response.status < 400) {
            const location = response.headers.get("location");
            await response.body?.cancel();
            if (!location)
                throw new Error("Missing update destination.");

            url = new URL(location, url).href;
        } else {
            if (!response.ok)
                throw new Error("Update download failed.");

            return response;
        }
    }

    throw new Error("Too many update redirects.");
}


async function downloadImage(response: Response, path: string, expected: { size: number; sha256: string }): Promise<void> {
    if (!response.body)
        throw new Error("Missing update content.");

    const file = await open(path, "wx", 0o600);
    const reader = response.body.getReader();
    const hash = createHash("sha256");
    let size = 0;

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done)
                break;

            size += value.byteLength;
            if (size > expected.size)
                throw new Error("Oversized update.");

            hash.update(value);
            await file.writeFile(value);
        }

        if (size !== expected.size || hash.digest("hex") !== expected.sha256)
            throw new Error("Update integrity check failed.");

        await file.sync();
    } finally {
        try {
            await reader.cancel();
        } finally {
            await file.close();
        }
    }
}


export function createAppImageUpdater(installed: string, cache: string, fetchAsset: typeof fetch, restart: () => void) {
    const events = new EventEmitter();
    let feed = "";
    let downloaded: string | undefined;
    let replacement: Awaited<ReturnType<typeof prepareAppImageReplacement>> | undefined;
    let controller = new AbortController();
    let busy = false;


    async function readMetadata(response: Response): Promise<unknown> {
        if (!response.body)
            throw new Error("Missing update metadata.");

        const reader = response.body.getReader();
        let text = "";
        const decoder = new TextDecoder();
        let size = 0;
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done)
                    break;

                size += value.byteLength;
                if (size > 4096)
                    throw new Error("Oversized update metadata.");

                text += decoder.decode(value, { stream: true });
            }

            return JSON.parse(text + decoder.decode());
        } finally {
            await reader.cancel();
        }
    }


    async function download(): Promise<void> {
        const signal = controller.signal;
        const fetchUpdate: typeof fetch = (url, options) => fetchAsset(url, { ...options, signal });
        const punctuationPattern = /^v/;
        const version = feed.slice(releaseRoot.length).replace(punctuationPattern, "");
        const metadataResponse = await fetchReleaseAsset(`${feed}/warplyn-appimage-x64.json`, fetchUpdate);
        const metadata = readAppImageUpdateMetadata(await readMetadata(metadataResponse), version);

        await mkdir(cache, { recursive: true, mode: 0o700 });

        const path = join(cache, metadata.file);
        await rm(path, { force: true });

        try {
            await downloadImage(await fetchReleaseAsset(`${feed}/${metadata.file}`, fetchUpdate), path, metadata);
            downloaded = path;
            events.emit("update-downloaded");
        } catch (error) {
            await rm(path, { force: true });
            throw error;
        }
    }


    return {
        on: (event: "update-downloaded" | "error", listener: () => void) => {
            events.on(event, listener);
        },
        setFeedURL({ url }: { url: string }) {
            const numberPattern = /^v\d+\.\d+\.\d+(?:-preview\.\d+(?:\.security)?)?$/;
            if (!url.startsWith(releaseRoot) || !numberPattern.test(url.slice(releaseRoot.length)))
                throw new Error("Invalid release feed.");

            feed = url;
        },
        checkForUpdates() {
            if (busy) {
                events.emit("error");
                return;
            }

            busy = true;
            downloaded = undefined;
            controller = new AbortController();
            void download().catch(() => events.emit("error")).finally(() => {
                busy = false;
            });
        },
        cancelDownload() {
            controller.abort();
        },
        async prepareApply() {
            if (!downloaded)
                throw new Error("No staged update.");

            await replacement?.cancel();
            replacement = await prepareAppImageReplacement(installed, downloaded);
        },
        async quitAndInstall() {
            if (!replacement)
                throw new Error("No prepared update.");

            try {
                await replacement.apply();
            } finally {
                restart();
            }
        },
    };
}
