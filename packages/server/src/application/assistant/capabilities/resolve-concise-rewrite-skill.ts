import { BUILT_IN_SKILL } from "@skladno/shared";
import type { PreparedAssistantRequest } from "../requests/prepared-assistant-request.js";
import type { AssistantStore } from "../assistant-store.js";


export function resolveConciseRewriteSkill(request: PreparedAssistantRequest, id: string, assistant: Pick<AssistantStore, "resolveRequest">): void {
    if (request.explicitSkillId || id !== BUILT_IN_SKILL.CONCISE_REWRITE)
        return;

    request.resolvedSkillId = id;
    request.operation = "flow_revision";
    assistant.resolveRequest(request.requestId, id, "inferred");
}
