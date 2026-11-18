---
description: "Wechseln Sie mithilfe einer Sicherung von Skladno zu Warplyn und behalten Sie Ihre ursprüngliche Installation und Ihre Texte zur Wiederherstellung verfügbar."
---

# Von Skladno zu Warplyn wechseln

Warplyn ist eine separate Anwendung. Behalten Sie Skladno und dessen Daten, bis Sie Ihre wiederhergestellten Inhalte überprüft haben. Verschieben Sie den aktiven Datenordner nicht nach Warplyn.

Laden Sie das Installationsprogramm für Windows 11 x64 oder das Debian-x64-Paket aus dem [neuesten Warplyn-Release](https://github.com/punk-link/warplyn/releases/latest) herunter. Plattformanweisungen finden Sie unter [Installation](installation.md).

Wählen Sie vor der Migration unter **Einstellungen** → **Daten und Sicherungen** einen **Sicherungsordner** aus und wählen Sie **Sicherung erstellen**. Bewahren Sie jede `.sqlite`-Sicherung zusammen mit dem zugehörigen Ordner `.sqlite.skills` auf. Einzelheiten finden Sie unter [Sicherungen und Wiederherstellung](backups-and-recovery.md).

## Migrationsverfahren

1. Schließen Sie in Skladno aktive KI-Arbeiten ab oder brechen Sie sie ab. Schließen Sie die App und öffnen Sie sie erneut, damit der neueste Prüfpunkt gespeichert wird. Nehmen Sie während der Sicherung keine externen Änderungen an den Dateien für *Fähigkeiten* des Authors vor.
2. Erstellen Sie in der laufenden Skladno-App eine manuelle Sicherung, auch wenn ein benutzerdefiniertes Datenverzeichnis verwendet wird. Bewahren Sie die `.sqlite`-Datei und den zugehörigen Ordner `.sqlite.skills` mit ihren ursprünglichen Namen zusammen auf. Schließen Sie Skladno nach der Sicherung.
3. Installieren und öffnen Sie Warplyn mit einem eigenen, leeren Profil. Verwenden Sie niemals Ihr aktives Skladno-Datenverzeichnis.
4. Wählen Sie unter **Einstellungen** → **Daten und Sicherungen** den Ordner mit der Migrationssicherung aus und wählen Sie **Sicherung wiederherstellen**. Wählen Sie den Skladno-Schnappschuss, bestätigen Sie das Ersetzen und warten Sie, bis Warplyn neu gestartet wurde. Wenn Warplyn bereits Inhalte enthält, erstellen Sie zuerst eine eigene Sicherung: Die Wiederherstellung ersetzt vorhandene Inhalte und führt Datenbanken nicht zusammen.
5. Prüfen Sie *Artikel*, aktuelle *Entwürfe*, den *Versions*-Verlauf, Unterhaltungen mit dem Assistenten, *Einstellungen*, Veröffentlichungsprofile und die *Fähigkeiten* des Authors, bevor Sie neue Inhalte schreiben.
6. Fügen Sie unter **Einstellungen** → **KI-Assistent** die Verbindungen erneut hinzu und wählen Sie Modelle für Ihre Rollen. Bei der Wiederherstellung werden gespeicherte Verbindungen und Modellauswahlen entfernt, da Anmeldedaten nicht Teil der Sicherung sind. Skladno-Anmeldedaten bleiben unverändert.
7. Fügen Sie bei Verbindungen über Umgebungsvariablen den Variablennamen erneut hinzu und stellen Sie sicher, dass diese Variable in der Prozessumgebung von Warplyn vorhanden ist. Sicherungen kopieren niemals `.env`-Dateien oder deren Werte.
8. Wählen Sie für Warplyn einen separaten Ordner für laufende Sicherungen. Legen Sie die Einstellungen für Update-Netzwerk und Telemetrie erneut fest. Die Migration übernimmt keine Einstellungen für Sicherungsordner, Telemetrie-Identität, bereitgestellte Updates oder ausstehende Wiederherstellungsdatensätze.

Native Sicherungen mit einem Ordner `.sqlite.skills` stellen die aktuellen *Fähigkeiten* des Authors und ihren unveränderlichen Versionsverlauf wieder her. Ältere Sicherungen, die nur eine `.sqlite`-Datei enthalten, stellen die Datenbank wieder her und lassen die *Fähigkeiten* am Ziel unverändert; Dateien, die nie in der Sicherung enthalten waren, können damit nicht wiederhergestellt werden. Datenbankdateinamen und Manifestformate bleiben mit Skladno kompatibel.

## Wiederherstellung

Behalten Sie Skladno installiert, bis Sie die Wiederherstellung überprüft haben. Die Apps synchronisieren spätere Änderungen nicht und führen sie nicht zusammen. Wenn Sie zu Skladno zurückkehren, entspricht es weiterhin dem Zustand vor der Migration.

Falls die Wiederherstellung fehlschlägt, verwenden Sie weiterhin Skladno und bewahren Sie das ursprüngliche Sicherungspaar auf. Warplyn validiert die Sicherung und behält einen Wiederherstellungs-Schnappschuss des Ziels; schlägt der Start fehl, wird dieser Schnappschuss zurückgespielt. Beheben Sie das gemeldete Problem und versuchen Sie es erneut. Siehe [Sicherungen und Wiederherstellung](backups-and-recovery.md) und [Wiederherstellung nach Updates](update-recovery.md).

Warplyn verwendet standardmäßig `~/.warplyn` und für einen benutzerdefinierten Ordner `WARPLYN_DATA_DIR`. `SKLADNO_DATA_DIR` wird für aktive Daten ignoriert. Pfade, die bekannte ältere Speicherorte überschneiden, werden abgelehnt. Verwenden Sie einen separaten leeren Ordner und stellen Sie die Sicherung wieder her, statt eine aktive SQLite-Datenbank zu kopieren.
