import { useCallback, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { ArticleDraftConflictError, ArticleRevisionConflictError, summarizeArticle, type Article, type ArticleSummary, type ArticleRevision } from "@skladno/shared";
import type { EditorialWorkspaceClient } from "../../application/client.js";
import { getDesktopTelemetryClient } from "../../application/desktop-client.js";
import { useNotifications } from "../../notifications/NotificationProvider.js";
import { createDraftCheckpointTelemetry } from "../drafts/draft-checkpoint-telemetry.js";
import { getDraftPresentationState, hasUncommittedDraftChanges, hydrateDraftLifecycle, type DraftPresentationState } from "../drafts/draft-lifecycle.js";
import { useDraftLifecycle } from "../drafts/useDraftLifecycle.js";
import { cacheArticleUpdate } from "./article-body-cache.js";
import { createArticleWorkspaceActions } from "./article-workspace-actions.js";
import { getArticleContentForWorkspace, sortArticlesByActivity, withoutDraft, withPromotedRevision } from "./article-workspace-articles.js";
import { notifyTitleGeneration } from "./article-title-notification.js";

export { getArticleContentForWorkspace, sortArticlesByActivity } from "./article-workspace-articles.js";


export function useArticleWorkspace(client: EditorialWorkspaceClient, preferredSelectedArticleId: string | undefined, setPersistedSelectedArticleId: (articleId: string | undefined) => void, interfaceLocale: string) {
    const intl = useIntl();
    const { notify, notifyError } = useNotifications();
    const [articles, setArticles] = useState<ArticleSummary[]>([]);
    const [selectedArticleId, setSelectedArticleId] = useState<string>();
    const draftLifecycle = useDraftLifecycle();
    const replaceDraftLifecycle = draftLifecycle.replace;
    const [comparisonArticleId, setComparisonArticleId] = useState<string>();
    const [state, setState] = useState<"loading" | "ready" | "error">("loading");
    const [message, setMessage] = useState(() => intl.formatMessage({ id: "workspace.loadingArticles" }));
    const articlesRef = useRef<(Article | ArticleSummary)[]>([]);
    const loadedArticles = useRef(new Map<string, Article>());
    const loadingArticles = useRef(new Map<string, Promise<Article>>());
    const queues = useRef(new Map<string, Promise<void>>());
    const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
    const checkpointTelemetry = useRef(createDraftCheckpointTelemetry(getDesktopTelemetryClient()));
    const checkpointRef = useRef<(articleId: string) => Promise<void>>(() => Promise.resolve());
    const preferredSelectedArticleIdRef = useRef(preferredSelectedArticleId);
    const setPersistedSelectedArticleIdRef = useRef(setPersistedSelectedArticleId);

    preferredSelectedArticleIdRef.current = preferredSelectedArticleId;
    setPersistedSelectedArticleIdRef.current = setPersistedSelectedArticleId;


    function replaceArticles(update: (items: (Article | ArticleSummary)[]) => (Article | ArticleSummary)[]) {
        const next = sortArticlesByActivity(update(articlesRef.current)).map((article) => cacheArticleUpdate(loadedArticles.current, article));
        const ids = new Set(next.map((article) => article.id));
        for (const id of loadedArticles.current.keys()) {
            if (!ids.has(id))
                loadedArticles.current.delete(id);
        }

        articlesRef.current = next;
        setArticles(next);
    }


    const loadArticle = useCallback(async (articleId: string): Promise<Article> => {
        const cached = loadedArticles.current.get(articleId);
        if (cached) {
            if (!draftLifecycle.sessionsRef.current[articleId])
                replaceDraftLifecycle({ ...draftLifecycle.sessionsRef.current, [articleId]: hydrateDraftLifecycle(cached) });

            return cached;
        }

        let pending = loadingArticles.current.get(articleId);
        if (!pending) {
            pending = client.getArticle(articleId);
            loadingArticles.current.set(articleId, pending);
        }

        let article: Article;
        try {
            article = await pending;
        } finally {
            loadingArticles.current.delete(articleId);
        }

        loadedArticles.current.set(articleId, article);
        if (!draftLifecycle.sessionsRef.current[articleId])
            replaceDraftLifecycle({ ...draftLifecycle.sessionsRef.current, [articleId]: hydrateDraftLifecycle(article) });

        const next = articlesRef.current.map((item) => item.id === articleId ? summarizeArticle(article) : item);
        articlesRef.current = next;
        setArticles(next);

        return article;
    }, [client, replaceDraftLifecycle, draftLifecycle.sessionsRef]);


    useEffect(() => {
        let cancelled = false;
        client.listArticleSummaries().then(async (loaded) => {
            if (cancelled)
                return;

            const sorted = sortArticlesByActivity(loaded.map(summarizeArticle));
            const preferred = preferredSelectedArticleIdRef.current;
            const selected = sorted.some((article) => article.id === preferred) ? preferred : sorted[0]?.id;
            articlesRef.current = sorted;
            setArticles(sorted);
            if (selected)
                await loadArticle(selected);

            const sourceId = sorted.find((article) => article.id === selected)?.sourceArticleId;
            if (sourceId)
                await loadArticle(sourceId);

            if (cancelled)
                return;

            setSelectedArticleId(selected);
            setPersistedSelectedArticleIdRef.current(selected);
            setState("ready");
        }).catch(() => {
            if (cancelled)
                return;

            setState("error");
            setMessage(intl.formatMessage({ id: "workspace.serviceUnavailable" }));
        });
        return () => {
            cancelled = true;
        };
    }, [client, intl, loadArticle]);

    useEffect(() => {
        if (!selectedArticleId || !articlesRef.current.some((article) => article.id === selectedArticleId))
            return;

        let cancelled = false;
        void loadArticle(selectedArticleId).then(async (article) => {
            if (article.sourceArticleId)
                await loadArticle(article.sourceArticleId);
        }).catch((error) => {
            if (cancelled)
                return;

            setState("error");
            setMessage(intl.formatMessage({ id: "workspace.serviceUnavailable" }));
            notifyError(error, { fallbackMessage: intl.formatMessage({ id: "workspace.serviceUnavailable" }) });
        });

        return () => {
            cancelled = true;
        };
    }, [selectedArticleId, loadArticle, intl, notifyError]);


    function recordConflict(articleId: string, error: ArticleDraftConflictError | ArticleRevisionConflictError, localContent: string) {
        const persistedDraft = error instanceof ArticleDraftConflictError ? error.draft : error.article.draft;
        draftLifecycle.send({ articleId, event: { type: "conflicted", conflict: { article: error.article, draft: persistedDraft, localContent } } });
    }


    async function persistCheckpoint<T>(operation: () => Promise<T>): Promise<T> {
        const generation = await checkpointTelemetry.current.begin();
        const startedAt = performance.now();
        try {
            const result = await operation();
            checkpointTelemetry.current.record(generation, true, performance.now() - startedAt);
            return result;
        } catch (error) {
            checkpointTelemetry.current.record(generation, false, performance.now() - startedAt);
            throw error;
        }
    }


    function checkpoint(articleId: string, content = draftLifecycle.sessionsRef.current[articleId]?.content ?? ""): Promise<void> {
        clearTimeout(timers.current.get(articleId));
        const session = draftLifecycle.sessionsRef.current[articleId];
        if (!session)
            return Promise.resolve();

        const generation = session.generation;
        const preceding = queues.current.get(articleId) ?? Promise.resolve();
        const task = preceding.then(async () => {
            const current = loadedArticles.current.get(articleId);
            const latest = draftLifecycle.sessionsRef.current[articleId];
            if (!current || !latest)
                return;

            draftLifecycle.send({ articleId, event: { type: "checkpoint-started", generation } });
            const expectedDraftVersion = latest.draftVersion;
            if (content === current.currentRevision.content) {
                if (expectedDraftVersion !== undefined) {
                    await persistCheckpoint(() => client.discardArticleDraft(articleId, expectedDraftVersion));
                    replaceArticles((items) => items.map((article) => article.id === articleId ? withoutDraft(article) : article));
                }

                draftLifecycle.send({ articleId, event: { type: "checkpoint-discarded", generation } });
                return;
            }

            const savedDraft = await persistCheckpoint(() => client.saveArticleDraft(articleId, { content, baseRevisionId: latest.baseRevisionId, ...(expectedDraftVersion === undefined ? {} : { expectedDraftVersion }) }));
            replaceArticles((items) => items.map((article) => article.id === articleId ? { ...article, draft: savedDraft } : article));
            draftLifecycle.send({ articleId, event: { type: "checkpointed", generation, draftVersion: savedDraft.version } });
        }).catch((error: unknown) => {
            if (error instanceof ArticleDraftConflictError || error instanceof ArticleRevisionConflictError)
                recordConflict(articleId, error, draftLifecycle.sessionsRef.current[articleId]?.content ?? content);
            else
                draftLifecycle.send({ articleId, event: { type: "failed", operation: "checkpoint", generation } });

            throw error;
        });

        queues.current.set(articleId, task.then(() => undefined, () => undefined));
        return task;
    }


    function scheduleCheckpoint(articleId: string, content: string) {
        clearTimeout(timers.current.get(articleId));
        timers.current.set(articleId, setTimeout(() => void checkpoint(articleId, content).catch(() => undefined), 750));
    }


    checkpointRef.current = checkpoint;
    useEffect(() => {
        function saveWhenHidden() {
            if (document.visibilityState === "hidden" && selectedArticleId)
                void checkpointRef.current(selectedArticleId).catch(() => undefined);
        }


        document.addEventListener("visibilitychange", saveWhenHidden);
        return () => document.removeEventListener("visibilitychange", saveWhenHidden);
    }, [selectedArticleId]);
    useEffect(() => () => {
        timers.current.forEach(clearTimeout);
        checkpointTelemetry.current.dispose();
    }, []);


    function updateRevision(articleId: string, revision: ArticleRevision) {
        draftLifecycle.send({ articleId, event: { type: "promoted", revisionId: revision.id, content: revision.content } });
        replaceArticles((items) => items.map((article) => article.id === articleId ? withPromotedRevision(article, revision) : article));
        notifyTitleGeneration(revision.titleGeneration, intl, notify);
    }


    function applyPersistedArticle(article: Article) {
        draftLifecycle.replace({ ...draftLifecycle.sessionsRef.current, [article.id]: hydrateDraftLifecycle(article) });
        replaceArticles((items) => items.map((item) => item.id === article.id ? article : item));
    }


    const actions = createArticleWorkspaceActions({
        client, articlesRef, draftLifecycle, timers, checkpoint, replaceArticles, selectedArticleId,
        setSelectedArticleId, setPersistedSelectedArticleId, comparisonArticleId, setComparisonArticleId,
        recordConflict, notifyError, saveFailedMessage: intl.formatMessage({ id: "workspace.saveFailed" }),
    });


    async function save(articleId = selectedArticleId): Promise<ArticleRevision | undefined> {
        if (!articleId)
            return undefined;

        const session = draftLifecycle.sessionsRef.current[articleId];
        const current = loadedArticles.current.get(articleId);
        if (!current || !session)
            return undefined;

        if (current.currentRevision.content === session.content && session.draftVersion === undefined)
            return current.currentRevision;

        try {
            const content = session.content;
            await checkpoint(articleId, content);
            const checkpointed = draftLifecycle.sessionsRef.current[articleId];
            if (!checkpointed || checkpointed.content !== content || checkpointed.draftVersion === undefined)
                return undefined;

            draftLifecycle.send({ articleId, event: { type: "promotion-started" } });
            const revision = await client.saveArticleRevision(articleId, { content, baseRevisionId: checkpointed.baseRevisionId, expectedDraftVersion: checkpointed.draftVersion, interfaceLocale });
            updateRevision(articleId, revision);
            return revision;
        } catch (error) {
            reportSaveFailure(articleId, error);
            throw error;
        }
    }


    function reportSaveFailure(articleId: string, error: unknown): void {
        if (error instanceof ArticleDraftConflictError || error instanceof ArticleRevisionConflictError)
            return;

        notifyError(error, { fallbackMessage: intl.formatMessage({ id: "workspace.saveFailed" }) });
        const session = draftLifecycle.sessionsRef.current[articleId];
        if (session)
            draftLifecycle.send({ articleId, event: { type: "failed", operation: "promotion", generation: session.generation } });
    }


    async function discardDraft(articleId = selectedArticleId) {
        if (!articleId)
            return;

        const expectedDraftVersion = draftLifecycle.sessionsRef.current[articleId]?.draftVersion;
        if (expectedDraftVersion !== undefined)
            await client.discardArticleDraft(articleId, expectedDraftVersion);

        const current = loadedArticles.current.get(articleId);
        if (!current)
            return;

        draftLifecycle.send({ articleId, event: { type: "use-current-revision", content: current.currentRevision.content, revisionId: current.currentRevisionId } });
        replaceArticles((items) => items.map((article) => article.id === articleId ? withoutDraft(article) : article));
    }


    const selectedArticle = selectedArticleId && articles.some((article) => article.id === selectedArticleId) ? loadedArticles.current.get(selectedArticleId) : undefined;
    const selectedDraft = selectedArticleId ? draftLifecycle.sessions[selectedArticleId] : undefined;

    return {
        articles,
        selectedArticle,
        selectedArticleId,
        sourceArticle: selectedArticle?.sourceArticleId ? loadedArticles.current.get(selectedArticle.sourceArticleId) : undefined,
        selectArticle: (articleId: string) => {
            if (selectedArticleId && selectedArticleId !== articleId)
                void checkpoint(selectedArticleId).catch(() => undefined);

            setState("ready");
            setSelectedArticleId(articleId);
            setPersistedSelectedArticleId(articleId);
        },
        content: selectedDraft?.content ?? "",
        getArticleContent: async (article: ArticleSummary) => draftLifecycle.sessionsRef.current[article.id]?.content ?? getArticleContentForWorkspace(await loadArticle(article.id)),
        setContent: (value: string) => {
            if (!selectedArticleId)
                return;

            draftLifecycle.send({ articleId: selectedArticleId, event: { type: "edit", content: value } });
            scheduleCheckpoint(selectedArticleId, value);
        },
        state: state === "ready" && selectedArticleId && !selectedArticle ? "loading" : state,
        message,
        saveState: selectedDraft ? getDraftPresentationState(selectedDraft) : "saved" as DraftPresentationState,
        save, retry: () => selectedArticleId ? checkpoint(selectedArticleId) : Promise.resolve(), flushSelected: () => selectedArticleId ? checkpoint(selectedArticleId) : Promise.resolve(), discardDraft,
        hasUncommittedChanges: Boolean(selectedArticle && selectedDraft && hasUncommittedDraftChanges(selectedDraft, selectedArticle.currentRevision.content)),
        conflict: selectedDraft?.conflict, comparisonArticleId,
        openComparison: () => selectedArticleId && setComparisonArticleId(selectedArticleId), closeComparison: () => setComparisonArticleId(undefined),
        ...actions, updateRevision, applyPersistedArticle,
    };
}


export type ArticleWorkspaceState = ReturnType<typeof useArticleWorkspace>;
