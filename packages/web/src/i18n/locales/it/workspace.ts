import type { MessageId } from "../../messages.js";

export const workspace = {
    "workspace.loadingArticles": "Caricamento degli articoli locali…",
    "workspace.serviceUnavailable": "Il servizio locale non è disponibile. Avvialo e riprova.",
    "workspace.aiConnectionRequired": "La scrittura locale è disponibile. Configura un modello per usare l'assistente.",
    "workspace.addModelKey": "Aggiungi chiave del modello",
    "workspace.aiConnectionCapabilities": (
        "Puoi ancora scrivere, salvare, organizzare e copiare articoli e verificare la tipografia in locale. " +
        "Richieste dell'assistente, traduzioni, verifiche dei fatti e revisioni complete dello stile richiedo" +
        "no una connessione a un modello configurata, anche un modello locale supportato."
    ),
    "workspace.saveFailed": "Impossibile salvare questa bozza. Le ultime modifiche sono ancora nell'editor. Prova a salvare di nuovo.",
    "workspace.revisionHistoryFailed": "Impossibile caricare la cronologia delle versioni. L'articolo non è cambiato. Aggiorna e riprova.",
    "workspace.createArticleFailed": "Impossibile creare questo articolo. Riprova.",
    "workspace.updateArticleFailed": "Impossibile aggiornare questo articolo. Le ultime modifiche sono ancora nell'editor. Riprova.",
    "workspace.renameArticleFailed": "Impossibile rinominare questo articolo. Il titolo precedente è ancora salvato. Riprova.",
    "workspace.deleteArticleFailed": "Impossibile eliminare questo articolo. È ancora disponibile. Riprova.",
    "workspace.restoreRevisionFailed": "Impossibile ripristinare questa versione. L'articolo non è cambiato. Riprova.",
    "workspace.styleCorpusLoadFailed": "Impossibile caricare il Profilo di stile. Aggiorna e riprova.",
    "workspace.styleCorpusAddFailed": "Impossibile aggiungere questo testo al Profilo di stile. Il profilo non è cambiato. Riprova.",
    "workspace.styleCorpusRemoveFailed": "Impossibile rimuovere questo testo dal Profilo di stile. Il profilo non è cambiato. Riprova.",
    "workspace.styleCorpusUpdateFailed": "Impossibile aggiornare il Profilo di stile. Il profilo precedente è ancora salvato. Riprova.",
    "workspace.styleCorpusRebuildFailed": "Impossibile ricostruire il Profilo di stile. Il profilo precedente è ancora disponibile. Riprova.",
    "workspace.styleRulesLoadFailed": "Impossibile caricare le regole del Profilo di stile. Aggiorna e riprova.",
    "workspace.styleRulesSaveFailed": "Impossibile salvare le regole del Profilo di stile. Le regole precedenti sono ancora salvate. Riprova.",
    "workspace.styleCorpusSnapshotFailed": "Impossibile aggiungere questa versione al Profilo di stile. Il profilo non è cambiato. Riprova.",
    "workspace.resolveFindingFailed": "Impossibile aggiornare questo rilievo. L'articolo non è cambiato. Riprova.",
    "workspace.createTranslationFailed": "Impossibile creare questo articolo di traduzione. L'originale non è cambiato. Riprova.",
    "workspace.acceptProposalFailed": "Impossibile accettare questa proposta. L'articolo non è cambiato. Riprova.",
    "workspace.tabs.write": "Scrivi",
    "workspace.tabs.proposal": "Proposte",
    "workspace.tabs.revisions": "Versioni salvate",
    "workspace.tabs.factCheck": "Verifica dei fatti",
    "workspace.tabs.styleProfile": "Profilo di stile",
    "workspace.tabs.translations": "Traduzioni",
    "workspace.tabs.ariaLabel": "Viste dell'area di lavoro dell'articolo",
    "workspace.badges.review": "Da rivedere",
    "workspace.badges.stale": "Non aggiornato",
    "workspace.badges.findings": "{count, plural, =0 {Nessun rilievo} one {# rilievo} other {# rilievi}}",
    "workspace.badges.ready": "Pronto",
    "workspace.badges.nearLimit": "Vicino al limite",
    "workspace.badges.overLimit": "Limite superato",
} satisfies Partial<Record<MessageId, string>>;
