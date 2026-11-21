---
description: "Scopri cosa significano Articoli, Bozze, Versioni salvate, Proposte, Rilievi e Abilità in Warplyn, con le definizioni usate nell’area di scrittura."
---

# Glossario di Warplyn

Qui trovi i termini che compaiono in Warplyn e in questa guida.

## Articoli e versioni salvate

- **Articolo**: testo della raccolta che puoi recuperare separatamente dagli altri. Warplyn usa “articolo” anziché “documento”.
- **Raccolta di articoli**: raccolta locale degli *articoli* dell’autore. L’**articolo attuale** è aperto nell’area di lavoro; un **elenco di articoli** mostra la raccolta.
- **Bozza**: testo dell’*articolo* in fase di modifica ma non ancora salvato come *versione salvata*.
- **Checkpoint della bozza**: stato recuperabile e modificabile della *bozza*, salvato localmente e associato a una *versione salvata* di base. Non è una *versione salvata*. Una **bozza attuale** si basa sulla *versione salvata* attuale dell’*articolo*; una **bozza non aggiornata** si basa su una *versione salvata* precedente.
- **Versione salvata**: testo dell’*articolo* al momento del salvataggio. Una volta salvata, la versione resta invariata.
- **Salvataggio della bozza come nuova versione**: salvataggio esplicito da parte dell’autore di una *bozza attuale* come nuova *versione salvata*. Cancella solo il checkpoint della *bozza* corrispondente.
- **Proposta**: contenuto o modifica generati dall’IA che richiedono l’approvazione esplicita dell’autore.
- **Versione salvata di base della proposta**: *versione salvata* esaminata per produrre una *proposta*. La *proposta* diventa obsoleta quando non corrisponde più alla *versione salvata* attuale.
- **Selezione delle modifiche**: sottoinsieme della *proposta* che l’autore sceglie di accettare. L’accettazione crea una nuova *versione salvata*.
- **Rilievo**: risultato consultivo, come una verifica dei fatti o dello stile, che non modifica un *articolo*.
- **Articolo di origine** e **articolo tradotto**: *articoli* collegati e recuperabili in modo indipendente. Una traduzione non è mai una *versione salvata* dell’articolo di origine.

## Attività editoriali

- **Funzionalità editoriale**: operazione di Warplyn convalidata che dichiara il contesto dell’*articolo* utilizzabile, i prerequisiti e il risultato. Le viste dell’area di lavoro e le abilità dell’assistente possono richiamare la stessa funzionalità.
- **Abilità**: pacchetto riutilizzabile di istruzioni che aiuta l’assistente a scegliere e coordinare le funzionalità editoriali per una richiesta dell’autore. Un’*abilità* non concede funzionalità né autorizzazioni. Un’**abilità integrata** è inclusa in Warplyn. Un’**abilità creata dall’autore** è un pacchetto Markdown locale creato in una chat con l’assistente e ha una cronologia separata delle *versioni dell’abilità*.
- **Operazione editoriale**: attività richiesta dall’autore all’assistente, come scrivere, rendere un testo più scorrevole, verificare i fatti, rivedere lo stile o tradurre.
- **Richiesta editoriale**: singola esecuzione di un’operazione editoriale.
- **Sessione editoriale**: sequenza di interazioni e cronologia delle attività per le richieste editoriali.
- **Indicazioni editoriali**: istruzioni o contesto inseriti dall’autore insieme a una richiesta editoriale.
- **Raccolta di testi per lo stile**: esempi di scrittura locali forniti dall’autore. Il **profilo di stile** riassume le caratteristiche che Warplyn individua in quei testi.
- **Fase del flusso di lavoro**: indicazione facoltativa sullo stato di avanzamento, scelta dall’autore. Non avvia processi di IA né modifica il contenuto di un *articolo*.

## Pubblicazione e impostazioni

