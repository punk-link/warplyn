---
description: "Erstellen Sie automatische oder manuelle Warplyn-Sicherungen, stellen Sie Texte und Fähigkeiten wieder her und reagieren Sie sicher auf Probleme."
---

# Sicherungen und Wiederherstellung

## Sicherung erstellen

Wählen Sie unter **Einstellungen** → **Daten und Sicherungen** einen **Sicherungsordner** und anschließend **Sicherung erstellen**. In unterstützten Browsern bittet Warplyn um die Berechtigung, Sicherungen nur in diesem Ordner zu speichern.

[![Einstellungen für Daten und Sicherungen mit Sicherungsordner, den Schaltflächen „Sicherung erstellen“ und „Sicherung wiederherstellen“ sowie Optionen für automatische Sicherungen.](/images/backups-and-recovery.png)](/images/backups-and-recovery.png)

*Einstellungen für Daten und Sicherungen in der Desktop-App.*

::: tip Inhalt einer Sicherung
Eine neue Sicherung mit der Endung `.skladno` enthält die Datenbank, aktuelle *Fähigkeiten* des Authors, deren Verlauf von *Fähigkeitsversionen* und ein Dateimanifest. `.env`-Dateien und API-Schlüssel sind nicht enthalten.
:::

::: tip Einschränkungen von Browser-Sicherungen
Bei Sicherungsübertragungen im Browser sind Dateien bis zu je 100 MB und insgesamt bis zu 500 MB möglich. Verwenden Sie für größere lokale Daten die Desktop-App.
:::

In der Desktop-App hat jeder Datenbank-Schnappschuss einen zugehörigen Ordner `.sqlite.skills` mit aktuellen *Fähigkeiten* des Authors, deren Verlauf von *Fähigkeitsversionen*, persönlichen Rechtschreibwörtern und einem Manifest. Bewahren Sie beim Kopieren oder Wiederherstellen eines Schnappschusses die `.sqlite`-Datei und den Ordner `.sqlite.skills` zusammen auf. Browser-Sicherungen enthalten keine persönlichen Rechtschreibwörter.

Ältere `.sqlite`-Sicherungen enthalten nur die Datenbank. Bei der Wiederherstellung bleiben Ihre aktuellen Dateien für *Fähigkeiten* und deren Verlauf erhalten.

## Automatische Sicherungen

Legen Sie **Automatische Sicherungen** auf **Täglich** fest, um kurz nach dem Start von Warplyn einen Schnappschuss und anschließend alle 24 Stunden zu erstellen, solange die App geöffnet bleibt. Im Browser benötigt Warplyn die Berechtigung für den gewählten Ordner. Schlägt eine automatische Sicherung fehl, prüfen Sie den Ordner und erstellen Sie manuell eine Sicherung; der nächste geplante Versuch bleibt aktiviert.

Unter **Aufbewahrung automatischer Sicherungen** legen Sie fest, wie viele automatische Schnappschüsse Warplyn behält. Entfernt werden nur ältere automatische Schnappschüsse; manuell erstellte Sicherungen bleiben immer erhalten.

## Sicherung wiederherstellen

1. Wählen Sie unter **Einstellungen** → **Daten und Sicherungen** die Option **Sicherung wiederherstellen**.
2. Wählen Sie die gewünschte Sicherung aus. Warplyn prüft deren Dateien und speichert lokal eine Wiederherstellungskopie der aktuellen Datenbank und Dateien für *Fähigkeiten*.
3. Prüfen Sie nach Abschluss der Wiederherstellung Ihre *Artikel* und *Versionen*.

Die Wiederherstellung einer `.skladno`-Sicherung oder eines Desktop-Schnappschusses mit zugehörigem Ordner ersetzt die Datenbank und gespeicherten *Fähigkeiten*. Eine ältere Sicherung, die nur eine `.sqlite`-Datenbank enthält, ersetzt ausschließlich die Datenbank.

Beim Wiederherstellen einer Desktop-Sicherung werden außerdem die darin gespeicherten persönlichen Rechtschreibwörter zum Wörterbuch hinzugefügt. Vorhandene Wörter bleiben erhalten. Ältere Sicherungen ohne persönliche Wörter lassen Ihr Wörterbuch unverändert. Heruntergeladene Sprachwörterbücher und Einstellungen zum Vorladen der Rechtschreibprüfung sind nicht enthalten.

::: warning KI-Einstellungen nach der Wiederherstellung
Bei der Wiederherstellung bleiben die vorhandenen KI-Verbindungen, Anmeldedaten und Modellauswahlen dieser Installation erhalten. Sind keine Verbindungen eingerichtet, stellt Warplyn Variablennamen und Verweise für Umgebungsvariablen aus der Sicherung wieder her, jedoch niemals API-Schlüssel oder Werte von Umgebungsvariablen. Legen Sie fehlende Variablen auf diesem Computer fest und wählen Sie anschließend unter **Einstellungen** → **KI-Assistent** Modelle aus. Verbindungen mit gespeicherten API-Schlüsseln werden nicht in eine neue Installation importiert; fügen Sie sie unter Einstellungen hinzu. Andere Einstellungen werden wiederhergestellt. Bei einem fehlgeschlagenen Wiederherstellungsversuch und dem Rollback bleibt Ihre vorherige KI-Konfiguration erhalten.
:::

## Sicherung wiederherstellen, die nur eine Datenbank enthält

Führen Sie diese Schritte nur für eine ältere Sicherung mit der Endung `.sqlite` aus. Lassen Sie Warplyn ausgeschaltet, bis die Datenbank wieder am richtigen Ort ist.

1. Erstellen Sie eine Kopie Ihrer aktuellen lokalen Datenbank.
2. Kopieren Sie die Sicherung im konfigurierten Warplyn-Datenordner über `skladno.sqlite`.
3. Starten Sie Warplyn und prüfen Sie Ihre *Artikel* und *Versionen*.

Um eine Sicherung mit *Fähigkeiten* wiederherzustellen, verwenden Sie unter **Einstellungen** die Option **Sicherung wiederherstellen**. So kann Warplyn auch Manifest und Verlauf der *Fähigkeiten* prüfen und wiederherstellen.

## Wenn keine Sicherung erstellt werden kann

Warplyn lässt die aktive Datenbank und Bearbeitungssitzung unverändert. Prüfen Sie, ob der Zielordner existiert und Ihr Konto Schreibzugriff hat, und versuchen Sie es erneut.

## Dateiberechtigungen

Standardmäßig speichert der lokale Dienst seine Datenbank unter `~/.warplyn`. Mit `WARPLYN_DATA_DIR` können Sie einen anderen Ordner festlegen. Warplyn ignoriert `SKLADNO_DATA_DIR` und verwendet keinen Ordner, der sich mit dem früheren Datenspeicherort von Skladno überschneidet. Wenn Sie von Skladno wechseln, wählen Sie einen separaten Warplyn-Ordner und stellen Sie eine Sicherung wieder her.

Auf POSIX-Systemen beschränkt Warplyn den Zugriff auf Datenordner und SQLite-Dateien auf Ihr Benutzerkonto, auch nach einem Upgrade. Unter Windows gelten die von Windows verwalteten Dateisystemberechtigungen. Im Browser erstellte Sicherungsdateien verwenden die Berechtigungen des ausgewählten Ordners. Bewahren Sie Sicherungen daher in einem privaten Ordner auf und prüfen Sie die Freigabeeinstellungen, bevor Sie einen freigegebenen oder synchronisierten Speicherort verwenden.
