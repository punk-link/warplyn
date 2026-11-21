import type { MessageId } from "../../messages.js";


export const operationsMessages = {
    "operations.factCheck": "Faktenprüfung",
    "operations.flowRevision": "Lesefluss überarbeiten",
    "operations.styleReview": "Stilprüfung",
    "operations.thesisToNarrative": "Von der These zum Text",
    "operations.translation": "Übersetzung",
} satisfies Partial<Record<MessageId, string>>;
