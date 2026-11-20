import type { MessageId } from "../../messages.js";


export const revisionsMessages = {
    "revisions.acceptedProposal": "Zaakceptowana propozycja",
    "revisions.articleContent": "Zapisana treść artykułu",
    "revisions.assistantEdit": "Edycja asystenta",
    "revisions.author": "Wersja autora",
    "revisions.characterCount": "{count} znaków",
    "revisions.count": "{count, plural, =0 {Brak zapisanych wersji} one {# zapisana wersja} few {# zapisane wersje} other {# zapisanych wersji}}",
    "revisions.current": "Obecna",
    "revisions.currentExplanation": "To jest obecna wersja.",
    "revisions.currentRevision": "Obecna wersja",
    "revisions.empty": "Pusta wersja",
    "revisions.emptyContent": "Ta wersja nie zawiera zapisanego tekstu artykułu.",
    "revisions.heading": "Historia wersji",
    "revisions.historyNavigation": "Historia wersji",
    "revisions.inactive": "Nieaktywna",
    "revisions.initial": "Wersja początkowa",
    "revisions.restore": "Przywróć tę wersję",
    "revisions.restored": "Przywrócona wersja",
    "revisions.restoredFromEarlier": "Przywrócono z wcześniejszej wersji",
    "revisions.restoredTarget": "Przywrócona wersja nr {number}",
    "revisions.restoredTargetDescribed": "Przywrócona wersja nr {number}: {description}",
    "revisions.revision": "Zapisana wersja",
    "revisions.saved": "Zapisana wersja",
    "revisions.select": "Wybierz zapisaną wersję",
} satisfies Partial<Record<MessageId, string>>;
