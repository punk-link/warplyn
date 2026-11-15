import type { MessageId } from "../../messages.js";

export const typographyMessages = {
    "typography.customPair": "Eigenes Paar",
    "typography.articleSaved": "Typografieeinstellungen des Artikels gespeichert.",
    "typography.articleSaveHint": (
        "Artikelregeln überschreiben oder deaktivieren geerbte Sprachregeln. Speichern Sie sie, um sie bei " +
        "der nächsten Prüfung zu verwenden."
    ),
    "typography.reviewLanguage": "Geprüfte Konventionen: {language}",
    "typography.unknownLanguage": "Sprache nicht angegeben",
    "typography.otherLanguage": "Andere Sprache…",
    "typography.otherLanguageTitle": "Andere Schreibsprache wählen",
    "typography.languageCode": "Sprache oder regionale Variante",
    "typography.languageCodeHint": (
        "Geben Sie einen Namen oder eine regionale Variante ein, etwa Polnisch oder Spanisch, Argentinien. " +
        "Codes wie ja oder es-AR funktionieren ebenfalls."
    ),
    "typography.languageSaveFailed": "Die Artikelsprache konnte nicht gespeichert werden. Versuchen Sie es erneut; Ihr Text wurde nicht geändert.",
    "typography.useLanguage": "Sprache verwenden",
    "typography.loadFailed": "Typografieeinstellungen konnten nicht geladen werden. Versuchen Sie es vor dem Bearbeiten oder Prüfen erneut.",
    "typography.retryLoad": "Einstellungen erneut laden",
    "typography.openingMark": "Öffnendes Zeichen",
    "typography.closingMark": "Schließendes Zeichen",
    "typography.innerSpace": "Abstand innerhalb von Anführungszeichen",
    "typography.punctuationMarks": "Satzzeichen",
    "typography.spaceBefore": "Abstand vor Satzzeichen",
    "typography.punctuationSpacing": "Satzzeichenabstände",
    "typography.languageScope": "Typografiesprache",
    "typography.chooseLanguage": "Sprache auswählen",
    "typography.languageHint": "Speichern Sie eigene Konventionen für jede Schreibsprache. Dies ändert weder die Artikel- noch die Oberflächensprache.",
    "typography.missingLanguage": "Wählen Sie vor der Typografieprüfung die Artikelsprache in der Statusleiste.",
    "typography.scope": "Regeln anwenden auf",
    "typography.languagePreferences": "Alle Artikel in dieser Sprache",
    "typography.articlePreferences": "Nur diesen Artikel",
    "typography.preset": "Konventionsvorgabe",
    "typography.noPreset": "Eigene Konventionen",
    "typography.presetPending": "{language}{separator}muttersprachliche Prüfung ausstehend",
    "typography.presetReviewHint": "Die Vorschauen der Vorgaben warten auf muttersprachliche Prüfung. Sie können unten eigene Regeln hinzufügen.",
    "typography.applyPreset": "Vorgabe anwenden",
    "typography.legacyHint": "Ihre früheren globalen Regeln bleiben erhalten. Kopieren Sie sie zu einer Sprache, um sie in neuen Prüfungen zu verwenden.",
    "typography.copyLegacy": "Frühere Regeln zu dieser Sprache kopieren",
    "typography.resetInheritance": "Geerbte Regeln wiederherstellen",
    "typography.inheritanceHint": (
        "Bearbeiten überschreibt eine geerbte Regel; Entfernen deaktiviert sie. Stellen Sie geerbte Regeln " +
        "wieder her, um Überschreibungen zu löschen."
    ),
    "typography.noConvention": (
        "Keine anwendbaren mechanischen Regeln. Wählen Sie eine Konvention oder fügen Sie Regeln für diese " +
        "Sprache hinzu und speichern Sie sie."
    ),
    "typography.effectiveLanguage": "Konventionen für {language} werden geprüft",
    "typography.earlierConvention": (
        "Diese Prüfung verwendete frühere Sprach- oder Typografieeinstellungen. Führen Sie die Prüfung erneut " +
        "aus, um die aktuellen Konventionen zu verwenden."
    ),
    "typography.legacyReview": "Diese frühere Prüfung hat keine aufgezeichnete Sprachkonvention.",
    "typography.source.preset": "Vorgabe",
    "typography.source.language": "Spracheinstellung",
    "typography.source.article": "Artikelüberschreibung",
    "typography.invalid": (
        "Typografieregeln konnten nicht gespeichert oder geladen werden. Prüfen Sie unvollständige, doppelte " +
        "oder widersprüchliche Regeln und versuchen Sie es erneut. Wenn gespeicherte Regeln nicht laden, " +
        "stellen Sie in den Einstellungen eine Sicherung wieder her."
    ),
    "typography.correctionsConflict": (
        "Typografiekorrekturen konnten nicht konsistent vorgenommen werden. Passen Sie überlappende oder " +
        "wiederholte Regeln an und prüfen Sie erneut. Ihr Artikel wurde nicht geändert."
    ),
    "typography.required": (
        "Die Typografie konnte nicht geprüft werden. Wählen Sie die Artikelsprache und speichern Sie dann " +
        "Regeln für diese Sprache im Stilprofil."
    ),
    "typography.title": "Typografieregeln",
    "typography.saveHint": (
        "Speichern erstellt das Profil lokal aus den aktuell einbezogenen Proben und gespeicherten Regeln " +
        "neu, einschließlich ausstehender Probenänderungen. Ungespeicherte Änderungen in anderen Formularen " +
        "bleiben ausgeschlossen."
    ),
    "typography.empty": "Keine Typografieregeln. Fügen Sie eine Konvention hinzu, um Satzzeichen oder Abstände zu prüfen.",
    "typography.add": "Regel hinzufügen",
    "typography.remove": "Entfernen",
    "typography.save": "Speichern",
    "typography.edit": "Bearbeiten",
    "typography.closeEditor": "Schließen",
    "typography.savedRule": "Gespeichert",
    "typography.unsavedRule": "Ungespeichert",
    "typography.validation.invalid": "Vervollständigen Sie die Felder dieser Regel vor dem Speichern.",
    "typography.validation.duplicate": (
        "Diese Konvention steht bereits in der Liste. Bearbeiten oder entfernen Sie den doppelten Eintrag vor " +
        "dem Speichern."
    ),
    "typography.validation.conflict": "Diese Konventionen widersprechen sich. Passen Sie eine an oder entfernen Sie sie vor dem Speichern.",
    "typography.validation.limit": "Behalten Sie vor dem Speichern höchstens 30 Regeln.",
    "typography.saveFailed": "Typografieregeln konnten nicht gespeichert werden. Ihre Änderungen sind noch vorhanden. Versuchen Sie erneut zu speichern.",
    "typography.check": "Typografie prüfen",
    "typography.saved": "Typografieregeln gespeichert und Stilprofil neu erstellt.",
    "typography.localHint": (
        "Mechanische Prüfungen laufen lokal. Kontextuelle Regeln erfordern eine vollständige Stilprüfung. Der " +
        "Artikeltext ändert sich erst, wenn Sie einen Vorschlag annehmen."
    ),
    "typography.kind": "Konvention der Regel {number}",
    "typography.ruleNumber": "Regel {number}",
    "typography.quotes": "Anführungszeichen",
    "typography.dash": "Gedankenstriche",
    "typography.ellipsis": "Auslassungspunkte",
    "typography.ellipsisSingle": "Einzelnes Auslassungszeichen, …",
    "typography.ellipsisThree": "Drei Punkte, ...",
    "typography.nonbreaking": "Untrennbares Zeichenpaar",
    "typography.horizontal": "Wiederholte Leerzeichen",
    "typography.literal": "Wörtliche Satzzeichenersetzung",
    "typography.contextual": "Kontextuelle Typografieanweisung",
    "typography.outer": "Äußere Anführungszeichen",
    "typography.nested": "Verschachtelte Anführungszeichen",
    "typography.mark": "Bevorzugtes Zeichen",
    "typography.spacing": "Abstände",
    "typography.withSpaces": "Mit Leerzeichen",
    "typography.withoutSpaces": "Ohne Leerzeichen",
    "typography.left": "Linkes Element",
    "typography.right": "Rechtes Element",
    "typography.nbsp": "Geschütztes Leerzeichen, U+00A0",
    "typography.narrowNbsp": "Schmales geschütztes Leerzeichen, U+202F",
    "typography.source": "Zu ersetzende Satzzeichen",
    "typography.replacement": "Ersatzsatzzeichen",
    "typography.instruction": "Anweisung für vollständige Stilprüfung",
    "typography.horizontalHint": "Verwendet ein normales Leerzeichen zwischen Textelementen. Einrückung, Zeilenumbrüche und Code bleiben unverändert.",
    "typography.ruleDescription": "{kind}: {value}",
    "typography.support": "Typografieregeln: {rules}",
    "typography.noViolations": "Keine mechanischen Typografieverstöße gefunden.",
    "typography.skipped": (
        "{count, plural, one {# uneindeutiger Anführungszeichenfall blieb unverändert.} other {# uneindeutige " +
        "Anführungszeichenfälle blieben unverändert.}} Prüfen Sie diese im Kontext."
    ),
    "typography.contextualSkipped": (
        "{count, plural, one {# kontextuelle Regel erfordert eine vollständige Stilprüfung.} other {# " +
        "kontextuelle Regeln erfordern eine vollständige Stilprüfung.}}"
    ),
    "typography.olderProfile": (
        "Diese Prüfung verwendete Stilprofilversion {version}. Die Regeln haben sich geändert. Führen Sie die " +
        "Prüfung erneut aus, um das aktuelle Profil zu verwenden."
    ),
    "typography.rulesOnly": (
        "Keine Schreibproben einbezogen. Fügen Sie Proben hinzu, um Merkmale Ihrer Stimme abzuleiten, oder " +
        "verwenden Sie explizite Typografieregeln für lokale Prüfungen."
    ),
    "typography.checkFailed": "Die Typografie konnte nicht geprüft werden. Speichern Sie gültige Regeln und versuchen Sie es erneut.",
    "typography.saveDraftFirst": "Speichern Sie den aktuellen Entwurf vor der Typografieprüfung. Die lokale Prüfung verwendet die gespeicherte Fassung.",
    "typography.reviewProposal": "Vorschlag prüfen",
    "typography.correction": "{source} → {replacement}",
    "typography.ordinarySpace": "Leerzeichen",
    "typography.deleted": "entfernt",
} satisfies Partial<Record<MessageId, string>>;
