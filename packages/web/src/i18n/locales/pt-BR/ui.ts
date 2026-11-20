import type { MessageId } from "../../messages.js";


export const uiMessages = {
    "ui.added": "Adicionado: ",
    "ui.loading": "Carregando",
    "ui.noOriginal": "Nenhum texto original",
    "ui.noProposed": "Nenhum texto proposto",
    "ui.original": "Original",
    "ui.proposed": "Proposto",
    "ui.proposedChange": "Alteração de texto proposta",
    "ui.removed": "Removido: ",
} satisfies Partial<Record<MessageId, string>>;
