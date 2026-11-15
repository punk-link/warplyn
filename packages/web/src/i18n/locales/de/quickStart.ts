import type { MessageId } from "../../messages.js";

export const quickStartMessages = {
    "quickStart.title": "Willkommen bei Warplyn",
    "quickStart.close": "Schnellstart schließen",
    "quickStart.write.title": "Schreiben Sie einen Artikel.",
    "quickStart.write.description": (
        "Erstellen oder öffnen Sie einen Artikel im linken Bereich und schreiben Sie dann im mittleren " +
        "Arbeitsbereich. Warplyn bewahrt den Wiederherstellungszustand des Entwurfs und den Fassungsverlauf " +
        "auf."
    ),
    "quickStart.assistant.title": "Fragen Sie den Assistenten.",
    "quickStart.assistant.description": (
        "Nutzen Sie den rechten Bereich für Bearbeitungen, Prüfungen, Übersetzungen und Faktenprüfungen. " +
        "KI-Änderungen bleiben Vorschläge, bis Sie sie annehmen. Hinweise bleiben unverbindlich."
    ),
    "quickStart.modelKey.title": "Fügen Sie einen Modellschlüssel hinzu.",
    "quickStart.modelKey.description": (
        "Ein Modellschlüssel ist ein API-Schlüssel eines KI-Anbieters. Wählen Sie in der Desktop-App einen " +
        "Anbieter, fügen Sie den Schlüssel ein, speichern Sie ihn im Anmeldedatenspeicher des " +
        "Betriebssystems, aktualisieren Sie die Modelle und wählen Sie ein Standardmodell. Warplyn zeigt " +
        "einen gespeicherten Schlüssel nie erneut an."
    ),
    "quickStart.skip": "Schnellstart überspringen",
    "quickStart.addModelKey": "Modellschlüssel hinzufügen",
    "quickStart.startWriting": "Mit dem Schreiben beginnen",
} satisfies Partial<Record<MessageId, string>>;
