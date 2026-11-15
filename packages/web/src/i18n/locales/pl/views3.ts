import type { MessageId } from "../../messages.js";

export const views3 = {
    "views.rejectProposal": "Odrzuć propozycję",
    "views.styleProfile": "Profil stylu",
    "views.styleIntro": "Lokalny korpus stylu nigdy nie jest wysyłany w całości; używany jest tylko wyznaczony z niego profil.",
    "views.remove": "Usuń",
    "views.sampleName": "Nazwa próbki",
    "views.writingSample": "Próbka pisania",
    "views.addToCorpus": "Dodaj do korpusu",
    "views.updateSuggestionPrompt": "Prepare an updated Proposal for the current Article based on the earlier suggestion. Do not apply changes.",
} satisfies Partial<Record<MessageId, string>>;
