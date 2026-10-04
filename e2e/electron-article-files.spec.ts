import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { _electron, expect, test, type ElectronApplication } from "@playwright/test";


async function launchArticleFiles(root: string): Promise<ElectronApplication> {
    const env = { ...process.env, WARPLYN_DATA_DIR: join(root, "data"), WARPLYN_AI_API_KEY: "" };
    delete env.ELECTRON_RUN_AS_NODE;
    const app = await _electron.launch({
        args: [resolve("packages/electron"), `--user-data-dir=${join(root, "profile")}`],
        env,
    });
    const page = await app.firstWindow();
    await page.waitForURL("http://localhost:5173/");
    await page.evaluate(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
    await page.reload();
    return app;
}


async function chooseNativePaths(app: ElectronApplication, source: string | null, target: string | null): Promise<void> {
    await app.evaluate(({ dialog }, paths) => {
        dialog.showOpenDialog = async () => ({ canceled: paths.source === null, filePaths: paths.source ? [paths.source] : [] });
        dialog.showSaveDialog = async () => ({ canceled: paths.target === null, filePath: paths.target ?? undefined });
    }, { source, target });
}


test("native Markdown dialogs round trip whole Articles and Revisions through the production bridge", async () => {
    test.setTimeout(120_000);
    const root = await mkdtemp(join(tmpdir(), "warplyn-native-article-files-"));
    const source = join(root, "source.md");
    const target = join(root, "target.md");
    const content = "# Native café 🙂\n\n[docs](https://example.com)\n\n```ts\nconst value = 34;\n```";
    await writeFile(source, content);
    let app: ElectronApplication | undefined;
    try {
        app = await launchArticleFiles(root);
        let page = await app.firstWindow();
        await chooseNativePaths(app, source, target);
        await page.getByRole("button", { name: "Create" }).click();
        const editor = page.getByRole("textbox", { name: "Article draft" });
        await editor.fill("Original whole Draft");
        await editor.press("ControlOrMeta+a");
        await page.locator("[data-focus-area=article-header]").getByRole("button", { name: "Save to file" }).click();
        await expect(page.getByText("Article saved to file")).toBeVisible();
        expect(await readFile(target, "utf8")).toBe("Original whole Draft");
        await page.locator("[data-workspace-panel=article-library] [aria-current=page]").click({ button: "right" });
        await page.getByRole("menuitem", { name: "Load from file…" }).click();
        await expect(page.getByRole("button", { name: "Rename article: Native café 🙂" })).toBeVisible();
        await editor.fill("New Draft");
        await page.locator("[data-workspace-panel=article-library] [aria-current=page]").click({ button: "right" });
        await page.getByRole("menuitem", { name: "Save to file…" }).click();
        await expect.poll(() => readFile(target, "utf8")).toBe("# New Draft");
        await page.getByRole("tab", { name: "Revisions" }).click();
        await page.getByRole("region", { name: "Saved Article content" }).getByRole("button", { name: "Save to file", exact: true }).click();
        await expect.poll(() => readFile(target, "utf8")).toBe(content);
        await page.getByRole("tab", { name: "Write", exact: true }).click();
        await expect(editor).toContainText("New Draft");
        for (const format of ["html", "docx", "rtf"]) {
            const formatPath = join(root, `roundtrip.${format}`);
            await chooseNativePaths(app, source, formatPath);
            await page.getByRole("button", { name: "Load from file" }).click();
            await expect(page.getByRole("button", { name: "Load from file" })).toBeEnabled();
            await expect(editor).toContainText("const value = 34;");
            await page.locator("[data-focus-area=article-header]").getByRole("button", { name: "Save to file" }).click();
            await expect.poll(async () => (await readFile(formatPath).catch(() => Buffer.alloc(0))).length).toBeGreaterThan(0);
            await expect(page.getByRole("dialog", { name: "Save to file…" })).not.toBeVisible();
            await chooseNativePaths(app, formatPath, target);
            await page.getByRole("button", { name: "Load from file" }).click();
            const review = page.getByRole("dialog", { name: "Review imported Article" });
            await expect(review).toBeVisible({ timeout: 20_000 });
            await review.getByRole("button", { name: "Import", exact: true }).click();
            await expect(review).not.toBeVisible();
            await expect(page.getByRole("button", { name: "Load from file" })).toBeEnabled();
            await expect(editor).toContainText("const value = 34;");
        }

        await editor.fill("New Draft");
        await chooseNativePaths(app, null, null);
        await page.getByRole("button", { name: "Load from file" }).click();
        await expect(editor).toContainText("New Draft");
        await expect(page.getByRole("button", { name: "Load from file" })).toBeFocused();
        const notifications = page.getByRole("button", { name: /^Dismiss notification:/ });
        while (await notifications.count())
            await notifications.first().click();

        await chooseNativePaths(app, join(root, "missing.md"), target);
        await page.getByRole("button", { name: "Load from file" }).click();
        await expect(page.getByText(/Choose a readable Markdown, HTML, DOCX, or RTF file/)).toBeVisible();
        await expect(editor).toContainText("New Draft");
        await app.close();
        app = await launchArticleFiles(root);
        page = await app.firstWindow();
        await expect(page.getByRole("textbox", { name: "Article draft" })).toContainText("New Draft");
        await page.getByRole("tab", { name: "Revisions" }).click();
        await expect(page.getByRole("navigation", { name: "Revision history" }).getByRole("button")).toHaveCount(1);
        await expect(page.getByText("const value = 34;", { exact: true })).toBeVisible();
    } finally {
        await app?.close();
        await rm(root, { recursive: true, force: true });
    }
});


test("built file renderer imports DOCX and RTF in isolated workers", async () => {
    test.setTimeout(90_000);
    const root = await mkdtemp(join(tmpdir(), "warplyn-built-file-workers-"));
    const source = join(root, "source.md");
    await writeFile(source, "# Built renderer\n\n**Bold** paragraph.\n\n- One\n    - Nested");
    let app: ElectronApplication | undefined;
    try {
        app = await launchArticleFiles(root);
        const page = await app.firstWindow();
        await app.evaluate(async ({ BrowserWindow }, path) => BrowserWindow.getAllWindows()[0].loadFile(path), resolve("packages/web/dist/index.html"));
        await page.waitForURL(/^file:/);
        await page.evaluate(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
        await page.reload();
        await page.getByRole("button", { name: "Create" }).click();
        await chooseNativePaths(app, source, null);
        await page.getByRole("button", { name: "Load from file" }).click();
        const editor = page.getByRole("textbox", { name: "Article draft" });
        await expect(editor).toContainText("Built renderer");
        for (const format of ["docx", "rtf"]) {
            const path = join(root, `built.${format}`);
            await chooseNativePaths(app, null, path);
            await page.locator("[data-focus-area=article-header]").getByRole("button", { name: "Save to file" }).click();
            await expect.poll(async () => (await readFile(path).catch(() => Buffer.alloc(0))).length).toBeGreaterThan(0);
            await chooseNativePaths(app, path, null);
            await page.getByRole("button", { name: "Load from file" }).click();
            const review = page.getByRole("dialog", { name: "Review imported Article" });
            await expect(review).toBeVisible({ timeout: 20_000 });
            await expect(review.locator("ul ul")).toHaveCount(1);
            await review.getByRole("button", { name: "Import", exact: true }).click();
            await expect(page.getByRole("button", { name: "Load from file" })).toBeEnabled();
            await expect(editor).toContainText("Bold paragraph.");
        }
    } finally {
        await app?.close();
        await rm(root, { recursive: true, force: true });
    }
});
