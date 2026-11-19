---
description: "Erfahren Sie, wodurch Kosten für KI-Anfragen in Warplyn entstehen, wie die API-Abrechnung funktioniert und wo Sie die Nutzungsgebühren Ihres Anbieters einsehen."
---

# Kosten von KI-Anbietern

KI-Unterstützung ist optional. Warplyn stellt Ihnen Anfragen nicht in Rechnung. Wenn Warplyn eine Anfrage an Ihren KI-Anbieter sendet, kann der Anbieter dafür Gebühren berechnen.

## Was die Kosten beeinflusst

Ihr Anbieter legt seine Preise selbst fest. Die Kosten einer Anfrage können abhängen von:

- dem gewählten Anbieter und Modell
- dem Umfang des *Artikel*-Texts und der zusätzlichen Anweisungen in der Anfrage
- der Menge an Text, die das Modell zurückgibt

Text aus der Umgebung kann helfen, eine kurze Auswahl besser zu verstehen, führt aber dazu, dass auch nicht ausgewählte Texte übermittelt werden. Wenn die Anfrage Text aus dem *Artikel* benötigt und Sie eine Passage markiert haben, sendet Warplyn die Passage und bis zu 500 Zeichen auf jeder Seite. Die höchstens 1.000 zusätzlichen Zeichen dienen nur als Kontext. Bearbeitet werden kann nur die markierte Passage. Ohne Auswahl kann die Anfrage den gesamten *Artikel* und relevanten Kontext umfassen. Je nach Tarif kann eine kürzere Anfrage weniger kosten.

::: tip API-Abrechnung
Ein Abonnement für den Chatdienst eines Anbieters umfasst möglicherweise keine API-Nutzung. Prüfen Sie vor dem Verbinden eines Schlüssels die aktuellen API-Preise und Abrechnungsbedingungen des Anbieters.
:::

Probieren Sie für Routinearbeiten, etwa eine Passage zu glätten oder eine gezielte Überarbeitung vorzunehmen, zuerst ein kostengünstigeres Modell aus. Verwenden Sie ein teureres Modell, wenn die Ergebnisse zeigen, dass die Aufgabe ein leistungsfähigeres Modell benötigt.

## Nutzung prüfen

Prüfen Sie Nutzung, Gebühren, Warnungen und Ausgabenlimits im Konto Ihres Anbieters. Warplyn zeigt weder die Anbieterabrechnung an noch setzt es Ausgabenlimits durch. Wenden Sie sich bei Fragen zu Abrechnung, Rückerstattungen oder Kontogebühren an den Anbieter.

Das für eine Anfrage verwendete Modell beeinflusst die Kosten. Wählen Sie unter **Einstellungen** → **KI-Assistent** ein **Standardmodell**, ein **App-Modell** und Modelle für bestimmte Aufgaben. Unter [KI-Anbieter und Modelle](providers.md) erfahren Sie, wie Sie diese einrichten.

::: tip Sie können ohne KI arbeiten
Sie können *Artikel* auch ohne KI-Verbindung schreiben und verwalten. Zum Bearbeiten, Speichern von *Versionen* und Verwenden lokaler Sicherungen sind keine KI-Anfragen nötig.
:::
