import type { MessageId } from "../../messages.js";


export const typographyMessages = {
    "typography.add": "Ajouter une règle",
    "typography.applyPreset": "Appliquer les conventions prédéfinies",
    "typography.articlePreferences": "Cet article uniquement",
    "typography.articleSaveHint": (
        "Les règles de l’article remplacent ou désactivent les règles héritées de la langue. Enregistrez-les pour la pr" +
        "ochaine vérification."
    ),
    "typography.articleSaved": "Préférences typographiques de l’article enregistrées.",
    "typography.check": "Vérifier la typographie",
    "typography.checkFailed": "Impossible de vérifier la typographie. Enregistrez des règles valides et réessayez.",
    "typography.chooseLanguage": "Choisir une langue",
    "typography.closeEditor": "Fermer",
    "typography.closingMark": "Signe fermant",
    "typography.contextual": "Consigne typographique contextuelle",
    "typography.contextualSkipped": (
        "{count, plural, one {# règle contextuelle nécessite une révision complète du style.} other {# règles" +
        " contextuelles nécessitent une révision complète du style.}}"
    ),
    "typography.copyLegacy": "Copier les anciennes règles vers cette langue",
    "typography.correction": "{source} → {replacement}",
    "typography.correctionsConflict": (
        "Impossible d’appliquer les corrections typographiques de manière cohérente. Ajustez les règles qui s" +
        "e chevauchent ou se répètent, puis relancez la vérification. Votre article n’a pas été modifié."
    ),
    "typography.customPair": "Paire personnalisée",
    "typography.dash": "Tirets du texte",
    "typography.deleted": "supprimé",
    "typography.earlierConvention": (
        "Cette révision utilisait des préférences linguistiques ou typographiques antérieures. Relancez la vérification" +
        " pour utiliser les conventions actuelles."
    ),
    "typography.edit": "Modifier",
    "typography.effectiveLanguage": "Vérification des conventions pour {language}",
    "typography.ellipsis": "Points de suspension",
    "typography.ellipsisSingle": "Caractère unique, …",
    "typography.ellipsisThree": "Trois points, ...",
    "typography.empty": "Aucune règle typographique. Ajoutez une convention pour vérifier la ponctuation ou l’espacement.",
    "typography.horizontal": "Espaces répétés",
    "typography.horizontalHint": (
        "Utilise une seule espace ordinaire entre les éléments du texte. L’indentation, les sauts de ligne et le code r" +
        "estent inchangés."
    ),
    "typography.inheritanceHint": (
        "Modifier une règle héritée la remplace ; la retirer la désactive. Rétablissez les règles héritées pour effacer" +
        " les remplacements."
    ),
    "typography.innerSpace": "Espace à l’intérieur des guillemets",
    "typography.instruction": "Consigne pour la révision complète du style",
    "typography.invalid": (
        "Impossible d’enregistrer ou de charger les règles typographiques. Vérifiez les règles incomplètes, e" +
        "n double ou contradictoires, puis réessayez. Si les règles enregistrées ne peuvent pas être chargées" +
        ", restaurez une sauvegarde dans les paramètres."
    ),
    "typography.kind": "Convention de la règle {number}",
    "typography.languageCode": "Langue ou variante régionale",
    "typography.languageCodeHint": (
        "Saisissez une langue ou une variante régionale, par exemple polonais ou espagnol, Argentine. Les codes tels qu" +
        "e ja ou es-AR sont aussi acceptés."
    ),
    "typography.languageHint": (
        "Enregistrez des conventions distinctes pour chaque langue de rédaction. Cela ne change ni la langue de l’artic" +
        "le ni celle de l’interface."
    ),
    "typography.languagePreferences": "Tous les articles dans cette langue",
    "typography.languageSaveFailed": "Impossible d’enregistrer la langue de l’article. Réessayez ; votre texte n’a pas changé.",
    "typography.languageScope": "Langue de la typographie",
    "typography.left": "Élément gauche",
    "typography.legacyHint": (
        "Vos anciennes règles globales sont conservées. Copiez-les vers une langue pour les utiliser dans les" +
        " prochaines vérifications."
    ),
    "typography.legacyReview": "Cette ancienne révision ne comporte pas de convention linguistique enregistrée.",
    "typography.literal": "Remplacement littéral de ponctuation",
    "typography.loadFailed": "Impossible de charger les préférences typographiques. Réessayez avant toute modification ou vérification.",
    "typography.localHint": (
        "Les vérifications mécaniques sont locales. Les règles contextuelles nécessitent une révision complèt" +
        "e du style. Le texte de l’article ne change qu’après l’acceptation d’une proposition."
    ),
    "typography.mark": "Signe préféré",
    "typography.missingLanguage": "Choisissez la langue de l’article dans la barre d’état avant de vérifier la typographie.",
    "typography.narrowNbsp": "Espace fine insécable, U+202F",
    "typography.nbsp": "Espace insécable, U+00A0",
    "typography.nested": "Guillemets imbriqués",
    "typography.noConvention": "Aucune règle mécanique applicable. Choisissez des conventions ou ajoutez et enregistrez des règles pour cette langue.",
    "typography.noPreset": "Conventions personnalisées",
    "typography.noViolations": "Aucune infraction typographique mécanique détectée.",
    "typography.nonbreaking": "Paire d’éléments insécable",
    "typography.olderProfile": (
        "Cette révision utilisait la version {version} du profil de style. Les règles ont changé. Relancez la vérificat" +
        "ion pour utiliser le profil actuel."
    ),
    "typography.openingMark": "Signe ouvrant",
    "typography.ordinarySpace": "espace",
    "typography.otherLanguage": "Autre langue…",
    "typography.otherLanguageTitle": "Choisir une autre langue de rédaction",
    "typography.outer": "Guillemets extérieurs",
    "typography.preset": "Conventions prédéfinies",
    "typography.presetPending": "{language}{separator}en attente de relecture par un locuteur natif",
    "typography.presetReviewHint": (
        "Les aperçus des conventions attendent une relecture par des locuteurs natifs. Vous pouvez ajouter vos propres " +
        "règles ci-dessous."
    ),
    "typography.punctuationMarks": "Signes de ponctuation",
    "typography.punctuationSpacing": "Espacement de la ponctuation",
    "typography.quotes": "Guillemets",
    "typography.remove": "Retirer",
    "typography.replacement": "Ponctuation de remplacement",
    "typography.required": (
        "Impossible de vérifier la typographie. Choisissez la langue de l’article, puis enregistrez des règles pour cet" +
        "te langue dans le profil de style."
    ),
    "typography.resetInheritance": "Rétablir les règles héritées",
    "typography.retryLoad": "Recharger les préférences",
    "typography.reviewLanguage": "Conventions examinées : {language}",
    "typography.reviewProposal": "Examiner la proposition",
    "typography.right": "Élément droit",
    "typography.ruleDescription": "{kind} : {value}",
    "typography.ruleNumber": "Règle {number}",
    "typography.rulesOnly": (
        "Aucun échantillon d’écriture n’est inclus. Ajoutez des échantillons pour déduire les caractéristique" +
        "s de votre voix, ou utilisez des règles typographiques explicites pour les vérifications locales."
    ),
    "typography.save": "Enregistrer",
    "typography.saveDraftFirst": (
        "Enregistrez le brouillon actuel avant de vérifier la typographie. La vérification locale utilise la " +
        "version enregistrée."
    ),
    "typography.saveFailed": "Impossible d’enregistrer les règles typographiques. Vos modifications sont toujours présentes. Réessayez l’enregistrement.",
    "typography.saveHint": (
        "L’enregistrement reconstruit localement le profil à partir des échantillons inclus et des règles enr" +
        "egistrées, y compris les modifications d’échantillons en attente. Les modifications non enregistrées" +
        " dans les autres formulaires sont exclues."
    ),
    "typography.saved": "Règles typographiques enregistrées et profil de style reconstruit.",
    "typography.savedRule": "Enregistrée",
    "typography.scope": "Appliquer les règles à",
    "typography.skipped": (
        "{count, plural, one {# cas ambigu de guillemets a été laissé inchangé.} other {# cas ambigus de guil" +
        "lemets ont été laissés inchangés.}} Examinez-les dans leur contexte."
    ),
    "typography.source": "Ponctuation à remplacer",
    "typography.source.article": "Règle propre à l’article",
    "typography.source.language": "Préférence de langue",
    "typography.source.preset": "Prédéfinie",
    "typography.spaceBefore": "Espace avant la ponctuation",
    "typography.spacing": "Espacement",
    "typography.support": "Règles typographiques : {rules}",
    "typography.title": "Règles typographiques",
    "typography.unknownLanguage": "Langue non précisée",
    "typography.unsavedRule": "Non enregistrée",
    "typography.useLanguage": "Utiliser cette langue",
    "typography.validation.conflict": "Ces conventions se contredisent. Ajustez-en ou retirez-en une avant l’enregistrement.",
    "typography.validation.duplicate": "Cette convention figure déjà dans la liste. Modifiez ou retirez le doublon avant l’enregistrement.",
    "typography.validation.invalid": "Complétez les champs de cette règle avant de l’enregistrer.",
    "typography.validation.limit": "Conservez au maximum 30 règles avant l’enregistrement.",
    "typography.withSpaces": "Avec espaces",
    "typography.withoutSpaces": "Sans espaces",
} satisfies Partial<Record<MessageId, string>>;
