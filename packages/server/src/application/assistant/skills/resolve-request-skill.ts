import type { PreparedAssistantRequest } from "../requests/prepared-assistant-request.js";
import type { AssistantStore } from "../assistant-store.js";
import type { AssistantSkillPackage } from "./assistant-skill-package.js";
import { resolveSkillExecution } from "./skill-execution.js";


export function resolveRequestSkill(request: PreparedAssistantRequest, skill: AssistantSkillPackage, assistant: Pick<AssistantStore, "resolveRequest">): void {
    const resolved = resolveSkillExecution(skill, request.scope.kind);
    request.loadedSkills ??= [];
    if (!request.loadedSkills.some((loaded) => loaded.reference.id === skill.reference.id))
        request.loadedSkills.push(skill);

    if (request.resolvedSkillId)
        return;

    Object.assign(request, resolved);
    assistant.resolveRequest(request.requestId, skill.reference.id, "inferred");
}
