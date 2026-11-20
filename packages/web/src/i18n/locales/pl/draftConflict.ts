import type { MessageId } from "../../messages.js";


export const draftConflictMessages = {
    "draftConflict.banner": "Inna sesja Warplyn zmieniła ten artykuł. Lokalny szkic został zachowany; porównaj go przed kontynuowaniem.",
    "draftConflict.cancel": "Anuluj",
    "draftConflict.compare": "Porównaj i rozwiąż",
    "draftConflict.confirmDraft": "Zastąpić zachowany lokalny tekst najnowszym utrwalonym szkicem?",
    "draftConflict.confirmRevision": "Odrzucić utrwalony szkic i zastąpić zachowany lokalny tekst najnowszą zapisaną wersją?",
    "draftConflict.description": (
        "Zachowany lokalny szkic jest widoczny obok najnowszej zapisanej treści. Nic nie zostanie zastąpione," +
        " dopóki nie wybierzesz."
    ),
    "draftConflict.heading": "Rozwiąż konflikt szkicu",
    "draftConflict.keepMine": "Zachowaj mój szkic",
    "draftConflict.useDraft": "Użyj najnowszego szkicu",
    "draftConflict.useRevision": "Użyj najnowszej zapisanej wersji",
} satisfies Partial<Record<MessageId, string>>;
