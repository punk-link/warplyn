import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createEditorNoteAnchor, summarizeArticle } from "@skladno/shared";
import { openDatabase } from "./database.js";
import { ArticlesRepository } from "./repositories/articles-repository.js";

// Product scenarios: workspace.editor.notes-recovery
test("editor notes reopen independently of Article prose and immutable history, with optimistic updates", () => {
    const directory = mkdtempSync(join(tmpdir(), "warplyn-notes-"));
    const path = join(directory, "notes.sqlite");
    let database = openDatabase(path);
    try {
        let articles = new ArticlesRepository(database);
        const article = articles.createArticle({ title: "Synthetic", content: "before selected after" });
        const change = { kind: "save" as const, id: "note", expectedVersion: 0, text: "Check the verb.",
            anchor: createEditorNoteAnchor(article.currentRevision.content, 7, 15, "selected") };
        const saved = articles.updateArticle(article.id, { editorNoteChange: change });
        assert.equal(saved.editorNotes?.[0].text, change.text);
        assert.equal(saved.currentRevision.content, article.currentRevision.content);
        assert.equal(articles.listRevisions(article.id).length, 1);
        assert.equal("editorNotes" in summarizeArticle(saved), false);
        assert.equal("editorNotes" in articles.listArticleSummaries()[0], false);
        assert.throws(() => articles.updateArticle(article.id, { editorNoteChange: change }));
        assert.throws(() => articles.updateArticle(article.id, { editorNoteChange: { ...change, text: " " } }));
        database.close();
        database = openDatabase(path);
        articles = new ArticlesRepository(database);
        assert.deepEqual(articles.getArticle(article.id)?.editorNotes, saved.editorNotes);
        const updated = articles.updateArticle(article.id, { editorNoteChange: { ...change, expectedVersion: 1, text: "Updated guidance." } });
        assert.equal(updated.editorNotes?.[0].version, 2);
        assert.throws(() => articles.updateArticle(article.id, { editorNoteChange: { kind: "remove", id: "note", expectedVersion: 1 } }));
        articles.updateArticle(article.id, { editorNoteChange: { kind: "remove", id: "note", expectedVersion: 2 } });
        assert.deepEqual(articles.getArticle(article.id)?.editorNotes, []);
        articles.updateArticle(article.id, { editorNoteChange: change });
        articles.deleteArticle(article.id);
        assert.equal(database.prepare("SELECT COUNT(*) total FROM article_editor_notes").get()?.total, 0);
    } finally {
        database.close();
        rmSync(directory, { recursive: true, force: true });
    }
});
