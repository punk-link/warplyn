---
description: "Passa da Skladno a Warplyn usando una copia di sicurezza, mantenendo disponibili l’installazione originale e i tuoi testi per eventuali ripristini."
---

# Passare da Skladno a Warplyn

Warplyn è un’applicazione separata. Mantieni Skladno e i suoi dati finché non hai verificato il ripristino del tuo lavoro. Non spostare in Warplyn la cartella dei dati attivi di Skladno.

Scarica il programma di installazione Windows 11 x64 o il pacchetto Debian x64 dall’[ultima release di Warplyn](https://github.com/punk-link/warplyn/releases/latest). Consulta [Installare Warplyn](installation.md) per le istruzioni specifiche della piattaforma.

Prima di migrare, scegli una **Cartella dei backup** in **Impostazioni** → **Dati e backup** e seleziona **Crea backup**. Conserva ogni copia `.sqlite` insieme alla cartella `.sqlite.skills` corrispondente. Per i dettagli, consulta [Backup e ripristino](backups-and-recovery.md).

## Procedura di migrazione

1. In Skladno, termina o annulla le operazioni di IA in corso, quindi chiudi e riapri l’app per salvare il checkpoint più recente. Durante la creazione della copia, evita di modificare dall’esterno i file delle *abilità* dell’autore.
2. Crea una copia di sicurezza manuale dall’app Skladno mentre è in esecuzione, anche se usa una cartella dati personalizzata. Mantieni il file `.sqlite` e la cartella `.sqlite.skills` adiacente insieme e con i nomi originali. Al termine della copia, chiudi Skladno.
3. Installa e avvia Warplyn con un profilo vuoto separato. Non indicare mai la cartella dei dati attivi di Skladno.
4. In **Impostazioni** → **Dati e backup**, scegli la cartella della copia di migrazione e seleziona **Ripristina un backup**. Seleziona l’istantanea Skladno, conferma la sostituzione e attendi il riavvio di Warplyn. Se Warplyn contiene già del lavoro, crea prima una sua copia di sicurezza: il ripristino sostituisce il contenuto e non unisce i database.
5. Prima di riprendere a scrivere, controlla gli *articoli*, le *bozze* più recenti, la cronologia delle *versioni salvate*, le conversazioni dell’assistente, le *impostazioni*, i profili di pubblicazione e le *abilità* dell’autore.
6. In **Impostazioni** → **Assistente IA**, aggiungi di nuovo le connessioni e scegli i modelli per i tuoi ruoli. Il ripristino elimina le connessioni salvate e le selezioni dei modelli perché la copia non contiene le credenziali. Le credenziali di Skladno restano invariate.
7. Per le connessioni tramite variabile d’ambiente, inserisci di nuovo il nome della variabile e verifica che sia disponibile nell’ambiente del processo Warplyn. Le copie di sicurezza non includono mai i file `.env` né i loro valori.
8. Scegli una cartella separata per le copie di sicurezza periodiche di Warplyn. Imposta di nuovo le preferenze per la rete degli aggiornamenti e la telemetria. La migrazione non copia le preferenze della cartella di backup, l’identità di telemetria, gli aggiornamenti preparati né i dati di ripristino in sospeso.

Le copie native con una cartella `.sqlite.skills` ripristinano le *abilità* attuali dell’autore e la cronologia immutabile delle *versioni delle abilità*. Le vecchie istantanee `.sqlite` che contengono solo il database ripristinano quest’ultimo e lasciano invariate le *abilità* già presenti nella destinazione; non possono ripristinare file che non contenevano. I nomi dei file di database e i formati del manifesto restano compatibili con Skladno.

## Ripristino

Mantieni Skladno installato finché non hai verificato il ripristino. Le app non sincronizzano né uniscono le modifiche successive. Se torni a Skladno, lo ritroverai nello stato precedente alla migrazione.

Se il ripristino non riesce, continua a usare Skladno e conserva la coppia originale di file della copia. Warplyn convalida la copia e conserva un’istantanea di ripristino della destinazione; se l’avvio non riesce, torna a quell’istantanea. Risolvi il problema segnalato e riprova. Consulta [Backup e ripristino](backups-and-recovery.md) e [Ripristino dopo un aggiornamento](update-recovery.md).

Per impostazione predefinita, Warplyn usa `~/.warplyn`; per scegliere un’altra cartella, imposta `WARPLYN_DATA_DIR`. Warplyn ignora `SKLADNO_DATA_DIR` per l’archiviazione attiva e rifiuta i percorsi che si sovrappongono a posizioni legacy note. Scegli una cartella separata e vuota, quindi ripristina una copia invece di copiare un database SQLite attivo.
