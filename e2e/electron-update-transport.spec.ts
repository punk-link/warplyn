import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createHash, X509Certificate } from "node:crypto";
import { once } from "node:events";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { createServer } from "node:https";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";
import { test } from "@playwright/test";
import { build } from "esbuild";


test("native update fetch follows trusted redirects and blocks untrusted destinations before contact", async () => {
    const certificate = await readFile(resolve("e2e/fixtures/update-network.crt"));
    const key = await readFile(resolve("e2e/fixtures/update-network.key"));
    const publicKey = new X509Certificate(certificate).publicKey.export({ type: "spki", format: "der" });
    const fingerprint = createHash("sha256").update(publicKey).digest("base64");
    let payloadRequests = 0;
    const server = createServer({ cert: certificate, key }, (request, response) => {
        if (request.url === "/payload") {
            payloadRequests += 1;
            response.end("verified");
            return;
        }

        const host = request.url === "/untrusted" ? "untrusted.invalid" : "github.com";
        response.writeHead(302, { location: `https://${host}/payload` }).end();
    });
    const root = await mkdtemp(join(tmpdir(), "warplyn-native-update-"));
    try {
        server.listen(0, "127.0.0.1");
        await once(server, "listening");
        const address = server.address();
        assert(address && typeof address !== "string");
        const harness = join(root, "probe.cjs");
        await build({ stdin: { resolveDir: process.cwd(), contents: `
            import {app} from 'electron';
            import assert from 'node:assert/strict';
            import {createDesktopUpdateFetch} from './packages/electron/src/presentation/updates/create-desktop-update-fetch.ts';
            app.whenReady().then(async () => {
                const fetchUpdate = createDesktopUpdateFetch();
                const response = await fetchUpdate('https://github.com/redirect');
                assert.equal(await response.text(), 'verified');
                await assert.rejects(fetchUpdate('https://github.com/untrusted'));
                await assert.rejects(fetchUpdate('http://github.com/payload'));
                app.exit(0);
            }).catch(error => { console.error(error.message); app.exit(1); });
        ` }, bundle: true, platform: "node", format: "cjs", external: ["electron"], outfile: harness });
        const electronExecutable: unknown = createRequire(resolve("package.json"))("electron");
        assert(typeof electronExecutable === "string");
        const env = { ...process.env };
        delete env.ELECTRON_RUN_AS_NODE;
        await promisify(execFile)(electronExecutable, [harness, `--user-data-dir=${join(root, "profile")}`,
            "--no-proxy-server", `--ignore-certificate-errors-spki-list=${fingerprint}`,
            `--host-resolver-rules=MAP github.com 127.0.0.1:${address.port}, MAP untrusted.invalid 127.0.0.1:${address.port}`],
        { env, timeout: 30_000 });
        assert.equal(payloadRequests, 1);
    } finally {
        server.closeAllConnections();
        server.close();
        await rm(root, { recursive: true, force: true });
    }
});
