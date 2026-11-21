import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { closePackaged, launchPackaged } from "./electron-packaged-app.js";


test("packaged editor notes survive restart and the native menu handoff preserves the selected passage", async () => {
    test.setTimeout(120000);
    const root = mkdtempSync(join(tmpdir(), "warplyn-electron-notes-"));
    let app: Awaited<ReturnType<typeof launchPackaged>> | undefined;
    try {
        app = await launchPackaged(root);
        let page = app.page;
        await page.addInitScript(() => {
            localStorage.setItem("skladno.quick-start.v1", "complete");
            localStorage.setItem("skladno.update-permission.v1", "complete");
        });
        await page.reload();
        const create = page.getByRole("button", { name: "Create", exact: true });
        if (await create.isVisible())
            await create.click();
        else
            await page.getByRole("button", { name: "New article", exact: true }).click();

        let editor = page.getByRole("textbox", { name: "Article draft" });
        await editor.fill("A synthetic passage.");
        await page.getByRole("button", { name: "Save revision", exact: true }).click();
        await editor.focus();
        await editor.press("ControlOrMeta+A");
        await page.getByRole("button", { name: "Editor notes", exact: true }).click();
        let dialog = page.getByRole("dialog", { name: "Editor notes", exact: true });
        await dialog.getByRole("textbox").fill("Keep the Author's voice.");
        await dialog.getByRole("button", { name: "Save note", exact: true }).click();
        await expect(dialog.getByRole("textbox")).toHaveCount(0);
        await dialog.getByRole("button", { name: "Cancel", exact: true }).click();
        await expect(page.getByRole("button", { name: "Editor note 1", exact: true })).toBeVisible();
        await editor.focus();
        await editor.press("ControlOrMeta+A");
        await editor.evaluate((element) => {
            element.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true }));
            element.dispatchEvent(new CustomEvent("warplyn:editor-menu", { detail: { kind: "format", id: "note" } }));
        });
        await dialog.getByRole("textbox").fill("Check the verb.");
        await dialog.getByRole("button", { name: "Save note", exact: true }).click();
        await closePackaged(app);
        app = undefined;
        app = await launchPackaged(root);
        page = app.page;
        editor = page.getByRole("textbox", { name: "Article draft" });
        await expect(editor).toHaveText("A synthetic passage.");
        await page.getByRole("button", { name: "Editor notes", exact: true }).click();
        dialog = page.getByRole("dialog", { name: "Editor notes", exact: true });
        await expect(dialog.getByText("Keep the Author's voice.", { exact: true })).toBeVisible();
        await expect(dialog.getByText("Check the verb.", { exact: true })).toBeVisible();
        await expect(editor).not.toContainText("Check the verb.");
    } finally {
        if (app)
            await closePackaged(app);

        rmSync(root, { recursive: true, force: true });
    }
});
