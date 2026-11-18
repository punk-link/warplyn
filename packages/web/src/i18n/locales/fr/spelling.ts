import type { MessageId } from "../../messages.js";

export const spellingMessages = {
    "spelling.desktopOnly": (
        "Utilisez l’application de bureau pour télécharger des dictionnaires et gérer votre dictionnaire " +
        "personnel. Dans le navigateur, la correction orthographique suit les paramètres du navigateur."
    ),
    "spelling.localHint": (
        "Les vérifications orthographiques et les mots personnels restent sur cet appareil. Le téléchargement " +
        "des dictionnaires nécessite Internet et contacte le CDN des dictionnaires de Google."
    ),
    "spelling.dictionaries": "Dictionnaires de langues",
    "spelling.preload": "Préparer la rédaction hors ligne",
    "spelling.preloadHint": "Choisissez les langues à préparer pour la rédaction hors ligne. La langue de votre article reste inchangée.",
    "spelling.download": "Télécharger les dictionnaires",
    "spelling.languageVariant": "{language} ({code})",
    "spelling.filterLanguages": "Filtrer les langues",
    "spelling.noLanguages": "Aucune langue correspondante.",
    "spelling.unverified": "Disponible",
    "spelling.unloaded": "Déchargé",
    "spelling.unload": "Décharger",
    "spelling.unloadLanguage": "Décharger le dictionnaire {language}",
    "spelling.preparing": "Préparation",
    "spelling.ready": "Téléchargé",
    "spelling.failed": "Indisponible. Réessayez le téléchargement.",
    "spelling.personal": "Dictionnaire personnel",
    "spelling.personalHint": (
        "Conservez les termes techniques tels que PostgreSQL et gRPC dans un dictionnaire personnel unique, " +
        "partagé entre les articles et les langues de correction."
    ),
    "spelling.systemHint": (
        "L’ajout ou la suppression d’un mot modifie aussi le dictionnaire personnalisé de votre système et " +
        "peut affecter d’autres applications."
    ),
    "spelling.addWords": "Mots à ajouter",
    "spelling.wordsHint": (
        "Saisissez un mot ou terme technique par ligne, de 128 caractères maximum. Ajoutez jusqu’à 500 mots à " +
        "la fois. Les entrées en échec restent ici pour correction ou nouvelle tentative."
    ),
    "spelling.add": "Ajouter les mots",
    "spelling.remove": "Retirer",
    "spelling.removeWord": "Retirer {word} du dictionnaire personnel",
    "spelling.savedWords": "Mots enregistrés",
    "spelling.search": "Rechercher dans le dictionnaire personnel",
    "spelling.searchHint": "Recherchez vos termes enregistrés et retirez les mots que le correcteur doit vérifier de nouveau.",
    "spelling.noWords": "Aucun mot personnel correspondant.",
    "spelling.persistenceHint": (
        "Les dictionnaires et les mots personnels appartiennent à cette installation. Les sauvegardes et " +
        "restaurations d’articles ne les incluent pas. La suppression des données d’articles ne retire pas " +
        "les mots du dictionnaire système ; retirez-les ici."
    ),
    "spelling.loading": "Chargement des paramètres orthographiques…",
    "spelling.loaded": "Paramètres orthographiques chargés.",
    "spelling.loadFailed": "Impossible de charger les paramètres orthographiques. Réessayez.",
    "spelling.retry": "Réessayer",
    "spelling.working": "Mise à jour des paramètres orthographiques…",
    "spelling.updated": "Paramètres orthographiques mis à jour.",
    "spelling.partial": "Certains mots n’ont pas pu être ajoutés. Corrigez les entrées dans Mots à ajouter ou réessayez.",
    "spelling.operationFailed": (
        "Impossible de modifier les paramètres orthographiques. Réessayez. Pour les téléchargements, vérifiez " +
        "votre connexion Internet."
    ),
    "spelling.invalidWords": "Saisissez jusqu’à 500 mots, un par ligne, de 128 caractères maximum chacun et 64 Kio au total.",
    "spelling.wordFailed": "Impossible d’ajouter ce mot au dictionnaire personnel. Ouvrez les paramètres orthographiques et réessayez de l’ajouter.",
    "spelling.correctionFailed": (
        "Impossible d’appliquer cette correction orthographique. Rouvrez le menu des suggestions ou saisissez " +
        "la correction dans votre article."
    ),
    "spelling.languageFailed": (
        "Impossible d’activer la correction orthographique pour la langue de cet article. Réessayez de " +
        "sélectionner la langue ou préparez son dictionnaire dans les paramètres orthographiques."
    ),
} satisfies Partial<Record<MessageId, string>>;
