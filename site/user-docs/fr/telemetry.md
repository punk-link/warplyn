---
description: "Découvrez quelles données de diagnostic et d’utilisation Warplyn partage, ce qui reste privé et comment désactiver le partage dans Settings."
---

# Partager les données de diagnostic et d’utilisation

Lorsque vous activez le partage, les applications Warplyn empaquetées pour Windows et Linux envoient à PostHog Cloud, en Virginie (États-Unis), des événements pseudonymisés sur la fiabilité et l’utilisation. Le partage est désactivé par défaut. Activez-le si vous souhaitez nous aider à comprendre votre expérience et à améliorer Warplyn. Vous pouvez modifier votre choix dans **Paramètres** → **Général** → **Confidentialité et diagnostics**.

Désactiver le partage arrête la collecte future et efface les événements en attente ainsi que l’identifiant de télémétrie local. Si vous le réactivez plus tard, un nouvel identifiant est créé. Les événements déjà envoyés ne peuvent pas être retirés.

Les événements en attente sont conservés dans le profil local de l’application afin que Warplyn puisse réessayer lorsque la connexion est rétablie. La prochaine fois que l’application vérifie la file d’attente, elle supprime les événements datant de plus de 24 heures. Désactiver le partage efface la file.

[![Paramètres Confidentialité et diagnostics avec la commande de partage et les contrôles de ID de télémétrie ; l’identifiant est masqué.](/images/diagnostic-and-usage-data.png)](/images/diagnostic-and-usage-data.png)

*Paramètres Confidentialité et diagnostics de l’application de bureau.*

## Données recueillies par Warplyn

Les événements concernent :

- la vérification réussie ou échouée d’une connexion, sans nom de connexion ni détail sur le fournisseur ;
- les démarrages de l’application et des catégories sûres d’échec au démarrage, dans le moteur de rendu ou dans un processus enfant ;
- les opérations d’IA et leurs étapes, qu’elles soient terminées, échouées ou annulées, avec une catégorie d’échec et, si disponible, le statut HTTP ;
- les vérifications explicites de *propositions* et les points de contrôle de *brouillons* agrégés ;
- les résultats de sauvegarde et de récupération.

Les événements ne contiennent pas le texte des *articles*, les instructions, les réponses de l’IA ni les clés API.

::: details Autres champs des événements
Chaque événement comprend une source d’analytique de bureau, la version du schéma, la version de l’application, la plateforme, l’architecture, la version du système d’exploitation et un horodatage. Les champs propres à chaque événement se limitent à des catégories définies, à des compteurs positifs ou nuls ou à des durées plafonnées.

Les événements d’opération et d’étape d’IA peuvent inclure un identifiant aléatoire qui relie les événements d’une même opération. Cet identifiant est distinct des identifiants d’*article* et de demande.

Les événements ne comprennent pas les identifiants ou les titres des *articles* et des *versions enregistrées*, les valeurs des variables d’environnement, les chemins de fichiers, les URL, les erreurs brutes, les détails de sortie de processus ni les corps des demandes ou des réponses.
:::

## Demander la suppression

Pour demander l’accès à vos données, leur rectification ou toute autre démarche relative à la confidentialité, consultez les [demandes concernant les données](data-request.md).

1. Dans **Paramètres** → **Général** → **Confidentialité et diagnostics**, sélectionnez **Copier l’ID**.
2. Envoyez cet identifiant à [kirill.taran@punk.link](mailto:kirill.taran@punk.link) par e-mail et demandez sa suppression.
3. Désactivez **Partager les données de diagnostic et d’utilisation**.

Copiez l’identifiant avant de désactiver le partage. Cette action efface l’identifiant de votre appareil. Le responsable du projet supprime l’enregistrement pseudonymisé correspondant et vous le confirme par e-mail.

## Analytique du site web {#website-analytics}

Les pages d’accueil et des offres utilisent PostHog pour mesurer les visites, les informations de provenance et de campagne, ainsi que les clics sur les liens de téléchargement. Les événements de téléchargement PostHog incluent l’emplacement du bouton sur la page. Google Analytics enregistre aussi un événement `download_clicked` lorsqu’une personne ouvre le lien vers la dernière version depuis la page d’accueil, la page des offres ou le guide utilisateur. Ces clics ne confirment ni le téléchargement ni l’installation.

Le suivi PostHog du site web n’utilise ni cookies ni stockage du navigateur, ne crée pas de profil de personne et n’enregistre ni lecture de session ni activité générale de clic. PostHog estime le nombre de visiteurs avec un hachage généré par le serveur. Les événements du site web sont distincts des identifiants de télémétrie de bureau, et la commande de partage de l’application ne contrôle pas le suivi du site.

Les pages d’accueil et le guide utilisateur utilisent également Google Analytics, qui peut employer des cookies pour mesurer les visites et les sources de trafic. Google Analytics et PostHog désactivent tous deux le suivi lorsque votre navigateur envoie le signal Do Not Track ou Global Privacy Control. La description du suivi sans cookies ci-dessus concerne PostHog.
