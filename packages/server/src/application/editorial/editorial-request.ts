import type { EditorialOperation } from "@skladno/shared";
import type { SkillGuidance } from "../assistant/skills/skill-guidance.js";


export interface EditorialServiceRequest {
    styleContext?: { profile: import("@skladno/shared").StyleProfile; articleRules: string };
    requestId: string;
    articleContext: {
        articleId: string;
        targetArticleCharacterLimit?: number;
        targetLanguage?: string;
        content?: string;
        selection?: boolean;
        selectionContext?: import("./selection-context.js").SelectionContext;
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
