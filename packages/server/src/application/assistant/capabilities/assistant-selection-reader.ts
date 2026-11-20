import type { PreparedAssistantRequest } from "../requests/prepared-assistant-request.js";
import type { EditorialAssistantTool } from "../../editorial/engine/editorial-assistant-tool.js";
import { formatSelectionContext, getSelectionContext } from "../../editorial/selection-context.js";
import { getEditorNoteGuidance } from "../../editorial/editor-note-guidance.js";


export function createAssistantSelectionReader(request: PreparedAssistantRequest, validate: () => unknown): EditorialAssistantTool[] {
    if (request.scope.kind !== "selection" || request.resolvedSkill?.execution?.capability === "manage_skills")
        return [];

    const scope = request.scope;
    return [{
        capability: "read_selection",
        description: "Read the selected source and bounded read-only neighboring context only when answering requires Article text. " +
            "Never use for greetings, general advice, or Skill management. No other Article text is available in selection scope.",
        input: "none",
        execute: async (_input, signal) => {
            signal.throwIfAborted();
            validate();
            const authorGuidance = getEditorNoteGuidance(request.article.editorNotes ?? [], request.article.content, scope);
            
            return {
                selectedSource: request.article.content.slice(scope.startOffset, scope.endOffset),
                ...(authorGuidance ? { authorGuidance } : {}),
                readOnlyContext: formatSelectionContext(getSelectionContext(request.article.content, scope.startOffset, scope.endOffset)),
            };
        },
    }];
}
