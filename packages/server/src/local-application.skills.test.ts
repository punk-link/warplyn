import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { createLocalApplication } from "./local-application.js";
import { SkillChangeJournal } from "./infrastructure/skills/skill-change-journal.js";
import { AssistantRepository } from "./infrastructure/persistence/index.js";
import { openDatabase } from "./infrastructure/persistence/database.js";
import { createApplicationServices } from "./application/create-application-services.js";
import { createLocalSkills } from "./create-local-skills.js";
import { createTestPersistence } from "./test-support/test-persistence.js";


const skillMarkdown = "---\nid: author-review\nname: Author review\ndescription: Review a draft.\nversion: 1\n---\nKeep the Author in control.";


test("application composition uses injected Skill services without running startup recovery", () => {
    const root = mkdtempSync(join(tmpdir(), "warplyn-skill-composition-"));
    const database = openDatabase(join(root, "skladno.sqlite"));
    try {
        const persistence = createTestPersistence(database);
        const skills = createLocalSkills(root);
        assert.ok(skills.authorSkills);
        skills.authorSkills.commitChange({ kind: "create", skillId: "author-review", skillMarkdown }, "pending-request");
        const services = createApplicationServices({
            stores: {
                articles: persistence.articles, assistant: persistence.assistant, artifacts: persistence.editorialArtifacts,
                styleCorpus: persistence.styleCorpus, engines: { resolve: () => undefined },
            },
            settings: {
                settings: persistence.settings, dateTimeFormat: { read: async () => ({ locale: "en" }) },
                models: { list: async () => [] }, createConnectionId: () => "test",
            },
            skills,
        });
        assert.equal(services.skills, skills.catalog);
        assert.equal(services.authorSkills, skills.authorSkills);
        assert.ok(services.authorSkills?.readCurrent("author-review"));
        assert.equal(new SkillChangeJournal(root).list().length, 1);
    } finally {
        database.close();
        rmSync(root, { recursive: true, force: true });
    }
});


for (const completed of [false, true]) {
    test(`local startup ${completed ? "retains completed" : "rolls back incomplete"} Skill changes before exposing services`, () => {
        const root = mkdtempSync(join(tmpdir(), "warplyn-skill-startup-"));
        const config = {
            host: "127.0.0.1", port: 0, webOrigin: "http://localhost:5173",
            databasePath: join(root, "skladno.sqlite"), aiModel: "test", aiSessionContinuationEnabled: false,
        };
        const initial = createLocalApplication(config);
        try {
            const article = initial.services.articles.createArticle({ title: "Draft", content: "Original." });
            const assistant = new AssistantRepository(initial.database);
            assistant.createRequest({
                id: "skill-request", articleId: article.id,
                scope: { kind: "article", baseRevisionId: article.currentRevision.id },
            });
            const authorSkills = initial.services.authorSkills;
            assert.ok(authorSkills);
            authorSkills.commitChange({ kind: "create", skillId: "author-review", skillMarkdown }, "skill-request");
            if (completed)
                assistant.completeRequest({
                    requestId: "skill-request", articleId: article.id, responseKind: "editorial_conversation", content: "Created.",
                });
        } finally {
            initial.database.close();
        }

        try {
            const restarted = createLocalApplication(config);
            try {
                assert.equal(Boolean(restarted.services.authorSkills?.readCurrent("author-review")), completed);
                assert.equal(restarted.services.authorSkills?.listRevisions("author-review").length, completed ? 1 : 0);
                assert.equal(restarted.services.skills.discover().some((skill) => skill.reference.id === "author-review"), completed);
                assert.deepEqual(new SkillChangeJournal(root).list(), []);
            } finally {
                restarted.database.close();
            }
        } finally {
            rmSync(root, { recursive: true, force: true });
        }
    });
}
