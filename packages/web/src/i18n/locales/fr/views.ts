import type { MessageId } from "../../messages.js";


export const viewsMessages = {
    "views.acceptAll": "Tout accepter",
    "views.acceptChange": "Accepter",
    "views.acceptFactAsWritten": "Accepter la formulation actuelle",
    "views.acceptFactEvidence": "Accepter les éléments de preuve",
    "views.acceptSelected": "Accepter la sélection",
    "views.addToCorpus": "Ajouter au corpus",
    "views.applyProposal": "Appliquer",
    "views.changeNavigation": "Navigation des modifications",
    "views.changeType.addition": "Ajout{separator}Modification {index} sur {total}",
    "views.changeType.removal": "Suppression{separator}Modification {index} sur {total}",
    "views.changeType.replacement": "Remplacement{separator}Modification {index} sur {total}",
    "views.characterCount": "{count} / {limit} caractères",
    "views.confirmRejectTranslation": "Rejeter",
    "views.continueWriting": "Continuer à écrire",
    "views.copy": "Copier",
    "views.decision.accepted": "Acceptée",
    "views.decision.pending": "En attente",
    "views.decision.rejected": "Rejetée",
    "views.discardDraftAndRestore": "Abandonner et restaurer",
    "views.dismissPreservationWarnings": "Masquer les avertissements de préservation",
    "views.dismissProposal": "Écarter la proposition",
    "views.earlierSuggestion": "Suggestion antérieure",
    "views.earlierSuggestionHelp": "Votre article a changé depuis la création de cette suggestion.",
    "views.editTranslation": "Modifier",
    "views.existingTranslations": "Traductions existantes",
    "views.factCheck": "Vérification des faits",
    "views.factCheckCurrent": "Version enregistrée actuelle",
    "views.factCheckEmpty": "Les vérifications des faits sont indicatives et ne modifient jamais l’article.",
    "views.factCheckEmptyTitle": "Aucune observation de vérification des faits",
    "views.factCheckFindings": "Observations de vérification des faits",
    "views.factCheckHistorical": (
        "Cette ancienne vérification des faits est en lecture seule. La dernière vérification de cette version permet t" +
        "oujours d’agir."
    ),
    "views.factCheckHistory": "Historique des vérifications des faits",
    "views.factCheckIncomplete": (
        "Cette vérification des faits est incomplète. Seules les observations terminées sont affichées. Relancez-la pou" +
        "r vérifier les affirmations restantes."
    ),
    "views.factCheckRevision": "Version examinée : {revision}",
    "views.factCheckRunOption": "Version {revision}, vérifiée le {dateTime}",
    "views.factCheckRunningEmpty": (
        "{count, plural, =0 {L’assistant recherche des affirmations à vérifier.} one {L’assistant vérifie act" +
        "uellement # affirmation.} other {L’assistant vérifie actuellement # affirmations.}} Les observations" +
        " apparaîtront ici à la fin de la vérification."
    ),
    "views.factCheckRunningPrevious": (
        "{count, plural, =0 {L’assistant recherche des affirmations à vérifier.} one {L’assistant vérifie act" +
        "uellement # affirmation.} other {L’assistant vérifie actuellement # affirmations.}} Les observations" +
        " affichées proviennent de la dernière vérification terminée et seront actualisées à la fin de la nou" +
        "velle vérification."
    ),
    "views.factCheckStale": (
        "Ces observations concernent une version antérieure. Elles restent lisibles, mais ne permettent aucun" +
        "e correction tant que vous n’avez pas relancé la vérification des faits."
    ),
    "views.factCheckedAt": "Vérifié le {dateTime}.",
    "views.factEvidenceFreshness": (
        "Les éléments de preuve reflètent leurs sources et les dates de vérification. Les affirmations sensib" +
        "les au temps peuvent avoir changé ; relancez la vérification des faits pour les actualiser."
    ),
    "views.factEvidenceReused": "Éléments de preuve réutilisés de la version {revision}.",
    "views.factImportance": "Importance : {importance}",
    "views.factResolution": "Résolution : {resolution}",
    "views.factResolution.accepted_as_written": "Formulation actuelle acceptée",
    "views.factResolution.corrected_or_removed": "Corrigée ou supprimée",
    "views.factResolution.evidence_accepted": "Éléments de preuve acceptés",
    "views.factStatus.disputed": "Contestée",
    "views.factStatus.supported": "Étayée",
    "views.factStatus.unverifiable": "Invérifiable",
    "views.findingNavigation": "Navigation des observations",
    "views.nextChange": "Modification suivante",
    "views.nextFinding": "Observation suivante",
    "views.openTranslation": "{language} : {title}",
    "views.preservationWarnings": "Vérifier les détails à préserver",
    "views.previousChange": "Modification précédente",
    "views.previousFinding": "Observation précédente",
    "views.proposalAccepted": "Cette proposition a été acceptée. Ses décisions sont en lecture seule.",
    "views.proposalAuthorEdited": "Vous avez modifié cette formulation. Vérifiez votre texte avant de l’appliquer.",
    "views.proposalCounts": (
        "{total, plural, =0 {Aucune suggestion} one {# suggestion} other {# suggestions}}{separator}{pending," +
        " plural, =0 {Aucune en attente} one {# en attente} other {# en attente}}{separator}{accepted, plural" +
        ", =0 {Aucune acceptée} one {# acceptée} other {# acceptées}}{separator}{rejected, plural, =0 {Aucune" +
        " rejetée} one {# rejetée} other {# rejetées}}"
    ),
    "views.proposalDisplayMode": "Mode d’affichage des propositions",
    "views.proposalEmpty": "Utilisez l’assistant éditorial pour générer une proposition. Il ne modifiera jamais automatiquement votre article.",
    "views.proposalEmptyTitle": "Aucune proposition à examiner",
    "views.proposalFallback": (
        "Cette proposition ne peut pas être divisée de manière fiable en modifications individuelles. Examinez-la dans " +
        "son ensemble avant de l’accepter."
    ),
    "views.proposalHighlight": "Mettre les modifications en évidence",
    "views.proposalNoChanges": "Inchangé",
    "views.proposalReview": "Examen des propositions",
    "views.proposalSideBySide": "Côte à côte",
    "views.proposalStacked": "L’une sous l’autre",
    "views.proposalStale": (
        "Cette proposition est obsolète, car l’article possède une version plus récente. Générez une nouvelle propositi" +
        "on avant d’accepter des modifications."
    ),
    "views.proposalSummaryLoading": "Résumé de cette modification…",
    "views.proposalSummaryUnavailable": "Aucun résumé court n’est disponible. Examinez les textes original et proposé ci-dessous.",
    "views.proposalWhole": "Proposition complète{separator}{changes, plural, one {# modification} other {# modifications}}",
    "views.proposeFactCorrection": "Proposer une correction",
    "views.proposeFactCorrections": "Proposer des corrections ({count})",
    "views.proposedChangeInput": "Texte proposé pour la modification {index}",
    "views.regenerateInAssistant": "Régénérer dans l’assistant",
    "views.rejectAll": "Tout rejeter",
    "views.rejectChange": "Rejeter",
    "views.rejectProposal": "Rejeter la proposition",
    "views.rejectTranslation": "Rejeter",
    "views.rejectTranslationDescription": (
        "Retire la traduction en {language} générée des éléments à approuver. Votre article source et les traductions a" +
        "cceptées restent inchangés."
    ),
    "views.rejectTranslationTitle": "Rejeter cette traduction ?",
    "views.remove": "Retirer",
    "views.resetAllDecisions": "Tout réinitialiser",
    "views.restoreDescription": "La restauration crée une nouvelle version enregistrée immuable ; elle ne réécrit pas l’historique.",
    "views.restoreDraftDescription": (
        "Ce brouillon contient des modifications absentes des versions enregistrées. Enregistrez-le d’abord, ou abandon" +
        "nez-le avant la restauration."
    ),
    "views.restoreHeading": "Restaurer la version enregistrée ?",
    "views.restoreRevision": "Restaurer",
    "views.resumeReview": "Reprendre l’examen",
    "views.reviewCurrentArticle": "Examiner l’article actuel",
    "views.revisionNumber": "v{revisionNumber}",
    "views.runFactCheck": "Vérifier les faits",
    "views.runFactCheckAgain": "Relancer la vérification des faits",
    "views.sampleName": "Nom de l’échantillon",
    "views.saveAndRestore": "Enregistrer et restaurer",
    "views.selectAllNeedingReview": "Sélectionner tous les éléments à examiner",
    "views.selectChange": "Sélectionner la modification",
    "views.setAllDecisions": "Tout décider…",
    "views.sourceLinkedPrefix": "Cette traduction est liée à",
    "views.sourceLinkedRevision": "à la version source enregistrée {revisionNumber}.",
    "views.styleIntro": "Votre corpus de style local n’est jamais envoyé intégralement ; seul le profil qui en est dérivé est utilisé.",
    "views.styleProfile": "Profil de style",
    "views.translate": "Nouvelle traduction…",
    "views.translationAligned": "Paragraphes alignés",
    "views.translationArticleStale": (
        "L’article source a changé depuis l’acceptation de cette traduction. Son texte a été conservé. Ouvrez l’article" +
        " source pour préparer une traduction actualisée."
    ),
    "views.translationChooseTargets": "Choisissez au moins une langue cible pour continuer.",
    "views.translationComparison": (
        "Comparaison des traductions. Utilisez les flèches gauche et droite pour atteindre le contenu protégé" +
        " validé, Entrée ou Espace pour les détails, et Échap pour les fermer."
    ),
    "views.translationContextChanged": "La source a changé. Examinez la source actualisée avant de confirmer de nouveau.",
    "views.translationDialogTitle": "Nouvelle traduction",
    "views.translationDisplayMode": "Mode d’affichage des traductions",
    "views.translationEmpty": "Demandez à l’assistant éditorial de traduire cet article.",
    "views.translationEmptyTitle": "Aucune proposition de traduction",
    "views.translationFresh": "À jour",
    "views.translationGenerateBatch": "Traduire en {count, number} langues",
    "views.translationGenerateConfirm": "Traduire en {languages}",
    "views.translationGenerateDescription": "Traduire {title}, version source enregistrée {revisionId}.",
    "views.translationGenerateDraft": "Votre brouillon non enregistré sera enregistré comme nouvelle version avant la génération.",
    "views.translationGenerateTargets": "Langues cibles",
    "views.translationGenerating": "Traduction…",
    "views.translationGeneratingLanguages": "Traduction en {languages}…",
    "views.translationGenerationActive": "Une demande est en cours. Attendez sa fin ou annulez-la avant de générer des traductions.",
    "views.translationLinkedIdentity": "Article {articleId}, version source enregistrée {revisionId}",
    "views.translationLinkedTarget": "{title}, article {articleId}, version source enregistrée {revisionId}",
    "views.translationMissingOriginal": "Aucun paragraphe original correspondant.",
    "views.translationMissingResult": "Aucun paragraphe traduit correspondant.",
    "views.translationOriginal": "Original",
    "views.translationOutdated": "Obsolète",
    "views.translationPair": "Source en {source} → traduction en {target}",
    "views.translationPreservation": (
        "Les résultats et articles existants sont conservés. L’actualisation d’un article traduit nécessite une confirm" +
        "ation distincte."
    ),
    "views.translationProtectedExplanation": (
        "Marqué pour être conservé à l’identique dans cette traduction. {count, plural, one {L’occurrence att" +
        "endue est présente et inchangée} other {Les # occurrences attendues sont toutes présentes et inchang" +
        "ées}} dans le texte traduit. Cette vérification est indicative ; examinez la traduction avant de l’a" +
        "ccepter."
    ),
    "views.translationProtectedValue": "Contenu protégé validé : {value}",
    "views.translationProtectedWarning": "Contenu protégé modifié ou manquant",
    "views.translationPublishingGuidance": "Indications du profil {profile}",
    "views.translationRefresh": "Actualiser",
    "views.translationRefreshConfirm": "Actualiser",
    "views.translationRefreshDescription": (
        "Appliquer le texte en {language} examiné à {title} dans une nouvelle version enregistrée ? Son titre" +
        " reste inchangé et les versions antérieures restent disponibles dans l’historique."
    ),
    "views.translationRefreshDraft": "Enregistrez ou abandonnez le brouillon de la traduction avant de l’actualiser.",
    "views.translationRefreshFailed": (
        "Impossible d’actualiser la traduction. Enregistrez ou abandonnez son brouillon, vérifiez que la sour" +
        "ce et la traduction n’ont pas changé, puis examinez de nouveau la proposition."
    ),
    "views.translationRefreshTarget": "Traduction à actualiser",
    "views.translationRefreshTitle": "Actualiser la traduction ?",
    "views.translationRefreshUnavailable": (
        "Impossible d’actualiser la traduction, car sa proposition est indisponible. Générez une nouvelle traduction et" +
        " examinez-la de nouveau."
    ),
    "views.translationResult": "Traduction en {language}",
    "views.translationResultOption": "v{number}{separator}{date}{separator}{description}",
    "views.translationResultSelector": "Résultat de traduction",
    "views.translationReviewSource": "Examiner la source actualisée",
    "views.translationSideBySide": "Côte à côte",
    "views.translationStale": "L’article source a changé depuis la création de cette proposition de traduction.",
    "views.translationTargets": "Générez une traduction, puis examinez-la ici. Les résultats précédents sont conservés.",
    "views.translationTargetsEmpty": "Générez une traduction, puis examinez-la ici. Les résultats précédents sont conservés.",
    "views.translations": "Traductions",
    "views.uncertainty": "Incertitude : {value}",
    "views.updateSuggestion": "Actualiser la suggestion",
    "views.updateSuggestionPrompt": "Prepare an updated Proposal for the current Article based on the earlier suggestion. Do not apply changes.",
    "views.warning.claims": "Les modifications du texte peuvent changer le sens factuel ; vérifiez les affirmations avant d’accepter.",
    "views.warning.code": "Du code a changé. Vérifiez le code en ligne et les blocs de code.",
    "views.warning.number": "Des valeurs numériques ont changé. Vérifiez chaque nombre.",
    "views.warning.url": "Des URL ont changé. Vérifiez chaque lien.",
    "views.writingSample": "Échantillon d’écriture",
} satisfies Partial<Record<MessageId, string>>;
