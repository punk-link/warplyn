import type { AssistantMessageHistory } from "@skladno/shared";
import type { ConversationHistory } from "../../../application/assistant/requests/conversation-history.js";
import type { SqliteDatabase } from "../database.js";
import { getProposalAcceptances, mapAssistantMessageFromRow } from "./assistant-record-mappers.js";
import type { Row } from "./repository-utils.js";


export function listAssistantMessageHistory(database: SqliteDatabase, articleId: string): AssistantMessageHistory {
    const revisions = database.prepare(`SELECT r.id, r.content FROM article_revisions r
        WHERE r.article_id = ? AND r.id IN (SELECT base_revision_id FROM assistant_requests WHERE article_id = ?)`).all(articleId, articleId) as Row[];
    const revisionContents = Object.fromEntries(revisions.map((row) => [String(row.id), String(row.content)]));
    const rows = database.prepare(`SELECT m.*, q.scope_json AS request_scope_json,
        q.skill_source AS request_skill_source, q.base_revision_id AS request_base_revision_id,
        q.target_language AS request_target_language,
        a.content AS artifact_content FROM assistant_messages m
        LEFT JOIN assistant_requests q ON q.id = m.request_id
        LEFT JOIN editorial_artifacts a ON a.id = m.editorial_artifact_id
        WHERE m.article_id = ? ORDER BY m.created_at, m.id`).all(articleId) as Row[];
    const acceptances = getProposalAcceptances(database, articleId);
    const messages = rows.map((row) => {
        const message = mapAssistantMessageFromRow({ ...row, request_revision_content: revisionContents[String(row.request_base_revision_id)] });
        const { baseRevisionContent: _content, ...summary } = message;
        void _content;
        const acceptance = message.editorialArtifactId ? acceptances.get(message.editorialArtifactId) : undefined;
        return acceptance ? { ...summary, proposalAcceptance: acceptance } : summary;
    });

    return { messages, revisionContents };
}


export function listConversationHistory(database: SqliteDatabase, articleId: string, limit?: number): ConversationHistory {
    const select = `SELECT role, content FROM assistant_messages WHERE article_id = ?
        AND (role = 'author' OR (role = 'assistant' AND kind = 'response'))
        AND content IS NOT NULL AND content <> ''`;
    let rows: Row[];
    if (limit === undefined || limit === 0) {
        rows = database.prepare(`${select} ORDER BY created_at, id`).all(articleId) as Row[];
    } else {
        if (!Number.isSafeInteger(limit) || limit < 0)
            throw new Error("Invalid conversation history limit.");

        rows = (database.prepare(`${select} ORDER BY created_at DESC, id DESC LIMIT ?`).all(articleId, limit) as Row[]).reverse();
    }

    return rows.map((row) => ({ role: row.role === "author" ? "author" : "assistant", content: String(row.content) }));
}
