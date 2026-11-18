import type { MessageId } from "../../messages.js";

export const uiMessages = {
    "ui.loading": "Carregando",
    "ui.proposedChange": "Alteração de texto proposta",
    "ui.original": "Original",
    "ui.proposed": "Proposto",
    "ui.noOriginal": "Nenhum texto original",
    "ui.noProposed": "Nenhum texto proposto",
    "ui.removed": "Removido: ",
    "ui.added": "Adicionado: ",
} satisfies Partial<Record<MessageId, string>>;
