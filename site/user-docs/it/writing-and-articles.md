---
description: "Scrivi e organizza gli articoli, scopri come si salvano le bozze e configura il supporto ortografico locale."
---

# Scrivere e organizzare gli articoli

Un *articolo* è un testo nella tua libreria Warplyn. Mentre scrivi, Warplyn salva la *bozza* per permetterti di recuperarla. Una *versione salvata* conserva nella cronologia il testo com’era al momento del salvataggio.

## Conservare indicazioni accanto a un passaggio {#editor-notes}

Le *note editoriali* conservano istruzioni legate a un passaggio per le richieste future all'Assistente. Sono utili per mantenere il punto di vista o evitare di svelare un indizio troppo presto. Restano separate dal testo dell'articolo e non compaiono nel testo copiato o esportato.

Seleziona il passaggio nell'editor. Scegli **Aggiungi nota editoriale…** nella barra di formattazione o nel menu contestuale. Scrivi l'istruzione in **Indicazioni per l’Assistente**, poi scegli **Salva nota**. Salvare una nota non avvia una richiesta e non crea una revisione dell'articolo.

::: tip Esempio da Il fiume al crepuscolo
Seleziona il paragrafo in cui Ana nota la barca: "Mantieni l'incertezza di Ana su chi possiede la barca. Conserva i suoni del fiume e non svelare l'identità del passeggero." In seguito, chiedi all'Assistente di migliorare il ritmo del passaggio.
:::

Apri **Note editoriali** dalla barra di formattazione o da un piccolo indicatore numerato accanto al testo. Passa il puntatore sull'indicatore o raggiungilo con la tastiera per evidenziare temporaneamente il passaggio. Nell'elenco, scegli l'anteprima per ritrovarlo. Usa **Modifica nota…** e poi **Salva nota** per cambiare le indicazioni. Il pulsante di rimozione elimina solo la nota.

Salva le modifiche prima di chiudere la finestra o cambiare nota. Se ci sono modifiche non salvate, annulla per continuare oppure scegli **Scarta modifiche** per abbandonarle.

Se compare **Da ricollegare**, il passaggio originale non è più identificabile. La nota rimane disponibile, ma non guida il lavoro finché non la ricolleghi. Chiudi la finestra, seleziona il nuovo passaggio e riapri la nota da **Note editoriali** e **Modifica nota…**. Scegli **Allega al testo selezionato**, poi **Salva nota**.

Le note collegate accompagnano le richieste esplicite dell'Assistente che riguardano i loro passaggi. Con una selezione vengono inviate solo le note relative ai passaggi che la intersecano. Controlla **Note che accompagnano questa richiesta** nel campo della richiesta prima dell'invio. Scrivi lì il compito immediato e conserva nella nota le indicazioni da riutilizzare.

Per le procedure riutilizzabili, vedi [Skills](skills.md); per esempi di scrittura e indicazioni generali, vedi [Profilo di stile](style-profile.md).

## Scrivere e salvare un articolo

Per iniziare, scegli **Nuovo articolo** nella libreria. Rinomina l’*articolo* dal campo del titolo. Usa la barra di formattazione per applicare titoli, elenchi, enfasi, link, citazioni e codice. Quando incolli testo formattato, Warplyn mantiene la formattazione supportata e rimuove il markup non sicuro o non supportato. L’*articolo* viene salvato come Markdown, quindi impaginazioni complesse ed elementi incorporati non vengono mantenuti.

Warplyn salva automaticamente la *bozza* attuale mentre scrivi. Un checkpoint è testo di lavoro recuperabile, non una nuova voce in Cronologia delle versioni. Se vuoi sapere se le modifiche recenti sono state salvate in un checkpoint, controlla l’indicatore di salvataggio nella barra di stato dell’articolo. Warplyn salva anche un checkpoint in sospeso quando passi da un *articolo* a un altro o apri Impostazioni.

[![Area di scrittura con «Il fiume al crepuscolo» nell’editor, la barra di formattazione, la libreria e l’indicatore di bozza salvata.](/images/writing-workspace.png)](/images/writing-workspace.png)

*Esempio di articolo salvato come bozza nell’area di scrittura.*

