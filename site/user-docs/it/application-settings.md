---
description: "Configura aspetto, impostazioni predefinite di scrittura, comportamento dell’assistente, indicazioni per la pubblicazione e preferenze di aggiornamento desktop di Warplyn."
---

# Impostazioni dell’applicazione

Le impostazioni dell’applicazione controllano l’aspetto e il comportamento di Warplyn. Non fanno parte della cronologia delle *versioni salvate* di un *articolo*. Apri **Impostazioni** dall’**area degli strumenti del pannello della biblioteca articoli**. Alcune impostazioni sono disponibili solo nell’app desktop; sono indicate di seguito.

## Impostare aspetto e lingua

In **Generali** → **Aspetto e lingua**, scegli **Sistema**, **Chiaro** o **Scuro** per **Aspetto preferito**. **Sistema** segue le impostazioni del dispositivo e si aggiorna mentre Warplyn è aperto. Scegli una **Lingua dell'interfaccia** per menu e messaggi. Al momento, l’inglese è l’unica lingua dell’interfaccia completa. Queste scelte non cambiano la lingua di scrittura di un *articolo* né le sue regole tipografiche.

In **Data e ora**, scegli un formato per la data, l’orario a 12 o 24 ore e un fuso orario. Le opzioni di sistema seguono il dispositivo. Queste scelte cambiano il modo in cui gli orari salvati vengono visualizzati in Warplyn, non gli orari salvati.

## Impostare le preferenze di scrittura

In **Lingue predefinite**, imposta **Lingua predefinita degli articoli** per i nuovi *articoli*. Imposta **Lingue di traduzione predefinite** per proporre prima quelle lingue di destinazione quando richiedi una *traduzione*. Inserisci il nome di una lingua, una variante regionale o un codice, quindi scegli **Aggiungi**. Warplyn ti chiede comunque di confermare ogni richiesta di traduzione.

## Impostare il comportamento dell’assistente

In **Assistente IA**, scegli **Proponi modifiche da rivedere** come impostazione predefinita per le nuove conversazioni su un *articolo*, oppure attiva **Applica modifiche direttamente** per le modifiche richieste esplicitamente. Questa impostazione predefinita non cambia le conversazioni esistenti; gli altri risultati generati devono comunque essere esaminati.

**Limite di tempo delle richieste** si applica a ogni nuova richiesta e a ogni nuovo tentativo. Il valore predefinito è due minuti. Scegli un limite più lungo o **Illimitato** per un’attività che richiede più tempo. Una richiesta che scade non modifica l’*articolo*.

Scegli **Invio** o **Ctrl + Invio** come tasto per inviare i messaggi all’assistente. Puoi modificare le altre scorciatoie dell’applicazione in **Scorciatoie da tastiera**. Warplyn segnala i conflitti prima di salvare una scorciatoia.

## Impostare le indicazioni di pubblicazione

In **Pubblicazione**, scegli un profilo predefinito per i nuovi *articoli*. Profili come **LinkedIn Post** e **LinkedIn Article** mostrano indicazioni sul numero di caratteri nell’**Article Status Bar**. Puoi anche scegliere **Nessuna restrizione** oppure aggiungere un profilo personalizzato con un nome e un limite di caratteri intero. L’impostazione predefinita vale per i nuovi *articoli*; un *articolo* esistente può mantenere il proprio profilo. I limiti sono solo indicativi e non impediscono mai di copiare il testo. Nell’**Article Status Bar**, scegli **Copia Markdown** oppure apri il menu e scegli **Copia testo semplice**. Warplyn copia il testo su richiesta; non pubblica direttamente.

## Rivedere le opzioni dei modelli di IA

In **Assistente IA**, puoi mantenere più connessioni a provider, attivare solo quelle che vuoi usare e assegnare modelli diversi alle attività generali dell’assistente e a *abilità* specifiche. Il **Modello predefinito** viene usato per le attività di IA, a meno che un’attività non abbia una scelta dedicata. L’opzionale **Modello dell'app**, separato dal modello predefinito, gestisce attività di Warplyn come riepiloghi e titoli; se non impostato, segue il modello predefinito. Usa **Preferiti**, la ricerca o il filtro per fornitore per trovare un modello. **Livello di ragionamento** appare per i modelli OpenAI supportati. Le attività e i controlli disponibili dipendono dal modello. Consulta [Provider e modelli di IA](providers.md) per configurare le connessioni e conoscere i limiti dei provider.

In **Scorciatoie da tastiera**, scegli una scorciatoia accanto a un’azione, quindi premi la combinazione di tasti desiderata. Puoi impostare scorciatoie per salvare una *versione salvata*, cambiare vista o attivare e disattivare *Modalità concentrazione*. Warplyn indica l’azione che usa già una scorciatoia in conflitto; scegli una combinazione diversa. **Invia con** determina se **Invio** o **Ctrl + Invio** invia una richiesta all’assistente. Modificare le scorciatoie non cambia il contenuto dell’*articolo*.

## Controllare gli aggiornamenti desktop

Le app desktop installate possono cercare nuove versioni in **Impostazioni** → **Informazioni** → **Aggiornamenti**. Prima abilita **Consenti accesso alla rete per gli aggiornamenti**. In questo modo Warplyn può contattare GitHub per consultare i dettagli delle versioni pubbliche e gli aggiornamenti che scegli di scaricare. Poi scegli **Cerca aggiornamenti automaticamente** e se **Includi versioni preliminari**. Scegli **Controlla ora** per eseguire il controllo in qualsiasi momento. Se è disponibile una nuova versione, vengono mostrate le relative note. Le installazioni Windows e Linux AppImage offrono le azioni **Scarica** e **Riavvia e aggiorna**. Le installazioni Debian usano **Mostra note di rilascio**, poi richiedono l’aggiornamento tramite gestore pacchetti o un programma di installazione `.deb` più recente. Consulta [Ripristino degli aggiornamenti desktop](update-recovery.md) se un aggiornamento impedisce l’avvio dell’app.

## Eliminare i dati locali

Nell’app desktop, **Elimina dati locali** rimuove definitivamente i dati Warplyn attivi, inclusi *articoli*, *versioni salvate*, checkpoint delle *bozze*, cronologia dell’assistente, dati di stile, impostazioni e copie di sicurezza locali contenute in quella cartella. Se è configurata una cartella per le copie di sicurezza, la schermata di conferma offre **Crea un backup prima di eliminare**. Warplyn deve completare la copia di sicurezza prima di eliminare qualsiasi dato. Dopo l’eliminazione l’app si chiude. La normale disinstallazione non rimuove i dati di scrittura. Le parole personali per il controllo ortografico salvate nel dizionario del sistema operativo restano lì; se vuoi eliminarle, rimuovile separatamente in **Impostazioni** → **Ortografia**.

Apri **Impostazioni** → **Informazioni** per trovare la guida per l’utente, il repository del codice sorgente, il tracker dei problemi e la licenza. Scegli **Apri guida rapida** per rivedere l’introduzione iniziale.
