import type { MessageId } from "../../messages.js";

export const ui = {
    "ui.loading": "Cargando",
    "ui.proposedChange": "Cambio de texto propuesto",
    "ui.original": "Original",
    "ui.proposed": "Propuesto",
    "ui.noOriginal": "Sin texto original",
    "ui.noProposed": "Sin texto propuesto",
    "ui.removed": "Eliminado: ",
    "ui.added": "Añadido: ",
} satisfies Partial<Record<MessageId, string>>;
