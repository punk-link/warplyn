import { APPLICATION_ERROR, EDITORIAL_OPERATION, type Article, type StyleProfile } from "@skladno/shared";
import { failure, success, type ApplicationResult } from "../errors/application-result.js";
import type { EditorialEngine } from "./engine/editorial-engine.js";
import type { EditorialEngineResolver } from "./engine/editorial-engine-resolver.js";
import type { EditorialService } from "./editorial-service.js";
import type { EditorialServiceRequest } from "./editorial-request.js";
import { correctionContext, prepareCorrectionSelection } from "./fact-checking/verified-correction-selection.js";
import { TypographyLocalEngine } from "./style/typography-local-engine.js";
import { prepareStyleContext } from "./style/prepare-style-review-profile.js";


type Stores = ConstructorParameters<typeof EditorialService>[0];
type EditorialArticleStore = Stores["articles"];
type EditorialSessionStore = Stores["sessions"];
type EditorialStyleCorpusStore = Stores["styleCorpus"];
type FactChecksStore = Stores["factChecks"];


export interface EditorialStreamContext {
    article: Article;
    engine: EditorialEngine;
    operation: { factCheck: boolean; translation: boolean };
    correction?: { selection: { expectedRevisionId: string; occurrenceIds: string[] }; context: string };
    style?: { profile: StyleProfile; articleRules: string };
    continuation?: {
        previousResponseId?: string;
        scope?: { connectionId: string; provider: import("@skladno/shared").AiProvider; model: string };
    };
}


type EditorialContinuationScope = NonNullable<EditorialEngine["continuationScope"]>;


export function prepareEditorialStream(
    articles: EditorialArticleStore, sessions: EditorialSessionStore, styleCorpus: EditorialStyleCorpusStore,
    factChecks: FactChecksStore, engines: EditorialEngineResolver, sessionContinuationEnabled: boolean,
    request: EditorialServiceRequest,
): ApplicationResult<EditorialStreamContext> {
    const article = articles.getArticle(request.articleContext.articleId);
    if (!article)
        return failure(APPLICATION_ERROR.ARTICLE_NOT_FOUND, "not-found");

    const correction = getVerifiedCorrection(request, article, factChecks);
    if (!correction.ok)
        return correction;

    const factCheck = request.editorial.operation === EDITORIAL_OPERATION.FACT_CHECK;
    const translation = request.editorial.operation === EDITORIAL_OPERATION.TRANSLATION;
    const style = prepareStyleContext(request.editorial, styleCorpus, article, request.styleContext, request.articleContext.targetLanguage);
    if (!style.ok)
        return style;

    const engine: EditorialEngine | undefined = request.editorial.reviewMode
        ? new TypographyLocalEngine()
        : engines.resolve(request.editorial.operation, request.editorial.skillId);

    if (!engine)
        return failure(APPLICATION_ERROR.EDITORIAL_CONFIGURATION_MISSING);

    const continuationScope = engine.continuationScope;
    const previousResponseId = request.editorial.reviewMode
        ? undefined
        : prepareContinuation(sessions, request.articleContext.articleId, !factCheck && !translation, sessionContinuationEnabled, continuationScope);

    return success({
        article,
        engine,
        operation: { factCheck, translation },
        ...correction.value,
        ...(style.value ? { style: style.value } : {}),
        ...(continuationScope || previousResponseId ? {
            continuation: {
                ...(continuationScope ? { scope: continuationScope } : {}),
                ...(previousResponseId ? { previousResponseId } : {}),
            },
        } : {}),
    });
}


function prepareContinuation(
    sessions: EditorialSessionStore,
    articleId: string,
    eligible: boolean,
    enabled: boolean,
    scope: EditorialContinuationScope | undefined,
): string | undefined {
    const session = eligible && enabled ? sessions.getEditorialSession(articleId) : undefined;
    const token = getMatchingContinuationToken(session, scope);
    if (!enabled || (session && !token))
        sessions.removeEditorialSession(articleId);

    return token;
}


function getVerifiedCorrection(
    request: EditorialServiceRequest, article: Article, factChecks: FactChecksStore,
): ApplicationResult<Pick<EditorialStreamContext, "correction">> {
    const selection = request.factChecking?.correctionSelection;
    if (!selection)
        return success({});

    if (request.editorial.operation !== EDITORIAL_OPERATION.FLOW_REVISION || article.currentRevisionId !== selection.expectedRevisionId)
        return failure(APPLICATION_ERROR.FACT_CORRECTION_SELECTION_INVALID, "conflict");

    const findings = prepareCorrectionSelection(
        factChecks.listFactChecks(request.articleContext.articleId), article.currentRevisionId, selection.occurrenceIds,
    );

    return findings.ok ? success({ correction: { selection, context: correctionContext(findings.value) } }) : findings;
}


function getMatchingContinuationToken(
    session: import("@skladno/shared").EditorialSession | undefined,
    scope: EditorialContinuationScope | undefined,
): string | undefined {
    if (!session?.continuationToken || !scope)
        return undefined;

    if (session.connectionId !== scope.connectionId || session.provider !== scope.provider || session.model !== scope.model)
        return undefined;

    return session.continuationToken;
}
