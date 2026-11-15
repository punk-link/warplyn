import type { MessageId } from "../../messages.js";

export const workspace = {
    "workspace.tabs.write": "Escribir",
    "workspace.tabs.proposal": "Propuestas",
    "workspace.tabs.revisions": "Versiones guardadas",
    "workspace.tabs.factCheck": "Verificación de datos",
    "workspace.tabs.styleProfile": "Perfil de estilo",
    "workspace.tabs.translations": "Traducciones",
    "workspace.tabs.ariaLabel": "Vistas del espacio de trabajo del artículo",
    "workspace.badges.review": "Revisar",
    "workspace.badges.stale": "Desactualizado",
    "workspace.badges.findings": "{count, plural, =0 {Sin observaciones} one {# observación} other {# observaciones}}",
    "workspace.badges.ready": "Listo",
    "workspace.badges.nearLimit": "Cerca del límite",
    "workspace.badges.overLimit": "Límite superado",
    "workspace.loadingArticles": "Cargando tus artículos locales…",
    "workspace.serviceUnavailable": "El servicio local no está disponible. Inícialo y reintenta.",
    "workspace.aiConnectionRequired": "Puedes escribir localmente. Configura un modelo para usar el asistente.",
    "workspace.addModelKey": "Añadir clave de modelo",
    "workspace.aiConnectionCapabilities": (
        "Puedes seguir escribiendo, guardando, organizando y copiando artículos, y revisar la tipografía " +
        "localmente. Las solicitudes al asistente, traducciones, verificaciones de datos y revisiones de " +
        "estilo completas necesitan una conexión de modelo configurada, incluido un modelo local compatible."
    ),
    "workspace.saveFailed": "No se pudo guardar este borrador. Los últimos cambios siguen en el editor. Intenta guardarlos de nuevo.",
    "workspace.revisionHistoryFailed": "No se pudo cargar el historial de versiones. El artículo no ha cambiado. Recarga e inténtalo de nuevo.",
    "workspace.createArticleFailed": "No se pudo crear este artículo. Inténtalo de nuevo.",
    "workspace.updateArticleFailed": "No se pudo actualizar este artículo. Los últimos cambios siguen en el editor. Inténtalo de nuevo.",
    "workspace.renameArticleFailed": "No se pudo cambiar el título del artículo. El título anterior sigue guardado. Inténtalo de nuevo.",
    "workspace.deleteArticleFailed": "No se pudo eliminar este artículo. Sigue disponible. Inténtalo de nuevo.",
    "workspace.restoreRevisionFailed": "No se pudo restaurar esa versión. El artículo no ha cambiado. Inténtalo de nuevo.",
    "workspace.styleCorpusLoadFailed": "No se pudo cargar el perfil de estilo. Recarga e inténtalo de nuevo.",
    "workspace.styleCorpusAddFailed": "No se pudo añadir ese texto al perfil de estilo. El perfil no ha cambiado. Inténtalo de nuevo.",
    "workspace.styleCorpusRemoveFailed": "No se pudo eliminar ese texto del perfil de estilo. El perfil no ha cambiado. Inténtalo de nuevo.",
    "workspace.styleCorpusUpdateFailed": "No se pudo actualizar el perfil de estilo. El perfil anterior sigue guardado. Inténtalo de nuevo.",
    "workspace.styleCorpusRebuildFailed": "No se pudo reconstruir el perfil de estilo. El perfil anterior sigue disponible. Inténtalo de nuevo.",
    "workspace.styleRulesLoadFailed": "No se pudieron cargar las reglas del perfil de estilo. Recarga e inténtalo de nuevo.",
    "workspace.styleRulesSaveFailed": (
        "No se pudieron guardar las reglas del perfil de estilo. Las reglas anteriores siguen guardadas. " +
        "Inténtalo de nuevo."
    ),
    "workspace.styleCorpusSnapshotFailed": "No se pudo añadir esa versión al perfil de estilo. El perfil no ha cambiado. Inténtalo de nuevo.",
    "workspace.resolveFindingFailed": "No se pudo actualizar esa observación. El artículo no ha cambiado. Inténtalo de nuevo.",
    "workspace.createTranslationFailed": "No se pudo crear este artículo de traducción. El artículo original no ha cambiado. Inténtalo de nuevo.",
    "workspace.acceptProposalFailed": "No se pudo aceptar esta propuesta. El artículo no ha cambiado. Inténtalo de nuevo.",
} satisfies Partial<Record<MessageId, string>>;
