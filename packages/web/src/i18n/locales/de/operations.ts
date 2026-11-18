import type { MessageId } from "../../messages.js";

export const operationsMessages = {
    "operations.thesisToNarrative": "Von der These zum Text",
    "operations.flowRevision": "Lesefluss überarbeiten",
    "operations.factCheck": "Faktenprüfung",
    "operations.styleReview": "Stilprüfung",
    "operations.translation": "Übersetzung",
} satisfies Partial<Record<MessageId, string>>;
