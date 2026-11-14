import { createHash, X509Certificate } from "node:crypto";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import { createServer } from "node:https";
import { resolve } from "node:path";


export async function createUpdateNetwork() {
    const testCertificate = await readFile(resolve("e2e/fixtures/update-network.crt"));
    const testPrivateKey = await readFile(resolve("e2e/fixtures/update-network.key"));
    const publicKey = new X509Certificate(testCertificate).publicKey.export({ type: "spki", format: "der" });
    const fingerprint = createHash("sha256").update(publicKey).digest("base64");
    let body = "";
    let requests = 0;
    let downloads = 0;
    const server = createServer({ cert: testCertificate, key: testPrivateKey }, (request, response) => {
        if (request.url === "/punk-link/warplyn/releases/download/v99.0.0/warplyn-appimage-x64.json") {
            response.writeHead(302, { location: "/update-metadata.json" }).end();
            return;
        }

        if (request.url === "/update-metadata.json") {
            response.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify({
                version: "99.0.0", architecture: "x64", file: "Warplyn-99.0.0-linux-x64.AppImage",
                size: 3, sha256: createHash("sha256").update("new").digest("hex"),
            }));
            return;
        }

        if (request.url === "/punk-link/warplyn/releases/download/v99.0.0/Warplyn-99.0.0-linux-x64.AppImage") {
            response.writeHead(302, { location: "/update-payload.AppImage" }).end();
            return;
        }

        if (request.url === "/update-payload.AppImage") {
            downloads += 1;
            response.writeHead(200).end("bad");
            return;
        }

        if (request.url !== "/repos/punk-link/warplyn/releases") {
            response.writeHead(404).end();
            return;
        }

        requests += 1;
        response.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify([
            { tag_name: "v99.0.0", name: "Warplyn v99.0.0", body,
                html_url: "https://github.com/punk-link/warplyn/releases/tag/v99.0.0", prerelease: false, draft: false,
                assets: [{ name: "RELEASES" }, { name: "com.warplyn.desktop-99.0.0-full.nupkg" }, { name: "warplyn_99.0.0_amd64.deb" },
                    { name: "Warplyn-99.0.0-linux-x64.AppImage" }, { name: "warplyn-appimage-x64.json" }] },
        ]));
    });
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    const address = server.address();
    if (!address || typeof address === "string")
        throw new Error("Could not open the isolated update fixture.");

    return {
        args: ["--no-proxy-server",
            `--host-resolver-rules=MAP api.github.com 127.0.0.1:${address.port}, MAP github.com 127.0.0.1:${address.port}`,
            `--ignore-certificate-errors-spki-list=${fingerprint}`],
        setBody: (value: string) => {
            body = value;
        },
        requestCount: () => requests,
        downloadRequestCount: () => downloads,
        close: () => new Promise<void>((resolveClose, rejectClose) => {
            server.close((error) => error ? rejectClose(error) : resolveClose());
            server.closeAllConnections();
        }),
    };
}
