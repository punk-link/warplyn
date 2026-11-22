import { ASSISTANT_EVENT, defaultInterfaceLocale, type AssistantEvent } from "@skladno/shared";
import type { ArticleService } from "../../articles/article-service.js";
import type { PreparedAssistantRequest } from "../requests/prepared-assistant-request.js";


export function completePromotedEdit(
    event: AssistantEvent, request: PreparedAssistantRequest,
    articles: Pick<ArticleService, "getArticle" | "completeRevisionPromotion" | "describeRevision">,
): AssistantEvent {
    if (event.type !== ASSISTANT_EVENT.COMPLETED || !event.result?.articleChanged)
        return event;

    const article = articles.getArticle(request.articleId);
    if (!article || article.currentRevision.provenance.requestId !== request.requestId)
        return event;

    const signal = new AbortController().signal;
    articles.describeRevision(article.currentRevision, request.article.content, request.interfaceLocale ?? defaultInterfaceLocale, signal);
    const revision = articles.completeRevisionPromotion(article.currentRevision, signal);
    return { ...event, result: { ...event.result, titleGeneration: revision.titleGeneration } };
}
