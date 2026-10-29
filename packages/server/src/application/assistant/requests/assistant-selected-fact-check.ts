import { APPLICATION_ERROR, type FactCheckFinding } from "@skladno/shared";
import { failure, success, type ApplicationResult } from "../../errors/application-result.js";
import { unwrapApplicationResult } from "../../errors/unwrap-application-result.js";
import type { EditorialEngineEvent } from "../../editorial/engine/editorial-engine-event.js";
import type { PreparedAssistantRequest } from "./prepared-assistant-request.js";


export function selectFactCheckFindings<Check extends { findings: FactCheckFinding[] }>(
    factCheck: Check | undefined, skip: PreparedAssistantRequest["execution"]["skipFactCheckClaim"],
): Check | undefined {
    if (!factCheck || !skip)
        return factCheck;

    return { ...factCheck, findings: factCheck.findings.filter(({ claim }) => !skip(claim)) };
}


export function selectCompletedFactCheck(
    event: Extract<EditorialEngineEvent, { type: "completed" }>, skip: PreparedAssistantRequest["execution"]["skipFactCheckClaim"],
): typeof event {
    return unwrapApplicationResult(filterCompletedFactCheck(event, skip));
}


export function filterCompletedFactCheck(
    event: Extract<EditorialEngineEvent, { type: "completed" }>, skip: PreparedAssistantRequest["execution"]["skipFactCheckClaim"],
): ApplicationResult<typeof event> {
    if (!event.factCheck || !skip)
        return success(event);

    const factCheck = selectFactCheckFindings(event.factCheck, skip)!;
    if (event.factCheck.findings.length && !factCheck.findings.length)
        return failure(APPLICATION_ERROR.INVALID_REQUEST);

    return success({ ...event, factCheck });
}
