import type { EditorialOperation } from "@skladno/shared";
import type { SkillGuidance } from "../skills/skill-guidance.js";

import type { EditorialCapabilityContext } from "./editorial-capability-context.js";
import type { EditorialCapabilityId } from "./editorial-capability-id.js";


export interface StreamContext {
    styleContext?: import("../../editorial/editorial-request.js").EditorialServiceRequest["styleContext"];
    capability: Extract<EditorialCapabilityId, "generate_proposal" | "generate_finding_corrections" | "fact_check" | "style_review" | "translate">;
    context: EditorialCapabilityContext;
    requestId: string;
    editorial: {
        authorContext: string;
        skillId?: string;
        skill?: SkillGuidance;
        operation?: Extract<EditorialOperation, "thesis_to_narrative" | "flow_revision">;
    };
    article: {
        targetArticleCharacterLimit?: number;
        targetLanguage?: string;
        content?: string;
        selection?: boolean;
        selectionContext?: import("../../editorial/selection-context.js").SelectionContext;
        surroundingCharacterCount?: number;
    };
    factChecking?: { skipClaim?: (claim: string) => boolean; findingIds?: string };
}
