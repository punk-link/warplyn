import { defaultSkillExecution } from "@skladno/shared";
import type { AssistantSkillPackage } from "./assistant-skill-package.js";
import type { SkillGuidance } from "./skill-guidance.js";
import { getSkillInstructions } from "./skill-execution.js";


export function createSkillGuidance(primary?: AssistantSkillPackage, loaded: readonly AssistantSkillPackage[] = []): SkillGuidance | undefined {
    if (!primary)
        return undefined;

    return {
        reference: primary.reference,
        contentHash: primary.contentHash,
        execution: primary.execution ?? defaultSkillExecution,
        instructions: [primary, ...loaded.filter((skill) => skill.reference.id !== primary.reference.id)].map(getSkillInstructions).join("\n\n"),
    };
}
