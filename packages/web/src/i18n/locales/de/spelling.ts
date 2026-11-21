import type { MessageId } from "../../messages.js";


export const spellingMessages = {
    "spelling.add": "Wörter hinzufügen",
    "spelling.addWords": "Hinzuzufügende Wörter",
    "spelling.correctionFailed": (
        "Diese Rechtschreibkorrektur konnte nicht angewendet werden. Öffnen Sie das Vorschlagsmenü erneut oder geben Si" +
        "e die Korrektur im Artikel ein."
    ),
    "spelling.desktopOnly": (
        "Verwenden Sie die Desktop-App, um Sprachwörterbücher herunterzuladen und Ihr persönliches Wörterbuch" +
        " zu verwalten. Im Browser folgt die Rechtschreibprüfung den Browsereinstellungen."
    ),
    "spelling.dictionaries": "Sprachwörterbücher",
    "spelling.download": "Wörterbücher herunterladen",
    "spelling.failed": "Nicht verfügbar. Download erneut versuchen.",
    "spelling.filterLanguages": "Sprachen filtern",
    "spelling.invalidWords": "Geben Sie bis zu 500 Wörter ein, eines pro Zeile, mit höchstens 128 Zeichen pro Wort und insgesamt 64 KiB.",
    "spelling.languageFailed": (
        "Die Rechtschreibprüfung konnte für diese Artikelsprache nicht aktiviert werden. Wählen Sie die Sprac" +
        "he erneut oder bereiten Sie ihr Wörterbuch in den Rechtschreibeinstellungen vor."
    ),
    "spelling.languageVariant": "{language} ({code})",
    "spelling.loadFailed": "Rechtschreibeinstellungen konnten nicht geladen werden. Versuchen Sie es erneut.",
    "spelling.loaded": "Rechtschreibeinstellungen geladen.",
    "spelling.loading": "Rechtschreibeinstellungen werden geladen…",
    "spelling.localHint": (
        "Rechtschreibprüfungen und persönliche Wörter bleiben auf diesem Gerät. Das Herunterladen von Sprachw" +
        "örterbüchern benötigt Internetzugriff und kontaktiert Googles Wörterbuch-CDN."
    ),
    "spelling.noLanguages": "Keine passenden Sprachen.",
    "spelling.noWords": "Keine passenden persönlichen Wörter.",
    "spelling.operationFailed": (
        "Rechtschreibeinstellungen konnten nicht aktualisiert werden. Versuchen Sie die Änderung erneut. Prüfen Sie bei" +
        " Downloads Ihre Internetverbindung."
    ),
    "spelling.partial": (
        "Einige Wörter konnten nicht hinzugefügt werden. Korrigieren Sie die Einträge unter Hinzuzufügende Wörter oder " +
        "versuchen Sie es erneut."
    ),
    "spelling.persistenceHint": (
        "Wörterbücher und persönliche Wörter gehören zu dieser Installation. Artikelsicherungen und Wiederher" +
        "stellungen enthalten sie nicht. Das Löschen von Artikeldaten entfernt keine Wörter aus dem Betriebss" +
        "ystemwörterbuch; entfernen Sie diese Wörter hier."
    ),
    "spelling.personal": "Persönliches Wörterbuch",
    "spelling.personalHint": (
        "Bewahren Sie Fachbegriffe wie PostgreSQL und gRPC in einem persönlichen Wörterbuch auf, das für alle Artikel u" +
        "nd Prüfsprachen gilt."
    ),
    "spelling.preload": "Offline-Schreiben vorbereiten",
    "spelling.preloadHint": "Wählen Sie Sprachen für das Offline-Schreiben. Ihre Artikelsprache bleibt gleich.",
    "spelling.preparing": "Wird vorbereitet",
    "spelling.ready": "Heruntergeladen",
    "spelling.remove": "Entfernen",
    "spelling.removeWord": "{word} aus dem persönlichen Wörterbuch entfernen",
    "spelling.retry": "Erneut versuchen",
    "spelling.savedWords": "Gespeicherte Wörter",
    "spelling.search": "Persönliches Wörterbuch durchsuchen",
    "spelling.searchHint": "Durchsuchen Sie Ihre gespeicherten Begriffe und entfernen Sie Wörter, die die Rechtschreibprüfung wieder prüfen soll.",
    "spelling.systemHint": (
        "Das Hinzufügen oder Entfernen eines Wortes ändert auch das benutzerdefinierte Wörterbuch Ihres Betriebssystems" +
        " und kann andere Apps beeinflussen."
    ),
    "spelling.unload": "Entladen",
    "spelling.unloadLanguage": "Wörterbuch für {language} entladen",
    "spelling.unloaded": "Entladen",
    "spelling.unverified": "Verfügbar",
    "spelling.updated": "Rechtschreibeinstellungen aktualisiert.",
    "spelling.wordFailed": (
        "Dieses Wort konnte nicht zum persönlichen Wörterbuch hinzugefügt werden. Öffnen Sie die Rechtschreibeinstellun" +
        "gen und versuchen Sie es erneut."
    ),
    "spelling.wordsHint": (
        "Geben Sie pro Zeile ein Wort oder einen Fachbegriff mit höchstens 128 Zeichen ein. Fügen Sie bis zu " +
        "500 Wörter auf einmal hinzu. Fehlgeschlagene Einträge bleiben zur Korrektur oder für einen erneuten " +
        "Versuch hier."
    ),
    "spelling.working": "Rechtschreibeinstellungen werden aktualisiert…",
} satisfies Partial<Record<MessageId, string>>;
