import type { MessageId } from "../../messages.js";

export const article = {
    "article.defaultTitle": "Articolo senza titolo",
    "article.titleGenerationFailed": "Versione salvata senza titolo dell'articolo",
    "article.titleContextRequired": "Aggiungi dettagli e salva un'altra versione oppure rinomina l'articolo.",
    "article.titleGenerationNextStep": "Rinomina l'articolo oppure controlla il Modello di generazione del testo nelle Impostazioni e salva un'altra versione.",
} satisfies Partial<Record<MessageId, string>>;
