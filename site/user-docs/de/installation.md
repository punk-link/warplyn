---
description: "Installieren Sie Warplyn unter Windows oder Linux mit Debian- oder AppImage-Paketen und richten Sie anschließend Ihren Schreibarbeitsbereich ein."
---

# Warplyn installieren

Warplyn ist für Windows 11 x64 und Linux verfügbar. Laden Sie aktuelle Installationsdateien von [Warplyn-Releases](https://github.com/punk-link/warplyn/releases) herunter. Wenn Sie Skladno verwenden, folgen Sie der [Migrationsanleitung](migration.md) und behalten Sie die Installation und Sicherungen, bis Sie Ihre wiederhergestellten Daten geprüft haben.

## Windows

1. Öffnen Sie [Warplyn-Releases](https://github.com/punk-link/warplyn/releases).
2. Laden Sie unter **Assets** die Windows-Setup-Datei `.exe` herunter und führen Sie sie aus.
3. Wenn Windows eine SmartScreen-Warnung anzeigt, prüfen Sie, ob die Installationsdatei von der Release-Seite dieses Repositorys stammt. Releases sind nicht digital signiert.
4. Starten Sie Warplyn über das Startmenü.

Informationen zu Update-Steuerung und Wiederherstellung finden Sie unter [Wiederherstellung nach Desktop-Updates](update-recovery.md).

::: info Digitale Signaturen
Eine digitale Signatur verwendet ein Code-Signaturzertifikat, um den Herausgeber zu identifizieren und anzuzeigen, ob eine Installationsdatei seit der Signierung verändert wurde. Sie garantiert nicht, dass Software sicher ist. Warplyn hat die Herausgeber-Signierung noch nicht eingerichtet; Windows kann den Herausgeber daher nicht anhand der Installationsdatei überprüfen. Laden Sie sie nur von der offiziellen Release-Seite herunter.
:::

## Debian und Debian-basierte Distributionen

Ubuntu 22.04 x64 ist das primär validierte Debian-Ziel; die Kompatibilität mit anderen Distributionsversionen ist nicht garantiert. Verwenden Sie ein amd64-System mit grafischer Desktop-Sitzung.

1. Öffnen Sie [Warplyn-Releases](https://github.com/punk-link/warplyn/releases).
2. Laden Sie unter **Assets** das Paket `warplyn_VERSION_amd64.deb` herunter.
3. Öffnen Sie ein Terminal im Download-Ordner. Wenn der Ordner nur dieses Warplyn-Paket enthält, installieren Sie es mit:

   ```sh
   sudo apt install ./warplyn_*.deb
   ```

4. Starten Sie Warplyn über das Anwendungsmenü.

Für ein manuelles Upgrade laden Sie die neuere `.deb`-Datei herunter und führen denselben Befehl `sudo apt install` mit dieser Datei aus. Der Download richtet kein automatisches Paket-Repository ein. Apt löst deklarierte Abhängigkeiten auf; erzwingen Sie die Installation nicht, wenn Abhängigkeiten nicht erfüllt werden können.

Ihre Schreibdaten werden standardmäßig in `~/.warplyn` gespeichert. Sichern Sie diesen Ordner vor einem Upgrade. Eine Neuinstallation oder Entfernung der Anwendung sollte diesen Ordner und die Anmeldedaten im Desktop-Schlüsselbund erhalten.

Verwaltete API-Schlüssel unter Linux benötigen einen verfügbaren und entsperrten Secret Service, zum Beispiel GNOME Keyring. Weitere Verbindungsmöglichkeiten finden Sie unter [KI-Anbieter und Modelle](providers.md).

Wenn ein Schlüssel nicht gespeichert oder gelesen werden kann, entsperren Sie Ihren Desktop-Schlüsselbund und versuchen Sie es erneut. Falls Ihre Sitzung keinen Secret Service hat, aktivieren Sie einen oder verwenden Sie eine Verbindung über Umgebungsvariablen aus der Anleitung. Offline-Bearbeitung ist weiterhin möglich. Deaktivieren Sie die Sandbox nicht, um Startprobleme zu umgehen; melden Sie stattdessen Distribution, Version und Fehlermeldung.

### Linux AppImage {#linux-appimage}

Wenn ein Release eine x64-Datei mit der Endung `.AppImage` enthält, speichern Sie sie in einem Ordner, in den Sie schreiben können. Laden Sie sie von [Warplyn-Releases](https://github.com/punk-link/warplyn/releases) herunter, machen Sie sie im Dateimanager ausführbar und starten Sie die Datei. Alternativ können Sie im Download-Ordner `chmod +x Warplyn-*-linux-x64.AppImage` ausführen. Linux benötigt FUSE-Zugriff auf `/dev/fuse`, die Electron-Desktopbibliotheken und einen Secret-Service-Schlüsselbund für verwaltete Anmeldedaten. AppImage enthält weder eine Desktop-Sitzung noch einen Schlüsselbund.

Zu den Desktop-Abhängigkeiten des Ubuntu-22.04-Ziels gehören `libgtk-3-0`, `libnss3`, `libasound2`, `libatk-bridge2.0-0`, `libdrm2`, `libgbm1`, `libxkbcommon0`, `libnotify4`, `libxcb-dri3-0` und `xdg-utils`. GNOME Keyring stellt Secret Service bereit. Eine normale GNOME-Installation enthält die meisten dieser Pakete. Andere Distributionen verwenden andere Paketnamen und benötigen eigene Kompatibilitätsprüfungen.

Die Desktop-Integration ist optional: Erstellen Sie einen Starter, der auf den vollständigen Pfad Ihres Images verweist. Behalten Sie beim Aktualisieren denselben Pfad bei. Die Abnahme von AppImage für den Desktop steht noch aus. Ubuntu 22.04 x64 ist das primäre Validierungsziel; Ubuntu 24.04 x64 und Fedora 43 x64 sind zusätzliche Kompatibilitätsziele. Daraus folgt keine allgemeine Linux-Unterstützung.

Unter [Wiederherstellung nach Desktop-Updates](update-recovery.md) finden Sie die einzelnen Schritte zum Herunterladen, Neustarten und Wiederherstellen.

Für einen Eintrag im Anwendungsmenü können Sie das Image in `Warplyn.AppImage` umbenennen und im Ordner `Applications` in Ihrem Home-Verzeichnis ablegen. Erstellen Sie `~/.local/share/applications`, falls der Ordner fehlt, und speichern Sie dort Folgendes als `warplyn.desktop`. Ersetzen Sie `YOUR_USER` durch Ihren Linux-Benutzernamen oder verwenden Sie den vollständigen Pfad zum Image:

```ini
[Desktop Entry]
Type=Application
Name=Warplyn
Exec="/home/YOUR_USER/Applications/Warplyn.AppImage" %U
Terminal=false
Categories=Office;
StartupWMClass=Warplyn
```

Der Menüeintrag bleibt gültig, weil In-App-Updates das Image am selben Pfad ersetzen. Um das Warplyn-Symbol hinzuzufügen, führen Sie neben dem Image `./Warplyn.AppImage --appimage-extract warplyn.png` aus, speichern Sie die extrahierte PNG-Datei dauerhaft und ergänzen Sie `Icon=` mit ihrem vollständigen Pfad in der Starterdatei.

## Nach der Installation

Für KI-Funktionen fügen Sie unter **Einstellungen** → **KI-Assistent** eine Anbieter-Verbindung hinzu. Wählen Sie unter **Einstellungen** → **Daten und Sicherungen** einen **Sicherungsordner**, um Ihre *Artikel* zu schützen.

Warplyn speichert *Artikel* und Prüfpunkte auf Ihrem Computer. KI-Anfragen benötigen eine Internetverbindung und übermitteln den relevanten *Artikel*-Text und Kontext an den von Ihnen gewählten Anbieter. Es gelten die Datenrichtlinien und Preise dieses Anbieters.
