---
description: "Vérifiez des affirmations factuelles, consultez les sources et les verdicts, puis décidez quoi faire des observations de Vérification des faits."
---

# Vérification des faits

Utilisez **Vérifier les faits** pour rechercher des sources sur des affirmations vérifiables dans un *article*, comme des détails historiques ou des déclarations sur un lieu. Dans ses *observations*, l’assistant explique ses conclusions, cite ses sources et précise ce qui reste incertain. Une vérification ne modifie pas votre texte.

La vérification des faits nécessite une [connexion et un modèle d’IA](providers.md) qui prennent en charge la recherche de sources. Des frais du fournisseur peuvent s’appliquer.

## Lancer une vérification

1. Ouvrez l’*article*. Sélectionnez un passage pour cibler la vérification.
2. Ouvrez **Actions rapides** et choisissez **Vérifier les faits**. Vous pouvez aussi demander à l’assistant de vérifier les faits de votre texte.
3. Examinez les affirmations sélectionnées par l’assistant et désélectionnez celles que vous ne souhaitez pas vérifier.
4. Sélectionnez **Envoyer**.
5. Ouvrez **Vérification des faits** pour examiner les résultats concernant la *version enregistrée* vérifiée.

::: tip Exemple
Dans « La rivière au crépuscule », Ana affirme que la pleine lune fera assez monter l’eau pour recouvrir le sentier. Vérifiez cette affirmation à l’aide de sources qui correspondent à la rivière et au cadre de l’histoire. Avant de modifier la scène, vérifiez que les sources parlent bien de cette rivière en particulier.
:::

Pendant la vérification, vous pouvez continuer à écrire ou changer de vue. Si la vérification s’interrompt, vous pouvez consulter les *observations* déjà prêtes. Lancez une autre vérification pour les affirmations restantes.

## Lire le verdict et les sources

Sélectionnez une affirmation dans **Vérification des faits** pour lire son explication, ses sources, la date de vérification et le degré d’incertitude.

| Verdict | Signification |
| --- | --- |
| **Étayée** | Les éléments trouvés étayent l’affirmation. Vérifiez tout de même que les sources correspondent à votre contexte. |
| **Contestée** | Les éléments trouvés remettent l’affirmation en question. Lisez l’explication et les sources avant de décider quoi modifier. |
| **Invérifiable** | Les éléments disponibles n’ont pas permis d’établir l’affirmation. Cela ne signifie pas à lui seul qu’elle est fausse. |

Ouvrez les liens des sources et vérifiez leur pertinence, leurs dates et leur formulation. Une *observation* est un avis, pas une preuve. La date de vérification indique quand l’affirmation a été examinée, pas que toutes les sources ont été publiées à cette date.

## Décider quoi faire d’une observation

Pour une *observation* non résolue issue de la dernière vérification de la *version enregistrée* actuelle, choisissez l’action correspondant à votre décision.

| Action | Résultat |
| --- | --- |
| **Accepter la formulation actuelle** | Enregistre votre intention de garder l’affirmation telle quelle. L’*observation* affiche **Formulation actuelle acceptée**. |
| **Accepter les éléments de preuve** | Enregistre que vous avez examiné et accepté les éléments présentés. L’*observation* affiche **Éléments de preuve acceptés**. |
| **Proposer une correction** | Pour une affirmation **Contestée** ou **Invérifiable**, demande à l’assistant de préparer une *proposition* de correction. Examinez-la avant d’appliquer des modifications. |

Dans les deux cas, Warplyn marque l’*observation* comme résolue. Les boutons de décision disparaissent et la bibliothèque d’articles ne la signale plus comme étant à traiter. Aucune des deux ne modifie l’*article* ni le verdict. Elles enregistrent des raisons différentes pour votre décision et ont le même effet sur le déroulement de la vérification.

Par exemple, **Contestée · Éléments de preuve acceptés** signifie que la vérification a remis l’affirmation en question et que vous avez accepté les éléments présentés. Cela ne signifie pas que l’affirmation a été corrigée ou qu’elle est désormais étayée. Si le texte doit changer, modifiez l’*article* ou demandez une correction avant de résoudre l’*observation*.

Pour demander plusieurs corrections à la fois, sélectionnez les affirmations **Contestée** ou **Invérifiable** non résolues, puis choisissez **Proposer des corrections**. Dans [Examen des propositions](reviewing-articles.md#review-a-proposal), examinez les formulations suggérées et appliquez les modifications que vous acceptez. Warplyn enregistre le texte avec les modifications acceptées dans une nouvelle *version enregistrée*.

## Revérifier après des modifications

Les *observations* sont liées à la *version enregistrée* vérifiée. Lorsqu’une autre *version enregistrée* devient actuelle, les observations précédentes restent consultables, mais sont obsolètes. Choisissez **Relancer la vérification des faits** avant d’agir en fonction de celles-ci.

Utilisez **Historique des vérifications des faits** pour consulter les vérifications précédentes. Elles sont en lecture seule. Seule la dernière vérification de la *version enregistrée* actuelle permet d’agir.

Une vérification ultérieure peut réutiliser les éléments et les décisions d’acceptation si elle reconnaît un fait inchangé, même lorsque l’affirmation a été reformulée. Les résultats réutilisés affichent **Éléments de preuve réutilisés de la version** et conservent leur date de vérification d’origine. Si la nouvelle formulation affirme autre chose, il faudra peut-être refaire la recherche.

Relancer une vérification ne garantit pas que chaque affirmation inchangée fera l’objet d’une nouvelle recherche. Pour les informations susceptibles de changer, examinez les sources et les dates de vérification, puis demandez explicitement à l’assistant de vérifier l’affirmation à partir de sources actuelles.
