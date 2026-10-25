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
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
        await page.reload();
        await page.getByRole("button", { name: "Create", exact: true }).click();
        await page.getByRole("textbox", { name: "Article draft" }).fill("Wait...");
        await page.getByRole("button", { name: "Save revision", exact: true }).click();
        await page.getByRole("button", { name: "Style Profile", exact: true }).click();
        await page.getByRole("button", { name: "Manual rules", exact: true }).click();
        await page.getByRole("button", { name: "Writing samples", exact: true }).click();
        await page.getByRole("button", { name: "Add writing sample", exact: true }).click();
        await expect.poll(() => page.evaluate(() => {
            const root = document.scrollingElement;
            return root ? root.scrollHeight - root.clientHeight : 0;
        })).toBeLessThanOrEqual(1);
        const styleContent = page.locator('[data-focus-area="settings-content"]');
        await styleContent.evaluate((element) => {
            element.scrollTop = element.scrollHeight;
        });
        await expect(page.getByRole("button", { name: "Add", exact: true })).toBeInViewport();
        await expect(page.getByRole("button", { name: "Back to workspace", exact: true })).toBeInViewport();
        await page.getByRole("button", { name: "Typography rules", exact: true }).click();
        await page.getByRole("button", { name: "Add rule", exact: true }).click();
        await page.getByRole("button", { name: "Save", exact: true }).click();
        await expect(page.getByText("Typography rules saved and Style Profile rebuilt.", { exact: true })).toBeVisible();
        const language = page.getByRole("combobox", { name: "Typography language", exact: true });
        await expect(language).toHaveValue("en");
        await language.selectOption("ru");
        await expect(page.getByRole("button", { name: "Check typography", exact: true })).toBeDisabled();
        await language.selectOption("en");
        await page.getByRole("combobox", { name: "Apply rules to", exact: true }).selectOption("article");
        await page.getByRole("button", { name: "Remove", exact: true }).click();
        await page.getByRole("button", { name: "Save", exact: true }).click();
        await expect(page.getByText("Article typography preferences saved.", { exact: true })).toBeVisible();
        await expect(page.getByRole("button", { name: "Check typography", exact: true })).toBeDisabled();
        await page.getByRole("button", { name: "Restore inherited rules", exact: true }).click();
        await expect(page.getByRole("button", { name: "Check typography", exact: true })).toBeEnabled();
        await page.getByRole("combobox", { name: "Apply rules to", exact: true }).selectOption("language");
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
        const proposed = page.getByRole("textbox", { name: "Proposed text for change 1" });
        await proposed.fill("Wait… please.");
        await page.getByRole("button", { name: "Stacked", exact: true }).click();
        await expect(proposed).toHaveValue("Wait… please.");
        await page.getByRole("button", { name: "Accept all", exact: true }).click();
        await page.getByRole("tab", { name: "Write", exact: true }).click();
        await expect(page.getByRole("textbox", { name: "Article draft" })).toContainText("Wait… please.");
        await closePackaged(app);
        app = undefined;
        app = await launchPackaged(root);
        page = app.page;
        await expect(page.getByRole("textbox", { name: "Article draft" })).toContainText("Wait… please.");
        await page.getByRole("tab", { name: "Proposals", exact: true }).click();
        const acceptedInput = page.getByRole("textbox", { name: "Proposed text for change 1" });
        await expect(acceptedInput).toHaveValue("Wait… please.");
        await expect(acceptedInput).toBeDisabled();
        await page.getByRole("tab", { name: "Write", exact: true }).click();
        await page.getByRole("textbox", { name: "Article draft" }).fill("Wait!!!!");
        await page.getByRole("button", { name: "Save revision", exact: true }).click();
        await page.getByRole("button", { name: "Style Profile", exact: true }).click();
        await page.getByRole("button", { name: "Typography rules", exact: true }).click();
        await page.getByRole("button", { name: "Edit", exact: true }).click();
        await page.getByRole("combobox", { name: "Rule 1 convention", exact: true }).selectOption("literal");
        await page.getByRole("textbox", { name: "Punctuation to replace", exact: true }).fill("!!");
        await page.getByRole("textbox", { name: "Replacement punctuation", exact: true }).fill("!");
        await page.getByRole("button", { name: "Save", exact: true }).click();
        await expect(page.getByText("Typography rules saved and Style Profile rebuilt.", { exact: true })).toBeVisible();
        await page.getByRole("button", { name: "Check typography", exact: true }).click();
        await expect(
            page.getByText(
                "Typography corrections could not be made consistently. " +
                    "Adjust overlapping or repeating typography rules, then check again. Your Article was not changed.",
                { exact: true },
            ),
        ).toBeVisible();
        await page.getByRole("button", { name: "Back to workspace", exact: true }).click();
        await page.getByRole("tab", { name: "Write", exact: true }).click();
        await expect(page.getByRole("textbox", { name: "Article draft" })).toContainText("Wait!!!!");
    } finally {
        if (app)
            await closePackaged(app);

        rmSync(root, { recursive: true, force: true });
    }
});
