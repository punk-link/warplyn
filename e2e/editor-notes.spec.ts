import { readFile } from "node:fs/promises";
import { expect, test, type Locator } from "@playwright/test";


async function selectPassage(editor: Locator, passage: string) {
    await editor.focus();
    await editor.evaluate((element, quote) => {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();
        while (node && !node.textContent?.includes(quote))
            node = walker.nextNode();

        if (!node)
            throw new Error("Note fixture passage missing");

        const start = node.textContent!.indexOf(quote);
        const range = document.createRange();
        range.setStart(node, start);
        range.setEnd(node, start + quote.length);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
        document.dispatchEvent(new Event("selectionchange"));
    }, passage);
}


test("notes use quiet footnotes, persist, guide selection requests, and stay out of publication text", async ({ page, context }) => {
    test.setTimeout(60000);
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.goto("/");
    const created = page.waitForResponse((response) => response.url().endsWith("/api/articles") && response.request().method() === "POST");
    const create = page.getByRole("button", { name: "Create", exact: true });
    if (await create.isVisible())
        await create.click();
    else
        await page.getByRole("button", { name: "New article", exact: true }).click();

    const article = await (await created).json();
    const editor = page.getByRole("textbox", { name: "Article draft" });
    await expect(editor).toHaveText("");
    await expect(page.getByRole("button", { name: "Add editor note…", exact: true })).toBeDisabled();
    await page.getByRole("combobox", { name: "Block style", exact: true }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("button", { name: "Editor notes · 0", exact: true })).toBeFocused();
    await editor.fill("The ledger is the shared repair log.\nThe record was useful.\nWe kept it dry.");
    await page.getByRole("button", { name: "Save revision", exact: true }).click();
    await selectPassage(editor, "The record was useful.");
    await page.getByRole("button", { name: "Add editor note…", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Editor notes", exact: true });
    await dialog.getByRole("textbox", { name: "Guidance for the Assistant" }).fill("Use ledger as the noun.");
    await dialog.getByRole("button", { name: "Save note", exact: true }).click();
    const marker = page.getByRole("button", { name: "Editor note 1", exact: true });
    await expect(marker).toBeVisible();
    await editor.press("ArrowRight");
    await page.getByRole("combobox", { name: "Editorial guidance" }).focus();
    await page.screenshot({ path: "test-results/editor-notes-idle.png" });
    expect(await page.evaluate(() => CSS.highlights.has("warplyn-editor-note"))).toBe(false);
    await marker.hover();
    await page.screenshot({ path: "test-results/editor-notes-hover.png" });
    expect(await page.evaluate(() => CSS.highlights.has("warplyn-editor-note"))).toBe(true);
    await editor.hover();
    expect(await page.evaluate(() => CSS.highlights.has("warplyn-editor-note"))).toBe(false);
    await marker.focus();
    expect(await page.evaluate(() => CSS.highlights.has("warplyn-editor-note"))).toBe(true);
    await marker.press("Enter");
    await expect(dialog.getByRole("textbox")).toHaveValue("Use ledger as the noun.");
    await dialog.getByRole("button", { name: "Cancel", exact: true }).click();

    await selectPassage(editor, "We kept it dry.");
    await editor.click({ button: "right" });
    await page.getByRole("menuitem", { name: "Add editor note…", exact: true }).click();
    await dialog.getByRole("textbox").fill("Keep this private note separate.");
    await dialog.getByRole("button", { name: "Save note", exact: true }).click();
    await page.reload();
    await expect(page.getByRole("button", { name: "Editor notes · 2", exact: true })).toBeVisible();
    await expect(marker).toBeVisible();
    await expect(editor).not.toContainText("Use ledger");

    await editor.focus();
    await editor.press("ControlOrMeta+A");
    await editor.press("ControlOrMeta+C");
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toContain("The record was useful.");
    expect(copied).not.toContain("Use ledger");
    expect(copied).not.toContain("Keep this private");
    const downloading = page.waitForEvent("download");
    await page.locator("[data-focus-area=article-header]").getByRole("button", { name: "Save to file" }).click();
    await page.getByRole("dialog", { name: "Save to file…" }).getByRole("button", { name: "Download" }).click();
    const downloadPath = await (await downloading).path();
    expect(downloadPath).toBeTruthy();
    const exported = await readFile(downloadPath!, "utf8");
    expect(exported).not.toContain("Use ledger");
    expect(exported).not.toContain("Keep this private");

    await selectPassage(editor, "The record was useful.");
    await page.getByRole("combobox", { name: "Editorial guidance" }).fill("E2E edit with editor notes");
    await expect(page.getByText("Notes accompanying this request", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Send editorial request" }).click();
    await expect(page.getByRole("button", { name: "Review Proposal", exact: true })).toBeVisible();
    const saved = await (await page.request.get(`http://127.0.0.1:8787/api/articles/${article.id}`)).json();
    expect(saved.currentRevision.content).toContain("The record was useful.");
    expect(saved.currentRevision.content).not.toContain("The ledger helped.");

    await editor.fill("Replacement passage.");
    await selectPassage(editor, "Replacement passage.");
    await page.getByRole("button", { name: "Editor notes · 2", exact: true }).click();
    await expect(dialog.getByText("Needs reattachment", { exact: true })).toHaveCount(2);
    await dialog.getByRole("button", { name: "Edit note…", exact: true }).first().click();
    await dialog.getByRole("button", { name: "Attach to selected text", exact: true }).click();
    await dialog.getByRole("button", { name: "Save note", exact: true }).click();
    await expect(marker).toBeVisible();
    await marker.click();
    await dialog.getByRole("textbox").fill("Updated guidance.");
    await dialog.getByRole("button", { name: "Save note", exact: true }).click();
    await marker.click();
    await dialog.getByRole("button", { name: "Remove note", exact: true }).click();
    await expect(page.getByRole("button", { name: "Editor notes · 1", exact: true })).toBeVisible();
});
