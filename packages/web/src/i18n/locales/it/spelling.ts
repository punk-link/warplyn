import type { MessageId } from "../../messages.js";

export const spelling = {
    "spelling.desktopOnly": (
        "Usa l'app desktop per scaricare dizionari e gestire il dizionario personale. Nel browser, l'ortograf" +
        "ia segue le impostazioni del browser."
    ),
    "spelling.localHint": (
        "Le verifiche ortografiche e le parole personali restano su questo dispositivo. Scaricare dizionari r" +
        "ichiede internet e contatta la CDN dei dizionari di Google."
    ),
    "spelling.dictionaries": "Dizionari delle lingue",
    "spelling.preload": "Prepara la scrittura offline",
    "spelling.preloadHint": "Seleziona le lingue da preparare per la scrittura offline. La lingua dell'articolo non cambia.",
    "spelling.download": "Scarica dizionari",
    "spelling.languageVariant": "{language} ({code})",
    "spelling.filterLanguages": "Filtra lingue",
    "spelling.noLanguages": "Nessuna lingua corrispondente.",
    "spelling.unverified": "Disponibile",
    "spelling.unloaded": "Non caricato",
    "spelling.unload": "Scarica dalla memoria",
    "spelling.unloadLanguage": "Scarica dalla memoria il dizionario {language}",
    "spelling.preparing": "Preparazione",
    "spelling.ready": "Scaricato",
    "spelling.failed": "Non disponibile. Riprova il download.",
    "spelling.personal": "Dizionario personale",
    "spelling.personalHint": "Conserva termini tecnici come PostgreSQL e gRPC in un unico dizionario personale condiviso tra articoli e lingue di verifica.",
    "spelling.systemHint": "Aggiungere o rimuovere una parola modifica anche il dizionario personalizzato del sistema operativo e può influire su altre app.",
    "spelling.addWords": "Parole da aggiungere",
    "spelling.wordsHint": (
        "Inserisci una parola o un termine tecnico per riga, fino a 128 caratteri ciascuno. Aggiungi fino a 5" +
        "00 parole alla volta. Le voci non riuscite restano qui per correggerle o riprovare."
    ),
    "spelling.add": "Aggiungi parole",
    "spelling.remove": "Rimuovi",
    "spelling.removeWord": "Rimuovi {word} dal dizionario personale",
    "spelling.savedWords": "Parole salvate",
    "spelling.search": "Cerca nel dizionario personale",
    "spelling.searchHint": "Cerca i termini salvati e rimuovi le parole che vuoi sottoporre di nuovo al controllo ortografico.",
    "spelling.noWords": "Nessuna parola personale corrispondente.",
    "spelling.persistenceHint": (
        "Dizionari e parole personali appartengono a questa installazione. I backup e i ripristini degli arti" +
        "coli non li includono. Eliminare i dati degli articoli non rimuove le parole del dizionario del sist" +
        "ema operativo; rimuovile qui."
    ),
    "spelling.loading": "Caricamento impostazioni ortografiche…",
    "spelling.loaded": "Impostazioni ortografiche caricate.",
    "spelling.loadFailed": "Impossibile caricare le impostazioni ortografiche. Riprova.",
    "spelling.retry": "Riprova",
    "spelling.working": "Aggiornamento impostazioni ortografiche…",
    "spelling.updated": "Impostazioni ortografiche aggiornate.",
    "spelling.partial": "Impossibile aggiungere alcune parole. Correggi o riprova le voci in Parole da aggiungere.",
    "spelling.operationFailed": "Impossibile aggiornare le impostazioni ortografiche. Riprova la modifica. Per i download, controlla la connessione internet.",
    "spelling.invalidWords": "Inserisci fino a 500 parole, una per riga, con un massimo di 128 caratteri ciascuna e 64 KiB totali.",
    "spelling.wordFailed": "Impossibile aggiungere questa parola al dizionario personale. Apri le Impostazioni ortografia e riprova ad aggiungerla.",
    "spelling.correctionFailed": "Impossibile applicare questa correzione ortografica. Riapri il menu dei suggerimenti o digita la correzione nell'articolo.",
    "spelling.languageFailed": (
        "Impossibile attivare l'ortografia per la lingua di questo articolo. Riprova la selezione o prepara i" +
        "l dizionario nelle Impostazioni ortografia."
    ),
} satisfies Partial<Record<MessageId, string>>;
