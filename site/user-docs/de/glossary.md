---
description: "Definitionen zu Artikeln, Entwürfen, Versionen, Vorschlägen, Hinweisen und Fähigkeiten im Schreibarbeitsbereich von Warplyn."
---

# Warplyn-Glossar

Hier finden Sie Begriffe aus Warplyn und dem Benutzerhandbuch.

## Artikel und Versionen

- **Artikel**: ein Text in Ihrer Artikelbibliothek, den Sie unabhängig von anderen *Artikeln* wiederherstellen können. Warplyn verwendet „Artikel“ statt „Dokument“.
- **Artikelbibliothek**: die lokale Sammlung von *Artikeln* des Autors. Der **aktuelle Artikel** ist im Arbeitsbereich geöffnet; eine **Artikelliste** zeigt die Sammlung.
- **Entwurf**: *Artikel*-Text, der gerade bearbeitet, aber noch nicht als *Version* gespeichert wurde.
- **Entwurfs-Prüfpunkt**: ein lokal gespeicherter, wiederherstellbarer und veränderlicher Zustand eines *Entwurfs*, der an eine Basis-*Version* gebunden ist. Er ist keine *Version*. Ein **aktueller Entwurf** basiert auf der aktuellen *Version* des *Artikels*; ein **veralteter Entwurf** basiert auf einer älteren *Version*.
- **Version**: der Text eines *Artikels* zum Zeitpunkt der Speicherung. Eine einmal gespeicherte *Version* bleibt unverändert.
- **Version speichern**: das ausdrückliche Speichern eines aktuellen *Entwurfs* durch den Autor als neue *Version*. Dabei wird nur der passende *Entwurfs*-Prüfpunkt gelöscht.
- **Vorschlag**: von KI generierte Inhalte oder Änderungen, die ausdrücklich vom Autor angenommen werden müssen.
- **Basisversion eines Vorschlags**: die *Version*, die bei der Erstellung eines *Vorschlags* geprüft wurde. Ein *Vorschlag* wird veraltet, wenn er nicht mehr der aktuellen *Version* entspricht.
- **Änderungsauswahl**: der Teil eines *Vorschlags*, den der Autor annehmen möchte. Die Annahme erstellt eine neue *Version*.
- **Hinweis**: beratendes Ergebnis, etwa aus einer Fakten- oder Stilprüfung, das keinen *Artikel* ändert.
- **Quellartikel** und **Übersetzungsartikel**: unabhängig wiederherstellbare, miteinander verknüpfte *Artikel*. Eine Übersetzung ist niemals eine *Version* ihrer Quelle.

## Redaktionelle Arbeit

- **Redaktionelle Funktion**: ein validierter Warplyn-Vorgang, der festlegt, welchen *Artikel*-Kontext er verwenden darf, welche Voraussetzungen gelten und welches Ergebnis er liefert. Arbeitsbereichsansichten und *Fähigkeiten* des Assistenten können dieselbe Funktion aufrufen.
- **Fähigkeit**: ein wiederverwendbares Anweisungspaket, das dem Assistenten hilft, redaktionelle Funktionen für eine Anfrage des Autors auszuwählen und zu ordnen. Eine *Fähigkeit* verleiht keine Funktion oder Berechtigung. Eine **integrierte Fähigkeit** ist Teil von Warplyn. Eine **vom Autor erstellte Fähigkeit** ist ein lokales Markdown-Paket, das im Chat mit dem Assistenten erstellt wird und einen eigenen Verlauf von *Fähigkeitsversionen* hat.
- **Redaktioneller Vorgang**: eine vom Autor angeforderte Aktivität des Assistenten, etwa Formulieren, Glätten, Faktenprüfung, Stilprüfung oder Übersetzen.
- **Redaktionelle Anfrage**: ein einzelner Aufruf eines redaktionellen Vorgangs.
- **Redaktionelle Sitzung**: die Interaktionsfolge und der Aktivitätsverlauf redaktioneller Anfragen.
- **Redaktionelle Vorgabe**: Anweisungen oder Kontext, die der Autor bei einer redaktionellen Anfrage eingibt.
- **Stil-Korpus**: lokale Schreibproben, die der Autor bereitstellt. Das **Stilprofil** fasst die Merkmale zusammen, die Warplyn aus diesen Schreibproben ableitet.
- **Workflow-Phase**: eine optionale Angabe dazu, wie weit Sie mit einem *Artikel* sind. Sie führt niemals KI aus und ändert keinen *Artikel*-Inhalt.

## Veröffentlichung und Einstellungen

