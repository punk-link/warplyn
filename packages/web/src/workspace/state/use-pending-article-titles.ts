import { useEffect, useRef, type MutableRefObject } from "react";
import { useIntl } from "react-intl";
import type { Article, ArticleSummary } from "@skladno/shared";
import type { EditorialWorkspaceClient } from "../../application/client.js";
import { useNotifications } from "../../notifications/NotificationProvider.js";
import { notifyTitleGeneration } from "./article-title-notification.js";


export function usePendingArticleTitles(
    client: EditorialWorkspaceClient,
    articles: ArticleSummary[],
    cache: MutableRefObject<Map<string, Article>>,
    replace: (update: (items: (Article | ArticleSummary)[]) => (Article | ArticleSummary)[]) => void,
) {
    const intl = useIntl();
    const { notify } = useNotifications();
    const apply = useRef(replace);
    apply.current = replace;

    useEffect(() => {
        const pending = articles.filter((article) => article.titleGeneration?.status === "pending");
        if (!pending.length)
            return;

        let cancelled = false;
        let fetching = false;
        const timer = setInterval(() => {
            if (fetching)
                return;

            fetching = true;
            void client.listArticleSummaries().then((summaries) => {
                for (const captured of pending) {
                    const current = cache.current.get(captured.id) ?? articles.find((article) => article.id === captured.id);
                    const updated = summaries.find((article) => article.id === captured.id);
                    if (cancelled || !current || !updated || current.currentRevisionId !== captured.currentRevisionId || current.title !== captured.title ||
                        updated.currentRevisionId !== captured.currentRevisionId)
                        continue;

                    apply.current((items) => items.map((item) => item.id === current.id ? withGeneratedTitle(current, updated) : item));
                    notifyTitleGeneration(updated.titleGeneration, intl, notify);
                }
            }).catch(() => undefined).finally(() => {
                fetching = false;
            });
        }, 500);

        return () => {
            cancelled = true;
            clearInterval(timer);
        };
    }, [articles, cache, client, intl, notify]);
}


function withGeneratedTitle(current: Article | ArticleSummary, updated: ArticleSummary): Article | ArticleSummary {
    const article = { ...current, title: updated.title, titleGeneration: updated.titleGeneration };
    if ("currentRevision" in current)
        return { ...article, currentRevision: { ...current.currentRevision, titleGeneration: updated.titleGeneration } };

    return article;
}
