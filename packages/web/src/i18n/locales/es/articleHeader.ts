import type { MessageId } from "../../messages.js";


export const articleHeaderMessages = {
    "articleHeader.archiveArticle": "Archivar artículo",
    "articleHeader.archived": "Archivado",
    "articleHeader.authorEdit": "Edición del autor",
    "articleHeader.confirmDeleteArticle": "Eliminar artículo",
    "articleHeader.copied": "Copiado",
    "articleHeader.copy": "Copiar",
    "articleHeader.copyFailed": "No se pudo copiar",
    "articleHeader.copyMarkdown": "Copiar Markdown",
    "articleHeader.copyOptions": "Opciones de copia",
    "articleHeader.copyPlainText": "Copiar texto sin formato",
    "articleHeader.deleteArticle": "Eliminar artículo",
    "articleHeader.deleteConfirmationDescription": (
        "¿Eliminar «{articleTitle}» y todas sus versiones guardadas y borradores recuperables? Esta acción no se puede " +
        "deshacer."
    ),
    "articleHeader.deleteConfirmationTitle": "¿Eliminar artículo?",
    "articleHeader.deleteGroupConfirmationDescription": (
        "¿Eliminar {count, plural, one {«{articleTitle}» (1 artículo)} other {«{articleTitle}» y # artículos," +
        " incluidas las traducciones}}, con todos los borradores e historiales de versiones afectados? Esta a" +
        "cción no se puede deshacer."
    ),
    "articleHeader.facts": "Verificación de datos",
    "articleHeader.flow": "Fluidez y claridad",
    "articleHeader.focusMode": "Modo concentración",
    "articleHeader.leaveFocusMode": "Salir del modo concentración",
    "articleHeader.metadata": "Contexto del artículo",
    "articleHeader.narrative": "Borrador narrativo",
    "articleHeader.rename": "Cambiar el título del artículo: {articleTitle}",
    "articleHeader.saveRevision": "Guardar versión",
    "articleHeader.sourceLanguage": "Idioma de origen",
    "articleHeader.style": "Revisión de estilo",
    "articleHeader.talkingPoints": "Ideas principales",
    "articleHeader.title": "Título del artículo",
    "articleHeader.translate": "Traducción",
    "articleHeader.unarchiveArticle": "Desarchivar artículo",
    "articleHeader.workflow": "Flujo editorial sugerido",
} satisfies Partial<Record<MessageId, string>>;
