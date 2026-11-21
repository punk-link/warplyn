import type { MessageId } from "../../messages.js";


export const statusMessages = {
    "status.article": "Stato dell'articolo",
    "status.characterCount": "{characterCount} / {characterLimit} caratteri",
    "status.characterCount.ariaLabel": "Conteggio caratteri: {characterCount} di {characterLimit}. Scegli un limite.",
    "status.characterLimitPresets": "Limiti di caratteri predefiniti",
    "status.revision": "v{revisionNumber}",
    "status.revisionMenu": "Versioni salvate",
    "status.revisionSelector": "Versione attuale v{revisionNumber}. Scegli una versione salvata.",
    "status.updateAvailable": "Aggiornamento {version} disponibile",
    "status.updateDownloading": "Download dell'aggiornamento in corso",
    "status.updateFailed": "Ricerca aggiornamenti non riuscita",
    "status.updateReady": "Aggiornamento pronto per il riavvio",
    "status.windowsUpdateAvailable": "Scarica l'aggiornamento {version} e approva l'installazione automatica alla prossima apertura di Warplyn",
    "status.windowsUpdateReady": "Aggiornamento scaricato. Verrà applicato automaticamente alla prossima apertura di Warplyn.",
} satisfies Partial<Record<MessageId, string>>;
