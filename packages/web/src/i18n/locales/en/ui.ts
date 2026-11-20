import type { MessageId } from "../../messages.js";


export const uiMessages = {
    "ui.added": "Added: ",
    "ui.loading": "Loading",
    "ui.noOriginal": "No original text",
    "ui.noProposed": "No proposed text",
    "ui.original": "Original",
    "ui.proposed": "Proposed",
    "ui.proposedChange": "Proposed text change",
    "ui.removed": "Removed: ",
} satisfies Partial<Record<MessageId, string>>;
