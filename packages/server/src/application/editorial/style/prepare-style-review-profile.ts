import { APPLICATION_ERROR, EDITORIAL_OPERATION, HTTP_STATUS, normalizeWritingLanguage, type StyleCorpus, type StyleProfile } from "@skladno/shared";

import { ApplicationServiceError } from "../../errors/application-service-error.js";
import type { EditorialServiceRequest } from "../editorial-request.js";
import { captureStyleTypography } from "./capture-style-typography.js";


export function prepareStyleReviewProfile(
    editorial: EditorialServiceRequest["editorial"],
    styleCorpus: {
        getStyleCorpus(): Pick<StyleCorpus, "profile" | "status">;
        getArticleTypography?(articleId: string): import("@skladno/shared").ArticleTypography | undefined;
    },
    article?: { id: string; language?: string },
): StyleProfile | undefined {
    const ready = getReadyStyleProfile(editorial.operation, styleCorpus);
    const profile = ready && article ? captureStyleTypography(ready, article.language, styleCorpus.getArticleTypography?.(article.id)) : ready;
    if (editorial.reviewMode && editorial.operation !== EDITORIAL_OPERATION.STYLE_REVIEW)
        throw new ApplicationServiceError(APPLICATION_ERROR.INVALID_REQUEST, HTTP_STATUS.BAD_REQUEST);

    if (editorial.reviewMode && !profile?.rules.typography.some((rule) => rule.definition.kind !== "contextual"))
        throw new ApplicationServiceError(APPLICATION_ERROR.TYPOGRAPHY_RULES_REQUIRED, HTTP_STATUS.BAD_REQUEST);

    return profile;
}


function getReadyStyleProfile(
    operation: EditorialServiceRequest["editorial"]["operation"],
    styleCorpus: { getStyleCorpus(): Pick<StyleCorpus, "profile" | "status"> },
): StyleProfile | undefined {
    if (operation !== EDITORIAL_OPERATION.STYLE_REVIEW)
        return undefined;

    const corpus = styleCorpus.getStyleCorpus();
    if (corpus.status !== "ready" || !corpus.profile)
        throw new ApplicationServiceError(APPLICATION_ERROR.STYLE_CORPUS_REQUIRED, HTTP_STATUS.BAD_REQUEST);

    return corpus.profile;
}


export function prepareStyleReviewContext(
    editorial: EditorialServiceRequest["editorial"],
    store: Parameters<typeof prepareStyleReviewProfile>[1] & { getArticleStyleRules(id: string): string },
    article: { id: string; language?: string },
    captured?: EditorialServiceRequest["styleContext"],
    targetLanguage?: string,
): EditorialServiceRequest["styleContext"] {
    if (editorial.operation === EDITORIAL_OPERATION.TRANSLATION) {
        const profile = store.getStyleCorpus().profile;
        if (!profile)
            return undefined;

        return { profile: captureStyleTypography(profile, normalizeWritingLanguage(targetLanguage)), articleRules: "" };
    }

    if (editorial.operation !== EDITORIAL_OPERATION.STYLE_REVIEW)
        return undefined;

    if (captured)
        return captured;

    const profile = prepareStyleReviewProfile(editorial, store, article);
    return profile ? { profile, articleRules: store.getArticleStyleRules(article.id) } : undefined;
}
