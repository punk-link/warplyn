import { APPLICATION_ERROR, defaultSkillExecution, type AssistantAuthorizedAction } from "@skladno/shared";
import { failure, success, type ApplicationResult } from "../../errors/application-result.js";
import type { EditorialEngineResolver } from "../../editorial/engine/editorial-engine-resolver.js";
import type { PreparedAssistantRequest } from "../requests/prepared-assistant-request.js";
import type { EditorialCapabilityDefinition } from "./editorial-capability-definition.js";


export async function authorizeAssistantAction(
    engines: Pick<EditorialEngineResolver, "resolveAssistantActionIntentVerifier">,
    request: PreparedAssistantRequest, action: AssistantAuthorizedAction,
    input: Readonly<Record<string, string>>, signal: AbortSignal,
): Promise<ApplicationResult<void>> {
    const verifier = engines.resolveAssistantActionIntentVerifier?.();
    if (!verifier || !await verifier.verify(request.authorMessage, action, input, signal))
        return failure(APPLICATION_ERROR.INVALID_REQUEST);

    signal.throwIfAborted();
    return success(undefined);
}


export function validateArtifactCapability(
    request: PreparedAssistantRequest, definition: EditorialCapabilityDefinition, input: Readonly<Record<string, string>>,
): ApplicationResult<void> {
    const execution = request.resolvedSkill?.execution ?? defaultSkillExecution;
    if (request.resolvedSkill && (execution.capability !== definition.id ||
        (execution.capability === "generate_proposal" && execution.operation !== input.operation)))
        return failure(APPLICATION_ERROR.INVALID_REQUEST);

    return success(undefined);
}
