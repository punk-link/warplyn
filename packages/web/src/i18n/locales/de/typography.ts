import type { MessageId } from "../../messages.js";


export const typographyMessages = {
    "typography.add": "Regel hinzufügen",
    "typography.applyPreset": "Vorgabe anwenden",
    "typography.articlePreferences": "Nur diesen Artikel",
    "typography.articleSaveHint": (
        "Artikelregeln überschreiben oder deaktivieren geerbte Sprachregeln. Speichern Sie sie, um sie bei der nächsten" +
        " Prüfung zu verwenden."
    ),
    "typography.articleSaved": "Typografieeinstellungen des Artikels gespeichert.",
    "typography.check": "Typografie prüfen",
    "typography.checkFailed": "Die Typografie konnte nicht geprüft werden. Speichern Sie gültige Regeln und versuchen Sie es erneut.",
    "typography.chooseLanguage": "Sprache auswählen",
    "typography.closeEditor": "Schließen",
    "typography.closingMark": "Schließendes Zeichen",
    "typography.contextual": "Kontextuelle Typografieanweisung",
    "typography.contextualSkipped": (
        "{count, plural, one {# kontextuelle Regel erfordert eine vollständige Stilprüfung.} other {# kontextuelle Rege" +
        "ln erfordern eine vollständige Stilprüfung.}}"
    ),
    "typography.copyLegacy": "Frühere Regeln zu dieser Sprache kopieren",
    "typography.correction": "{source} → {replacement}",
    "typography.correctionsConflict": (
        "Typografiekorrekturen konnten nicht konsistent vorgenommen werden. Passen Sie überlappende oder wied" +
        "erholte Regeln an und prüfen Sie erneut. Ihr Artikel wurde nicht geändert."
    ),
    "typography.customPair": "Eigenes Paar",
    "typography.dash": "Gedankenstriche",
    "typography.deleted": "entfernt",
    "typography.earlierConvention": (
        "Diese Prüfung verwendete frühere Sprach- oder Typografieeinstellungen. Führen Sie die Prüfung erneut aus, um d" +
        "ie aktuellen Konventionen zu verwenden."
    ),
    "typography.edit": "Bearbeiten",
    "typography.effectiveLanguage": "Konventionen für {language} werden geprüft",
    "typography.ellipsis": "Auslassungspunkte",
    "typography.ellipsisSingle": "Einzelnes Auslassungszeichen, …",
    "typography.ellipsisThree": "Drei Punkte, ...",
    "typography.empty": "Keine Typografieregeln. Fügen Sie eine Konvention hinzu, um Satzzeichen oder Abstände zu prüfen.",
    "typography.horizontal": "Wiederholte Leerzeichen",
    "typography.horizontalHint": "Verwendet ein normales Leerzeichen zwischen Textelementen. Einrückung, Zeilenumbrüche und Code bleiben unverändert.",
    "typography.inheritanceHint": (
        "Bearbeiten überschreibt eine geerbte Regel; Entfernen deaktiviert sie. Stellen Sie geerbte Regeln wieder her, " +
        "um Überschreibungen zu löschen."
    ),
    "typography.innerSpace": "Abstand innerhalb von Anführungszeichen",
    "typography.instruction": "Anweisung für vollständige Stilprüfung",
    "typography.invalid": (
        "Typografieregeln konnten nicht gespeichert oder geladen werden. Prüfen Sie unvollständige, doppelte " +
        "oder widersprüchliche Regeln und versuchen Sie es erneut. Wenn gespeicherte Regeln nicht laden, stel" +
        "len Sie in den Einstellungen eine Sicherung wieder her."
    ),
    "typography.kind": "Konvention der Regel {number}",
    "typography.languageCode": "Sprache oder regionale Variante",
    "typography.languageCodeHint": (
        "Geben Sie einen Namen oder eine regionale Variante ein, etwa Polnisch oder Spanisch, Argentinien. Codes wie ja" +
        " oder es-AR funktionieren ebenfalls."
    ),
    "typography.languageHint": "Speichern Sie eigene Konventionen für jede Schreibsprache. Dies ändert weder die Artikel- noch die Oberflächensprache.",
    "typography.languagePreferences": "Alle Artikel in dieser Sprache",
    "typography.languageSaveFailed": "Die Artikelsprache konnte nicht gespeichert werden. Versuchen Sie es erneut; Ihr Text wurde nicht geändert.",
    "typography.languageScope": "Typografiesprache",
    "typography.left": "Linkes Element",
    "typography.legacyHint": "Ihre früheren globalen Regeln bleiben erhalten. Kopieren Sie sie zu einer Sprache, um sie in neuen Prüfungen zu verwenden.",
    "typography.legacyReview": "Diese frühere Prüfung hat keine aufgezeichnete Sprachkonvention.",
    "typography.literal": "Wörtliche Satzzeichenersetzung",
    "typography.loadFailed": "Typografieeinstellungen konnten nicht geladen werden. Versuchen Sie es vor dem Bearbeiten oder Prüfen erneut.",
    "typography.localHint": (
        "Mechanische Prüfungen laufen lokal. Kontextuelle Regeln erfordern eine vollständige Stilprüfung. Der" +
        " Artikeltext ändert sich erst, wenn Sie einen Vorschlag annehmen."
    ),
    "typography.mark": "Bevorzugtes Zeichen",
    "typography.missingLanguage": "Wählen Sie vor der Typografieprüfung die Artikelsprache in der Statusleiste.",
    "typography.narrowNbsp": "Schmales geschütztes Leerzeichen, U+202F",
    "typography.nbsp": "Geschütztes Leerzeichen, U+00A0",
    "typography.nested": "Verschachtelte Anführungszeichen",
    "typography.noConvention": (
        "Keine anwendbaren mechanischen Regeln. Wählen Sie eine Konvention oder fügen Sie Regeln für diese Sprache hinz" +
        "u und speichern Sie sie."
    ),
    "typography.noPreset": "Eigene Konventionen",
    "typography.noViolations": "Keine mechanischen Typografieverstöße gefunden.",
    "typography.nonbreaking": "Untrennbares Zeichenpaar",
    "typography.olderProfile": (
        "Diese Prüfung verwendete Stilprofilversion {version}. Die Regeln haben sich geändert. Führen Sie die Prüfung e" +
        "rneut aus, um das aktuelle Profil zu verwenden."
    ),
    "typography.openingMark": "Öffnendes Zeichen",
    "typography.ordinarySpace": "Leerzeichen",
    "typography.otherLanguage": "Andere Sprache…",
    "typography.otherLanguageTitle": "Andere Schreibsprache wählen",
    "typography.outer": "Äußere Anführungszeichen",
    "typography.preset": "Konventionsvorgabe",
    "typography.presetPending": "{language}{separator}muttersprachliche Prüfung ausstehend",
    "typography.presetReviewHint": "Die Vorschauen der Vorgaben warten auf muttersprachliche Prüfung. Sie können unten eigene Regeln hinzufügen.",
    "typography.punctuationMarks": "Satzzeichen",
    "typography.punctuationSpacing": "Satzzeichenabstände",
    "typography.quotes": "Anführungszeichen",
    "typography.remove": "Entfernen",
    "typography.replacement": "Ersatzsatzzeichen",
    "typography.required": (
        "Die Typografie konnte nicht geprüft werden. Wählen Sie die Artikelsprache und speichern Sie dann Regeln für di" +
        "ese Sprache im Stilprofil."
    ),
    "typography.resetInheritance": "Geerbte Regeln wiederherstellen",
    "typography.retryLoad": "Einstellungen erneut laden",
    "typography.reviewLanguage": "Geprüfte Konventionen: {language}",
    "typography.reviewProposal": "Vorschlag prüfen",
    "typography.right": "Rechtes Element",
    "typography.ruleDescription": "{kind}: {value}",
    "typography.ruleNumber": "Regel {number}",
    "typography.rulesOnly": (
        "Keine Schreibproben einbezogen. Fügen Sie Proben hinzu, um Merkmale Ihrer Stimme abzuleiten, oder ve" +
        "rwenden Sie explizite Typografieregeln für lokale Prüfungen."
    ),
    "typography.save": "Speichern",
    "typography.saveDraftFirst": "Speichern Sie den aktuellen Entwurf vor der Typografieprüfung. Die lokale Prüfung verwendet die gespeicherte Fassung.",
    "typography.saveFailed": "Typografieregeln konnten nicht gespeichert werden. Ihre Änderungen sind noch vorhanden. Versuchen Sie erneut zu speichern.",
    "typography.saveHint": (
        "Speichern erstellt das Profil lokal aus den aktuell einbezogenen Proben und gespeicherten Regeln neu" +
        ", einschließlich ausstehender Probenänderungen. Ungespeicherte Änderungen in anderen Formularen blei" +
        "ben ausgeschlossen."
    ),
    "typography.saved": "Typografieregeln gespeichert und Stilprofil neu erstellt.",
    "typography.savedRule": "Gespeichert",
    "typography.scope": "Regeln anwenden auf",
    "typography.skipped": (
        "{count, plural, one {# uneindeutiger Anführungszeichenfall blieb unverändert.} other {# uneindeutige" +
        " Anführungszeichenfälle blieben unverändert.}} Prüfen Sie diese im Kontext."
    ),
    "typography.source": "Zu ersetzende Satzzeichen",
    "typography.source.article": "Artikelüberschreibung",
    "typography.source.language": "Spracheinstellung",
    "typography.source.preset": "Vorgabe",
    "typography.spaceBefore": "Abstand vor Satzzeichen",
    "typography.spacing": "Abstände",
    "typography.support": "Typografieregeln: {rules}",
    "typography.title": "Typografieregeln",
    "typography.unknownLanguage": "Sprache nicht angegeben",
    "typography.unsavedRule": "Ungespeichert",
    "typography.useLanguage": "Sprache verwenden",
    "typography.validation.conflict": "Diese Konventionen widersprechen sich. Passen Sie eine an oder entfernen Sie sie vor dem Speichern.",
    "typography.validation.duplicate": (
        "Diese Konvention steht bereits in der Liste. Bearbeiten oder entfernen Sie den doppelten Eintrag vor" +
        " dem Speichern."
    ),
    "typography.validation.invalid": "Vervollständigen Sie die Felder dieser Regel vor dem Speichern.",
    "typography.validation.limit": "Behalten Sie vor dem Speichern höchstens 30 Regeln.",
    "typography.withSpaces": "Mit Leerzeichen",
    "typography.withoutSpaces": "Ohne Leerzeichen",
} satisfies Partial<Record<MessageId, string>>;
