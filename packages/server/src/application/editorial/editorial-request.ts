import type { EditorialOperation } from "@skladno/shared";
import type { SkillGuidance } from "../assistant/skills/skill-guidance.js";


export interface EditorialServiceRequest {
    requestId: string;
    articleContext: {
        articleId: string;
        targetArticleCharacterLimit?: number;
        targetLanguage?: string;
        content?: string;
        selection?: boolean;
        surroundingCharacterCount?: number;
    };
    editorial: {
        operation: EditorialOperation;
        authorContext: string;
        skillId?: string;
        skill?: SkillGuidance;
        reviewMode?: "typography";
    };
    factChecking?: {
        skipClaim?: (claim: string) => boolean;
        correctionSelection?: { expectedRevisionId: string; occurrenceIds: string[] };
    };
}
