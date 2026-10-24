export interface EditorialConversationRequest {
    message: string;
    article: string;
    selectionContext?: import("../selection-context.js").SelectionContext;
    scope: "article" | "selection";
    history: { role: "author" | "assistant"; content: string }[];
}
