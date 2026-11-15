import type { MessageId } from "../../messages.js";

export const typographyMessages = {
    "typography.customPair": "Paire personnalisée",
    "typography.articleSaved": "Préférences typographiques de l’article enregistrées.",
    "typography.articleSaveHint": (
        "Les règles de l’article remplacent ou désactivent les règles héritées de la langue. Enregistrez-les " +
        "pour la prochaine vérification."
    ),
    "typography.reviewLanguage": "Conventions examinées : {language}",
    "typography.unknownLanguage": "Langue non précisée",
    "typography.otherLanguage": "Autre langue…",
    "typography.otherLanguageTitle": "Choisir une autre langue de rédaction",
    "typography.languageCode": "Langue ou variante régionale",
    "typography.languageCodeHint": (
        "Saisissez une langue ou une variante régionale, par exemple polonais ou espagnol, Argentine. Les " +
        "codes tels que ja ou es-AR sont aussi acceptés."
    ),
    "typography.languageSaveFailed": "Impossible d’enregistrer la langue de l’article. Réessayez ; votre texte n’a pas changé.",
    "typography.useLanguage": "Utiliser cette langue",
    "typography.loadFailed": "Impossible de charger les préférences typographiques. Réessayez avant toute modification ou vérification.",
    "typography.retryLoad": "Recharger les préférences",
    "typography.openingMark": "Signe ouvrant",
    "typography.closingMark": "Signe fermant",
    "typography.innerSpace": "Espace à l’intérieur des guillemets",
    "typography.punctuationMarks": "Signes de ponctuation",
    "typography.spaceBefore": "Espace avant la ponctuation",
    "typography.punctuationSpacing": "Espacement de la ponctuation",
    "typography.languageScope": "Langue de la typographie",
    "typography.chooseLanguage": "Choisir une langue",
    "typography.languageHint": (
        "Enregistrez des conventions distinctes pour chaque langue de rédaction. Cela ne change ni la langue " +
        "de l’article ni celle de l’interface."
    ),
    "typography.missingLanguage": "Choisissez la langue de l’article dans la barre d’état avant de vérifier la typographie.",
    "typography.scope": "Appliquer les règles à",
    "typography.languagePreferences": "Tous les articles dans cette langue",
    "typography.articlePreferences": "Cet article uniquement",
    "typography.preset": "Conventions prédéfinies",
    "typography.noPreset": "Conventions personnalisées",
    "typography.presetPending": "{language}{separator}en attente de relecture par un locuteur natif",
    "typography.presetReviewHint": (
        "Les aperçus des conventions attendent une relecture par des locuteurs natifs. Vous pouvez ajouter " +
        "vos propres règles ci-dessous."
    ),
    "typography.applyPreset": "Appliquer les conventions prédéfinies",
    "typography.legacyHint": (
        "Vos anciennes règles globales sont conservées. Copiez-les vers une langue pour les utiliser dans les " +
        "prochaines vérifications."
    ),
    "typography.copyLegacy": "Copier les anciennes règles vers cette langue",
    "typography.resetInheritance": "Rétablir les règles héritées",
    "typography.inheritanceHint": (
        "Modifier une règle héritée la remplace ; la retirer la désactive. Rétablissez les règles héritées " +
        "pour effacer les remplacements."
    ),
    "typography.noConvention": "Aucune règle mécanique applicable. Choisissez des conventions ou ajoutez et enregistrez des règles pour cette langue.",
    "typography.effectiveLanguage": "Vérification des conventions pour {language}",
    "typography.earlierConvention": (
        "Cette révision utilisait des préférences linguistiques ou typographiques antérieures. Relancez la " +
        "vérification pour utiliser les conventions actuelles."
    ),
    "typography.legacyReview": "Cette ancienne révision ne comporte pas de convention linguistique enregistrée.",
    "typography.source.preset": "Prédéfinie",
    "typography.source.language": "Préférence de langue",
    "typography.source.article": "Règle propre à l’article",
    "typography.invalid": (
        "Impossible d’enregistrer ou de charger les règles typographiques. Vérifiez les règles incomplètes, " +
        "en double ou contradictoires, puis réessayez. Si les règles enregistrées ne peuvent pas être " +
        "chargées, restaurez une sauvegarde dans les paramètres."
    ),
    "typography.correctionsConflict": (
        "Impossible d’appliquer les corrections typographiques de manière cohérente. Ajustez les règles qui " +
        "se chevauchent ou se répètent, puis relancez la vérification. Votre article n’a pas été modifié."
    ),
    "typography.required": (
        "Impossible de vérifier la typographie. Choisissez la langue de l’article, puis enregistrez des " +
        "règles pour cette langue dans le profil de style."
    ),
    "typography.title": "Règles typographiques",
    "typography.saveHint": (
        "L’enregistrement reconstruit localement le profil à partir des échantillons inclus et des règles " +
        "enregistrées, y compris les modifications d’échantillons en attente. Les modifications non " +
        "enregistrées dans les autres formulaires sont exclues."
    ),
    "typography.empty": "Aucune règle typographique. Ajoutez une convention pour vérifier la ponctuation ou l’espacement.",
    "typography.add": "Ajouter une règle",
    "typography.remove": "Retirer",
    "typography.save": "Enregistrer",
    "typography.edit": "Modifier",
    "typography.closeEditor": "Fermer",
    "typography.savedRule": "Enregistrée",
    "typography.unsavedRule": "Non enregistrée",
    "typography.validation.invalid": "Complétez les champs de cette règle avant de l’enregistrer.",
    "typography.validation.duplicate": "Cette convention figure déjà dans la liste. Modifiez ou retirez le doublon avant l’enregistrement.",
    "typography.validation.conflict": "Ces conventions se contredisent. Ajustez-en ou retirez-en une avant l’enregistrement.",
    "typography.validation.limit": "Conservez au maximum 30 règles avant l’enregistrement.",
    "typography.saveFailed": "Impossible d’enregistrer les règles typographiques. Vos modifications sont toujours présentes. Réessayez l’enregistrement.",
    "typography.check": "Vérifier la typographie",
    "typography.saved": "Règles typographiques enregistrées et profil de style reconstruit.",
    "typography.localHint": (
        "Les vérifications mécaniques sont locales. Les règles contextuelles nécessitent une révision " +
        "complète du style. Le texte de l’article ne change qu’après l’acceptation d’une proposition."
    ),
    "typography.kind": "Convention de la règle {number}",
    "typography.ruleNumber": "Règle {number}",
    "typography.quotes": "Guillemets",
    "typography.dash": "Tirets du texte",
    "typography.ellipsis": "Points de suspension",
    "typography.ellipsisSingle": "Caractère unique, …",
    "typography.ellipsisThree": "Trois points, ...",
    "typography.nonbreaking": "Paire d’éléments insécable",
    "typography.horizontal": "Espaces répétés",
    "typography.literal": "Remplacement littéral de ponctuation",
    "typography.contextual": "Consigne typographique contextuelle",
    "typography.outer": "Guillemets extérieurs",
    "typography.nested": "Guillemets imbriqués",
    "typography.mark": "Signe préféré",
    "typography.spacing": "Espacement",
    "typography.withSpaces": "Avec espaces",
    "typography.withoutSpaces": "Sans espaces",
    "typography.left": "Élément gauche",
    "typography.right": "Élément droit",
    "typography.nbsp": "Espace insécable, U+00A0",
    "typography.narrowNbsp": "Espace fine insécable, U+202F",
    "typography.source": "Ponctuation à remplacer",
    "typography.replacement": "Ponctuation de remplacement",
    "typography.instruction": "Consigne pour la révision complète du style",
    "typography.horizontalHint": (
        "Utilise une seule espace ordinaire entre les éléments du texte. L’indentation, les sauts de ligne et " +
        "le code restent inchangés."
    ),
    "typography.ruleDescription": "{kind} : {value}",
    "typography.support": "Règles typographiques : {rules}",
    "typography.noViolations": "Aucune infraction typographique mécanique détectée.",
    "typography.skipped": (
        "{count, plural, one {# cas ambigu de guillemets a été laissé inchangé.} other {# cas ambigus de " +
        "guillemets ont été laissés inchangés.}} Examinez-les dans leur contexte."
    ),
    "typography.contextualSkipped": (
        "{count, plural, one {# règle contextuelle nécessite une révision complète du style.} other {# règles " +
        "contextuelles nécessitent une révision complète du style.}}"
    ),
    "typography.olderProfile": (
        "Cette révision utilisait la version {version} du profil de style. Les règles ont changé. Relancez la " +
        "vérification pour utiliser le profil actuel."
    ),
    "typography.rulesOnly": (
        "Aucun échantillon d’écriture n’est inclus. Ajoutez des échantillons pour déduire les " +
        "caractéristiques de votre voix, ou utilisez des règles typographiques explicites pour les " +
        "vérifications locales."
    ),
    "typography.checkFailed": "Impossible de vérifier la typographie. Enregistrez des règles valides et réessayez.",
    "typography.saveDraftFirst": (
        "Enregistrez le brouillon actuel avant de vérifier la typographie. La vérification locale utilise la " +
        "version enregistrée."
    ),
    "typography.reviewProposal": "Examiner la proposition",
    "typography.correction": "{source} → {replacement}",
    "typography.ordinarySpace": "espace",
    "typography.deleted": "supprimé",
} satisfies Partial<Record<MessageId, string>>;
