---
description: "Crea e gestisci abilità riutilizzabili per le tue attività di scrittura e consulta le versioni salvate."
---

# Creare e gestire abilità

Le *abilità* sono pacchetti locali di istruzioni Markdown. Aiutano l’assistente a scegliere e coordinare le funzionalità editoriali. Non aggiungono autorizzazioni né modificano un *articolo*.

## Creare e gestire le tue abilità

Chiedi all’assistente, in linguaggio semplice, di creare un’*abilità* riutilizzabile. Spiega l’attività ricorrente e le regole o i riferimenti necessari. Se un dettaglio mancante potrebbe cambiare l’*abilità*, l’assistente ti farà una breve domanda invece di fare supposizioni.

::: tip Esempio
Per revisionare un testo di narrativa con lo stile di una scena quieta sul fiume, chiedi: «Crea un’*abilità* chiamata “Revisione di narrativa sobria”. Rendi più essenziali le frasi di Ana preservando la sua voce, l’ambientazione sul fiume e gli eventi della scena. Non aggiungere dettagli; segnala invece i passaggi poco chiari». L’assistente potrà riutilizzare queste istruzioni ogni volta che chiedi una revisione di questo tipo.
:::

[![Assistente editoriale di Warplyn con una richiesta di creazione di un’abilità per la revisione di narrativa e Creatore di abilità selezionato.](/images/skill-creator-example.png)](/images/skill-creator-example.png)

*Esempio di richiesta di creazione di un’abilità nel campo di composizione. Collega un provider prima di inviarla.*

Dopo la creazione, l’*abilità* è subito disponibile per le nuove richieste all’assistente. La richiesta di creazione non invia al modello il testo dell’*articolo* e non modifica l’*articolo*, la *bozza*, la *proposta* o una *versione salvata*.

Ogni *abilità* creata ha una cronologia locale e immutabile delle proprie versioni. È separata dalla cronologia delle versioni dell’*articolo*. Puoi anche modificare direttamente il pacchetto Markdown locale. Warplyn aggiorna il catalogo per la richiesta successiva. Rimuovendo il file `SKILL.md`, l’*abilità* scompare dall’elenco delle abilità disponibili.

Chiedi all’assistente di modificare o eliminare un’*abilità* indicandone il nome. Prima di intervenire, legge il pacchetto corrente e controlla che il file non sia stato modificato nel frattempo. Una modifica conserva l’ID dell’*abilità* e aggiunge una nuova versione. L’eliminazione rimuove l’*abilità* dalle nuove richieste, ma ne conserva la cronologia.

Per ripristinare istruzioni precedenti, chiedi all’assistente le versioni di quell’*abilità* e indica quale ripristinare. Il ripristino crea una nuova versione attiva e ne aggiunge un’altra alla cronologia. Puoi ripristinare in questo modo anche un’*abilità* eliminata. Ripristinare un checkpoint di una chat con l’assistente non ripristina né modifica alcuna *abilità*: il ripristino di un’*abilità* è una richiesta separata.
