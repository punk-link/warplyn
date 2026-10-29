import { APPLICATION_ERROR } from "@skladno/shared";
import { failure, success, type ApplicationResult } from "../../errors/application-result.js";
import type { ArticleService } from "../../articles/article-service.js";
import { requiresProposalReview, validateProposalResult } from "../../editorial/proposals/proposal-result-policy.js";
import { normalizeGeneralSettings } from "../../settings/application-settings-normalizers.js";
import type { SettingsStore } from "../../settings/settings-store.js";
import type { AssistantCapabilityLoop } from "../capabilities/assistant-capability-loop.js";
import { getAssistantArticleExcerpt } from "../assistant-engine-request.js";
import type { PreparedAssistantRequest } from "../requests/prepared-assistant-request.js";
import { getCompletedContent, getEditCandidate } from "./assistant-completion.js";
import type { CompletionEvent } from "./completion-event.js";


export async function authorizeCompletedEdit(
    request: PreparedAssistantRequest, event: CompletionEvent, signal: AbortSignal,
    capabilities: Pick<AssistantCapabilityLoop, "qualifiesReplacement" | "authorizesArticleEditIntent">,
    articles: Pick<ArticleService, "describeContentChange">, settings: SettingsStore,
): Promise<ApplicationResult<void>> {
    validateProposalResult(getAssistantArticleExcerpt(request), event.text, request.resolvedSkill?.execution, request.article.title,
        request.execution.completedCapability);
    if (request.execution.completedCapability !== "generate_proposal" || requiresProposalReview(request.resolvedSkill?.execution))
        return success(undefined);

    request.editCandidateAuthorized = await capabilities.qualifiesReplacement(request, event.text, signal);
    if (request.editMode !== "direct")
        return success(undefined);

    request.editIntentAuthorized ||= await capabilities.authorizesArticleEditIntent(request, signal);
    if (request.editIntentAuthorized && !getEditCandidate(request, event))
        return failure(APPLICATION_ERROR.ASSISTANT_EDIT_INVALID);

    request.directEditAuthorized = request.editIntentAuthorized;
    if (request.directEditAuthorized) {
        const content = getCompletedContent(request, event.text);
        const locale = request.interfaceLocale ?? normalizeGeneralSettings(settings.getSetting("application-general")?.value).interfaceLocale;
        request.editDescription = await articles.describeContentChange(request.article.content, content, locale, signal);
    }

    return success(undefined);
}
