import type { MessageId } from "../../messages.js";

export const settingsMessages2 = {
    "settings.telemetryDetails": "Détails de la télémétrie",
    "settings.telemetryIdentifier": "ID de télémétrie",
    "settings.telemetryIdentifierHint": (
        "Fournissez cet ID pour demander la suppression de vos données. Copiez-le avant de désactiver la " +
        "télémétrie, car la désactivation supprime l’ID."
    ),
    "settings.copyTelemetryIdentifier": "Copier l’ID de télémétrie",
    "settings.telemetryIdentifierCopied": "ID de télémétrie copié.",
    "settings.telemetrySaveFailed": "Impossible d’enregistrer ce choix. Votre réglage précédent reste inchangé. Réessayez.",
    "settings.telemetryUnavailable": "La télémétrie n’est disponible que dans une application distribuée configurée à cet effet.",
    "settings.saved": "Enregistré",
    "settings.loadingFailed": "Impossible de charger les paramètres. Vos paramètres enregistrés restent inchangés. Actualisez et réessayez.",
    "settings.saving": "Enregistrement…",
    "settings.saveFailed": "Impossible d’enregistrer vos paramètres. Vos paramètres précédents restent inchangés. Réessayez.",
    "settings.modelSaveFailed": "Impossible d’enregistrer les préférences de modèle. Vos paramètres précédents restent inchangés. Réessayez.",
    "settings.backupSaveFailed": "Impossible d’enregistrer les paramètres de sauvegarde. Vos paramètres précédents restent inchangés. Réessayez.",
    "settings.updates": "Mises à jour",
    "settings.updateNetworkAccess": "Autoriser l’accès au réseau pour les mises à jour",
    "settings.updateNetworkAccessHint": (
        "Autorise Warplyn à contacter GitHub pour obtenir les métadonnées publiques des versions et les mises " +
        "à jour que vous choisissez de télécharger. Aucun contenu d’article, renseignement de compte, " +
        "identifiant d’appareil ou donnée d’analyse n’est envoyé."
    ),
    "settings.updateNetworkPermissionTitle": "Autoriser Warplyn à rechercher les mises à jour sur GitHub ?",
    "settings.updateNetworkPermissionDescription": (
        "Warplyn contactera api.github.com pour obtenir les métadonnées publiques des versions. Aucun contenu " +
        "d’article, renseignement de compte, identifiant d’appareil ou donnée d’analyse ne sera envoyé."
    ),
    "settings.allowNetworkAccess": "Autoriser",
    "settings.automaticUpdates": "Rechercher automatiquement les mises à jour",
    "settings.automaticUpdatesHint": (
        "Consulte GitHub au démarrage de Warplyn, puis chaque jour tant que l’application reste ouverte. Les " +
        "mises à jour ne sont téléchargées que lorsque vous choisissez Télécharger."
    ),
    "settings.windowsUpdateDownloadHint": (
        "Télécharger une mise à jour autorise aussi son installation. Une fois téléchargée, elle sera " +
        "appliquée automatiquement au prochain démarrage de Warplyn, même après une fermeture normale de " +
        "l’application."
    ),
    "settings.includePrereleaseUpdates": "Inclure les préversions",
    "settings.includePrereleaseUpdatesHint": "Si cette option est désactivée, Warplyn ne propose que les versions stables.",
    "settings.updateStatus": "État des mises à jour",
    "settings.updateStatusHint": "Version actuelle : {version}",
    "settings.updateStatusUnavailableHint": "Les paramètres de mise à jour s’appliquent lorsque cette version prend en charge les mises à jour.",
    "settings.updatesChecking": "Recherche des mises à jour…",
    "settings.updatesCurrent": "Vous disposez de la dernière version.",
    "settings.updatesNetworkAccessRequired": "Autorisez l’accès au réseau pour rechercher des mises à jour.",
    "settings.updatesUnavailable": "Les mises à jour ne sont pas disponibles dans cette version.",
    "settings.updatesAvailable": "La version {version} est disponible.",
    "settings.updatesError.discovery_failed": "Impossible de rechercher les mises à jour. Réessayez.",
    "settings.updatesError.download_failed": "Impossible de télécharger la mise à jour. Réessayez.",
    "settings.updatesError.apply_failed": "Impossible de préparer la mise à jour. Réessayez ou ouvrez l’aide à la récupération des mises à jour.",
    "settings.checkNow": "Vérifier maintenant",
    "settings.viewReleaseNotes": "Voir les notes de version",
    "settings.updateChanges": "Nouveautés de la version {version}",
    "settings.securityUpdate": "Mise à jour de sécurité",
    "settings.updateChangesUnavailable": "Les détails de cette version sont indisponibles. Vous pouvez tout de même installer la mise à jour.",
    "settings.downloadUpdate": "Télécharger",
    "settings.restartAndUpdate": "Redémarrer et mettre à jour",
    "settings.retry": "Réessayer",
    "settings.updateRecovery": "Récupération des mises à jour",
    "settings.on": "Activé",
    "settings.modelsLoadFailed": "Impossible de charger les modèles disponibles. Vos paramètres n’ont pas été modifiés. Réessayez.",
    "settings.connectionAddFailed": (
        "Impossible d’ajouter cette connexion à l’IA. Vos paramètres n’ont pas été modifiés. Vérifiez les " +
        "détails et réessayez."
    ),
    "settings.connectionUpdateFailed": "Impossible de mettre à jour cette connexion à l’IA. Vos paramètres précédents restent inchangés. Réessayez.",
    "settings.connectionRemoveFailed": "Impossible de retirer cette connexion à l’IA. Elle reste disponible dans les paramètres. Réessayez.",
    "settings.publishingSaveFailed": "Impossible d’enregistrer les paramètres de publication. Vos paramètres précédents restent inchangés. Réessayez.",
    "settings.customProfileName": "Nom du profil personnalisé",
    "settings.customProfileNameHint": "Le nom local de votre limite de publication personnalisée.",
    "settings.customProfileLimit": "Limite de caractères personnalisée",
    "settings.customProfileLimitHint": "Une limite indicative supérieure ou égale à zéro. Elle ne bloque jamais la copie.",
    "settings.customProfileInvalid": "Saisissez un nom et une limite de caractères entière supérieure ou égale à zéro.",
    "settings.saveCustomProfile": "Enregistrer le profil personnalisé",
    "settings.customProfiles": "Profils personnalisés",
    "settings.customProfilesHint": "Ajoutez autant de profils locaux de limite de caractères que nécessaire.",
    "settings.addCustomProfile": "Ajouter un profil personnalisé",
    "settings.remove": "Retirer",
    "settings.removeCustomProfile": "Retirer {name}",
    "settings.removeCustomProfileTitle": "Retirer le profil personnalisé ?",
    "settings.removeCustomProfileDescription": "Retirer <profile>{name}</profile> de vos profils de publication locaux ?",
    "settings.removeCustomDefaultDescription": "Retirer <profile>{name}</profile> ? Le profil de publication par défaut redeviendra le profil Par défaut.",
    "settings.defaultAssistantEditMode": "Mode de retouche par défaut de l’assistant",
    "settings.defaultAssistantEditModeHint": (
        "Les nouvelles conversations d’article utilisent ce mode ; les conversations existantes conservent le " +
        "leur. Le mode direct évite l’examen des propositions uniquement pour les retouches que vous demandez " +
        "explicitement. Les autres propositions doivent toujours être examinées."
    ),
    "settings.assistantBehavior": "Retouches et demandes",
    "settings.showExecutionProgress": "Afficher la progression",
    "settings.showExecutionProgressHint": "Affiche l’action en cours et un historique d’activité repliable dans la conversation avec l’assistant.",
} satisfies Partial<Record<MessageId, string>>;