Scegli **Salva versione** per conservare la *bozza* attuale come punto nominato nella cronologia. Salvare una *versione salvata* non elimina quelle precedenti. Se il testo locale e la *bozza* salvata non corrispondono più, consulta [Rivedere gli articoli](reviewing-articles.md#recover-a-draft).

## Trovare e organizzare gli articoli

Usa la ricerca della libreria per trovare gli *articoli*, compresi quelli archiviati. Scegli **Articoli** per vedere i lavori appuntati e recenti oppure **Archivia** per consultare i gruppi di *articoli* archiviati. La barra di navigazione compressa offre i collegamenti rapidi **Nuovo articolo**, **Cerca articoli**, **Articoli** e **Archivia**. Dal menu libreria, appunta un *articolo* originale per mantenere un collegamento rapido nella barra. Usa **Sposta su** o **Sposta giù** per riordinare gli *articoli* appuntati. Appuntare e riordinare non modifica il contenuto degli *articoli*. Per rinominare un *articolo*, usa il relativo campo del titolo.

Scegli **Archivia articolo** per rimuovere un gruppo di *articoli* dall’elenco attivo mantenendolo in **Archivia**. Seleziona il gruppo archiviato e scegli **Rimuovi articolo dall'archivio** per ripristinarlo. Per eliminare un *articolo* serve una conferma; l’eliminazione rimuove le sue *versioni salvate* e le *bozze* recuperabili. Eliminare l’articolo originale rimuove anche le *traduzioni* collegate; eliminare una *traduzione* lascia intatto l’*articolo* di origine. Se vuoi solo metterlo da parte, archivialo.

## Usare il supporto ortografico

L’editor segnala gli errori ortografici probabili usando il supporto del dispositivo. Nell’app desktop, fai clic destro su una parola segnalata per scegliere una correzione suggerita o **Aggiungi al dizionario**. La correzione è una normale modifica, quindi può essere annullata e diventa parte della *bozza* attuale. Il controllo ortografico resta sul dispositivo e non invia il testo dell’*articolo* a un provider di IA.

In **Impostazioni** → **Ortografia** nell’app desktop, usa **Filtra lingue** per trovare una lingua, selezionala in **Prepara la scrittura offline**, quindi scegli **Scarica dizionari**. Prima di usare la lingua offline, attendi che lo stato indichi **Scaricato**. **Disponibile** significa che la lingua è supportata, ma non conferma che il dizionario abbia terminato il download. Scegli **Scarica dalla memoria** per smettere di usare il dizionario preparato durante questa sessione. Preparare i dizionari non cambia la lingua di un *articolo*. Per scaricarli serve una connessione a Internet. Su Windows, aggiungere o rimuovere parole personali modifica anche il dizionario del sistema operativo e può influire su altre app.

In **Dizionario personale**, cerca le parole salvate oppure inserisci una parola o un termine tecnico per riga in **Parole da aggiungere**, quindi scegli **Aggiungi parole**. Puoi aggiungere fino a 500 parole alla volta. Rimuovi le parole salvate se vuoi che il supporto ortografico le segnali di nuovo. L’elenco è condiviso tra *articoli* e lingue. L’app nel browser usa le impostazioni ortografiche del browser e non offre la gestione dei dizionari.

Usa **Modalità concentrazione** per nascondere entrambi i pannelli di supporto mentre scrivi. Selezionalo di nuovo per mostrarli. Usa il comando di ciascun pannello per comprimerlo o riaprirlo; trascina il divisore accanto al pannello per ridimensionarlo. In una finestra stretta, i pannelli possono aprirsi temporaneamente sopra l’editor.

Con la tastiera, usa **Tab** e **Shift + Tab** per spostarti tra libreria, intestazione dell’articolo, viste, barra di formattazione, editor, barra di stato e pannello dell’assistente editoriale. Nell’editor, nella ricerca e nel campo di composizione continuano a funzionare i normali tasti per modificare il testo. Impostazioni ha una navigazione da tastiera dedicata. Nella barra laterale desktop, usa **Up**, **Down**, **Home** o **End** per spostarti tra le sezioni, poi **Invio** o **Space** per aprirne una.

Per trasferire un *articolo* completo da o verso Warplyn, consulta [File degli articoli](article-files.md). Per le copie di sicurezza di tutta l’area di lavoro, consulta [Backup e ripristino](backups-and-recovery.md).
