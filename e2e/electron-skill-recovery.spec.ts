import { mkdtempSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { expect, test } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { closePackaged, launchPackaged } from "./electron-packaged-app.js";


test("packaged startup quarantines a damaged journal while preserving Articles and Author Skill history", async () => {
    test.setTimeout(120_000);
    const root = mkdtempSync(join(tmpdir(), "warplyn-skill-recovery-desktop-"));
    expect(dirname(resolve(root))).toBe(resolve(tmpdir()));
    const data = join(root, "data");
    mkdirSync(data);
    execFileSync(process.execPath, ["--input-type=module", "--eval", `
        import { createLocalApplication } from "@skladno/server/electron";
        import { join } from "node:path";
        const application = createLocalApplication({
            host: "127.0.0.1", port: 0, webOrigin: "http://localhost:5173",
            databasePath: join(process.argv[1], "skladno.sqlite"), aiModel: "test", aiSessionContinuationEnabled: false,
        });
        try {
            application.services.articles.createArticle({ title: "Recovery Article", content: "Keep this Article." });
            application.services.authorSkills.create({ skillId: "author-review", files: {
                "SKILL.md": ["---", "id: author-review", "name: Author review", "description: Review a draft.",
                    "version: 1", "---", "Preserve voice."].join("\\n"),
            } });
        } finally {
            application.database.close();
        }
    `, data], {
        stdio: "pipe",
        env: {
            ...process.env,
            WARPLYN_BUILT_IN_SKILLS_DIR: resolve("packages/server/src/application/assistant/skills/built-in"),
        },
    });

    mkdirSync(join(data, "skill-staging"));
    const damaged = join(data, "skill-staging", "damaged.json");
    writeFileSync(damaged, "{preserved evidence");
    const skillPath = join(data, "skills", "author-review", "SKILL.md");
    const original = readFileSync(skillPath);
    const historyRoot = join(data, "skill-history", "author-review");
    const revisions = readdirSync(historyRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory());
    expect(revisions).toHaveLength(1);
    const historyPath = join(historyRoot, revisions[0]!.name, "revision.json");
    const history = readFileSync(historyPath);
    const historyState = readFileSync(join(historyRoot, "state.json"));
    let app: Awaited<ReturnType<typeof launchPackaged>> | undefined;
    try {
        app = await launchPackaged(root);
        const page = app.page;
        await page.addInitScript(() => {
            localStorage.setItem("skladno.quick-start.v1", "complete");
            localStorage.setItem("skladno.update-permission.v1", "complete");
        });
        await page.reload();
        await expect(page.getByRole("heading", { name: "Recovery Article" })).toBeVisible();
        await expect(page.getByRole("textbox", { name: "Article draft" })).toHaveText("Keep this Article.");
        await page.getByRole("button", { name: "Review recovery" }).click();
        const recovery = page.getByRole("region", { name: "Author Skill recovery" });
        await recovery.getByRole("button", { name: "Retry recovery" }).click();
        await expect(recovery.getByRole("button", { name: "Retry recovery" })).toBeEnabled();
        expect(readFileSync(damaged, "utf8")).toBe("{preserved evidence");
        expect(readFileSync(skillPath)).toEqual(original);
        expect(readFileSync(historyPath)).toEqual(history);
        expect(readFileSync(join(historyRoot, "state.json"))).toEqual(historyState);
        const unavailable = await page.evaluate(() => window.skladno!.listAssistantSkills());
        expect(unavailable.some((skill) => skill.reference.id === "author-review")).toBe(false);
        expect(unavailable.some((skill) => skill.reference.source === "built-in")).toBe(true);

        renameSync(damaged, damaged + ".preserved");
        await recovery.getByRole("button", { name: "Retry recovery" }).click();
        await expect(recovery.getByRole("status")).toHaveText("Author Skills are available.");
        const available = await page.evaluate(() => window.skladno!.listAssistantSkills());
        expect(available.some((skill) => skill.reference.id === "author-review")).toBe(true);
        expect(readFileSync(skillPath)).toEqual(original);
        expect(readFileSync(damaged + ".preserved", "utf8")).toBe("{preserved evidence");
        expect(readFileSync(historyPath)).toEqual(history);
        expect(readFileSync(join(historyRoot, "state.json"))).toEqual(historyState);
        await closePackaged(app);
        app = await launchPackaged(root);
        await expect(app.page.getByRole("heading", { name: "Recovery Article" })).toBeVisible();
        await expect(app.page.getByRole("button", { name: "Review recovery" })).toHaveCount(0);
        expect(readFileSync(historyPath)).toEqual(history);
        expect(readdirSync(historyRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory())).toHaveLength(1);
    } finally {
        if (app)
            await closePackaged(app);

        rmSync(root, { recursive: true, force: true });
    }
});
