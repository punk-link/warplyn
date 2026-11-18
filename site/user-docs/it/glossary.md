---
description: "Scopri cosa significano Articoli, Bozze, Versioni salvate, Proposte, Rilievi e Abilità in Warplyn, con le definizioni usate nell’area di scrittura."
---

# Glossario di Warplyn

Questi termini descrivono concetti visibili agli autori e il linguaggio di dominio usato in Warplyn.

## Articoli e versioni salvate

- **Articolo (Article)**: contenuto editoriale recuperabile in modo indipendente. Warplyn usa “Article” anziché “document”.
- **Raccolta di articoli (Biblioteca articoli)**: raccolta locale degli *articoli* dell’autore. L’**articolo attuale (current Article)** è aperto nell’area di lavoro; un **elenco di articoli (Article list)** mostra la raccolta.
- **Bozza (Draft)**: testo dell’*articolo* in fase di modifica ma non ancora salvato come *versione salvata*.
- **Checkpoint della bozza (Draft checkpoint)**: stato recuperabile e modificabile della *bozza*, salvato localmente e associato a una *versione salvata* di base. Non è una *versione salvata*. Una **bozza attuale (Current Draft)** si basa sulla *versione salvata* attuale dell’*articolo*; una **bozza non aggiornata (stale Draft)** si basa su una *versione salvata* precedente.
- **Versione salvata (Revision)**: snapshot immutabile e salvato di un *articolo*.
- **Salvataggio della bozza come nuova versione (Revision promotion)**: salvataggio esplicito da parte dell’autore di una *bozza attuale* come nuova *versione salvata*. Cancella solo il checkpoint della *bozza* corrispondente.
- **Proposta (Proposal)**: contenuto o modifica generati dall’IA che richiedono l’approvazione esplicita dell’autore.
- **Versione salvata di base della proposta (Proposal base Revision)**: *versione salvata* esaminata per produrre una *proposta*. La *proposta* diventa obsoleta quando non corrisponde più alla *versione salvata* attuale.
- **Selezione delle modifiche (Change selection)**: sottoinsieme della *proposta* che l’autore sceglie di accettare. L’accettazione crea una nuova *versione salvata*.
- **Rilievo (Finding)**: risultato consultivo, come una verifica dei fatti o dello stile, che non modifica un *articolo*.
- **Articolo di origine (Source Article)** e **articolo tradotto (translation Article)**: *articoli* collegati e recuperabili in modo indipendente. Una traduzione non è mai una *versione salvata* dell’articolo di origine.

## Attività editoriali

- **Funzionalità editoriale (Editorial capability)**: operazione di Warplyn convalidata che dichiara il contesto dell’*articolo* utilizzabile, i prerequisiti e il risultato. Le viste dell’area di lavoro e le abilità dell’assistente possono richiamare la stessa funzionalità.
- **Abilità (Skill)**: pacchetto riutilizzabile di istruzioni che aiuta l’assistente a scegliere e coordinare le funzionalità editoriali per una richiesta dell’autore. Un’*abilità* non concede funzionalità né autorizzazioni. Un’**abilità integrata (built-in Skill)** è inclusa in Warplyn. Un’**abilità creata dall’autore (Author-created Skill)** è un pacchetto Markdown locale creato in una chat con l’assistente e ha una cronologia separata delle *versioni dell’abilità*.
- **Operazione editoriale (Editorial operation)**: attività richiesta dall’autore all’assistente, come scrivere, rendere un testo più scorrevole, verificare i fatti, rivedere lo stile o tradurre.
- **Richiesta editoriale (Editorial request)**: singola esecuzione di un’operazione editoriale.
- **Sessione editoriale (Editorial session)**: sequenza di interazioni e cronologia delle attività per le richieste editoriali.
- **Indicazioni editoriali (Indicazioni editoriali)**: istruzioni o contesto inseriti dall’autore insieme a una richiesta editoriale.
- **Raccolta di testi per lo stile (Style corpus)**: esempi di scrittura locali forniti dall’autore. Il **profilo di stile (style profile)** è la loro rappresentazione sintetica derivata.
- **Fase del flusso di lavoro (Workflow stage)**: indicazione facoltativa sullo stato di avanzamento, scelta dall’autore. Non avvia processi di IA né modifica il contenuto di un *articolo*.

