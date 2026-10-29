import { APPLICATION_ERROR, FACT_CHECK_STATUS, type FactCheck } from "@skladno/shared";
import { failure, success, type ApplicationResult } from "../../errors/application-result.js";
import { unwrapApplicationResult } from "../../errors/unwrap-application-result.js";


export function verifyCorrectionSelection(checks: FactCheck[], revisionId: string, findingIds: string[]): FactCheck["findings"] {
    return unwrapApplicationResult(prepareCorrectionSelection(checks, revisionId, findingIds));
}


export function prepareCorrectionSelection(checks: FactCheck[], revisionId: string, findingIds: string[]): ApplicationResult<FactCheck["findings"]> {
    const selected = new Set(findingIds);
    if (selected.size === 0 || selected.size !== findingIds.length || findingIds.some((id) => !id.trim()))
        return failure(APPLICATION_ERROR.FACT_CORRECTION_SELECTION_INVALID);

    const findings = (checks.find((check) => check.reviewedRevisionId === revisionId)?.findings ?? [])
        .filter((finding) => finding.occurrenceId && selected.has(finding.occurrenceId));

    if (findings.length !== selected.size || findings.some((finding) => finding.resolution || (finding.status !== FACT_CHECK_STATUS.DISPUTED && finding.status !== FACT_CHECK_STATUS.UNVERIFIABLE)))
        return failure(APPLICATION_ERROR.FACT_CORRECTION_SELECTION_INVALID);

    return success(findings);
}


export function correctionContext(findings: FactCheck["findings"]): string {
    const instructions = "Prepare a correction Proposal only for these explicitly selected advisory Findings. " +
        "Preserve unrelated claims, numbers, URLs, code, technical terms, and author voice. Findings:\n";

    return `${instructions}${findings.map((finding) => `- ${finding.claim}: ${finding.rationale} Sources: ${finding.sources.map((source) => source.url).join(", ")}`).join("\n")}`;
}
