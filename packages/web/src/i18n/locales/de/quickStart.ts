import type { MessageId } from "../../messages.js";


export const quickStartMessages = {
    "quickStart.addModelKey": "Modellschlüssel hinzufügen",
    "quickStart.assistant.description": (
        "Nutzen Sie den rechten Bereich für Bearbeitungen, Prüfungen, Übersetzungen und Faktenprüfungen. KI-Ä" +
        "nderungen bleiben Vorschläge, bis Sie sie annehmen. Hinweise bleiben unverbindlich."
    ),
    "quickStart.assistant.title": "Fragen Sie den Assistenten.",
    "quickStart.close": "Schnellstart schließen",
    "quickStart.modelKey.description": (
        "Ein Modellschlüssel ist ein API-Schlüssel eines KI-Anbieters. Wählen Sie in der Desktop-App einen An" +
        "bieter, fügen Sie den Schlüssel ein, speichern Sie ihn im Anmeldedatenspeicher des Betriebssystems, " +
        "aktualisieren Sie die Modelle und wählen Sie ein Standardmodell. Warplyn zeigt einen gespeicherten S" +
        "chlüssel nie erneut an."
    ),
    "quickStart.modelKey.title": "Fügen Sie einen Modellschlüssel hinzu.",
    "quickStart.skip": "Schnellstart überspringen",
    "quickStart.startWriting": "Mit dem Schreiben beginnen",
    "quickStart.title": "Willkommen bei Warplyn",
    "quickStart.write.description": (
        "Erstellen oder öffnen Sie einen Artikel im linken Bereich und schreiben Sie dann im mittleren Arbeit" +
        "sbereich. Warplyn bewahrt den Wiederherstellungszustand des Entwurfs und den Fassungsverlauf auf."
    ),
    "quickStart.write.title": "Schreiben Sie einen Artikel.",
} satisfies Partial<Record<MessageId, string>>;
