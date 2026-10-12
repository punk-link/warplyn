import type { EditorialOperation, FactCheckFinding, StyleProfile } from "@skladno/shared";
import type { SkillGuidance } from "../../assistant/skills/skill-guidance.js";


export interface EditorialEngineRequest {
    operation: EditorialOperation;
    article: string;
    articleTitle?: string;
    authorContext: string;
    articleSelection?: boolean;
    skillId?: string;
    skill?: SkillGuidance;
    surroundingArticleCharacterCount?: number;
    styleProfile?: StyleProfile;
    articleStyleRules?: string;
    targetArticleCharacterLimit?: number;
    previousResponseId?: string;
    targetLanguage?: string;
    reusableFactFindings?: FactCheckFinding[];
    skipFactCheckClaim?: (claim: string) => boolean;
}
