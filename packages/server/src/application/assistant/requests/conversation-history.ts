import type { AssistantStore } from "../assistant-store.js";


export type ConversationHistory = { role: "author" | "assistant"; content: string }[];


export function getConversationHistory(assistant: Pick<AssistantStore, "listConversationHistory">, articleId: string, limit?: number): ConversationHistory {
    return assistant.listConversationHistory(articleId, limit);
}
