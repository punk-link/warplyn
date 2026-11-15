import type { MessageId } from "../../messages.js";

export const spellingMessages = {
    "spelling.desktopOnly": (
        "Verwenden Sie die Desktop-App, um Sprachwörterbücher herunterzuladen und Ihr persönliches Wörterbuch " +
        "zu verwalten. Im Browser folgt die Rechtschreibprüfung den Browsereinstellungen."
    ),
    "spelling.localHint": (
        "Rechtschreibprüfungen und persönliche Wörter bleiben auf diesem Gerät. Das Herunterladen von " +
        "Sprachwörterbüchern benötigt Internetzugriff und kontaktiert Googles Wörterbuch-CDN."
    ),
    "spelling.dictionaries": "Sprachwörterbücher",
    "spelling.preload": "Offline-Schreiben vorbereiten",
    "spelling.preloadHint": "Wählen Sie Sprachen für das Offline-Schreiben. Ihre Artikelsprache bleibt gleich.",
    "spelling.download": "Wörterbücher herunterladen",
    "spelling.languageVariant": "{language} ({code})",
    "spelling.filterLanguages": "Sprachen filtern",
    "spelling.noLanguages": "Keine passenden Sprachen.",
    "spelling.unverified": "Verfügbar",
    "spelling.unloaded": "Entladen",
    "spelling.unload": "Entladen",
    "spelling.unloadLanguage": "Wörterbuch für {language} entladen",
    "spelling.preparing": "Wird vorbereitet",
    "spelling.ready": "Heruntergeladen",
    "spelling.failed": "Nicht verfügbar. Download erneut versuchen.",
    "spelling.personal": "Persönliches Wörterbuch",
    "spelling.personalHint": (
        "Bewahren Sie Fachbegriffe wie PostgreSQL und gRPC in einem persönlichen Wörterbuch auf, das für alle " +
        "Artikel und Prüfsprachen gilt."
    ),
    "spelling.systemHint": (
        "Das Hinzufügen oder Entfernen eines Wortes ändert auch das benutzerdefinierte Wörterbuch Ihres " +
        "Betriebssystems und kann andere Apps beeinflussen."
    ),
    "spelling.addWords": "Hinzuzufügende Wörter",
    "spelling.wordsHint": (
        "Geben Sie pro Zeile ein Wort oder einen Fachbegriff mit höchstens 128 Zeichen ein. Fügen Sie bis zu " +
        "500 Wörter auf einmal hinzu. Fehlgeschlagene Einträge bleiben zur Korrektur oder für einen erneuten " +
        "Versuch hier."
    ),
    "spelling.add": "Wörter hinzufügen",
    "spelling.remove": "Entfernen",
    "spelling.removeWord": "{word} aus dem persönlichen Wörterbuch entfernen",
    "spelling.savedWords": "Gespeicherte Wörter",
    "spelling.search": "Persönliches Wörterbuch durchsuchen",
    "spelling.searchHint": "Durchsuchen Sie Ihre gespeicherten Begriffe und entfernen Sie Wörter, die die Rechtschreibprüfung wieder prüfen soll.",
    "spelling.noWords": "Keine passenden persönlichen Wörter.",
    "spelling.persistenceHint": (
        "Wörterbücher und persönliche Wörter gehören zu dieser Installation. Artikelsicherungen und " +
        "Wiederherstellungen enthalten sie nicht. Das Löschen von Artikeldaten entfernt keine Wörter aus dem " +
        "Betriebssystemwörterbuch; entfernen Sie diese Wörter hier."
    ),
    "spelling.loading": "Rechtschreibeinstellungen werden geladen…",
    "spelling.loaded": "Rechtschreibeinstellungen geladen.",
    "spelling.loadFailed": "Rechtschreibeinstellungen konnten nicht geladen werden. Versuchen Sie es erneut.",
    "spelling.retry": "Erneut versuchen",
    "spelling.working": "Rechtschreibeinstellungen werden aktualisiert…",
    "spelling.updated": "Rechtschreibeinstellungen aktualisiert.",
    "spelling.partial": (
        "Einige Wörter konnten nicht hinzugefügt werden. Korrigieren Sie die Einträge unter Hinzuzufügende " +
        "Wörter oder versuchen Sie es erneut."
    ),
    "spelling.operationFailed": (
        "Rechtschreibeinstellungen konnten nicht aktualisiert werden. Versuchen Sie die Änderung erneut. " +
        "Prüfen Sie bei Downloads Ihre Internetverbindung."
    ),
    "spelling.invalidWords": "Geben Sie bis zu 500 Wörter ein, eines pro Zeile, mit höchstens 128 Zeichen pro Wort und insgesamt 64 KiB.",
    "spelling.wordFailed": (
        "Dieses Wort konnte nicht zum persönlichen Wörterbuch hinzugefügt werden. Öffnen Sie die " +
        "Rechtschreibeinstellungen und versuchen Sie es erneut."
    ),
    "spelling.correctionFailed": (
        "Diese Rechtschreibkorrektur konnte nicht angewendet werden. Öffnen Sie das Vorschlagsmenü erneut " +
        "oder geben Sie die Korrektur im Artikel ein."
    ),
    "spelling.languageFailed": (
        "Die Rechtschreibprüfung konnte für diese Artikelsprache nicht aktiviert werden. Wählen Sie die " +
        "Sprache erneut oder bereiten Sie ihr Wörterbuch in den Rechtschreibeinstellungen vor."
    ),
} satisfies Partial<Record<MessageId, string>>;
