import type { MessageId } from "../../messages.js";


export const notesMessages = {
    "notes.discardPrompt": "¿Descartar los cambios sin guardar de la nota?",
    "notes.discardChanges": "Descartar cambios",
    "notes.add": "Añadir nota editorial…",
    "notes.count": "Notas editoriales{separator}{count}",
    "notes.detached": "Necesita vincularse de nuevo",
    "notes.edit": "Editar nota…",
    "notes.empty": "Aún no hay notas editoriales.",
    "notes.failed": "No se pudo actualizar la nota. Conserva tus indicaciones, vuelve a abrir el artículo e inténtalo de nuevo.",
    "notes.guidance": "Indicaciones para el Asistente",
    "notes.help": "Las notas adjuntas orientan al Asistente al trabajar en esos pasajes. Se guardan por separado del texto del artículo.",
    "notes.included": "Notas que acompañan esta solicitud",
    "notes.marker": "Nota editorial {number}",
    "notes.markers": "Notas editoriales {numbers}",
    "notes.reattach": "Adjuntar al texto seleccionado",
    "notes.reattachHelp": "Selecciona el nuevo pasaje en el editor y vuelve a abrir esta nota para adjuntarla.",
    "notes.remove": "Eliminar nota",
    "notes.save": "Guardar nota",
    "notes.select": "Selecciona texto para adjuntar una nota.",
    "notes.title": "Notas editoriales",
} satisfies Partial<Record<MessageId, string>>;
