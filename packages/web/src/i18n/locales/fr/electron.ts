import type { MessageId } from "../../messages.js";


export const electronMessages = {
    "electron.articleFiles.docx": "Fichiers Word",
    "electron.articleFiles.html": "Fichiers HTML",
    "electron.articleFiles.load": "Charger l’article depuis un fichier",
    "electron.articleFiles.markdown": "Fichiers Markdown",
    "electron.articleFiles.rtf": "Fichiers texte enrichi",
    "electron.articleFiles.save": "Enregistrer l’article dans un fichier",
    "electron.closeFailed.message": "Le point de contrôle est terminé, mais la base de données locale ne s’est pas fermée correctement.",
    "electron.closeFailed.title": "Warplyn n’a pas pu se fermer correctement",
    "electron.deleteData.backup": "Créer une sauvegarde avant la suppression",
    "electron.deleteData.cancel": "Annuler",
    "electron.deleteData.delete": "Supprimer toutes les données locales",
    "electron.deleteData.detail": (
        "Warplyn se fermera après la suppression. Vous pouvez d’abord créer une sauvegarde si un dossier de sauvegarde " +
        "est configuré."
    ),
    "electron.deleteData.message": (
        "Supprime définitivement les articles, les points de contrôle, les versions enregistrées, l’historiqu" +
        "e de l’assistant, les données de style, les paramètres et les sauvegardes locales du dossier de donn" +
        "ées de Warplyn."
    ),
    "electron.deleteData.title": "Supprimer toutes les données locales de Warplyn ?",
    "electron.draftCheckpointFailed.detail": "Revenez à l’article et réessayez, ou quittez sans les dernières modifications non enregistrées.",
    "electron.draftCheckpointFailed.message": "Warplyn n’a pas pu enregistrer le dernier point de contrôle.",
    "electron.draftCheckpointFailed.quit": "Quitter sans le dernier point de contrôle",
    "electron.draftCheckpointFailed.return": "Revenir à l’article",
    "electron.draftCheckpointFailed.title": "Échec du point de contrôle",
    "electron.restoreBackup.cancel": "Annuler",
    "electron.restoreBackup.detail": (
        "Warplyn enregistrera les derniers points de contrôle, conservera une copie de récupération des donné" +
        "es actives, puis redémarrera. Les connexions à l’IA existantes restent locales. Les références aux v" +
        "ariables d’environnement peuvent être restaurées ; les clés API et les valeurs des variables ne sont" +
        " jamais importées. Cette action ne peut pas être annulée depuis les paramètres."
    ),
    "electron.restoreBackup.message": "Remplace vos données locales actives de Warplyn par la sauvegarde choisie.",
    "electron.restoreBackup.restore": "Restaurer et redémarrer",
    "electron.restoreBackup.title": "Restaurer cette sauvegarde ?",
    "electron.restoreFailed.message": (
        "Fermez les autres fenêtres de Warplyn ou les serveurs de développement locaux qui utilisent ces donn" +
        "ées, puis réessayez. Vos données actives restent inchangées."
    ),
    "electron.restoreFailed.title": "Impossible de restaurer la sauvegarde",
    "electron.spelling.addWord": "Ajouter au dictionnaire",
    "electron.startFailed.message": "Vérifiez que le dossier des données locales est disponible, puis réessayez.",
    "electron.startFailed.title": "Warplyn n’a pas pu démarrer",
} satisfies Partial<Record<MessageId, string>>;
