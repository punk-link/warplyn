import type { MessageId } from "../../messages.js";


export const settingsBackupsMessages = {
    "settings.automaticBackupFailed": (
        "La sauvegarde automatique a échoué. Vérifiez le dossier dans Données et sauvegardes, puis créez une sauvegarde" +
        " manuelle. Vos articles restent inchangés."
    ),
    "settings.automaticBackups": "Sauvegardes automatiques",
    "settings.automaticBackupsHint": (
        "Crée une sauvegarde peu après le démarrage, puis toutes les 24 heures à partir de cette sauvegarde t" +
        "ant que Warplyn reste ouvert. Les sauvegardes manuelles ne sont jamais supprimées automatiquement."
    ),
    "settings.backupAutomation": "Sauvegardes automatiques",
    "settings.backupCreateFailed": (
        "Impossible de créer la sauvegarde. Vérifiez le dossier choisi et les limites de taille du navigateur, puis rée" +
        "ssayez. Votre session d’édition reste inchangée."
    ),
    "settings.backupCreateUnavailable": "Les sauvegardes sont indisponibles dans cette session du navigateur.",
    "settings.backupCreated": "Sauvegarde créée : {name}",
    "settings.backupCreating": "Création de la sauvegarde…",
    "settings.backupFolder": "Dossier des sauvegardes",
    "settings.backupFolderFailed": "Impossible de choisir ce dossier. Réessayez.",
    "settings.backupFolderHint": "Choisissez un dossier local pour les copies de sauvegarde. Warplyn ne peut y écrire qu’après votre sélection.",
    "settings.backupFolderPermissionDenied": "Warplyn ne peut pas accéder à ce dossier de sauvegarde. Choisissez-le de nouveau et autorisez l’accès.",
    "settings.backupFolderRequired": "Choisissez d’abord un dossier de sauvegarde.",
    "settings.backupFolderSelected": "Dossier utilisé : {folderName}",
    "settings.backupFolderUnsupported": "Ce navigateur ne permet pas de choisir un dossier de sauvegarde.",
    "settings.backupSaveFailed": "Impossible d’enregistrer les paramètres de sauvegarde. Vos paramètres précédents restent inchangés. Réessayez.",
    "settings.backupStorage": "Stockage des sauvegardes",
    "settings.chooseBackup": "Choisir une sauvegarde",
    "settings.chooseBackupFolder": "Choisir…",
    "settings.createBackup": "Sauvegarder",
    "settings.createBackupHint": (
        "Sauvegarde vos articles, versions enregistrées, paramètres, compétences de l’auteur et leur historiq" +
        "ue. Les sauvegardes du navigateur prennent en charge des fichiers de 100 Mo maximum et 500 Mo au tot" +
        "al. Les clés API sont exclues."
    ),
    "settings.dataBackups": "Données",
    "settings.keepAllBackups": "Conserver toutes les sauvegardes",
    "settings.keepBackups": "Conserver {count} sauvegardes",
    "settings.restoreBackup": "Restaurer",
    "settings.restoreBackupConfirm": "Restaurer {name} ? Warplyn remplacera les données locales actives et se rechargera.",
    "settings.restoreBackupFailed": (
        "Impossible de restaurer cette sauvegarde. Vérifiez ses fichiers et les limites de taille du navigate" +
        "ur, ou choisissez une autre sauvegarde. Vos données actives restent inchangées."
    ),
    "settings.restoreBackupHint": (
        "Choisissez une sauvegarde dans le dossier sélectionné. Warplyn vérifie ses fichiers, conserve une co" +
        "pie de récupération, puis restaure ses articles, versions enregistrées, paramètres et compétences. L" +
        "es connexions à l’IA existantes restent locales. Les références aux variables d’environnement peuven" +
        "t être restaurées ; les clés API et les valeurs des variables ne sont jamais importées. Les ancienne" +
        "s sauvegardes ne contenant que la base de données conservent vos compétences actuelles."
    ),
    "settings.restoreBackupUnavailable": "Cette sauvegarde ne peut pas être restaurée.",
    "settings.retention": "Conservation des sauvegardes automatiques",
    "settings.retentionHint": (
        "Règle le nombre de sauvegardes automatiques conservées par Warplyn. Les sauvegardes manuelles ne sont jamais s" +
        "upprimées automatiquement."
    ),
    "settings.revealBackupFolder": "Afficher le dossier",
} satisfies Partial<Record<MessageId, string>>;
