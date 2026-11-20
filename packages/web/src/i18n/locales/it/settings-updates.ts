import type { MessageId } from "../../messages.js";


export const settingsUpdatesMessages = {
    "settings.automaticUpdates": "Cerca aggiornamenti automaticamente",
    "settings.automaticUpdatesHint": (
        "Controlla GitHub all'avvio di Warplyn e poi ogni giorno finché resta aperto. Gli aggiornamenti si scaricano so" +
        "lo quando scegli Scarica."
    ),
    "settings.checkNow": "Controlla ora",
    "settings.restartAndUpdate": "Riavvia e aggiorna",
    "settings.updateChanges": "Modifiche in {version}",
    "settings.updateChangesUnavailable": "Dettagli della versione non disponibili. Puoi comunque aggiornare.",
    "settings.updateNetworkAccess": "Consenti accesso alla rete per gli aggiornamenti",
    "settings.updateNetworkAccessHint": (
        "Consente a Warplyn di contattare GitHub per i metadati pubblici delle versioni e gli aggiornamenti c" +
        "he scegli di scaricare. Non invia mai contenuti degli articoli, dati dell'account, identificatori de" +
        "l dispositivo o analisi."
    ),
    "settings.updateNetworkPermissionDescription": (
        "Warplyn contatterà api.github.com per i metadati pubblici delle versioni. Non invierà contenuti degl" +
        "i articoli, dati dell'account, identificatori del dispositivo o analisi."
    ),
    "settings.updateNetworkPermissionTitle": "Consentire a Warplyn di cercare aggiornamenti su GitHub?",
    "settings.updateRecovery": "Recupero aggiornamenti",
    "settings.updateStatus": "Stato degli aggiornamenti",
    "settings.updateStatusHint": "Versione attuale: {version}",
    "settings.updateStatusUnavailableHint": "Le impostazioni degli aggiornamenti si applicano quando questa versione supporta gli aggiornamenti.",
    "settings.updates": "Aggiornamenti",
    "settings.updatesAvailable": "La versione {version} è disponibile.",
    "settings.updatesChecking": "Ricerca aggiornamenti…",
    "settings.updatesCurrent": "Hai l'ultima versione.",
    "settings.updatesError.apply_failed": "Impossibile preparare l'aggiornamento. Riprova o apri Recupero aggiornamenti per assistenza.",
    "settings.updatesError.discovery_failed": "Impossibile cercare aggiornamenti. Riprova.",
    "settings.updatesError.download_failed": "Impossibile scaricare l'aggiornamento. Riprova.",
    "settings.updatesNetworkAccessRequired": "Consenti accesso alla rete per cercare aggiornamenti.",
    "settings.updatesUnavailable": "Gli aggiornamenti non sono disponibili in questa versione.",
    "settings.viewReleaseNotes": "Mostra note di rilascio",
    "settings.windowsUpdateDownloadHint": (
        "Scaricare un aggiornamento ne approva anche l'installazione. Una volta scaricato, verrà applicato au" +
        "tomaticamente alla prossima apertura di Warplyn, anche dopo la chiusura normale dell'app."
    ),
} satisfies Partial<Record<MessageId, string>>;
