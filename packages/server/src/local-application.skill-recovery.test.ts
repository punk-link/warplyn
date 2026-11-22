import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import test, { type TestContext } from "node:test";
import { createLocalApplication, type LocalApplication } from "./local-application.js";
import { SkillChangeJournal } from "./infrastructure/skills/skill-change-journal.js";


const markdown = "---\nid: author-review\nname: Author review\ndescription: Review a draft.\nversion: 1\n---\nPreserve voice.";


// Product scenarios: editorial-workflows.skill-recovery-isolation

function fixture(context: TestContext) {
    const root = mkdtempSync(join(tmpdir(), "warplyn-skill-recovery-"));
    assert.equal(dirname(resolve(root)), resolve(tmpdir()));
    const applications: LocalApplication[] = [];
    context.after(() => {
        for (const application of applications) {
            if (application.database.isOpen)
                application.database.close();
        }

        rmSync(root, { recursive: true, force: true });
    });
    const config = {
        host: "127.0.0.1", port: 0, webOrigin: "http://localhost:5173",
        databasePath: join(root, "skladno.sqlite"), aiModel: "test", aiSessionContinuationEnabled: false,
    };
    return { root, launch: () => {
        const application = createLocalApplication(config);
        applications.push(application);
        return application;
    } };
}


test("a conflicting Skill is quarantined while Articles, built-ins and healthy Author Skills remain usable", (context) => {
    const { root, launch } = fixture(context);
    const application = launch();
    const article = application.services.articles.createArticle({ title: "Article", content: "Original text" });
    const authorSkills = application.services.authorSkills!;
    authorSkills.create({ skillId: "healthy-review", files: {
        "SKILL.md": markdown.replaceAll("author-review", "healthy-review").replace("Author review", "Healthy review"),
    } });
    authorSkills.commitChange({ kind: "create", skillId: "author-review", skillMarkdown: markdown }, "interrupted");
    const external = markdown.replace("Preserve voice.", "Keep this external edit.");
    const skillPath = join(root, "skills", "author-review", "SKILL.md");
    writeFileSync(skillPath, external);
    const journalPath = join(root, "skill-staging", readdirSync(join(root, "skill-staging"))[0]!);
    const journal = readFileSync(journalPath);
    application.database.close();

    const restarted = launch();
    assert.deepEqual(restarted.services.skillRecovery.status(), { kind: "blocked", skillIds: ["author-review"], allAuthorSkills: false });
    assert.equal(readFileSync(skillPath, "utf8"), external);
    assert.deepEqual(readFileSync(journalPath), journal);
    assert.equal(restarted.services.authorSkills!.listRevisions("author-review").length, 1);
    const skills = restarted.services.skills.discover();
    assert.ok(skills.some((skill) => skill.reference.source === "built-in"));
    assert.ok(skills.some((skill) => skill.reference.id === "healthy-review"));
    assert.ok(!skills.some((skill) => skill.reference.id === "author-review"));
    assert.deepEqual(restarted.services.skills.load([{ source: "author", id: "author-review", version: "1" }]), []);
    const unavailable = /skill_recovery_required/;
    assert.throws(() => restarted.services.authorSkills!.delete({ skillId: "author-review", expectedHash: "" }), unavailable);
    const revision = restarted.services.articles.saveRevision(article.id, { baseRevisionId: article.currentRevisionId, content: "Still editable." });
    assert.equal(revision.content, "Still editable.");

    restarted.services.authorSkills!.commitChange({
        kind: "create", skillId: "active-review",
        skillMarkdown: markdown.replaceAll("author-review", "active-review").replace("Author review", "Active review"),
    }, "active-request");
    assert.equal(restarted.services.skillRecovery.retry().kind, "blocked");
    writeFileSync(skillPath, markdown);
    assert.deepEqual(restarted.services.skillRecovery.retry(), { kind: "ready" });
    assert.ok(restarted.services.authorSkills!.readCurrent("active-review"));
    assert.equal(restarted.services.authorSkills!.listRevisions("active-review").length, 1);
    assert.deepEqual(new SkillChangeJournal(root).list().map((entry) => entry.kind === "pending" && entry.change.requestId), ["active-request"]);
});


test("an unreadable journal preserves evidence and disables Author Skills until a safe retry", (context) => {
    const { root, launch } = fixture(context);
    const application = launch();
    application.services.authorSkills!.create({ skillId: "author-review", files: { "SKILL.md": markdown } });
    const journalRoot = join(root, "skill-staging");
    mkdirSync(journalRoot, { recursive: true });
    const corrupt = join(journalRoot, `${createHash("sha256").update("repaired-request").digest("hex")}.json`);
    writeFileSync(corrupt, "{not valid JSON");
    application.database.close();

    const restarted = launch();
    assert.deepEqual(restarted.services.skillRecovery.status(), { kind: "blocked", skillIds: [], allAuthorSkills: true });
    assert.ok(restarted.services.skills.discover().every((skill) => skill.reference.source === "built-in"));
    assert.equal(readFileSync(corrupt, "utf8"), "{not valid JSON");
    assert.equal(readFileSync(join(root, "skills", "author-review", "SKILL.md"), "utf8"), markdown);
    assert.equal(restarted.services.authorSkills!.listRevisions("author-review").length, 1);
    assert.equal(restarted.services.skillRecovery.retry().kind, "blocked");
    const unavailable = /skill_recovery_required/;
    assert.throws(() => restarted.services.authorSkills!.create({
        skillId: "new-review", files: { "SKILL.md": markdown.replaceAll("author-review", "new-review") },
    }), unavailable);

    writeFileSync(corrupt, JSON.stringify({
        requestId: "repaired-request", skillId: "author-review", previousFiles: { "SKILL.md": markdown }, nextFiles: { "SKILL.md": markdown },
    }));
    assert.deepEqual(restarted.services.skillRecovery.retry(), { kind: "ready" });
    assert.deepEqual(new SkillChangeJournal(root).list(), []);
    assert.ok(restarted.services.skills.discover().some((skill) => skill.reference.id === "author-review"));
    assert.equal(restarted.services.authorSkills!.listRevisions("author-review").length, 1);
});


test("journal storage failures block only Author Skills rather than local application startup", (context) => {
    const { root, launch } = fixture(context);
    writeFileSync(join(root, "skill-staging"), "Preserved non-directory evidence.");
    const application = launch();
    assert.deepEqual(application.services.skillRecovery.status(), { kind: "blocked", skillIds: [], allAuthorSkills: true });
    assert.equal(readFileSync(join(root, "skill-staging"), "utf8"), "Preserved non-directory evidence.");
    assert.ok(application.services.skills.discover().length > 0);
    assert.ok(application.services.articles.createArticle({ title: "Independent", content: "Still works." }));
});
