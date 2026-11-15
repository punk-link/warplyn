import type { MessageId } from "../../messages.js";

export const styleProfileMessages = {
    "styleProfile.summary": "Version {version}{separator}confiance : {confidence}",
    "styleProfile.none": "Aucun profil construit pour le moment",
    "styleProfile.outdated": "Obsolète",
    "styleProfile.include": "Inclure",
    "styleProfile.rules": "Règles de style globales",
    "styleProfile.saveRules": "Enregistrer les règles",
    "styleProfile.rulesApplied": "Appliquées dans la révision du style.",
    "styleProfile.rulesUnsaved": "Modifications non enregistrées.",
    "styleProfile.rulesNone": "Aucune règle personnalisée.",
    "styleProfile.rebuild": "Reconstruire le profil",
    "styleProfile.add": "Ajouter",
    "styleProfile.addWritingSample": "Ajouter un échantillon d’écriture",
    "styleProfile.sourceName": "Nom de la source",
    "styleProfile.sourceNameHint": "Laissez ce champ vide pour générer un nom de source avec votre modèle de texte.",
    "styleProfile.generatingSourceName": "Génération du nom de source",
    "styleProfile.paste": "Texte de l’échantillon",
    "styleProfile.upload": "Importer .txt / .md",
    "styleProfile.addRevision": "Ajouter cet article",
    "styleProfile.addRevisionTitle": "Ajouter cet article au corpus de style ?",
    "styleProfile.addRevisionDescription": (
        "Choisissez une version enregistrée à ajouter comme échantillon d’écriture. Une copie distincte et " +
        "immuable sera créée, sans modifier l’article."
    ),
    "styleProfile.confirmAddRevision": "Ajouter au corpus",
    "styleProfile.savedRevision": "Version enregistrée",
    "styleProfile.revision": "Version enregistrée {number}",
    "styleProfile.required": "Collez du texte avant l’ajout.",
    "styleProfile.corpusHint": (
        "Gardez au moins 3 à 5 échantillons représentatifs actifs. Des échantillons variés fournissent au " +
        "profil le contexte nécessaire pour refléter votre voix."
    ),
    "styleProfile.detectedHint": (
        "La détection porte sur la voix, le rythme, le vocabulaire, la structure, les transitions et les " +
        "expressions récurrentes de vos échantillons locaux."
    ),
    "styleProfile.detectedEmpty": "Construisez un profil pour voir les caractéristiques détectées.",
    "styleProfile.invalidFile": "Choisissez un fichier .txt ou .md.",
    "styleProfile.staleReview": "Cette révision du style concerne une version enregistrée antérieure.",
    "styleProfile.review": "Révision du style",
    "styleProfile.trait.voice": "Voix",
    "styleProfile.trait.rhythm": "Rythme",
    "styleProfile.trait.structure": "Structure",
    "styleProfile.trait.vocabulary": "Vocabulaire",
    "styleProfile.trait.transitions": "Transitions",
    "styleProfile.trait.personalAuthorPresence": "Présence personnelle de l’auteur. {evidence}",
    "styleProfile.trait.impersonalExplanatoryVoice": "Voix explicative impersonnelle. {evidence}",
    "styleProfile.trait.compactSentences": "Phrases compactes. {evidence}",
    "styleProfile.trait.longDevelopedSentences": "Phrases longues et développées. {evidence}",
    "styleProfile.trait.moderateSentenceLength": "Phrases de longueur modérée. {evidence}",
    "styleProfile.trait.frequentParagraphBreaks": "Sauts de paragraphe fréquents. {evidence}",
    "styleProfile.trait.developedParagraphs": "Paragraphes développés. {evidence}",
    "styleProfile.trait.conversationalContractions": "Contractions de la langue parlée. {evidence}",
    "styleProfile.trait.formalExpandedPhrasing": "Formulations développées et soutenues. {evidence}",
    "styleProfile.trait.usesExplicitTransitions": "Transitions explicites. {evidence}",
    "styleProfile.trait.usesFewExplicitTransitions": "Peu de transitions explicites. {evidence}",
    "styleProfile.trait.unknown": "{label}. {evidence}",
    "styleProfile.words": "{count, plural, one {# mot} other {# mots}}",
    "styleProfile.addedDate": "Ajouté le {date}",
    "styleProfile.removeConfirmationTitle": "Retirer l’échantillon d’écriture ?",
    "styleProfile.removeConfirmationDescription": "Cet échantillon sera retiré de votre corpus de style local.",
    "styleProfile.confirmRemove": "Retirer l’échantillon",
    "styleProfile.activeSources": "{count, plural, one {# source active} other {# sources actives}}",
    "styleProfile.profileContributors": "Sources du profil actuel",
    "styleProfile.profileSourceCount": "{count, plural, one {# source} other {# sources}}",
    "styleProfile.showProfileSources": "Afficher les sources",
    "styleProfile.profileUpdated": "Dernière reconstruction le {date}",
    "styleProfile.profileLastRebuilt": "Dernière reconstruction",
    "styleProfile.reviewEvidence": "Fondé sur {sources}",
    "styleProfile.rebuilt": "Profil reconstruit à partir de {count, plural, one {# source active} other {# sources actives}}.",
    "styleProfile.phrasesToAvoid": "Expressions à éviter",
    "styleProfile.manualRules": "Règles manuelles",
    "styleProfile.navigation": "Sections du profil de style",
    "styleProfile.writingSamples": "Échantillons d’écriture",
    "styleProfile.detectedCharacteristics": "Caractéristiques détectées",
    "styleProfile.thisArticle": "Cet article",
    "styleProfile.articleRules": "Règles propres à cet article",
    "styleProfile.lowConfidence": (
        "Ce profil repose sur peu de sources. La révision du style est disponible, mais ses observations " +
        "peuvent être incertaines."
    ),
} satisfies Partial<Record<MessageId, string>>;
