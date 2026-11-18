---
description: "Crea un Profilo di stile locale dai tuoi testi e gestisci le regole per la voce e la tipografia."
---

# Profilo di stile

Usa il **Profilo di stile** per fornire all’assistente esempi dei tuoi testi e indicazioni riutilizzabili. Gli esempi restano su questo dispositivo e non diventano parte di un *articolo* o di una *versione salvata*.

Apri il **Profilo di stile** dall’area degli strumenti del pannello della biblioteca articoli. Usa il menu laterale oppure, in una finestra stretta, il selettore di sezione per scegliere **Campioni di scrittura**, **Regole manuali** o **Regole tipografiche**. Il pulsante **Indietro** ti riporta all’*articolo* e alla vista che avevi lasciato.

::: tip Scegli da dove iniziare
Aggiungi esempi di scrittura se vuoi rilevare le caratteristiche della tua voce oppure usa **Regole manuali** se sai già quali indicazioni fornire. Puoi usare una delle due opzioni senza l’altra.
:::

## Aggiungere esempi di scrittura

Apri **Campioni di scrittura** se vuoi che l’assistente impari dai tuoi testi esistenti. Scegli **Aggiungi campione di scrittura** per incollare del testo oppure carica un file `.txt` o `.md`. Puoi anche scegliere **Add Revision** per usare come esempio una versione salvata di un *articolo*. Assegna all’esempio un nome che ti aiuti a riconoscerlo in seguito.

Usa la casella di controllo dell’esempio per includerlo nel profilo o escluderlo. Escludere un esempio lo mantiene nell’elenco. Rimuovilo quando non ti serve più. Per rimuoverlo serve una conferma, perché viene eliminato da Profilo di stile.

## Aggiungere indicazioni e ricostruire il profilo

Usa **Regole manuali** per descrivere le preferenze che l’assistente deve seguire. Per esempio, puoi chiedergli di mantenere la narrazione in prima persona o di spiegare un’abbreviazione alla prima occorrenza. Puoi aggiungere indicazioni anche senza esempi.

Dopo aver modificato gli esempi o le indicazioni, scegli **Ricostruisci profilo** per aggiornare le caratteristiche rilevate. Il profilo mostra quali esempi ha usato e quando è stato ricostruito. Fino ad allora, le caratteristiche rilevate potrebbero riferirsi al gruppo di esempi precedente. I *rilievi* della revisione di stile sono indicazioni e restano separati dal testo dell’*articolo*.

[![Schermata Regole manuali di Profilo di stile con una regola generale sul punto di vista di Ana e il comando Ricostruisci profilo.](/images/style-profile-rules.png)](/images/style-profile-rules.png)

*Esempio di regola manuale in Profilo di stile.*

::: details Esempio di regola manuale
Aggiungi scene che mostrino il punto di vista ravvicinato di Ana e immagini tranquille, escludi gli esempi che non vuoi usare, quindi ricostruisci il profilo. Aggiungi una regola come «Mantieni la narrazione vicina al punto di vista di Ana» se vuoi che questa preferenza valga anche quando gli esempi non la mostrano chiaramente.
:::

## Regole tipografiche

Apri **Regole tipografiche** e seleziona **Lingua della tipografia**. Le convenzioni vengono salvate separatamente per ogni lingua di scrittura, indipendentemente dalla lingua dell’interfaccia. **Applica regole a** permette di scegliere tra **Tutti gli articoli in questa lingua** e **Solo questo articolo**. Una *traduzione* usa la propria lingua e le proprie preferenze.

Il menu **Lingua di origine** nella barra di stato include le lingue regionali del catalogo predefinito. Per un’altra lingua, scegli **Altra lingua…** e inserisci il relativo codice, per esempio `ja` per il giapponese. Puoi poi salvare regole tipografiche personalizzate per quella lingua anche senza un preset integrato.

Usa **Aggiungi regola** per scegliere virgolette, lineette per la prosa, puntini di sospensione, spaziatura della punteggiatura, spazi ripetuti o una coppia inscindibile, come `10 kg`. **Coppia personalizzata** permette di definire le virgolette di apertura e chiusura e gli spazi al loro interno. **Sostituzione letterale della punteggiatura** applica una convenzione esatta di punteggiatura o spaziatura. Usa **Istruzione tipografica contestuale** quando una regola richiede una valutazione contestuale.

::: info Lingua e ambito
Scegli la lingua di scrittura e indica se le regole valgono per tutti gli *articoli* in quella lingua o solo per l’*articolo* attuale. Una *traduzione* ha impostazioni proprie per lingua e tipografia.
:::

**Convenzioni predefinite** mostra un’anteprima delle convenzioni regionali. Le anteprime con l’etichetta **in attesa di verifica madrelingua** non si possono ancora applicare; puoi configurare regole personalizzate. Le convenzioni regionali non si applicano automaticamente ad altre regioni. Se le regole precedenti erano globali, **Copia le regole precedenti in questa lingua** ne assegna una copia a questa lingua senza eliminare gli originali.

Le regole dell’*articolo* ereditano le convenzioni salvate per la lingua. Modificare una regola ereditata la sostituisce; rimuoverla la disattiva per quell’ambito. **Ripristina regole ereditate** elimina queste sostituzioni. Cambiare lingua mantiene le modifiche non salvate alle regole finché Profilo di stile resta aperto.

Le regole compaiono come riepiloghi sintetici contrassegnati **Salvata** o **Non salvata**. Scegli **Modifica** per aprire una regola; puoi modificarne solo una alla volta. **Salva** salva l’ambito selezionato. Salvare le preferenze linguistiche ricostruisce anche localmente lo *Profilo di stile* usando gli esempi attualmente inclusi e le indicazioni salvate, comprese le modifiche all’inclusione degli esempi. Le sostituzioni specifiche dell’*articolo* vengono salvate per quell’*articolo*. Il testo non salvato negli altri moduli resta tale. Puoi usare regole tipografiche esplicite senza esempi di scrittura; gli esempi servono per derivare le caratteristiche della voce.

Salva la *bozza* attuale, poi seleziona **Verifica tipografia** per controllare l’*articolo* selezionato senza una connessione a un servizio di IA. La verifica usa la *versione salvata* e la relativa lingua, indicate nella barra di stato. Per il controllo, scegli la stessa lingua in **Lingua della tipografia**. Codice, URL, identificatori tecnici e casi ambigui di virgolette restano invariati. Per applicare regole contestuali serve una **Rivedi lo stile di scrittura** completa con l’assistente. Se per una lingua non ci sono regole meccaniche applicabili, il controllo tipografico locale non la copre; prima di verificarla, aggiungi e salva regole personalizzate.

Apri **Rivedi proposta** per esaminare le correzioni e le regole che le supportano. Contrassegna come accettate le correzioni desiderate, poi scegli **Applica**. Le correzioni accettate creano una *versione salvata*; se le rifiuti tutte, l’*articolo* resta invariato. Salvare le regole o eseguire un controllo non applica le correzioni. Una revisione conserva la lingua e le definizioni delle regole usate; se cambi la lingua o le preferenze applicabili, un avviso propone di eseguire di nuovo il controllo. La tipografia non rileva i confini linguistici nei passaggi con più lingue. I casi ambigui restano invariati.
