import { readFile } from "node:fs/promises";
import { expect, test, type Locator, type Page } from "@playwright/test";


async function downloadArticle(page: Page): Promise<string> {
    const downloaded = page.waitForEvent("download");
    await page.locator("[data-focus-area=article-header]").getByRole("button", { name: "Save to file" }).click();
    const download = await downloaded;
    expect(download.suggestedFilename()).toMatch(/\.md$/);
    const path = await download.path();
    if (!path)
        throw new Error("Expected a completed test download.");

    return readFile(path, "utf8");
}


test("Markdown files round trip whole Articles and saved Revisions in the browser", async ({ page }) => {
    test.setTimeout(60000);
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.goto("/");
    const create = page.getByRole("button", { name: "Create" });
    if (await create.isVisible())
        await create.click();
    else
        await page.getByRole("button", { name: "New article" }).click();

    const editor = page.getByRole("textbox", { name: "Article draft" });
    await editor.fill("Whole Article café 🙂");
    await editor.press("ControlOrMeta+a");
    expect(await downloadArticle(page)).toBe("Whole Article café 🙂");
    const originalTitle = await page.getByRole("button", { name: /^Rename article:/ }).getAttribute("aria-label");
    const content = "# Imported café 🙂\n\nA **technical** term, [URL](https://example.com/docs).\n\n```ts\nconst value = 34;\n```";
    const choosing = page.waitForEvent("filechooser");
    await page.getByRole("button", { name: "Load from file" }).click();
    await (await choosing).setFiles({ name: "import.md", mimeType: "text/markdown", buffer: Buffer.from(content) });
    await expect(page.getByRole("button", { name: "Rename article: Imported café 🙂" })).toBeVisible();
    await expect(editor).toContainText("const value = 34;");
    const exported = await downloadArticle(page);
    expect(exported).toContain("# Imported café 🙂");
    expect(exported).toContain("[URL](https://example.com/docs)");
    expect(exported).toContain("const value = 34;");
    await page.reload();
    await expect(editor).toContainText("Imported café 🙂");
    await expect(page.getByRole("button", { name: "Rename article: Imported café 🙂" })).toBeVisible();
    await editor.fill("New Draft, not the saved Revision.");
    await page.getByRole("button", { name: /^Imported café 🙂/ }).click({ button: "right" });
    const libraryDownload = page.waitForEvent("download");
    await page.getByRole("menuitem", { name: "Save to file…" }).click();
    const libraryPath = await (await libraryDownload).path();
    expect(await readFile(libraryPath!, "utf8")).toBe("# New Draft, not the saved Revision.");
    await page.getByRole("tab", { name: "Revisions" }).click();
    const downloaded = page.waitForEvent("download");
    await page.getByRole("region", { name: "Saved Article content" }).getByRole("button", { name: "Save to file", exact: true }).click();
    const revision = await downloaded;
    const revisionPath = await revision.path();
    expect(revision.suggestedFilename()).toContain("Revision 1");
    expect(await readFile(revisionPath!, "utf8")).toBe(content);
    await page.getByRole("tab", { name: "Write", exact: true }).click();
    await expect(editor).toContainText("New Draft, not the saved Revision.");
    await page.getByRole("button", { name: /^Imported café 🙂/ }).click({ button: "right" });
    const invalidChoosing = page.waitForEvent("filechooser");
    await page.getByRole("menuitem", { name: "Load from file…" }).click();
    await (await invalidChoosing).setFiles({ name: "invalid.md", mimeType: "text/markdown", buffer: Buffer.from([0xff]) });
    await expect(page.getByText("Choose a .md file containing valid UTF-8 Markdown text.")).toBeVisible();
    await expect(editor).toContainText("New Draft, not the saved Revision.");
    expect(originalTitle).not.toBe("Rename article: Imported café 🙂");
    await page.setViewportSize({ width: 900, height: 700 });
    await expect(page.getByRole("button", { name: "Expand Editorial Assistant Panel" })).toBeVisible();
    await expect(page.locator("[data-focus-area=article-header]").getByRole("button", { name: "Save to file" })).toBeInViewport();
    await expect(page.getByRole("button", { name: "Load from file" })).toBeInViewport();
    await expect(page.getByRole("button", { name: "Rename article: Imported café 🙂" })).toBeVisible();
    await page.getByRole("button", { name: "Archive Article", exact: true }).click();
    await page.getByRole("button", { name: /^Archived \(/ }).click();
    await page.getByRole("button", { name: /^Imported café 🙂/ }).click({ button: "right" });
    const archivedDownload = page.waitForEvent("download");
    await page.getByRole("menuitem", { name: "Save to file…" }).click();
    const archivedPath = await (await archivedDownload).path();
    expect(await readFile(archivedPath!, "utf8")).toBe("# New Draft, not the saved Revision.");
    await page.getByRole("button", { name: "Collapse Article Library Panel" }).click();
    await expect(page.locator("[data-focus-area=article-header]").getByRole("button", { name: "Save to file" })).toBeInViewport();
    await expect(page.getByRole("button", { name: "Load from file" })).toBeInViewport();
});


test("Library file action highlights follow pointer and keyboard focus", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.goto("/");
    const create = page.getByRole("button", { name: "Create" });
    const created = page.waitForResponse((response) => response.url().endsWith("/api/articles") && response.request().method() === "POST");
    if (await create.isVisible())
        await create.click();
    else
        await page.getByRole("button", { name: "New article" }).click();

    await created;
    await expect(page.getByRole("textbox", { name: "Article draft" })).toHaveText("");

    await page.locator("[data-workspace-panel=article-library] [aria-current=page]").click({ button: "right" });
    const menuSave = page.getByRole("menuitem", { name: "Save to file…" });
    const menuLoad = page.getByRole("menuitem", { name: "Load from file…" });
    const itemBackground = (item: Locator) => item.evaluate((element) => getComputedStyle(element).backgroundColor);
    await page.mouse.move(900, 20);
    await expect.poll(() => itemBackground(menuSave)).toBe(await itemBackground(menuLoad));
    await page.keyboard.press("ArrowDown");
    await expect(menuLoad).toBeFocused();
    await expect.poll(() => itemBackground(menuLoad)).not.toBe(await itemBackground(menuSave));
});
