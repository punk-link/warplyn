import { APPLICATION_ERROR, EDITORIAL_OPERATION, normalizeWritingLanguage, type StyleCorpus, type StyleProfile } from "@skladno/shared";

import { failure, success, type ApplicationResult } from "../../errors/application-result.js";
import { unwrapApplicationResult } from "../../errors/unwrap-application-result.js";
import type { EditorialServiceRequest } from "../editorial-request.js";
import { prepareStyleTypography } from "./capture-style-typography.js";


export function prepareStyleReviewProfile(
    editorial: EditorialServiceRequest["editorial"],
    styleCorpus: {
        getStyleCorpus(): Pick<StyleCorpus, "profile" | "status">;
        getArticleTypography?(articleId: string): import("@skladno/shared").ArticleTypography | undefined;
    },
    article?: { id: string; language?: string },
): StyleProfile | undefined {
    return unwrapApplicationResult(prepareStyleProfile(editorial, styleCorpus, article));
}


function prepareStyleProfile(
    editorial: EditorialServiceRequest["editorial"],
    styleCorpus: Parameters<typeof prepareStyleReviewProfile>[1],
    article?: { id: string; language?: string },
): ApplicationResult<StyleProfile | undefined> {
    const ready = getReadyStyleProfile(editorial.operation, styleCorpus);
    if (!ready.ok)
        return ready;

    const captured = ready.value && article
        ? prepareStyleTypography(ready.value, article.language, styleCorpus.getArticleTypography?.(article.id)) : ready;
    if (!captured.ok)
        return captured;

    const profile = captured.value;
    if (editorial.reviewMode && editorial.operation !== EDITORIAL_OPERATION.STYLE_REVIEW)
        return failure(APPLICATION_ERROR.INVALID_REQUEST);

    if (editorial.reviewMode && !profile?.rules.typography.some((rule) => rule.definition.kind !== "contextual"))
        return failure(APPLICATION_ERROR.TYPOGRAPHY_RULES_REQUIRED);

    return success(profile);
}


function getReadyStyleProfile(
    operation: EditorialServiceRequest["editorial"]["operation"],
    styleCorpus: { getStyleCorpus(): Pick<StyleCorpus, "profile" | "status"> },
): ApplicationResult<StyleProfile | undefined> {
    if (operation !== EDITORIAL_OPERATION.STYLE_REVIEW)
        return success(undefined);

    const corpus = styleCorpus.getStyleCorpus();
    if (corpus.status !== "ready" || !corpus.profile)
        return failure(APPLICATION_ERROR.STYLE_CORPUS_REQUIRED);

    return success(corpus.profile);
}


export function prepareStyleReviewContext(
    editorial: EditorialServiceRequest["editorial"],
    store: Parameters<typeof prepareStyleReviewProfile>[1] & { getArticleStyleRules(id: string): string },
    article: { id: string; language?: string },
    captured?: EditorialServiceRequest["styleContext"],
    targetLanguage?: string,
): EditorialServiceRequest["styleContext"] {
    return unwrapApplicationResult(prepareStyleContext(editorial, store, article, captured, targetLanguage));
}


export function prepareStyleContext(
    editorial: EditorialServiceRequest["editorial"],
    store: Parameters<typeof prepareStyleReviewContext>[1],
    article: { id: string; language?: string },
    captured?: EditorialServiceRequest["styleContext"],
    targetLanguage?: string,
): ApplicationResult<EditorialServiceRequest["styleContext"]> {
    if (editorial.operation === EDITORIAL_OPERATION.TRANSLATION) {
        const profile = store.getStyleCorpus().profile;
        if (!profile)
            return success(undefined);

        const typography = prepareStyleTypography(profile, normalizeWritingLanguage(targetLanguage));
        return typography.ok ? success({ profile: typography.value, articleRules: "" }) : typography;
    }

    if (editorial.operation !== EDITORIAL_OPERATION.STYLE_REVIEW)
        return success(undefined);

    if (captured)
        return success(captured);

    const profile = prepareStyleProfile(editorial, store, article);
    if (!profile.ok)
        return profile;

    return success(profile.value ? { profile: profile.value, articleRules: store.getArticleStyleRules(article.id) } : undefined);
}
