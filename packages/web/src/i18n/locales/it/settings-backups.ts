import type { MessageId } from "../../messages.js";


export const settingsBackupsMessages = {
    "settings.automaticBackupFailed": (
        "Backup automatico non riuscito. Controlla la cartella in Dati e backup, poi crea un backup manuale. Gli artico" +
        "li non sono cambiati."
    ),
    "settings.automaticBackups": "Backup automatici",
    "settings.automaticBackupsHint": (
        "Se attivi, viene creato un backup poco dopo l'avvio e ogni 24 ore da quell'esecuzione mentre Warplyn" +
        " resta aperto. I backup manuali non vengono mai rimossi automaticamente."
    ),
    "settings.backupAutomation": "Backup automatici",
    "settings.backupCreateFailed": (
        "Impossibile creare il backup. Controlla la cartella e i limiti del browser, poi riprova. La sessione di modifi" +
        "ca non è cambiata."
    ),
    "settings.backupCreateUnavailable": "I backup non sono disponibili in questa sessione del browser.",
    "settings.backupCreated": "Creato {name}",
    "settings.backupCreating": "Creazione backup…",
    "settings.backupFolder": "Cartella dei backup",
    "settings.backupFolderFailed": "Impossibile scegliere questa cartella. Riprova.",
    "settings.backupFolderHint": "Scegli una cartella locale per i backup. Warplyn può scriverci solo dopo la tua scelta.",
    "settings.backupFolderPermissionDenied": "Warplyn non può accedere a questa cartella. Sceglila di nuovo e consenti l'accesso.",
    "settings.backupFolderRequired": "Scegli prima una cartella dei backup.",
    "settings.backupFolderSelected": "In uso: {folderName}",
    "settings.backupFolderUnsupported": "Questo browser non può scegliere una cartella dei backup.",
    "settings.backupSaveFailed": "Impossibile salvare le impostazioni dei backup. Quelle precedenti non sono cambiate. Riprova.",
    "settings.backupStorage": "Archivio backup",
    "settings.chooseBackup": "Scegli un backup",
    "settings.chooseBackupFolder": "Scegli cartella…",
    "settings.createBackup": "Crea backup",
    "settings.createBackupHint": (
        "Copia articoli, versioni salvate, impostazioni, abilità dell'autore e relativa cronologia. I backup " +
        "nel browser supportano file fino a 100 MB e 500 MB totali. Le chiavi API sono escluse."
    ),
    "settings.dataBackups": "Dati e backup",
    "settings.keepAllBackups": "Conserva tutti i backup",
    "settings.keepBackups": "Conserva {count} backup",
    "settings.restoreBackup": "Ripristina un backup",
    "settings.restoreBackupConfirm": "Ripristinare {name}? Warplyn sostituirà i dati locali attivi e si ricaricherà.",
    "settings.restoreBackupFailed": (
        "Impossibile ripristinare questo backup. Controlla i file e i limiti del browser o scegli un altro backup. I da" +
        "ti attivi non sono cambiati."
    ),
    "settings.restoreBackupHint": (
        "Scegli un backup dalla cartella selezionata. Warplyn controlla i file, conserva una copia di recuper" +
        "o e ripristina articoli, versioni salvate, impostazioni e abilità. Le connessioni IA esistenti resta" +
        "no locali. Si possono ripristinare riferimenti a variabili d'ambiente; chiavi API e valori delle var" +
        "iabili non vengono mai importati. I vecchi backup del solo database conservano le abilità attuali."
    ),
    "settings.restoreBackupUnavailable": "Questo backup non può essere ripristinato.",
    "settings.retention": "Conservazione dei backup automatici",
    "settings.retentionHint": "Controlla quanti backup automatici conserva Warplyn. I backup manuali non vengono mai rimossi automaticamente.",
    "settings.revealBackupFolder": "Mostra cartella",
} satisfies Partial<Record<MessageId, string>>;
