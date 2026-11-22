import { useCallback, useEffect, useState } from "react";
import type { ArticleSummary } from "@skladno/shared";
import type { EditorialWorkspaceClient } from "../../application/client.js";
import type { AssistantRequestStore } from "./assistant-request-state.js";
import type { ArticleAttention } from "./article-attention.js";


const storageKey = "warplyn-article-responses-seen";


function loadSeen(key = storageKey): Record<string, string> {
    try {
        const value: unknown = JSON.parse(localStorage.getItem(key) ?? "{}");
        if (!value || typeof value !== "object" || Array.isArray(value))
            return {};

        return Object.fromEntries(Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === "string"));
    } catch {
        return {};
    }
}


export function useArticleAttention(client: EditorialWorkspaceClient, articles: ArticleSummary[],
    requests: Pick<AssistantRequestStore, "stateByArticle" | "messagesByArticle">) {
    const [summaries, setSummaries] = useState<ArticleSummary[]>([]);
    const [seen, setSeen] = useState(loadSeen);
    const [dismissed, setDismissed] = useState(() => loadSeen("warplyn-article-attention-dismissed"));
    useEffect(() => {
        let cancelled = false;
        let version = 0;
        const refresh = async () => {
            const requestVersion = ++version;
            try {
                const loaded = await client.listArticleSummaries();
                if (!cancelled && version === requestVersion)
                    setSummaries(loaded);
            } catch {
                return;
            }
        };
        void refresh();
        const interval = window.setInterval(() => void refresh(), 5_000);
        window.addEventListener("focus", refresh);
        return () => {
            cancelled = true;
            window.clearInterval(interval);
            window.removeEventListener("focus", refresh);
        };
    }, [client, articles, requests.stateByArticle, requests.messagesByArticle]);

    const markSeen = useCallback((articleId: string, response: string) => {
        setSeen((current) => {
            if ((current[articleId] ?? "") >= response)
                return current;

            const next = { ...current, [articleId]: response };
            try {
                localStorage.setItem(storageKey, JSON.stringify(next));
            } catch {
                return next;
            }

            return next;
        });
    }, []);
    const byArticle: Record<string, ArticleAttention> = {};
    const summariesById = new Map(summaries.map((article) => [article.id, article]));
    const signatures: Record<string, string> = {};
    for (const listed of articles) {
        const article = summariesById.get(listed.id) ?? listed;
        const attention = article.attention;
        const failed = requests.stateByArticle[article.id] === "error" || Boolean(attention?.failed);
        signatures[article.id] = JSON.stringify([
            article.currentRevisionId, Boolean(attention?.review), Boolean(attention?.translation), Boolean(attention?.findings),
            failed, attention?.latestResponse,
        ]);
        const cleared = dismissed[article.id] === signatures[article.id];
        byArticle[article.id] = {
            running: requests.stateByArticle[article.id] === "streaming",
            failed: !cleared && failed,
            review: !cleared && Boolean(attention?.review), translation: !cleared && Boolean(attention?.translation),
            findings: !cleared && Boolean(attention?.findings),
            unread: !cleared && Boolean(attention?.latestResponse && attention.latestResponse > (seen[article.id] ?? "")),
        };
    }


    function clearNotification(articleId: string) {
        const ids = articles.filter((article) => article.id === articleId || article.sourceArticleId === articleId).map((article) => article.id);
        setDismissed((current) => {
            const next = { ...current, ...Object.fromEntries(ids.map((id) => [id, signatures[id]!])) };
            try {
                localStorage.setItem("warplyn-article-attention-dismissed", JSON.stringify(next));
            } catch {
                return next;
            }

            return next;
        });
    }


    return { byArticle, markSeen, clearNotification };
}
