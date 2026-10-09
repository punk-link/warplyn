import { mkdtempSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, sep } from "node:path";
import { expect, test } from "@playwright/test";
import { launchPackaged, closePackaged } from "./electron-packaged-app.js";


test("packaged Electron Assistant failure preserves the Article and its Revision after restart", async () => {
    test.setTimeout(120_000);
    const root = mkdtempSync(join(tmpdir(), "skladno-electron-assistant-"));
    const resolvedRoot = realpathSync(root);
    if (!resolvedRoot.startsWith(`${realpathSync(tmpdir())}${sep}`))
        throw new Error("Unexpected Electron smoke data directory.");

    let app: Awaited<ReturnType<typeof launchPackaged>> | undefined;

    try {
        app = await launchPackaged(root);
        let page = app.page;
        page.setDefaultTimeout(5_000);
        await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
        await page.reload();
        await expect(page.evaluate(() => "skladno" in window)).resolves.toBe(true);
        await expect(page.evaluate(() => {
            const files = window.skladnoArticleFiles;
            return files?.saveFile({ ticket: "unissued-ticket", format: "markdown" }, new TextEncoder().encode("Article content")).catch((error: unknown) => {
                if (error instanceof Error)
                    return error.message;

                return undefined;
            });
        })).resolves.toBe("invalid_request");
        await page.setViewportSize({ width: 1024, height: 768 });

        const create = page.getByRole("button", { name: "Create" });
        if (await create.isVisible())
            await create.click();
        else
            await page.getByRole("button", { name: "New article" }).click();

        const editor = page.getByRole("textbox", { name: "Article draft" });
        await editor.pressSequentially("Electron fixture Article.");
        await page.getByRole("button", { name: "Save revision" }).click();
        await expect(page.getByRole("status", { name: "Saved", exact: true })).toBeVisible();
        await page.getByRole("button", { name: "Dismiss notification: Revision saved without an Article title" }).click();

        await page.getByRole("button", { name: "Expand Editorial Assistant Panel" }).click();
        await page.getByRole("combobox", { name: "Editorial guidance" }).fill("Improve flow");
        await page.getByRole("button", { name: "Send editorial request" }).click();
        await expect(page.getByRole("alert")).toBeVisible();
        await expect(editor).toContainText("Electron fixture Article.");

        await closePackaged(app);
        app = undefined;
        app = await launchPackaged(root);
        page = app.page;
        await expect(page.getByRole("textbox", { name: "Article draft" })).toContainText("Electron fixture Article.");
        await page.getByRole("tab", { name: "Revisions" }).click();
        await expect(page.getByRole("navigation", { name: "Revision history" })).toContainText("Added 25 characters");
    } finally {
        if (app)
            await closePackaged(app);

        rmSync(resolvedRoot, { recursive: true, force: true });
    }
});
