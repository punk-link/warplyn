import type { MessageId } from "../../messages.js";


export const articleMessages = {
    "article.defaultTitle": "Unbenannter Artikel",
    "article.titleContextRequired": "Fügen Sie weitere Details hinzu und speichern Sie eine weitere Fassung, oder benennen Sie den Artikel selbst um.",
    "article.titleGenerationFailed": "Fassung ohne Artikeltitel gespeichert",
    "article.titleGenerationNextStep": (
        "Benennen Sie den Artikel selbst um, oder prüfen Sie das Textgenerierungsmodell in den Einstellungen und speich" +
        "ern Sie eine weitere Fassung."
    ),
} satisfies Partial<Record<MessageId, string>>;
