---
description: "Erstellen und verwalten Sie wiederverwendbare Skills für Ihre Schreibaufgaben und prüfen Sie gespeicherte Versionen."
---

# Skills erstellen und verwalten

*Skills* sind lokale Markdown-Anweisungspakete. Sie helfen dem Assistant, redaktionelle Funktionen auszuwählen und anzuordnen. Sie erweitern keine Berechtigungen und ändern keinen *Artikel*.

## Eigene Skills erstellen und verwalten

Bitten Sie den Assistant in einfacher Sprache, einen wiederverwendbaren *Skill* zu erstellen. Beschreiben Sie die wiederkehrende Aufgabe und benötigte Regeln oder Referenzen. Wenn ein fehlendes Detail den *Skill* verändern könnte, stellt der Assistant eine kurze Rückfrage, statt zu raten.

::: tip Beispiel
Um Belletristik im Stil einer ruhigen Flussszene zu überarbeiten, fragen Sie: „Erstelle einen *Skill* namens ‚Ruhiger Belletristik-Zeilenschliff‘. Straffe Anas Sätze und bewahre dabei ihre Stimme, den Schauplatz am Fluss und die Ereignisse der Szene. Füge keine Einzelheiten hinzu, sondern markiere unklare Passagen.“ Der Assistant kann diese Anweisungen bei späteren Bitten um einen Zeilenschliff wiederverwenden.
:::

[![Warplyns Redaktioneller Assistent mit einer Anfrage, einen Skill für den Zeilenschliff fiktionaler Texte zu erstellen, und ausgewähltem Fähigkeiten erstellen.](/images/skill-creator-example.png)](/images/skill-creator-example.png)

*Beispiel einer Anfrage zum Erstellen eines Skills im Composer. Verbinden Sie vor dem Senden einen Anbieter.*

Nach erfolgreicher Erstellung steht der *Skill* sofort für neue Assistant-Anfragen zur Verfügung. Bei der Erstellungsanfrage wird der Text Ihres *Artikels* nicht an das Modell gesendet; *Artikel*, *Entwurf*, *Vorschlag* und *Version* bleiben unverändert.

Für jeden erstellten *Skill* gibt es einen lokalen, unveränderlichen Verlauf von *Skill-Versionen*. Dieser ist vom Versionsverlauf der *Artikel* getrennt. Sie können das lokale Markdown-Paket auch direkt bearbeiten. Warplyn aktualisiert den Katalog für die nächste Anfrage. Wenn Sie die Datei `SKILL.md` entfernen, verschwindet der *Skill* aus der Liste verfügbarer *Skills*.

Bitten Sie den Assistant anhand des Namens, einen *Skill* zu überarbeiten oder zu löschen. Vor einer Änderung liest er das aktuelle Paket und prüft, ob die Datei inzwischen verändert wurde. Eine Überarbeitung behält die *Skill*-ID bei und fügt eine neue *Skill-Version* hinzu. Beim Löschen wird der *Skill* aus neuen Anfragen entfernt, sein Verlauf bleibt aber erhalten.

Um frühere Anweisungen wiederherzustellen, bitten Sie den Assistant um die *Versionen* dieses *Skills* und nennen Sie die gewünschte Version. Durch die Wiederherstellung wird eine neue aktive Fassung geschrieben und eine weitere *Skill-Version* angefügt. Auf diese Weise können Sie auch einen gelöschten *Skill* wiederherstellen. Das Wiederherstellen eines Unterhaltung-Prüfpunkts stellt keinen *Skill* wieder her und ändert ihn nicht; die Wiederherstellung eines *Skills* ist eine separate Anfrage.
