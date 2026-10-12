import type { AssistantSkillReference, SkillExecution } from "@skladno/shared";


export interface SkillGuidance {
    reference: AssistantSkillReference;
    contentHash?: string;
    execution: SkillExecution;
    instructions: string;
}
