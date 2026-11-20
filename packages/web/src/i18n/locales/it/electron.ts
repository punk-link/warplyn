import type { MessageId } from "../../messages.js";


export const electronMessages = {
    "electron.articleFiles.docx": "File Word",
    "electron.articleFiles.html": "File HTML",
    "electron.articleFiles.load": "Carica articolo da file",
    "electron.articleFiles.markdown": "File Markdown",
    "electron.articleFiles.rtf": "File Rich Text",
    "electron.articleFiles.save": "Salva articolo su file",
    "electron.closeFailed.message": "Il checkpoint della bozza è stato salvato, ma il database locale non si è chiuso correttamente.",
    "electron.closeFailed.title": "Warplyn non ha potuto chiudersi correttamente",
    "electron.deleteData.backup": "Crea un backup prima di eliminare",
    "electron.deleteData.cancel": "Annulla",
    "electron.deleteData.delete": "Elimina tutti i dati locali",
    "electron.deleteData.detail": "Warplyn si chiuderà dopo l'eliminazione. Puoi prima creare un backup se è configurata una cartella di backup.",
    "electron.deleteData.message": (
        "Questa operazione elimina definitivamente articoli, checkpoint delle bozze, versioni salvate, cronol" +
        "ogia dell'assistente, dati di stile, impostazioni e backup locali nella cartella dati di Warplyn."
    ),
    "electron.deleteData.title": "Eliminare tutti i dati locali di Warplyn?",
    "electron.draftCheckpointFailed.detail": "Torna all'articolo e riprova, oppure esci senza le ultime modifiche non salvate.",
    "electron.draftCheckpointFailed.message": "Warplyn non ha potuto salvare l'ultimo checkpoint della bozza.",
    "electron.draftCheckpointFailed.quit": "Esci senza l'ultimo checkpoint",
    "electron.draftCheckpointFailed.return": "Torna all'articolo",
    "electron.draftCheckpointFailed.title": "Checkpoint della bozza non riuscito",
    "electron.restoreBackup.cancel": "Annulla",
    "electron.restoreBackup.detail": (
        "Warplyn salverà gli ultimi checkpoint delle bozze, conserverà una copia di recupero dei dati attivi " +
        "e si riavvierà. Le connessioni IA esistenti restano locali. I riferimenti alle variabili d'ambiente " +
        "possono essere ripristinati; chiavi API e valori delle variabili non vengono mai importati. Non puoi" +
        " annullare questa operazione dalle impostazioni."
    ),
    "electron.restoreBackup.message": "Questa operazione sostituisce i dati locali attivi di Warplyn con il backup selezionato.",
    "electron.restoreBackup.restore": "Ripristina e riavvia",
    "electron.restoreBackup.title": "Ripristinare questo backup?",
    "electron.restoreFailed.message": (
        "Chiudi le altre finestre di Warplyn o i server di sviluppo locali che usano questi dati, poi riprova. I dati a" +
        "ttivi non sono stati modificati."
    ),
    "electron.restoreFailed.title": "Impossibile ripristinare il backup",
    "electron.spelling.addWord": "Aggiungi al dizionario",
    "electron.startFailed.message": "Verifica che la cartella dei dati locali sia disponibile, poi riprova.",
    "electron.startFailed.title": "Warplyn non ha potuto avviarsi",
} satisfies Partial<Record<MessageId, string>>;
