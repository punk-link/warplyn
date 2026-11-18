---
description: "Überarbeiten Sie einen Artikel in Warplyn mit KI: Formulieren Sie eine gezielte Anfrage, vergleichen Sie Änderungsvorschläge, übernehmen Sie ausgewählte Änderungen und behalten Sie frühere Versionen."
---

# Einen Artikel mit KI überarbeiten und jede Änderung prüfen

Wenn eine Szene die richtigen Ereignisse enthält, sich das Tempo aber unausgewogen anfühlt, kann Warplyns Redaktioneller Assistent bei der Überarbeitung helfen. Bearbeiten Sie eine Passage oder einen ganzen *Artikel*, vergleichen Sie die vorgeschlagenen Formulierungen und übernehmen Sie nur die Änderungen, die Sie behalten möchten.

Warplyn ist ein quelloffener, lokal ausgerichteter Schreibarbeitsbereich für Windows und Linux. Ihre Texte bleiben auf Ihrem Computer. KI-Unterstützung erfordert eine Internetverbindung und eine unterstützte Anbieter-Verbindung mit Ihrem API-Schlüssel. Der relevante Text und Kontext werden an diesen Anbieter übermittelt; dessen Preise und Datenschutzrichtlinien gelten.

## Mit einer gezielten Anfrage beginnen

Öffnen Sie Ihren *Artikel* und wählen Sie die zu überarbeitende Passage aus. Beschreiben Sie im Composer, was verbessert werden und was erhalten bleiben soll. Zum Beispiel bei der Arbeit an „Der Fluss in der Abenddämmerung“:

> Verbessere den Lesefluss, aber behalte Anas Perspektive und die ruhige Stimmung bei. Füge keine neuen Ereignisse hinzu.

Wählen Sie **Editorial-Anfrage senden**. Warplyn übermittelt die Auswahl zusammen mit bis zu 500 Zeichen davor und danach als schreibgeschützten Kontext. Ersetzt werden kann nur die ausgewählte Passage. Prüfen Sie vor dem Senden vertraulicher Texte die Kontexterklärung im Composer. Weitere Informationen finden Sie unter [Redaktioneller Assistent](editorial-assistant.md).

[![Warplyns Composer mit einer Überarbeitungsanfrage für einen fiktionalen Text.](/images/editorial-assistant-example.png)](/images/editorial-assistant-example.png)

*Beispiel einer Anfrage im Composer. Der Screenshot zeigt einen früheren Skill-Namen.*

## Ursprüngliche und vorgeschlagene Formulierungen vergleichen

Wenn die Anfrage abgeschlossen ist, öffnen Sie über die Ergebniskarte die **Vorschlagsprüfung**. Vergleichen Sie **Original** und **Vorschlag** und prüfen Sie, ob Ereignisse, Perspektive und Stimme der Szene erhalten bleiben.

[![Vorschlagsprüfung mit Original- und Vorschlagstext, einzelnen Entscheidungen und Anwenden.](/images/proposal-review.png)](/images/proposal-review.png)

*Beispielprüfung für „Der Fluss in der Abenddämmerung“. Die generierte Formulierung hängt von Ihrer Anfrage und dem Modell ab.*

Wählen Sie für einzelne Änderungen **Annehmen** oder **Ablehnen**. Sie können den Text im Feld **Vorschlag** vor dem Anwenden bearbeiten. Kann Warplyn einen *Vorschlag* nicht sicher aufteilen, erklärt die App, dass Sie ihn als Ganzes prüfen müssen.

## Änderungen anwenden und Verlauf behalten

Wählen Sie **Anwenden**, nachdem Sie über jede Änderung entschieden haben. Angenommener Text erstellt eine neue *Version*. Wenn Sie alle Änderungen ablehnen, bleibt der *Artikel* unverändert und es wird keine *Version* erstellt. Die Entscheidungen allein ändern Ihren Text nicht.

Öffnen Sie den **Versionsverlauf**, um frühere gespeicherte Fassungen anzusehen. Beim Wiederherstellen wird eine weitere *Version* hinzugefügt; der Verlauf dazwischen bleibt erhalten. Unter [Artikel prüfen](reviewing-articles.md) finden Sie Wiederherstellungsoptionen und Informationen zu veralteten *Vorschlägen*.

KI-Überarbeitungen können Ihre Absicht verfehlen oder Details ändern, die Sie erhalten wollten. Prüfen Sie das Ergebnis vor dem Anwenden. Formulieren Sie bei Bedarf eine engere Anfrage. Eine abgebrochene oder fehlgeschlagene Anfrage lässt den *Artikel* unverändert.

## Mit eigenen Texten ausprobieren

[Warplyn herunterladen](https://github.com/punk-link/warplyn/releases/latest), der [Installationsanleitung](installation.md) folgen und einen unterstützten [KI-Anbieter](providers.md) verbinden. Windows-Installationsprogramme sind nicht signiert; die Installationsanleitung erklärt die mögliche Warnung.
