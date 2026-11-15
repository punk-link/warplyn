import type { MessageId } from "../../messages.js";

export const draftSave = {
    "draftSave.failure": "No se pudo guardar. Puedes seguir editando el borrador completo.",
    "draftSave.retry": "Reintentar",
} satisfies Partial<Record<MessageId, string>>;
