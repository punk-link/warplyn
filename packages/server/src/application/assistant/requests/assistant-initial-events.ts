import { ASSISTANT_EVENT, type AssistantEvent, type EditorialOperation } from "@skladno/shared";

import { getActivityForEditorialOperation } from "../capabilities/editorial-capability-catalog.js";
import type { PreparedAssistantRequest } from "./prepared-assistant-request.js";


export function getAssistantInitialEvents(request: PreparedAssistantRequest): AssistantEvent[] {
    return [
        { type: ASSISTANT_EVENT.ACCEPTED, requestId: request.requestId },
        {
            type: ASSISTANT_EVENT.SKILL_RESOLVED,
            requestId: request.requestId,
            ...(request.resolvedSkillId ? { skillId: request.resolvedSkillId, source: request.explicitSkillId ? "explicit" : "inferred" } : {}),
        },
        ...(!request.execution.usesCapabilityLoop && request.execution.operation
            ? [createEditorialActivityEvent(request.requestId, request.execution.operation, "started")]
            : []),
    ];
}


export function createEditorialActivityEvent(requestId: string, operation: EditorialOperation, status: "started" | "completed"): AssistantEvent {
    return { type: ASSISTANT_EVENT.CAPABILITY_ACTIVITY, requestId, activity: { summary: getActivityForEditorialOperation(operation), status } };
}
