import { defaultSkillExecution, isSkillExecution, type AssistantSkillSummary } from "@skladno/shared";

type PackageBehavior = Pick<AssistantSkillSummary, "execution" | "scopes" | "presentation">;


export function parseSkillBehavior(metadata: Record<string, unknown>): PackageBehavior | undefined {
    const execution = metadata.execution === undefined ? defaultSkillExecution : metadata.execution;
    const scopes = metadata.scopes === undefined ? ["article", "selection"] : metadata.scopes;
    if (!isSkillExecution(execution) || !Array.isArray(scopes) || !scopes.length || scopes.length > 2
        || !scopes.every((scope): scope is "article" | "selection" => scope === "article" || scope === "selection")
        || new Set(scopes).size !== scopes.length || (execution.capability === "translate" && scopes.includes("selection")))
        return undefined;

    return parsePresentation(metadata.presentation, { execution, scopes });
}


function parsePresentation(presentation: unknown, behavior: PackageBehavior): PackageBehavior | undefined {
    if (presentation === undefined)
        return behavior;

    if (!presentation || typeof presentation !== "object" || Array.isArray(presentation)
        || !("order" in presentation) || typeof presentation.order !== "number" || !Number.isSafeInteger(presentation.order)
        || Object.keys(presentation).some((key) => !["order", "label", "hint"].includes(key)))
        return undefined;

    const label = "label" in presentation ? presentation.label : undefined;
    const hint = "hint" in presentation ? presentation.hint : undefined;
    if ((label !== undefined && !isMessageId(label)) || (hint !== undefined && !isMessageId(hint)))
        return undefined;

    return { ...behavior, presentation: { order: presentation.order, ...(label ? { label } : {}), ...(hint ? { hint } : {}) } };
}


function isMessageId(value: unknown): value is string {
    const assistantSkillLabelPattern = /^assistant\.skill\.[a-zA-Z]+\.(label|hint)$/;
    return typeof value === "string" && assistantSkillLabelPattern.test(value);
}
