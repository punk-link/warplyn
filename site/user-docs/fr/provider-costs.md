---
description: "Découvrez les facteurs qui influent sur le coût des demandes d’IA dans Warplyn, la facturation des API et le suivi des frais auprès du fournisseur."
---

# Coût des fournisseurs d’IA

L’assistance par IA est facultative. Warplyn ne vous facture pas les demandes. Votre fournisseur d’IA peut toutefois vous facturer le traitement de chaque demande que Warplyn lui envoie.

## Facteurs de coût

Chaque fournisseur fixe ses propres tarifs. Le coût d’une demande peut dépendre :

- du fournisseur et du modèle choisis ;
- de la quantité de texte de l’*article* et d’indications contextuelles incluses dans la demande ;
- de la quantité de texte renvoyée par le modèle.

Le texte voisin peut aider le modèle à interpréter une courte sélection, mais son envoi transmet aussi une partie du texte non sélectionné. Si vous sélectionnez un passage et que la demande nécessite le texte de l’*article*, Warplyn envoie ce passage et jusqu’à 500 caractères de chaque côté. Le texte qui entoure le passage sert seulement de contexte. Cela représente au maximum 1 000 caractères supplémentaires. Seule la sélection peut être modifiée. Sans sélection, la demande peut inclure tout l’*article* et le contexte pertinent. Selon les tarifs du fournisseur, une demande plus ciblée peut coûter moins cher.

::: tip Facturation de l’API
Un abonnement au service de discussion d’un fournisseur ne comprend pas forcément l’utilisation de son API. Avant de configurer votre clé API, consultez ses tarifs API et ses conditions de facturation en vigueur.
:::

Pour les tâches courantes, comme améliorer la fluidité d’un passage ou le réviser de façon ciblée, essayez d’abord un modèle moins coûteux. Utilisez un modèle plus cher si les résultats montrent que la tâche en a besoin.

## Consulter votre utilisation

Consultez votre compte fournisseur pour connaître votre utilisation, les frais, les alertes et les limites de dépenses. Warplyn n’affiche pas la facture du fournisseur et n’applique pas de limites de dépenses. Contactez le fournisseur pour toute question sur sa facturation, ses remboursements ou les frais portés à votre compte.

Le modèle utilisé influe sur le coût d’une demande. Dans **Paramètres** → **Assistant IA**, choisissez un **Modèle par défaut**, un **Modèle de l’application** et des modèles pour des tâches spécifiques. Consultez [Fournisseurs et modèles d’IA](providers.md) pour les configurer.

::: tip Vous pouvez utiliser Warplyn sans IA
Vous pouvez rédiger et gérer des *articles* sans connexion à un fournisseur d’IA. Vous pouvez modifier vos textes, enregistrer des *versions* et utiliser vos sauvegardes locales sans envoyer de demande à un fournisseur d’IA.
:::
