import type { MessageId } from "../../messages.js";


export const typographyMessages = {
    "typography.add": "Aggiungi regola",
    "typography.applyPreset": "Applica convenzioni",
    "typography.articlePreferences": "Solo questo articolo",
    "typography.articleSaveHint": (
        "Le regole dell'articolo sostituiscono o disattivano quelle ereditate dalla lingua. Salvale per usarle nella pr" +
        "ossima verifica."
    ),
    "typography.articleSaved": "Preferenze tipografiche dell'articolo salvate.",
    "typography.check": "Verifica tipografia",
    "typography.checkFailed": "Impossibile verificare la tipografia. Salva regole valide e riprova.",
    "typography.chooseLanguage": "Scegli una lingua",
    "typography.closeEditor": "Chiudi",
    "typography.closingMark": "Segno di chiusura",
    "typography.contextual": "Istruzione tipografica contestuale",
    "typography.contextualSkipped": (
        "{count, plural, one {# regola contestuale richiede la revisione completa dello stile.} other {# rego" +
        "le contestuali richiedono la revisione completa dello stile.}}"
    ),
    "typography.copyLegacy": "Copia le regole precedenti in questa lingua",
    "typography.correction": "{source} → {replacement}",
    "typography.correctionsConflict": (
        "Impossibile applicare le correzioni tipografiche in modo coerente. Modifica le regole sovrapposte o ripetute e" +
        " verifica di nuovo. L'articolo non è cambiato."
    ),
    "typography.customPair": "Coppia personalizzata",
    "typography.dash": "Trattini nella prosa",
    "typography.deleted": "rimosso",
    "typography.earlierConvention": "Questa verifica ha usato preferenze linguistiche o tipografiche precedenti. Ripetila per usare quelle attuali.",
    "typography.edit": "Modifica",
    "typography.effectiveLanguage": "Verifica delle convenzioni per {language}",
    "typography.ellipsis": "Puntini di sospensione",
    "typography.ellipsisSingle": "Carattere unico, …",
    "typography.ellipsisThree": "Tre punti, ...",
    "typography.empty": "Nessuna regola tipografica. Aggiungi una convenzione per verificare punteggiatura o spaziatura.",
    "typography.horizontal": "Spazi ripetuti",
    "typography.horizontalHint": "Usa uno spazio normale tra gli elementi della prosa. Rientri, interruzioni di riga e codice restano invariati.",
    "typography.inheritanceHint": (
        "La modifica sostituisce una regola ereditata; la rimozione la disattiva. Ripristina le regole ereditate per ca" +
        "ncellare le sostituzioni."
    ),
    "typography.innerSpace": "Spazio all'interno delle virgolette",
    "typography.instruction": "Istruzione per la revisione completa dello stile",
    "typography.invalid": (
        "Impossibile salvare o caricare le regole tipografiche. Controlla regole incomplete, duplicate o in c" +
        "onflitto e riprova. Se le regole salvate non si caricano, ripristina un backup nelle Impostazioni."
    ),
    "typography.kind": "Convenzione della regola {number}",
    "typography.languageCode": "Lingua o variante regionale",
    "typography.languageCodeHint": (
        "Inserisci un nome o una variante regionale, come polacco o spagnolo, Argentina. Puoi usare anche cod" +
        "ici come ja o es-AR."
    ),
    "typography.languageHint": "Salva convenzioni distinte per ogni lingua di scrittura. La lingua dell'articolo e dell'interfaccia non cambia.",
    "typography.languagePreferences": "Tutti gli articoli in questa lingua",
    "typography.languageSaveFailed": "Impossibile salvare la lingua dell'articolo. Riprova; il testo non è cambiato.",
    "typography.languageScope": "Lingua della tipografia",
    "typography.left": "Elemento sinistro",
    "typography.legacyHint": "Le regole globali precedenti sono conservate. Copiale in una lingua per usarle nelle nuove verifiche.",
    "typography.legacyReview": "Questa verifica precedente non ha convenzioni linguistiche registrate.",
    "typography.literal": "Sostituzione letterale della punteggiatura",
    "typography.loadFailed": "Impossibile caricare le preferenze tipografiche. Riprova prima di modificare o verificare.",
    "typography.localHint": (
        "Le verifiche meccaniche avvengono in locale. Le regole contestuali richiedono una revisione completa" +
        " dello stile. Il testo cambia solo dopo l'accettazione di una proposta."
    ),
    "typography.mark": "Segno preferito",
    "typography.missingLanguage": "Scegli la lingua dell'articolo nella barra di stato prima di verificare la tipografia.",
    "typography.narrowNbsp": "Spazio stretto non separabile, U+202F",
    "typography.nbsp": "Spazio non separabile, U+00A0",
    "typography.nested": "Virgolette interne",
    "typography.noConvention": "Nessuna regola meccanica applicabile. Scegli una convenzione oppure aggiungi e salva regole per questa lingua.",
    "typography.noPreset": "Convenzioni personalizzate",
    "typography.noViolations": "Nessuna violazione tipografica meccanica trovata.",
    "typography.nonbreaking": "Coppia di elementi non separabili",
    "typography.olderProfile": (
        "Questa verifica ha usato la versione {version} del Profilo di stile. Le regole sono cambiate. Ripeti la verifi" +
        "ca per usare il profilo attuale."
    ),
    "typography.openingMark": "Segno di apertura",
    "typography.ordinarySpace": "spazio",
    "typography.otherLanguage": "Altra lingua…",
    "typography.otherLanguageTitle": "Scegli un'altra lingua di scrittura",
    "typography.outer": "Virgolette esterne",
    "typography.preset": "Convenzioni predefinite",
    "typography.presetPending": "{language}{separator}in attesa di verifica madrelingua",
    "typography.presetReviewHint": "Le anteprime delle convenzioni attendono una verifica madrelingua. Puoi aggiungere le tue regole qui sotto.",
    "typography.punctuationMarks": "Segni di punteggiatura",
    "typography.punctuationSpacing": "Spaziatura della punteggiatura",
    "typography.quotes": "Virgolette",
    "typography.remove": "Rimuovi",
    "typography.replacement": "Punteggiatura sostitutiva",
    "typography.required": (
        "Impossibile verificare la tipografia. Scegli la lingua dell'articolo e salva le regole per quella li" +
        "ngua nel Profilo di stile."
    ),
    "typography.resetInheritance": "Ripristina regole ereditate",
    "typography.retryLoad": "Ricarica preferenze",
    "typography.reviewLanguage": "Convenzioni di verifica: {language}",
    "typography.reviewProposal": "Rivedi proposta",
    "typography.right": "Elemento destro",
    "typography.ruleDescription": "{kind}: {value}",
    "typography.ruleNumber": "Regola {number}",
    "typography.rulesOnly": (
        "Nessun campione di scrittura incluso. Aggiungi campioni per ricavare le caratteristiche della voce, " +
        "oppure usa regole tipografiche esplicite per le verifiche locali."
    ),
    "typography.save": "Salva",
    "typography.saveDraftFirst": "Salva la bozza attuale prima di verificare la tipografia. La verifica locale usa la versione salvata.",
    "typography.saveFailed": "Impossibile salvare le regole tipografiche. Le modifiche sono ancora qui. Prova a salvare di nuovo.",
    "typography.saveHint": (
        "Il salvataggio ricostruisce il profilo in locale dai campioni inclusi e dalle regole salvate, compre" +
        "se le modifiche in sospeso ai campioni. Le modifiche non salvate negli altri moduli sono escluse."
    ),
    "typography.saved": "Regole tipografiche salvate e Profilo di stile ricostruito.",
    "typography.savedRule": "Salvata",
    "typography.scope": "Applica regole a",
    "typography.skipped": (
        "{count, plural, one {# caso di virgolette ambiguo è rimasto invariato.} other {# casi di virgolette ambigui so" +
        "no rimasti invariati.}} Verificali nel contesto."
    ),
    "typography.source": "Punteggiatura da sostituire",
    "typography.source.article": "Regola dell'articolo",
    "typography.source.language": "Preferenza della lingua",
    "typography.source.preset": "Predefinite",
    "typography.spaceBefore": "Spazio prima della punteggiatura",
    "typography.spacing": "Spaziatura",
    "typography.support": "Regole tipografiche: {rules}",
    "typography.title": "Regole tipografiche",
    "typography.unknownLanguage": "Lingua non specificata",
    "typography.unsavedRule": "Non salvata",
    "typography.useLanguage": "Usa lingua",
    "typography.validation.conflict": "Queste convenzioni sono in conflitto. Modificane o rimuovine una prima di salvare.",
    "typography.validation.duplicate": "Questa convenzione è già nell'elenco. Modifica o rimuovi il duplicato prima di salvare.",
    "typography.validation.invalid": "Completa i campi della regola prima di salvare.",
    "typography.validation.limit": "Mantieni al massimo 30 regole prima di salvare.",
    "typography.withSpaces": "Con spazi",
    "typography.withoutSpaces": "Senza spazi",
} satisfies Partial<Record<MessageId, string>>;
