---
description: "Salva o carica articoli completi nei formati Markdown, HTML, DOCX o RTF."
---

# File degli articoli

Usa **Salva su file** e **Carica da file** per trasferire articoli completi tra Warplyn e altri strumenti di scrittura. Questi comandi sono disponibili nell’app desktop e in quella web.

## Salvare in un file

1. Apri l’*articolo* da salvare.
2. Nell’intestazione dell’articolo, scegli **Salva su file** accanto a **Salva versione**. Puoi anche fare clic destro su un *articolo* nella Library e scegliere **Salva su file…** senza aprirlo.
3. Nella finestra di salvataggio dell’app desktop, seleziona Markdown, HTML, DOCX o RTF dall’elenco dei tipi di file, quindi scegli un nome e una posizione. Mantieni l’estensione corrispondente al formato. Nell’app web, scegli **Formato del file**, poi **Scarica** e usa i controlli di download del browser.

Il file contiene l’intera *bozza* attuale, comprese le modifiche non salvate. Selezionare del testo non limita ciò che viene salvato. Questo comando non crea una *versione salvata*. **Salva versione** resta il comando per aggiungere la *bozza* attuale alla cronologia.

::: tip Ti serve una copia portatile dell’area di lavoro?
I file degli *articoli* contengono solo i testi. Per conservare la cronologia, il lavoro dell’assistente, le *abilità* e le impostazioni, crea invece una [copia di sicurezza](backups-and-recovery.md).
:::

Quando l’app web passa il file al browser, mostra **Download dell'articolo avviato**. Controlla i download del browser per verificarne il completamento o individuare eventuali errori.

## Caricare da un file

1. Nell’intestazione dell’articolo, scegli **Carica da file** accanto a **Salva versione**, oppure fai clic destro su un *articolo* nella Library e scegli **Carica da file…**. Se la raccolta è vuota, scegli prima **Crea**.
2. Seleziona un file `.md`, `.html`, `.htm`, `.docx` o `.rtf`.
3. Per HTML, DOCX e RTF, seleziona **Rivedi l'articolo importato**, poi scegli **Importa**. Puoi annullare la revisione. I file Markdown si aprono direttamente.
4. Warplyn apre il testo importato come *articolo* separato. L’*articolo* precedente e la sua *bozza* recuperabile restano disponibili nella Library.

Un titolo di primo livello all’inizio del file diventa il nuovo titolo. In caso contrario, Warplyn usa il nome del file senza estensione. Il titolo resta nel corpo dell’*articolo*. Caricare di nuovo lo stesso file crea un altro *articolo* indipendente.

::: warning L’importazione crea un articolo separato
Caricare un file non sostituisce l’*articolo* da cui hai aperto il selettore. Controlla l’*articolo* importato, poi sposta o elimina uno dei due se necessario.
:::

Scegli un file di massimo 10 MiB. Markdown e HTML devono usare la codifica UTF-8. DOCX e RTF funzionano anche senza Microsoft Office installato.

Warplyn mantiene paragrafi, titoli, elenchi annidati modificabili e numerazione, grassetto, corsivo, barrato, link sicuri, citazioni, codice e testo Unicode, se supportati dal formato di origine. L’impaginazione, i caratteri, le immagini, gli oggetti incorporati e le funzioni complesse specifiche del formato potrebbero essere omessi o semplificati. Il testo delle tabelle diventa normale contenuto dell’*articolo*. Controlla l’anteprima di importazione prima di continuare. Anche le estensioni Markdown non supportate potrebbero perdere la formattazione nell’editor.

Puoi annullare il selettore di file senza importare nulla. Se non è possibile salvare la *bozza* attuale per recuperarla, risolvi l’errore di salvataggio e riprova a caricare il file.

## Salvare una versione in un file

1. Apri **Versioni**.
2. Apri la *versione salvata* da esportare.
3. Scegli **Salva su file** accanto ai relativi dettagli.

Il file contiene l’intero *articolo* di quella *versione salvata*, indipendentemente dalla *bozza* attuale. L’esportazione non ripristina la *versione salvata* e non modifica la cronologia. Il nome file suggerito include il numero della *versione salvata*.

Anche l’esportazione dei file è limitata a 10 MiB. Se il salvataggio desktop non riesce, scegli una posizione in cui puoi scrivere e riprova. Se la sostituzione non riesce, il file di destinazione esistente resta intatto.

I file esportati contengono il testo dell’*articolo*, non l’intera cronologia, le conversazioni o le impostazioni. Per proteggere tutta l’area di lavoro, consulta [Backup e ripristino](backups-and-recovery.md).
