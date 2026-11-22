import { APPLICATION_ERROR } from "@skladno/shared";
import { failure, success, type ApplicationResult } from "../../errors/application-result.js";
import { requiresProposalReview, validateProposalResult } from "../../editorial/proposals/proposal-result-policy.js";
import type { AssistantCapabilityLoop } from "../capabilities/assistant-capability-loop.js";
import { getAssistantArticleExcerpt } from "../assistant-engine-request.js";
import type { PreparedAssistantRequest } from "../requests/prepared-assistant-request.js";
import { getEditCandidate } from "./assistant-completion-service.js";
import type { CompletionEvent } from "./completion-event.js";


export async function authorizeCompletedEdit(
    request: PreparedAssistantRequest, event: CompletionEvent, signal: AbortSignal,
    capabilities: Pick<AssistantCapabilityLoop, "qualifiesReplacement">,
): Promise<ApplicationResult<void>> {
    validateProposalResult(getAssistantArticleExcerpt(request), event.text, request.resolvedSkill?.execution, request.article.title,
        request.execution.completedCapability);
    if (request.execution.completedCapability !== "generate_proposal" || requiresProposalReview(request.resolvedSkill?.execution))
        return success(undefined);

    request.editCandidateAuthorized = await capabilities.qualifiesReplacement(request, event.text, signal);
    if (request.editMode !== "direct")
        return success(undefined);

    if (!getEditCandidate(request, event))
        return failure(APPLICATION_ERROR.ASSISTANT_EDIT_INVALID);

    request.directEditAuthorized = true;

    return success(undefined);
}
