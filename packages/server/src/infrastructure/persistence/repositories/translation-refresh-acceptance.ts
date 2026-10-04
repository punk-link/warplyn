import { APPLICATION_ERROR, HTTP_STATUS, type AcceptProposalInput, type Article } from "@skladno/shared";
import type { SqliteDatabase } from "../database.js";
import { ApplicationServiceError } from "../../../application/errors/application-service-error.js";
import { ArticleDraftConflictError } from "../../../application/articles/article-draft-conflict-error.js";
import { ArticleRevisionConflictError } from "../../../application/articles/article-revision-conflict-error.js";


export function acceptTranslationRefresh(database: SqliteDatabase, current: Article, input: AcceptProposalInput, getArticle: (id: string) => Article | undefined): Record<string, unknown> {
    if (!input.translationRefresh)
        return input.provenance;

    if (current.draft)
        throw new ArticleDraftConflictError(current, current.draft);

    const source = current.sourceArticleId && getArticle(current.sourceArticleId);
    if (!source || typeof input.translationRefresh.editorialArtifactId !== "string")
        throwInvalidRefresh();

    const row = database.prepare("SELECT revision_id, content FROM editorial_artifacts WHERE id = ? AND article_id = ? AND kind IN ('assistant-proposal', 'editorial-proposal') AND rejected_at IS NULL")
        .get(input.translationRefresh.editorialArtifactId, source.id);
    if (!row)
        throwInvalidRefresh();

    if (row.revision_id !== source.currentRevisionId)
        throw new ArticleRevisionConflictError(source);

    const metadata: unknown = JSON.parse(String(row.content));
    validateTranslation(metadata, input.content, current.language);
    database.prepare("UPDATE articles SET source_revision_id = ? WHERE id = ?").run(source.currentRevisionId, current.id);

    return {
        kind: "accepted-translation",
        baseRevisionId: current.currentRevisionId,
        editorialArtifactId: input.translationRefresh.editorialArtifactId,
        sourceArticleId: source.id,
        sourceRevisionId: source.currentRevisionId,
        previousSourceRevisionId: current.sourceRevisionId
    };
}


function validateTranslation(metadata: unknown, content: string, language: string | undefined): void {
    if (!metadata || typeof metadata !== "object" || !("proposal" in metadata) || metadata.proposal !== content || !("translation" in metadata))
        throwInvalidRefresh();

    if ("scope" in metadata && (!metadata.scope || typeof metadata.scope !== "object" || !("kind" in metadata.scope) || metadata.scope.kind !== "article"))
        throwInvalidRefresh();

    const translation = metadata.translation;
    if (!translation || typeof translation !== "object" || !("targetLanguage" in translation) || !("protectedSpans" in translation))
        throwInvalidRefresh();

    const names: Record<string, string> = { en: "English", es: "Spanish", pt: "Portuguese", ru: "Russian", fr: "French", de: "German", it: "Italian" };
    if (!language || translation.targetLanguage !== names[language] || !Array.isArray(translation.protectedSpans))
        throwInvalidRefresh();

    validateProtectedSpans(translation.protectedSpans, content);
}


function validateProtectedSpans(spans: readonly unknown[], content: string): void {
    const counts = new Map<string, number>();
    for (const span of spans) {
        if (typeof span !== "string" || !span)
            throwInvalidRefresh();

        counts.set(span, (counts.get(span) ?? 0) + 1);
    }

    if ([...counts].some(([span, count]) => content.split(span).length - 1 !== count))
        throwInvalidRefresh();
}


function throwInvalidRefresh(): never {
    throw new ApplicationServiceError(APPLICATION_ERROR.INVALID_REQUEST, HTTP_STATUS.BAD_REQUEST);
}
