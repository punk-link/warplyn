---
description: "Legen Sie Erscheinungsbild, Schreibvorgaben, Verhalten des Assistenten, Veröffentlichungshinweise und Update-Einstellungen für den Desktop fest."
---

# Anwendungseinstellungen

Die Anwendungseinstellungen legen fest, wie Warplyn aussieht und sich verhält. Sie gehören nicht zum *Versionsverlauf* eines *Artikels*. Öffnen Sie **Einstellungen** im **Werkzeugbereich der Artikelbibliothek**. Einige Einstellungen sind nur in der Desktop-App verfügbar und unten entsprechend gekennzeichnet.

## Erscheinungsbild und Sprache einstellen

Wählen Sie unter **Allgemein** → **Erscheinungsbild und Sprache** für **Bevorzugtes Erscheinungsbild** die Option **System**, **Hell** oder **Dunkel**. **System** folgt den Geräteeinstellungen und wird aktualisiert, während Warplyn geöffnet ist. Wählen Sie unter **Oberflächensprache** die Sprache für Menüs und Meldungen. Derzeit ist nur Englisch vollständig verfügbar. Diese Auswahl ändert weder die Schreibsprache eines *Artikels* noch seine Typografieregeln.

Wählen Sie unter **Datum und Uhrzeit** ein Datumsformat, eine 12- oder 24-Stunden-Anzeige und eine Zeitzone. Die Systemoptionen folgen Ihrem Gerät. Diese Einstellungen ändern die Anzeige gespeicherter Zeitangaben in Warplyn, nicht die Zeitangaben selbst.

## Schreibvorgaben festlegen

Legen Sie unter **Sprachvorgaben** die **Standardsprache für Artikel** für neue *Artikel* fest. Mit **Standardsprachen für Übersetzungen** werden diese Zielsprachen bei einer *Übersetzungs*-Anfrage zuerst angeboten. Geben Sie einen Sprachnamen, eine regionale Variante oder einen Code ein und wählen Sie **Hinzufügen**. Warplyn bittet Sie weiterhin, jede Übersetzungsanfrage zu bestätigen.

## Verhalten des Assistenten festlegen

Wählen Sie unter **KI-Assistent** für neue *Artikel*-Unterhaltungen standardmäßig **Änderungen zur Prüfung vorschlagen** oder aktivieren Sie **Änderungen direkt anwenden** für ausdrücklich angeforderte Änderungen. Diese Vorgabe ändert keine bestehenden Unterhaltungen; andere generierte Ergebnisse müssen weiterhin geprüft werden.

**Zeitlimit für Anfragen** gilt für jede neue Anfrage und jeden erneuten Versuch. Standardmäßig sind es zwei Minuten. Wählen Sie für Aufgaben, die mehr Zeit benötigen, ein längeres Limit oder **Unbegrenzt**. Eine Anfrage, die das Zeitlimit überschreitet, ändert den *Artikel* nicht.

Legen Sie fest, ob **Eingabe** oder **Strg + Eingabe** zum Senden einer Anfrage an den Assistenten verwendet wird. Weitere Anwendungs-Kurzbefehle lassen sich unter **Tastenkombinationen** ändern. Warplyn erkennt Konflikte, bevor ein Kurzbefehl gespeichert wird.

## Veröffentlichungshinweise festlegen

Wählen Sie unter **Veröffentlichung** ein Standardprofil für neue *Artikel*. Profile wie **LinkedIn-Beitrag** und **LinkedIn-Artikel** zeigen Zeichenhinweise in der **Artikel-Statusleiste** an. Sie können auch **Keine Beschränkungen** wählen oder ein eigenes Profil mit Namen und ganzzahliger Zeichenbegrenzung hinzufügen. Die Vorgabe gilt für neue *Artikel*; ein bestehender *Artikel* kann ein eigenes Profil behalten. Grenzen dienen nur als Orientierung und verhindern niemals das Kopieren. Wählen Sie in der **Artikel-Statusleiste** **Markdown kopieren** oder öffnen Sie das Menü und wählen Sie **Unformatierten Text kopieren**. Warplyn kopiert Text auf Ihre Anweisung hin, veröffentlicht aber nicht direkt.

