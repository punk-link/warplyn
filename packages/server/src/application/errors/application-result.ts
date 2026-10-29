import { failure as createFailure, type ApplicationErrorCode, type Result } from "@skladno/shared";
export { success } from "@skladno/shared";


export type ApplicationResult<T> = Result<T, {
    code: ApplicationErrorCode;
    kind: "invalid" | "conflict" | "not-found" | "unavailable";
    parameters?: Record<string, string | number>;
}>;


export function failure(
    code: ApplicationErrorCode,
    kind: Extract<ApplicationResult<never>, { ok: false }>["kind"] = "invalid",
    parameters?: Record<string, string | number>,
): Extract<ApplicationResult<never>, { ok: false }> {
    return createFailure({ code, kind, ...(parameters ? { parameters } : {}) });
}
