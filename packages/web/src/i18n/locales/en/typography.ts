import type { MessageId } from "../../messages.js";


export const typographyMessages = {
    "typography.add": "Add rule",
    "typography.applyPreset": "Apply preset",
    "typography.articlePreferences": "This Article only",
    "typography.articleSaveHint": "Article rules override or disable inherited language rules. Save to use them in the next check.",
    "typography.articleSaved": "Article typography preferences saved.",
    "typography.check": "Check typography",
    "typography.checkFailed": "Typography could not be checked. Save valid rules and try again.",
    "typography.chooseLanguage": "Choose a language",
    "typography.closeEditor": "Close",
    "typography.closingMark": "Closing mark",
    "typography.contextual": "Contextual typography instruction",
    "typography.contextualSkipped": (
        "{count, plural, one {# contextual rule requires full Style review.} other {# contextual rules require full Sty" +
        "le review.}}"
    ),
    "typography.copyLegacy": "Copy earlier rules to this language",
    "typography.correction": "{source} → {replacement}",
    "typography.correctionsConflict": (
        "Typography corrections could not be made consistently. Adjust overlapping or repeating typography rules, then " +
        "check again. Your Article was not changed."
    ),
    "typography.customPair": "Custom pair",
    "typography.dash": "Prose dashes",
    "typography.deleted": "removed",
    "typography.earlierConvention": "This review used earlier language or typography preferences. Run the check again to use the current conventions.",
    "typography.edit": "Edit",
    "typography.effectiveLanguage": "Checking conventions for {language}",
    "typography.ellipsis": "Ellipsis",
    "typography.ellipsisSingle": "Single ellipsis character, …",
    "typography.ellipsisThree": "Three periods, ...",
    "typography.empty": "No typography rules. Add a convention to check punctuation or spacing.",
    "typography.horizontal": "Repeated spaces",
    "typography.horizontalHint": "Use one ordinary space between prose tokens. Indentation, line breaks, and code remain unchanged.",
    "typography.inheritanceHint": "Editing overrides an inherited rule; removing disables it. Restore inherited rules to clear overrides.",
    "typography.innerSpace": "Space inside quotation marks",
    "typography.instruction": "Instruction for full Style review",
    "typography.invalid": (
        "Typography rules could not be saved or loaded. Check incomplete, duplicate, or conflicting rules, th" +
        "en try again. If saved rules cannot load, restore a backup in Settings."
    ),
    "typography.kind": "Rule {number} convention",
    "typography.languageCode": "Language or regional variant",
    "typography.languageCodeHint": "Enter a name or regional variant, such as Polish or Spanish, Argentina. Codes such as ja or es-AR also work.",
    "typography.languageHint": "Save separate conventions for each writing language. This does not change the Article or interface language.",
    "typography.languagePreferences": "All Articles in this language",
    "typography.languageSaveFailed": "The Article language could not be saved. Try again; your text has not changed.",
    "typography.languageScope": "Typography language",
    "typography.left": "Left token",
    "typography.legacyHint": "Your earlier global rules are preserved. Copy them to a language to use them in new checks.",
    "typography.legacyReview": "This earlier review has no recorded language convention.",
    "typography.literal": "Literal punctuation replacement",
    "typography.loadFailed": "Typography preferences could not be loaded. Retry before editing or checking.",
    "typography.localHint": (
        "Mechanical checks run locally. Contextual rules require full Style review. Article text changes only" +
        " after you accept a Proposal."
    ),
    "typography.mark": "Preferred mark",
    "typography.missingLanguage": "Choose the Article language in the status bar before checking typography.",
    "typography.narrowNbsp": "Narrow non-breaking space, U+202F",
    "typography.nbsp": "Non-breaking space, U+00A0",
    "typography.nested": "Nested quotation marks",
    "typography.noConvention": "No applicable mechanical rules. Choose a convention or add and save rules for this language.",
    "typography.noPreset": "Custom conventions",
    "typography.noViolations": "No mechanical typography violations found.",
    "typography.nonbreaking": "Non-breaking token pair",
    "typography.olderProfile": "This review used Style Profile version {version}. Rules have changed. Run the check again to use the current profile.",
    "typography.openingMark": "Opening mark",
    "typography.ordinarySpace": "space",
    "typography.otherLanguage": "Other language…",
    "typography.otherLanguageTitle": "Choose another writing language",
    "typography.outer": "Outer quotation marks",
    "typography.preset": "Convention preset",
    "typography.presetPending": "{language}{separator}awaiting native-language review",
    "typography.presetReviewHint": "Preset previews await native-language review. You can add your own rules below.",
    "typography.punctuationMarks": "Punctuation marks",
    "typography.punctuationSpacing": "Punctuation spacing",
    "typography.quotes": "Quotation marks",
    "typography.remove": "Remove",
    "typography.replacement": "Replacement punctuation",
    "typography.required": "Typography could not be checked. Choose the Article language, then save rules for that language in Style Profile.",
    "typography.resetInheritance": "Restore inherited rules",
    "typography.retryLoad": "Retry loading preferences",
    "typography.reviewLanguage": "Review conventions: {language}",
    "typography.reviewProposal": "Review Proposal",
    "typography.right": "Right token",
    "typography.ruleDescription": "{kind}: {value}",
    "typography.ruleNumber": "Rule {number}",
    "typography.rulesOnly": (
        "No writing samples are included. Add samples to derive voice characteristics, or use explicit typogr" +
        "aphy rules for local checks."
    ),
    "typography.save": "Save",
    "typography.saveDraftFirst": "Save the current Draft before checking typography. The local check uses the saved Revision.",
    "typography.saveFailed": "Typography rules could not be saved. Your edits are still here. Try saving again.",
    "typography.saveHint": (
        "Saving rebuilds the profile locally from the current included samples and saved rules, including pen" +
        "ding sample changes. Unsaved changes in other forms are excluded."
    ),
    "typography.saved": "Typography rules saved and Style Profile rebuilt.",
    "typography.savedRule": "Saved",
    "typography.scope": "Apply rules to",
    "typography.skipped": (
        "{count, plural, one {# ambiguous quotation case was left unchanged.} other {# ambiguous quotation cases were l" +
        "eft unchanged.}} Review these in context."
    ),
    "typography.source": "Punctuation to replace",
    "typography.source.article": "Article override",
    "typography.source.language": "Language preference",
    "typography.source.preset": "Preset",
    "typography.spaceBefore": "Space before punctuation",
    "typography.spacing": "Spacing",
    "typography.support": "Typography rules: {rules}",
    "typography.title": "Typography rules",
    "typography.unknownLanguage": "Language not specified",
    "typography.unsavedRule": "Unsaved",
    "typography.useLanguage": "Use language",
    "typography.validation.conflict": "These conventions conflict. Adjust or remove one before saving.",
    "typography.validation.duplicate": "This convention is already in the list. Edit or remove the duplicate before saving.",
    "typography.validation.invalid": "Complete this rule’s fields before saving.",
    "typography.validation.limit": "Keep at most 30 rules before saving.",
    "typography.withSpaces": "With spaces",
    "typography.withoutSpaces": "Without spaces",
} satisfies Partial<Record<MessageId, string>>;
