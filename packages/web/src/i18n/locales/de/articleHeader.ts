import type { MessageId } from "../../messages.js";

export const articleHeaderMessages = {
    "articleHeader.title": "Artikeltitel",
    "articleHeader.rename": "Artikel umbenennen: {articleTitle}",
    "articleHeader.sourceLanguage": "Ausgangssprache",
    "articleHeader.metadata": "Artikelkontext",
    "articleHeader.saveRevision": "Fassung speichern",
    "articleHeader.focusMode": "Fokusmodus",
    "articleHeader.leaveFocusMode": "Fokusmodus verlassen",
    "articleHeader.deleteArticle": "Artikel löschen",
    "articleHeader.deleteConfirmationTitle": "Artikel löschen?",
    "articleHeader.deleteConfirmationDescription": (
        "„{articleTitle}“ und alle gespeicherten Fassungen und wiederherstellbaren Entwürfe löschen? Dies " +
        "kann nicht rückgängig gemacht werden."
    ),
    "articleHeader.deleteGroupConfirmationDescription": (
        "{count, plural, one {„{articleTitle}“ (1 Artikel)} other {„{articleTitle}“ und # Artikel " +
        "einschließlich Übersetzungen}} mit allen betroffenen Entwürfen und dem Fassungsverlauf löschen? Dies " +
        "kann nicht rückgängig gemacht werden."
    ),
    "articleHeader.archiveArticle": "Artikel archivieren",
    "articleHeader.archived": "Archiviert",
    "articleHeader.unarchiveArticle": "Artikel aus Archiv holen",
    "articleHeader.confirmDeleteArticle": "Artikel löschen",
    "articleHeader.workflow": "Vorgeschlagener redaktioneller Ablauf",
    "articleHeader.talkingPoints": "Kernpunkte",
    "articleHeader.narrative": "Erzählentwurf",
    "articleHeader.authorEdit": "Bearbeitung durch den Autor",
    "articleHeader.flow": "Lesefluss und Klarheit",
    "articleHeader.facts": "Faktenprüfung",
    "articleHeader.style": "Stilprüfung",
    "articleHeader.translate": "Übersetzung",
    "articleHeader.copy": "Kopieren",
    "articleHeader.copied": "Kopiert",
    "articleHeader.copyFailed": "Kopieren fehlgeschlagen",
    "articleHeader.copyOptions": "Kopieroptionen",
    "articleHeader.copyMarkdown": "Markdown kopieren",
    "articleHeader.copyPlainText": "Klartext kopieren",
} satisfies Partial<Record<MessageId, string>>;
