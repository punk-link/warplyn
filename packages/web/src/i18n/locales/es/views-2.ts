import type { MessageId } from "../../messages.js";

export const views2 = {
    "views.translationComparison": (
        "Comparación de traducciones. Usa las flechas izquierda y derecha para llegar al contenido protegido " +
        "validado, Intro o Espacio para ver detalles y Escape para cerrarlos."
    ),
    "views.translationGenerating": "Traduciendo…",
    "views.translationGeneratingLanguages": "Traduciendo a {languages}…",
    "views.translationProtectedWarning": "Contenido protegido modificado o ausente",
    "views.translationPublishingGuidance": "Orientaciones de {profile}",
    "views.editTranslation": "Editar",
    "views.rejectTranslation": "Rechazar",
    "views.rejectTranslationTitle": "¿Rechazar esta traducción?",
    "views.rejectTranslationDescription": (
        "Esto retira de la aprobación la traducción generada a {language}. El artículo de origen y las " +
        "traducciones aceptadas no cambian."
    ),
    "views.confirmRejectTranslation": "Rechazar",
    "views.characterCount": "{count} / {limit} caracteres",
    "views.restoreHeading": "¿Restaurar versión?",
    "views.restoreDescription": "Restaurar crea una nueva versión inmutable; no reescribe el historial.",
    "views.restoreDraftDescription": (
        "Este borrador tiene cambios que no están en una versión guardada. Guárdalo primero o descártalo " +
        "antes de restaurar."
    ),
    "views.restoreRevision": "Restaurar versión",
    "views.saveAndRestore": "Guardar y restaurar",
    "views.discardDraftAndRestore": "Descartar y restaurar",
    "views.copy": "Copiar",
} satisfies Partial<Record<MessageId, string>>;
