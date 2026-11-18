---
description: "Créez, comparez et mettez à jour des articles de traduction liés, tout en gardant le travail de chaque langue récupérable."
---

# Traductions

Une *traduction* est un *article* distinct lié à sa source. Elle possède son propre titre, son propre *brouillon* et son propre historique de *versions enregistrées*. Le travail réalisé dans une langue ne remplace donc pas le texte source.

## Demander une traduction

Ouvrez l’*article* source et choisissez **Nouvelle traduction…** dans **Traductions**. La boîte de dialogue peut présélectionner la langue de l’*article* actuel. Si aucune langue consultée ne peut être utilisée, elle propose les langues préférées définies dans **Paramètres** → **Langues par défaut**. Sélectionnez et confirmez chaque langue cible. Warplyn traduit l’*article* entier, même si vous aviez sélectionné un passage dans l’éditeur. Si la source contient des modifications non enregistrées, enregistrez-les d’abord comme *version enregistrée* afin que la *traduction* puisse identifier exactement le texte utilisé.

L’assistant crée un résultat de *traduction* à vérifier pour chaque langue. Ouvrez un résultat pour comparer son titre et son texte à la source. Choisissez **Côte à côte** pour comparer des passages entiers ou **Paragraphes alignés** pour rapprocher les paragraphes correspondants. Le texte protégé, comme les noms, les nombres, les URL et le code, doit rester intact. Warplyn signale les résultats qui modifient du texte protégé ou qui utilisent une *version enregistrée* source plus ancienne. Examinez ces avis avant de continuer.

::: warning Enregistrez d’abord la source
Une demande de *traduction* utilise une *version enregistrée*. Si la source contient des modifications non enregistrées, enregistrez-les comme *version enregistrée* avant de faire la demande. Le résultat sera ainsi lié au texte voulu.
:::

## Créer ou mettre à jour un article traduit

Lorsqu’un résultat est prêt, choisissez **Modifier** pour ouvrir l’*article traduit* qui lui est lié. S’il n’existe pas encore, Warplyn le crée. Vérifiez la *traduction*, puis enregistrez son *brouillon* ou choisissez **Enregistrer une version** lorsque vous êtes prêt. L’*article* source reste inchangé.

Pour utiliser un résultat plus récent dans un *article traduit* existant, choisissez **Actualiser** et confirmez l’*article* cible. Warplyn ajoute le texte traduit comme nouvelle *version enregistrée* et conserve le titre de la *traduction* ainsi que son historique antérieur. La mise à jour est bloquée si la source ou la cible a changé depuis la vérification, si la cible contient un *brouillon* non enregistré ou si le résultat ne passe plus la validation.

Choisissez **Rejeter** pour supprimer un résultat généré du processus d’approbation. Cette action ne supprime ni la source ni un *article traduit* déjà créé. Les résultats précédents restent disponibles. Vous pouvez créer un autre résultat avec **Nouvelle traduction…**.

::: tip Update conserve l’historique de la traduction
Lorsque vous choisissez **Actualiser**, Warplyn ajoute le résultat comme nouvelle *version enregistrée* de l’*article traduit* lié. Son titre et ses *versions enregistrées* antérieures restent accessibles.
:::

Chaque langue conserve ses propres résultats. Utilisez les onglets de langue et le sélecteur de résultats pour retrouver une *traduction* ou comparer une nouvelle tentative à une précédente. Chaque résultat indique sa date de création et la *version enregistrée* source utilisée. Si la source a changé, le résultat est obsolète et ne peut pas créer de nouvel *article* lié. Demandez une nouvelle *traduction* et comparez-la à la *version enregistrée* actuelle de la source.
