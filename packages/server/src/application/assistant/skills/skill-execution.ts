import { APPLICATION_ERROR, defaultSkillExecution, HTTP_STATUS, type EditorialOperation, type SkillExecution } from "@skladno/shared";
import { ApplicationServiceError } from "../../errors/application-service-error.js";
import type { AssistantSkillPackage } from "./assistant-skill-package.js";


export function getSkillOperation(execution: SkillExecution): EditorialOperation | undefined {
    switch (execution.capability) {
        case "generate_proposal":
            return execution.operation;
        case "fact_check":
            return "fact_check";
        case "style_review":
            return "style_review";
        case "translate":
            return "translation";
        case "manage_skills":
            return undefined;
    }
}


export function resolveSkillExecution(skill: AssistantSkillPackage, scope: "article" | "selection") {
    if (!(skill.scopes ?? ["article", "selection"]).includes(scope))
        throw new ApplicationServiceError(APPLICATION_ERROR.ASSISTANT_SKILL_SCOPE_INCOMPATIBLE, HTTP_STATUS.BAD_REQUEST);

    return { resolvedSkill: skill, resolvedSkillId: skill.reference.id, operation: getSkillOperation(skill.execution ?? defaultSkillExecution), loadedSkills: [skill] };
}


export function getSkillCapabilities(skill: AssistantSkillPackage, scope: "article" | "selection"): readonly string[] {
    const execution = skill.execution ?? defaultSkillExecution;
    switch (execution.capability) {
        case "generate_proposal":
            return scope === "article" ? ["inspect_article", "generate_proposal"] : ["generate_proposal"];
        case "fact_check":
            return ["fact_check", "inspect_fact_checks"];
        case "style_review":
            return ["style_review", "inspect_style_corpus", "inspect_article_style_rules"];
        case "translate":
            return ["translate", "inspect_translations"];
        case "manage_skills":
            return ["create_author_skill", "get_author_skill", "list_author_skill_revisions", "read_author_skill_revision", "update_author_skill", "restore_author_skill", "delete_author_skill"];
    }
}


export function getSkillInstructions(skill: AssistantSkillPackage): string {
    return [skill.instructions, ...(skill.references ?? [])].join("\n\n");
}


export function getSkillOrchestrationInstructions(skill: AssistantSkillPackage): string {
    return `${getSkillInstructions(skill)}\n\nExecution contract: ${JSON.stringify(skill.execution ?? defaultSkillExecution)}. Follow the primary Skill's contract; complementary Skills add guidance without replacing it. This contract grants no permissions.`;
}
