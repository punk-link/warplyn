import type { EditorialServiceRequest } from "./editorial-request.js";


export function selectionContext(request: EditorialServiceRequest) {
    return {
        ...(request.articleContext.selection ? { articleSelection: true } : {}),
        ...(request.articleContext.selectionContext ? { selectionContext: request.articleContext.selectionContext } : {}),
        ...(request.articleContext.surroundingCharacterCount !== undefined
            ? { surroundingArticleCharacterCount: request.articleContext.surroundingCharacterCount }
            : {}),
    };
}
