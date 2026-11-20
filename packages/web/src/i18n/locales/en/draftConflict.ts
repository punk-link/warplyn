import type { MessageId } from "../../messages.js";


export const draftConflictMessages = {
    "draftConflict.banner": "Another Warplyn session changed this Article. Your local Draft has been kept; compare it before continuing.",
    "draftConflict.cancel": "Cancel",
    "draftConflict.compare": "Compare and resolve",
    "draftConflict.confirmDraft": "Replace your retained local text with the latest persisted Draft?",
    "draftConflict.confirmRevision": "Discard the persisted Draft and replace your retained local text with the latest Revision?",
    "draftConflict.description": "Your retained local Draft is shown beside the latest saved content. Nothing is replaced until you choose.",
    "draftConflict.heading": "Resolve Draft conflict",
    "draftConflict.keepMine": "Keep my Draft",
    "draftConflict.useDraft": "Use latest Draft",
    "draftConflict.useRevision": "Use latest Revision",
} satisfies Partial<Record<MessageId, string>>;
