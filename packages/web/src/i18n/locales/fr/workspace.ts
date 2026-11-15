import type { MessageId } from "../../messages.js";

export const workspaceMessages = {
    "workspace.tabs.write": "Écrire",
    "workspace.tabs.proposal": "Propositions",
    "workspace.tabs.revisions": "Versions enregistrées",
    "workspace.tabs.factCheck": "Vérification des faits",
    "workspace.tabs.styleProfile": "Profil de style",
    "workspace.tabs.translations": "Traductions",
    "workspace.tabs.ariaLabel": "Vues de l’espace de travail de l’article",
    "workspace.badges.review": "À examiner",
    "workspace.badges.stale": "Obsolète",
    "workspace.badges.findings": "{count, plural, =0 {Aucune observation} one {# observation} other {# observations}}",
    "workspace.badges.ready": "Prêt",
    "workspace.badges.nearLimit": "Limite proche",
    "workspace.badges.overLimit": "Limite dépassée",
    "workspace.loadingArticles": "Chargement de vos articles locaux…",
    "workspace.serviceUnavailable": "Votre service local est indisponible. Démarrez-le, puis réessayez.",
    "workspace.aiConnectionRequired": "La rédaction locale est disponible. Configurez un modèle pour utiliser l’assistant.",
    "workspace.addModelKey": "Ajouter une clé de modèle",
    "workspace.aiConnectionCapabilities": (
        "Vous pouvez toujours rédiger, enregistrer, organiser et copier des articles, et vérifier la " +
        "typographie localement. Les demandes à l’assistant, les traductions, la vérification des faits et " +
        "les révisions complètes du style nécessitent une connexion à un modèle configurée, y compris un " +
        "modèle local pris en charge."
    ),
    "workspace.saveFailed": "Impossible d’enregistrer ce brouillon. Vos dernières modifications sont toujours dans l’éditeur. Réessayez l’enregistrement.",
    "workspace.revisionHistoryFailed": (
        "Impossible de charger l’historique des versions enregistrées. Votre article n’a pas été modifié. " +
        "Actualisez et réessayez."
    ),
    "workspace.createArticleFailed": "Impossible de créer cet article. Réessayez.",
    "workspace.updateArticleFailed": "Impossible de mettre à jour cet article. Vos dernières modifications sont toujours dans l’éditeur. Réessayez.",
    "workspace.renameArticleFailed": "Impossible de renommer cet article. Son titre précédent est toujours enregistré. Réessayez.",
    "workspace.deleteArticleFailed": "Impossible de supprimer cet article. Il est toujours disponible. Réessayez.",
    "workspace.restoreRevisionFailed": "Impossible de restaurer cette version enregistrée. Votre article n’a pas été modifié. Réessayez.",
    "workspace.styleCorpusLoadFailed": "Impossible de charger le profil de style. Actualisez et réessayez.",
    "workspace.styleCorpusAddFailed": "Impossible d’ajouter ce texte au profil de style. Votre profil de style n’a pas été modifié. Réessayez.",
    "workspace.styleCorpusRemoveFailed": "Impossible de retirer ce texte du profil de style. Votre profil de style n’a pas été modifié. Réessayez.",
    "workspace.styleCorpusUpdateFailed": "Impossible de mettre à jour le profil de style. Votre profil précédent est toujours enregistré. Réessayez.",
    "workspace.styleCorpusRebuildFailed": "Impossible de reconstruire le profil de style. Votre profil précédent est toujours disponible. Réessayez.",
    "workspace.styleRulesLoadFailed": "Impossible de charger les règles du profil de style. Actualisez et réessayez.",
    "workspace.styleRulesSaveFailed": (
        "Impossible d’enregistrer les règles du profil de style. Vos règles précédentes sont toujours " +
        "enregistrées. Réessayez."
    ),
    "workspace.styleCorpusSnapshotFailed": (
        "Impossible d’ajouter cette version enregistrée au profil de style. Votre profil de style n’a pas été " +
        "modifié. Réessayez."
    ),
    "workspace.resolveFindingFailed": "Impossible de mettre à jour cette observation. Votre article n’a pas été modifié. Réessayez.",
    "workspace.createTranslationFailed": "Impossible de créer cet article traduit. Votre article original n’a pas été modifié. Réessayez.",
    "workspace.acceptProposalFailed": "Impossible d’accepter cette proposition. Votre article n’a pas été modifié. Réessayez.",
} satisfies Partial<Record<MessageId, string>>;