- **Veröffentlichungsprofil**: konfigurierbare Vorgaben einer Plattform, einschließlich Zeichenbegrenzung. Die Voreinstellung gilt nur für neue *Artikel*.
- **Veröffentlichungstext**: Markdown- oder Klartext, der ausdrücklich über die Artikel-Statusleiste aus dem aktuellen *Artikel* kopiert wird. Warplyn bietet keine Arbeitsbereichsansicht für eine Veröffentlichungsvorschau.
- **Anwendungseinstellungen**: Einstellungen für den Arbeitsbereich, KI-Konfiguration, Veröffentlichungsprofile und lokale Datenverwaltung. Einstellungen gehören nie zum Versionsverlauf eines *Artikels*.
- **KI-Verbindung**: eine benannte serverseitige Anbieter-Konfiguration mit einer Quelle für Anmeldedaten. Die **aktive KI-Verbindung** wird für neue redaktionelle Anfragen verwendet.
- **Quelle für Anmeldedaten**: private Quelle einer KI-Verbindung. Sie ist entweder ein Verweis auf eine Umgebungsvariable oder ein verwalteter Anmeldenachweis.
- **Verwalteter Anmeldenachweis**: ein API-Schlüssel im Anmeldedatenspeicher des Betriebssystems. Warplyn speichert Verbindungsmetadaten, schreibt den Schlüssel aber niemals in SQLite oder in einen Sicherungsschnappschuss.
- **Modellvorgabe**: eine Standardmodell-ID oder eine Überschreibung für einen bestimmten redaktionellen Vorgang.
- **Sprache der Benutzeroberfläche**: Sprache der Warplyn-Oberfläche, getrennt von *Artikel*- und Übersetzungssprachen.
- **Standardsprache für Artikel**: Sprache, die einem neuen *Artikel* zugewiesen wird, wenn keine angegeben ist.
- **Standardsprachen für Übersetzungen**: geordnete Sprachen, die bei Übersetzungsanfragen zuerst angeboten werden. Sie starten niemals automatisch Übersetzungen.
- **Sicherungsziel**: lokales Verzeichnis, in das Warplyn Sicherungsschnappschüsse schreibt.
- **Sicherungsschnappschuss**: eine konsistente Kopie lokaler Daten zu einem bestimmten Zeitpunkt, getrennt von der aktiven Datenbank und ohne Anmeldedaten.
- **Datenspeicherort**: aktives lokales Verzeichnis mit den SQLite-Daten von Warplyn.
- **Datenverschiebung**: ein vom Autor bestätigter Kopier- und Neustartvorgang, der Warplyn auf einen neuen Datenspeicherort umstellt und die alte Kopie zur Wiederherstellung behält.
- **Wiederherstellungsschnappschuss**: ein Sicherungsschnappschuss, den Warplyn behält, bevor aktive Daten beim Wiederherstellen ersetzt werden.
- **Anwendungsupdate**: eine neuere Warplyn-Version, die als Paket ausgeliefert wird und die der Desktop-Client suchen, herunterladen und nur über vom Autor gesteuerte Schritte installieren kann. Ein Update ändert von sich aus keinen *Artikel*-Inhalt.
- **Sicherheitsupdate**: ein Anwendungsupdate, dessen Release-Tag die Endung `.security` trägt. Warplyn weist darauf hin, erzwingt aber weder Prüfung noch Download oder Neustart.
- **Bereitgestelltes Update**: ein heruntergeladenes Anwendungsupdate, bei dem Warplyn auf die Auswahl **Neu starten und aktualisieren** durch den Autor wartet. Normales Schließen installiert es nicht.
- **Schnappschuss vor dem Update**: Sicherungsschnappschuss lokaler Daten, der vor der Installation eines bereitgestellten Updates erstellt wurde. Zum Wiederherstellen ist die passende frühere Anwendungsversion erforderlich.
- **Diagnoseereignis**: ein bereinigter Eintrag des lokalen Dienstes in den Protokollen des Hostprozesses, der bei Startproblemen oder wiederherstellbaren Fehlern hilft. Er enthält niemals private *Artikel*-Inhalte, Modellantworten oder Werte von Umgebungsvariablen.

## Oberfläche

### Übersicht über den Arbeitsbereich

Desktopansicht mit ausgeklappten Seitenbereichen und ausgewähltem Artikel-Editor. Die Kästen zeigen Position und Zugehörigkeit, keine exakten Größen.

