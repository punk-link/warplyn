import { HTTP_STATUS } from "@skladno/shared";
import { ApplicationServiceError } from "../../errors/application-service-error.js";
import type { AssistantPreparationResult } from "./assistant-preparation-result.js";


const preparationStatuses: Record<Extract<AssistantPreparationResult, { ok: false }>["code"], number> = {
    article_not_found: HTTP_STATUS.NOT_FOUND,
    assistant_retry_invalid: HTTP_STATUS.BAD_REQUEST,
    revision_conflict: HTTP_STATUS.CONFLICT,
    assistant_skill_unsupported: HTTP_STATUS.BAD_REQUEST,
    assistant_selection_invalid: HTTP_STATUS.BAD_REQUEST,
    assistant_skill_scope_incompatible: HTTP_STATUS.BAD_REQUEST,
    editorial_configuration_missing: HTTP_STATUS.BAD_REQUEST,
    target_language_required: HTTP_STATUS.BAD_REQUEST,
    style_corpus_required: HTTP_STATUS.BAD_REQUEST,
    typography_rules_invalid: HTTP_STATUS.BAD_REQUEST,
};


export function assistantPreparationError(failure: Extract<AssistantPreparationResult, { ok: false }>): ApplicationServiceError {
    return new ApplicationServiceError(failure.code, preparationStatuses[failure.code], failure.parameters);
}
