import type { MessageId } from "../../messages.js";


export const errorsMessages = {
    "errors.activeConnectionRemovalBlocked": "Choisissez une autre connexion active à l’IA avant de retirer celle-ci.",
    "errors.activeConnectionRequired": "Ajoutez et sélectionnez d’abord une connexion à l’IA.",
    "errors.aiConnectionNotFound": "Impossible de trouver cette connexion à l’IA. Choisissez-en une autre et réessayez.",
    "errors.aiConnectionVerificationFailed": "Le fournisseur d’IA n’a pas pu vérifier cette connexion. Vérifiez la variable et sa clé, puis réessayez.",
    "errors.articleNotFound": "Impossible de trouver cet article. Sélectionnez un article existant et réessayez.",
    "errors.assistantCheckpointConflict": "La conversation avec l’assistant a changé. Examinez les détails de restauration actualisés et réessayez.",
    "errors.assistantCheckpointInvalid": "Ce point de reprise de la conversation n’est plus disponible. Choisissez un autre message de l’auteur.",
    "errors.assistantCoordinatorFailed": "Impossible de terminer cette action de l’assistant. Votre article n’a pas été modifié. Réessayez.",
    "errors.assistantEditConflict": "L’article ou le brouillon a changé. Enregistrez ou résolvez le travail actuel, puis demandez une nouvelle retouche.",
    "errors.assistantEditInvalid": (
        "L’assistant n’a pas pu produire un remplacement fiable. Votre article n’a pas été modifié. Essayez une sélecti" +
        "on plus restreinte ou une consigne plus précise."
    ),
    "errors.assistantRequestConflict": "Cette action de l’assistant est déjà en cours. Attendez sa fin avant de réessayer.",
    "errors.assistantRequestTimedOut": (
        "Cette demande à l’assistant a atteint sa durée maximale. Votre article n’a pas été modifié. Réessaye" +
        "z ou augmentez la durée maximale dans les paramètres généraux."
    ),
    "errors.assistantRetryInvalid": "Cette action de l’assistant ne peut pas être relancée. Démarrez-la de nouveau depuis l’assistant.",
    "errors.assistantSelectionInvalid": "Cette sélection ne convient pas à cette action de l’assistant. Modifiez-la et réessayez.",
    "errors.assistantSkillScopeIncompatible": "Cette action de l’assistant ne peut pas utiliser cette sélection. Modifiez-la et réessayez.",
    "errors.assistantSkillUnsupported": "Cette action de l’assistant est indisponible. Choisissez une autre action.",
    "errors.duplicateStyleCorpusItem": "Ce texte figure déjà dans le corpus de style.",
    "errors.editorialConfigurationMissing": (
        "Impossible de démarrer cette action assistée par l’IA. Choisissez un modèle compatible dans les paramètres, pu" +
        "is réessayez."
    ),
    "errors.editorialOperationUnsupported": "Cette action assistée par l’IA est indisponible. Choisissez une autre action.",
    "errors.editorialProviderFailed": (
        "Impossible de terminer cette action assistée par l’IA. Votre article n’a pas été modifié. Réessayez ou vérifie" +
        "z votre connexion à l’IA dans les paramètres."
    ),
    "errors.editorialRequestFailed": (
        "Impossible de terminer cette action assistée par l’IA. Votre article n’a pas été modifié. Réessayez ou vérifie" +
        "z votre connexion à l’IA dans les paramètres."
    ),
    "errors.editorialStreamIncomplete": "Impossible de terminer cette action assistée par l’IA. Votre article n’a pas été modifié. Réessayez.",
    "errors.environmentVariableUnavailable": "La variable {environmentVariableName} est indisponible. Ajoutez-la, puis réessayez.",
    "errors.factCorrectionSelectionInvalid": (
        "Impossible de préparer les corrections, car les observations choisies sont obsolètes ou doivent être" +
        " examinées. Relancez la vérification des faits, puis sélectionnez les observations contestées ou inv" +
        "érifiables non résolues."
    ),
    "errors.generic": "Impossible de terminer cette action. Votre article n’a pas été modifié. Réessayez.",
    "errors.invalidEnvironmentVariableName": (
        "Saisissez un nom de variable d’environnement avec des majuscules, des chiffres et des traits de soul" +
        "ignement."
    ),
    "errors.invalidJson": "Impossible de terminer cette action, car certaines informations ne sont pas valides. Vérifiez-les et réessayez.",
    "errors.invalidKeyBinding": "Saisissez un raccourci complet comprenant une touche autre qu’une touche de modification.",
    "errors.invalidRequest": "Impossible de terminer cette action, car certaines informations ne sont pas valides. Vérifiez-les et réessayez.",
    "errors.keyBindingConflict": "Choisissez un raccourci qui n’est pas déjà affecté.",
    "errors.managedCredentialMissing": (
        "Cette connexion ne possède pas de clé API dans Warplyn. Ajoutez une nouvelle connexion par clé API e" +
        "t sélectionnez-la pour vos modèles, puis retirez cette ancienne connexion."
    ),
    "errors.managedCredentialsUnavailable": (
        "Le stockage sécurisé des identifiants est indisponible sur cet appareil. Choisissez plutôt Variable d’environn" +
        "ement."
    ),
    "errors.originNotPermitted": "Impossible de terminer cette action dans cette fenêtre. Rouvrez Warplyn et réessayez.",
    "errors.proposalEditInvalid": (
        "Impossible d’appliquer votre proposition modifiée. Votre article n’a pas été modifié. Conservez les " +
        "nombres, liens, code et termes techniques proposés, puis réessayez. Si la proposition est indisponib" +
        "le, générez-en une nouvelle."
    ),
    "errors.requestTooLarge": "Impossible de terminer cette action, car le contenu choisi est trop volumineux. Réduisez-le et réessayez.",
    "errors.resourceNotFound": "Impossible de trouver les éléments nécessaires à cette action. Actualisez Warplyn et réessayez.",
    "errors.revisionConflict": (
        "Impossible d’enregistrer, car cet article a été modifié entre-temps. Vos dernières modifications son" +
        "t toujours dans l’éditeur ; examinez le conflit et réessayez."
    ),
    "errors.revisionNotFound": "Impossible de trouver cette version enregistrée. Choisissez-en une autre et réessayez.",
    "errors.skillPackageConflict": (
        "Cette compétence a changé ou son ID ou son nom est déjà utilisé. Rechargez la liste des compétences," +
        " choisissez un nom disponible si nécessaire, puis réessayez."
    ),
    "errors.skillRevisionNotFound": (
        "Cette version enregistrée de la compétence est indisponible. Affichez de nouveau ses versions et choisissez-en" +
        " une qui existe."
    ),
    "errors.styleCorpusRequired": "Ajoutez au moins un élément au corpus de style avant de vérifier le style.",
    "errors.targetLanguageRequired": "Choisissez une langue cible avant de demander une traduction.",
    "errors.unsupportedPublishingProfile": "Choisissez un profil de publication pris en charge.",
} satisfies Partial<Record<MessageId, string>>;
