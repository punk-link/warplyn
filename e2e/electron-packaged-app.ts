import { spawn, type ChildProcess } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import { join, resolve } from "node:path";
import { chromium, expect, type Browser, type Page } from "@playwright/test";


async function unusedPort(): Promise<number> {
    const server = createServer();
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    const address = server.address();
    if (!address || typeof address === "string")
        throw new Error("Could not reserve a local debugging port.");

    await new Promise<void>((resolveClose) => server.close(() => resolveClose()));
    return address.port;
}


export async function launchPackaged(root: string): Promise<{ process: ChildProcess; browser: Browser; page: Page }> {
    const port = await unusedPort();
    const executable = process.platform === "win32" ? "Warplyn.exe" : "Warplyn";
    const executablePath = process.env.WARPLYN_ELECTRON_EXECUTABLE || resolve(`packages/electron/out/Warplyn-${process.platform}-x64/${executable}`);
    const child = spawn(executablePath, ["--remote-debugging-address=127.0.0.1", `--remote-debugging-port=${port}`, `--user-data-dir=${join(root, "profile")}`], {
        env: { ...process.env, WARPLYN_DATA_DIR: join(root, "data"), WARPLYN_AI_API_KEY: "" },
        stdio: "ignore",
    });

    try {
        await expect.poll(async () => {
            if (child.exitCode !== null)
                throw new Error("Packaged Warplyn exited before opening its window.");

            try {
                return (await fetch(`http://127.0.0.1:${port}/json/version`)).ok;
            } catch {
                return false;
            }
        }, { timeout: 30_000 }).toBe(true);

        const browser = await chromium.connectOverCDP(`http://127.0.0.1:${port}`);
        await expect.poll(() => browser.contexts()[0]?.pages().length, { timeout: 30_000 }).toBeGreaterThan(0);
        const page = browser.contexts()[0]?.pages()[0];
        if (!page)
            throw new Error("Packaged Warplyn opened no renderer page.");

        await page.waitForURL(/index\.html$/, { timeout: 30_000 });
        return { process: child, browser, page };
    } catch (error) {
        child.kill();
        throw error;
    }
}


export async function closePackaged(app: { process: ChildProcess; browser: Browser; page: Page }): Promise<void> {
    await app.page.close().catch(() => undefined);
    await app.browser.close().catch(() => undefined);
    if (app.process.exitCode === null)
        await Promise.race([once(app.process, "exit"), new Promise((resolveWait) => setTimeout(resolveWait, 5_000))]);

    if (app.process.exitCode === null)
        app.process.kill();
}

