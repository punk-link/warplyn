import type { MessageId } from "../../messages.js";

export const articleMessages = {
    "article.defaultTitle": "Unbenannter Artikel",
    "article.titleGenerationFailed": "Fassung ohne Artikeltitel gespeichert",
    "article.titleContextRequired": "Fügen Sie weitere Details hinzu und speichern Sie eine weitere Fassung, oder benennen Sie den Artikel selbst um.",
    "article.titleGenerationNextStep": (
        "Benennen Sie den Artikel selbst um, oder prüfen Sie das Textgenerierungsmodell in den Einstellungen " +
        "und speichern Sie eine weitere Fassung."
    ),
} satisfies Partial<Record<MessageId, string>>;