```text
Redaktioneller Arbeitsbereich
┌──────────────────────────┬──────────────────────────────┬──────────────────────────┐
│ Artikelbibliothek-Panel  │ Artikel-Arbeitsbereich       │ Assistentenbereich       │
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Warplyn · Neuer Artikel  │ Artikelkopf                  │ Kopfzeile des Assistenten│
│ Einklappen               │ Titel und Artikel-Metadaten │ Einklappen               │
├──────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Artikelsuche             │ Arbeitsbereich-Register      │ Unterhaltung             │
├──────────────────────────┼──────────────────────────────┤ Anfragestatus            │
│ Artikelliste             │ Arbeitsbereichsansicht       │ und Aktivität            │
│                          │                              │                          │
│                          │ Artikel-Editor               │                          │
│                          │ ┌──────────────────────────┐ │                          │
│                          │ │ Schreibfläche            │ │                          │
│                          │ └──────────────────────────┘ │                          │
├──────────────────────────┤                              ├──────────────────────────┤
│ Werkzeugbereich der      │                              │ Schnellaktionen          │
│ Artikelbibliothek        │                              │ Eingabefeld               │
│ Stilprofil · Einstellungen├──────────────────────────────┤ Redaktionelle Vorgaben   │
│ Update, falls relevant   │ Artikel-Statusleiste        │ und Senden               │
│ Sprache · Lokal          │ Speicherstatus · Metadaten · Kopieren│                    │
└──────────────────────────┴──────────────────────────────┴──────────────────────────┘
```

Unten im ausgeklappten Bibliothek-Panel finden Sie den **Werkzeugbereich der Artikelbibliothek**. In seiner untersten Zeile stehen der Sprachcode des aktuellen *Artikels* und die Kennzeichnung **Lokal**. Die **Artikel-Statusleiste** unter der mittleren Artikelansicht zeigt den Speicherstatus.

### Begriffe der Oberfläche

- **Redaktionsnotiz**: Vorgaben des Autors, die an eine Passage des *Artikels* angehängt und getrennt vom Artikeltext gespeichert werden. Relevante angehängte Notizen leiten den Assistenten an, wenn der Autor ihn mit der Bearbeitung dieser Passage beauftragt. Sie werden beim Kopieren oder Exportieren des Artikeltextes nicht übernommen. Kann die Passage nicht mehr eindeutig erkannt werden, muss die Notiz erneut zugeordnet werden.
- **Redaktioneller Arbeitsbereich**: Hauptansicht zum Schreiben mit Artikelbibliothek-Panel, Artikel-Arbeitsbereich und Assistentenbereich.
- **Artikelbibliothek-Panel**: Artikelsuche, Artikelliste und Einstiegspunkte auf Arbeitsbereichsebene. Eingeklappt heißt es **Navigationsleiste**, auf kleinen Bildschirmen vorübergehend **Navigationsschublade**.
- **Werkzeugbereich der Artikelbibliothek**: Fußzeile des ausgeklappten Artikelbibliothek-Panels mit Stilprofil, Einstellungen, gegebenenfalls Update-Steuerung sowie aktuellem Artikel-Sprachcode und Kennzeichnung **Lokal**.
- **Speicherstatusanzeige**: Status in der Artikel-Statusleiste, der anzeigt, ob der aktuelle *Entwurf* gespeichert wird, gespeichert ist oder Aufmerksamkeit benötigt.
- **Artikel-Arbeitsbereich**: Artikelkopf, Arbeitsbereich-Register, ausgewählte Arbeitsbereichsansicht und Artikel-Statusleiste.
- **Artikelkopf**: Titel- und Metadatensteuerungen oberhalb der Arbeitsbereich-Register.
- **Arbeitsbereich-Register**: Register zur Auswahl einer Arbeitsbereichsansicht.
- **Arbeitsbereichsansicht**: ausgewählter Artikel-Editor oder eine unterstützende Ansicht: Vorschlagsprüfung, Versionsverlauf, Faktenprüfung oder Übersetzungen.
- **Stilprofil**: eigene Ansicht für erkannte Merkmale, Hinweise zur Stilprüfung, Typografieregeln, manuelle Vorgaben und Schreibproben.
- **Artikel-Editor**: Schreibansicht. Der zentrale Bearbeitungsbereich ist die **Schreibfläche**.
- **Artikel-Statusleiste**: Leiste unter der ausgewählten Arbeitsbereichsansicht mit Artikelstatus und Metadaten, Sprachauswahl, Hinweisen zum Veröffentlichungsprofil und Kopiersteuerungen.
- **Assistentenbereich**: redaktionelle Vorgaben, Aktionen, Anfragestatus und Aktivität. Auf kleinen Bildschirmen erscheint er vorübergehend als **Assistentenschublade**.
- **Schnellaktionen**: Dropdown über dem Eingabefeld des Assistenten zum Einfügen einer integrierten Fähigkeit in eine Anfrage.
- **Eingabefeld des Assistenten**: Feld unten im Assistentenbereich, in dem der Autor redaktionelle Vorgaben eingibt und eine Anfrage sendet.
- **Navigation der Anwendungseinstellungen**: Navigation zwischen **Allgemein**, **Tastenkombinationen**, **Anbieter**, **KI-Assistent**, **Veröffentlichung**, **Sprachvorgaben**, **Rechtschreibung**, **Daten und Sicherungen** sowie **Über Warplyn**.
