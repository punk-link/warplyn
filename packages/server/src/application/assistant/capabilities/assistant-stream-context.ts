import { getSelectionContext } from "../../editorial/selection-context.js";
import { createSkillGuidance } from "../skills/create-skill-guidance.js";
import type { PreparedAssistantRequest } from "../requests/prepared-assistant-request.js";
import type { EditorialCapabilityDefinition } from "./editorial-capability-definition.js";
import type { StreamContext } from "./editorial-stream-context.js";


export function createAssistantStreamContext(
    request: PreparedAssistantRequest, excerpt: string, authorContext: string,
    definition: EditorialCapabilityDefinition, input: Readonly<Record<string, string>>,
): StreamContext {
    return {
        capability: definition.id as StreamContext["capability"],
        context: { articleId: request.articleId, baseRevisionId: request.scope.baseRevisionId },
        requestId: request.requestId,
        ...(request.article.styleContext ? { styleContext: request.article.styleContext } : {}),
        editorial: {
            authorContext,
            ...(request.resolvedSkillId ? { skillId: request.resolvedSkillId } : {}),
            skill: createSkillGuidance(request.resolvedSkill, request.loadedSkills),
            ...(input.operation ? { operation: input.operation as StreamContext["editorial"]["operation"] } : {}),
        },
        article: {
            ...(request.article.publishingCharacterLimit ? { targetArticleCharacterLimit: request.article.publishingCharacterLimit } : {}),
            ...(input.targetLanguage ? { targetLanguage: input.targetLanguage } : {}),
            ...(request.scope.kind === "selection" ? {
                content: excerpt,
                selection: true,
                selectionContext: getSelectionContext(request.article.content, request.scope.startOffset, request.scope.endOffset),
                surroundingCharacterCount: request.article.content.length - excerpt.length,
            } : {}),
        },
        ...(request.execution.skipFactCheckClaim || input.findingIds ? {
            factChecking: {
                ...(request.execution.skipFactCheckClaim ? { skipClaim: request.execution.skipFactCheckClaim } : {}),
                ...(input.findingIds ? { findingIds: input.findingIds } : {}),
            },
        } : {}),
    };
}
