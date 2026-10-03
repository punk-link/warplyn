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
        await chooseNativePaths(app, null, null);
        await page.getByRole("button", { name: "Load from file" }).click();
        await expect(editor).toContainText("New Draft");
        await expect(page.getByRole("button", { name: "Load from file" })).toBeFocused();
        const notifications = page.getByRole("button", { name: /^Dismiss notification:/ });
        while (await notifications.count())
            await notifications.first().click();

        await chooseNativePaths(app, join(root, "missing.md"), target);
        await page.getByRole("button", { name: "Load from file" }).click();
        await expect(page.getByText(/Choose a readable Markdown file/)).toBeVisible();
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
