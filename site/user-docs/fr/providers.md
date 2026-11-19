---
description: "Connectez un fournisseur d’IA à Warplyn, enregistrez votre clé API, choisissez des modèles et découvrez les vérifications et capacités prises en charge."
---

# Fournisseurs et modèles d’IA

Warplyn envoie les demandes d’IA au fournisseur que vous configurez dans **Paramètres** → **Assistant IA**. Vous devez posséder un compte et une clé API auprès de ce fournisseur. Celui-ci peut facturer l’utilisation de son API.

## Ajouter une connexion

Dans l’application de bureau, ouvrez **Paramètres** → **Assistant IA**. Sous **Comment souhaitez-vous fournir votre clé ?**, choisissez **Ajouter une clé API** ou **Variable d’environnement**.

- **Ajouter une clé API :** choisissez un fournisseur, nommez la connexion et saisissez la clé. Warplyn l’enregistre dans Windows Credential Manager ou Linux Secret Service. La clé ne s’affiche plus ensuite et n’est stockée ni dans la base de données Warplyn ni dans les sauvegardes.
- **Variable d’environnement :** choisissez un fournisseur, nommez la connexion et saisissez le nom de la variable qui contient votre clé. Warplyn enregistre le nom, pas sa valeur. Le service de l’application doit démarrer avec cette variable définie.

::: tip À propos des identifiants
Les clés API gérées nécessitent l’application de bureau et un service d’identifiants disponible dans le système d’exploitation. Sous Linux, Secret Service doit être déverrouillé. L’application dans le navigateur accepte les connexions par variable d’environnement, mais ne peut pas gérer les identifiants du système d’exploitation. Le programme d’installation ne crée ni n’importe de fichier `.env`.
:::

Si vous ajoutez directement votre clé API, Warplyn la vérifie auprès du fournisseur. Si vous indiquez une variable d’environnement, Warplyn se contente d’enregistrer les paramètres de la connexion à ce stade. Warplyn contacte de nouveau le fournisseur lorsque vous actualisez les modèles ou envoyez une demande d’IA. Ces vérifications n’incluent pas le contenu des *articles*.

Les connexions apparaissent dans **Paramètres** → **Assistant IA**. Utilisez **Active**, **Activer** ou **Désactiver** pour choisir les connexions que Warplyn peut utiliser pour les nouvelles demandes. Choisissez **Renommer** pour modifier le nom local affiché d’une connexion, ou **Retirer** et confirmez pour la supprimer de Warplyn. La suppression d’une connexion par variable d’environnement ne supprime ni la variable ni sa clé.

::: tip Si l’actualisation des modèles échoue
Vérifiez que la connexion est **Active**, que la clé enregistrée est valide ou que la variable d’environnement est accessible au service de l’application, et que votre compte fournisseur peut accéder à son API.
:::

## Choisir des fournisseurs et des modèles

Warplyn prend en charge OpenAI, OpenCode Zen, Anthropic, Google Gemini API, xAI Grok et DeepSeek. Le catalogue d’OpenCode Zen propose également des modèles d’autres fournisseurs.

Dans **Paramètres** → **Assistant IA**, sélectionnez **Actualiser**, puis choisissez un **Modèle par défaut**. Pour utiliser un autre modèle pour une *compétence* particulière, choisissez-le sous **Modèles pour les tâches spécifiques**. Choisissez **Modèle par défaut** si la tâche doit utiliser le même modèle que les autres tâches sans réglage spécifique.

Actualisez la liste des modèles après avoir modifié les connexions ou pour consulter le catalogue actuel d’un fournisseur. Utilisez **Rechercher des modèles**, **Filtrer les modèles par fournisseur** et **Favoris** pour affiner la liste. Les choix de modèles s’appliquent aux prochaines demandes. Utilisez **Niveau de raisonnement** lorsqu’il est proposé pour un modèle OpenAI sélectionné ; un niveau plus élevé peut allonger le traitement. Le **Modèle de l’application**, facultatif dans **Paramètres** → **Assistant IA**, est distinct du Modèle par défaut et gère les tâches d’assistance de Warplyn, comme les résumés et les titres.

::: tip Disponibilité des modèles
Les opérations éditoriales disponibles dépendent du modèle. Certains modèles ne prennent pas en charge la vérification des faits avec sources, les sorties structurées ou les réglages de raisonnement. Consultez le catalogue d’OpenCode Zen pour savoir quels modèles sont disponibles et quelles fonctions ils prennent en charge.
:::

[![Paramètres Assistant IA affichant les connexions configurées, les options d’ajout de clé et les commandes de sélection des modèles.](/images/ai-providers-and-models.png)](/images/ai-providers-and-models.png)

*Paramètres Assistant IA avec les connexions aux fournisseurs et les commandes de sélection des modèles.*

### Modèle de l’application

Le **Modèle de l’application** résume les *propositions*, rédige les titres et détermine ce que vous demandez à l’assistant. Si vous ne choisissez pas de modèle pour ces tâches, Warplyn utilise le **Modèle par défaut**.

Choisissez un modèle de texte efficace et moins coûteux. **GPT-6 Luna** est une option d’OpenAI pour ces tâches ciblées ([détails du modèle](https://developers.openai.com/api/docs/models/gpt-6-luna)). Avec un autre fournisseur, choisissez un modèle comparable. Si les résultats ne sont pas assez bons, essayez un modèle plus puissant.
