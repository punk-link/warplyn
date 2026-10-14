import type { EditorialOperation } from "@skladno/shared";
import type { SkillGuidance } from "../assistant/skills/skill-guidance.js";


export interface EditorialServiceRequest {
    articleId: string;
    requestId: string;
    skipFactCheckClaim?: (claim: string) => boolean;
    operation: EditorialOperation;
    authorContext: string;
    skillId?: string;
    skill?: SkillGuidance;
    targetArticleCharacterLimit?: number;
    targetLanguage?: string;
    articleContent?: string;
    articleSelection?: boolean;
    surroundingArticleCharacterCount?: number;
    correctionSelection?: { expectedRevisionId: string; occurrenceIds: string[] };
    reviewMode?: "typography";
}
