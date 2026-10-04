import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import { createTestPersistence } from "../../test-support/test-persistence.js";
import { openDatabase } from "./database.js";
import { migrations } from "./migrations.js";


function readAuthorRecords(database: DatabaseSync) {
    return ["articles", "article_revisions", "assistant_requests", "assistant_messages"]
        .map((table) => database.prepare(`SELECT * FROM ${table} ORDER BY id`).all());
}


function assertRequestQueriesUseIndex(database: DatabaseSync): void {
    const queries = [
        "SELECT content, skill_offset FROM assistant_messages WHERE request_id = ? AND role = 'author' ORDER BY created_at, id LIMIT 1",
        "UPDATE assistant_messages SET content = 'updated', updated_at = 'now' WHERE request_id = ? AND role = 'author'",
        "SELECT 1 FROM assistant_messages WHERE request_id = ? AND kind = 'status'",
        "DELETE FROM assistant_messages WHERE request_id = ?",
    ];
    for (const query of queries) {
        const plan = database.prepare(`EXPLAIN QUERY PLAN ${query}`).all("legacy-request").map((row) => String(row.detail)).join("\n");
        assert.match(plan, /USING (?:COVERING )?INDEX assistant_messages_request_role_created/, query);
        assert.doesNotMatch(plan, /SCAN assistant_messages|USE TEMP B-TREE/, query);
    }
}


test("upgrading schema 22 indexes request messages without changing Author records", () => {
    const directory = mkdtempSync(join(tmpdir(), "warplyn-assistant-index-"));
    const path = join(directory, "skladno.sqlite");
    let database = new DatabaseSync(path);
    try {
        database.exec("PRAGMA foreign_keys = ON; CREATE TABLE schema_migrations (version INTEGER PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT NOT NULL)");
        for (const migration of migrations.filter((item) => item.version <= 22)) {
            database.exec(migration.sql);
            database.prepare("INSERT INTO schema_migrations VALUES (?, ?, ?)").run(migration.version, migration.name, "2026-10-03");
        }

        const persistence = createTestPersistence(database);
        const article = persistence.articleService.createArticle({ title: "Migration fixture", content: "Retained Article content." });
        persistence.assistant.createRequest({ id: "legacy-request", articleId: article.id, authorMessage: "Review this paragraph.", scope: { kind: "article", baseRevisionId: article.currentRevisionId } });
        persistence.assistant.completeRequest({ requestId: "legacy-request", articleId: article.id, responseKind: "proposal_prepared", content: "Retained reply." });
        const before = readAuthorRecords(database);
        database.close();

        database = openDatabase(path);
        assert.deepEqual(readAuthorRecords(database), before);
        assert.equal(createTestPersistence(database).assistant.getRequest("legacy-request")?.authorMessage, "Review this paragraph.");
        assert.equal(database.prepare("SELECT COUNT(*) AS count FROM schema_migrations WHERE version = 23").get()?.count, 1);
        assertRequestQueriesUseIndex(database);
        database.close();

        database = openDatabase(path);
        assert.deepEqual(readAuthorRecords(database), before);
        assertRequestQueriesUseIndex(database);
    } finally {
        database.close();
        rmSync(directory, { recursive: true, force: true });
    }
});
