import type { MessageId } from "../../messages.js";

export const errors = {
    "errors.generic": "Impossibile completare l'azione. L'articolo non è cambiato. Riprova.",
    "errors.invalidRequest": "Impossibile completare l'azione perché alcuni dati non sono validi. Controllali e riprova.",
    "errors.proposalEditInvalid": (
        "Impossibile applicare la proposta modificata. L'articolo non è cambiato. Mantieni invariati numeri, " +
        "link, codice e termini tecnici proposti e riprova. Se la proposta non è disponibile, generane una nu" +
        "ova."
    ),
    "errors.factCorrectionSelectionInvalid": (
        "Impossibile preparare correzioni perché i rilievi selezionati non sono più attuali o richiedono revi" +
        "sione. Ripeti la verifica dei fatti, poi scegli rilievi contestati o non verificabili ancora irrisol" +
        "ti."
    ),
    "errors.requestTooLarge": "Impossibile completare l'azione perché il contenuto selezionato è troppo grande. Riducilo e riprova.",
    "errors.invalidJson": "Impossibile completare l'azione perché alcuni dati non sono validi. Controllali e riprova.",
    "errors.originNotPermitted": "Impossibile completare l'azione in questa finestra. Riapri Warplyn e riprova.",
    "errors.resourceNotFound": "Impossibile trovare ciò che serve per l'azione. Aggiorna Warplyn e riprova.",
    "errors.articleNotFound": "Impossibile trovare questo articolo. Selezionane uno esistente e riprova.",
    "errors.revisionNotFound": "Impossibile trovare questa versione. Scegline un'altra e riprova.",
    "errors.revisionConflict": (
        "Impossibile salvare perché l'articolo è cambiato prima. Le ultime modifiche sono ancora nell'editor;" +
        " risolvi il conflitto e riprova."
    ),
    "errors.unsupportedPublishingProfile": "Scegli un profilo di pubblicazione supportato.",
    "errors.invalidEnvironmentVariableName": "Inserisci un nome di variabile d'ambiente con lettere maiuscole, numeri e trattini bassi.",
    "errors.environmentVariableUnavailable": "La variabile {environmentVariableName} non è disponibile. Aggiungila e riprova.",
    "errors.aiConnectionNotFound": "Impossibile trovare questa connessione IA. Scegline un'altra e riprova.",
    "errors.duplicateStyleCorpusItem": "Questo testo è già nel corpus di stile.",
    "errors.activeConnectionRequired": "Aggiungi e seleziona prima una connessione IA.",
    "errors.activeConnectionRemovalBlocked": "Scegli un'altra connessione IA attiva prima di rimuovere questa.",
    "errors.aiConnectionVerificationFailed": "Il provider IA non ha potuto verificare la connessione. Controlla la variabile e la chiave, poi riprova.",
    "errors.managedCredentialsUnavailable": "L'archivio credenziali sicuro non è disponibile su questo dispositivo. Scegli Variabile d'ambiente.",
    "errors.managedCredentialMissing": (
        "Questa connessione non ha una chiave API in Warplyn. Aggiungi una nuova connessione con chiave API e" +
        " selezionala per i modelli, poi rimuovi questa vecchia connessione."
    ),
    "errors.styleCorpusRequired": "Aggiungi almeno un elemento al corpus prima di verificare lo stile.",
    "errors.targetLanguageRequired": "Scegli una lingua di destinazione prima di chiedere una traduzione.",
    "errors.editorialOperationUnsupported": "Questa azione assistita dall'IA non è disponibile. Scegline un'altra.",
    "errors.editorialConfigurationMissing": "Impossibile avviare questa azione assistita dall'IA. Scegli un modello compatibile nelle Impostazioni e riprova.",
    "errors.editorialProviderFailed": (
        "Impossibile completare questa azione assistita dall'IA. L'articolo non è cambiato. Riprova o control" +
        "la la connessione IA nelle Impostazioni."
    ),
    "errors.editorialStreamIncomplete": "Impossibile completare questa azione assistita dall'IA. L'articolo non è cambiato. Riprova.",
    "errors.editorialRequestFailed": (
        "Impossibile completare questa azione assistita dall'IA. L'articolo non è cambiato. Riprova o control" +
        "la la connessione IA nelle Impostazioni."
    ),
    "errors.invalidKeyBinding": "Inserisci una scorciatoia completa con un tasto non modificatore.",
    "errors.keyBindingConflict": "Scegli una scorciatoia non ancora assegnata.",
    "errors.assistantSkillUnsupported": "Questa azione dell'assistente non è disponibile. Scegline un'altra.",
    "errors.assistantSkillScopeIncompatible": "Questa azione dell'assistente non può usare la selezione. Cambiala e riprova.",
    "errors.assistantSelectionInvalid": "Questa selezione non può essere usata per l'azione dell'assistente. Cambiala e riprova.",
    "errors.assistantRequestConflict": "Questa azione dell'assistente è già in corso. Attendi che finisca prima di riprovare.",
    "errors.assistantCheckpointConflict": "La conversazione dell'assistente è cambiata. Rivedi i dettagli aggiornati del ripristino e riprova.",
    "errors.assistantCheckpointInvalid": "Questo checkpoint della conversazione non è più disponibile. Scegli un altro messaggio dell'autore.",
    "errors.assistantEditConflict": "L'articolo o la bozza è cambiato. Salva o risolvi il lavoro attuale e chiedi una nuova modifica.",
    "errors.assistantEditInvalid": (
        "L'assistente non ha prodotto una sostituzione sicura. L'articolo non è cambiato. Prova una selezione" +
        " più piccola o un'istruzione più specifica."
    ),
    "errors.assistantRetryInvalid": "Questa azione dell'assistente non può essere riprovata. Avviala di nuovo dall'assistente.",
    "errors.assistantCoordinatorFailed": "Impossibile completare questa azione dell'assistente. L'articolo non è cambiato. Riprova.",
    "errors.skillPackageConflict": (
        "Questa abilità è cambiata o il suo ID o nome è già in uso. Ricarica l'elenco, scegli un nome disponi" +
        "bile se necessario e riprova."
    ),
    "errors.skillRevisionNotFound": "Questa versione dell'abilità non è disponibile. Elenca di nuovo le versioni e scegline una esistente.",
    "errors.assistantRequestTimedOut": (
        "Questa richiesta dell'assistente ha raggiunto il limite di tempo. L'articolo non è cambiato. Riprova" +
        " o aumenta il limite nelle Impostazioni generali."
    ),
} satisfies Partial<Record<MessageId, string>>;
