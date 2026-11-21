import type { MessageId } from "../../messages.js";


export const articleHeaderMessages = {
    "articleHeader.archiveArticle": "Archiwizuj artykuł",
    "articleHeader.archived": "Zarchiwizowany",
    "articleHeader.authorEdit": "Edycja autora",
    "articleHeader.confirmDeleteArticle": "Usuń artykuł",
    "articleHeader.copied": "Skopiowano",
    "articleHeader.copy": "Kopiuj",
    "articleHeader.copyFailed": "Kopiowanie nie powiodło się",
    "articleHeader.copyMarkdown": "Kopiuj Markdown",
    "articleHeader.copyOptions": "Opcje kopiowania",
    "articleHeader.copyPlainText": "Kopiuj zwykły tekst",
    "articleHeader.deleteArticle": "Usuń artykuł",
    "articleHeader.deleteConfirmationDescription": (
        "Usunąć „{articleTitle}” oraz wszystkie zapisane wersje i możliwe do odzyskania szkice? Nie można tego cofnąć."
    ),
    "articleHeader.deleteConfirmationTitle": "Usunąć artykuł?",
    "articleHeader.deleteGroupConfirmationDescription": (
        "Usunąć {count, plural, one {„{articleTitle}” (1 artykuł)} other {„{articleTitle}” i # artykułów, w t" +
        "ym tłumaczenia}}, wraz ze wszystkimi powiązanymi szkicami i historią wersji? Nie można tego cofnąć."
    ),
    "articleHeader.facts": "Weryfikacja faktów",
    "articleHeader.flow": "Płynność i jasność",
    "articleHeader.focusMode": "Tryb skupienia",
    "articleHeader.leaveFocusMode": "Wyjdź z trybu skupienia",
    "articleHeader.metadata": "Kontekst artykułu",
    "articleHeader.narrative": "Szkic narracyjny",
    "articleHeader.rename": "Zmień tytuł artykułu: {articleTitle}",
    "articleHeader.saveRevision": "Zapisz wersję",
    "articleHeader.sourceLanguage": "Język źródłowy",
    "articleHeader.style": "Przegląd stylu",
    "articleHeader.talkingPoints": "Główne punkty",
    "articleHeader.title": "Tytuł artykułu",
    "articleHeader.translate": "Tłumaczenie",
    "articleHeader.unarchiveArticle": "Przywróć artykuł z archiwum",
    "articleHeader.workflow": "Sugerowany tok pracy redakcyjnej",
} satisfies Partial<Record<MessageId, string>>;
