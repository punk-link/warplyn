import { readFile } from "node:fs/promises";
import { expect, test, type Locator, type Page } from "@playwright/test";


async function createBlankArticle(page: Page): Promise<void> {
    const editor = page.getByRole("textbox", { name: "Article draft" });
    const previousEditor = (await editor.elementHandles())[0];
    const created = page.waitForResponse((response) => response.url().endsWith("/api/articles") && response.request().method() === "POST");
    const create = page.getByRole("button", { name: "Create" });
    if (await create.isVisible())
        await create.click();
    else
        await page.getByRole("button", { name: "New article" }).click();

    expect((await created).ok()).toBe(true);
    if (previousEditor)
        await expect.poll(() => previousEditor.evaluate((element) => element.isConnected)).toBe(false);

    await expect(editor).toHaveText("");
}


async function downloadArticle(page: Page): Promise<string> {
    const downloaded = page.waitForEvent("download");
    await page.locator("[data-focus-area=article-header]").getByRole("button", { name: "Save to file" }).click();
    await page.getByRole("dialog", { name: "Save to file…" }).getByRole("button", { name: "Download" }).click();
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
    await createBlankArticle(page);

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
    await page.getByRole("dialog", { name: "Save to file…" }).getByRole("button", { name: "Download" }).click();
    const libraryPath = await (await libraryDownload).path();
    expect(await readFile(libraryPath!, "utf8")).toBe("# New Draft, not the saved Revision.");
    await page.getByRole("tab", { name: "Revisions" }).click();
    const downloaded = page.waitForEvent("download");
    await page.getByRole("region", { name: "Saved Article content" }).getByRole("button", { name: "Save to file", exact: true }).click();
    await page.getByRole("dialog", { name: "Save to file…" }).getByRole("button", { name: "Download" }).click();
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
    await expect(page.getByText("Choose a valid .md, .html, .docx, or .rtf file. Markdown and HTML files must use UTF-8.")).toBeVisible();
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
    await page.getByRole("dialog", { name: "Save to file…" }).getByRole("button", { name: "Download" }).click();
    const archivedPath = await (await archivedDownload).path();
    expect(await readFile(archivedPath!, "utf8")).toBe("# New Draft, not the saved Revision.");
    await page.getByRole("button", { name: "Collapse Article Library Panel" }).click();
    await expect(page.locator("[data-focus-area=article-header]").getByRole("button", { name: "Save to file" })).toBeInViewport();
    await expect(page.getByRole("button", { name: "Load from file" })).toBeInViewport();
});


test("Library file action highlights follow pointer and keyboard focus", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.goto("/");
    await createBlankArticle(page);

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


test("HTML, DOCX and RTF retain basic formatting through browser file import and export", async ({ page }) => {
    test.setTimeout(120_000);
    await page.addInitScript(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.goto("/");
    await createBlankArticle(page);

    const content = "# Portable café 🙂\n\nFirst **bold** and *italic*.\n\nSecond paragraph.\n\n- One\n    - Nested\n- Two\n\n3. Three\n4. Four\n\n```\nconst value = 34;\nnext();\n```";
    const choosing = page.waitForEvent("filechooser");
    await page.getByRole("button", { name: "Load from file" }).click();
    await (await choosing).setFiles({ name: "portable.md", mimeType: "text/markdown", buffer: Buffer.from(content) });
    const editor = page.getByRole("textbox", { name: "Article draft" });
    await expect(editor).toContainText("Portable café 🙂");
    const externalRequests: string[] = [];
    page.on("request", (request) => {
        if (!new URL(request.url()).hostname.match(/^(localhost|127\.0\.0\.1)$/))
            externalRequests.push(request.url());
    });
    for (const format of ["html", "docx", "rtf"]) {
        const downloaded = page.waitForEvent("download");
        await page.locator("[data-focus-area=article-header]").getByRole("button", { name: "Save to file" }).click();
        const dialog = page.getByRole("dialog", { name: "Save to file…" });
        await dialog.getByRole("combobox", { name: "File format" }).selectOption(format);
        await dialog.getByRole("button", { name: "Download" }).click();
        const download = await downloaded;
        expect(download.suggestedFilename()).toMatch(new RegExp(`\\.${format}$`));
        const path = await download.path();
        if (!path)
            throw new Error("Missing format download");

        const picking = page.waitForEvent("filechooser");
        await page.getByRole("button", { name: "Load from file" }).click();
        await (await picking).setFiles({ name: download.suggestedFilename(), mimeType: "application/octet-stream", buffer: await readFile(path) });
        const review = page.getByRole("dialog", { name: "Review imported Article" });
        await expect(review, `Import ${format}`).toBeVisible({ timeout: 20_000 });
        await expect(review.locator("ul ul")).toHaveCount(1);
        await review.getByRole("button", { name: "Import", exact: true }).click();
        await expect(review).not.toBeVisible();
        await expect(editor).toContainText("Second paragraph.");
        await expect(editor.locator("ul ul")).toHaveCount(1);
        expect(await downloadArticle(page)).toContain("3. Three");
        await page.reload();
        await expect(editor).toContainText("Portable café 🙂");
    }

    expect(externalRequests).toEqual([]);
});
