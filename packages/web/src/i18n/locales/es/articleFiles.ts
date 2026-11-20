import type { MessageId } from "../../messages.js";


export const articleFilesMessages = {
    "articleFiles.download": "Descargar",
    "articleFiles.downloadStarted": "Descarga del artículo iniciada",
    "articleFiles.format": "Formato de archivo",
    "articleFiles.formatDocx": "Word (.docx)",
    "articleFiles.formatHtml": "HTML (.html)",
    "articleFiles.formatMarkdown": "Markdown (.md)",
    "articleFiles.formatRtf": "Texto enriquecido (.rtf)",
    "articleFiles.import": "Importar",
    "articleFiles.invalid": "Elige un archivo .md, .html, .docx o .rtf válido. Los archivos Markdown y HTML deben usar UTF-8.",
    "articleFiles.layoutWarning": (
        "Se conservan los párrafos, las listas y el formato básico. Se simplifica el diseño de páginas y tabl" +
        "as. Se omiten imágenes, comentarios y objetos incrustados. Revisa el artículo convertido antes de im" +
        "portarlo."
    ),
    "articleFiles.load": "Cargar desde un archivo",
    "articleFiles.loadFailed": "No se pudo cargar el artículo. Elige un archivo Markdown, HTML, DOCX o RTF que se pueda leer e inténtalo de nuevo.",
    "articleFiles.loaded": "Artículo cargado desde un archivo",
    "articleFiles.menuLoad": "Cargar desde un archivo…",
    "articleFiles.menuSave": "Guardar en un archivo…",
    "articleFiles.review": "Revisar el artículo importado",
    "articleFiles.save": "Guardar en un archivo",
    "articleFiles.saveFailed": "No se pudo guardar el artículo en un archivo. Elige una ubicación con permiso de escritura e inténtalo de nuevo.",
    "articleFiles.saved": "Artículo guardado en un archivo",
    "articleFiles.tooLarge": "El archivo del artículo supera el límite de 10 MiB. Elige uno más pequeño o acorta el artículo antes de guardarlo.",
} satisfies Partial<Record<MessageId, string>>;
