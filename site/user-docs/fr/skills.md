---
description: "Créez et gérez des compétences réutilisables pour vos tâches d’écriture, puis consultez leurs versions enregistrées."
---

# Créer et gérer des compétences

Les *compétences* sont des paquets d’instructions Markdown locaux. Elles aident l’assistant à choisir et à ordonner les capacités éditoriales. Elles n’accordent aucun droit supplémentaire et ne modifient pas un *article*.

## Créer et gérer vos compétences

Demandez simplement à l’assistant de créer une *compétence* réutilisable. Décrivez la tâche récurrente ainsi que les règles ou références nécessaires. Si une précision manquante risque de changer la *compétence*, l’assistant pose une courte question au lieu de deviner.

::: tip Exemple
Pour réviser une fiction dans le style d’une scène calme près d’une rivière, demandez : « Crée une *compétence* appelée “Révision phrase à phrase d’une fiction intimiste”. Raccourcis les phrases d’Ana en préservant sa voix, le cadre de la rivière et les événements de la scène. N’ajoute aucun détail ; signale plutôt les passages ambigus. » L’assistant peut réutiliser ces consignes lorsque vous demandez une révision phrase à phrase.
:::

[![Assistant éditorial de Warplyn avec une demande de création d’une compétence de révision phrase à phrase et Créateur de compétences sélectionné.](/images/skill-creator-example.png)](/images/skill-creator-example.png)

*Exemple de demande de création d’une compétence dans le Composer. Connectez un fournisseur avant l’envoi.*

Après sa création, la *compétence* est immédiatement disponible pour les nouvelles demandes à l’assistant. La demande de création ne transmet pas le corps de votre *article* au modèle et ne modifie ni l’*article*, ni le *brouillon*, ni la *proposition*, ni la *version enregistrée*.

Chaque *compétence* créée possède un historique local et immuable de *versions de la compétence*. Cet historique est distinct de celui des *articles*. Vous pouvez aussi modifier directement le paquet Markdown local. Warplyn actualise le catalogue pour la prochaine demande. Supprimer son fichier `SKILL.md` retire la compétence de la liste des *compétences* disponibles.

Demandez à l’assistant de réviser ou de supprimer une *compétence* en indiquant son nom. Avant de la modifier, il lit le paquet actuel et vérifie si le fichier a changé entre-temps. Une révision conserve l’identifiant de la *compétence* et ajoute une nouvelle *version de la compétence*. La suppression rend la *compétence* indisponible pour les nouvelles demandes, mais conserve son historique.

Pour récupérer des instructions antérieures, demandez les *versions* de cette *compétence* et indiquez celle à restaurer. La restauration écrit une nouvelle version active et ajoute une autre *version de la compétence* à l’historique. Vous pouvez aussi restaurer de cette façon une *compétence* supprimée. La restauration d’un point de contrôle de conversation de l’assistant ne restaure ni ne modifie une *compétence* ; sa restauration nécessite une demande distincte.
