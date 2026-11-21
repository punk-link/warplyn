import { isEditorNoteChange, type EditorNote, type EditorNoteChange } from "@skladno/shared";
import type { SqliteDatabase } from "../database.js";
import { throwInvalidArticleRequest } from "./article-repository-errors.js";


export function listEditorNotes(database: SqliteDatabase, articleId: string): EditorNote[] {
    return database.prepare("SELECT id, text, anchor_json, version FROM article_editor_notes WHERE article_id = ? ORDER BY rowid")
        .all(articleId).map((row) => ({
            id: String(row.id), text: String(row.text), anchor: JSON.parse(String(row.anchor_json)), version: Number(row.version),
        }));
}


export function changeEditorNote(database: SqliteDatabase, articleId: string, change: EditorNoteChange): void {
    if (!isEditorNoteChange(change))
        throwInvalidArticleRequest();

    if (change.kind === "remove") {
        const result = database.prepare("DELETE FROM article_editor_notes WHERE article_id = ? AND id = ? AND version = ?")
            .run(articleId, change.id, change.expectedVersion);
        if (!result.changes)
            throwInvalidArticleRequest();

        return;
    }

    const anchor = JSON.stringify(change.anchor);
    const result = change.expectedVersion === 0
        ? database.prepare("INSERT OR IGNORE INTO article_editor_notes (article_id, id, text, anchor_json, version) VALUES (?, ?, ?, ?, 1)")
            .run(articleId, change.id, change.text.trim(), anchor)
        : database.prepare("UPDATE article_editor_notes SET text = ?, anchor_json = ?, version = version + 1 WHERE article_id = ? AND id = ? AND version = ?")
            .run(change.text.trim(), anchor, articleId, change.id, change.expectedVersion);

    if (!result.changes)
        throwInvalidArticleRequest();
}
