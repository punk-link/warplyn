import { ASSISTANT_EVENT, type AssistantEvent } from "@skladno/shared";
import type { ArticleService } from "../../articles/article-service.js";


export async function completePromotedEditTitle(event: AssistantEvent, articleId: string, signal: AbortSignal, articles: Pick<ArticleService, "getArticle" | "completeRevisionPromotion">): Promise<AssistantEvent> {
    if (event.type !== ASSISTANT_EVENT.COMPLETED || !event.result?.articleChanged)
        return event;

    const article = articles.getArticle(articleId);
    if (!article)
        return event;

    const revision = await articles.completeRevisionPromotion(article.currentRevision, signal);
    return { ...event, result: { ...event.result, titleGeneration: revision.titleGeneration } };
}
