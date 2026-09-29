import { chmodSync, existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveDataDirectory } from "./data-directory.js";


export interface ServerConfig {
    host: string;
    port: number;
    webOrigin: string;
    /** Reserved for explicit server-side AI operations; never pass it to the UI. */
    aiApiKey?: string;
    aiModel: string;
    aiSessionContinuationEnabled: boolean;
    databasePath: string;
}


const projectEnvironmentFile = fileURLToPath(new URL("../../../../../.env", import.meta.url));


export function loadServerEnvironment(path = projectEnvironmentFile): void {
    if (existsSync(path))
        process.loadEnvFile(path);
}


function readPort(value: string | undefined): number {
    if (value === undefined || value === "")
        return 8787;

    const port = Number(value);
    if (!Number.isInteger(port) || port < 1 || port > 65_535)
        throw new Error("WARPLYN_SERVER_PORT must be an integer from 1 to 65535.");

    return port;
}


function readBoolean(value: string | undefined, name: string): boolean {
    if (value === undefined || value === "")
        return false;

    if (value === "true")
        return true;

    if (value === "false")
        return false;

    throw new Error(`${name} must be either true or false.`);
}


export function loadServerConfig(environment = process.env): ServerConfig {
    const dataDirectory = resolveDataDirectory(environment, homedir());
    mkdirSync(dataDirectory, { recursive: true, mode: 0o700 });
    if (process.platform !== "win32")
        chmodSync(dataDirectory, 0o700);

    return {
        host: environment.WARPLYN_SERVER_HOST || "127.0.0.1",
        port: readPort(environment.WARPLYN_SERVER_PORT),
        webOrigin: environment.WARPLYN_WEB_ORIGIN || "http://localhost:5173",
        aiApiKey: environment.WARPLYN_AI_API_KEY || undefined,
        aiModel: environment.WARPLYN_AI_MODEL || "gpt-5",
        aiSessionContinuationEnabled: readBoolean(environment.WARPLYN_AI_SESSION_CONTINUATION, "WARPLYN_AI_SESSION_CONTINUATION"),
        databasePath: join(dataDirectory, "skladno.sqlite"),
    };
}
