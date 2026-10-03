import { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import type { Article, ArticleRevision, ArticleRevisionSummary } from "@skladno/shared";
import type { EditorialWorkspaceClient } from "../../application/client.js";
import { useNotifications } from "../../notifications/NotificationProvider.js";


export function useArticleRevisions(client: EditorialWorkspaceClient, article: Article | undefined, updateRevision: (articleId: string, revision: ArticleRevision) => void, saveDraft: (articleId: string) => Promise<unknown>, discardDraft: (articleId: string) => Promise<void>) {
    const intl = useIntl();
    const { notifyError } = useNotifications();
    const [revisions, setRevisions] = useState<(ArticleRevision | ArticleRevisionSummary)[]>([]);
    const [candidate, setCandidate] = useState<ArticleRevision | ArticleRevisionSummary>();
    const articleId = article?.id;
    const currentRevision = article?.currentRevision;

    useEffect(() => {
        let cancelled = false;
        if (!articleId) {
            setRevisions([]);
            return () => {
                cancelled = true;
            };
        }

        setRevisions((items) => {
            const history = items.filter((revision) => revision.articleId === articleId);
            if (!currentRevision || history.some((revision) => revision.id === currentRevision.id))
                return history;

            return [...history, currentRevision];
        });

        void client.listArticleRevisionSummaries(articleId).then((items) => {
            if (!cancelled)
                setRevisions(items.map((revision) => revision.id === currentRevision?.id ? currentRevision : revision));
        }).catch((error) => {
            if (!cancelled)
                notifyError(error, { fallbackMessage: intl.formatMessage({ id: "workspace.revisionHistoryFailed" }) });
        });

        return () => {
            cancelled = true;
        };
    }, [articleId, currentRevision, client, intl, notifyError]);


    const loadRevision = useCallback(async (revisionId: string) => {
        if (!articleId)
            throw new Error(intl.formatMessage({ id: "workspace.revisionHistoryFailed" }));

        try {
            return await client.getArticleRevision(articleId, revisionId);
        } catch (error) {
            notifyError(error, { fallbackMessage: intl.formatMessage({ id: "workspace.revisionHistoryFailed" }) });
            throw error;
        }
    }, [articleId, client, intl, notifyError]);


    async function restore(mode: "keep" | "save" | "discard") {
        if (!article || !candidate)
            return;

        try {
            if (mode === "save")
                await saveDraft(article.id);

            if (mode === "discard")
                await discardDraft(article.id);

            const revision = await client.restoreRevision(article.id, candidate.id);
            updateRevision(article.id, revision);
            setCandidate(undefined);
        } catch (error) {
            notifyError(error, { fallbackMessage: intl.formatMessage({ id: "workspace.restoreRevisionFailed" }) });
        }
    }


    return { revisions, loadRevision, candidate, setCandidate, restore };
}


export type ArticleRevisionsState = ReturnType<typeof useArticleRevisions>;
