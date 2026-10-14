import { mkdtempSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, sep } from "node:path";
import { expect, test } from "@playwright/test";
import { launchPackaged, closePackaged } from "./electron-packaged-app.js";

test("packaged typography works without AI and recovers its Proposal after restart", async () => {
    test.setTimeout(120_000);
    const root = mkdtempSync(join(tmpdir(), "warplyn-typography-"));
    if (!realpathSync(root).startsWith(`${realpathSync(tmpdir())}${sep}`))
        throw new Error("Unexpected typography fixture directory.");

    let app: Awaited<ReturnType<typeof launchPackaged>> | undefined;
    try {
        app = await launchPackaged(root);
        let page = app.page;
        await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
        await page.reload();
        await page.getByRole("button", { name: "Create", exact: true }).click();
        await page.getByRole("textbox", { name: "Article draft" }).fill("Wait...");
        await page.getByRole("button", { name: "Save revision", exact: true }).click();
        await page.getByRole("tab", { name: "Style Profile", exact: true }).click();
        await page.getByRole("button", { name: "Add rule", exact: true }).click();
        await page.getByRole("button", { name: "Save", exact: true }).click();
        await expect(page.getByText("Typography rules saved and Style Profile rebuilt.", { exact: true })).toBeVisible();
        await page.getByRole("button", { name: "Check typography", exact: true }).click();
        await page.getByRole("button", { name: "Review Proposal", exact: true }).click();
        await expect(page.getByText("Typography rules: Ellipsis: …", { exact: true })).toBeVisible();
        await closePackaged(app);
        app = undefined;
        app = await launchPackaged(root);
        page = app.page;
        const proposalsNamePattern = /Proposals:/;
        await page.getByRole("tab", { name: proposalsNamePattern }).click();
        await expect(page.getByText("Typography rules: Ellipsis: …", { exact: true })).toBeVisible();
        await page.getByRole("button", { name: "Accept all", exact: true }).click();
        await page.getByRole("tab", { name: "Write", exact: true }).click();
        await expect(page.getByRole("textbox", { name: "Article draft" })).toContainText("Wait…");
        await page.getByRole("textbox", { name: "Article draft" }).fill("Wait!!!!");
        await page.getByRole("button", { name: "Save revision", exact: true }).click();
        const styleProfileTab = /^Style Profile/u;
        await page.getByRole("tab", { name: styleProfileTab }).click();
        await page.getByRole("button", { name: "Edit", exact: true }).click();
        await page.getByRole("combobox", { name: "Rule 1 convention", exact: true }).selectOption("literal");
        await page.getByRole("textbox", { name: "Punctuation to replace", exact: true }).fill("!!");
        await page.getByRole("textbox", { name: "Replacement punctuation", exact: true }).fill("!");
        await page.getByRole("button", { name: "Save", exact: true }).click();
        await expect(page.getByText("Typography rules saved and Style Profile rebuilt.", { exact: true })).toBeVisible();
        await page.getByRole("button", { name: "Check typography", exact: true }).click();
        await expect(page.getByText("Typography corrections could not be made consistently. Adjust overlapping or repeating typography rules, then check again. Your Article was not changed.", { exact: true })).toBeVisible();
        await page.getByRole("tab", { name: "Write", exact: true }).click();
        await expect(page.getByRole("textbox", { name: "Article draft" })).toContainText("Wait!!!!");
    } finally {
        if (app)
            await closePackaged(app);

        rmSync(root, { recursive: true, force: true });
    }
});
