

export const articleFilesMessages = {
    "articleFiles.download": "Download",
    "articleFiles.downloadStarted": "Article download started",
    "articleFiles.format": "File format",
    "articleFiles.formatDocx": "Word (.docx)",
    "articleFiles.formatHtml": "HTML (.html)",
    "articleFiles.formatMarkdown": "Markdown (.md)",
    "articleFiles.formatRtf": "Rich text (.rtf)",
    "articleFiles.import": "Import",
    "articleFiles.invalid": "Choose a valid .md, .html, .docx, or .rtf file. Markdown and HTML files must use UTF-8.",
    "articleFiles.layoutWarning": (
        "Paragraphs, lists, and basic formatting are retained. Page layouts and table layouts are simplified." +
        " Images, comments, and embedded objects are omitted. Review the converted Article before importing."
    ),
    "articleFiles.load": "Load from file",
    "articleFiles.loadFailed": "Couldn't load the Article. Choose a readable Markdown, HTML, DOCX, or RTF file and try again.",
    "articleFiles.loaded": "Article loaded from file",
    "articleFiles.menuLoad": "Load from file…",
    "articleFiles.menuSave": "Save to file…",
    "articleFiles.review": "Review imported Article",
    "articleFiles.save": "Save to file",
    "articleFiles.saveFailed": "Couldn't save the Article to file. Choose a writable location and try again.",
    "articleFiles.saved": "Article saved to file",
    "articleFiles.tooLarge": "This Article file exceeds the 10 MiB limit. Choose a smaller file or shorten the Article before saving.",
} satisfies Record<string, string>;
