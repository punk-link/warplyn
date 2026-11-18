import type { MessageId } from "../../messages.js";

export const draftConflict = {
    "draftConflict.banner": "Inna sesja Warplyn zmieniła ten artykuł. Lokalny szkic został zachowany; porównaj go przed kontynuowaniem.",
    "draftConflict.compare": "Porównaj i rozwiąż",
    "draftConflict.heading": "Rozwiąż konflikt szkicu",
    "draftConflict.description": "Zachowany lokalny szkic jest widoczny obok najnowszej zapisanej treści. Nic nie zostanie zastąpione, dopóki nie wybierzesz.",
    "draftConflict.cancel": "Anuluj",
    "draftConflict.keepMine": "Zachowaj mój szkic",
    "draftConflict.useDraft": "Użyj najnowszego szkicu",
    "draftConflict.useRevision": "Użyj najnowszej zapisanej wersji",
    "draftConflict.confirmDraft": "Zastąpić zachowany lokalny tekst najnowszym utrwalonym szkicem?",
    "draftConflict.confirmRevision": "Odrzucić utrwalony szkic i zastąpić zachowany lokalny tekst najnowszą zapisaną wersją?",
} satisfies Partial<Record<MessageId, string>>;