- **Profilo di pubblicazione**: indicazioni configurabili per una piattaforma, incluso un limite di caratteri. Il profilo predefinito si applica solo ai nuovi *articoli*.
- **Testo per la pubblicazione**: testo Markdown o semplice copiato esplicitamente dall’*articolo* attuale tramite la barra di stato dell’articolo. Warplyn non offre una vista dell’area di lavoro per l’anteprima della pubblicazione.
- **Impostazioni dell’applicazione**: preferenze dell’area di lavoro, configurazione dell’IA, profili di pubblicazione e gestione dei dati locali. Le impostazioni non fanno mai parte della cronologia delle *versioni salvate* di un *articolo*.
- **Connessione IA**: configurazione nominata di un provider lato server con una fonte delle credenziali. La **connessione IA attiva** viene usata per le nuove richieste editoriali.
- **Fonte delle credenziali**: fonte privata usata da una connessione IA. Può essere un riferimento a una variabile d’ambiente o una credenziale gestita.
- **Credenziale gestita**: chiave API custodita dal gestore delle credenziali del sistema operativo. Warplyn salva i metadati della connessione, ma non scrive mai la chiave in SQLite o in una copia di sicurezza.
- **Preferenza del modello**: identificatore del modello predefinito o sostituzione specifica per un’operazione editoriale.
- **Lingua dell’interfaccia**: lingua dell’interfaccia di Warplyn, distinta dalle lingue degli *articoli* e delle traduzioni.
- **Lingua predefinita degli articoli**: lingua assegnata a un nuovo *articolo* quando non ne viene indicata una.
- **Lingue predefinite per le traduzioni (Lingue di traduzione predefinite)**: lingue, in ordine, proposte per prime nelle richieste di traduzione. Non avviano mai automaticamente le traduzioni.
- **Destinazione delle copie di sicurezza**: directory locale in cui Warplyn salva le copie di sicurezza.
- **Copia di sicurezza**: copia coerente dei dati locali in un momento preciso, separata dal database attivo e priva di credenziali.
- **Posizione dei dati**: directory locale attiva che contiene i dati SQLite di Warplyn.
- **Trasferimento dei dati**: copia e riavvio confermati dall’autore che spostano Warplyn in una nuova posizione dei dati, conservando la copia precedente per il ripristino.
- **Copia di sicurezza di ripristino**: copia di sicurezza conservata prima che Warplyn sostituisca i dati attivi durante un ripristino.
- **Aggiornamento dell’applicazione**: versione pacchettizzata di Warplyn più recente, che il client desktop può cercare, scaricare e applicare solo tramite passaggi controllati dall’autore. Un aggiornamento non modifica autonomamente il contenuto degli *articoli*.
- **Aggiornamento di sicurezza**: aggiornamento dell’applicazione il cui tag di release termina con il suffisso `.security`. Warplyn mostra un avviso, ma non impone mai un controllo, un download o un riavvio.
- **Aggiornamento in attesa**: aggiornamento dell’applicazione scaricato, in attesa che l’autore scelga Riavvia e aggiorna. La normale chiusura non lo applica.
- **Copia di sicurezza precedente all’aggiornamento**: copia dei dati locali creata prima che Warplyn applichi un aggiornamento in attesa. Per ripristinarla serve la versione precedente corrispondente dell’applicazione.
- **Evento diagnostico**: registrazione locale oscurata, scritta nei log del processo host per supportare l’avvio o la risoluzione di errori recuperabili. Non include contenuti privati degli *articoli*, corpi dei modelli o valori delle variabili d’ambiente.

## Interfaccia

### Mappa dell’area di lavoro

Layout desktop con entrambi i pannelli laterali espansi e l’editor dell’articolo selezionato. I riquadri mostrano posizione e contenimento, non le dimensioni esatte.

```text
Area di lavoro editoriale
┌──────────────────────────┬──────────────────────────────┬──────────────────────────┐
│ Pannello raccolta articoli│ Area di lavoro articolo    │ Pannello assistente      │
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Warplyn · Nuovo articolo │ Intestazione articolo        │ Intestazione assistente  │
│ Controllo di chiusura    │ Titolo e metadati articolo   │ Controllo di chiusura    │
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Ricerca articoli         │ Schede dell’area di lavoro  │ Conversazione            │
├──────────────────────────┼──────────────────────────────┤ Stato della richiesta    │
│ Elenco articoli          │ Vista dell’area di lavoro  │ e attività               │
│                          │                              │                          │
│                          │ Editor dell’articolo         │                          │
│                          │ ┌──────────────────────────┐ │                          │
│                          │ │ Area di scrittura         │ │                          │
│                          │ │                          │ │                          │
│                          │ └──────────────────────────┘ │                          │
├──────────────────────────┤                              ├──────────────────────────┤
│ Raccolta articoli        │                              │ Azioni rapide            │
│ area utilità             │                              │ campo messaggio          │
│ Profilo di stile ·       ├──────────────────────────────┤ Indicazioni editoriali   │
│ Impostazioni             │ Barra di stato articolo      │ e Invio                  │
│ Lingua · Locale          │ Salvataggio · Metadati · Copia│                          │
└──────────────────────────┴──────────────────────────────┴──────────────────────────┘
```

