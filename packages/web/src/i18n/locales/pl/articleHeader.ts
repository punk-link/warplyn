import type { MessageId } from "../../messages.js";

export const articleHeader = {
    "articleHeader.title": "Tytuł artykułu",
    "articleHeader.rename": "Zmień tytuł artykułu: {articleTitle}",
    "articleHeader.sourceLanguage": "Język źródłowy",
    "articleHeader.metadata": "Kontekst artykułu",
    "articleHeader.saveRevision": "Zapisz wersję",
    "articleHeader.focusMode": "Tryb skupienia",
    "articleHeader.leaveFocusMode": "Wyjdź z trybu skupienia",
    "articleHeader.deleteArticle": "Usuń artykuł",
    "articleHeader.deleteConfirmationTitle": "Usunąć artykuł?",
    "articleHeader.deleteConfirmationDescription": (
        "Usunąć „{articleTitle}” oraz wszystkie zapisane wersje i możliwe do odzyskania szkice? Nie można teg" +
        "o cofnąć."
    ),
    "articleHeader.deleteGroupConfirmationDescription": (
        "Usunąć {count, plural, one {„{articleTitle}” (1 artykuł)} other {„{articleTitle}” i # artykułów, w t" +
        "ym tłumaczenia}}, wraz ze wszystkimi powiązanymi szkicami i historią wersji? Nie można tego cofnąć."
    ),
    "articleHeader.archiveArticle": "Archiwizuj artykuł",
    "articleHeader.archived": "Zarchiwizowany",
    "articleHeader.unarchiveArticle": "Przywróć artykuł z archiwum",
    "articleHeader.confirmDeleteArticle": "Usuń artykuł",
    "articleHeader.workflow": "Sugerowany tok pracy redakcyjnej",
    "articleHeader.talkingPoints": "Główne punkty",
    "articleHeader.narrative": "Szkic narracyjny",
    "articleHeader.authorEdit": "Edycja autora",
    "articleHeader.flow": "Płynność i jasność",
    "articleHeader.facts": "Weryfikacja faktów",
    "articleHeader.style": "Przegląd stylu",
    "articleHeader.translate": "Tłumaczenie",
    "articleHeader.copy": "Kopiuj",
    "articleHeader.copied": "Skopiowano",
    "articleHeader.copyFailed": "Kopiowanie nie powiodło się",
    "articleHeader.copyOptions": "Opcje kopiowania",
    "articleHeader.copyMarkdown": "Kopiuj Markdown",
    "articleHeader.copyPlainText": "Kopiuj zwykły tekst",
} satisfies Partial<Record<MessageId, string>>;
