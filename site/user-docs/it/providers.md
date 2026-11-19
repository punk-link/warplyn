---
description: "Collega un provider di IA a Warplyn, salva la chiave API, scegli i modelli e scopri i controlli di connessione e le funzionalità supportate."
---

# Provider e modelli di IA

Warplyn invia le richieste di IA al provider configurato in **Impostazioni** → **Assistente IA**. Ti servono un account e una chiave API di quel provider. Il provider potrebbe addebitare costi per l’uso delle API.

## Aggiungere una connessione

Nell’app desktop, apri **Impostazioni** → **Assistente IA**. In **Come vuoi fornire la chiave?**, scegli **Aggiungi una chiave API** oppure **Variabile d'ambiente**.

- **Aggiungi una chiave API:** scegli un provider, assegna un nome alla connessione e inserisci la chiave. Warplyn la salva in Windows Credential Manager o Linux Secret Service. La chiave non viene mostrata di nuovo e non è salvata nel database o nelle copie di sicurezza di Warplyn.
- **Variabile d'ambiente:** scegli un provider, assegna un nome alla connessione e inserisci il nome della variabile che contiene la chiave. Warplyn salva il nome, non il valore. Il servizio applicativo deve avviarsi con quella variabile impostata.

::: tip Credenziali
Le chiavi API gestite richiedono l’app desktop e un servizio credenziali del sistema operativo disponibile. Su Linux, Secret Service deve essere sbloccato. L’app nel browser supporta connessioni tramite variabili d’ambiente, ma non può gestire le credenziali del sistema operativo. Il programma di installazione non crea né importa un file `.env`.
:::

Se inserisci direttamente la chiave API, Warplyn la verifica presso il provider. Se indichi una variabile d’ambiente, al momento di aggiungere la connessione Warplyn salva solo le impostazioni. Warplyn contatta di nuovo il provider quando aggiorni l’elenco dei modelli o invii una richiesta di IA. Questi controlli non includono contenuti dell’*articolo*.

Le connessioni sono elencate in **Impostazioni** → **Assistente IA**. Il badge **Attiva** indica che Warplyn può usare la connessione per le nuove richieste. Usa **Attiva** o **Disattiva** per cambiare lo stato della connessione. Scegli **Rinomina** per cambiare il nome visualizzato localmente oppure **Rimuovi** e conferma per rimuovere la connessione da Warplyn. Rimuovere una connessione tramite variabile d’ambiente non elimina la variabile né la relativa chiave.

::: tip Se l’aggiornamento dei modelli non riesce
Controlla che la connessione sia **Attiva**, che la chiave salvata sia valida o che la variabile d’ambiente sia disponibile per il servizio applicativo, e che l’account del provider possa accedere alla sua API.
:::

## Scegliere provider e modelli

Warplyn supporta OpenAI, OpenCode Zen, Anthropic, Google Gemini API, xAI Grok e DeepSeek. Il catalogo di OpenCode Zen offre anche modelli di altri fornitori.

In **Impostazioni** → **Assistente IA**, seleziona **Aggiorna modelli**, quindi scegli un **Modello predefinito**. Per usare un modello diverso per una *abilità* specifica, selezionalo in **Modelli per attività specifiche**. Un’attività impostata su **Usa modello predefinito** usa il modello predefinito.

Aggiorna l’elenco dei modelli dopo aver modificato le connessioni o quando vuoi consultare il catalogo attuale di un provider. Usa **Cerca modelli**, **Filtra modelli per fornitore** e **Preferiti** per restringere l’elenco. La scelta del modello si applica alle richieste successive. Usa **Livello di ragionamento**, quando compare per un modello OpenAI selezionato: impostazioni più alte possono richiedere più tempo. L’opzione facoltativa **Modello dell'app** nelle impostazioni di IA è separata dal modello predefinito e gestisce attività ausiliarie di Warplyn, come riepiloghi e titoli.

::: tip Disponibilità dei modelli
Le operazioni editoriali disponibili variano in base al modello. Alcuni modelli non supportano la verifica dei fatti con fonti, l’output strutturato o i controlli di ragionamento. Consulta il catalogo di OpenCode Zen per vedere quali modelli sono disponibili e quali funzioni supportano.
:::

[![Impostazioni dell’assistente di IA con connessioni ai provider configurate, opzioni per impostare la chiave e controlli dei modelli.](/images/ai-providers-and-models.png)](/images/ai-providers-and-models.png)

*Impostazioni dell’assistente di IA con connessioni ai provider e controlli dei modelli.*

### Modello dell’app

Il **Modello dell'app** riassume le *proposte*, suggerisce titoli e riconosce cosa chiedi all’assistente. Se non lo imposti, Warplyn usa il **Modello predefinito**.

Scegli un modello testuale efficiente e meno costoso. **GPT-6 Luna** è una delle opzioni OpenAI per queste attività mirate ([dettagli del modello](https://developers.openai.com/api/docs/models/gpt-6-luna)). Con un altro provider, scegli un modello equivalente. Se i risultati non sono abbastanza buoni, prova un modello più potente.
