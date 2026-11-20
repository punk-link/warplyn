import type { MessageId } from "../../messages.js";


export const styleProfileMessages = {
    "styleProfile.activeSources": "{count, plural, one {# source active} other {# sources actives}}",
    "styleProfile.add": "Ajouter",
    "styleProfile.addRevision": "Ajouter cet article",
    "styleProfile.addRevisionDescription": (
        "Choisissez une version enregistrée à ajouter comme échantillon d’écriture. Une copie distincte et immuable ser" +
        "a créée, sans modifier l’article."
    ),
    "styleProfile.addRevisionTitle": "Ajouter cet article au corpus de style ?",
    "styleProfile.addWritingSample": "Ajouter un échantillon d’écriture",
    "styleProfile.addedDate": "Ajouté le {date}",
    "styleProfile.articleRules": "Règles propres à cet article",
    "styleProfile.confirmAddRevision": "Ajouter au corpus",
    "styleProfile.confirmRemove": "Retirer l’échantillon",
    "styleProfile.corpusHint": (
        "Gardez au moins 3 à 5 échantillons représentatifs actifs. Des échantillons variés fournissent au profil le con" +
        "texte nécessaire pour refléter votre voix."
    ),
    "styleProfile.detectedCharacteristics": "Caractéristiques détectées",
    "styleProfile.detectedEmpty": "Construisez un profil pour voir les caractéristiques détectées.",
    "styleProfile.detectedHint": (
        "La détection porte sur la voix, le rythme, le vocabulaire, la structure, les transitions et les expressions ré" +
        "currentes de vos échantillons locaux."
    ),
    "styleProfile.generatingSourceName": "Génération du nom de source",
    "styleProfile.include": "Inclure",
    "styleProfile.invalidFile": "Choisissez un fichier .txt ou .md.",
    "styleProfile.lowConfidence": (
        "Ce profil repose sur peu de sources. La révision du style est disponible, mais ses observations peuv" +
        "ent être incertaines."
    ),
    "styleProfile.manualRules": "Règles manuelles",
    "styleProfile.navigation": "Sections du profil de style",
    "styleProfile.none": "Aucun profil construit pour le moment",
    "styleProfile.outdated": "Obsolète",
    "styleProfile.paste": "Texte de l’échantillon",
    "styleProfile.phrasesToAvoid": "Expressions à éviter",
    "styleProfile.profileContributors": "Sources du profil actuel",
    "styleProfile.profileLastRebuilt": "Dernière reconstruction",
    "styleProfile.profileSourceCount": "{count, plural, one {# source} other {# sources}}",
    "styleProfile.profileUpdated": "Dernière reconstruction le {date}",
    "styleProfile.rebuild": "Reconstruire le profil",
    "styleProfile.rebuilt": "Profil reconstruit à partir de {count, plural, one {# source active} other {# sources actives}}.",
    "styleProfile.removeConfirmationDescription": "Cet échantillon sera retiré de votre corpus de style local.",
    "styleProfile.removeConfirmationTitle": "Retirer l’échantillon d’écriture ?",
    "styleProfile.required": "Collez du texte avant l’ajout.",
    "styleProfile.review": "Révision du style",
    "styleProfile.reviewEvidence": "Fondé sur {sources}",
    "styleProfile.revision": "Version enregistrée {number}",
    "styleProfile.rules": "Règles de style globales",
    "styleProfile.rulesApplied": "Appliquées dans la révision du style.",
    "styleProfile.rulesNone": "Aucune règle personnalisée.",
    "styleProfile.rulesUnsaved": "Modifications non enregistrées.",
    "styleProfile.saveRules": "Enregistrer les règles",
    "styleProfile.savedRevision": "Version enregistrée",
    "styleProfile.showProfileSources": "Afficher les sources",
    "styleProfile.sourceName": "Nom de la source",
    "styleProfile.sourceNameHint": "Laissez ce champ vide pour générer un nom de source avec votre modèle de texte.",
    "styleProfile.staleReview": "Cette révision du style concerne une version enregistrée antérieure.",
    "styleProfile.summary": "Version {version}{separator}confiance : {confidence}",
    "styleProfile.thisArticle": "Cet article",
    "styleProfile.trait.compactSentences": "Phrases compactes. {evidence}",
    "styleProfile.trait.conversationalContractions": "Contractions de la langue parlée. {evidence}",
    "styleProfile.trait.developedParagraphs": "Paragraphes développés. {evidence}",
    "styleProfile.trait.formalExpandedPhrasing": "Formulations développées et soutenues. {evidence}",
    "styleProfile.trait.frequentParagraphBreaks": "Sauts de paragraphe fréquents. {evidence}",
    "styleProfile.trait.impersonalExplanatoryVoice": "Voix explicative impersonnelle. {evidence}",
    "styleProfile.trait.longDevelopedSentences": "Phrases longues et développées. {evidence}",
    "styleProfile.trait.moderateSentenceLength": "Phrases de longueur modérée. {evidence}",
    "styleProfile.trait.personalAuthorPresence": "Présence personnelle de l’auteur. {evidence}",
    "styleProfile.trait.rhythm": "Rythme",
    "styleProfile.trait.structure": "Structure",
    "styleProfile.trait.transitions": "Transitions",
    "styleProfile.trait.unknown": "{label}. {evidence}",
    "styleProfile.trait.usesExplicitTransitions": "Transitions explicites. {evidence}",
    "styleProfile.trait.usesFewExplicitTransitions": "Peu de transitions explicites. {evidence}",
    "styleProfile.trait.vocabulary": "Vocabulaire",
    "styleProfile.trait.voice": "Voix",
    "styleProfile.upload": "Importer .txt / .md",
    "styleProfile.words": "{count, plural, one {# mot} other {# mots}}",
    "styleProfile.writingSamples": "Échantillons d’écriture",
} satisfies Partial<Record<MessageId, string>>;
