---
description: "Come ripristinare Warplyn dopo un aggiornamento non riuscito, usando la versione precedente e il relativo snapshot."
---

# Ripristino degli aggiornamenti desktop

Gli aggiornamenti delle versioni di anteprima sono facoltativi. Se Warplyn non si avvia dopo un aggiornamento, reinstalla la versione di anteprima precedente e ripristina lo snapshot corrispondente, creato prima dell’aggiornamento.

::: warning Evita di aprire il database più recente
Non aprire con una versione precedente un database creato da una versione di anteprima più recente. Prima ripristina lo snapshot registrato prima dell’aggiornamento.
:::

1. Scarica e reinstalla la versione di anteprima precedente dalla relativa [release GitHub](https://github.com/punk-link/warplyn/releases).
2. Ripristina lo snapshot SQLite corrispondente, registrato da Warplyn prima dell’aggiornamento.
3. Avvia la versione di anteprima precedente e controlla i tuoi *articoli*, le *bozze*, le *versioni salvate* e le impostazioni.

## Linux AppImage

Conserva l’AppImage in una cartella in cui puoi scrivere. Consulta [Installare Warplyn](installation.md#linux-appimage) per i requisiti di runtime, l’avvio e l’integrazione desktop facoltativa. Le verifiche di AppImage come applicazione desktop installata non sono ancora concluse.

Dopo aver consentito l’accesso agli aggiornamenti tramite GitHub, usa **Scarica**, poi **Riavvia e aggiorna**. Una normale chiusura dell’app non installa l’aggiornamento scaricato. I pacchetti Debian continuano a usare il gestore pacchetti.

Se Warplyn non si avvia dopo un aggiornamento di AppImage, chiudi l’app. Trovi l’eseguibile della versione precedente accanto all’immagine, con il suffisso `.previous`. Ripristina lo snapshot salvato prima dell’aggiornamento, poi avvia la versione precedente. Conserva entrambi gli eseguibili e lo snapshot finché il ripristino non riesce. Se non puoi scrivere nella cartella dell’immagine, spostala in una cartella di tua proprietà oppure scarica manualmente la versione sostitutiva. Non disattivare la sandbox di Electron per avviare un’immagine.
