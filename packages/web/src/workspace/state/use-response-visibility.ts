import { useContext, useEffect, useRef } from "react";
import type { AssistantMessage } from "@skladno/shared";
import { ArticleResponseSeenContext } from "./article-response-seen-context.js";


export function useResponseVisibility(message: AssistantMessage | undefined) {
    const ref = useRef<HTMLElement>(null);
    const markSeen = useContext(ArticleResponseSeenContext);
    const { articleId, createdAt, id, kind, role, status } = message ?? {};
    useEffect(() => {
        const element = ref.current;
        if (!element || !articleId || !createdAt || !id || role !== "assistant" || kind !== "response" || status !== "completed")
            return;

        if (typeof IntersectionObserver === "undefined")
            return;

        let visible = false;
        const record = () => {
            if (visible && document.visibilityState === "visible")
                markSeen(articleId, `${createdAt}:${id}`);
        };
        const observer = new IntersectionObserver(([entry]) => {
            visible = Boolean(entry?.isIntersecting && entry.intersectionRatio > 0);
            record();
        });

        observer.observe(element);
        document.addEventListener("visibilitychange", record);

        return () => {
            observer.disconnect();
            document.removeEventListener("visibilitychange", record);
        };
    }, [articleId, createdAt, id, kind, role, status, markSeen]);

    return ref;
}
