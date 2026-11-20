import type { MessageId } from "../../messages.js";


export const spellingMessages = {
    "spelling.add": "Ajouter les mots",
    "spelling.addWords": "Mots à ajouter",
    "spelling.correctionFailed": (
        "Impossible d’appliquer cette correction orthographique. Rouvrez le menu des suggestions ou saisissez la correc" +
        "tion dans votre article."
    ),
    "spelling.desktopOnly": (
        "Utilisez l’application de bureau pour télécharger des dictionnaires et gérer votre dictionnaire pers" +
        "onnel. Dans le navigateur, la correction orthographique suit les paramètres du navigateur."
    ),
    "spelling.dictionaries": "Dictionnaires de langues",
    "spelling.download": "Télécharger les dictionnaires",
    "spelling.failed": "Indisponible. Réessayez le téléchargement.",
    "spelling.filterLanguages": "Filtrer les langues",
    "spelling.invalidWords": "Saisissez jusqu’à 500 mots, un par ligne, de 128 caractères maximum chacun et 64 Kio au total.",
    "spelling.languageFailed": (
        "Impossible d’activer la correction orthographique pour la langue de cet article. Réessayez de sélect" +
        "ionner la langue ou préparez son dictionnaire dans les paramètres orthographiques."
    ),
    "spelling.languageVariant": "{language} ({code})",
    "spelling.loadFailed": "Impossible de charger les paramètres orthographiques. Réessayez.",
    "spelling.loaded": "Paramètres orthographiques chargés.",
    "spelling.loading": "Chargement des paramètres orthographiques…",
    "spelling.localHint": (
        "Les vérifications orthographiques et les mots personnels restent sur cet appareil. Le téléchargement" +
        " des dictionnaires nécessite Internet et contacte le CDN des dictionnaires de Google."
    ),
    "spelling.noLanguages": "Aucune langue correspondante.",
    "spelling.noWords": "Aucun mot personnel correspondant.",
    "spelling.operationFailed": (
        "Impossible de modifier les paramètres orthographiques. Réessayez. Pour les téléchargements, vérifiez votre con" +
        "nexion Internet."
    ),
    "spelling.partial": "Certains mots n’ont pas pu être ajoutés. Corrigez les entrées dans Mots à ajouter ou réessayez.",
    "spelling.persistenceHint": (
        "Les dictionnaires et les mots personnels appartiennent à cette installation. Les sauvegardes et rest" +
        "aurations d’articles ne les incluent pas. La suppression des données d’articles ne retire pas les mo" +
        "ts du dictionnaire système ; retirez-les ici."
    ),
    "spelling.personal": "Dictionnaire personnel",
    "spelling.personalHint": (
        "Conservez les termes techniques tels que PostgreSQL et gRPC dans un dictionnaire personnel unique, partagé ent" +
        "re les articles et les langues de correction."
    ),
    "spelling.preload": "Préparer la rédaction hors ligne",
    "spelling.preloadHint": "Choisissez les langues à préparer pour la rédaction hors ligne. La langue de votre article reste inchangée.",
    "spelling.preparing": "Préparation",
    "spelling.ready": "Téléchargé",
    "spelling.remove": "Retirer",
    "spelling.removeWord": "Retirer {word} du dictionnaire personnel",
    "spelling.retry": "Réessayer",
    "spelling.savedWords": "Mots enregistrés",
    "spelling.search": "Rechercher dans le dictionnaire personnel",
    "spelling.searchHint": "Recherchez vos termes enregistrés et retirez les mots que le correcteur doit vérifier de nouveau.",
    "spelling.systemHint": (
        "L’ajout ou la suppression d’un mot modifie aussi le dictionnaire personnalisé de votre système et peut affecte" +
        "r d’autres applications."
    ),
    "spelling.unload": "Décharger",
    "spelling.unloadLanguage": "Décharger le dictionnaire {language}",
    "spelling.unloaded": "Déchargé",
    "spelling.unverified": "Disponible",
    "spelling.updated": "Paramètres orthographiques mis à jour.",
    "spelling.wordFailed": "Impossible d’ajouter ce mot au dictionnaire personnel. Ouvrez les paramètres orthographiques et réessayez de l’ajouter.",
    "spelling.wordsHint": (
        "Saisissez un mot ou terme technique par ligne, de 128 caractères maximum. Ajoutez jusqu’à 500 mots à" +
        " la fois. Les entrées en échec restent ici pour correction ou nouvelle tentative."
    ),
    "spelling.working": "Mise à jour des paramètres orthographiques…",
} satisfies Partial<Record<MessageId, string>>;
