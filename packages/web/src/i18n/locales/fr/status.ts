import type { MessageId } from "../../messages.js";


export const statusMessages = {
    "status.article": "État de l’article",
    "status.characterCount": "{characterCount} / {characterLimit} caractères",
    "status.characterCount.ariaLabel": "Nombre de caractères : {characterCount} sur {characterLimit}. Choisissez une limite de caractères.",
    "status.characterLimitPresets": "Limites de caractères prédéfinies",
    "status.revision": "v{revisionNumber}",
    "status.revisionMenu": "Versions enregistrées",
    "status.revisionSelector": "Version enregistrée actuelle v{revisionNumber}. Choisissez une version enregistrée.",
    "status.updateAvailable": "La mise à jour {version} est disponible",
    "status.updateDownloading": "Téléchargement de la mise à jour",
    "status.updateFailed": "Échec de la recherche de mises à jour",
    "status.updateReady": "La mise à jour est prête ; redémarrez l’application",
    "status.windowsUpdateAvailable": "Télécharger la mise à jour {version} et autoriser son installation automatique au prochain démarrage de Warplyn",
    "status.windowsUpdateReady": "Mise à jour téléchargée. Elle sera appliquée automatiquement au prochain démarrage de Warplyn.",
} satisfies Partial<Record<MessageId, string>>;
