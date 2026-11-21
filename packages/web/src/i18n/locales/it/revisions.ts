import type { MessageId } from "../../messages.js";


export const revisionsMessages = {
    "revisions.acceptedProposal": "Proposta accettata",
    "revisions.articleContent": "Contenuto salvato dell'articolo",
    "revisions.assistantEdit": "Modifica dell'assistente",
    "revisions.author": "Versione dell'autore",
    "revisions.characterCount": "{count} caratteri",
    "revisions.count": "{count, plural, =0 {Nessuna versione salvata} one {# versione salvata} other {# versioni salvate}}",
    "revisions.current": "Attuale",
    "revisions.currentExplanation": "Questa è la versione attuale.",
    "revisions.currentRevision": "Versione attuale",
    "revisions.empty": "Versione vuota",
    "revisions.emptyContent": "Questa versione non contiene testo salvato dell'articolo.",
    "revisions.heading": "Cronologia delle versioni",
    "revisions.historyNavigation": "Cronologia delle versioni",
    "revisions.inactive": "Inattiva",
    "revisions.initial": "Versione iniziale",
    "revisions.restore": "Ripristina questa versione",
    "revisions.restored": "Versione ripristinata",
    "revisions.restoredFromEarlier": "Ripristinata da una versione precedente",
    "revisions.restoredTarget": "Versione ripristinata n. {number}",
    "revisions.restoredTargetDescribed": "Versione ripristinata n. {number}: {description}",
    "revisions.revision": "Versione salvata",
    "revisions.saved": "Versione salvata",
    "revisions.select": "Seleziona una versione salvata",
} satisfies Partial<Record<MessageId, string>>;