## KI-Modelloptionen prüfen

Unter **KI-Assistent** können Sie mehrere Anbieter-Verbindungen speichern, nur gewünschte Verbindungen aktivieren und verschiedene Modelle für allgemeine Aufgaben des Assistenten und bestimmte *Fähigkeiten* festlegen. Das **Standardmodell** wird für KI-Aufgaben verwendet, sofern eine Aufgabe keine eigene Auswahl hat. Das optionale **App-Modell** übernimmt Warplyn-Aufgaben wie Zusammenfassungen und Titel; wenn es nicht festgelegt ist, wird das Standardmodell verwendet. Mit **Favoriten**, der Suche oder dem Anbieterfilter finden Sie ein Modell. Die **Reasoning-Stufe** wird für unterstützte OpenAI-Modelle angezeigt. Verfügbare Aufgaben und Steuerungen hängen vom Modell ab. Informationen zur Einrichtung und zu Anbietergrenzen finden Sie unter [KI-Anbieter und Modelle](providers.md).

Wählen Sie unter **Tastenkombinationen** neben einer Aktion einen Kurzbefehl aus und drücken Sie die gewünschte Tastenkombination. Sie können Kurzbefehle zum Speichern einer *Version*, zum Wechseln von Ansichten oder zum Umschalten des Fokusmodus festlegen. Warplyn nennt die Aktion, die bereits denselben Kurzbefehl verwendet; wählen Sie eine andere Kombination. **Senden mit** legt fest, ob **Eingabe** oder **Strg + Eingabe** eine Anfrage an den Assistenten sendet. Kurzbefehle zu ändern, ändert keinen *Artikel*-Inhalt.

## Desktop-Updates prüfen

Installierte Desktop-Apps können unter **Einstellungen** → **Über Warplyn** → **Updates** nach neuen Versionen suchen. Aktivieren Sie zuerst **Netzwerkzugriff für Updates erlauben**. Damit darf Warplyn GitHub nach öffentlichen Release-Informationen kontaktieren und Updates abrufen, deren Download Sie auswählen. Legen Sie anschließend **Automatisch nach Updates suchen** sowie **Vorabversionen einbeziehen** fest. Mit **Jetzt suchen** können Sie jederzeit manuell prüfen. Für ein verfügbares Release werden Hinweise angezeigt. Unter Windows und bei Linux-AppImage-Installationen gibt es die Aktionen **Herunterladen** und **Neu starten und aktualisieren**. Debian-Installationen verwenden **Release-Hinweise anzeigen** und anschließend ein Upgrade über die Paketverwaltung oder ein neueres `.deb`-Installationsprogramm. Wenn ein Update den App-Start verhindert, siehe [Wiederherstellung nach Desktop-Updates](update-recovery.md).

## Lokale Daten löschen

In der Desktop-App entfernt **Lokale Daten löschen** dauerhaft die aktiven Warplyn-Daten, einschließlich *Artikel*, *Versionen*, Prüfpunkte, Verlauf des Assistenten, Stildaten, Einstellungen und lokaler Sicherungen im Datenordner. Wenn ein Sicherungsordner eingerichtet ist, bietet der Bestätigungsdialog **Vor dem Löschen eine Sicherung erstellen** an. Warplyn muss diese Sicherung vollständig erstellen, bevor Daten gelöscht werden. Nach erfolgreichem Löschen wird die App geschlossen. Eine normale Deinstallation entfernt Ihre Schreibdaten nicht. Persönliche Rechtschreibwörter im Wörterbuch des Betriebssystems bleiben erhalten. Entfernen Sie sie bei Bedarf separat unter **Einstellungen** → **Rechtschreibung**.

Unter **Einstellungen** → **Über Warplyn** finden Sie das Benutzerhandbuch, das Quell-Repository, den Issue-Tracker und die Lizenz. Mit **Schnellstart öffnen** können Sie die Einführung beim ersten Start erneut aufrufen.
