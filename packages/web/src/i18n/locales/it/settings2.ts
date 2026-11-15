import type { MessageId } from "../../messages.js";

export const settings2 = {
    "settings.specificModelHint": "Lascia Usa modello predefinito, a meno che l'attività richieda un modello diverso.",
    "settings.publishingProfile": "Profilo del limite di caratteri",
    "settings.publishingProfileHint": "Mostra quando il testo si avvicina a questa lunghezza. Il limite è indicativo e non impedisce mai la copia.",
    "settings.publishingProfileNote": (
        "Questo profilo è usato dalla barra di stato dell'articolo e dal controllo Copia. I profili personali" +
        "zzati modificabili estenderanno queste basi."
    ),
    "settings.profileCharacters": "{label}: {count} caratteri",
    "settings.customProfileName": "Nome del profilo personalizzato",
    "settings.customProfileNameHint": "L'etichetta locale per il tuo limite di pubblicazione personalizzato.",
    "settings.customProfileLimit": "Limite di caratteri personalizzato",
    "settings.customProfileLimitHint": "Un limite indicativo non negativo. Non blocca mai la copia.",
    "settings.customProfileInvalid": "Inserisci un nome e un limite di caratteri intero non negativo.",
    "settings.saveCustomProfile": "Salva profilo personalizzato",
    "settings.customProfiles": "Profili personalizzati",
    "settings.customProfilesHint": "Aggiungi tutti i profili locali di limite di caratteri che ti servono.",
    "settings.addCustomProfile": "Aggiungi profilo personalizzato",
    "settings.remove": "Rimuovi",
    "settings.removeCustomProfile": "Rimuovi {name}",
    "settings.removeCustomProfileTitle": "Rimuovere il profilo personalizzato?",
    "settings.removeCustomProfileDescription": "Rimuovere <profile>{name}</profile> dai profili di pubblicazione locali?",
    "settings.removeCustomDefaultDescription": "Rimuovere <profile>{name}</profile>? Il profilo predefinito tornerà a Predefinito.",
    "settings.backupFolder": "Cartella dei backup",
    "settings.backupFolderHint": "Scegli una cartella locale per i backup. Warplyn può scriverci solo dopo la tua scelta.",
    "settings.chooseBackupFolder": "Scegli cartella dei backup",
    "settings.revealBackupFolder": "Mostra cartella",
    "settings.managedCredential": "Credenziale gestita",
    "settings.backupFolderSelected": "In uso: {folderName}",
    "settings.backupFolderFailed": "Impossibile scegliere questa cartella. Riprova.",
    "settings.backupFolderRequired": "Scegli prima una cartella dei backup.",
    "settings.backupFolderPermissionDenied": "Warplyn non può accedere a questa cartella. Sceglila di nuovo e consenti l'accesso.",
    "settings.backupFolderUnsupported": "Questo browser non può scegliere una cartella dei backup.",
    "settings.automaticBackups": "Backup automatici",
    "settings.automaticBackupsHint": (
        "Se attivi, viene creato un backup poco dopo l'avvio e ogni 24 ore da quell'esecuzione mentre Warplyn" +
        " resta aperto. I backup manuali non vengono mai rimossi automaticamente."
    ),
    "settings.automaticBackupFailed": (
        "Backup automatico non riuscito. Controlla la cartella in Dati e backup, poi crea un backup manuale. " +
        "Gli articoli non sono cambiati."
    ),
    "settings.off": "Disattivato",
    "settings.daily": "Ogni giorno",
    "settings.retention": "Conservazione dei backup automatici",
    "settings.retentionHint": "Controlla quanti backup automatici conserva Warplyn. I backup manuali non vengono mai rimossi automaticamente.",
    "settings.keepBackups": "Conserva {count} backup",
    "settings.keepAllBackups": "Conserva tutti i backup",
    "settings.createBackup": "Crea backup",
    "settings.createBackupHint": (
        "Copia articoli, versioni salvate, impostazioni, abilità dell'autore e relativa cronologia. I backup " +
        "nel browser supportano file fino a 100 MB e 500 MB totali. Le chiavi API sono escluse."
    ),
    "settings.backupCreating": "Creazione backup…",
    "settings.backupCreated": "Creato {name}",
    "settings.backupCreateFailed": (
        "Impossibile creare il backup. Controlla la cartella e i limiti del browser, poi riprova. La sessione" +
        " di modifica non è cambiata."
    ),
    "settings.backupCreateUnavailable": "I backup non sono disponibili in questa sessione del browser.",
    "settings.restoreBackup": "Ripristina un backup",
    "settings.restoreBackupHint": (
        "Scegli un backup dalla cartella selezionata. Warplyn controlla i file, conserva una copia di recuper" +
        "o e ripristina articoli, versioni salvate, impostazioni e abilità. Le connessioni IA esistenti resta" +
        "no locali. Si possono ripristinare riferimenti a variabili d'ambiente; chiavi API e valori delle var" +
        "iabili non vengono mai importati. I vecchi backup del solo database conservano le abilità attuali."
    ),
    "settings.restoreBackupFailed": (
        "Impossibile ripristinare questo backup. Controlla i file e i limiti del browser o scegli un altro ba" +
        "ckup. I dati attivi non sono cambiati."
    ),
    "settings.restoreBackupUnavailable": "Questo backup non può essere ripristinato.",
    "settings.chooseBackup": "Scegli un backup",
    "settings.restoreBackupConfirm": "Ripristinare {name}? Warplyn sostituirà i dati locali attivi e si ricaricherà.",
    "settings.deleteData": "Elimina dati locali",
    "settings.deleteLocalData": "Elimina tutti i dati locali",
    "settings.deleteLocalDataHint": (
        "Elimina definitivamente articoli, checkpoint delle bozze, versioni salvate, cronologia dell'assisten" +
        "te, dati di stile, impostazioni e backup locali nella cartella dati di Warplyn. Nella conferma puoi " +
        "prima creare un backup verificato."
    ),
    "settings.deleteLocalDataFailed": "Impossibile eliminare i dati locali. Nessuna eliminazione completa è stata segnalata.",
    "settings.loading": "Caricamento impostazioni…",
    "settings.privacyAndDiagnostics": "Privacy e diagnostica",
    "settings.telemetry": "Condividi dati diagnostici e di utilizzo",
    "settings.telemetryHint": (
        "Aiutaci a migliorare Warplyn inviando a PostHog eventi pseudonimi di affidabilità e utilizzo. Testi " +
        "degli articoli, prompt, risposte IA e chiavi API non sono mai inclusi."
    ),
    "settings.telemetryDisclosure": (
        "La telemetria è disattivata per impostazione predefinita. Attiva la condivisione per aiutarci a capi" +
        "re la tua esperienza e migliorare Warplyn. Puoi disattivarla in qualsiasi momento; questo ferma la r" +
        "accolta futura ma non ritira i dati già inviati."
    ),
    "settings.telemetryDetails": "Dettagli della telemetria",
    "settings.telemetryIdentifier": "ID telemetria",
    "settings.telemetryIdentifierHint": (
        "Includi questo ID quando chiedi la cancellazione. Copialo prima di disattivare la telemetria, perché" +
        " la disattivazione lo elimina."
    ),
    "settings.copyTelemetryIdentifier": "Copia ID telemetria",
    "settings.telemetryIdentifierCopied": "ID telemetria copiato.",
    "settings.telemetrySaveFailed": "Impossibile salvare questa scelta. L'impostazione precedente resta invariata. Riprova.",
    "settings.telemetryUnavailable": "La telemetria è disponibile solo in un'app pacchettizzata e configurata.",
    "settings.saved": "Salvato",
    "settings.loadingFailed": "Impossibile caricare le Impostazioni. Quelle salvate non sono cambiate. Aggiorna e riprova.",
    "settings.saving": "Salvataggio…",
    "settings.saveFailed": "Impossibile salvare le Impostazioni. Quelle precedenti non sono cambiate. Riprova.",
    "settings.modelSaveFailed": "Impossibile salvare le preferenze dei modelli. Le Impostazioni precedenti non sono cambiate. Riprova.",
    "settings.backupSaveFailed": "Impossibile salvare le impostazioni dei backup. Quelle precedenti non sono cambiate. Riprova.",
    "settings.updates": "Aggiornamenti",
    "settings.updateNetworkAccess": "Consenti accesso alla rete per gli aggiornamenti",
    "settings.updateNetworkAccessHint": (
        "Consente a Warplyn di contattare GitHub per i metadati pubblici delle versioni e gli aggiornamenti c" +
        "he scegli di scaricare. Non invia mai contenuti degli articoli, dati dell'account, identificatori de" +
        "l dispositivo o analisi."
    ),
} satisfies Partial<Record<MessageId, string>>;
