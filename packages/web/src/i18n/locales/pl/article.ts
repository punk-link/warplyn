import type { MessageId } from "../../messages.js";


export const articleMessages = {
    "article.defaultTitle": "Artykuł bez tytułu",
    "article.titleContextRequired": "Dodaj więcej szczegółów i zapisz kolejną wersję lub samodzielnie zmień tytuł artykułu.",
    "article.titleGenerationFailed": "Zapisano wersję bez tytułu artykułu",
    "article.titleGenerationNextStep": "Samodzielnie zmień tytuł artykułu lub sprawdź Model generowania tekstu w Ustawieniach i zapisz kolejną wersję.",
} satisfies Partial<Record<MessageId, string>>;
