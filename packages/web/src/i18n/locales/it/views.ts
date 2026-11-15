import type { MessageId } from "../../messages.js";

export const views = {
    "views.translations": "Traduzioni",
    "views.translationStale": "L'articolo di origine è cambiato da quando è stata creata questa proposta di traduzione.",
    "views.translationArticleStale": (
        "L'articolo di origine è cambiato da quando è stata accettata questa traduzione. Il testo è conservat" +
        "o. Apri l'articolo di origine per preparare una traduzione aggiornata."
    ),
    "views.translationFresh": "Attuale",
    "views.translationOutdated": "Non aggiornata",
    "views.translationRefresh": "Aggiorna",
    "views.translationRefreshTitle": "Aggiornare la traduzione?",
    "views.translationRefreshTarget": "Traduzione da aggiornare",
    "views.translationRefreshDescription": (
        "Applicare il testo in {language} rivisto a {title} come nuova versione salvata? Il titolo resta inva" +
        "riato e le versioni precedenti restano disponibili nella cronologia."
    ),
    "views.translationRefreshConfirm": "Aggiorna",
    "views.translationRefreshDraft": "Salva o scarta la bozza della traduzione prima di aggiornarla.",
    "views.translationRefreshUnavailable": (
        "Impossibile aggiornare la traduzione perché la proposta non è disponibile. Genera una nuova traduzio" +
        "ne e rivedila di nuovo."
    ),
    "views.translationRefreshFailed": (
        "Impossibile aggiornare la traduzione. Salva o scarta la bozza, controlla che origine e traduzione no" +
        "n siano cambiate e rivedi di nuovo la proposta."
    ),
    "views.translationEmptyTitle": "Nessuna proposta di traduzione",
    "views.translationEmpty": "Chiedi all'assistente editoriale di tradurre questo articolo.",
    "views.translate": "Nuova traduzione…",
    "views.translationDialogTitle": "Nuova traduzione",
    "views.translationTargets": "Genera una traduzione e rivedila qui. I risultati precedenti sono conservati.",
    "views.translationTargetsEmpty": "Genera una traduzione e rivedila qui. I risultati precedenti sono conservati.",
    "views.translationGenerateDescription": "Traduci {title}, versione di origine {revisionId}.",
    "views.translationGenerateDraft": "La bozza non salvata verrà salvata come versione prima della generazione.",
    "views.translationGenerateTargets": "Lingue di destinazione",
    "views.translationGenerateConfirm": "Traduci in {languages}",
    "views.translationGenerateBatch": "Traduci in {count, number} lingue",
    "views.translationPreservation": (
        "I risultati e gli articoli esistenti sono conservati. Aggiornare un articolo di traduzione richiede " +
        "una conferma separata."
    ),
    "views.translationGenerationActive": "Una richiesta è in corso. Attendi che finisca o annullala prima di generare traduzioni.",
    "views.translationChooseTargets": "Seleziona almeno una lingua di destinazione per continuare.",
    "views.translationContextChanged": "L'origine è cambiata. Rivedi l'origine aggiornata prima di confermare di nuovo.",
    "views.translationReviewSource": "Rivedi origine aggiornata",
    "views.translationResultSelector": "Risultato della traduzione",
    "views.translationResultOption": "v{number}{separator}{date}{separator}{description}",
    "views.translationLinkedIdentity": "Articolo {articleId}, versione di origine {revisionId}",
    "views.translationLinkedTarget": "{title}, articolo {articleId}, versione di origine {revisionId}",
    "views.sourceLinkedPrefix": "Questa traduzione è collegata a",
    "views.sourceLinkedRevision": "alla versione di origine {revisionNumber}.",
    "views.existingTranslations": "Traduzioni esistenti",
    "views.openTranslation": "{language}: {title}",
    "views.translationPair": "Origine {source} → traduzione {target}",
    "views.translationOriginal": "Originale",
    "views.translationResult": "Traduzione in {language}",
    "views.translationDisplayMode": "Modalità di visualizzazione della traduzione",
    "views.translationSideBySide": "Affiancata",
    "views.translationAligned": "Paragrafi allineati",
    "views.translationMissingOriginal": "Nessun paragrafo originale corrispondente.",
    "views.translationMissingResult": "Nessun paragrafo tradotto corrispondente.",
    "views.translationProtectedValue": "Contenuto protetto convalidato: {value}",
    "views.translationProtectedExplanation": (
        "Contrassegnato per la conservazione esatta in questa traduzione. {count, plural, one {L'occorrenza p" +
        "revista è presente invariata} other {Tutte le # occorrenze previste sono presenti invariate}} nel te" +
        "sto tradotto. Questa verifica è consultiva; rivedi la traduzione prima di accettarla."
    ),
    "views.translationComparison": (
        "Confronto della traduzione. Usa Sinistra e Destra per raggiungere i contenuti protetti convalidati, " +
        "Invio o Spazio per i dettagli ed Esc per chiuderli."
    ),
    "views.translationGenerating": "Traduzione…",
    "views.translationGeneratingLanguages": "Traduzione in {languages}…",
    "views.translationProtectedWarning": "Contenuto protetto modificato o mancante",
    "views.translationPublishingGuidance": "Indicazioni {profile}",
    "views.editTranslation": "Modifica",
    "views.rejectTranslation": "Rifiuta",
    "views.rejectTranslationTitle": "Rifiutare questa traduzione?",
    "views.rejectTranslationDescription": (
        "Rimuove la traduzione generata in {language} dalle approvazioni. L'articolo di origine e le traduzio" +
        "ni accettate restano invariati."
    ),
    "views.confirmRejectTranslation": "Rifiuta",
    "views.characterCount": "{count} / {limit} caratteri",
    "views.restoreHeading": "Ripristinare la versione?",
    "views.restoreDescription": "Il ripristino crea una nuova versione immutabile; non riscrive la cronologia.",
    "views.restoreDraftDescription": "Questa bozza ha modifiche non presenti in una versione salvata. Salvala o scartala prima di ripristinare.",
    "views.restoreRevision": "Ripristina versione",
    "views.saveAndRestore": "Salva e ripristina",
    "views.discardDraftAndRestore": "Scarta e ripristina",
    "views.copy": "Copia",
    "views.factCheck": "Verifica dei fatti",
    "views.factCheckEmptyTitle": "Nessun rilievo di verifica dei fatti",
    "views.factCheckEmpty": "Le verifiche dei fatti sono consultive e non modificano mai l'articolo.",
    "views.factCheckRevision": "Versione verificata: {revision}",
    "views.factCheckHistory": "Cronologia delle verifiche dei fatti",
    "views.factCheckCurrent": "Versione attuale",
    "views.factCheckRunOption": "Versione {revision}, verificata il {dateTime}",
    "views.factEvidenceFreshness": (
        "Le prove riflettono le date delle fonti e della verifica. Le affermazioni sensibili al tempo potrebb" +
        "ero essere cambiate; ripeti la verifica per aggiornarle."
    ),
    "views.revisionNumber": "v{revisionNumber}",
    "views.runFactCheck": "Verifica i fatti",
} satisfies Partial<Record<MessageId, string>>;
