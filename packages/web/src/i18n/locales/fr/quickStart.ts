import type { MessageId } from "../../messages.js";

export const quickStartMessages = {
    "quickStart.title": "Bienvenue dans Warplyn",
    "quickStart.close": "Fermer le guide de démarrage",
    "quickStart.write.title": "Rédigez un article.",
    "quickStart.write.description": (
        "Créez ou ouvrez un article dans le panneau de gauche, puis rédigez dans l’espace de travail central. " +
        "Warplyn conserve l’état de récupération du brouillon et l’historique des versions enregistrées."
    ),
    "quickStart.assistant.title": "Demandez à l’assistant.",
    "quickStart.assistant.description": (
        "Utilisez le panneau de droite pour les retouches, les révisions, les traductions et la vérification " +
        "des faits. Les modifications de l’IA restent des propositions jusqu’à votre acceptation, et les " +
        "observations restent indicatives."
    ),
    "quickStart.modelKey.title": "Ajoutez une clé de modèle.",
    "quickStart.modelKey.description": (
        "Une clé de modèle est une clé API fournie par un fournisseur d’IA. Dans l’application de bureau, " +
        "choisissez un fournisseur, collez la clé, enregistrez-la dans le gestionnaire d’identifiants du " +
        "système, actualisez les modèles, puis choisissez un modèle par défaut. Warplyn n’affiche jamais de " +
        "nouveau une clé enregistrée."
    ),
    "quickStart.skip": "Passer le guide de démarrage",
    "quickStart.addModelKey": "Ajouter une clé de modèle",
    "quickStart.startWriting": "Commencer à écrire",
} satisfies Partial<Record<MessageId, string>>;
