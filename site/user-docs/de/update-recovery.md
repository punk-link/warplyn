---
description: "Stellen Sie Warplyn nach einem fehlgeschlagenen Desktop-Update mit der vorherigen Version und dem passenden Schnappschuss wieder her."
---

# Wiederherstellung nach Desktop-Updates

Vorabversionen sind optional. Kann Warplyn nach einem Update nicht mehr gestartet werden, installieren Sie die vorherige Vorabversion erneut und stellen Sie den passenden Schnappschuss von vor dem Update wieder her.

::: warning Neuere Datenbank nicht öffnen
Öffnen Sie keine Datenbank, die von einer neueren Vorabversion erstellt wurde, mit einer älteren Version. Stellen Sie zuerst den Schnappschuss wieder her, den Warplyn vor dem Update aufgezeichnet hat.
:::

1. Laden Sie die vorherige Vorabversion aus ihrem [GitHub-Release](https://github.com/punk-link/warplyn/releases) herunter und installieren Sie sie erneut.
2. Stellen Sie den passenden SQLite-Schnappschuss wieder her, den Warplyn vor dem Update aufgezeichnet hat.
3. Starten Sie die vorherige Vorabversion und prüfen Sie Ihre *Artikel*, *Entwürfe*, *Versionen* und Einstellungen.

## Linux AppImage

Bewahren Sie Ihr AppImage in einem Ordner auf, in den Sie schreiben können. Unter [Warplyn installieren](installation.md#linux-appimage) finden Sie Laufzeitanforderungen, Hinweise zum Start und zur optionalen Desktop-Integration. Die Abnahme installierter AppImages für den Desktop steht noch aus.

Nachdem Sie den Netzwerkzugriff auf GitHub erlaubt haben, wählen Sie **Herunterladen** und dann **Neu starten und aktualisieren**. Durch normales Schließen wird das heruntergeladene Update nicht installiert. Debian-Pakete werden weiterhin über die Paketverwaltung aktualisiert.

Falls ein AppImage-Update nicht gestartet werden kann, schließen Sie Warplyn. Die vorherige ausführbare Datei bleibt neben dem Image mit der Endung `.previous` erhalten. Stellen Sie den passenden Schnappschuss von vor dem Update wieder her, bevor Sie gemäß obigem Hinweis die vorherige Version starten. Bewahren Sie beide ausführbaren Dateien und den Schnappschuss auf, bis die Wiederherstellung abgeschlossen ist. Ist der Image-Ordner nicht beschreibbar, verschieben Sie das Image in einen Ordner, der Ihnen gehört, oder laden Sie den Ersatz manuell herunter. Deaktivieren Sie nicht die Electron-Sandbox, um ein Image zu starten.
