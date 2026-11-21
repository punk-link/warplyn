import type { MessageId } from "../../messages.js";


export const settingsUpdatesMessages = {
    "settings.automaticUpdates": "Rechercher automatiquement les mises à jour",
    "settings.automaticUpdatesHint": (
        "Consulte GitHub au démarrage de Warplyn, puis chaque jour tant que l’application reste ouverte. Les " +
        "mises à jour ne sont téléchargées que lorsque vous choisissez Télécharger."
    ),
    "settings.checkNow": "Vérifier maintenant",
    "settings.restartAndUpdate": "Installer et relancer",
    "settings.updateChanges": "Nouveautés de la version {version}",
    "settings.updateChangesUnavailable": "Les détails de cette version sont indisponibles. Vous pouvez tout de même installer la mise à jour.",
    "settings.updateNetworkAccess": "Autoriser l’accès au réseau pour les mises à jour",
    "settings.updateNetworkAccessHint": (
        "Autorise Warplyn à contacter GitHub pour obtenir les métadonnées publiques des versions et les mises" +
        " à jour que vous choisissez de télécharger. Aucun contenu d’article, renseignement de compte, identi" +
        "fiant d’appareil ou donnée d’analyse n’est envoyé."
    ),
    "settings.updateNetworkPermissionDescription": (
        "Warplyn contactera api.github.com pour obtenir les métadonnées publiques des versions. Aucun contenu" +
        " d’article, renseignement de compte, identifiant d’appareil ou donnée d’analyse ne sera envoyé."
    ),
    "settings.updateNetworkPermissionTitle": "Autoriser Warplyn à rechercher les mises à jour sur GitHub ?",
    "settings.updateRecovery": "Récupération des mises à jour",
    "settings.updateStatus": "État des mises à jour",
    "settings.updateStatusHint": "Version actuelle : {version}",
    "settings.updateStatusUnavailableHint": "Les paramètres de mise à jour s’appliquent lorsque cette version prend en charge les mises à jour.",
    "settings.updates": "Mises à jour",
    "settings.updatesAvailable": "La version {version} est disponible.",
    "settings.updatesChecking": "Recherche des mises à jour…",
    "settings.updatesCurrent": "Vous disposez de la dernière version.",
    "settings.updatesError.apply_failed": "Impossible de préparer la mise à jour. Réessayez ou ouvrez l’aide à la récupération des mises à jour.",
    "settings.updatesError.discovery_failed": "Impossible de rechercher les mises à jour. Réessayez.",
    "settings.updatesError.download_failed": "Impossible de télécharger la mise à jour. Réessayez.",
    "settings.updatesNetworkAccessRequired": "Autorisez l’accès au réseau pour rechercher des mises à jour.",
    "settings.updatesUnavailable": "Les mises à jour ne sont pas disponibles dans cette version.",
    "settings.viewReleaseNotes": "Notes de version",
    "settings.windowsUpdateDownloadHint": (
        "Télécharger une mise à jour autorise aussi son installation. Une fois téléchargée, elle sera appliqu" +
        "ée automatiquement au prochain démarrage de Warplyn, même après une fermeture normale de l’applicati" +
        "on."
    ),
} satisfies Partial<Record<MessageId, string>>;
