import type { MessageId } from "../../messages.js";

export const typography = {
    "typography.customPair": "Coppia personalizzata",
    "typography.articleSaved": "Preferenze tipografiche dell'articolo salvate.",
    "typography.articleSaveHint": (
        "Le regole dell'articolo sostituiscono o disattivano quelle ereditate dalla lingua. Salvale per usarl" +
        "e nella prossima verifica."
    ),
    "typography.reviewLanguage": "Convenzioni di verifica: {language}",
    "typography.unknownLanguage": "Lingua non specificata",
    "typography.otherLanguage": "Altra lingua…",
    "typography.otherLanguageTitle": "Scegli un'altra lingua di scrittura",
    "typography.languageCode": "Lingua o variante regionale",
    "typography.languageCodeHint": "Inserisci un nome o una variante regionale, come polacco o spagnolo, Argentina. Puoi usare anche codici come ja o es-AR.",
    "typography.languageSaveFailed": "Impossibile salvare la lingua dell'articolo. Riprova; il testo non è cambiato.",
    "typography.useLanguage": "Usa lingua",
    "typography.loadFailed": "Impossibile caricare le preferenze tipografiche. Riprova prima di modificare o verificare.",
    "typography.retryLoad": "Ricarica preferenze",
    "typography.openingMark": "Segno di apertura",
    "typography.closingMark": "Segno di chiusura",
    "typography.innerSpace": "Spazio all'interno delle virgolette",
    "typography.punctuationMarks": "Segni di punteggiatura",
    "typography.spaceBefore": "Spazio prima della punteggiatura",
    "typography.punctuationSpacing": "Spaziatura della punteggiatura",
    "typography.languageScope": "Lingua della tipografia",
    "typography.chooseLanguage": "Scegli una lingua",
    "typography.languageHint": "Salva convenzioni distinte per ogni lingua di scrittura. La lingua dell'articolo e dell'interfaccia non cambia.",
    "typography.missingLanguage": "Scegli la lingua dell'articolo nella barra di stato prima di verificare la tipografia.",
    "typography.scope": "Applica regole a",
    "typography.languagePreferences": "Tutti gli articoli in questa lingua",
    "typography.articlePreferences": "Solo questo articolo",
    "typography.preset": "Convenzioni predefinite",
    "typography.noPreset": "Convenzioni personalizzate",
    "typography.presetPending": "{language}{separator}in attesa di verifica madrelingua",
    "typography.presetReviewHint": "Le anteprime delle convenzioni attendono una verifica madrelingua. Puoi aggiungere le tue regole qui sotto.",
    "typography.applyPreset": "Applica convenzioni",
    "typography.legacyHint": "Le regole globali precedenti sono conservate. Copiale in una lingua per usarle nelle nuove verifiche.",
    "typography.copyLegacy": "Copia le regole precedenti in questa lingua",
    "typography.resetInheritance": "Ripristina regole ereditate",
    "typography.inheritanceHint": (
        "La modifica sostituisce una regola ereditata; la rimozione la disattiva. Ripristina le regole eredit" +
        "ate per cancellare le sostituzioni."
    ),
    "typography.noConvention": "Nessuna regola meccanica applicabile. Scegli una convenzione oppure aggiungi e salva regole per questa lingua.",
    "typography.effectiveLanguage": "Verifica delle convenzioni per {language}",
    "typography.earlierConvention": "Questa verifica ha usato preferenze linguistiche o tipografiche precedenti. Ripetila per usare quelle attuali.",
    "typography.legacyReview": "Questa verifica precedente non ha convenzioni linguistiche registrate.",
    "typography.source.preset": "Predefinite",
    "typography.source.language": "Preferenza della lingua",
    "typography.source.article": "Regola dell'articolo",
    "typography.invalid": (
        "Impossibile salvare o caricare le regole tipografiche. Controlla regole incomplete, duplicate o in c" +
        "onflitto e riprova. Se le regole salvate non si caricano, ripristina un backup nelle Impostazioni."
    ),
    "typography.correctionsConflict": (
        "Impossibile applicare le correzioni tipografiche in modo coerente. Modifica le regole sovrapposte o " +
        "ripetute e verifica di nuovo. L'articolo non è cambiato."
    ),
    "typography.required": "Impossibile verificare la tipografia. Scegli la lingua dell'articolo e salva le regole per quella lingua nel Profilo di stile.",
    "typography.title": "Regole tipografiche",
    "typography.saveHint": (
        "Il salvataggio ricostruisce il profilo in locale dai campioni inclusi e dalle regole salvate, compre" +
        "se le modifiche in sospeso ai campioni. Le modifiche non salvate negli altri moduli sono escluse."
    ),
    "typography.empty": "Nessuna regola tipografica. Aggiungi una convenzione per verificare punteggiatura o spaziatura.",
    "typography.add": "Aggiungi regola",
    "typography.remove": "Rimuovi",
    "typography.save": "Salva",
    "typography.edit": "Modifica",
    "typography.closeEditor": "Chiudi",
    "typography.savedRule": "Salvata",
    "typography.unsavedRule": "Non salvata",
    "typography.validation.invalid": "Completa i campi della regola prima di salvare.",
    "typography.validation.duplicate": "Questa convenzione è già nell'elenco. Modifica o rimuovi il duplicato prima di salvare.",
    "typography.validation.conflict": "Queste convenzioni sono in conflitto. Modificane o rimuovine una prima di salvare.",
    "typography.validation.limit": "Mantieni al massimo 30 regole prima di salvare.",
    "typography.saveFailed": "Impossibile salvare le regole tipografiche. Le modifiche sono ancora qui. Prova a salvare di nuovo.",
    "typography.check": "Verifica tipografia",
    "typography.saved": "Regole tipografiche salvate e Profilo di stile ricostruito.",
    "typography.localHint": (
        "Le verifiche meccaniche avvengono in locale. Le regole contestuali richiedono una revisione completa" +
        " dello stile. Il testo cambia solo dopo l'accettazione di una proposta."
    ),
    "typography.kind": "Convenzione della regola {number}",
    "typography.ruleNumber": "Regola {number}",
    "typography.quotes": "Virgolette",
    "typography.dash": "Trattini nella prosa",
    "typography.ellipsis": "Puntini di sospensione",
    "typography.ellipsisSingle": "Carattere unico, …",
    "typography.ellipsisThree": "Tre punti, ...",
    "typography.nonbreaking": "Coppia di elementi non separabili",
    "typography.horizontal": "Spazi ripetuti",
    "typography.literal": "Sostituzione letterale della punteggiatura",
    "typography.contextual": "Istruzione tipografica contestuale",
    "typography.outer": "Virgolette esterne",
} satisfies Partial<Record<MessageId, string>>;
