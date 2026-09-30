import path from "node:path";
import { cpSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { FuseV1Options, FuseVersion } from "@electron/fuses";


const rootPackage = JSON.parse(readFileSync(path.join(import.meta.dirname, "..", "..", "package.json"), "utf8"));
const telemetryConfig = path.join(import.meta.dirname, "telemetry.json");


export default {
    hooks: {
        packageAfterCopy: async (_config, buildPath) => {
            const destination = path.join(buildPath, "dist", "node_modules", "@napi-rs");
            mkdirSync(destination, { recursive: true });
            const keyringPackage = process.platform === "linux"
                ? "keyring-linux-x64-gnu"
                : "keyring-win32-x64-msvc";

            for (const packageName of ["keyring", keyringPackage])
                cpSync(path.join(import.meta.dirname, "..", "..", "node_modules", "@napi-rs", packageName), path.join(destination, packageName), { recursive: true });
        },
    },
    packagerConfig: {
        asar: { unpack: "**/*.node" },
        appBundleId: "com.warplyn.desktop",
        executableName: "Warplyn",
        icon: path.join(import.meta.dirname, "assets", process.platform === "win32" ? "icon.ico" : "icon.png"),
        extraResource: [
            path.join(import.meta.dirname, "..", "web", "dist"),
            path.join(import.meta.dirname, "..", "server", "src", "application", "assistant", "skills", "built-in"),
            ...(existsSync(telemetryConfig) ? [telemetryConfig] : [])
        ],
    },
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            platforms: ["win32"],
            config: {
                name: "com.warplyn.desktop",
                setupExe: `Warplyn-${rootPackage.version}-win32-x64-setup.exe`,
                setupIcon: path.join(import.meta.dirname, "assets", "icon.ico"),
            },
        },
        {
            name: "@electron-forge/maker-deb",
            platforms: ["linux"],
            config: {
                options: {
                    name: "warplyn",
                    bin: "Warplyn",
                    maintainer: "Kirill Taran",
                    homepage: "https://github.com/punk-link/warplyn",
                    categories: ["Office"],
                    icon: path.join(import.meta.dirname, "..", "web", "src", "ui", "warplyn.svg"),
                },
            },
        },
    ],
    plugins: [
        {
            name: "@electron-forge/plugin-fuses",
            config: {
                version: FuseVersion.V1,
                [FuseV1Options.RunAsNode]: false,
                [FuseV1Options.EnableCookieEncryption]: true,
                [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
                [FuseV1Options.EnableNodeCliInspectArguments]: false,
                [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
                [FuseV1Options.OnlyLoadAppFromAsar]: true,
            },
        },
    ],
};
