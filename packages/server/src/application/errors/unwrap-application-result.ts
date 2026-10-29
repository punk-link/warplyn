import { HTTP_STATUS } from "@skladno/shared";
import { ApplicationServiceError } from "./application-service-error.js";
import type { ApplicationResult } from "./application-result.js";


export function unwrapApplicationResult<T>(result: ApplicationResult<T>): T {
    if (result.ok)
        return result.value;

    throw applicationFailureError(result);
}


export function applicationFailureError(result: Extract<ApplicationResult<never>, { ok: false }>): ApplicationServiceError {
    const statuses = {
        invalid: HTTP_STATUS.BAD_REQUEST, conflict: HTTP_STATUS.CONFLICT,
        "not-found": HTTP_STATUS.NOT_FOUND, unavailable: HTTP_STATUS.INTERNAL_SERVER_ERROR
    };

    return new ApplicationServiceError(result.code, statuses[result.kind], result.parameters);
}
