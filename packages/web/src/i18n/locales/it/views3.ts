import type { MessageId } from "../../messages.js";

export const views3 = {
    "views.rejectProposal": "Rifiuta proposta",
    "views.styleProfile": "Profilo di stile",
    "views.styleIntro": "Il corpus di stile locale non viene mai inviato per intero; si usa solo il profilo derivato.",
    "views.remove": "Rimuovi",
    "views.sampleName": "Nome del campione",
    "views.writingSample": "Campione di scrittura",
    "views.addToCorpus": "Aggiungi al corpus",
    "views.updateSuggestionPrompt": "Prepare an updated Proposal for the current Article based on the earlier suggestion. Do not apply changes.",
} satisfies Partial<Record<MessageId, string>>;
