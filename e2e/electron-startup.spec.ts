import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { closePackaged, launchPackaged } from "./electron-packaged-app.js";

test("the first packaged launch shows its window without a second launch", async () => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-startup-"));
    const hidden = process.env.WARPLYN_ELECTRON_TEST_HIDDEN;
    let app: Awaited<ReturnType<typeof launchPackaged>> | undefined;
    try {
        process.env.WARPLYN_ELECTRON_TEST_HIDDEN = "false";
        app = await launchPackaged(root);
        const page = app.page;
        await expect.poll(() => page.evaluate(() => document.visibilityState)).toBe("visible");
    } finally {
        if (app)
            await closePackaged(app);

        if (hidden === undefined)
            delete process.env.WARPLYN_ELECTRON_TEST_HIDDEN;
        else
            process.env.WARPLYN_ELECTRON_TEST_HIDDEN = hidden;

        rmSync(root, { recursive: true, force: true });
    }
});
