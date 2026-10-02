import { APPLICATION_ERROR, HTTP_STATUS, type FactCheckFinding } from "@skladno/shared";
import { ApplicationServiceError } from "../../errors/application-service-error.js";
import type { EditorialEngineEvent } from "../../editorial/engine/editorial-engine-event.js";
import type { PreparedAssistantRequest } from "./prepared-assistant-request.js";


export function selectFactCheckFindings<Check extends { findings: FactCheckFinding[] }>(factCheck: Check | undefined, skip: PreparedAssistantRequest["skipFactCheckClaim"]): Check | undefined {
    if (!factCheck || !skip)
        return factCheck;

    return { ...factCheck, findings: factCheck.findings.filter(({ claim }) => !skip(claim)) };
}


export function selectCompletedFactCheck(event: Extract<EditorialEngineEvent, { type: "completed" }>, skip: PreparedAssistantRequest["skipFactCheckClaim"]): typeof event {
    if (!event.factCheck || !skip)
        return event;

    const factCheck = selectFactCheckFindings(event.factCheck, skip)!;
    if (event.factCheck.findings.length && !factCheck.findings.length)
        throw new ApplicationServiceError(APPLICATION_ERROR.INVALID_REQUEST, HTTP_STATUS.BAD_REQUEST);

    return { ...event, factCheck };
}
