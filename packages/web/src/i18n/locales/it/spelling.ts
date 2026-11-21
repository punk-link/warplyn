import type { MessageId } from "../../messages.js";


export const spellingMessages = {
    "spelling.add": "Aggiungi parole",
    "spelling.addWords": "Parole da aggiungere",
    "spelling.correctionFailed": (
        "Impossibile applicare questa correzione ortografica. Riapri il menu dei suggerimenti o digita la cor" +
        "rezione nell'articolo."
    ),
    "spelling.desktopOnly": (
        "Usa l'app desktop per scaricare dizionari e gestire il dizionario personale. Nel browser, l'ortografia segue l" +
        "e impostazioni del browser."
    ),
    "spelling.dictionaries": "Dizionari delle lingue",
    "spelling.download": "Scarica dizionari",
    "spelling.failed": "Non disponibile. Riprova il download.",
    "spelling.filterLanguages": "Filtra lingue",
    "spelling.invalidWords": "Inserisci fino a 500 parole, una per riga, con un massimo di 128 caratteri ciascuna e 64 KiB totali.",
    "spelling.languageFailed": (
        "Impossibile attivare l'ortografia per la lingua di questo articolo. Riprova la selezione o prepara il dizionar" +
        "io nelle Impostazioni ortografia."
    ),
    "spelling.languageVariant": "{language} ({code})",
    "spelling.loadFailed": "Impossibile caricare le impostazioni ortografiche. Riprova.",
    "spelling.loaded": "Impostazioni ortografiche caricate.",
    "spelling.loading": "Caricamento impostazioni ortografiche…",
    "spelling.localHint": (
        "Le verifiche ortografiche e le parole personali restano su questo dispositivo. Scaricare dizionari richiede in" +
        "ternet e contatta la CDN dei dizionari di Google."
    ),
    "spelling.noLanguages": "Nessuna lingua corrispondente.",
    "spelling.noWords": "Nessuna parola personale corrispondente.",
    "spelling.operationFailed": (
        "Impossibile aggiornare le impostazioni ortografiche. Riprova la modifica. Per i download, controlla " +
        "la connessione internet."
    ),
    "spelling.partial": "Impossibile aggiungere alcune parole. Correggi o riprova le voci in Parole da aggiungere.",
    "spelling.persistenceHint": (
        "Dizionari e parole personali appartengono a questa installazione. I backup e i ripristini degli arti" +
        "coli non li includono. Eliminare i dati degli articoli non rimuove le parole del dizionario del sist" +
        "ema operativo; rimuovile qui."
    ),
    "spelling.personal": "Dizionario personale",
    "spelling.personalHint": (
        "Conserva termini tecnici come PostgreSQL e gRPC in un unico dizionario personale condiviso tra artic" +
        "oli e lingue di verifica."
    ),
    "spelling.preload": "Prepara la scrittura offline",
    "spelling.preloadHint": "Seleziona le lingue da preparare per la scrittura offline. La lingua dell'articolo non cambia.",
    "spelling.preparing": "Preparazione",
    "spelling.ready": "Scaricato",
    "spelling.remove": "Rimuovi",
    "spelling.removeWord": "Rimuovi {word} dal dizionario personale",
    "spelling.retry": "Riprova",
    "spelling.savedWords": "Parole salvate",
    "spelling.search": "Cerca nel dizionario personale",
    "spelling.searchHint": "Cerca i termini salvati e rimuovi le parole che vuoi sottoporre di nuovo al controllo ortografico.",
    "spelling.systemHint": (
        "Aggiungere o rimuovere una parola modifica anche il dizionario personalizzato del sistema operativo " +
        "e può influire su altre app."
    ),
    "spelling.unload": "Scarica dalla memoria",
    "spelling.unloadLanguage": "Scarica dalla memoria il dizionario {language}",
    "spelling.unloaded": "Non caricato",
    "spelling.unverified": "Disponibile",
    "spelling.updated": "Impostazioni ortografiche aggiornate.",
    "spelling.wordFailed": "Impossibile aggiungere questa parola al dizionario personale. Apri le Impostazioni ortografia e riprova ad aggiungerla.",
    "spelling.wordsHint": (
        "Inserisci una parola o un termine tecnico per riga, fino a 128 caratteri ciascuno. Aggiungi fino a 5" +
        "00 parole alla volta. Le voci non riuscite restano qui per correggerle o riprovare."
    ),
    "spelling.working": "Aggiornamento impostazioni ortografiche…",
} satisfies Partial<Record<MessageId, string>>;
