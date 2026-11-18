---
description: "Scopri quali dati diagnostici e di utilizzo condivide Warplyn, quali restano privati e come disattivare la condivisione nelle impostazioni."
---

# Condividere dati diagnostici e di utilizzo

Quando attivi la condivisione, le app Windows e Linux distribuite da Warplyn inviano a PostHog Cloud, negli Stati Uniti (Virginia), eventi pseudonimizzati di affidabilità e utilizzo. La condivisione è disattivata per impostazione predefinita. Attivala per aiutarci a capire la tua esperienza e migliorare Warplyn. Puoi modificare la scelta in **Impostazioni** → **Generali** → **Privacy e diagnostica**.

Disattivando la condivisione si interrompe la raccolta futura e vengono cancellati gli eventi in coda e il ID telemetria locale. Se la riattivi in seguito, viene creato un nuovo ID. Gli eventi già inviati non possono essere richiamati.

Gli eventi in attesa restano nel profilo locale dell’app, così Warplyn può ritentare l’invio quando torna la connessione. Gli eventi più vecchi di 24 ore vengono eliminati al successivo controllo della coda da parte dell’app. Disattivando la condivisione, la coda viene rimossa.

[![Impostazioni Privacy and diagnostics con l’interruttore per la condivisione e i controlli ID telemetria; l’ID è nascosto.](/images/diagnostic-and-usage-data.png)](/images/diagnostic-and-usage-data.png)

*Impostazioni Privacy e diagnostica nell’app desktop.*

## Quali dati raccoglie Warplyn

Gli eventi riguardano:

- verifiche di connessione completate o non riuscite, senza nomi delle connessioni o dettagli sui provider
- avvii dell’app e categorie sicure di errori di avvio, del renderer o dei processi secondari
- operazioni di IA e fasi completate, non riuscite o annullate, con una categoria di errore e, se disponibile, lo stato HTTP
- revisioni esplicite delle *proposte* e checkpoint aggregati delle *bozze*
- esiti di copie di sicurezza e ripristini

Gli eventi non includono testo degli *articoli*, prompt, risposte dell’IA o chiavi API.

::: details Altri campi degli eventi
Ogni evento include una sorgente di analytics desktop, la versione dello schema, la versione dell’applicazione, la piattaforma, l’architettura, la versione del sistema operativo e una marca temporale. I campi specifici dell’evento sono limitati a categorie note, contatori non negativi o durate con limiti definiti.

Gli eventi relativi alle operazioni e alle fasi di IA possono includere un ID casuale che collega gli eventi della stessa operazione. È separato dagli ID degli *articoli* e delle richieste.

Gli eventi non includono ID o titoli di *articoli* o *versioni salvate*, valori delle variabili d’ambiente, percorsi dei file, URL, errori non elaborati, dettagli sull’uscita dei processi né i corpi di richieste o risposte.
:::

## Richiedere la cancellazione

Per richieste di accesso, correzione o altri aspetti della privacy, consulta le [richieste sui dati](data-request.md).

1. In **Impostazioni** → **Generali** → **Privacy e diagnostica**, seleziona **Copia ID**.
2. Invia l’ID via email a [kirill.taran@punk.link](mailto:kirill.taran@punk.link) e chiedi la cancellazione.
3. Disattiva **Condividi dati diagnostici e di utilizzo**.

Copia l’ID prima di disattivare la condivisione. Disattivandola, l’ID viene cancellato dal dispositivo. Il responsabile del progetto elimina il record pseudonimizzato corrispondente e conferma l’operazione via email.

## Analytics del sito web {#website-analytics}

Le pagine di destinazione e dei piani usano PostHog per misurare visite, informazioni sui referral e sulle campagne e clic sui link di download. Gli eventi di download di PostHog includono la posizione del pulsante nella pagina. Google Analytics registra anche un evento `download_clicked` quando qualcuno apre il link alla versione più recente dalla pagina di destinazione, dalla pagina dei piani o dalla guida per l’utente. Questi clic non confermano che il download o l’installazione siano stati completati.

Il tracciamento PostHog del sito non usa cookie né archiviazione del browser, non crea profili personali e non registra riproduzioni delle sessioni o attività generali dei clic. PostHog stima il numero di visitatori usando un hash generato dal server. Gli eventi del sito restano separati dai ID telemetria desktop e l’interruttore di condivisione nell’app desktop non controlla il tracciamento del sito.

Le pagine di destinazione e la guida per l’utente usano anche Google Analytics, che potrebbe usare cookie per misurare visite e fonti di traffico. Il tracciamento sia di Google Analytics sia di PostHog viene saltato se il browser invia Do Not Track o Global Privacy Control. Il comportamento senza cookie descritto sopra si applica a PostHog.
