---
description: "Installa Warplyn su Windows o Linux e configura l’app. Su Linux puoi scegliere tra un pacchetto Debian e un file AppImage."
---

# Installare Warplyn

Warplyn è disponibile per Windows 11 x64 e Linux. Scarica i programmi di installazione attuali dalle [release di Warplyn](https://github.com/punk-link/warplyn/releases). Se usi Skladno, segui la [guida alla migrazione](migration.md) e conserva l’installazione e le copie di sicurezza finché non hai verificato il ripristino del tuo lavoro.

## Windows

1. Apri le [release di Warplyn](https://github.com/punk-link/warplyn/releases).
2. In **Assets**, scarica il programma di installazione Windows `.exe` ed eseguilo.
3. Se Windows mostra un avviso SmartScreen, verifica che il programma di installazione provenga dalla pagina delle release di questo repository. Le release non sono firmate digitalmente.
4. Apri Warplyn dal menu Start.

Per i controlli di aggiornamento e le opzioni di ripristino, consulta [Ripristino dopo un aggiornamento dell’app desktop](update-recovery.md).

::: info Informazioni sulle firme digitali
Una firma digitale usa un certificato di firma del codice per identificare il publisher e indicare se un programma di installazione è stato modificato dopo la firma. Non garantisce che il software sia sicuro. Warplyn non ha ancora configurato la firma del publisher, quindi Windows non può verificarne l’identità dal programma di installazione. Scaricalo solo dalla pagina ufficiale delle release.
:::

## Debian e distribuzioni basate su Debian

Il pacchetto Debian è stato verificato soprattutto su Ubuntu 22.04 x64. La compatibilità con altre versioni o distribuzioni può variare. Usa un sistema amd64 con una sessione desktop grafica.

1. Apri le [release di Warplyn](https://github.com/punk-link/warplyn/releases).
2. In **Assets**, scarica il pacchetto `warplyn_VERSION_amd64.deb`.
3. Apri un terminale nella cartella in cui lo hai scaricato. Se la cartella contiene solo quel pacchetto Warplyn, installalo con:

   ```sh
   sudo apt install ./warplyn_*.deb
   ```

4. Apri Warplyn dal menu delle applicazioni.

Per aggiornare manualmente, scarica il nuovo file `.deb` ed esegui lo stesso comando `sudo apt install` indicando quel file. Il download non configura un repository automatico di pacchetti. Apt installa i pacchetti necessari a Warplyn. Se non ci riesce, non forzare l’installazione.

Per impostazione predefinita, i testi vengono salvati in `~/.warplyn`. Crea una copia di sicurezza prima di aggiornare. La reinstallazione o la rimozione dell’applicazione dovrebbe conservare questa cartella e le credenziali nel portachiavi del desktop.

Su Linux, le chiavi API gestite richiedono un Secret Service disponibile e sbloccato, come GNOME Keyring. Consulta [Provider e modelli di IA](providers.md) per altre opzioni di connessione.

Se non riesci a salvare o leggere una chiave, sblocca il portachiavi del desktop e riprova. Se la sessione non dispone di Secret Service, attivane uno oppure usa una connessione tramite variabile d’ambiente come descritto nella guida. Puoi continuare a modificare testi offline. Non disattivare la sandbox per aggirare gli errori di avvio; segnala la distribuzione, la versione e l’errore.

### AppImage per Linux {#linux-appimage}

Se una release include un file `.AppImage` x64, conservalo in una cartella in cui puoi scrivere. Scaricalo dalle [release di Warplyn](https://github.com/punk-link/warplyn/releases), rendilo eseguibile nel file manager e avvialo. Puoi anche eseguire `chmod +x Warplyn-*-linux-x64.AppImage` nella cartella dei download. Linux richiede il supporto FUSE con accesso a `/dev/fuse`, le librerie desktop di Electron e un portachiavi Secret Service per le credenziali gestite. AppImage non include una sessione desktop né un portachiavi.

Per il sistema Ubuntu 22.04, le dipendenze desktop includono `libgtk-3-0`, `libnss3`, `libasound2`, `libatk-bridge2.0-0`, `libdrm2`, `libgbm1`, `libxkbcommon0`, `libnotify4`, `libxcb-dri3-0` e `xdg-utils`. GNOME Keyring fornisce Secret Service. Una normale installazione di GNOME include la maggior parte di questi pacchetti. Altre distribuzioni usano nomi di pacchetto diversi e richiedono verifiche di compatibilità specifiche.

L’integrazione desktop è facoltativa: crea un launcher che punti al percorso completo dell’immagine. Mantieni lo stesso percorso durante gli aggiornamenti. AppImage è stato verificato su Ubuntu 22.04 x64 con GNOME. La compatibilità è stata verificata anche su Ubuntu 24.04 x64 e Fedora 43 x64, entrambi con GNOME.

Per le procedure di download, riavvio e ripristino, consulta [Ripristino dopo un aggiornamento dell’app desktop](update-recovery.md).

Per aggiungere una voce al menu delle applicazioni, puoi rinominare l’immagine `Warplyn.AppImage` e salvarla in una cartella `Applications` nella tua cartella personale. Se `~/.local/share/applications` non esiste, creala e salva al suo interno il file seguente con il nome `warplyn.desktop`. Sostituisci `YOUR_USER` con il tuo nome utente Linux oppure usa il percorso completo dell’immagine:

```ini
[Desktop Entry]
Type=Application
Name=Warplyn
Exec="/home/YOUR_USER/Applications/Warplyn.AppImage" %U
Terminal=false
Categories=Office;
StartupWMClass=Warplyn
```

La voce di menu continua a funzionare perché gli aggiornamenti dall’app sostituiscono l’immagine nello stesso percorso. Per aggiungere l’icona di Warplyn, esegui `./Warplyn.AppImage --appimage-extract warplyn.png` accanto all’immagine, conserva il PNG estratto in una posizione permanente e aggiungi `Icon=` seguito dal percorso completo nel file launcher.

## Dopo l’installazione

Per usare le funzioni di IA, aggiungi una connessione a un provider in **Impostazioni** → **Assistente IA**. Scegli una **Cartella dei backup** in **Impostazioni** → **Dati e backup** per proteggere i tuoi *articoli*.

Warplyn conserva sul computer gli *articoli* e i checkpoint. Le richieste di IA richiedono una connessione a Internet e inviano al provider scelto il testo e il contesto pertinenti dell’*articolo*. Si applicano le norme sui dati e i prezzi del provider.
