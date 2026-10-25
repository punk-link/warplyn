import { expect, test, type Locator } from "@playwright/test";


async function selectPassage(editor: Locator) {
    await editor.focus();
    await editor.evaluate((element) => {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();
        const passage = "The record was useful.";
        while (node && !node.textContent?.includes(passage))
            node = walker.nextNode();

        if (!node)
            throw new Error("Selection fixture passage missing");

        const range = document.createRange();
        const start = node.textContent!.indexOf(passage);
        range.setStart(node, start);
        range.setEnd(node, start + passage.length);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        document.dispatchEvent(new Event("selectionchange"));
    });
}


test("bounded selection questions and replacements preserve neighboring Article text after reload", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.goto("/");
    const create = page.getByRole("button", { name: "Create", exact: true });
    if (await create.isVisible())
        await create.click();
    else
        await page.getByRole("button", { name: "New article", exact: true }).click();

    const editor = page.getByRole("textbox", { name: "Article draft" });
    await editor.fill("The ledger is the shared repair log.");
    await editor.press("End");
    await editor.press("Enter");
    await editor.pressSequentially("The record was useful.");
    await editor.press("Enter");
    await editor.pressSequentially("We kept it dry.");
    await page.getByRole("button", { name: "Save revision", exact: true }).click();
    await selectPassage(editor);
    const localMeaningVoiceNamePattern = /For local meaning and voice, selection requests/;
    await expect(page.getByText(localMeaningVoiceNamePattern)).toBeVisible();
    const composer = page.getByRole("combobox", { name: "Editorial guidance" });
    await composer.fill("E2E selection question");
    await page.getByRole("button", { name: "Send editorial request" }).click();
    await expect(page.getByText("The ledger is the shared repair log.", { exact: true }).last()).toBeVisible();
    await expect(editor).toContainText("The record was useful.");
    await selectPassage(editor);
    await composer.fill("E2E edit bounded selection");
    await page.getByRole("button", { name: "Quick actions" }).click();
    await page.getByRole("option", { name: "Improve flow and clarity" }).click();
    await page.getByRole("button", { name: "Send editorial request" }).click();
    await expect(page.getByRole("button", { name: "Apply to selection" })).toHaveCount(0);
    await page.getByRole("button", { name: "Review Proposal", exact: true }).click();
    await page.getByRole("button", { name: "Set all decisions…" }).click();
    await page.getByRole("menuitem", { name: "Mark all accepted" }).click();
    await page.getByRole("button", { name: "Apply", exact: true }).click();
    await page.getByRole("tab", { name: "Write", exact: true }).click();
    await page.reload();
    await expect(editor).toContainText("The ledger is the shared repair log.");
    await expect(editor).toContainText("The ledger helped.");
    await expect(editor).toContainText("We kept it dry.");
    await expect(editor).not.toContainText("The record was useful.");
});
