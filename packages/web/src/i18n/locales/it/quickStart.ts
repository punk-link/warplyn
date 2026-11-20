import type { MessageId } from "../../messages.js";


export const quickStartMessages = {
    "quickStart.addModelKey": "Aggiungi chiave del modello",
    "quickStart.assistant.description": (
        "Usa il pannello destro per modifiche, revisioni, traduzioni e verifiche dei fatti. Le modifiche IA r" +
        "estano proposte finché non le accetti e i rilievi restano consultivi."
    ),
    "quickStart.assistant.title": "Chiedi all'assistente.",
    "quickStart.close": "Chiudi guida rapida",
    "quickStart.modelKey.description": (
        "La chiave del modello è una chiave API di un provider IA. Nell'app desktop scegli un provider, incol" +
        "la la chiave, salvala nell'archivio credenziali del sistema operativo, aggiorna i modelli e scegline" +
        " uno predefinito. Warplyn non mostrerà mai più una chiave salvata."
    ),
    "quickStart.modelKey.title": "Aggiungi una chiave del modello.",
    "quickStart.skip": "Salta guida rapida",
    "quickStart.startWriting": "Inizia a scrivere",
    "quickStart.title": "Benvenuto in Warplyn",
    "quickStart.write.description": (
        "Crea o apri un articolo nel pannello sinistro, poi scrivi nell'area centrale. Warplyn conserva lo st" +
        "ato di recupero delle bozze e la cronologia delle versioni salvate."
    ),
    "quickStart.write.title": "Scrivi un articolo.",
} satisfies Partial<Record<MessageId, string>>;
