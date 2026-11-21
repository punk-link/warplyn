import type { MessageId } from "../../messages.js";


export const operationsMessages = {
    "operations.factCheck": "Verificação de fatos",
    "operations.flowRevision": "Versão salva de fluxo",
    "operations.styleReview": "Revisão de estilo",
    "operations.thesisToNarrative": "Tese para narrativa",
    "operations.translation": "Tradução",
} satisfies Partial<Record<MessageId, string>>;
