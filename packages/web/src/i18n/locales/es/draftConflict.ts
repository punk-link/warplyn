import type { MessageId } from "../../messages.js";

export const draftConflict = {
    "draftConflict.banner": "Otra sesión de Warplyn modificó este artículo. Se conserva el borrador local; compáralo antes de continuar.",
    "draftConflict.compare": "Comparar y resolver",
    "draftConflict.heading": "Resolver conflicto del borrador",
    "draftConflict.description": (
        "Tu borrador local conservado aparece junto al contenido guardado más reciente. Nada se sustituye " +
        "hasta que lo elijas."
    ),
    "draftConflict.cancel": "Cancelar",
    "draftConflict.keepMine": "Conservar mi borrador",
    "draftConflict.useDraft": "Usar el último borrador",
    "draftConflict.useRevision": "Usar la última versión guardada",
    "draftConflict.confirmDraft": "¿Sustituir el texto local conservado por el último borrador persistido?",
    "draftConflict.confirmRevision": "¿Descartar el borrador persistido y sustituir el texto local conservado por la última versión guardada?",
} satisfies Partial<Record<MessageId, string>>;
