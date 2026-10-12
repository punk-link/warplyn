import { APPLICATION_ERROR, HTTP_METHOD, HTTP_STATUS, articleSummariesPath, articlesPath } from "@skladno/shared";
import type { AssistantService } from "../../application/assistant/assistant-service.js";
import type { ArticleService } from "../../application/articles/article-service.js";
import { ApplicationServiceError } from "../errors/application-error.js";
import type { Router } from "../router.js";
import { writeJson } from "../transport/json.js";


export function registerArticleHistoryReadRoutes(router: Router, articles: ArticleService, assistant: AssistantService): void {
    const assistantMessageHistoryPathPattern = new RegExp(`^${articlesPath}/([^/]+)/assistant/messages/history$`);
    router.register(HTTP_METHOD.GET, assistantMessageHistoryPathPattern, (_request, response, parameters) => writeJson(response, HTTP_STATUS.OK, assistant.listMessageHistory(parameters[0])));
    const articlePath = new RegExp(`^${articlesPath}/([^/]+)$`);
    const revisionsPath = `${articlesPath}/([^/]+)/revisions`;
    const revisionSummariesPathPattern = new RegExp(`^${revisionsPath}/summaries$`);
    const revisionPathPattern = new RegExp(`^${revisionsPath}/([^/]+)$`);
    router.register(HTTP_METHOD.GET, articleSummariesPath, (_request, response) => writeJson(response, HTTP_STATUS.OK, articles.listArticleSummaries()));
    router.register(HTTP_METHOD.GET, articlePath, (_request, response, parameters) => {
        const article = articles.getArticle(parameters[0]);
        if (!article)
            throw new ApplicationServiceError(APPLICATION_ERROR.ARTICLE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);

        writeJson(response, HTTP_STATUS.OK, article);
    });
    router.register(HTTP_METHOD.GET, revisionSummariesPathPattern, (_request, response, parameters) => writeJson(response, HTTP_STATUS.OK, articles.listRevisionSummaries(parameters[0])));
    router.register(HTTP_METHOD.GET, revisionPathPattern, (_request, response, parameters) => {
        const revision = articles.getRevision(parameters[0], parameters[1]);
        if (!revision)
            throw new ApplicationServiceError(APPLICATION_ERROR.REVISION_NOT_FOUND, HTTP_STATUS.NOT_FOUND);

        writeJson(response, HTTP_STATUS.OK, revision);
    });
}
