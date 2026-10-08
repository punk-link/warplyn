import { randomUUID } from "node:crypto";
import { copyFile, cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { _electron, expect, test, type ElectronApplication } from "@playwright/test";


test("desktop backups restore native personal words at startup without removing existing vocabulary", async () => {
    test.setTimeout(120_000);
    const root = await mkdtemp(join(tmpdir(), "warplyn-personal-e2e-"));
    const profile = join(root, "profile");
    const runtimePath = join(profile, "runtime-settings.json");
    const destination = join(root, "backups");
    const token = randomUUID().replaceAll("-", "");
    const savedWord = `WarplynSaved${token}`;
    const localWord = `WarplynLocal${token}`;
    await mkdir(profile);
    await mkdir(destination);
    await writeFile(runtimePath, JSON.stringify({ backupDirectory: destination }));
    const env = { ...process.env, WARPLYN_DATA_DIR: join(root, "data"), WARPLYN_AI_API_KEY: "" };
    delete env.ELECTRON_RUN_AS_NODE;
    let app: ElectronApplication | undefined;
    try {
        const args = [resolve("packages/electron"), `--user-data-dir=${profile}`];
        app = await _electron.launch({ args, env });
        const page = await app.firstWindow();
        await page.waitForURL("http://127.0.0.1:5173/");
        expect(await app.evaluate(({ session }, word) => session.defaultSession.addWordToSpellCheckerDictionary(word), savedWord)).toBe(true);
        const selected = await page.evaluate(async () => {
            if (!window.skladnoDesktop)
                throw new Error("Missing desktop client");

            return window.skladnoDesktop.createNativeBackup();
        });
        expect(JSON.parse(await readFile(join(`${selected.path}.skills`, "personal-dictionary.json"), "utf8"))).toContain(savedWord);
        await app.evaluate(({ session }, word) => session.defaultSession.removeWordFromSpellCheckerDictionary(word), savedWord);
        expect(await app.evaluate(({ session }, word) => session.defaultSession.addWordToSpellCheckerDictionary(word), localWord)).toBe(true);
        const recovery = await page.evaluate(async () => {
            if (!window.skladnoDesktop)
                throw new Error("Missing desktop client");

            return window.skladnoDesktop.createNativeBackup();
        });
        await app.close();
        app = undefined;
        const stagedSnapshotPath = join(root, "staged.sqlite");
        await copyFile(selected.path, stagedSnapshotPath);
        await cp(`${selected.path}.skills`, `${stagedSnapshotPath}.skills`, { recursive: true });
        await writeFile(runtimePath, JSON.stringify({ backupDirectory: destination, pendingRestore: {
            stagedSnapshotPath, recoverySnapshotPath: recovery.path, phase: "ready",
        } }));
        app = await _electron.launch({ args, env });
        await (await app.firstWindow()).waitForURL("http://127.0.0.1:5173/");
        const restored = await app.evaluate(({ session }) => session.defaultSession.listWordsInSpellCheckerDictionary());
        expect(restored).toContain(savedWord);
        expect(restored).toContain(localWord);
        expect(JSON.parse(await readFile(runtimePath, "utf8")).pendingRestore).toBeUndefined();
        expect(JSON.parse(await readFile(join(`${selected.path}.skills`, "personal-dictionary.json"), "utf8"))).toContain(savedWord);
    } finally {
        if (app) {
            await app.evaluate(({ session }, words) => {
                for (const word of words)
                    session.defaultSession.removeWordFromSpellCheckerDictionary(word);
            }, [savedWord, localWord]);
            await app.close();
        }

        await rm(root, { recursive: true, force: true });
    }
});
