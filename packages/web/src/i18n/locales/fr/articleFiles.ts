import type { MessageId } from "../../messages.js";

export const articleFilesMessages = {
    "articleFiles.save": "Enregistrer dans un fichier",
    "articleFiles.load": "Charger depuis un fichier",
    "articleFiles.menuSave": "Enregistrer dans un fichier…",
    "articleFiles.menuLoad": "Charger depuis un fichier…",
    "articleFiles.saved": "Article enregistré dans un fichier",
    "articleFiles.downloadStarted": "Téléchargement de l’article lancé",
    "articleFiles.loaded": "Article chargé depuis un fichier",
    "articleFiles.loadFailed": "Impossible de charger l’article. Choisissez un fichier Markdown, HTML, DOCX ou RTF lisible et réessayez.",
    "articleFiles.saveFailed": "Impossible d’enregistrer l’article dans un fichier. Choisissez un emplacement accessible en écriture et réessayez.",
    "articleFiles.invalid": "Choisissez un fichier .md, .html, .docx ou .rtf valide. Les fichiers Markdown et HTML doivent utiliser UTF-8.",
    "articleFiles.format": "Format du fichier",
    "articleFiles.formatMarkdown": "Markdown (.md)",
    "articleFiles.formatHtml": "HTML (.html)",
    "articleFiles.formatDocx": "Word (.docx)",
    "articleFiles.formatRtf": "Texte enrichi (.rtf)",
    "articleFiles.review": "Vérifier l’article importé",
    "articleFiles.layoutWarning": (
        "Les paragraphes, les listes et la mise en forme de base sont conservés. La mise en page et les " +
        "tableaux sont simplifiés. Les images, les commentaires et les objets intégrés sont omis. Vérifiez " +
        "l’article converti avant de l’importer."
    ),
    "articleFiles.import": "Importer",
    "articleFiles.download": "Télécharger",
    "articleFiles.tooLarge": (
        "Ce fichier d’article dépasse la limite de 10 Mio. Choisissez un fichier plus petit ou raccourcissez " +
        "l’article avant de l’enregistrer."
    ),
} satisfies Partial<Record<MessageId, string>>;
