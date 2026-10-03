import type { AssistantMessage } from "./assistant.js";


/** Revision bodies are sent once, even when many messages share the same base. */
export interface AssistantMessageHistory {
    messages: Omit<AssistantMessage, "baseRevisionContent">[];
    revisionContents: Record<string, string>;
}


export function hydrateAssistantMessageHistory(history: AssistantMessageHistory): AssistantMessage[] {
    return history.messages.map((message) => {
        const content = message.baseRevisionId ? history.revisionContents[message.baseRevisionId] : undefined;
        return content === undefined ? message : { ...message, baseRevisionContent: content };
    });
}
