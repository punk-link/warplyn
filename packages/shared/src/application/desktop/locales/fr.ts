import type { ElectronMessages } from "../electron-messages.js";

export const fr: ElectronMessages = {
    "electron.spelling.addWord": "Ajouter au dictionnaire",
    "electron.articleFiles.markdown": "Fichiers Markdown",
    "electron.articleFiles.html": "Fichiers HTML",
    "electron.articleFiles.docx": "Fichiers Word",
    "electron.articleFiles.rtf": "Fichiers texte enrichi",
    "electron.articleFiles.load": "Charger l’article depuis un fichier",
    "electron.articleFiles.save": "Enregistrer l’article dans un fichier",
    "electron.draftCheckpointFailed.title": "Échec du point de contrôle",
    "electron.draftCheckpointFailed.message": "Warplyn n’a pas pu enregistrer le dernier point de contrôle.",
    "electron.draftCheckpointFailed.detail": "Revenez à l’article et réessayez, ou quittez sans les dernières modifications non enregistrées.",
    "electron.draftCheckpointFailed.return": "Revenir à l’article",
    "electron.draftCheckpointFailed.quit": "Quitter sans le dernier point de contrôle",
    "electron.closeFailed.title": "Warplyn n’a pas pu se fermer correctement",
    "electron.closeFailed.message": "Le point de contrôle est terminé, mais la base de données locale ne s’est pas fermée correctement.",
    "electron.startFailed.title": "Warplyn n’a pas pu démarrer",
    "electron.startFailed.message": "Vérifiez que le dossier des données locales est disponible, puis réessayez.",
    "electron.deleteData.title": "Supprimer toutes les données locales de Warplyn ?",
    "electron.deleteData.message": (
        "Supprime définitivement les articles, les points de contrôle, les versions enregistrées, " +
        "l’historique de l’assistant, les données de style, les paramètres et les sauvegardes locales du " +
        "dossier de données de Warplyn."
    ),
    "electron.deleteData.detail": (
        "Warplyn se fermera après la suppression. Vous pouvez d’abord créer une sauvegarde si un dossier de " +
        "sauvegarde est configuré."
    ),
    "electron.deleteData.backup": "Créer une sauvegarde avant la suppression",
    "electron.deleteData.delete": "Supprimer toutes les données locales",
    "electron.deleteData.cancel": "Annuler",
    "electron.restoreBackup.title": "Restaurer cette sauvegarde ?",
    "electron.restoreBackup.message": "Remplace vos données locales actives de Warplyn par la sauvegarde choisie.",
    "electron.restoreBackup.detail": (
        "Warplyn enregistrera les derniers points de contrôle, conservera une copie de récupération des " +
        "données actives, puis redémarrera. Les connexions à l’IA existantes restent locales. Les références " +
        "aux variables d’environnement peuvent être restaurées ; les clés API et les valeurs des variables ne " +
        "sont jamais importées. Cette action ne peut pas être annulée depuis les paramètres."
    ),
    "electron.restoreBackup.restore": "Restaurer et redémarrer",
    "electron.restoreBackup.cancel": "Annuler",
    "electron.restoreFailed.title": "Impossible de restaurer la sauvegarde",
    "electron.restoreFailed.message": (
        "Fermez les autres fenêtres de Warplyn ou les serveurs de développement locaux qui utilisent ces " +
        "données, puis réessayez. Vos données actives restent inchangées."
    ),
};
