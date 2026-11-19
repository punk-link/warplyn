---
description: "Scopri quali fattori incidono sui costi delle richieste di IA in Warplyn, come funziona la fatturazione API e come controllare gli addebiti del provider."
---

# Costi dei provider di IA

L’assistenza tramite IA è facoltativa. Warplyn non ti addebita le richieste. Quando Warplyn invia una richiesta, il provider di IA può addebitarti il costo dell’elaborazione.

## Cosa incide sul costo

Il provider stabilisce le proprie tariffe. Il costo di una richiesta può dipendere da:

- il provider e il modello scelti
- la quantità di testo dell’*articolo* e di contesto delle istruzioni inclusa nella richiesta
- la quantità di testo restituita dal modello

Il testo circostante può aiutare a interpretare una selezione breve, ma comporta l’invio anche di parte del testo non selezionato. Se selezioni un passaggio e la richiesta richiede il testo dell’*articolo*, Warplyn invia quel passaggio e fino a 500 caratteri per lato. I caratteri aggiuntivi, al massimo 1.000, servono solo come contesto. Le modifiche riguardano soltanto il passaggio selezionato. Senza una selezione, la richiesta può includere l’intero *articolo* e il contesto pertinente. Una richiesta più circoscritta può costare meno, a seconda delle tariffe del provider.

::: tip Fatturazione API
Un abbonamento al servizio di chat di un provider potrebbe non includere l’uso delle API. Prima di collegare una chiave, controlla i prezzi e le condizioni di fatturazione API aggiornati del provider.
:::

Per le attività di routine, come rendere più fluido un passaggio o apportare una revisione mirata, prova prima un modello meno costoso. Usa un modello più costoso se i risultati indicano che l’attività ne richiede uno.

## Controllare l’utilizzo

Controlla utilizzo, addebiti, avvisi e limiti di spesa nell’account del provider. Warplyn non mostra la fattura del provider né applica limiti di spesa. Per informazioni su fatturazione, rimborsi o addebiti all’account, contatta il provider.

Il modello usato per una richiesta incide sul costo. In **Impostazioni** → **Assistente IA**, scegli un **Modello predefinito**, un **Modello dell'app** e i modelli per attività specifiche. Consulta [Provider e modelli di IA](providers.md) per configurarli.

::: tip Puoi lavorare senza IA
Puoi scrivere e gestire *articoli* senza una connessione a un servizio di IA. Puoi modificare i testi, salvare nuove *versioni* e usare le copie di sicurezza locali senza inviare richieste all’IA.
:::