Nel layout espanso, il piè di pagina del pannello della biblioteca è l’**area degli strumenti del pannello della biblioteca di articoli**. La riga inferiore mostra il codice della lingua dell’*articolo* attuale e l’etichetta **Locale**. La **barra di stato dell’articolo**, sotto la vista centrale, mostra lo stato del salvataggio.

### Termini dell’interfaccia

- **Nota editoriale**: indicazioni dell’autore allegate a un passaggio dell’*articolo* e salvate separatamente dal testo. Le note allegate pertinenti guidano l’assistente quando l’autore gli chiede di lavorare su quel passaggio. Non vengono incluse nel testo dell’articolo copiato o esportato. Se il passaggio non può più essere identificato, la nota deve essere ricollegata.
- **Area di lavoro editoriale**: schermata principale di scrittura che contiene il pannello della biblioteca di articoli, l’area di lavoro dell’articolo e il pannello dell’assistente editoriale.
- **Pannello della biblioteca articoli**: ricerca degli articoli, elenco degli articoli e punti di accesso a livello di area di lavoro. Quando è compresso diventa la **barra di navigazione**; sugli schermi piccoli appare temporaneamente come **cassetto di navigazione**.
- **Area strumenti della biblioteca di articoli**: piè di pagina del pannello espanso, che contiene Profilo di stile, Impostazioni, un controllo degli aggiornamenti quando pertinente e il codice della lingua dell’articolo attuale con l’etichetta **Locale**.
- **Indicatore di salvataggio**: stato nella barra di stato dell’articolo che indica se la *bozza* attuale è salvata, in fase di salvataggio o richiede attenzione.
- **Area di lavoro dell’articolo**: intestazione dell’articolo, schede dell’area di lavoro, vista selezionata e barra di stato dell’articolo.
- **Intestazione dell’articolo**: controlli del titolo e dei metadati sopra le schede dell’area di lavoro.
- **Schede dell’area di lavoro**: schede usate per selezionare una vista dell’area di lavoro.
- **Vista dell’area di lavoro**: editor dell’articolo selezionato o vista di supporto: Revisione della proposta, Cronologia delle versioni, Verifica dei fatti o Traduzioni.
- **Profilo di stile**: schermata separata per caratteristiche rilevate, *rilievi* della revisione di stile, regole tipografiche, indicazioni manuali ed esempi di scrittura.
- **Editor dell’articolo**: vista di scrittura. L’area principale di modifica è l’**area di scrittura**.
- **Barra di stato dell’articolo**: barra sotto la vista selezionata, con lo stato e i metadati dell’articolo, la selezione della lingua, le indicazioni del profilo di pubblicazione e i controlli di copia.
- **Pannello dell’assistente editoriale**: indicazioni editoriali, azioni, stato delle richieste e attività. Sugli schermi piccoli appare temporaneamente come **cassetto dell’assistente**.
- **Azioni rapide**: menu a discesa sopra il campo messaggio dell’assistente, per inserire un’abilità integrata in una richiesta.
- **Campo messaggio dell’assistente**: campo in fondo al pannello dell’assistente editoriale, in cui l’autore inserisce indicazioni editoriali e invia una richiesta.
- **Navigazione delle impostazioni dell’applicazione**: navigazione tra **Generali**, **Scorciatoie da tastiera**, **Provider**, **Assistente IA**, **Pubblicazione**, **Lingue predefinite**, **Ortografia**, **Dati e copie di sicurezza** e **Informazioni**.
