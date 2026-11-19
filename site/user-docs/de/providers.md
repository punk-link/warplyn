---
description: "So verbinden Sie Warplyn mit einem KI-Anbieter, hinterlegen Ihren API-Schlüssel und wählen Modelle für verschiedene Aufgaben."
---

# KI-Anbieter und Modelle

Warplyn sendet KI-Anfragen an den Anbieter, den Sie unter **Einstellungen** → **KI-Assistent** konfigurieren. Sie benötigen bei diesem Anbieter ein Konto und einen API-Schlüssel. Für die API-Nutzung können Gebühren anfallen.

## Verbindung hinzufügen

Öffnen Sie in der Desktop-App **Einstellungen** → **KI-Assistent**. Wählen Sie unter **Wie möchten Sie Ihren Schlüssel bereitstellen?** die Option **API-Schlüssel hinzufügen** oder **Umgebungsvariable**.

- **API-Schlüssel hinzufügen:** Wählen Sie einen Anbieter, geben Sie der Verbindung einen Namen und tragen Sie den Schlüssel ein. Warplyn speichert ihn im Windows-Anmeldeinformationsspeicher oder im Linux Secret Service. Der Schlüssel wird nicht erneut angezeigt und weder in der Warplyn-Datenbank noch in Sicherungen gespeichert.
- **Umgebungsvariable:** Wählen Sie einen Anbieter, geben Sie der Verbindung einen Namen und tragen Sie den Namen der Variablen ein, die den Schlüssel enthält. Warplyn speichert den Namen, nicht den Wert. Der Anwendungsdienst muss mit gesetzter Variable gestartet werden.

::: tip Zu Anmeldedaten
Verwaltete API-Schlüssel erfordern die Desktop-App und einen verfügbaren Anmeldedatendienst des Betriebssystems. Unter Linux muss Secret Service entsperrt sein. Die Browser-App unterstützt Verbindungen über Umgebungsvariablen, kann aber keine Anmeldedaten des Betriebssystems verwalten. Das Installationsprogramm erstellt oder importiert keine `.env`-Datei.
:::

Wenn Sie den API-Schlüssel direkt hinterlegen, prüft Warplyn ihn beim Anbieter. Wenn Sie eine Umgebungsvariable angeben, speichert Warplyn beim Hinzufügen nur die Einstellungen. Warplyn kontaktiert den Anbieter erneut, wenn Sie Modelle aktualisieren oder eine KI-Anfrage senden. Diese Prüfungen enthalten keinen *Artikel*-Text.

Verbindungen werden unter **Einstellungen** → **KI-Assistent** aufgelistet. Mit **Aktiv**, **Aktivieren** oder **Deaktivieren** legen Sie fest, welche Verbindungen Warplyn für neue Anfragen verwenden darf. Wählen Sie **Umbenennen**, um den lokalen Anzeigenamen zu ändern, oder **Entfernen** und bestätigen Sie, um die Verbindung aus Warplyn zu entfernen. Beim Entfernen einer Umgebungsvariablen-Verbindung werden weder die Variable noch ihr Schlüssel gelöscht.

::: tip Wenn die Modellaktualisierung fehlschlägt
Prüfen Sie, ob die Verbindung **Aktiv** ist, der gespeicherte Schlüssel gültig oder die Umgebungsvariable für den Anwendungsdienst verfügbar ist und das Anbieterkonto Zugriff auf die API hat.
:::

## Anbieter und Modelle auswählen

Warplyn unterstützt OpenAI, OpenCode Zen, Anthropic, Google Gemini API, xAI Grok und DeepSeek. Der Katalog von OpenCode Zen bietet außerdem Modelle anderer Anbieter.

Wählen Sie unter **Einstellungen** → **KI-Assistent** die Option **Verfügbare Modelle aktualisieren** und anschließend ein **Standardmodell**. Wenn eine bestimmte *Fähigkeit* ein anderes Modell verwenden soll, wählen Sie es unter **Modelle für bestimmte Aufgaben** aus. Mit **Standardmodell verwenden** greift die Aufgabe auf das gewählte **Standardmodell** zurück.

Aktualisieren Sie die Modellliste, nachdem Sie Verbindungen geändert haben oder wenn Sie den aktuellen Katalog eines Anbieters sehen möchten. Mit **Modelle suchen**, **Modelle nach Anbieter filtern** und **Favoriten** können Sie die Liste eingrenzen. Modellauswahlen gelten für künftige Anfragen. Bei einem ausgewählten OpenAI-Modell können Sie, sofern verfügbar, die **Reasoning-Stufe** einstellen. Bei einer höheren Stufe kann die Antwort länger dauern. Das optionale **App-Modell** in den KI-Einstellungen ist vom Standardmodell getrennt und übernimmt Warplyn-Hilfsaufgaben wie Zusammenfassungen und Titel.

::: tip Modellverfügbarkeit
Die verfügbaren redaktionellen Funktionen variieren je nach Modell. Einige Modelle unterstützen keine beleggestützte Faktenprüfung, strukturierte Ausgabe oder Reasoning-Steuerung. Welche Modelle und Funktionen OpenCode Zen anbietet, entnehmen Sie dem Katalog des Anbieters.
:::

[![Einstellungen des KI-Assistenten mit konfigurierten Anbieter-Verbindungen, Auswahlmöglichkeiten für Schlüssel und Modellsteuerungen.](/images/ai-providers-and-models.png)](/images/ai-providers-and-models.png)

*Einstellungen des KI-Assistenten mit Anbieter-Verbindungen und Modellsteuerungen.*

### App-Modell

Das **App-Modell** übernimmt kurze Hilfsaufgaben, etwa Zusammenfassungen von *Vorschlägen*, Titel und das Erkennen der Absicht einer Anfrage an den Assistenten. Wenn Sie es nicht festlegen, verwendet Warplyn das Standardmodell.

Wählen Sie ein effizientes Textmodell mit geringeren Kosten. **GPT-6 Luna** ist eine OpenAI-Option für diese gezielten Aufgaben ([Modelldetails](https://developers.openai.com/api/docs/models/gpt-6-luna)). Bei einem anderen Anbieter wählen Sie ein vergleichbares Modell. Sind die Ergebnisse nicht gut genug, versuchen Sie ein leistungsfähigeres Modell.
