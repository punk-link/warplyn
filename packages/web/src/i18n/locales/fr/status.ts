import type { MessageId } from "../../messages.js";

export const statusMessages = {
    "status.article": "État de l’article",
    "status.revision": "v{revisionNumber}",
    "status.revisionSelector": "Version enregistrée actuelle v{revisionNumber}. Choisissez une version enregistrée.",
    "status.revisionMenu": "Versions enregistrées",
    "status.characterCount": "{characterCount} / {characterLimit} caractères",
    "status.characterCount.ariaLabel": "Nombre de caractères : {characterCount} sur {characterLimit}. Choisissez une limite de caractères.",
    "status.characterLimitPresets": "Limites de caractères prédéfinies",
    "status.windowsUpdateReady": "Mise à jour téléchargée. Elle sera appliquée automatiquement au prochain démarrage de Warplyn.",
    "status.windowsUpdateAvailable": "Télécharger la mise à jour {version} et autoriser son installation automatique au prochain démarrage de Warplyn",
    "status.updateAvailable": "La mise à jour {version} est disponible",
    "status.updateDownloading": "Téléchargement de la mise à jour",
    "status.updateReady": "La mise à jour est prête ; redémarrez l’application",
    "status.updateFailed": "Échec de la recherche de mises à jour",
} satisfies Partial<Record<MessageId, string>>;
