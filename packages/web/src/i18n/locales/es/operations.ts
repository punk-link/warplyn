import type { MessageId } from "../../messages.js";


export const operationsMessages = {
    "operations.factCheck": "Verificación de datos",
    "operations.flowRevision": "Revisión de fluidez",
    "operations.styleReview": "Revisión de estilo",
    "operations.thesisToNarrative": "De la tesis a la narración",
    "operations.translation": "Traducción",
} satisfies Partial<Record<MessageId, string>>;
