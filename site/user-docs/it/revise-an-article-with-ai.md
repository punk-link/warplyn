---
description: "Rivedi un articolo con l’IA in Warplyn: formula una richiesta mirata, confronta le modifiche proposte, applica quelle scelte e conserva le versioni precedenti."
---

# Rivedere un articolo con l’IA e controllare ogni modifica

Se in una scena succede quello che avevi in mente ma il ritmo non ti convince, chiedi all’Assistente editoriale di aiutarti a rivederla. Puoi lavorare su un passaggio o su un *articolo* intero, confrontare le formulazioni proposte e applicare le modifiche che vuoi conservare.

Warplyn è un’area di scrittura open source e con dati locali, disponibile per Windows e Linux. I tuoi testi restano sul computer. L’assistenza con IA richiede una connessione a Internet, un provider supportato e la relativa chiave API. Warplyn invia al provider il testo e il contesto necessari per la richiesta. Si applicano le tariffe e le norme sui dati del provider.

Conserva le indicazioni ricorrenti in una [nota editoriale](writing-and-articles.md#editor-notes) accanto al passaggio. Controlla **Note che accompagnano questa richiesta** prima dell'invio. Salvare una nota non avvia una richiesta.

## Inizia con una richiesta mirata

Apri il tuo *articolo* e seleziona il passaggio da rivedere. Nel campo di composizione, descrivi cosa dovrebbe migliorare e cosa deve restare invariato. Per esempio, mentre lavori a «Il fiume al crepuscolo»:

> Migliora la fluidità mantenendo il punto di vista di Ana e l’atmosfera tranquilla. Non aggiungere nuovi eventi.

Seleziona **Invia richiesta editoriale**. Warplyn invia la selezione con fino a 500 caratteri precedenti e 500 successivi come contesto in sola lettura. Può essere sostituito solo il passaggio selezionato. Prima di inviare un testo riservato, leggi l’avviso nel campo di composizione. Indica quale testo verrà inviato. Per maggiori dettagli, consulta [Assistente editoriale](editorial-assistant.md).

[![campo di composizione di Warplyn con una richiesta di revisione di un testo narrativo.](/images/editorial-assistant-example.png)](/images/editorial-assistant-example.png)

*Esempio di richiesta nel campo di composizione. Lo screenshot mostra il nome precedente di un’abilità.*

## Confronta il testo originale con quello proposto

Al termine della richiesta, apri **Revisione della proposta** dalla relativa scheda dei risultati. Confronta **Originale** e **Proposto** e verifica che la revisione mantenga gli eventi della scena, il punto di vista e la voce.

[![Revisione della proposta confronta i testi Originale e Proposto, mostra le decisioni individuali e il comando Applica.](/images/proposal-review.png)](/images/proposal-review.png)

*Esempio di revisione per «Il fiume al crepuscolo». Il testo generato varia in base alla richiesta e al modello.*

Scegli **Accetta** o **Rifiuta** per ogni modifica. Puoi modificare il testo **Proposto** prima di applicarlo. Se Warplyn non può suddividere una *proposta* in modo sicuro, ti avvisa che devi rivederla per intero.

## Applica le modifiche e conserva la cronologia

Dopo aver deciso su ogni modifica, scegli **Applica**. Warplyn registra il testo con le modifiche accettate come nuova *versione salvata*. Rifiutando tutte le modifiche, l’*articolo* resta invariato e non viene creata alcuna *versione salvata*. Le decisioni da sole non modificano il testo.

Apri **Cronologia delle versioni** per consultare le versioni salvate precedenti. Ripristinarne una aggiunge un’altra *versione salvata* e conserva la cronologia intermedia. Consulta [Rivedere gli articoli](reviewing-articles.md) per le opzioni di ripristino e le *proposte* obsolete.

Le revisioni con IA potrebbero non rispettare le tue intenzioni o modificare dettagli che volevi conservare. Controlla il risultato prima di applicarlo; se necessario, invia una nuova richiesta più circoscritta. Una richiesta annullata o non riuscita non modifica l’*articolo*.

## Provalo con i tuoi testi

[Scarica Warplyn](https://github.com/punk-link/warplyn/releases/latest), segui la [guida all’installazione](installation.md) e collega un [provider di IA](providers.md) supportato. I programmi di installazione Windows non sono firmati; la guida all’installazione spiega l’avviso che potresti vedere.
