import { mkdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { isTelemetryEvent, type TelemetryEvent } from "@skladno/shared";


export interface StoredTelemetryEvent {
    event: TelemetryEvent;
    queuedAt: number;
    appVersion?: string;
    uuid?: string;
}


export function createTelemetryQueueStore(path: string) {
    let pending = Promise.resolve();
    let generation = 0;


    function save(installationId: string, entries: readonly StoredTelemetryEvent[]): void {
        const current = generation;
        const contents = JSON.stringify({ installationId, entries });

        pending = pending.then(async () => {
            if (current !== generation)
                return;

            await mkdir(dirname(path), { recursive: true, mode: 0o700 });
            await writeFile(`${path}.tmp`, contents, { mode: 0o600 });

            if (current === generation)
                await rename(`${path}.tmp`, path);
        }).catch(() => undefined);
    }


    function clear(): void {
        generation += 1;
        pending = pending.then(async () => {
            await Promise.all([rm(path, { force: true }), rm(`${path}.tmp`, { force: true })]);
        }).catch(() => undefined);
    }


    async function load(installationId: string, now: number, expiryMs: number): Promise<StoredTelemetryEvent[]> {
        try {
            if ((await stat(path)).size > 100_000)
                return [];

            const value: unknown = JSON.parse(await readFile(path, "utf8"));
            if (!value || typeof value !== "object" || !("installationId" in value) || value.installationId !== installationId ||
                !("entries" in value) || !Array.isArray(value.entries) || value.entries.length > 100)
                return [];

            const versionPattern = /^[0-9A-Za-z.+-]{1,64}$/;
            const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
            return value.entries.filter((entry: unknown): entry is StoredTelemetryEvent =>
                Boolean(entry && typeof entry === "object" && "event" in entry && isTelemetryEvent(entry.event) &&
                    "queuedAt" in entry && typeof entry.queuedAt === "number" && Number.isFinite(entry.queuedAt) &&
                    entry.queuedAt <= now && now - entry.queuedAt <= expiryMs &&
                    (!("appVersion" in entry) || typeof entry.appVersion === "string" && versionPattern.test(entry.appVersion)) &&
                    (!("uuid" in entry) || typeof entry.uuid === "string" && uuidPattern.test(entry.uuid))));
        } catch {
            return [];
        }
    }


    return { save, load, clear, settled: () => pending };
}
