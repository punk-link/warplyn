---
description: "Erstellen und verwalten Sie wiederverwendbare Fähigkeiten für Ihre Schreibaufgaben und prüfen Sie gespeicherte Versionen."
---

# Fähigkeiten erstellen und verwalten

*Fähigkeiten* sind lokale Markdown-Anweisungspakete. Sie helfen dem Assistenten, redaktionelle Funktionen auszuwählen und anzuordnen. Sie erweitern keine Berechtigungen und ändern keinen *Artikel*.

## Eigene Fähigkeiten erstellen und verwalten

Bitten Sie den Assistenten in einfacher Sprache, eine wiederverwendbare *Fähigkeit* zu erstellen. Beschreiben Sie die wiederkehrende Aufgabe und benötigte Regeln oder Referenzen. Wenn ein fehlendes Detail die *Fähigkeit* verändern könnte, stellt der Assistent eine kurze Rückfrage, statt zu raten.

::: tip Beispiel
Um Belletristik im Stil einer ruhigen Flussszene zu überarbeiten, fragen Sie: „Erstelle eine *Fähigkeit* namens ‚Ruhiger Belletristik-Zeilenschliff‘. Straffe Anas Sätze und bewahre dabei ihre Stimme, den Schauplatz am Fluss und die Ereignisse der Szene. Füge keine Einzelheiten hinzu, sondern markiere unklare Passagen.“ Der Assistent kann diese Anweisungen bei späteren Bitten um einen Zeilenschliff wiederverwenden.
:::

[![Der redaktionelle Assistent von Warplyn mit einer Anfrage, eine Fähigkeit für den Zeilenschliff fiktionaler Texte zu erstellen, und ausgewählter Funktion „Fähigkeiten erstellen“.](/images/skill-creator-example.png)](/images/skill-creator-example.png)

*Beispiel einer Anfrage zum Erstellen einer Fähigkeit im Nachrichtenfeld. Verbinden Sie vor dem Senden einen Anbieter.*

Nach erfolgreicher Erstellung steht die *Fähigkeit* sofort für neue Anfragen an den Assistenten zur Verfügung. Bei der Erstellungsanfrage wird der Text Ihres *Artikels* nicht an das Modell gesendet; *Artikel*, *Entwurf*, *Vorschlag* und *Version* bleiben unverändert.

Für jede erstellte *Fähigkeit* gibt es einen lokalen, unveränderlichen Verlauf von *Fähigkeitsversionen*. Dieser ist vom Versionsverlauf der *Artikel* getrennt. Sie können das lokale Markdown-Paket auch direkt bearbeiten. Warplyn aktualisiert den Katalog für die nächste Anfrage. Wenn Sie die Datei `SKILL.md` entfernen, verschwindet die *Fähigkeit* aus der Liste verfügbarer *Fähigkeiten*.

Bitten Sie den Assistenten anhand des Namens, eine *Fähigkeit* zu überarbeiten oder zu löschen. Vor einer Änderung liest er das aktuelle Paket und prüft, ob die Datei inzwischen verändert wurde. Eine Überarbeitung behält die ID der *Fähigkeit* bei und fügt eine neue *Fähigkeitsversion* hinzu. Beim Löschen wird die *Fähigkeit* aus neuen Anfragen entfernt, ihr Verlauf bleibt aber erhalten.

Um frühere Anweisungen wiederherzustellen, bitten Sie den Assistenten um die *Versionen* dieser *Fähigkeit* und nennen Sie die gewünschte Version. Durch die Wiederherstellung wird eine neue aktive Fassung geschrieben und eine weitere *Fähigkeitsversion* angefügt. Auf diese Weise können Sie auch eine gelöschte *Fähigkeit* wiederherstellen. Das Wiederherstellen eines Unterhaltung-Prüfpunkts stellt keine *Fähigkeit* wieder her und ändert sie nicht; die Wiederherstellung einer *Fähigkeit* ist eine separate Anfrage.
