import type { MessageId } from "../../messages.js";

export const operations = {
    "operations.thesisToNarrative": "De la tesis a la narración",
    "operations.flowRevision": "Revisión de fluidez",
    "operations.factCheck": "Verificación de datos",
    "operations.styleReview": "Revisión de estilo",
    "operations.translation": "Traducción",
} satisfies Partial<Record<MessageId, string>>;