## Pubblicazione e impostazioni

- **Profilo di pubblicazione (Publishing profile)**: indicazioni configurabili per una piattaforma, incluso un limite di caratteri. Il profilo predefinito si applica solo ai nuovi *articoli*.
- **Testo per la pubblicazione (Publishing copy)**: testo Markdown o semplice copiato esplicitamente dall’*articolo* attuale tramite la barra di stato dell’articolo. Warplyn non offre una vista dell’area di lavoro per l’anteprima della pubblicazione.
- **Impostazioni dell’applicazione (Application Settings)**: preferenze dell’area di lavoro, configurazione dell’IA, profili di pubblicazione e gestione dei dati locali. Le impostazioni non fanno mai parte della cronologia delle *versioni salvate* di un *articolo*.
- **Connessione IA (AI connection)**: configurazione nominata di un provider lato server con una fonte delle credenziali. La **connessione IA attiva (active AI connection)** viene usata per le nuove richieste editoriali.
- **Fonte delle credenziali (Credential source)**: fonte privata usata da una connessione IA. Può essere un riferimento a una variabile d’ambiente o una credenziale gestita.
- **Credenziale gestita (Credenziale gestita)**: chiave API custodita dal gestore delle credenziali del sistema operativo. Warplyn salva i metadati della connessione, ma non scrive mai la chiave in SQLite o in uno snapshot di backup.
- **Preferenza del modello (Model preference)**: identificatore del modello predefinito o sostituzione specifica per un’operazione editoriale.
- **Lingua dell’interfaccia (Interface locale)**: lingua dell’interfaccia di Warplyn, distinta dalle lingue degli *articoli* e delle traduzioni.
- **Lingua predefinita degli articoli (Lingua predefinita degli articoli)**: lingua assegnata a un nuovo *articolo* quando non ne viene indicata una.
- **Lingue predefinite per le traduzioni (Lingue di traduzione predefinite)**: lingue, in ordine, proposte per prime nelle richieste di traduzione. Non avviano mai automaticamente le traduzioni.
- **Destinazione dei backup (Backup destination)**: directory locale in cui Warplyn salva gli snapshot di backup.
- **Snapshot di backup (Backup snapshot)**: copia coerente dei dati locali in un momento preciso, separata dal database attivo e priva di credenziali.
- **Posizione dei dati (Data location)**: directory locale attiva che contiene i dati SQLite di Warplyn.
- **Trasferimento dei dati (Data relocation)**: copia e riavvio confermati dall’autore che spostano Warplyn in una nuova posizione dei dati, conservando la copia precedente per il ripristino.
- **Snapshot di recupero (Recovery snapshot)**: snapshot di backup conservato prima che Warplyn sostituisca i dati attivi durante un ripristino.
- **Aggiornamento dell’applicazione (Application update)**: versione pacchettizzata di Warplyn più recente, che il client desktop può cercare, scaricare e applicare solo tramite passaggi controllati dall’autore. Un aggiornamento non modifica autonomamente il contenuto degli *articoli*.
- **Aggiornamento di sicurezza (Aggiornamento di sicurezza)**: aggiornamento dell’applicazione il cui tag di release termina con il suffisso `.security`. Warplyn mostra un avviso, ma non impone mai un controllo, un download o un riavvio.
- **Aggiornamento in attesa (Staged update)**: aggiornamento dell’applicazione scaricato, in attesa che l’autore scelga Riavvia e aggiorna. La normale chiusura non lo applica.
- **Snapshot precedente all’aggiornamento (Pre-update snapshot)**: snapshot di backup dei dati locali creato prima che Warplyn applichi un aggiornamento in attesa. Per ripristinarlo serve la versione precedente corrispondente dell’applicazione.
- **Evento diagnostico (Diagnostics event)**: record locale oscurato, scritto nei log del processo host per supportare l’avvio o la risoluzione di errori recuperabili. Non include contenuti privati degli *articoli*, corpi dei modelli o valori delle variabili d’ambiente.

## Interfaccia

### Mappa dell’area di lavoro

Layout desktop con entrambi i pannelli laterali espansi e l’Article Editor selezionato. I riquadri mostrano posizione e contenimento, non le dimensioni esatte.

