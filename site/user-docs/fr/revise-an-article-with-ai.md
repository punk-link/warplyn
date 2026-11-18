---
description: "Révisez un article avec l’IA dans Warplyn : formulez une demande précise, comparez les modifications proposées, appliquez celles que vous retenez et gardez les versions antérieures."
---

# Réviser un article avec l’IA et vérifier chaque modification

Quand une scène raconte les bons événements, mais que son rythme semble irrégulier, l’assistant éditorial de Warplyn peut vous aider à la réviser. Travaillez sur un passage ou sur un *article* entier, comparez les formulations proposées et appliquez les modifications que vous souhaitez conserver.

Warplyn est un espace d’écriture open source qui conserve vos données localement, pour Windows et Linux. Vos textes restent sur votre ordinateur. L’assistance par IA nécessite une connexion Internet, une connexion à un fournisseur pris en charge et votre clé API. Le texte et le contexte pertinents sont transmis à ce fournisseur, dont les tarifs et les règles de traitement des données s’appliquent.

## Commencez par une demande précise

Ouvrez votre *article* et sélectionnez le passage à réviser. Dans la zone de saisie, indiquez ce qui doit être amélioré et ce qui doit rester inchangé. Par exemple, pour travailler sur « La rivière au crépuscule » :

> Améliore la fluidité tout en gardant le point de vue d’Ana et l’atmosphère calme. N’ajoute aucun événement.

Sélectionnez **Envoyer**. Warplyn transmet la sélection avec jusqu’à 500 caractères de chaque côté, à titre de contexte en lecture seule. Seul le passage sélectionné peut être remplacé. Avant d’envoyer un texte sensible, vérifiez l’explication du contexte dans la zone de saisie. Pour en savoir plus, consultez [Assistant éditorial](editorial-assistant.md).

[![zone de saisie de Warplyn avec une demande de révision d’un texte de fiction.](/images/editorial-assistant-example.png)](/images/editorial-assistant-example.png)

*Exemple de demande dans la zone de saisie. La capture d’écran montre l’ancien nom d’une compétence.*

## Comparez le texte original et le texte proposé

Une fois la demande terminée, ouvrez **Examen des propositions** depuis sa carte de résultat. Comparez **Original** et **Proposition** pour vérifier que la révision conserve les événements de la scène, son point de vue et sa voix.

[![Examen des propositions compare les textes Original et Proposition, affiche les décisions pour chaque modification et le bouton Appliquer.](/images/proposal-review.png)](/images/proposal-review.png)

*Exemple de révision pour « La rivière au crépuscule ». Le texte généré varie selon votre demande et le modèle.*

Choisissez **Accepter** ou **Rejeter** pour chaque modification. Vous pouvez modifier le texte **Proposition** avant de l’appliquer. Si Warplyn ne peut pas séparer une *proposition* sans risque, l’application vous indique qu’il faut la vérifier dans son ensemble.

## Appliquez les modifications et conservez l’historique

Sélectionnez **Appliquer** après avoir pris une décision pour chaque modification. Le texte accepté crée une nouvelle *version enregistrée*. Si vous rejetez toutes les modifications, l’*article* reste inchangé et aucune *version enregistrée* n’est créée. Les décisions seules ne modifient pas votre texte.

Ouvrez **Historique des versions enregistrées** pour consulter les versions enregistrées précédentes. La restauration d’une version en ajoute une nouvelle et conserve l’historique intermédiaire. Consultez [Relire des articles](reviewing-articles.md) pour connaître les options de récupération et les *propositions* obsolètes.

Une révision par IA peut ne pas respecter votre intention ou modifier des détails que vous vouliez garder. Vérifiez le résultat avant de l’appliquer. Si nécessaire, faites une nouvelle demande plus précise. Une demande annulée ou échouée ne modifie pas l’*article*.

## Essayez avec vos textes

[Téléchargez Warplyn](https://github.com/punk-link/warplyn/releases/latest), suivez le [guide d’installation](installation.md) et connectez un [fournisseur d’IA](providers.md) pris en charge. Les installateurs Windows ne sont pas signés ; le guide d’installation explique l’avertissement que vous pourriez voir.
