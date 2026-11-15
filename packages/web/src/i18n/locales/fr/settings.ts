import type { MessageId } from "../../messages.js";

export const settingsMessages = {
    "settings.spelling": "Orthographe",
    "settings.assistantRequestTimeout": "Durée maximale des demandes",
    "settings.assistantRequestTimeoutHint": (
        "Interrompt les demandes à l’assistant après cette durée. S’applique aux nouvelles demandes, y " +
        "compris aux nouvelles tentatives. Votre article reste inchangé en cas de dépassement."
    ),
    "settings.requestTimeoutMinutes": "{minutes, plural, one {# minute} other {# minutes}}",
    "settings.requestTimeoutUnlimited": "Illimitée",
    "settings.animations": "Animations",
    "settings.animationsHint": (
        "Anime les indicateurs, les messages de l’assistant et les effets de l’interface. Le réglage de " +
        "réduction des animations de votre appareil reste respecté."
    ),
    "settings.general.interfaceLocale.english": "Anglais",
    "settings.navigation": "Navigation des paramètres",
    "settings.backToWorkspace": "Retour à l’espace de travail",
    "settings.general": "Général",
    "settings.keyBindings": "Raccourcis clavier",
    "settings.keyBindingsIntro": (
        "Choisissez les raccourcis de Warplyn sur cet ordinateur. Les modifications s’appliquent aux " +
        "utilisations suivantes et ne modifient jamais un article."
    ),
    "settings.keyBindingCategory.general": "Général",
    "settings.keyBindingCategory.editing": "Édition",
    "settings.keyBindingCategory.workspace": "Panneaux et vues",
    "settings.keyBindingCategory.window": "Fenêtre",
    "settings.keyBindingCategory.assistant": "Assistant éditorial",
    "settings.assistantSendMode": "Envoyer avec",
    "settings.assistantSendModeHint": "Choisissez si Entrée envoie la demande ou ajoute une nouvelle ligne.",
    "settings.sendWithEnter": "Entrée",
    "settings.sendWithCtrlEnter": "Ctrl + Entrée",
    "settings.recordKeyBinding": "Enregistrer un raccourci pour {command}",
    "settings.recordingKeyBinding": "Appuyez sur un raccourci…",
    "settings.clearKeyBinding": "Effacer",
    "settings.resetKeyBinding": "Rétablir la valeur par défaut",
    "settings.keyBindingConflict": "Effacez-le ou modifiez-le d’abord.",
    "settings.keyBindingConflictTitle": "Affecté à",
    "settings.ai": "Assistant IA",
    "settings.providers": "Fournisseurs",
    "settings.publishing": "Publication",
    "settings.dataBackups": "Données et sauvegardes",
    "settings.about": "À propos de Warplyn",
    "settings.aboutDescription": "Un espace de rédaction privilégiant le stockage local, avec un assistant éditorial IA quand vous souhaitez de l’aide.",
    "settings.projectResources": "Ressources du projet",
    "settings.mitLicense": "Licence MIT",
    "settings.documentation": "Documentation",
    "settings.sourceCode": "Code source",
    "settings.reportProblem": "Signaler un problème",
    "settings.quickStart": "Guide de démarrage",
    "settings.quickStartHint": "Découvrez le fonctionnement des articles, de l’assistant et des clés de modèle.",
    "settings.openQuickStart": "Ouvrir le guide de démarrage",
    "settings.appearanceAndLanguage": "Apparence et langue",
    "settings.dateAndTime": "Date et heure",
    "settings.connections": "Connexions",
    "settings.models": "Modèles",
    "settings.publishingProfiles": "Profils de publication",
    "settings.languageDefaults": "Langues par défaut",
    "settings.backupStorage": "Stockage des sauvegardes",
    "settings.backupAutomation": "Sauvegardes automatiques",
    "settings.preferredAppearance": "Apparence préférée",
    "settings.appearanceHint": (
        "Choisissez l’apparence de Warplyn. L’option Système suit les préférences de votre appareil et se met " +
        "à jour pendant l’utilisation."
    ),
    "settings.system": "Système",
    "settings.light": "Claire",
    "settings.dark": "Sombre",
    "settings.applyAppearance": "Appliquer maintenant",
    "settings.interfaceLanguage": "Langue de l’interface",
    "settings.interfaceLanguageHint": "Modifie la langue des commandes et des messages de Warplyn. Le contenu de vos articles reste inchangé.",
    "settings.dateFormat": "Format de date",
    "settings.dateFormatHint": "Modifie l’affichage des dates dans Warplyn, sans changer les dates enregistrées ni l’historique des versions.",
    "settings.systemDateFormat": "Format de date du système ({value})",
    "settings.resetDateFormat": "Utiliser le format de date du système",
    "settings.dayFirstSlash": "JJ/MM/AAAA",
    "settings.dayFirstDots": "JJ.MM.AAAA",
    "settings.monthFirstSlash": "MM/JJ/AAAA",
    "settings.isoDate": "AAAA-MM-JJ",
    "settings.twelveHour": "12 heures",
    "settings.twentyFourHour": "24 heures",
    "settings.timeFormat": "Format d’heure",
    "settings.timeFormatHint": "Modifie l’affichage des heures dans Warplyn, sans changer les dates enregistrées ni l’historique des versions.",
    "settings.systemTimeFormat": "Format d’heure du système ({value})",
    "settings.resetTimeFormat": "Utiliser le format d’heure du système",
    "settings.timeZone": "Fuseau horaire",
    "settings.timeZoneHint": (
        "Le fuseau horaire du système suit votre appareil. Choisissez une région pour conserver son heure " +
        "lors de vos déplacements. Seules les heures affichées changent, pas les horodatages enregistrés."
    ),
    "settings.systemTimeZone": "Fuseau horaire du système {timeZone}",
    "settings.localTimeZone": "heure locale",
    "settings.resetTimeZone": "Utiliser le fuseau horaire du système",
    "settings.example": "Exemple : {value}",
    "settings.defaultArticleLanguage": "Langue par défaut des articles",
    "settings.defaultArticleLanguageHint": (
        "Utilisée pour les nouveaux articles si vous ne choisissez pas de langue. Les articles existants " +
        "restent inchangés."
    ),
    "settings.defaultTranslationLanguages": "Langues de traduction par défaut",
    "settings.defaultTranslationLanguagesHint": (
        "Présélectionnées au début d’une nouvelle traduction. Vous pouvez changer les langues cibles avant la " +
        "génération."
    ),
    "settings.addConnection": "Ajouter une connexion à une IA",
    "settings.connectionHint": "Votre clé fournisseur reste privée sur cet ordinateur. Warplyn ne conserve que le nom de son emplacement de stockage.",
    "settings.provider": "Fournisseur",
    "settings.providerHint": "Choisissez le service qui a émis cette clé API.",
    "settings.provider.openai": "OpenAI",
    "settings.provider.opencode": "OpenCode Zen",
    "settings.provider.anthropic": "Anthropic",
    "settings.provider.google": "Google Gemini API",
    "settings.provider.xai": "xAI Grok",
    "settings.provider.deepseek": "DeepSeek",
    "settings.providerLimitations": (
        "Les opérations éditoriales disponibles dépendent du modèle choisi. La vérification des faits avec " +
        "sources, les sorties structurées et les réglages du raisonnement peuvent être indisponibles."
    ),
    "settings.chooseConnectionMethod": "Comment souhaitez-vous fournir votre clé ?",
    "settings.chooseConnectionMethodHint": "Choisissez une méthode. Vous pourrez ajouter une autre connexion plus tard.",
    "settings.environmentVariable": "Variable d’environnement",
    "settings.addApiKey": "Ajouter une clé API",
    "settings.addApiKeyHint": (
        "Warplyn vérifie la clé, puis la conserve dans le Gestionnaire d’identifiants Windows. Elle n’est " +
        "jamais affichée ni enregistrée dans les données de Warplyn."
    ),
    "settings.apiKey": "Clé API",
    "settings.apiKeyHint": "Collez la clé de votre fournisseur d’IA.",
    "settings.apiKeyPlaceholder": "Collez votre clé API",
    "settings.addApiKeyButton": "Ajouter la clé API",
    "settings.connectionName": "Nom de la connexion",
    "settings.connectionNameHint": "Utilisez un nom familier, par exemple IA personnelle.",
    "settings.connectionNamePlaceholder": "Par exemple, IA personnelle",
    "settings.environmentName": "Nom de la variable d’environnement",
    "settings.environmentNameHint": "Le nom utilisé au démarrage de votre service local. Votre clé n’est jamais affichée.",
    "settings.environmentNamePlaceholder": "Par exemple, AI_API_KEY",
    "settings.addConnectionButton": "Ajouter la connexion",
    "settings.configuredConnections": "Connexions configurées",
    "settings.configuredConnectionsHint": (
        "Ces paramètres de connexion sont enregistrés localement. Les connexions actives fournissent des " +
        "modèles. Votre clé n’est ni enregistrée ni affichée."
    ),
    "settings.activeConnection": "Connexion active",
    "settings.activeConnectionShort": "Active",
    "settings.activateConnectionShort": "Activer",
    "settings.deactivateConnectionShort": "Désactiver",
    "settings.useConnection": "Utiliser cette connexion",
    "settings.useConnectionShort": "Utiliser",
    "settings.renameConnection": "Renommer la connexion",
    "settings.renameConnectionShort": "Renommer",
    "settings.renameConnectionTitle": "Renommer la connexion à l’IA",
    "settings.renameConnectionHint": "Choisissez un nom local pour cette connexion.",
    "settings.saveConnectionName": "Enregistrer le nom",
    "settings.removeConnection": "Retirer la connexion",
    "settings.removeConnectionShort": "Retirer",
    "settings.removeConnectionTitle": "Retirer la connexion à l’IA ?",
    "settings.removeConnectionDescription": (
        "Retire {connectionName} de Warplyn. La variable d’environnement et sa clé ne sont pas supprimées de " +
        "votre ordinateur."
    ),
    "settings.defaultModel": "Modèle par défaut",
    "settings.defaultModelHint": "Utilisé pour les tâches d’IA, sauf si un modèle spécifique est choisi pour une tâche.",
    "settings.appModel": "Modèle de l’application",
    "settings.appModelHint": (
        "Utilisé pour les fonctionnalités de Warplyn telles que les résumés et les titres. S’il n’est pas " +
        "défini, Warplyn utilise le modèle par défaut."
    ),
    "settings.model": "Modèle",
    "settings.modelHint": "Vérifiez une connexion, puis actualisez ses modèles disponibles avant d’en choisir un.",
    "settings.reasoningEffort": "Niveau de raisonnement",
    "settings.reasoningEffortHint": "Règle le travail effectué par ce modèle avant de répondre. Les niveaux élevés peuvent prendre plus de temps.",
    "settings.reasoningLow": "Faible",
    "settings.reasoningMedium": "Moyen",
    "settings.reasoningHigh": "Élevé",
    "settings.noModels": "Aucun modèle disponible pour le moment",
    "settings.chooseModel": "Choisir un modèle",
    "settings.favoriteModels": "Favoris",
    "settings.searchModels": "Rechercher des modèles",
    "settings.clearModelSearch": "Effacer la recherche de modèles",
    "settings.modelVendorFilters": "Filtrer les modèles par fournisseur",
    "settings.modelVendor.openai": "OpenAI",
    "settings.modelVendor.other": "Autres",
    "settings.addFavoriteModel": "Ajouter {model} aux favoris",
    "settings.removeFavoriteModel": "Retirer {model} des favoris",
    "settings.noMatchingModels": "Aucun modèle ne correspond à ce filtre.",
    "settings.refreshModels": "Actualiser les modèles disponibles",
    "settings.specificModels": "Modèles pour les tâches spécifiques",
    "settings.specificModelsHint": (
        "Choisissez un modèle pour une tâche, ou utilisez le modèle par défaut. Seules les futures demandes à " +
        "l’IA sont concernées."
    ),
    "settings.useDefaultModel": "Utiliser le modèle par défaut",
    "settings.specificModelHint": "Gardez l’option Utiliser le modèle par défaut, sauf si cette tâche nécessite un autre modèle.",
    "settings.publishingProfile": "Profil de limite de caractères",
    "settings.publishingProfileHint": (
        "Indique quand le texte à publier approche de cette longueur. La limite est indicative et ne bloque " +
        "jamais la copie."
    ),
    "settings.publishingProfileNote": (
        "Ce profil est utilisé par la barre d’état de l’article et la commande Copier. Les profils " +
        "personnalisés modifiables s’appuieront sur ces bases."
    ),
    "settings.profileCharacters": "{label} — {count} caractères",
    "settings.backupFolder": "Dossier des sauvegardes",
    "settings.backupFolderHint": "Choisissez un dossier local pour les copies de sauvegarde. Warplyn ne peut y écrire qu’après votre sélection.",
    "settings.chooseBackupFolder": "Choisir le dossier des sauvegardes",
    "settings.revealBackupFolder": "Afficher le dossier",
    "settings.managedCredential": "Identifiant géré",
    "settings.backupFolderSelected": "Dossier utilisé : {folderName}",
    "settings.backupFolderFailed": "Impossible de choisir ce dossier. Réessayez.",
    "settings.backupFolderRequired": "Choisissez d’abord un dossier de sauvegarde.",
    "settings.backupFolderPermissionDenied": "Warplyn ne peut pas accéder à ce dossier de sauvegarde. Choisissez-le de nouveau et autorisez l’accès.",
    "settings.backupFolderUnsupported": "Ce navigateur ne permet pas de choisir un dossier de sauvegarde.",
    "settings.automaticBackups": "Sauvegardes automatiques",
    "settings.automaticBackupsHint": (
        "Crée une sauvegarde peu après le démarrage, puis toutes les 24 heures à partir de cette sauvegarde " +
        "tant que Warplyn reste ouvert. Les sauvegardes manuelles ne sont jamais supprimées automatiquement."
    ),
    "settings.automaticBackupFailed": (
        "La sauvegarde automatique a échoué. Vérifiez le dossier dans Données et sauvegardes, puis créez une " +
        "sauvegarde manuelle. Vos articles restent inchangés."
    ),
    "settings.off": "Désactivé",
    "settings.daily": "Quotidiennes",
    "settings.retention": "Conservation des sauvegardes automatiques",
    "settings.retentionHint": (
        "Règle le nombre de sauvegardes automatiques conservées par Warplyn. Les sauvegardes manuelles ne " +
        "sont jamais supprimées automatiquement."
    ),
    "settings.keepBackups": "Conserver {count} sauvegardes",
    "settings.keepAllBackups": "Conserver toutes les sauvegardes",
    "settings.createBackup": "Créer une sauvegarde",
    "settings.createBackupHint": (
        "Sauvegarde vos articles, versions enregistrées, paramètres, compétences de l’auteur et leur " +
        "historique. Les sauvegardes du navigateur prennent en charge des fichiers de 100 Mo maximum et 500 " +
        "Mo au total. Les clés API sont exclues."
    ),
    "settings.backupCreating": "Création de la sauvegarde…",
    "settings.backupCreated": "Sauvegarde créée : {name}",
    "settings.backupCreateFailed": (
        "Impossible de créer la sauvegarde. Vérifiez le dossier choisi et les limites de taille du " +
        "navigateur, puis réessayez. Votre session d’édition reste inchangée."
    ),
    "settings.backupCreateUnavailable": "Les sauvegardes sont indisponibles dans cette session du navigateur.",
    "settings.restoreBackup": "Restaurer une sauvegarde",
    "settings.restoreBackupHint": (
        "Choisissez une sauvegarde dans le dossier sélectionné. Warplyn vérifie ses fichiers, conserve une " +
        "copie de récupération, puis restaure ses articles, versions enregistrées, paramètres et compétences. " +
        "Les connexions à l’IA existantes restent locales. Les références aux variables d’environnement " +
        "peuvent être restaurées ; les clés API et les valeurs des variables ne sont jamais importées. Les " +
        "anciennes sauvegardes ne contenant que la base de données conservent vos compétences actuelles."
    ),
    "settings.restoreBackupFailed": (
        "Impossible de restaurer cette sauvegarde. Vérifiez ses fichiers et les limites de taille du " +
        "navigateur, ou choisissez une autre sauvegarde. Vos données actives restent inchangées."
    ),
    "settings.restoreBackupUnavailable": "Cette sauvegarde ne peut pas être restaurée.",
    "settings.chooseBackup": "Choisir une sauvegarde",
    "settings.restoreBackupConfirm": "Restaurer {name} ? Warplyn remplacera les données locales actives et se rechargera.",
    "settings.deleteData": "Supprimer les données locales",
    "settings.deleteLocalData": "Supprimer toutes les données locales",
    "settings.deleteLocalDataHint": (
        "Supprime définitivement les articles, les points de contrôle, les versions enregistrées, " +
        "l’historique de l’assistant, les données de style, les paramètres et les sauvegardes locales du " +
        "dossier de données de Warplyn. Vous pouvez d’abord créer une sauvegarde vérifiée dans la fenêtre de " +
        "confirmation."
    ),
    "settings.deleteLocalDataFailed": "Impossible de supprimer les données locales. Aucune suppression complète n’a été confirmée.",
    "settings.loading": "Chargement des paramètres…",
    "settings.privacyAndDiagnostics": "Confidentialité et diagnostics",
    "settings.telemetry": "Partager les données de diagnostic et d’utilisation",
    "settings.telemetryHint": (
        "Aidez-nous à améliorer Warplyn en envoyant à PostHog des événements pseudonymisés de fiabilité et " +
        "d’utilisation. Le texte des articles, les demandes, les réponses de l’IA et les clés API ne sont " +
        "jamais inclus."
    ),
    "settings.telemetryDisclosure": (
        "La télémétrie est désactivée par défaut. Activez le partage pour nous aider à comprendre votre " +
        "expérience et à améliorer Warplyn. Vous pouvez le désactiver à tout moment ; cela arrête la collecte " +
        "future sans rappeler les données déjà envoyées."
    ),
} satisfies Partial<Record<MessageId, string>>;
