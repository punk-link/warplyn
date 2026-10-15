import { APPLICATION_ERROR, EDITORIAL_OPERATION, HTTP_STATUS, type StyleCorpus, type StyleProfile } from "@skladno/shared";

import { ApplicationServiceError } from "../../errors/application-service-error.js";
import type { EditorialServiceRequest } from "../editorial-request.js";


export function prepareStyleReviewProfile(
    editorial: EditorialServiceRequest["editorial"],
    styleCorpus: { getStyleCorpus(): Pick<StyleCorpus, "profile" | "status"> },
): StyleProfile | undefined {
    const profile = getReadyStyleProfile(editorial.operation, styleCorpus);
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
