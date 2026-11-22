import assert from "node:assert/strict";
import { once } from "node:events";
import { mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import test from "node:test";
import { assistantSkillRecoveryPath, assistantSkillsPath, articlesPath } from "@skladno/shared";
import { createLocalApplication } from "../local-application.js";
import { createLocalService } from "./server.js";


test("HTTP recovery status and retry preserve damaged evidence while Articles remain accessible", async (context) => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-recovery-http-"));
    assert.equal(dirname(resolve(root)), resolve(tmpdir()));
    const config = {
        host: "127.0.0.1", port: 0, webOrigin: "http://localhost:5173",
        databasePath: join(root, "skladno.sqlite"), aiModel: "test", aiSessionContinuationEnabled: false,
    };
    mkdirSync(join(root, "skill-staging"));
    const damaged = join(root, "skill-staging", "damaged.json");
    writeFileSync(damaged, "{damaged evidence");
    const application = createLocalApplication(config);
    const service = createLocalService(config, application.editorial, application.services);
    context.after(async () => {
        await new Promise<void>((done) => service.close(() => done()));
        application.database.close();
        rmSync(root, { recursive: true, force: true });
    });
    const article = application.services.articles.createArticle({ title: "Unrelated Article", content: "Preserved." });
    service.listen(0, config.host);
    await once(service, "listening");
    const address = service.address();
    assert.ok(address && typeof address !== "string");
    const base = `http://127.0.0.1:${address.port}`;
    const expected = { kind: "blocked", skillIds: [], allAuthorSkills: true };
    const status = await fetch(base + assistantSkillRecoveryPath);
    assert.equal(status.status, 200);
    assert.deepEqual(await status.json(), expected);
    const retry = await fetch(base + assistantSkillRecoveryPath, { method: "POST" });
    assert.equal(retry.status, 200);
    assert.deepEqual(await retry.json(), expected);
    assert.equal(readFileSync(damaged, "utf8"), "{damaged evidence");
    const articles = await fetch(base + articlesPath);
    assert.ok(JSON.stringify(await articles.json()).includes(article.id));
    const skills = await fetch(base + assistantSkillsPath);
    assert.ok((await skills.json()).length > 0);

    renameSync(damaged, damaged + ".preserved");
    const repaired = await fetch(base + assistantSkillRecoveryPath, { method: "POST" });
    assert.deepEqual(await repaired.json(), { kind: "ready" });
    assert.equal(readFileSync(damaged + ".preserved", "utf8"), "{damaged evidence");
});
