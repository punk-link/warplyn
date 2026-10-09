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
        await page.waitForURL("http://127.0.0.1:5173/");
        if (process.env.WARPLYN_ELECTRON_TEST_HIDDEN === "true")
            expect(await app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0].isVisible())).toBe(false);

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
        if (process.env.WARPLYN_ELECTRON_TEST_HIDDEN === "true")
            expect(await app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0].isVisible())).toBe(false);

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


test("daily native backups create a complete bundle at every application startup", async () => {
    test.setTimeout(90_000);
    const root = await mkdtemp(join(tmpdir(), "warplyn-daily-backups-"));
    const data = join(root, "data");
    const profile = join(root, "profile");
    const destination = join(root, "backups");
    await mkdir(join(data, "skills", "fixture"), { recursive: true });
    await mkdir(profile);
    await mkdir(destination);
    await writeFile(join(data, "skills", "fixture", "SKILL.md"), "Synthetic automatic backup Skill");
    await writeFile(join(profile, "runtime-settings.json"), JSON.stringify({ backupDirectory: destination }));
    const env = { ...process.env, WARPLYN_DATA_DIR: data, WARPLYN_AI_API_KEY: "" };
    delete env.ELECTRON_RUN_AS_NODE;
    let app: ElectronApplication | undefined;
    try {
        app = await _electron.launch({ args: [resolve("packages/electron"), `--user-data-dir=${profile}`], env });
        const initialPage = await app.firstWindow();
        await initialPage.waitForURL("http://127.0.0.1:5173/");
        await initialPage.evaluate(async () => {
            if (!window.skladno)
                throw new Error("Missing desktop client");

            await window.skladno.updateBackupPolicy({ schedule: "daily", retention: { mode: "count", count: 7 } });
        });
        await app.close();
        app = undefined;
        const initialCount = (await readdir(destination)).filter((name) => name.endsWith(".sqlite")).length;
        for (const expectedCount of [1, 2]) {
            app = await _electron.launch({ args: [resolve("packages/electron"), `--user-data-dir=${profile}`], env });
            const page = await app.firstWindow();
            await page.waitForURL("http://127.0.0.1:5173/");
            await page.evaluate(() => localStorage.setItem("skladno.quick-start.v1", "complete"));
            await page.reload();
            await expect.poll(async () => (await readdir(destination)).filter((name) => name.endsWith(".sqlite")).length, { timeout: 20_000 }).toBe(initialCount + expectedCount);
            await page.evaluate(() => localStorage.removeItem("skladno.quick-start.v1"));
            await app.close();
            app = undefined;
        }

        for (const name of (await readdir(destination)).filter((entry) => entry.endsWith(".sqlite"))) {
            expect(name).toMatch(/^warplyn-automatic-/);
            const snapshot = join(destination, name);
            expect(await readFile(join(`${snapshot}.skills`, "skills", "fixture", "SKILL.md"), "utf8")).toBe("Synthetic automatic backup Skill");
            expect(JSON.parse(await readFile(join(`${snapshot}.skills`, "manifest.json"), "utf8")).files["database.sqlite"].size).toBeGreaterThan(0);
            const restored = new DatabaseSync(snapshot, { readOnly: true });
            try {
                expect(restored.prepare("PRAGMA integrity_check").get()?.integrity_check).toBe("ok");
            } finally {
                restored.close();
            }
        }

        const unavailableDirectory = join(root, "unavailable-folder");
        await writeFile(unavailableDirectory, "A file cannot be used as a backup folder.");
        await writeFile(join(profile, "runtime-settings.json"), JSON.stringify({ backupDirectory: unavailableDirectory }));
        app = await _electron.launch({ args: [resolve("packages/electron"), `--user-data-dir=${profile}`], env });
        const failedPage = await app.firstWindow();
        await failedPage.getByRole("button", { name: "Skip quick start" }).waitFor();
        // Exercise a failure before the reloaded renderer installs its notification listener.
        await failedPage.route("**/src/settings/AutomaticBackups.tsx*", async (route) => {
            await new Promise((resolveDelay) => setTimeout(resolveDelay, 8_000));
            await route.continue();
        });
        await failedPage.reload();
        await expect(failedPage.getByRole("alert").filter({ hasText: "Automatic backup failed." })).toBeVisible({ timeout: 20_000 });
        await expect(failedPage.getByRole("alert").filter({ hasText: "Automatic backup failed." })).toContainText("create a manual backup");
    } finally {
        await app?.close();
        await rm(root, { recursive: true, force: true });
    }
});
