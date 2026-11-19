---
description: "Erfahren Sie, welche Diagnose- und Nutzungsdaten Warplyn teilt, was privat bleibt und wie Sie die Freigabe in den Einstellungen deaktivieren."
---

# Diagnose- und Nutzungsdaten teilen

Wenn Sie die Freigabe aktivieren, sendet die Desktop-App für Windows oder Linux Daten zur Stabilität und Nutzung an PostHog Cloud in Virginia (USA). Die Ereignisse sind einer pseudonymen ID zugeordnet. Standardmäßig ist die Freigabe ausgeschaltet. Sie können Ihre Auswahl unter **Einstellungen** → **Allgemein** → **Datenschutz und Diagnose** ändern.

Wenn Sie die Freigabe ausschalten, erfasst Warplyn keine weiteren Ereignisse und löscht die Warteschlange sowie die lokale Telemetrie-ID. Schalten Sie die Freigabe später wieder ein, legt Warplyn eine neue ID an. Bereits gesendete Ereignisse bleiben bei PostHog Cloud gespeichert.

Ausstehende Ereignisse werden im lokalen App-Profil gespeichert, damit Warplyn sie bei wiederhergestellter Verbindung erneut senden kann. Beim nächsten Prüfen der Warteschlange werden Ereignisse verworfen, die älter als 24 Stunden sind. Wenn Sie die Freigabe ausschalten, wird die Warteschlange gelöscht.

[![Einstellungen für Datenschutz und Diagnose mit Freigabeschalter und Telemetrie-ID-Steuerung; die ID ist unkenntlich gemacht.](/images/diagnostic-and-usage-data.png)](/images/diagnostic-and-usage-data.png)

*Einstellungen für Datenschutz und Diagnose in der Desktop-App.*

## Welche Daten Warplyn erfasst

Die Ereignisse umfassen:

- erfolgreiche oder fehlgeschlagene Verbindungsprüfungen, jedoch keine Verbindungsnamen oder Anbieterangaben
- App-Starts sowie sichere Kategorien von Start-, Renderer- oder Kindprozessfehlern
- abgeschlossene, fehlgeschlagene oder abgebrochene KI-Vorgänge und deren Phasen, einschließlich Fehlerkategorie und, falls verfügbar, HTTP-Status
- ausdrücklich durchgeführte *Vorschlagsprüfungen* und aggregierte Prüfpunkte
- Ergebnisse von Sicherungen und Wiederherstellungen

Ereignisse enthalten keinen *Artikel*-Text, keine Prompts, KI-Antworten oder API-Schlüssel.

::: details Weitere Ereignisfelder
Jedes Ereignis enthält eine Desktop-Analysequelle, Schema-Version, Anwendungsversion, Plattform, Architektur, Betriebssystemversion und einen Zeitstempel. Ereignisspezifische Felder sind auf bekannte Kategorien, nicht negative Zähler oder begrenzte Zeitspannen beschränkt.

Ereignisse zu KI-Vorgängen und Phasen können eine zufällige ID enthalten, mit der Ereignisse desselben Vorgangs verknüpft werden. Sie ist von Artikel- und Anfrage-IDs getrennt.

Ereignisse enthalten keine *Artikel*- oder *Versions*-IDs oder -Titel, keine Werte von Umgebungsvariablen, Dateipfade, URLs, Rohfehlermeldungen, Prozess-Exit-Details oder Anfrage- und Antwortinhalte.
:::

## Löschung beantragen

Informationen zu Auskunfts-, Berichtigungs- und anderen Datenschutzanfragen finden Sie unter [Datenanfragen](data-request.md).

1. Wählen Sie unter **Einstellungen** → **Allgemein** → **Datenschutz und Diagnose** die Option **Telemetrie-ID kopieren**.
2. Senden Sie die ID per E-Mail an [kirill.taran@punk.link](mailto:kirill.taran@punk.link) und bitten Sie um Löschung.
3. Deaktivieren Sie **Diagnose- und Nutzungsdaten teilen**.

Kopieren Sie die ID, bevor Sie die Freigabe ausschalten. Dadurch wird sie von Ihrem Gerät gelöscht. Der Projektinhaber löscht den zugehörigen pseudonymen Datensatz und bestätigt dies per E-Mail.

## Website-Analyse {#website-analytics}

Die Landing- und Planseiten verwenden PostHog, um Besuche, Verweis- und Kampagneninformationen sowie Klicks auf Download-Links zu messen. PostHog-Downloadereignisse enthalten die Position der Schaltfläche auf der Seite. Google Analytics erfasst außerdem ein Ereignis `download_clicked`, wenn jemand über die Landingpage, die Planseite oder das Benutzerhandbuch den Link zum neuesten Release öffnet. Diese Klicks bestätigen weder einen Download noch eine Installation.

Das PostHog-Tracking der Website verwendet keine Cookies oder Browserspeicher, erstellt keine Personenprofile und zeichnet weder Sitzungen noch allgemeine Klickaktivitäten auf. PostHog schätzt die Anzahl der Besucher anhand eines serverseitig erstellten Hashwerts. Website-Ereignisse bleiben von den Telemetrie-IDs der Desktop-App getrennt; der Freigabeschalter der Desktop-App steuert das Website-Tracking nicht.

Landingpages und Benutzerhandbuch verwenden auch Google Analytics, das möglicherweise Cookies einsetzt, um Besuche und Zugriffsquellen zu messen. Wenn Ihr Browser „Do Not Track“ oder „Global Privacy Control“ übermittelt, deaktiviert die Website das Tracking durch beide Dienste. Das oben beschriebene cookielose Verhalten gilt für PostHog.
