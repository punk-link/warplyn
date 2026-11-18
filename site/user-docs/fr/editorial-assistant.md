---
description: "Utilisez l’assistant éditorial de Warplyn pour rédiger, réviser, vérifier les faits, relire le style et préparer une traduction. Examinez les modifications générées avant de les accepter."
---

# Assistant éditorial

Utilisez l’assistant éditorial pour rédiger, réviser, vérifier les faits, relire le style ou préparer une traduction. Chaque demande doit être explicite. Choisir une option dans **Actions rapides** insère seulement le début d’une *compétence* dans la zone de saisie. Sélectionnez **Envoyer** pour lancer le travail.

La sélection de texte permet de limiter les modifications au passage choisi. Les définitions proches et les indications de ton peuvent aider l’assistant à interpréter une sélection courte, mais leur partage révèle aussi au fournisseur le texte non sélectionné. Si une demande avec sélection nécessite le texte de l’*article*, Warplyn transmet le passage choisi ainsi que jusqu’à 500 caractères avant et après, comme contexte distinct en lecture seule. Seul le passage sélectionné peut être remplacé. Une explication s’affiche dans la zone de saisie avant l’envoi. N’envoyez pas la demande si le texte voisin est sensible. Les conseils généraux et la gestion des *compétences* ne nécessitent pas ce texte. Warplyn n’élargit jamais discrètement la sélection à tout l’*article*. Si le contexte ne suffit pas, fournissez explicitement le passage pertinent ou faites une nouvelle demande avec une autre sélection.

::: tip Exemple
Pour réviser une nouvelle, sélectionnez un passage et demandez : « Améliore la fluidité en gardant le point de vue d’Ana et l’atmosphère calme. N’ajoute aucun événement. » L’assistant prépare une *proposition* dans **Examen des propositions**. Vous pouvez aussi lui demander de repérer les changements de temps entre le passé et le présent dans un chapitre ; les *observations* de révision du style apparaissent dans **Profil de style**.
:::

[![Assistant éditorial de Warplyn avec une demande de révision de fiction et une compétence sélectionnée.](/images/editorial-assistant-example.png)](/images/editorial-assistant-example.png)

*Exemple de demande dans la zone de saisie. Connectez un fournisseur avant de l’envoyer. La capture d’écran montre l’ancien nom d’une compétence.*

Pendant le traitement, l’assistant affiche un bref message d’activité. Choisissez **Arrêter** pour annuler un travail qui prend trop de temps. Une demande annulée ou échouée ne modifie pas l’*article* ; choisissez **Réessayer** pour la relancer. L’assistant n’affiche pas les instructions internes, les données privées, les identifiants ni les erreurs du fournisseur. Lorsque le résultat est prêt, ouvrez-le depuis sa carte :

- **Examen des propositions** pour le texte généré ou révisé.
- **Vérification des faits** pour les *observations* informatives.
- **Profil de style** pour les *observations* de révision du style.
- **Traductions** pour une *proposition* de traduction.

L’ouverture d’un résultat ne modifie pas l’*article*. Examinez une *proposition* avant d’en accepter les modifications. Les *observations* restent informatives, et les traductions sont des *articles* liés distincts. Consultez [Relire des articles](reviewing-articles.md) pour les propositions, l’historique, la récupération et Vérification des faits. Consultez [Traductions](translations.md) pour comparer et utiliser les résultats de traduction.

Pour une vérification ciblée des termes techniques, choisissez **Vérifier les termes** dans **Actions rapides**. Les *observations* accompagnées de leurs sources apparaissent dans **Vérification des faits**. Consultez [Vérifier les termes techniques](built-in-skills/check-technical-terms.md) pour connaître les étapes et les limites de cette vérification.

Dans **Examen des propositions**, modifiez directement le texte **Proposition**, en mode **Côte à côte** ou **L’une sous l’autre**. **Original** reste en lecture seule. La modification conserve la décision **Accepter** ou **Rejeter** de chaque changement. Choisissez une décision pour chaque changement, puis sélectionnez **Appliquer** pour terminer la vérification. Le texte accepté crée une nouvelle *version enregistrée*. Si vous rejetez toutes les suggestions, Appliquer ferme la vérification sans modifier l’*article* ni créer de *version enregistrée*. Pour accepter toutes les modifications, choisissez **Tout accepter** dans **Tout décider…**, puis appliquez-les. **Tout rejeter** laisse l’*article* inchangé. **Tout réinitialiser** remet chaque suggestion à l’état En attente et conserve les modifications apportées au texte proposé. Choisissez **Écarter la proposition** pour effacer la vérification.

Les modifications non appliquées restent disponibles lorsque vous changez de disposition ou de vue de l’espace de travail. Elles sont effacées si vous rechargez la page, passez à un autre *article*, fermez la *proposition* ou en générez une nouvelle. Si l’application échoue, elles sont conservées afin que vous puissiez réessayer. Gardez les nombres, les liens, le code et les termes techniques proposés inchangés. Les *propositions* obsolètes, peu fiables ou déjà acceptées sont en lecture seule. Si vous modifiez le texte d’une correction factuelle, les *observations* associées restent informatives après l’application.

Les *compétences* aident à formuler une demande, mais ne donnent aucun droit supplémentaire. Pour une demande sans compétence précisée, l’assistant choisit les *compétences* pertinentes. Il ne fait pas passer les demandes ordinaires par un processus de rédaction prédéfini. Warplyn n’exécute pas de travail en arrière-plan, ne publie pas directement et ne modifie pas un *article* sans votre approbation.

Demandez à l’assistant éditorial de créer une [compétence](skills.md) réutilisable si vous souhaitez retrouver une procédure plus tard. Il peut poser une courte question si l’objectif, les étapes ou les références ne sont pas clairs. Une *compétence* créée est disponible immédiatement et possède son propre historique local de *versions*. Sa création ne lit pas le corps de votre *article* et ne modifie pas son *brouillon*, sa *proposition* ni ses *versions enregistrées*.

Vous pouvez demander à l’assistant éditorial d’examiner **Historique des versions enregistrées**, les travaux éditoriaux enregistrés, les consignes de publication ou la préparation du corpus de style. Sur demande explicite, il peut ajouter la *version enregistrée* actuelle et immuable au corpus de style local, puis reconstruire le profil de style. Il ne peut pas accepter des *propositions*, restaurer des *versions enregistrées*, résoudre des *observations*, modifier des *brouillons*, supprimer des échantillons de style ni publier.

Pour les échantillons d’écriture, les consignes réutilisables ou les règles typographiques, ouvrez [Profil de style](style-profile.md). Les *observations* de révision du style y apparaissent et restent séparées de votre *article*.
