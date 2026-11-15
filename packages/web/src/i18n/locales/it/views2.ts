import type { MessageId } from "../../messages.js";

export const views2 = {
    "views.factCheckStale": "Questi rilievi appartengono a una versione precedente. Restano leggibili, ma non creare correzioni finché non ripeti la verifica.",
    "views.factCheckRunningPrevious": (
        "{count, plural, =0 {L'assistente sta cercando affermazioni da verificare.} one {L'assistente sta ver" +
        "ificando # affermazione.} other {L'assistente sta verificando # affermazioni.}} Questi sono i riliev" +
        "i dell'ultima verifica completata e si aggiorneranno quando terminerà la nuova."
    ),
    "views.factCheckRunningEmpty": (
        "{count, plural, =0 {L'assistente sta cercando affermazioni da verificare.} one {L'assistente sta ver" +
        "ificando # affermazione.} other {L'assistente sta verificando # affermazioni.}} I rilievi compariran" +
        "no qui al termine."
    ),
    "views.factCheckHistorical": "Questa verifica precedente è di sola lettura. L'ultima verifica per questa versione resta utilizzabile.",
    "views.factCheckIncomplete": "Questa verifica è incompleta. Sono mostrati solo i rilievi completati. Ripetila per verificare le affermazioni restanti.",
    "views.runFactCheckAgain": "Ripeti verifica dei fatti",
    "views.selectAllNeedingReview": "Seleziona tutti quelli da rivedere",
    "views.proposeFactCorrections": "Proponi correzioni ({count})",
    "views.proposeFactCorrection": "Proponi correzione",
    "views.factCheckFindings": "Rilievi di verifica dei fatti",
    "views.factStatus.supported": "Supportata",
    "views.factStatus.disputed": "Contestata",
    "views.factStatus.unverifiable": "Non verificabile",
    "views.factImportance": "Importanza {importance}",
    "views.factEvidenceReused": "Prove riutilizzate dalla versione {revision}.",
    "views.factCheckedAt": "Verificata il {dateTime}.",
    "views.acceptFactAsWritten": "Accetta così com'è",
    "views.acceptFactEvidence": "Accetta prove",
    "views.factResolution": "Risoluzione: {resolution}",
    "views.factResolution.accepted_as_written": "Accettata così com'è",
    "views.factResolution.evidence_accepted": "Prove accettate",
    "views.factResolution.corrected_or_removed": "Corretta o rimossa",
    "views.uncertainty": "Incertezza: {value}",
    "views.proposalReview": "Revisione della proposta",
    "views.continueWriting": "Continua a scrivere",
    "views.resumeReview": "Riprendi revisione",
    "views.earlierSuggestion": "Suggerimento precedente",
    "views.earlierSuggestionHelp": "L'articolo è cambiato da quando è stato creato questo suggerimento.",
    "views.updateSuggestion": "Aggiorna suggerimento",
    "views.proposalEmptyTitle": "Nessuna proposta da rivedere",
    "views.proposalEmpty": "Usa l'assistente editoriale per generare una proposta. Non cambierà mai l'articolo automaticamente.",
    "views.proposalStale": (
        "Questa proposta non è aggiornata perché l'articolo ha una versione più recente. Genera una nuova pro" +
        "posta prima di accettare modifiche."
    ),
    "views.proposalAccepted": "Questa proposta è stata accettata. Le decisioni sono di sola lettura.",
    "views.proposalCounts": (
        "{total, plural, =0 {Nessun suggerimento} one {# suggerimento} other {# suggerimenti}}{separator}{pending, pl" +
        "ural, =0 {Nessuno in attesa} one {# in attesa} other {# in attesa}}{separator}{accepted, plural, =0 {Nessuno" +
        " accettato} one {# accettato} other {# accettati}}{separator}{rejected, plural, =0 {Nessuno rifiutato} one {" +
        "# rifiutato} other {# rifiutati}}"
    ),
    "views.proposalWhole": "Proposta completa{separator}{changes, plural, one {# modifica} other {# modifiche}}",
    "views.acceptAll": "Segna tutto come accettato",
    "views.setAllDecisions": "Decisioni…",
    "views.resetAllDecisions": "Reimposta decisioni",
    "views.applyProposal": "Applica",
    "views.proposedChangeInput": "Testo proposto per la modifica {index}",
    "views.proposalAuthorEdited": "Hai modificato questa formulazione. Rivedi il testo prima di applicarlo.",
    "views.rejectAll": "Segna tutto come rifiutato",
    "views.acceptChange": "Accetta",
    "views.rejectChange": "Rifiuta",
    "views.changeNavigation": "Navigazione tra le modifiche",
    "views.previousChange": "Modifica precedente",
    "views.nextChange": "Modifica successiva",
    "views.findingNavigation": "Navigazione tra i rilievi",
    "views.previousFinding": "Rilievo precedente",
    "views.nextFinding": "Rilievo successivo",
    "views.proposalDisplayMode": "Modalità di visualizzazione della proposta",
    "views.proposalSideBySide": "Affiancata",
    "views.proposalStacked": "Sovrapposta",
    "views.proposalHighlight": "Evidenzia modifiche",
    "views.reviewCurrentArticle": "Rivedi l'articolo attuale",
    "views.regenerateInAssistant": "Rigenera nell'assistente",
    "views.proposalFallback": "Questa proposta non può essere separata in singole modifiche in modo sicuro. Rivedi l'intera proposta prima di accettarla.",
    "views.preservationWarnings": "Controlla i dettagli conservati",
    "views.dismissPreservationWarnings": "Chiudi avvisi di conservazione",
    "views.warning.url": "Gli URL sono cambiati. Verifica ogni link.",
    "views.warning.number": "I valori numerici sono cambiati. Verifica ogni numero.",
    "views.warning.code": "Il codice è cambiato. Verifica il codice in linea e nei blocchi.",
    "views.warning.claims": "La prosa modificata può alterare il significato fattuale; verifica le affermazioni prima di accettare.",
    "views.proposalNoChanges": "Invariato",
    "views.proposalSummaryLoading": "Riepilogo della modifica…",
    "views.proposalSummaryUnavailable": "Un breve riepilogo non è disponibile. Rivedi il testo originale e quello proposto qui sotto.",
    "views.dismissProposal": "Scarta proposta",
    "views.changeType.addition": "Aggiunta{separator}Modifica {index} di {total}",
    "views.changeType.removal": "Rimozione{separator}Modifica {index} di {total}",
    "views.changeType.replacement": "Sostituzione{separator}Modifica {index} di {total}",
    "views.decision.pending": "In attesa",
    "views.decision.accepted": "Accettata",
    "views.decision.rejected": "Rifiutata",
    "views.selectChange": "Seleziona modifica",
    "views.acceptSelected": "Accetta modifiche selezionate",
} satisfies Partial<Record<MessageId, string>>;
