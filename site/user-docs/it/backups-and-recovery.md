---
description: "Crea copie di sicurezza automatiche o manuali di Warplyn, ripristina testi e abilità e recupera i dati in sicurezza in caso di problemi."
---

# Copie di sicurezza e ripristino

## Creare una copia di sicurezza

In **Impostazioni** → **Dati e backup**, scegli una **Cartella dei backup**, quindi seleziona **Crea backup**. Nei browser supportati, Warplyn chiede il permesso di scrivere le copie di sicurezza solo in quella cartella.

[![Impostazioni Dati e backup con la cartella per le copie di sicurezza, i comandi Crea backup e Ripristina un backup e le opzioni di copia automatica.](/images/backups-and-recovery.png)](/images/backups-and-recovery.png)

*Impostazioni Dati e backup nell’app desktop.*

::: tip Contenuto di una copia di sicurezza
Una nuova copia `.skladno` include il database, le *abilità* attuali create dall’autore, la relativa cronologia delle versioni e un manifest dei file. Le copie di sicurezza non includono file `.env` né chiavi API.
:::

::: tip Limiti delle copie dal browser
Il trasferimento di copie di sicurezza dal browser supporta file fino a 100 MB ciascuno e 500 MB in totale. Se la copia supera questi limiti, usa l’app desktop.
:::

Nell’app desktop, ogni snapshot del database ha una cartella `.sqlite.skills` associata, che contiene le *abilità* attuali create dall’autore, la relativa cronologia delle versioni, le parole personali per il controllo ortografico e un manifest. Quando copi o ripristini uno snapshot, tieni insieme il file `.sqlite` e la cartella `.sqlite.skills`. Le copie dal browser non includono le parole personali per il controllo ortografico.

Le copie `.sqlite` meno recenti contengono solo il database. Ripristinandone una, i file e la cronologia delle *abilità* attuali vengono mantenuti.

## Copie di sicurezza automatiche

Imposta **Backup automatici** su **Ogni giorno** per creare uno snapshot poco dopo l’avvio di Warplyn e poi ogni 24 ore finché resta aperto. Nel browser, Warplyn deve avere il permesso di usare la cartella scelta. Se una copia automatica non riesce, controlla la cartella e creane una manuale. Warplyn riproverà all’orario previsto.

**Conservazione dei backup automatici** determina quanti snapshot automatici Warplyn conserva. Rimuove solo gli snapshot automatici meno recenti; le copie create manualmente vengono sempre mantenute.

## Ripristinare una copia di sicurezza

1. In **Impostazioni** → **Dati e backup**, seleziona **Ripristina un backup**.
2. Scegli la copia da ripristinare. Warplyn controlla i file del backup e salva sul dispositivo una copia del database e dei file delle *abilità* attuali. Così puoi tornare allo stato precedente, se necessario.
3. Al termine del ripristino, controlla i tuoi *articoli* e le relative *versioni salvate*.

Il ripristino di una copia `.skladno` o di uno snapshot desktop con la relativa cartella associata sostituisce il database e le *abilità* salvate. Il ripristino di una vecchia copia `.sqlite` che contiene solo il database sostituisce solo il database.

Il ripristino di una copia desktop aggiunge al dizionario anche le parole personali per il controllo ortografico salvate. Le parole già presenti restano. Le copie più vecchie che non contengono parole personali non modificano il dizionario. I dizionari delle lingue scaricati e le opzioni di precaricamento per il controllo ortografico non sono inclusi.

::: warning Impostazioni di IA dopo il ripristino
Il ripristino mantiene le connessioni di IA, le credenziali e le selezioni dei modelli già presenti in questa installazione. Se non è configurata alcuna connessione, Warplyn ripristina dalla copia i nomi e i riferimenti delle variabili d’ambiente, ma mai le chiavi API né i valori delle variabili. Imposta su questo computer le variabili mancanti, quindi scegli i modelli in **Impostazioni** → **Assistente IA**. Le connessioni basate su chiavi API salvate non vengono importate in una nuova installazione: aggiungile in Impostazioni. Le altre impostazioni vengono ripristinate. Se il ripristino non riesce, il rollback conserva la configurazione di IA precedente.
:::

## Ripristinare manualmente una copia del solo database

Segui questi passaggi solo per una copia `.sqlite` legacy. Non riavviare Warplyn finché il database non è stato ripristinato.

1. Crea una copia del database locale attuale.
2. Nella cartella dati di Warplyn, sostituisci il file `skladno.sqlite` con la copia di sicurezza.
3. Avvia Warplyn e controlla i tuoi *articoli* e le relative *versioni salvate*.

Per ripristinare una copia che include *abilità*, usa **Ripristina un backup** in **Impostazioni**, così Warplyn può verificare e ripristinare anche il relativo manifest e la cronologia delle versioni.

## Se non è possibile creare una copia di sicurezza

Warplyn lascia invariati il database attivo e la sessione di modifica. Controlla che la cartella di destinazione esista e che il tuo account possa scrivervi, quindi riprova.

## Permessi dei file

Per impostazione predefinita, il servizio locale salva il database in `~/.warplyn`. Imposta `WARPLYN_DATA_DIR` per scegliere un’altra cartella. Warplyn ignora `SKLADNO_DATA_DIR` e non usa cartelle che si sovrappongono alla vecchia posizione dati di Skladno. Se stai passando da Skladno, scegli una cartella Warplyn separata e ripristina una copia di sicurezza.

Nei sistemi POSIX, Warplyn limita al tuo account l’accesso alla cartella dati e ai file SQLite, anche dopo un aggiornamento. Windows usa i permessi del file system gestiti da Windows. I file di backup creati dal browser usano i permessi della cartella scelta: conservali in una cartella privata e controlla le impostazioni di condivisione prima di usare una posizione condivisa o sincronizzata.
