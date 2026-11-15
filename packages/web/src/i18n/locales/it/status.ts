import type { MessageId } from "../../messages.js";

export const status = {
    "status.windowsUpdateReady": "Aggiornamento scaricato. Verrà applicato automaticamente alla prossima apertura di Warplyn.",
    "status.windowsUpdateAvailable": "Scarica l'aggiornamento {version} e approva l'installazione automatica alla prossima apertura di Warplyn",
    "status.updateAvailable": "Aggiornamento {version} disponibile",
    "status.updateDownloading": "Download dell'aggiornamento in corso",
    "status.updateReady": "Aggiornamento pronto per il riavvio",
    "status.updateFailed": "Ricerca aggiornamenti non riuscita",
    "status.article": "Stato dell'articolo",
    "status.revision": "v{revisionNumber}",
    "status.revisionSelector": "Versione attuale v{revisionNumber}. Scegli una versione salvata.",
    "status.revisionMenu": "Versioni salvate",
    "status.characterCount": "{characterCount} / {characterLimit} caratteri",
    "status.characterCount.ariaLabel": "Conteggio caratteri: {characterCount} di {characterLimit}. Scegli un limite.",
    "status.characterLimitPresets": "Limiti di caratteri predefiniti",
} satisfies Partial<Record<MessageId, string>>;
