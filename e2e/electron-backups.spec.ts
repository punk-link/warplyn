import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { _electron, expect, test, type ElectronApplication } from "@playwright/test";


test("native backup finishes through the production bridge before desktop shutdown", async () => {
    test.setTimeout(120_000);
    const root = await mkdtemp(join(tmpdir(), "warplyn-native-backup-"));
    const destination = join(root, "backups");
    const skill = join(root, "data", "skills", "fixture");
    await mkdir(skill, { recursive: true });
    await writeFile(join(skill, "SKILL.md"), "Synthetic backup fixture\n".repeat(100_000));
    const env = { ...process.env, WARPLYN_DATA_DIR: join(root, "data"), WARPLYN_AI_API_KEY: "" };
    delete env.ELECTRON_RUN_AS_NODE;
    let app: ElectronApplication | undefined;
    try {
        app = await _electron.launch({ args: [resolve("packages/electron"), `--user-data-dir=${join(root, "profile")}`], env });
        const page = await app.firstWindow();
        await page.waitForURL("http://localhost:5173/");
        await page.evaluate(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
        await page.reload();
        await page.getByRole("button", { name: "Create" }).click();
        await page.getByRole("textbox", { name: "Article draft" }).fill("Recoverable backup Draft");
        await page.getByRole("button", { name: "Settings" }).click();
        await page.getByRole("button", { name: "Data & backups", exact: true }).click();
        await app.evaluate(({ dialog }, path) => {
            dialog.showOpenDialog = async () => ({ canceled: false, filePaths: [path] });
        }, destination);
        await page.getByRole("button", { name: "Choose backup folder" }).click();
        await expect(page.getByText(/Using .*backups/)).toBeVisible();
        await page.getByRole("button", { name: "Create backup", exact: true }).click();
        await app.close();
        app = undefined;

        const snapshots = (await readdir(destination)).filter((name) => name.endsWith(".sqlite"));
        expect(snapshots).toHaveLength(1);
        const snapshot = join(destination, snapshots[0]);
        expect(await readFile(join(`${snapshot}.skills`, "skills", "fixture", "SKILL.md"), "utf8")).toBe("Synthetic backup fixture\n".repeat(100_000));
        const manifest = JSON.parse(await readFile(join(`${snapshot}.skills`, "manifest.json"), "utf8"));
        expect(manifest.files["database.sqlite"].size).toBeGreaterThan(0);
        const database = new DatabaseSync(snapshot, { readOnly: true });
        try {
            expect(database.prepare("PRAGMA integrity_check").get()?.integrity_check).toBe("ok");
            expect(database.prepare("SELECT content FROM article_drafts").get()?.content).toBe("Recoverable backup Draft");
        } finally {
            database.close();
        }

        expect((await readdir(destination)).some((name) => name.endsWith(".tmp"))).toBe(false);
    } finally {
        await app?.close();
        await rm(root, { recursive: true, force: true });
    }
});