```text
Editorial Workspace
┌──────────────────────────┬──────────────────────────────┬──────────────────────────┐
│ Article Library Panel    │ Article Workspace            │ Editorial Assistant Panel│
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Warplyn · New Article    │ Article Header               │ Assistant header         │
│ Collapse control         │ Title and Article metadata   │ Collapse control         │
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Article search           │ Workspace Tab Bar            │ Conversation             │
├──────────────────────────┼──────────────────────────────┤ Request status           │
│ Article list             │ Workspace View               │ and activity             │
│                          │                              │                          │
│                          │ Article Editor               │                          │
│                          │ ┌──────────────────────────┐ │                          │
│                          │ │ Writing surface          │ │                          │
│                          │ │                          │ │                          │
│                          │ └──────────────────────────┘ │                          │
├──────────────────────────┤                              ├──────────────────────────┤
│ Article Library          │                              │ Quick actions            │
│ utility area             │                              │ Composer                 │
│ Style Profile · Settings ├──────────────────────────────┤ Editorial guidance       │
│ Update, when relevant    │ Article Status Bar           │ and Send                 │
│ Language · Local         │ Save status · Metadata · Copy │                          │
└──────────────────────────┴──────────────────────────────┴──────────────────────────┘
```

Nel layout espanso, il piè di pagina del pannello Library è l’**area degli strumenti del pannello della biblioteca articoli**. La riga inferiore mostra il codice della lingua dell’*articolo* attuale e l’etichetta **Locale**. L’**Article Status Bar**, sotto la vista centrale dell’articolo, mostra lo stato del salvataggio.

### Termini dell’interfaccia

- **Editorial Workspace**: schermata principale di scrittura che contiene Pannello della biblioteca articoli, Article Workspace ed Pannello dell'assistente editoriale.
- **Pannello della biblioteca articoli**: ricerca degli articoli, elenco degli articoli e punti di accesso a livello di area di lavoro. Quando è compresso diventa la **Navigation Rail**; sugli schermi piccoli appare temporaneamente come **Navigation Drawer**.
- **area degli strumenti del pannello della biblioteca articoli**: piè di pagina espanso dell’Pannello della biblioteca articoli, che contiene Profilo di stile, Settings, un controllo degli aggiornamenti quando pertinente e il codice della lingua dell’articolo attuale con l’etichetta **Locale**.
- **Save-state indicator**: stato nell’Article Status Bar che indica se la *bozza* attuale è salvata, in fase di salvataggio o richiede attenzione.
- **Article Workspace**: Article Header, Workspace Tab Bar, Workspace View selezionata e Article Status Bar.
- **Article Header**: controlli del titolo e dei metadati sopra la Workspace Tab Bar.
- **Workspace Tab Bar**: schede usate per selezionare una Workspace View.
- **Workspace View**: Article Editor selezionato o vista di supporto: Revisione della proposta, Cronologia delle versioni, Verifica dei fatti o Translations.
- **Profilo di stile**: schermata separata per caratteristiche rilevate, *rilievi* della revisione di stile, regole tipografiche, indicazioni manuali ed esempi di scrittura.
- **Article Editor**: vista di scrittura. L’area principale di modifica è la **writing surface**.
- **Article Status Bar**: barra sotto la Workspace View selezionata, con lo stato e i metadati dell’articolo, la selezione della lingua, le indicazioni del profilo di pubblicazione e i controlli di copia.
- **Pannello dell'assistente editoriale**: indicazioni editoriali, azioni, stato delle richieste e attività. Sugli schermi piccoli appare temporaneamente come **Assistant Drawer**.
- **Azioni rapide**: menu a discesa sopra il Composer dell’assistente, per inserire un’abilità integrata in una richiesta.
- **Composer**: campo del messaggio in fondo all’Pannello dell'assistente editoriale, in cui l’autore inserisce indicazioni editoriali e invia una richiesta.
- **Application Navigazione delle impostazioni**: navigazione tra **Generali**, **Scorciatoie da tastiera**, **Provider**, **Assistente IA**, **Pubblicazione**, **Lingue predefinite**, **Ortografia**, **Dati e backup** e **Informazioni**.
