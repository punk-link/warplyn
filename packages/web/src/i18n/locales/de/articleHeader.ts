import type { MessageId } from "../../messages.js";


export const articleHeaderMessages = {
    "articleHeader.archiveArticle": "Artikel archivieren",
    "articleHeader.archived": "Archiviert",
    "articleHeader.authorEdit": "Bearbeitung durch den Autor",
    "articleHeader.confirmDeleteArticle": "Artikel löschen",
    "articleHeader.copied": "Kopiert",
    "articleHeader.copy": "Kopieren",
    "articleHeader.copyFailed": "Kopieren fehlgeschlagen",
    "articleHeader.copyMarkdown": "Markdown kopieren",
    "articleHeader.copyOptions": "Kopieroptionen",
    "articleHeader.copyPlainText": "Klartext kopieren",
    "articleHeader.deleteArticle": "Artikel löschen",
    "articleHeader.deleteConfirmationDescription": (
        "„{articleTitle}“ und alle gespeicherten Fassungen und wiederherstellbaren Entwürfe löschen? Dies kann nicht rü" +
        "ckgängig gemacht werden."
    ),
    "articleHeader.deleteConfirmationTitle": "Artikel löschen?",
    "articleHeader.deleteGroupConfirmationDescription": (
        "{count, plural, one {„{articleTitle}“ (1 Artikel)} other {„{articleTitle}“ und # Artikel einschließl" +
        "ich Übersetzungen}} mit allen betroffenen Entwürfen und dem Fassungsverlauf löschen? Dies kann nicht" +
        " rückgängig gemacht werden."
    ),
    "articleHeader.facts": "Faktenprüfung",
    "articleHeader.flow": "Lesefluss und Klarheit",
    "articleHeader.focusMode": "Fokusmodus",
    "articleHeader.leaveFocusMode": "Fokusmodus verlassen",
    "articleHeader.metadata": "Artikelkontext",
    "articleHeader.narrative": "Erzählentwurf",
    "articleHeader.rename": "Artikel umbenennen: {articleTitle}",
    "articleHeader.saveRevision": "Fassung speichern",
    "articleHeader.sourceLanguage": "Ausgangssprache",
    "articleHeader.style": "Stilprüfung",
    "articleHeader.talkingPoints": "Kernpunkte",
    "articleHeader.title": "Artikeltitel",
    "articleHeader.translate": "Übersetzung",
    "articleHeader.unarchiveArticle": "Artikel aus Archiv holen",
    "articleHeader.workflow": "Vorgeschlagener redaktioneller Ablauf",
} satisfies Partial<Record<MessageId, string>>;
