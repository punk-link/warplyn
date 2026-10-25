import { NULL_CHARACTER, type SkillExecution } from "@skladno/shared";
import { protectArticleSpans } from "../translation/translation.js";
import { EditorialEngineError } from "../engine/editorial-engine-error.js";
import { EDITORIAL_ENGINE_ERROR } from "../engine/editorial-engine-errors.js";


export function requiresProposalReview(execution?: SkillExecution): boolean {
    return execution?.capability === "generate_proposal" && execution.resultPolicy !== "verified_edit";
}


export function preservesProtectedContent(source: string, replacement: string): boolean {
    const protectedSpans = protectArticleSpans(source).protectedSpans;
    const sourceNumberPattern = /\b\d+(?:[.,]\d+)*\b/g;
    const sourceNumbers = source.match(sourceNumberPattern) ?? [];
    const replacementNumberPattern = /\b\d+(?:[.,]\d+)*\b/g;
    const replacementNumbers = replacement.match(replacementNumberPattern) ?? [];
    if (sourceNumbers.sort().join(NULL_CHARACTER) !== replacementNumbers.sort().join(NULL_CHARACTER))
        return false;

    return ![...new Set(protectedSpans)].some((span) => source.split(span).length !== replacement.split(span).length);
}


function normalizeTitleLine(line: string): string {
    const headingPrefix = /^#{1,6}\s+/u;
    const closingHeading = /\s+#+$/u;
    const emphasisWrapper = /^(\*\*|__|\*|_)(.*)\1$/u;
    return line.trim().replace(headingPrefix, "").replace(closingHeading, "").replace(emphasisWrapper, "$2").trim().normalize("NFC");
}


function validateBodyTitle(source: string, replacement: string, title: string): void {
    const normalizedTitle = normalizeTitleLine(title);
    if (!normalizedTitle)
        return;

    const countTitleLines = (text: string) => text.split("\n").filter((line) => normalizeTitleLine(line) === normalizedTitle).length;
    if (countTitleLines(replacement) > countTitleLines(source))
        throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT);
}


const bodyOutputKinds = new Set(["flow_revision", "thesis_to_narrative", "style_review", "generate_proposal", "generate_finding_corrections"]);


export function validateProposalResult(source: string, replacement: string, execution?: SkillExecution, articleTitle = "", outputKind = ""): void {
    if (bodyOutputKinds.has(outputKind))
        validateBodyTitle(source, replacement, articleTitle);

    if (execution?.capability !== "generate_proposal" || execution.resultPolicy !== "shorter_preserving_content")
        return;

    if (replacement === source)
        return;

    const lineEndingPattern = /"[^"\n]+"|“[^”\n]+”|\[\^[^\]]+\]/g;
    const quotationsAndCitations = source.match(lineEndingPattern) ?? [];
    const preservesReferences = quotationsAndCitations.every((span) => source.split(span).length === replacement.split(span).length);
    if (!replacement.trim() || replacement.length >= source.length || !preservesProtectedContent(source, replacement) || !preservesReferences)
        throw new EditorialEngineError(EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT, EDITORIAL_ENGINE_ERROR.INVALID_OUTPUT);
}
