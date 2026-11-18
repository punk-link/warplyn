import type { MessageId } from "../../messages.js";

export const viewsMessages = {
    "views.factCheck": "Vérification des faits",
    "views.factCheckEmptyTitle": "Aucune observation de vérification des faits",
    "views.factCheckEmpty": "Les vérifications des faits sont indicatives et ne modifient jamais l’article.",
    "views.factCheckRevision": "Version examinée : {revision}",
    "views.factCheckHistory": "Historique des vérifications des faits",
    "views.factCheckCurrent": "Version enregistrée actuelle",
    "views.factCheckRunOption": "Version {revision}, vérifiée le {dateTime}",
    "views.factEvidenceFreshness": (
        "Les éléments de preuve reflètent leurs sources et les dates de vérification. Les affirmations " +
        "sensibles au temps peuvent avoir changé ; relancez la vérification des faits pour les actualiser."
    ),
    "views.revisionNumber": "v{revisionNumber}",
    "views.runFactCheck": "Vérifier les faits",
    "views.factCheckStale": (
        "Ces observations concernent une version antérieure. Elles restent lisibles, mais ne permettent " +
        "aucune correction tant que vous n’avez pas relancé la vérification des faits."
    ),
    "views.factCheckRunningPrevious": (
        "{count, plural, =0 {L’assistant recherche des affirmations à vérifier.} one {L’assistant vérifie " +
        "actuellement # affirmation.} other {L’assistant vérifie actuellement # affirmations.}} Les " +
        "observations affichées proviennent de la dernière vérification terminée et seront actualisées à la " +
        "fin de la nouvelle vérification."
    ),
    "views.factCheckRunningEmpty": (
        "{count, plural, =0 {L’assistant recherche des affirmations à vérifier.} one {L’assistant vérifie " +
        "actuellement # affirmation.} other {L’assistant vérifie actuellement # affirmations.}} Les " +
        "observations apparaîtront ici à la fin de la vérification."
    ),
    "views.factCheckHistorical": (
        "Cette ancienne vérification des faits est en lecture seule. La dernière vérification de cette " +
        "version permet toujours d’agir."
    ),
    "views.factCheckIncomplete": (
        "Cette vérification des faits est incomplète. Seules les observations terminées sont affichées. " +
        "Relancez-la pour vérifier les affirmations restantes."
    ),
    "views.runFactCheckAgain": "Relancer la vérification des faits",
    "views.selectAllNeedingReview": "Sélectionner tous les éléments à examiner",
    "views.proposeFactCorrections": "Proposer des corrections ({count})",
    "views.proposeFactCorrection": "Proposer une correction",
    "views.factCheckFindings": "Observations de vérification des faits",
    "views.factStatus.supported": "Étayée",
    "views.factStatus.disputed": "Contestée",
    "views.factStatus.unverifiable": "Invérifiable",
    "views.factImportance": "Importance : {importance}",
    "views.factEvidenceReused": "Éléments de preuve réutilisés de la version {revision}.",
    "views.factCheckedAt": "Vérifié le {dateTime}.",
    "views.acceptFactAsWritten": "Accepter la formulation actuelle",
    "views.acceptFactEvidence": "Accepter les éléments de preuve",
    "views.factResolution": "Résolution : {resolution}",
    "views.factResolution.accepted_as_written": "Formulation actuelle acceptée",
    "views.factResolution.evidence_accepted": "Éléments de preuve acceptés",
    "views.factResolution.corrected_or_removed": "Corrigée ou supprimée",
    "views.uncertainty": "Incertitude : {value}",
    "views.proposalReview": "Examen des propositions",
    "views.continueWriting": "Continuer à écrire",
    "views.resumeReview": "Reprendre l’examen",
    "views.earlierSuggestion": "Suggestion antérieure",
    "views.earlierSuggestionHelp": "Votre article a changé depuis la création de cette suggestion.",
    "views.updateSuggestion": "Actualiser la suggestion",
    "views.updateSuggestionPrompt": "Prepare an updated Proposal for the current Article based on the earlier suggestion. Do not apply changes.",
    "views.proposalEmptyTitle": "Aucune proposition à examiner",
    "views.proposalEmpty": "Utilisez l’assistant éditorial pour générer une proposition. Il ne modifiera jamais automatiquement votre article.",
    "views.proposalStale": (
        "Cette proposition est obsolète, car l’article possède une version plus récente. Générez une nouvelle " +
        "proposition avant d’accepter des modifications."
    ),
    "views.proposalAccepted": "Cette proposition a été acceptée. Ses décisions sont en lecture seule.",
    "views.proposalCounts": (
        "{total, plural, =0 {Aucune suggestion} one {# suggestion} other {# suggestions}}{separator}{pending, plural, " +
        "=0 {Aucune en attente} one {# en attente} other {# en attente}}{separator}{accepted, plural, =0 {Aucune " +
        "acceptée} one {# acceptée} other {# acceptées}}{separator}{rejected, plural, =0 {Aucune rejetée} one {# " +
        "rejetée} other {# rejetées}}"
    ),
    "views.proposalWhole": "Proposition complète{separator}{changes, plural, one {# modification} other {# modifications}}",
    "views.acceptAll": "Tout accepter",
    "views.setAllDecisions": "Tout décider…",
    "views.resetAllDecisions": "Tout réinitialiser",
    "views.applyProposal": "Appliquer",
    "views.proposedChangeInput": "Texte proposé pour la modification {index}",
    "views.proposalAuthorEdited": "Vous avez modifié cette formulation. Vérifiez votre texte avant de l’appliquer.",
    "views.rejectAll": "Tout rejeter",
    "views.acceptChange": "Accepter",
    "views.rejectChange": "Rejeter",
    "views.changeNavigation": "Navigation des modifications",
    "views.previousChange": "Modification précédente",
    "views.nextChange": "Modification suivante",
    "views.findingNavigation": "Navigation des observations",
    "views.previousFinding": "Observation précédente",
    "views.nextFinding": "Observation suivante",
    "views.proposalDisplayMode": "Mode d’affichage des propositions",
    "views.proposalSideBySide": "Côte à côte",
    "views.proposalStacked": "L’une sous l’autre",
    "views.proposalHighlight": "Mettre les modifications en évidence",
    "views.reviewCurrentArticle": "Examiner l’article actuel",
    "views.regenerateInAssistant": "Régénérer dans l’assistant",
    "views.proposalFallback": (
        "Cette proposition ne peut pas être divisée de manière fiable en modifications individuelles. " +
        "Examinez-la dans son ensemble avant de l’accepter."
    ),
    "views.preservationWarnings": "Vérifier les détails à préserver",
    "views.dismissPreservationWarnings": "Masquer les avertissements de préservation",
    "views.warning.url": "Des URL ont changé. Vérifiez chaque lien.",
    "views.warning.number": "Des valeurs numériques ont changé. Vérifiez chaque nombre.",
    "views.warning.code": "Du code a changé. Vérifiez le code en ligne et les blocs de code.",
    "views.warning.claims": "Les modifications du texte peuvent changer le sens factuel ; vérifiez les affirmations avant d’accepter.",
    "views.proposalNoChanges": "Inchangé",
    "views.proposalSummaryLoading": "Résumé de cette modification…",
    "views.proposalSummaryUnavailable": "Aucun résumé court n’est disponible. Examinez les textes original et proposé ci-dessous.",
    "views.dismissProposal": "Écarter la proposition",
    "views.changeType.addition": "Ajout{separator}Modification {index} sur {total}",
    "views.changeType.removal": "Suppression{separator}Modification {index} sur {total}",
    "views.changeType.replacement": "Remplacement{separator}Modification {index} sur {total}",
    "views.decision.pending": "En attente",
    "views.decision.accepted": "Acceptée",
    "views.decision.rejected": "Rejetée",
    "views.selectChange": "Sélectionner la modification",
    "views.acceptSelected": "Accepter la sélection",
    "views.rejectProposal": "Rejeter la proposition",
    "views.styleProfile": "Profil de style",
    "views.styleIntro": "Votre corpus de style local n’est jamais envoyé intégralement ; seul le profil qui en est dérivé est utilisé.",
    "views.remove": "Retirer",
    "views.sampleName": "Nom de l’échantillon",
    "views.writingSample": "Échantillon d’écriture",
    "views.addToCorpus": "Ajouter au corpus",
    "views.translations": "Traductions",
    "views.translationStale": "L’article source a changé depuis la création de cette proposition de traduction.",
    "views.translationArticleStale": (
        "L’article source a changé depuis l’acceptation de cette traduction. Son texte a été conservé. Ouvrez " +
        "l’article source pour préparer une traduction actualisée."
    ),
    "views.translationFresh": "À jour",
    "views.translationOutdated": "Obsolète",
    "views.translationRefresh": "Actualiser",
    "views.translationRefreshTitle": "Actualiser la traduction ?",
    "views.translationRefreshTarget": "Traduction à actualiser",
    "views.translationRefreshDescription": (
        "Appliquer le texte en {language} examiné à {title} dans une nouvelle version enregistrée ? Son titre " +
        "reste inchangé et les versions antérieures restent disponibles dans l’historique."
    ),
    "views.translationRefreshConfirm": "Actualiser",
    "views.translationRefreshDraft": "Enregistrez ou abandonnez le brouillon de la traduction avant de l’actualiser.",
    "views.translationRefreshUnavailable": (
        "Impossible d’actualiser la traduction, car sa proposition est indisponible. Générez une nouvelle " +
        "traduction et examinez-la de nouveau."
    ),
    "views.translationRefreshFailed": (
        "Impossible d’actualiser la traduction. Enregistrez ou abandonnez son brouillon, vérifiez que la " +
        "source et la traduction n’ont pas changé, puis examinez de nouveau la proposition."
    ),
    "views.translationEmptyTitle": "Aucune proposition de traduction",
    "views.translationEmpty": "Demandez à l’assistant éditorial de traduire cet article.",
    "views.translate": "Nouvelle traduction…",
    "views.translationDialogTitle": "Nouvelle traduction",
    "views.translationTargets": "Générez une traduction, puis examinez-la ici. Les résultats précédents sont conservés.",
    "views.translationTargetsEmpty": "Générez une traduction, puis examinez-la ici. Les résultats précédents sont conservés.",
    "views.translationGenerateDescription": "Traduire {title}, version source enregistrée {revisionId}.",
    "views.translationGenerateDraft": "Votre brouillon non enregistré sera enregistré comme nouvelle version avant la génération.",
    "views.translationGenerateTargets": "Langues cibles",
    "views.translationGenerateConfirm": "Traduire en {languages}",
    "views.translationGenerateBatch": "Traduire en {count, number} langues",
    "views.translationPreservation": (
        "Les résultats et articles existants sont conservés. L’actualisation d’un article traduit nécessite " +
        "une confirmation distincte."
    ),
    "views.translationGenerationActive": "Une demande est en cours. Attendez sa fin ou annulez-la avant de générer des traductions.",
    "views.translationChooseTargets": "Choisissez au moins une langue cible pour continuer.",
    "views.translationContextChanged": "La source a changé. Examinez la source actualisée avant de confirmer de nouveau.",
    "views.translationReviewSource": "Examiner la source actualisée",
    "views.translationResultSelector": "Résultat de traduction",
    "views.translationResultOption": "v{number}{separator}{date}{separator}{description}",
    "views.translationLinkedIdentity": "Article {articleId}, version source enregistrée {revisionId}",
    "views.translationLinkedTarget": "{title}, article {articleId}, version source enregistrée {revisionId}",
    "views.sourceLinkedPrefix": "Cette traduction est liée à",
    "views.sourceLinkedRevision": "à la version source enregistrée {revisionNumber}.",
    "views.existingTranslations": "Traductions existantes",
    "views.openTranslation": "{language} : {title}",
    "views.translationPair": "Source en {source} → traduction en {target}",
    "views.translationOriginal": "Original",
    "views.translationResult": "Traduction en {language}",
    "views.translationDisplayMode": "Mode d’affichage des traductions",
    "views.translationSideBySide": "Côte à côte",
    "views.translationAligned": "Paragraphes alignés",
    "views.translationMissingOriginal": "Aucun paragraphe original correspondant.",
    "views.translationMissingResult": "Aucun paragraphe traduit correspondant.",
    "views.translationProtectedValue": "Contenu protégé validé : {value}",
    "views.translationProtectedExplanation": (
        "Marqué pour être conservé à l’identique dans cette traduction. {count, plural, one {L’occurrence " +
        "attendue est présente et inchangée} other {Les # occurrences attendues sont toutes présentes et " +
        "inchangées}} dans le texte traduit. Cette vérification est indicative ; examinez la traduction avant " +
        "de l’accepter."
    ),
    "views.translationComparison": (
        "Comparaison des traductions. Utilisez les flèches gauche et droite pour atteindre le contenu protégé " +
        "validé, Entrée ou Espace pour les détails, et Échap pour les fermer."
    ),
    "views.translationGenerating": "Traduction…",
    "views.translationGeneratingLanguages": "Traduction en {languages}…",
    "views.translationProtectedWarning": "Contenu protégé modifié ou manquant",
    "views.translationPublishingGuidance": "Indications du profil {profile}",
    "views.editTranslation": "Modifier",
    "views.rejectTranslation": "Rejeter",
    "views.rejectTranslationTitle": "Rejeter cette traduction ?",
    "views.rejectTranslationDescription": (
        "Retire la traduction en {language} générée des éléments à approuver. Votre article source et les " +
        "traductions acceptées restent inchangés."
    ),
    "views.confirmRejectTranslation": "Rejeter",
    "views.characterCount": "{count} / {limit} caractères",
    "views.restoreHeading": "Restaurer la version enregistrée ?",
    "views.restoreDescription": "La restauration crée une nouvelle version enregistrée immuable ; elle ne réécrit pas l’historique.",
    "views.restoreDraftDescription": (
        "Ce brouillon contient des modifications absentes des versions enregistrées. Enregistrez-le d’abord, " +
        "ou abandonnez-le avant la restauration."
    ),
    "views.restoreRevision": "Restaurer",
    "views.saveAndRestore": "Enregistrer et restaurer",
    "views.discardDraftAndRestore": "Abandonner et restaurer",
    "views.copy": "Copier",
} satisfies Partial<Record<MessageId, string>>;
