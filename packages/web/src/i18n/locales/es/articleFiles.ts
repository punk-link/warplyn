import type { MessageId } from "../../messages.js";

export const articleFiles = {
    "articleFiles.save": "Guardar en un archivo",
    "articleFiles.load": "Cargar desde un archivo",
    "articleFiles.menuSave": "Guardar en un archivo…",
    "articleFiles.menuLoad": "Cargar desde un archivo…",
    "articleFiles.saved": "Artículo guardado en un archivo",
    "articleFiles.downloadStarted": "Descarga del artículo iniciada",
    "articleFiles.loaded": "Artículo cargado desde un archivo",
    "articleFiles.loadFailed": "No se pudo cargar el artículo. Elige un archivo Markdown, HTML, DOCX o RTF que se pueda leer e inténtalo de nuevo.",
    "articleFiles.saveFailed": "No se pudo guardar el artículo en un archivo. Elige una ubicación con permiso de escritura e inténtalo de nuevo.",
    "articleFiles.invalid": "Elige un archivo .md, .html, .docx o .rtf válido. Los archivos Markdown y HTML deben usar UTF-8.",
    "articleFiles.format": "Formato de archivo",
    "articleFiles.formatMarkdown": "Markdown (.md)",
    "articleFiles.formatHtml": "HTML (.html)",
    "articleFiles.formatDocx": "Word (.docx)",
    "articleFiles.formatRtf": "Texto enriquecido (.rtf)",
    "articleFiles.review": "Revisar el artículo importado",
    "articleFiles.layoutWarning": (
        "Se conservan los párrafos, las listas y el formato básico. Se simplifica el diseño de páginas y " +
        "tablas. Se omiten imágenes, comentarios y objetos incrustados. Revisa el artículo convertido antes " +
        "de importarlo."
    ),
    "articleFiles.import": "Importar",
    "articleFiles.download": "Descargar",
    "articleFiles.tooLarge": "El archivo del artículo supera el límite de 10 MiB. Elige uno más pequeño o acorta el artículo antes de guardarlo.",
} satisfies Partial<Record<MessageId, string>>;
