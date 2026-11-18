import type { MessageId } from "../../messages.js";

export const articleHeader = {
    "articleHeader.title": "Título del artículo",
    "articleHeader.rename": "Cambiar el título del artículo: {articleTitle}",
    "articleHeader.sourceLanguage": "Idioma de origen",
    "articleHeader.metadata": "Contexto del artículo",
    "articleHeader.saveRevision": "Guardar versión",
    "articleHeader.focusMode": "Modo concentración",
    "articleHeader.leaveFocusMode": "Salir del modo concentración",
    "articleHeader.deleteArticle": "Eliminar artículo",
    "articleHeader.deleteConfirmationTitle": "¿Eliminar artículo?",
    "articleHeader.deleteConfirmationDescription": (
        "¿Eliminar «{articleTitle}» y todas sus versiones guardadas y borradores recuperables? Esta acción no " +
        "se puede deshacer."
    ),
    "articleHeader.deleteGroupConfirmationDescription": (
        "¿Eliminar {count, plural, one {«{articleTitle}» (1 artículo)} other {«{articleTitle}» y # artículos, " +
        "incluidas las traducciones}}, con todos los borradores e historiales de versiones afectados? Esta " +
        "acción no se puede deshacer."
    ),
    "articleHeader.archiveArticle": "Archivar artículo",
    "articleHeader.archived": "Archivado",
    "articleHeader.unarchiveArticle": "Desarchivar artículo",
    "articleHeader.confirmDeleteArticle": "Eliminar artículo",
    "articleHeader.workflow": "Flujo editorial sugerido",
    "articleHeader.talkingPoints": "Ideas principales",
    "articleHeader.narrative": "Borrador narrativo",
    "articleHeader.authorEdit": "Edición del autor",
    "articleHeader.flow": "Fluidez y claridad",
    "articleHeader.facts": "Verificación de datos",
    "articleHeader.style": "Revisión de estilo",
    "articleHeader.translate": "Traducción",
    "articleHeader.copy": "Copiar",
    "articleHeader.copied": "Copiado",
    "articleHeader.copyFailed": "No se pudo copiar",
    "articleHeader.copyOptions": "Opciones de copia",
    "articleHeader.copyMarkdown": "Copiar Markdown",
    "articleHeader.copyPlainText": "Copiar texto sin formato",
} satisfies Partial<Record<MessageId, string>>;
