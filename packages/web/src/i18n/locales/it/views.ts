import type { MessageId } from "../../messages.js";


export const viewsMessages = {
    "views.acceptAll": "Segna tutto come accettato",
    "views.acceptChange": "Accetta",
    "views.acceptFactAsWritten": "Accetta così com'è",
    "views.acceptFactEvidence": "Accetta prove",
    "views.acceptSelected": "Accetta modifiche selezionate",
    "views.addToCorpus": "Aggiungi al corpus",
    "views.applyProposal": "Applica",
    "views.changeNavigation": "Navigazione tra le modifiche",
    "views.changeType.addition": "Aggiunta{separator}Modifica {index} di {total}",
    "views.changeType.removal": "Rimozione{separator}Modifica {index} di {total}",
    "views.changeType.replacement": "Sostituzione{separator}Modifica {index} di {total}",
    "views.characterCount": "{count} / {limit} caratteri",
    "views.confirmRejectTranslation": "Rifiuta",
    "views.continueWriting": "Continua a scrivere",
    "views.copy": "Copia",
    "views.decision.accepted": "Accettata",
    "views.decision.pending": "In attesa",
    "views.decision.rejected": "Rifiutata",
    "views.discardDraftAndRestore": "Scarta e ripristina",
    "views.dismissPreservationWarnings": "Chiudi avvisi di conservazione",
    "views.dismissProposal": "Scarta proposta",
    "views.earlierSuggestion": "Suggerimento precedente",
    "views.earlierSuggestionHelp": "L'articolo è cambiato da quando è stato creato questo suggerimento.",
    "views.editTranslation": "Modifica",
    "views.existingTranslations": "Traduzioni esistenti",
    "views.factCheck": "Verifica dei fatti",
    "views.factCheckCurrent": "Versione attuale",
    "views.factCheckEmpty": "Le verifiche dei fatti sono consultive e non modificano mai l'articolo.",
    "views.factCheckEmptyTitle": "Nessun rilievo di verifica dei fatti",
    "views.factCheckFindings": "Rilievi di verifica dei fatti",
    "views.factCheckHistorical": "Questa verifica precedente è di sola lettura. L'ultima verifica per questa versione resta utilizzabile.",
    "views.factCheckHistory": "Cronologia delle verifiche dei fatti",
    "views.factCheckIncomplete": (
        "Questa verifica è incompleta. Sono mostrati solo i rilievi completati. Ripetila per verificare le af" +
        "fermazioni restanti."
    ),
    "views.factCheckRevision": "Versione verificata: {revision}",
    "views.factCheckRunOption": "Versione {revision}, verificata il {dateTime}",
    "views.factCheckRunningEmpty": (
        "{count, plural, =0 {L'assistente sta cercando affermazioni da verificare.} one {L'assistente sta ver" +
        "ificando # affermazione.} other {L'assistente sta verificando # affermazioni.}} I rilievi compariran" +
        "no qui al termine."
    ),
    "views.factCheckRunningPrevious": (
        "{count, plural, =0 {L'assistente sta cercando affermazioni da verificare.} one {L'assistente sta ver" +
        "ificando # affermazione.} other {L'assistente sta verificando # affermazioni.}} Questi sono i riliev" +
        "i dell'ultima verifica completata e si aggiorneranno quando terminerà la nuova."
    ),
    "views.factCheckStale": (
        "Questi rilievi appartengono a una versione precedente. Restano leggibili, ma non creare correzioni f" +
        "inché non ripeti la verifica."
    ),
    "views.factCheckedAt": "Verificata il {dateTime}.",
    "views.factEvidenceFreshness": (
        "Le prove riflettono le date delle fonti e della verifica. Le affermazioni sensibili al tempo potrebbero essere" +
        " cambiate; ripeti la verifica per aggiornarle."
    ),
    "views.factEvidenceReused": "Prove riutilizzate dalla versione {revision}.",
    "views.factImportance": "Importanza {importance}",
    "views.factResolution": "Risoluzione: {resolution}",
    "views.factResolution.accepted_as_written": "Accettata così com'è",
    "views.factResolution.corrected_or_removed": "Corretta o rimossa",
    "views.factResolution.evidence_accepted": "Prove accettate",
    "views.factStatus.disputed": "Contestata",
    "views.factStatus.supported": "Supportata",
    "views.factStatus.unverifiable": "Non verificabile",
    "views.findingNavigation": "Navigazione tra i rilievi",
    "views.nextChange": "Modifica successiva",
    "views.nextFinding": "Rilievo successivo",
    "views.openTranslation": "{language}: {title}",
    "views.preservationWarnings": "Controlla i dettagli conservati",
    "views.previousChange": "Modifica precedente",
    "views.previousFinding": "Rilievo precedente",
    "views.proposalAccepted": "Questa proposta è stata accettata. Le decisioni sono di sola lettura.",
    "views.proposalAuthorEdited": "Hai modificato questa formulazione. Rivedi il testo prima di applicarlo.",
    "views.proposalCounts": (
        "{total, plural, =0 {Nessun suggerimento} one {# suggerimento} other {# suggerimenti}}{separator}{pen" +
        "ding, plural, =0 {Nessuno in attesa} one {# in attesa} other {# in attesa}}{separator}{accepted, plu" +
        "ral, =0 {Nessuno accettato} one {# accettato} other {# accettati}}{separator}{rejected, plural, =0 {" +
        "Nessuno rifiutato} one {# rifiutato} other {# rifiutati}}"
    ),
    "views.proposalDisplayMode": "Modalità di visualizzazione della proposta",
    "views.proposalEmpty": "Usa l'assistente editoriale per generare una proposta. Non cambierà mai l'articolo automaticamente.",
    "views.proposalEmptyTitle": "Nessuna proposta da rivedere",
    "views.proposalFallback": "Questa proposta non può essere separata in singole modifiche in modo sicuro. Rivedi l'intera proposta prima di accettarla.",
    "views.proposalHighlight": "Evidenzia modifiche",
    "views.proposalNoChanges": "Invariato",
    "views.proposalReview": "Revisione della proposta",
    "views.proposalSideBySide": "Affiancata",
    "views.proposalStacked": "Sovrapposta",
    "views.proposalStale": (
        "Questa proposta non è aggiornata perché l'articolo ha una versione più recente. Genera una nuova proposta prim" +
        "a di accettare modifiche."
    ),
    "views.proposalSummaryLoading": "Riepilogo della modifica…",
    "views.proposalSummaryUnavailable": "Un breve riepilogo non è disponibile. Rivedi il testo originale e quello proposto qui sotto.",
    "views.proposalWhole": "Proposta completa{separator}{changes, plural, one {# modifica} other {# modifiche}}",
    "views.proposeFactCorrection": "Proponi correzione",
    "views.proposeFactCorrections": "Proponi correzioni ({count})",
    "views.proposedChangeInput": "Testo proposto per la modifica {index}",
    "views.regenerateInAssistant": "Rigenera nell'assistente",
    "views.rejectAll": "Segna tutto come rifiutato",
    "views.rejectChange": "Rifiuta",
    "views.rejectProposal": "Rifiuta proposta",
    "views.rejectTranslation": "Rifiuta",
    "views.rejectTranslationDescription": (
        "Rimuove la traduzione generata in {language} dalle approvazioni. L'articolo di origine e le traduzioni accetta" +
        "te restano invariati."
    ),
    "views.rejectTranslationTitle": "Rifiutare questa traduzione?",
    "views.remove": "Rimuovi",
    "views.resetAllDecisions": "Reimposta decisioni",
    "views.restoreDescription": "Il ripristino crea una nuova versione immutabile; non riscrive la cronologia.",
    "views.restoreDraftDescription": "Questa bozza ha modifiche non presenti in una versione salvata. Salvala o scartala prima di ripristinare.",
    "views.restoreHeading": "Ripristinare la versione?",
    "views.restoreRevision": "Ripristina versione",
    "views.resumeReview": "Riprendi revisione",
    "views.reviewCurrentArticle": "Rivedi l'articolo attuale",
    "views.revisionNumber": "v{revisionNumber}",
    "views.runFactCheck": "Verifica i fatti",
    "views.runFactCheckAgain": "Ripeti verifica dei fatti",
    "views.sampleName": "Nome del campione",
    "views.saveAndRestore": "Salva e ripristina",
    "views.selectAllNeedingReview": "Seleziona tutti quelli da rivedere",
    "views.selectChange": "Seleziona modifica",
    "views.setAllDecisions": "Decisioni…",
    "views.sourceLinkedPrefix": "Questa traduzione è collegata a",
    "views.sourceLinkedRevision": "alla versione di origine {revisionNumber}.",
    "views.styleIntro": "Il corpus di stile locale non viene mai inviato per intero; si usa solo il profilo derivato.",
    "views.styleProfile": "Profilo di stile",
    "views.translate": "Nuova traduzione…",
    "views.translationAligned": "Paragrafi allineati",
    "views.translationArticleStale": (
        "L'articolo di origine è cambiato da quando è stata accettata questa traduzione. Il testo è conservat" +
        "o. Apri l'articolo di origine per preparare una traduzione aggiornata."
    ),
    "views.translationChooseTargets": "Seleziona almeno una lingua di destinazione per continuare.",
    "views.translationComparison": (
        "Confronto della traduzione. Usa Sinistra e Destra per raggiungere i contenuti protetti convalidati, Invio o Sp" +
        "azio per i dettagli ed Esc per chiuderli."
    ),
    "views.translationContextChanged": "L'origine è cambiata. Rivedi l'origine aggiornata prima di confermare di nuovo.",
    "views.translationDialogTitle": "Nuova traduzione",
    "views.translationDisplayMode": "Modalità di visualizzazione della traduzione",
    "views.translationEmpty": "Chiedi all'assistente editoriale di tradurre questo articolo.",
    "views.translationEmptyTitle": "Nessuna proposta di traduzione",
    "views.translationFresh": "Attuale",
    "views.translationGenerateBatch": "Traduci in {count, number} lingue",
    "views.translationGenerateConfirm": "Traduci in {languages}",
    "views.translationGenerateDescription": "Traduci {title}, versione di origine {revisionId}.",
    "views.translationGenerateDraft": "La bozza non salvata verrà salvata come versione prima della generazione.",
    "views.translationGenerateTargets": "Lingue di destinazione",
    "views.translationGenerating": "Traduzione…",
    "views.translationGeneratingLanguages": "Traduzione in {languages}…",
    "views.translationGenerationActive": "Una richiesta è in corso. Attendi che finisca o annullala prima di generare traduzioni.",
    "views.translationLinkedIdentity": "Articolo {articleId}, versione di origine {revisionId}",
    "views.translationLinkedTarget": "{title}, articolo {articleId}, versione di origine {revisionId}",
    "views.translationMissingOriginal": "Nessun paragrafo originale corrispondente.",
    "views.translationMissingResult": "Nessun paragrafo tradotto corrispondente.",
    "views.translationOriginal": "Originale",
    "views.translationOutdated": "Non aggiornata",
    "views.translationPair": "Origine {source} → traduzione {target}",
    "views.translationPreservation": (
        "I risultati e gli articoli esistenti sono conservati. Aggiornare un articolo di traduzione richiede una confer" +
        "ma separata."
    ),
    "views.translationProtectedExplanation": (
        "Contrassegnato per la conservazione esatta in questa traduzione. {count, plural, one {L'occorrenza p" +
        "revista è presente invariata} other {Tutte le # occorrenze previste sono presenti invariate}} nel te" +
        "sto tradotto. Questa verifica è consultiva; rivedi la traduzione prima di accettarla."
    ),
    "views.translationProtectedValue": "Contenuto protetto convalidato: {value}",
    "views.translationProtectedWarning": "Contenuto protetto modificato o mancante",
    "views.translationPublishingGuidance": "Indicazioni {profile}",
    "views.translationRefresh": "Aggiorna",
    "views.translationRefreshConfirm": "Aggiorna",
    "views.translationRefreshDescription": (
        "Applicare il testo in {language} rivisto a {title} come nuova versione salvata? Il titolo resta inva" +
        "riato e le versioni precedenti restano disponibili nella cronologia."
    ),
    "views.translationRefreshDraft": "Salva o scarta la bozza della traduzione prima di aggiornarla.",
    "views.translationRefreshFailed": (
        "Impossibile aggiornare la traduzione. Salva o scarta la bozza, controlla che origine e traduzione non siano ca" +
        "mbiate e rivedi di nuovo la proposta."
    ),
    "views.translationRefreshTarget": "Traduzione da aggiornare",
    "views.translationRefreshTitle": "Aggiornare la traduzione?",
    "views.translationRefreshUnavailable": (
        "Impossibile aggiornare la traduzione perché la proposta non è disponibile. Genera una nuova traduzione e rived" +
        "ila di nuovo."
    ),
    "views.translationResult": "Traduzione in {language}",
    "views.translationResultOption": "v{number}{separator}{date}{separator}{description}",
    "views.translationResultSelector": "Risultato della traduzione",
    "views.translationReviewSource": "Rivedi origine aggiornata",
    "views.translationSideBySide": "Affiancata",
    "views.translationStale": "L'articolo di origine è cambiato da quando è stata creata questa proposta di traduzione.",
    "views.translationTargets": "Genera una traduzione e rivedila qui. I risultati precedenti sono conservati.",
    "views.translationTargetsEmpty": "Genera una traduzione e rivedila qui. I risultati precedenti sono conservati.",
    "views.translations": "Traduzioni",
    "views.uncertainty": "Incertezza: {value}",
    "views.updateSuggestion": "Aggiorna suggerimento",
    "views.updateSuggestionPrompt": "Prepare an updated Proposal for the current Article based on the earlier suggestion. Do not apply changes.",
    "views.warning.claims": "La prosa modificata può alterare il significato fattuale; verifica le affermazioni prima di accettare.",
    "views.warning.code": "Il codice è cambiato. Verifica il codice in linea e nei blocchi.",
    "views.warning.number": "I valori numerici sono cambiati. Verifica ogni numero.",
    "views.warning.url": "Gli URL sono cambiati. Verifica ogni link.",
    "views.writingSample": "Campione di scrittura",
} satisfies Partial<Record<MessageId, string>>;
