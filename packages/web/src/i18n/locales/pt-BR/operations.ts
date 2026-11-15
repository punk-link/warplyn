import type { MessageId } from "../../messages.js";

export const operationsMessages = {
    "operations.thesisToNarrative": "Tese para narrativa",
    "operations.flowRevision": "Versão salva de fluxo",
    "operations.factCheck": "Verificação de fatos",
    "operations.styleReview": "Revisão de estilo",
    "operations.translation": "Tradução",
} satisfies Partial<Record<MessageId, string>>;
