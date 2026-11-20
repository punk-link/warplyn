import type { MessageId } from "../../messages.js";


export const revisionsMessages = {
    "revisions.acceptedProposal": "Propuesta aceptada",
    "revisions.articleContent": "Contenido guardado del artículo",
    "revisions.assistantEdit": "Edición del asistente",
    "revisions.author": "Versión del autor",
    "revisions.characterCount": "{count} caracteres",
    "revisions.count": "{count, plural, =0 {Sin versiones guardadas} one {# versión guardada} other {# versiones guardadas}}",
    "revisions.current": "Actual",
    "revisions.currentExplanation": "Esta es la versión actual.",
    "revisions.currentRevision": "Versión actual",
    "revisions.empty": "Versión vacía",
    "revisions.emptyContent": "Esta versión no tiene texto del artículo guardado.",
    "revisions.heading": "Historial de versiones",
    "revisions.historyNavigation": "Historial de versiones",
    "revisions.inactive": "Inactiva",
    "revisions.initial": "Versión inicial",
    "revisions.restore": "Restaurar esta versión",
    "revisions.restored": "Versión restaurada",
    "revisions.restoredFromEarlier": "Restaurada desde una versión anterior",
    "revisions.restoredTarget": "Versión restaurada n.º {number}",
    "revisions.restoredTargetDescribed": "Versión restaurada n.º {number}: {description}",
    "revisions.revision": "Versión guardada",
    "revisions.saved": "Versión guardada",
    "revisions.select": "Elegir una versión guardada",
} satisfies Partial<Record<MessageId, string>>;
