/** Declarative requests for existing application behavior, never permissions. */
export type SkillExecution = {
    capability: "generate_proposal";
    operation: "flow_revision" | "thesis_to_narrative";
    source: "article" | "author_or_article";
    resultPolicy: "review" | "verified_edit" | "shorter_preserving_content";
} | { capability: "fact_check" | "style_review" | "translate" | "manage_skills" };

export const defaultSkillExecution: SkillExecution = {
    capability: "generate_proposal", operation: "flow_revision", source: "article", resultPolicy: "verified_edit",
};


export function isSkillExecution(value: unknown): value is SkillExecution {
    if (!value || typeof value !== "object" || !("capability" in value))
        return false;

    if (value.capability !== "generate_proposal")
        return Object.keys(value).length === 1
            && (value.capability === "fact_check" || value.capability === "style_review" || value.capability === "translate" || value.capability === "manage_skills");

    return Object.keys(value).length === 4
        && "operation" in value && (value.operation === "flow_revision" || value.operation === "thesis_to_narrative")
        && "source" in value && (value.source === "article" || value.source === "author_or_article")
        && "resultPolicy" in value && (value.resultPolicy === "review" || value.resultPolicy === "verified_edit" || value.resultPolicy === "shorter_preserving_content");
}
