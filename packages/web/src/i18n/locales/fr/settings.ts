import type { MessageId } from "../../messages.js";


export const settingsMessages = {
    "settings.about": "À propos",
    "settings.aboutDescription": "Un espace de rédaction privilégiant le stockage local, avec un assistant éditorial IA quand vous souhaitez de l’aide.",
    "settings.activateConnectionShort": "Activer",
    "settings.activeConnection": "Connexion active",
    "settings.activeConnectionShort": "Active",
    "settings.addApiKey": "Ajouter une clé API",
    "settings.addApiKeyButton": "Ajouter la clé API",
    "settings.addApiKeyHint": (
        "Warplyn vérifie la clé, puis la conserve dans le Gestionnaire d’identifiants Windows. Elle n’est jamais affich" +
        "ée ni enregistrée dans les données de Warplyn."
    ),
    "settings.addConnection": "Ajouter une connexion",
    "settings.addConnectionButton": "Ajouter la connexion",
    "settings.addCustomProfile": "Ajouter un profil",
    "settings.addFavoriteModel": "Ajouter {model} aux favoris",
    "settings.ai": "Assistant IA",
    "settings.allowNetworkAccess": "Autoriser",
    "settings.animations": "Animations",
    "settings.animationsHint": (
        "Anime les indicateurs, les messages de l’assistant et les effets de l’interface. Le réglage de réduction des a" +
        "nimations de votre appareil reste respecté."
    ),
    "settings.apiKey": "Clé API",
    "settings.apiKeyHint": "Collez la clé de votre fournisseur d’IA.",
    "settings.apiKeyPlaceholder": "Collez votre clé API",
    "settings.appModel": "Modèle de l’application",
    "settings.appModelHint": (
        "Utilisé pour les fonctionnalités de Warplyn telles que les résumés et les titres. S’il n’est pas défini, Warpl" +
        "yn utilise le modèle par défaut."
    ),
    "settings.appearanceAndLanguage": "Apparence et langue",
    "settings.appearanceHint": (
        "Choisissez l’apparence de Warplyn. L’option Système suit les préférences de votre appareil et se met à jour pe" +
        "ndant l’utilisation."
    ),
    "settings.applyAppearance": "Appliquer maintenant",
    "settings.assistantBehavior": "Retouches et demandes",
    "settings.assistantRequestTimeout": "Durée maximale des demandes",
    "settings.assistantRequestTimeoutHint": (
        "Interrompt les demandes à l’assistant après cette durée. S’applique aux nouvelles demandes, y compri" +
        "s aux nouvelles tentatives. Votre article reste inchangé en cas de dépassement."
    ),
    "settings.assistantSendMode": "Envoyer avec",
    "settings.assistantSendModeHint": "Choisissez si Entrée envoie la demande ou ajoute une nouvelle ligne.",
    "settings.backToWorkspace": "Retour",
    "settings.chooseConnectionMethod": "Comment souhaitez-vous fournir votre clé ?",
    "settings.chooseConnectionMethodHint": "Choisissez une méthode. Vous pourrez ajouter une autre connexion plus tard.",
    "settings.chooseModel": "Choisir un modèle",
    "settings.clearKeyBinding": "Effacer",
    "settings.clearModelSearch": "Effacer la recherche de modèles",
    "settings.configuredConnections": "Connexions configurées",
    "settings.configuredConnectionsHint": (
        "Ces paramètres de connexion sont enregistrés localement. Les connexions actives fournissent des modèles. Votre" +
        " clé n’est ni enregistrée ni affichée."
    ),
    "settings.connectionAddFailed": (
        "Impossible d’ajouter cette connexion à l’IA. Vos paramètres n’ont pas été modifiés. Vérifiez les dét" +
        "ails et réessayez."
    ),
    "settings.connectionHint": "Votre clé fournisseur reste privée sur cet ordinateur. Warplyn ne conserve que le nom de son emplacement de stockage.",
    "settings.connectionName": "Nom de la connexion",
    "settings.connectionNameHint": "Utilisez un nom familier, par exemple IA personnelle.",
    "settings.connectionNamePlaceholder": "Par exemple, IA personnelle",
    "settings.connectionRemoveFailed": "Impossible de retirer cette connexion à l’IA. Elle reste disponible dans les paramètres. Réessayez.",
    "settings.connectionUpdateFailed": "Impossible de mettre à jour cette connexion à l’IA. Vos paramètres précédents restent inchangés. Réessayez.",
    "settings.connections": "Connexions",
    "settings.copyTelemetryIdentifier": "Copier l’ID",
    "settings.customProfileInvalid": "Saisissez un nom et une limite de caractères entière supérieure ou égale à zéro.",
    "settings.customProfileLimit": "Limite de caractères personnalisée",
    "settings.customProfileLimitHint": "Une limite indicative supérieure ou égale à zéro. Elle ne bloque jamais la copie.",
    "settings.customProfileName": "Nom du profil personnalisé",
    "settings.customProfileNameHint": "Le nom local de votre limite de publication personnalisée.",
    "settings.customProfiles": "Profils personnalisés",
    "settings.customProfilesHint": "Ajoutez autant de profils locaux de limite de caractères que nécessaire.",
    "settings.daily": "Quotidiennes",
    "settings.dark": "Sombre",
    "settings.dateAndTime": "Date et heure",
    "settings.dateFormat": "Format de date",
    "settings.dateFormatHint": "Modifie l’affichage des dates dans Warplyn, sans changer les dates enregistrées ni l’historique des versions.",
    "settings.dayFirstDots": "JJ.MM.AAAA",
    "settings.dayFirstSlash": "JJ/MM/AAAA",
    "settings.deactivateConnectionShort": "Désactiver",
    "settings.defaultArticleLanguage": "Langue par défaut des articles",
    "settings.defaultArticleLanguageHint": (
        "Utilisée pour les nouveaux articles si vous ne choisissez pas de langue. Les articles existants rest" +
        "ent inchangés."
    ),
    "settings.defaultAssistantEditMode": "Mode de retouche par défaut de l’assistant",
    "settings.defaultAssistantEditModeHint": (
        "Les nouvelles conversations d’article utilisent ce mode ; les conversations existantes conservent le" +
        " leur. Le mode direct évite l’examen des propositions uniquement pour les retouches que vous demande" +
        "z explicitement. Les autres propositions doivent toujours être examinées."
    ),
    "settings.defaultModel": "Modèle par défaut",
    "settings.defaultModelHint": "Utilisé pour les tâches d’IA, sauf si un modèle spécifique est choisi pour une tâche.",
    "settings.defaultTranslationLanguages": "Langues de traduction par défaut",
    "settings.defaultTranslationLanguagesHint": (
        "Présélectionnées au début d’une nouvelle traduction. Vous pouvez changer les langues cibles avant la génératio" +
        "n."
    ),
    "settings.deleteData": "Supprimer les données locales",
    "settings.deleteLocalData": "Supprimer toutes les données locales",
    "settings.deleteLocalDataFailed": "Impossible de supprimer les données locales. Aucune suppression complète n’a été confirmée.",
    "settings.deleteLocalDataHint": (
        "Supprime définitivement les articles, les points de contrôle, les versions enregistrées, l’historiqu" +
        "e de l’assistant, les données de style, les paramètres et les sauvegardes locales du dossier de donn" +
        "ées de Warplyn. Vous pouvez d’abord créer une sauvegarde vérifiée dans la fenêtre de confirmation."
    ),
    "settings.documentation": "Documentation",
    "settings.downloadUpdate": "Télécharger",
    "settings.environmentName": "Nom de la variable d’environnement",
    "settings.environmentNameHint": "Le nom utilisé au démarrage de votre service local. Votre clé n’est jamais affichée.",
    "settings.environmentNamePlaceholder": "Par exemple, AI_API_KEY",
    "settings.environmentVariable": "Variable d’environnement",
    "settings.example": "Exemple : {value}",
    "settings.favoriteModels": "Favoris",
    "settings.general": "Général",
    "settings.general.interfaceLocale.english": "Anglais",
    "settings.includePrereleaseUpdates": "Inclure les préversions",
    "settings.includePrereleaseUpdatesHint": "Si cette option est désactivée, Warplyn ne propose que les versions stables.",
    "settings.interfaceLanguage": "Langue de l’interface",
    "settings.interfaceLanguageHint": "Modifie la langue des commandes et des messages de Warplyn. Le contenu de vos articles reste inchangé.",
    "settings.isoDate": "AAAA-MM-JJ",
    "settings.keyBindingCategory.assistant": "Assistant éditorial",
    "settings.keyBindingCategory.editing": "Édition",
    "settings.keyBindingCategory.general": "Général",
    "settings.keyBindingCategory.window": "Fenêtre",
    "settings.keyBindingCategory.workspace": "Panneaux et vues",
    "settings.keyBindingConflict": "Effacez-le ou modifiez-le d’abord.",
    "settings.keyBindingConflictTitle": "Affecté à",
    "settings.keyBindings": "Raccourcis",
    "settings.keyBindingsIntro": (
        "Choisissez les raccourcis de Warplyn sur cet ordinateur. Les modifications s’appliquent aux utilisations suiva" +
        "ntes et ne modifient jamais un article."
    ),
    "settings.languageDefaults": "Langues par défaut",
    "settings.light": "Claire",
    "settings.loading": "Chargement des paramètres…",
    "settings.loadingFailed": "Impossible de charger les paramètres. Vos paramètres enregistrés restent inchangés. Actualisez et réessayez.",
    "settings.localTimeZone": "heure locale",
    "settings.managedCredential": "Identifiant géré",
    "settings.mitLicense": "Licence MIT",
    "settings.model": "Modèle",
    "settings.modelHint": "Vérifiez une connexion, puis actualisez ses modèles disponibles avant d’en choisir un.",
    "settings.modelSaveFailed": "Impossible d’enregistrer les préférences de modèle. Vos paramètres précédents restent inchangés. Réessayez.",
    "settings.modelVendor.openai": "OpenAI",
    "settings.modelVendor.other": "Autres",
    "settings.modelVendorFilters": "Filtrer les modèles par fournisseur",
    "settings.models": "Modèles",
    "settings.modelsLoadFailed": "Impossible de charger les modèles disponibles. Vos paramètres n’ont pas été modifiés. Réessayez.",
    "settings.monthFirstSlash": "MM/JJ/AAAA",
    "settings.navigation": "Navigation des paramètres",
    "settings.noMatchingModels": "Aucun modèle ne correspond à ce filtre.",
    "settings.noModels": "Aucun modèle disponible pour le moment",
    "settings.off": "Désactivé",
    "settings.on": "Activé",
    "settings.openQuickStart": "Ouvrir le guide",
    "settings.preferredAppearance": "Apparence préférée",
    "settings.privacyAndDiagnostics": "Confidentialité et diagnostics",
    "settings.profileCharacters": "{label} — {count} caractères",
    "settings.projectResources": "Ressources du projet",
    "settings.provider": "Fournisseur",
    "settings.provider.anthropic": "Anthropic",
    "settings.provider.deepseek": "DeepSeek",
    "settings.provider.google": "Google Gemini API",
    "settings.provider.openai": "OpenAI",
    "settings.provider.opencode": "OpenCode Zen",
    "settings.provider.xai": "xAI Grok",
    "settings.providerHint": "Choisissez le service qui a émis cette clé API.",
    "settings.providerLimitations": (
        "Les opérations éditoriales disponibles dépendent du modèle choisi. La vérification des faits avec so" +
        "urces, les sorties structurées et les réglages du raisonnement peuvent être indisponibles."
    ),
    "settings.providers": "Fournisseurs",
    "settings.publishing": "Publication",
    "settings.publishingProfile": "Profil de limite de caractères",
    "settings.publishingProfileHint": (
        "Indique quand le texte à publier approche de cette longueur. La limite est indicative et ne bloque j" +
        "amais la copie."
    ),
    "settings.publishingProfileNote": (
        "Ce profil est utilisé par la barre d’état de l’article et la commande Copier. Les profils personnalisés modifi" +
        "ables s’appuieront sur ces bases."
    ),
    "settings.publishingProfiles": "Profils de publication",
    "settings.publishingSaveFailed": "Impossible d’enregistrer les paramètres de publication. Vos paramètres précédents restent inchangés. Réessayez.",
    "settings.quickStart": "Guide de démarrage",
    "settings.quickStartHint": "Découvrez le fonctionnement des articles, de l’assistant et des clés de modèle.",
    "settings.reasoningEffort": "Niveau de raisonnement",
    "settings.reasoningEffortHint": "Règle le travail effectué par ce modèle avant de répondre. Les niveaux élevés peuvent prendre plus de temps.",
    "settings.reasoningHigh": "Élevé",
    "settings.reasoningLow": "Faible",
    "settings.reasoningMedium": "Moyen",
    "settings.recordKeyBinding": "Enregistrer un raccourci pour {command}",
    "settings.recordingKeyBinding": "Appuyez sur un raccourci…",
    "settings.refreshModels": "Actualiser",
    "settings.remove": "Retirer",
    "settings.removeConnection": "Retirer la connexion",
    "settings.removeConnectionDescription": (
        "Retire {connectionName} de Warplyn. La variable d’environnement et sa clé ne sont pas supprimées de votre ordi" +
        "nateur."
    ),
    "settings.removeConnectionShort": "Retirer",
    "settings.removeConnectionTitle": "Retirer la connexion à l’IA ?",
    "settings.removeCustomDefaultDescription": "Retirer <profile>{name}</profile> ? Le profil de publication par défaut redeviendra le profil Par défaut.",
    "settings.removeCustomProfile": "Retirer {name}",
    "settings.removeCustomProfileDescription": "Retirer <profile>{name}</profile> de vos profils de publication locaux ?",
    "settings.removeCustomProfileTitle": "Retirer le profil personnalisé ?",
    "settings.removeFavoriteModel": "Retirer {model} des favoris",
    "settings.renameConnection": "Renommer la connexion",
    "settings.renameConnectionHint": "Choisissez un nom local pour cette connexion.",
    "settings.renameConnectionShort": "Renommer",
    "settings.renameConnectionTitle": "Renommer la connexion à l’IA",
    "settings.reportProblem": "Signaler un problème",
    "settings.requestTimeoutMinutes": "{minutes, plural, one {# minute} other {# minutes}}",
    "settings.requestTimeoutUnlimited": "Illimitée",
    "settings.resetDateFormat": "Format système",
    "settings.resetKeyBinding": "Réinitialiser",
    "settings.resetTimeFormat": "Format système",
    "settings.resetTimeZone": "Fuseau système",
    "settings.retry": "Réessayer",
    "settings.saveConnectionName": "Enregistrer le nom",
    "settings.saveCustomProfile": "Enregistrer",
    "settings.saveFailed": "Impossible d’enregistrer vos paramètres. Vos paramètres précédents restent inchangés. Réessayez.",
    "settings.saved": "Enregistré",
    "settings.saving": "Enregistrement…",
    "settings.searchModels": "Rechercher des modèles",
    "settings.securityUpdate": "Mise à jour de sécurité",
    "settings.sendWithCtrlEnter": "Ctrl + Entrée",
    "settings.sendWithEnter": "Entrée",
    "settings.showExecutionProgress": "Afficher la progression",
    "settings.showExecutionProgressHint": "Affiche l’action en cours et un historique d’activité repliable dans la conversation avec l’assistant.",
    "settings.sourceCode": "Code source",
    "settings.specificModelHint": "Gardez l’option Utiliser le modèle par défaut, sauf si cette tâche nécessite un autre modèle.",
    "settings.specificModels": "Modèles pour les tâches spécifiques",
    "settings.specificModelsHint": (
        "Choisissez un modèle pour une tâche, ou utilisez le modèle par défaut. Seules les futures demandes à" +
        " l’IA sont concernées."
    ),
    "settings.spelling": "Orthographe",
    "settings.system": "Système",
    "settings.systemDateFormat": "Format de date du système ({value})",
    "settings.systemTimeFormat": "Format d’heure du système ({value})",
    "settings.systemTimeZone": "Fuseau horaire du système {timeZone}",
    "settings.telemetry": "Partager les données de diagnostic et d’utilisation",
    "settings.telemetryDetails": "Détails de la télémétrie",
    "settings.telemetryDisclosure": (
        "La télémétrie est désactivée par défaut. Activez le partage pour nous aider à comprendre votre expér" +
        "ience et à améliorer Warplyn. Vous pouvez le désactiver à tout moment ; cela arrête la collecte futu" +
        "re sans rappeler les données déjà envoyées."
    ),
    "settings.telemetryHint": (
        "Aidez-nous à améliorer Warplyn en envoyant à PostHog des événements pseudonymisés de fiabilité et d’" +
        "utilisation. Le texte des articles, les demandes, les réponses de l’IA et les clés API ne sont jamai" +
        "s inclus."
    ),
    "settings.telemetryIdentifier": "ID de télémétrie",
    "settings.telemetryIdentifierCopied": "ID de télémétrie copié.",
    "settings.telemetryIdentifierHint": (
        "Fournissez cet ID pour demander la suppression de vos données. Copiez-le avant de désactiver la télémétrie, ca" +
        "r la désactivation supprime l’ID."
    ),
    "settings.telemetrySaveFailed": "Impossible d’enregistrer ce choix. Votre réglage précédent reste inchangé. Réessayez.",
    "settings.telemetryUnavailable": "La télémétrie n’est disponible que dans une application distribuée configurée à cet effet.",
    "settings.timeFormat": "Format d’heure",
    "settings.timeFormatHint": "Modifie l’affichage des heures dans Warplyn, sans changer les dates enregistrées ni l’historique des versions.",
    "settings.timeZone": "Fuseau horaire",
    "settings.timeZoneHint": (
        "Le fuseau horaire du système suit votre appareil. Choisissez une région pour conserver son heure lor" +
        "s de vos déplacements. Seules les heures affichées changent, pas les horodatages enregistrés."
    ),
    "settings.twelveHour": "12 heures",
    "settings.twentyFourHour": "24 heures",
    "settings.useConnection": "Utiliser",
    "settings.useConnectionShort": "Utiliser",
    "settings.useDefaultModel": "Modèle par défaut",
} satisfies Partial<Record<MessageId, string>>;
