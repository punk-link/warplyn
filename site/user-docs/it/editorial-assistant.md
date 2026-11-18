---
description: "Usa l’Assistente editoriale di Warplyn per redigere, rivedere, verificare i fatti, controllare lo stile e preparare traduzioni. Esamina i risultati generati prima di accettarli."
---

# Assistente editoriale

Usa l’Assistente editoriale quando vuoi aiuto per scrivere, rivedere, verificare i fatti, controllare lo stile o preparare una traduzione. Ogni richiesta è esplicita. Scegliere un’opzione in **Azioni rapide** inserisce solo l’avvio di un’*abilità* nel Composer. Seleziona **Invia richiesta editoriale** per iniziare.

Selezionare del testo permette di concentrare le modifiche su quel passaggio. Le definizioni vicine e gli indizi sul tono possono aiutare l’assistente a interpretare selezioni brevi, ma condividerli rivela al provider anche il testo non selezionato. Se una richiesta con selezione necessita del testo dell’*articolo*, Warplyn invia il passaggio selezionato e fino a 500 caratteri prima e dopo, come contesto separato in sola lettura. Può essere sostituito solo il passaggio selezionato. Prima dell’invio, il Composer spiega questo comportamento; non inviare la richiesta se il testo circostante è sensibile. I consigli generali e la gestione delle *abilità* non richiedono questo testo. Warplyn non estende mai di nascosto la selezione all’intero *articolo*. Se il contesto non basta, fornisci esplicitamente il passaggio pertinente oppure riprova con una selezione diversa.

::: tip Esempio
Per rivedere un racconto breve, seleziona un passaggio e chiedi: «Migliora la fluidità mantenendo il punto di vista di Ana e l’atmosfera tranquilla. Non aggiungere nuovi eventi». L’assistente prepara una *proposta* in **Revisione della proposta**. Puoi anche chiedergli di trovare i passaggi dal passato al presente in un capitolo; i *rilievi* della revisione di stile compaiono in **Profilo di stile**.
:::

[![Assistente editoriale di Warplyn con una richiesta di revisione narrativa e un’abilità selezionata.](/images/editorial-assistant-example.png)](/images/editorial-assistant-example.png)

*Esempio di richiesta nel Composer. Collega un provider prima di inviarla. Lo screenshot mostra il nome precedente di un’abilità.*

Durante il lavoro, l’assistente mostra un breve messaggio di attività. Scegli **Interrompi richiesta** per annullare un’operazione che richiede troppo tempo. Una richiesta annullata o non riuscita non modifica l’*articolo*; scegli **Riprova** per eseguirla di nuovo. L’assistente non mostra prompt, dati privati, credenziali o errori del provider. Quando il risultato è pronto, aprilo dalla relativa scheda:

- **Revisione della proposta** per i testi generati o rivisti.
- **Verifica dei fatti** per i *rilievi* informativi.
- **Profilo di stile** per i *rilievi* della revisione di stile.
- **Traduzioni** per una *proposta* di traduzione.

Aprire un risultato non modifica l’*articolo*. Esamina una *proposta* prima di accettarne le modifiche. I *rilievi* restano indicativi e le traduzioni sono *articoli* distinti e collegati. Consulta [Rivedere gli articoli](reviewing-articles.md) per proposte, cronologia, ripristino e Verifica dei fatti. Consulta [Traduzioni](translations.md) per confrontare e usare i risultati.

Per una verifica mirata dei termini tecnici, scegli **Verifica termini tecnici** da **Azioni rapide**. I *rilievi* con le relative fonti compaiono in **Verifica dei fatti**. Consulta [Verificare i termini tecnici](built-in-skills/check-technical-terms.md) per i passaggi e i limiti della verifica.

In **Revisione della proposta**, modifica direttamente il testo **Proposto** in layout **Affiancata** o **Sovrapposta**. **Originale** resta in sola lettura. Modificare il testo mantiene la decisione **Accetta** o **Rifiuta** di ogni modifica. Scegli una decisione per ciascuna modifica, poi seleziona **Applica** per completare la revisione. Il testo accettato crea una nuova *versione salvata*. Se rifiuti tutte le proposte, Applica chiude la revisione senza modificare l’*articolo* né creare una *versione salvata*. Per accettare tutte le modifiche, scegli **Segna tutto come accettato** da **Decisioni…**, poi applicale. **Segna tutto come rifiutato** lascia l’*articolo* invariato. **Reimposta decisioni** riporta ogni proposta allo stato In attesa e conserva le modifiche al testo proposto. Scegli **Scarta proposta** per cancellare la revisione.

Le modifiche non applicate restano disponibili quando cambi layout o Workspace View. Ricaricare la pagina, passare a un altro *articolo*, chiudere la *proposta* o generarne una nuova cancella tali modifiche. Se l’applicazione non riesce, vengono conservate per consentirti di riprovare. Mantieni invariati numeri, link, codice e termini tecnici proposti. Le *proposte* obsolete, inaffidabili o già accettate sono di sola lettura. Se modifichi la formulazione di una correzione fattuale, i relativi *rilievi* restano indicativi anche dopo l’applicazione.

Le *abilità* aiutano a definire una richiesta ma non aggiungono permessi. Per una richiesta senza abilità indicata, l’assistente sceglie quelle pertinenti. Le richieste normali non vengono instradate attraverso un flusso di modifica predefinito. Warplyn non svolge attività in background, non pubblica direttamente e non modifica un *articolo* senza la tua approvazione.

Chiedi all’assistente di creare un’[abilità](skills.md) riutilizzabile se vuoi poter ripetere una procedura. Se lo scopo, i passaggi o i riferimenti non sono chiari, potrebbe farti una breve domanda di approfondimento. L’abilità creata è subito disponibile e ha una cronologia locale distinta di *versioni dell’abilità*. La creazione non legge il corpo dell’*articolo* e non ne modifica la *bozza*, la *proposta* o la *versione salvata*.

Puoi chiedere all’Assistente editoriale di esaminare **Cronologia delle versioni**, il lavoro editoriale salvato, le indicazioni per la pubblicazione o lo stato del corpus di stile. Su richiesta esplicita, può aggiungere al corpus di stile locale la *versione salvata* attuale e immutabile e ricostruire il profilo di stile. Non può accettare *proposte*, ripristinare *versioni salvate*, risolvere *rilievi*, modificare *bozze*, eliminare campioni di stile o pubblicare.

Per gli esempi di scrittura, le indicazioni riutilizzabili o le regole tipografiche, apri [Profilo di stile](style-profile.md). I *rilievi* della revisione di stile compaiono lì e restano separati dall’*articolo*.
