import type { MessageId } from "../../messages.js";


export const uiMessages = {
    "ui.added": "Añadido: ",
    "ui.loading": "Cargando",
    "ui.noOriginal": "Sin texto original",
    "ui.noProposed": "Sin texto propuesto",
    "ui.original": "Original",
    "ui.proposed": "Propuesto",
    "ui.proposedChange": "Cambio de texto propuesto",
    "ui.removed": "Eliminado: ",
} satisfies Partial<Record<MessageId, string>>;
